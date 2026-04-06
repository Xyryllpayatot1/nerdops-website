/**
 * Simple in-memory rate limiter.
 *
 * Limitations (both Low severity):
 * - Store resets on deploy/restart — not durable across instances.
 *   For production scale, swap the Map store for Upstash Redis.
 * - IP resolution order is: CF-Connecting-IP → X-Real-IP → rightmost
 *   X-Forwarded-For entry. The rightmost XFF entry is appended by the
 *   first trusted reverse proxy and cannot be spoofed by the client.
 *   Using the leftmost entry (common mistake) is spoofable.
 */

import type { NextRequest } from 'next/server';
import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

interface Entry {
  count: number;
  resetAt: number;
}

const stores = new Map<string, Map<string, Entry>>();

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Resolve the real client IP from request headers.
 * Priority: CF-Connecting-IP > X-Real-IP > rightmost X-Forwarded-For entry.
 */
export function getClientIP(headers: NextRequest['headers'] | ReadonlyHeaders): string {
  // Cloudflare sets this — cannot be spoofed
  const cf = headers.get('cf-connecting-ip');
  if (cf) return cf.trim();

  // nginx / most reverse proxies set this to the real client IP
  const realIP = headers.get('x-real-ip');
  if (realIP) return realIP.trim();

  // x-forwarded-for: client, proxy1, proxy2
  // The rightmost entry is appended by our own proxy → trustworthy.
  // The leftmost entry is supplied by the client → spoofable.
  const xff = headers.get('x-forwarded-for');
  if (xff) {
    const parts = xff.split(',');
    return parts[parts.length - 1].trim();
  }

  return 'unknown';
}

/**
 * @param name     - unique limiter name (e.g. 'auth', 'leads')
 * @param windowMs - sliding window in milliseconds
 * @param max      - max requests allowed per window per identifier
 */
export function createRateLimiter(name: string, windowMs: number, max: number) {
  if (!stores.has(name)) {
    stores.set(name, new Map());
  }

  return function check(identifier: string): RateLimitResult {
    const store = stores.get(name)!;
    const now = Date.now();
    const entry = store.get(identifier);

    if (entry && entry.resetAt < now) {
      store.delete(identifier);
    }

    const current = store.get(identifier);

    if (!current) {
      store.set(identifier, { count: 1, resetAt: now + windowMs });
      return { success: true, remaining: max - 1, resetAt: now + windowMs };
    }

    if (current.count >= max) {
      return { success: false, remaining: 0, resetAt: current.resetAt };
    }

    current.count++;
    return { success: true, remaining: max - current.count, resetAt: current.resetAt };
  };
}

// Auth: 10 attempts per 15 minutes per IP
export const authLimiter = createRateLimiter('auth', 15 * 60 * 1000, 10);

// Lead submission: 5 per 10 minutes per IP
export const leadsLimiter = createRateLimiter('leads', 10 * 60 * 1000, 5);

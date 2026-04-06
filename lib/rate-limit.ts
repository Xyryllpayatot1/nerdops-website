/**
 * Simple in-memory rate limiter.
 * NOTE: In a multi-instance/serverless environment each instance has its own
 * store. For production scale use a shared store (e.g. Upstash Redis).
 */

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

    // Window expired — reset
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

// Pre-configured limiters
// Auth: 10 attempts per 15 minutes per IP
export const authLimiter = createRateLimiter('auth', 15 * 60 * 1000, 10);

// Lead submission: 5 submissions per 10 minutes per IP
export const leadsLimiter = createRateLimiter('leads', 10 * 60 * 1000, 5);

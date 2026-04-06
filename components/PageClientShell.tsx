'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import StickyCTA from '@/components/StickyCTA';
import { useReveal } from '@/lib/use-reveal';

const CybersecurityAuditModal = dynamic(
  () => import('@/components/CybersecurityAuditModal'),
  { ssr: false }
);

/**
 * Thin client shell dropped into Server Component pages.
 * Handles scroll-reveal animations, the sticky CTA bar, and the audit modal.
 * Trigger the modal from anywhere with:
 *   window.dispatchEvent(new CustomEvent('openAuditModal'))
 */
export default function PageClientShell() {
  useReveal();
  const [auditOpen, setAuditOpen] = useState(false);

  useEffect(() => {
    const open = () => setAuditOpen(true);
    window.addEventListener('openAuditModal', open);
    return () => window.removeEventListener('openAuditModal', open);
  }, []);

  return (
    <>
      <StickyCTA />
      <CybersecurityAuditModal isOpen={auditOpen} onClose={() => setAuditOpen(false)} />
    </>
  );
}

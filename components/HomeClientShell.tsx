'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useReveal } from '@/lib/use-reveal';

const WizardModal = dynamic(() => import('@/components/WizardModal'), { ssr: false });
const CybersecurityAuditModal = dynamic(() => import('@/components/CybersecurityAuditModal'), { ssr: false });

const wrapperStyle = {
  background: 'linear-gradient(to top, rgba(13,21,48,0.98) 70%, rgba(13,21,48,0))',
  paddingTop: 40,
} as const;

const innerStyle = {
  background: '#0d1530',
  padding: 12,
  border: '1px solid rgba(53,178,159,0.3)',
  boxShadow: '0 -4px 30px rgba(53,178,159,0.15), 0 8px 40px rgba(0,0,0,0.5)',
} as const;

const callBtnStyle = {
  animation: 'pulse-cta 2s ease-in-out infinite',
  boxShadow: '0 4px 15px rgba(53,178,159,0.4)',
} as const;

const quoteBtnStyle = {
  borderColor: '#35b29f',
  background: 'rgba(53,178,159,0.1)',
} as const;

function MobileStickyCTA({ show, onQuoteClick }: { show: boolean; onQuoteClick: () => void }) {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${show ? 'translate-y-0' : 'translate-y-full'}`}
      style={wrapperStyle}
    >
      <div className="flex gap-2 mx-3 mb-3 rounded-xl" style={innerStyle}>
        <a
          href="tel:+15033137121"
          className="flex-1 bg-gradient-to-r from-teal to-cyan hover:from-teal/90 hover:to-cyan/90 text-white font-bold py-3.5 rounded-lg text-sm inline-flex items-center justify-center gap-2 transition-all duration-200"
          style={callBtnStyle}
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          Call Now
        </a>
        <button
          onClick={onQuoteClick}
          className="flex-1 border-2 text-teal hover:bg-teal hover:text-white font-bold py-3.5 rounded-lg text-sm inline-flex items-center justify-center transition-all duration-200"
          style={quoteBtnStyle}
        >
          Get Free Quote
        </button>
      </div>
    </div>
  );
}

/**
 * Client shell for the homepage.
 * Handles: scroll-reveal, hero IntersectionObserver, wizard modal, audit modal, sticky CTA.
 * Trigger modals from Server Component children via custom events:
 *   window.dispatchEvent(new CustomEvent('openWizard'))
 *   window.dispatchEvent(new CustomEvent('openAuditModal'))
 */
export default function HomeClientShell() {
  useReveal();

  const [stickyVisible, setStickyVisible] = useState(false);
  const [wizardOpen, setWizardOpen]       = useState(false);
  const [auditOpen, setAuditOpen]         = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero-section');
    if (!hero) return;

    const obs = new IntersectionObserver(([e]) => setStickyVisible(!e.isIntersecting), { threshold: 0 });
    obs.observe(hero);

    const handleOpenWizard = () => setWizardOpen(true);
    const handleOpenAudit  = () => setAuditOpen(true);
    window.addEventListener('openWizard',      handleOpenWizard);
    window.addEventListener('openAuditModal',  handleOpenAudit);

    return () => {
      obs.disconnect();
      window.removeEventListener('openWizard',     handleOpenWizard);
      window.removeEventListener('openAuditModal', handleOpenAudit);
    };
  }, []);

  return (
    <>
      <MobileStickyCTA show={stickyVisible} onQuoteClick={() => setWizardOpen(true)} />
      <Suspense fallback={null}>
        <WizardModal isOpen={wizardOpen} onClose={() => setWizardOpen(false)} />
      </Suspense>
      <Suspense fallback={null}>
        <CybersecurityAuditModal isOpen={auditOpen} onClose={() => setAuditOpen(false)} />
      </Suspense>
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CybersecurityAuditModal from '@/components/CybersecurityAuditModal';

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const STICKER_H = { 1: 160, 2: 145, 3: 155, 4: 150, 5: 162, 6: 140, 7: 158, 8: 148, 9: 152, 10: 145, 11: 155, 12: 148, 13: 160, 14: 142 };
const STICKER_ROT = { 1: -2, 2: 1.5, 3: -1, 4: 2.5, 5: 1, 6: -2.5, 7: 2, 8: -1.5, 9: 1.8, 10: -1.2, 11: 2.2, 12: -1.8, 13: 1, 14: -2.2 };

function StickerFilterDef() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <filter id="sticker-border" x="-15%" y="-15%" width="130%" height="130%">
          <feMorphology in="SourceAlpha" operator="dilate" radius="10" result="dilated" />
          <feFlood floodColor="white" floodOpacity="1" result="white" />
          <feComposite in="white" in2="dilated" operator="in" result="whiteBorder" />
          <feMerge>
            <feMergeNode in="whiteBorder" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

function TeamSticker({ n }) {
  return (
    <div
      className="flex-shrink-0 relative"
      style={{
        width: 'clamp(80px, 18vw, 130px)',
        height: STICKER_H[n] || 150,
        transform: `rotate(${STICKER_ROT[n] || 0}deg)`,
        filter: 'url(#sticker-border) drop-shadow(0 6px 20px rgba(0,0,0,0.7))',
      }}
    >
      <img
        src={`/team/face${n}.png`}
        alt="Team member"
        className="w-full h-full object-contain object-bottom"
      />
    </div>
  );
}

const VALUES = [
  {
    title: 'Reliability',
    desc: 'We deliver structured oversight and consistent performance. Clients depend on us to maintain stability without interruption.',
  },
  {
    title: 'Proactive Protection',
    desc: 'We prevent issues before they escalate. Continuous monitoring and layered security reduce risk and protect operations.',
  },
  {
    title: 'Clear Communication',
    desc: 'We explain solutions in simple terms and maintain transparency. Businesses in Portland, OR trust our accountability and responsiveness.',
  },
];

export default function AboutPage() {
  useReveal();
  const [auditOpen, setAuditOpen] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy2 py-12 px-5 overflow-hidden">
        <div className="absolute inset-0 hero-grid-bg opacity-40 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="section-label block text-center">About Us</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mt-3 mb-3 leading-tight">
            Who We Are
          </h1>
          <p className="text-gray text-sm max-w-2xl mx-auto">
            A Reliable IT Support Company Serving Portland, OR and Surrounding Areas
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="bg-navy py-10 px-5">
        <div className="max-w-3xl mx-auto">
          <div className="reveal">
            <span className="section-label">Our Story</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-3 mb-4 leading-tight">
              Built to Simplify and Humanize Technology Support
            </h2>
            <p className="text-gray text-sm leading-relaxed">
              We founded ZERO NERDS to simplify and humanize technology support for businesses frustrated with confusing, impersonal IT experiences. As a trusted IT support company in Portland, OR, we take responsibility for your infrastructure — delivering proactive managed IT, cybersecurity, cloud management, and 24/7 monitoring so you can focus on running your business.
            </p>
          </div>
        </div>
      </section>

      {/* ── TEAM FACES ── */}
      <section className="bg-navy2 pt-10 pb-6">
        <StickerFilterDef />
        <div className="max-w-5xl mx-auto text-center mb-6 px-5">
          <span className="section-label block text-center">Meet the Team</span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold mt-2">The People Behind Your IT</h2>
        </div>

        <div className="relative overflow-hidden mb-3" style={{ height: 'calc(clamp(100px, 18vw, 150px) + 20px)' }}>
          <div
            className="flex items-end gap-4 md:gap-6 absolute bottom-0"
            style={{ animation: 'teamScrollL 30s linear infinite', width: 'max-content', paddingTop: 10, paddingBottom: 10 }}
          >
            {[0,1,2,3].flatMap((set) =>
              [1,2,3,4,5,6,7].map((n) => (
                <TeamSticker key={`r1-${set}-${n}`} n={n} />
              ))
            )}
          </div>
          <div className="absolute inset-y-0 left-0 w-16 md:w-24 pointer-events-none z-10" style={{ background: 'linear-gradient(to right,#0d1530 50%,transparent)' }} />
          <div className="absolute inset-y-0 right-0 w-16 md:w-24 pointer-events-none z-10" style={{ background: 'linear-gradient(to left,#0d1530 50%,transparent)' }} />
        </div>

        <div className="relative overflow-hidden mb-5" style={{ height: 'calc(clamp(100px, 18vw, 150px) + 20px)' }}>
          <div
            className="flex items-end gap-4 md:gap-6 absolute bottom-0"
            style={{ animation: 'teamScrollR 36s linear infinite', width: 'max-content', paddingTop: 10, paddingBottom: 10 }}
          >
            {[0,1,2,3].flatMap((set) =>
              [8,9,10,11,12,13,14].map((n) => (
                <TeamSticker key={`r2-${set}-${n}`} n={n} />
              ))
            )}
          </div>
          <div className="absolute inset-y-0 left-0 w-16 md:w-24 pointer-events-none z-10" style={{ background: 'linear-gradient(to right,#0d1530 50%,transparent)' }} />
          <div className="absolute inset-y-0 right-0 w-16 md:w-24 pointer-events-none z-10" style={{ background: 'linear-gradient(to left,#0d1530 50%,transparent)' }} />
        </div>

        <div className="text-center pb-4 px-5">
          <a
            href="tel:+15033137121"
            className="inline-flex items-center justify-center gap-3 bg-teal hover:bg-teal/90 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-xl shadow-teal/25"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Get Instant Help
          </a>
        </div>
      </section>

      {/* Values */}
      <section className="bg-navy2 py-10 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="reveal text-center mb-6 max-w-xl mx-auto">
            <span className="section-label">What We Stand For</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold mt-2">Our Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="reveal card-bar relative bg-navy border border-white/6 rounded-xl p-6 overflow-hidden hover:border-teal/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-teal" />
                </div>
                <h3 className="font-serif font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-gray text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="bg-navy py-10 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="reveal text-center mb-6 max-w-xl mx-auto">
            <span className="section-label">What We Offer</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold mt-2">Services We Provide</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {[
              { title: 'Managed IT Services',                  href: '/solutions#managed-it' },
              { title: 'Help Desk Services',                   href: '/solutions#help-desk' },
              { title: 'Cloud Infrastructure Management',      href: '/solutions#cloud' },
              { title: 'Incident Response Services',           href: '/solutions#incident-response' },
              { title: 'Data Backup Services',                 href: '/solutions#backup' },
              { title: 'Cybersecurity Services',               href: '/solutions#cybersecurity' },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="reveal flex items-center justify-between bg-navy2 border border-white/6 rounded-xl px-5 py-3 hover:border-teal/30 hover:bg-teal/5 transition-all group"
              >
                <span className="font-medium text-sm">{item.title}</span>
                <svg className="w-4 h-4 text-teal/50 group-hover:text-teal transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy2 py-10 px-5">
        <div className="reveal max-w-xl mx-auto text-center">
          <span className="section-label block text-center mb-2">Work With Us</span>
          <h2 className="font-serif text-2xl font-bold mb-2">
            Schedule Your IT Assessment
          </h2>
          <p className="text-gray text-sm mb-5 max-w-md mx-auto">
            No obligation. Just honest IT advice.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={() => setAuditOpen(true)} className="bg-teal hover:bg-teal/90 text-white font-bold px-6 py-3 rounded-lg transition-all text-sm">
              Schedule Assessment
            </button>
            <a href="tel:+15033137121" className="border border-teal/40 text-cyan hover:border-teal font-bold px-6 py-3 rounded-lg transition-all text-sm">
              (503) 313-7121
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-navy py-14 px-5">
        <div className="max-w-3xl mx-auto">
          <div className="reveal text-center mb-8">
            <span className="section-label">FAQ</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2">Frequently Asked Questions</h2>
            <p className="text-gray text-sm mt-2">Common questions about working with ZERO NERDS.</p>
          </div>
          <div className="reveal space-y-2">
            {[
              { q: 'What makes ZERO NERDS different from other IT companies?', a: 'We take a proactive approach to IT support rather than waiting for issues to occur. Our team has over 11 years of experience serving businesses in Portland, OR and nationwide, and we are committed to keeping your systems running without interruption.' },
              { q: 'How quickly can you respond to IT emergencies?', a: 'Remote issues are typically addressed within 15 minutes. On-site support throughout the Portland metro area is available with same-day or next-day response depending on urgency.' },
              { q: 'Do you require long-term contracts?', a: 'No. All our agreements are month-to-month. You stay because the service works, not because you are locked in.' },
              { q: 'What industries do you support?', a: 'We support businesses across professional services, healthcare, retail, construction, non-profits, and more — any organization that depends on reliable IT infrastructure.' },
              { q: 'Can you support remote or hybrid teams?', a: 'Absolutely. Our cloud management and remote IT support infrastructure is built for distributed teams regardless of where employees work.' },
            ].map((faq, i) => (
              <div key={i} className="border border-white/8 rounded-xl overflow-hidden">
                <button
                  className="w-full flex justify-between items-center px-5 py-4 text-left hover:bg-white/3 transition-colors gap-4"
                  onClick={() => {}}
                >
                  <span className="font-medium text-sm leading-snug">{faq.q}</span>
                  <svg className="w-4 h-4 text-teal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden" style={{ background: '#0d1530', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="flex gap-2 p-3">
          <a href="tel:+15033137121" className="flex-1 bg-teal hover:bg-teal/90 text-white font-bold py-3 rounded-lg text-sm inline-flex items-center justify-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Call Now
          </a>
          <Link href="/get-started/wizard" className="flex-1 border border-teal/50 text-teal font-bold py-3 rounded-lg text-sm inline-flex items-center justify-center">
            Get Free Quote
          </Link>
        </div>
      </div>

      <CybersecurityAuditModal isOpen={auditOpen} onClose={() => setAuditOpen(false)} />
    </>
  );
}

'use client';

import { useEffect } from 'react';
import Link from 'next/link';

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
    desc: 'We explain solutions in simple terms and maintain transparency. Clients trust our accountability and responsiveness.',
  },
];

export default function AboutPage() {
  useReveal();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy2 py-24 px-5 overflow-hidden">
        <div className="absolute inset-0 hero-grid-bg opacity-40 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="section-label block text-center">About Us</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mt-3 mb-5 leading-tight">
            Who We Are
          </h1>
          <p className="text-gray text-base leading-relaxed max-w-2xl mx-auto">
            A Reliable IT Support Company Serving Spring, TX and Surrounding Areas
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="bg-navy py-20 px-5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <span className="section-label">Our Story</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Built to Simplify and Humanize Technology Support
            </h2>
            <div className="space-y-5 text-gray text-sm leading-relaxed">
              <p>
                We founded this company with a clear purpose: simplify and humanize technology support
                for businesses that were frustrated with confusing and impersonal IT experiences.
              </p>
              <p>
                With 11 years of experience in IT services and infrastructure management, we focus on
                prevention, responsiveness, and accountability. As an established IT support company
                serving Spring, TX, and businesses across the country, we act as a dependable extension
                of your team.
              </p>
              <p>
                We monitor systems 24/7, apply proactive updates, and strengthen cybersecurity controls
                before issues impact operations. Technology should support your business, not create obstacles.
              </p>
            </div>
          </div>

          <div className="reveal grid grid-cols-2 gap-4">
            {[
              { num: '11+',    label: 'Years of Experience' },
              { num: '500+',   label: 'Businesses Served' },
              { num: '99.98%', label: 'Average Uptime' },
              { num: '24/7',   label: 'Continuous Monitoring' },
            ].map((s) => (
              <div key={s.label} className="bg-navy2 border border-teal/10 rounded-xl p-7 text-center">
                <div className="font-serif font-bold grad-text leading-none" style={{ fontSize: '2.4rem' }}>{s.num}</div>
                <div className="text-gray text-xs uppercase tracking-wider mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-navy2 py-20 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-14 max-w-xl mx-auto">
            <span className="section-label">What We Stand For</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">Our Values</h2>
            <p className="text-gray text-sm leading-relaxed">
              The principles that guide every client engagement and every decision we make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="reveal card-bar relative bg-navy border border-white/6 rounded-xl p-8 overflow-hidden hover:border-teal/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center mb-5">
                  <div className="w-3 h-3 rounded-full bg-teal" />
                </div>
                <h3 className="font-serif font-bold text-lg mb-3">{v.title}</h3>
                <p className="text-gray text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="bg-navy py-20 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-14 max-w-xl mx-auto">
            <span className="section-label">What We Offer</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">Services We Provide</h2>
            <p className="text-gray text-sm leading-relaxed">
              Structured IT services designed to maintain stability, security, and operational continuity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
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
                className="reveal flex items-center justify-between bg-navy2 border border-white/6 rounded-xl px-6 py-4 hover:border-teal/30 hover:bg-teal/5 transition-all group"
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
      <section className="bg-navy2 py-20 px-5">
        <div className="reveal max-w-2xl mx-auto text-center">
          <span className="section-label block text-center mb-4">Work With Us</span>
          <h2 className="font-serif text-3xl font-bold mb-5 leading-tight">
            Schedule Your IT Assessment
          </h2>
          <p className="text-gray text-sm leading-relaxed mb-8 max-w-lg mx-auto">
            Let us review your infrastructure and identify areas for improvement — no obligation, no sales pressure.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="bg-teal hover:bg-teal/90 text-white font-bold px-8 py-3.5 rounded-lg transition-all text-sm">
              Schedule Your IT Assessment
            </Link>
            <a href="tel:+19366486488" className="border border-teal/40 text-cyan hover:border-teal font-bold px-8 py-3.5 rounded-lg transition-all text-sm">
              (936) 648-6488
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

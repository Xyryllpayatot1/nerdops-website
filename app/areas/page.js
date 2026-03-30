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

const PRIMARY = [
  { city: 'Portland, OR',           note: 'Primary Service Area & Office Location' },
  { city: 'Houston, TX',          note: 'On-Site Support Available' },
  { city: 'The Woodlands, TX',    note: 'On-Site Support Available' },
  { city: 'Conroe, TX',           note: 'On-Site Support Available' },
];

const ALL_AREAS = [
  'Portland, OR', 'Houston, TX', 'The Woodlands, TX', 'Conroe, TX',
  'Tomball, TX', 'Humble, TX', 'Cypress, TX', 'Pasadena, TX',
  'Friendswood, TX', 'Katy, TX', 'Rosenberg, TX', 'League City, TX',
  'Dickinson, TX', 'Alvin, TX', 'Huntsville, TX', 'Coldspring, TX',
  'Richmond, TX', 'La Porte, TX', 'South Houston, TX', 'Bellaire, TX',
  'Galena Park, TX', 'Jacinto City, TX',
];

export default function AreasPage() {
  useReveal();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy2 py-24 px-5 overflow-hidden">
        <div className="absolute inset-0 hero-grid-bg opacity-40 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="section-label block text-center">Areas We Serve</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mt-3 mb-5 leading-tight">
            Serving Portland, OR and<br />Surrounding Areas with Pride
          </h1>
          <p className="text-gray text-base leading-relaxed max-w-xl mx-auto">
            We provide dependable IT services and managed IT support in Portland, OR, and nearby
            communities. As a trusted IT support company, we help businesses secure systems
            and reduce downtime.
          </p>
        </div>
      </section>

      {/* Primary areas */}
      <section className="bg-navy py-20 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-14 max-w-xl mx-auto">
            <span className="section-label">Primary Service Areas</span>
            <h2 className="font-serif text-3xl font-bold mb-3">On-Site Support Available</h2>
            <p className="text-gray text-sm leading-relaxed">
              Our engineers can be dispatched to your location within 4 hours in these areas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {PRIMARY.map((a) => (
              <div
                key={a.city}
                className="reveal card-bar relative bg-navy2 border border-white/6 rounded-xl p-7 text-center overflow-hidden hover:border-teal/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-5 h-5 text-teal" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-serif font-bold text-lg mb-1">{a.city}</h3>
                <p className="text-gray text-xs leading-relaxed">{a.note}</p>
              </div>
            ))}
          </div>

          {/* All service areas grid */}
          <div className="reveal">
            <div className="text-center mb-8">
              <span className="section-label">Full Coverage Area</span>
              <h2 className="font-serif text-2xl font-bold mt-1">All Locations We Serve</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {ALL_AREAS.map((area) => (
                <div
                  key={area}
                  className="bg-navy2 border border-white/6 rounded-lg px-4 py-3 text-xs text-gray text-center hover:text-white hover:border-teal/30 transition-all"
                >
                  {area}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Remote section */}
      <section className="bg-navy2 py-20 px-5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="reveal">
            <span className="section-label">Remote Support</span>
            <h2 className="font-serif text-3xl font-bold mb-5 leading-tight">Structured Remote IT Support Across the United States</h2>
            <p className="text-gray text-sm leading-relaxed mb-5">
              While our primary on-site coverage spans the greater Houston area, our remote support
              and managed services infrastructure extends to businesses nationwide.
            </p>
            <p className="text-gray text-sm leading-relaxed mb-7">
              Most technical issues are resolved fully and securely through remote access tools —
              minimizing disruption and restoring productivity quickly regardless of your location.
            </p>
            <ul className="space-y-3.5 mb-8">
              {[
                'Secure encrypted remote access for immediate issue resolution',
                '24/7 infrastructure monitoring with no geographic restriction',
                'Cloud services managed and optimized from anywhere',
                'On-site partner network available in major metro areas nationwide',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray">
                  <svg className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="bg-teal hover:bg-teal/90 text-white font-bold px-7 py-3 rounded-lg transition-all text-sm">
              Talk to Us
            </Link>
          </div>

          <div className="reveal bg-navy border border-teal/10 rounded-2xl p-8">
            <h3 className="font-serif font-bold text-xl mb-6">Remote Support Performance</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: '< 15 min', label: 'Avg Remote Response' },
                { val: '95%+',     label: 'Remote Resolution Rate' },
                { val: '24/7',     label: 'Support Availability' },
                { val: '100%',     label: 'Encrypted Connections' },
              ].map((m) => (
                <div key={m.label} className="bg-navy2 border border-white/6 rounded-xl p-5 text-center">
                  <div className="font-serif font-bold text-cyan text-2xl">{m.val}</div>
                  <div className="text-gray text-xs mt-1.5">{m.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-teal/8 border border-teal/15 rounded-xl text-sm text-gray leading-relaxed">
              Not seeing your city listed? Call us at{' '}
              <a href="tel:+15033137121" className="text-teal font-semibold">(503) 313-7121</a>.
              We likely serve your area or can connect you with a trusted local partner.
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20 px-5 text-center">
        <div className="reveal max-w-xl mx-auto">
          <h2 className="font-serif text-3xl font-bold mb-5">
            Identify Vulnerabilities Before They Cause Downtime
          </h2>
          <p className="text-gray text-sm leading-relaxed mb-8">
            Secure your Free Cyber Security Audit today. Available to all businesses in Portland, OR and surrounding areas.
          </p>
          <Link href="/contact" className="bg-teal hover:bg-teal/90 text-white font-bold px-9 py-3.5 rounded-lg transition-all shadow-lg shadow-teal/20 text-sm">
            Claim Your Free Cyber Security Audit
          </Link>
        </div>
      </section>
    </>
  );
}

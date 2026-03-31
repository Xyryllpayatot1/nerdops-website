'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const REVIEWS = [
  {
    name: 'Kate LaMare',
    initials: 'KL',
    stars: 5,
    text: 'ZERO NERDS is the absolute best IT service around. Very fast response time with a dedicated and educated team. They can solve any issue that occurs, leaving us with less downtime than ever before.',
    service: 'Managed IT Services',
  },
  {
    name: 'Chris Wilson',
    initials: 'CW',
    stars: 5,
    text: 'Out of all the firms I\'ve hired, nothing compares to the level of expertise and sense of urgency as Daniel and his team. Amazing service, integrity, and knowledge in all aspects of the craft.',
    service: 'Cybersecurity & Infrastructure',
  },
  {
    name: 'David Routt JR',
    initials: 'DR',
    stars: 5,
    text: 'We partnered with ZERO NERDS for the migration of all our business IT infrastructure and could not have asked for a better partner. Every day the business is running more efficiently.',
    service: 'Cloud Migration',
  },
  {
    name: 'Lisa Cook',
    initials: 'LC',
    stars: 5,
    text: 'Danny is an incredible IT support. Super knowledgeable and works to get your company to the level you need to be, taking your budget into account. Accessible no matter when an IT event happens.',
    service: 'IT Support & Help Desk',
  },
  {
    name: 'Jill Lee',
    initials: 'JL',
    stars: 5,
    text: 'Professional, friendly, and knowledgeable. Great communication on the status of issues. Any issues I\'ve had have been resolved quickly. Overall, a very positive experience with ZERO NERDS!',
    service: 'Managed IT Services',
  },
  {
    name: 'Robert Smart',
    initials: 'RS',
    stars: 5,
    text: 'They handled my issues quickly and completely the first time — a massive bonus! You won\'t go wrong working with the team at ZERO NERDS.',
    service: 'IT Support & Help Desk',
  },
];

const FAQS = [
  {
    q: 'How much does managed IT support cost?',
    a: 'Managed IT services typically range from $100–$250 per user per month depending on the scope. ZERO NERDS offers flat-rate pricing with no surprise invoices — contact us for a custom quote.',
  },
  {
    q: 'How quickly can ZERO NERDS respond to an IT issue?',
    a: 'Remote issues are typically addressed within 15 minutes. On-site support throughout the Portland metro area is available same-day or next-day depending on urgency.',
  },
  {
    q: 'Do you offer 24/7 IT support?',
    a: 'Yes. We provide 24/7 infrastructure monitoring and an emergency support line available around the clock for critical issues.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We serve Portland, OR and the entire metro area including Vancouver, WA, Gresham, Hillsboro, Beaverton, Lake Oswego, and surrounding cities.',
  },
  {
    q: 'Do you require long-term contracts?',
    a: 'No. All our agreements are month-to-month. You stay because the service works, not because you\'re locked in.',
  },
  {
    q: 'What industries do you support?',
    a: 'We support businesses across professional services, healthcare, retail, construction, non-profits, and more — any organization that depends on reliable IT infrastructure.',
  },
  {
    q: 'Can you support remote or hybrid teams?',
    a: 'Absolutely. Our cloud management and remote IT support infrastructure is built for distributed teams regardless of where employees work.',
  },
  {
    q: 'How do I get started with ZERO NERDS?',
    a: 'Call us at (503) 313-7121 or fill out our contact form to schedule a free IT assessment. We\'ll review your infrastructure and recommend next steps — no obligation.',
  },
];

const SERVICES = [
  { label: 'Managed IT Services',               href: '/solutions#managed-it',          price: 'From $99/mo per user' },
  { label: 'IT Support & Help Desk',             href: '/solutions#help-desk',           price: 'From $75/mo per user' },
  { label: 'Cloud Server Hosting & Management',  href: '/solutions#cloud',               price: 'Custom quote' },
  { label: 'Cybersecurity & Infrastructure',     href: '/solutions#cybersecurity',       price: 'From $49/mo per user' },
  { label: 'Backup & Disaster Recovery',         href: '/solutions#backup',              price: 'From $25/mo' },
  { label: 'Incident Response Services',         href: '/solutions#incident-response',   price: 'Custom quote' },
];

const NEARBY = [
  'Portland, OR', 'Vancouver, WA', 'Gresham, OR', 'Hillsboro, OR', 'Beaverton, OR',
  'Lake Oswego, OR', 'Tualatin, OR', 'Tigard, OR', 'Milwaukie, OR', 'Oregon City, OR',
  'Camas, WA', 'Washougal, WA', 'Ridgefield, WA', 'Battleground, WA',
];

const RELATED = [
  'Managed IT Services', 'Cybersecurity Services', 'Cloud Hosting', 'IT Help Desk',
  'Network Setup', 'Data Backup', 'Disaster Recovery', 'Microsoft 365 Support',
  'Server Monitoring', 'Firewall Setup', 'VPN Configuration', 'IT Consulting',
];

function Stars({ n }) {
  return <span className="text-amber-400 text-sm">{'★'.repeat(n)}</span>;
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full flex justify-between items-center py-4 text-left gap-4 hover:text-[#29abe2] transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-sm text-gray-800">{q}</span>
        <svg className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <p className="text-gray-600 text-sm leading-relaxed pb-4">{a}</p>}
    </div>
  );
}

export default function GetStartedPage() {
  return (
    <div className="bg-white min-h-screen text-gray-900">

      {/* ── HERO ── */}
      <section className="bg-[#0d1530] py-16 px-5">
        <div className="max-w-4xl mx-auto text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-white/40 mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/areas" className="hover:text-white/70 transition-colors">Portland, OR</Link>
            <span>/</span>
            <span className="text-white/70">IT Support</span>
          </div>

          <h1 className="font-serif font-bold text-3xl md:text-5xl text-white leading-tight mb-4">
            Find IT Support in Portland, OR
          </h1>
          <p className="text-white/60 text-base mb-8">
            Trusted managed IT services, cybersecurity, and 24/7 help desk — right in your area.
          </p>

          {/* Quick contact bar */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <a
              href="tel:+15033137121"
              className="flex-1 flex items-center justify-center gap-2 bg-[#29abe2] hover:bg-[#29abe2]/90 text-white font-bold py-3.5 px-6 rounded-lg transition-all text-sm shadow-lg shadow-[#29abe2]/20"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Get Instant Help — (503) 313-7121
            </a>
            <Link
              href="/contact"
              className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-6 rounded-lg transition-all text-sm border border-white/20"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRO CARD ── */}
      <section className="bg-gray-50 py-10 px-5 border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-bold text-lg text-gray-900 mb-1">IT support near Portland, OR</h2>
          <p className="text-gray-500 text-sm mb-6">Top pro for your project</p>

          {/* Main pro card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col sm:flex-row gap-5">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center bg-[#dce6f5]">
                <Image src="/logo.png" alt="ZERO NERDS" width={72} height={72} className="object-contain p-1" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-900 text-base">ZERO NERDS</h3>
                <span className="bg-[#29abe2]/10 text-[#29abe2] text-xs font-bold px-2 py-0.5 rounded-full border border-[#29abe2]/20">Top Pro</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Stars n={5} />
                <span className="text-sm font-semibold text-gray-700">Exceptional 5.0</span>
                <span className="text-gray-400 text-sm">(50+ reviews)</span>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-3">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-[#29abe2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                  Portland, OR 97205
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-[#29abe2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                  Responds within 15 min
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-[#29abe2]" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
                  Serves Portland metro + Vancouver, WA
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-200">Great value</span>
                <span className="bg-amber-50 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-200">In high demand</span>
                <span className="bg-[#29abe2]/5 text-[#29abe2] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#29abe2]/20">24/7 monitoring</span>
              </div>
              <blockquote className="text-gray-600 text-sm italic leading-relaxed border-l-2 border-[#29abe2]/30 pl-3">
                "ZERO NERDS is the absolute best IT service around. Very fast response time with a dedicated and educated team."
                <span className="block text-gray-400 text-xs mt-1 not-italic">— Kate LaMare</span>
              </blockquote>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-2 justify-center sm:min-w-[140px]">
              <a
                href="tel:+15033137121"
                className="bg-[#29abe2] hover:bg-[#29abe2]/90 text-white font-bold py-2.5 px-5 rounded-lg text-sm text-center transition-all"
              >
                Call Now
              </a>
              <Link
                href="/contact"
                className="border border-gray-200 hover:border-[#29abe2]/50 text-gray-700 hover:text-[#29abe2] font-semibold py-2.5 px-5 rounded-lg text-sm text-center transition-all"
              >
                View profile
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── COST GUIDE ── */}
      <section className="bg-white py-10 px-5 border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-bold text-lg text-gray-900 mb-1">IT Support Cost Guide</h2>
          <p className="text-gray-500 text-sm mb-6">Transparent pricing for Portland businesses.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className="group flex items-start justify-between bg-gray-50 hover:bg-[#29abe2]/5 border border-gray-200 hover:border-[#29abe2]/30 rounded-xl p-4 transition-all"
              >
                <div>
                  <p className="font-semibold text-sm text-gray-800 group-hover:text-[#29abe2] transition-colors mb-1">{s.label}</p>
                  <p className="text-xs text-gray-500">{s.price}</p>
                </div>
                <svg className="w-4 h-4 text-gray-300 group-hover:text-[#29abe2] transition-colors mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link href="/contact" className="text-[#29abe2] text-sm font-semibold hover:underline">
              Get a custom quote →
            </Link>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="bg-gray-50 py-10 px-5 border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-bold text-lg text-gray-900 mb-1">Reviews for ZERO NERDS in Portland, OR</h2>
          <p className="text-gray-500 text-sm mb-6">Verified reviews from local businesses.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg,#29abe2,#1e5fa0)' }}>
                    {r.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{r.name}</p>
                    <Stars n={r.stars} />
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">"{r.text}"</p>
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <div className="w-6 h-6 rounded-full bg-[#dce6f5] flex items-center justify-center flex-shrink-0">
                    <Image src="/logo.png" alt="ZERO NERDS" width={16} height={16} className="object-contain" />
                  </div>
                  <p className="text-xs text-gray-500">ZERO NERDS — <span className="text-[#29abe2]">{r.service}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white py-10 px-5 border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-bold text-lg text-gray-900 mb-1">FAQs</h2>
          <p className="text-gray-500 text-sm mb-6">Answers to commonly asked questions about IT support in Portland, OR.</p>
          <div className="divide-y divide-gray-200">
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED LINKS ── */}
      <section className="bg-gray-50 py-10 px-5">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10">

          <div>
            <h3 className="font-bold text-sm text-gray-900 mb-4 uppercase tracking-wide">Nearby Areas</h3>
            <div className="flex flex-wrap gap-2">
              {NEARBY.map((city) => (
                <Link
                  key={city}
                  href="/areas"
                  className="text-xs text-[#29abe2] hover:underline bg-white border border-gray-200 rounded-full px-3 py-1.5 transition-colors hover:border-[#29abe2]/40"
                >
                  IT Support in {city}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-sm text-gray-900 mb-4 uppercase tracking-wide">Related Services</h3>
            <div className="flex flex-wrap gap-2">
              {RELATED.map((s) => (
                <Link
                  key={s}
                  href="/solutions"
                  className="text-xs text-[#29abe2] hover:underline bg-white border border-gray-200 rounded-full px-3 py-1.5 transition-colors hover:border-[#29abe2]/40"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-[#0d1530] py-12 px-5 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-serif font-bold text-2xl md:text-3xl text-white mb-3">Ready to get started?</h2>
          <p className="text-white/60 text-sm mb-6">Free IT assessment — no commitment, no sales pressure.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+15033137121"
              className="flex items-center justify-center gap-2 bg-[#29abe2] hover:bg-[#29abe2]/90 text-white font-bold py-3 px-8 rounded-lg text-sm transition-all shadow-lg shadow-[#29abe2]/20"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              (503) 313-7121
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 border border-white/20 text-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg text-sm transition-all"
            >
              Claim Free Cyber Security Audit
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

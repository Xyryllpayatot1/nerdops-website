'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const REVIEWS = [
  { name: 'Kate LaMare',    initials: 'KL',  stars: 5, text: 'ZERO NERDS is the absolute best IT service around. Very fast response time with a dedicated and educated team. They can solve any issue that occurs, leaving us with less downtime than ever before.' },
  { name: 'Chris Wilson',   initials: 'CW',  stars: 5, text: 'Out of all the firms I\'ve hired, nothing compares to the level of expertise and sense of urgency as Daniel and his team. Amazing service, integrity, and knowledge in all aspects of the craft.' },
  { name: 'Lisa Cook',      initials: 'LC',  stars: 5, text: 'Danny is an incredible IT support. Super knowledgeable and works to get your company to the level you need to be, taking your budget into account. Accessible no matter when an IT event happens.' },
  { name: 'Robbie Myers',   initials: 'RM',  stars: 5, text: 'Danny and his team at ZERO NERDS have been awesome to work with. Their passion and dedication to their craft is very apparent. I look forward to further interactions and collaboration with them.' },
  { name: 'Jill Lee',       initials: 'JL',  stars: 5, text: 'Professional, friendly, and knowledgeable. Great communication on the status of issues. Any issues I\'ve had have been resolved quickly. Overall, a very positive experience with ZERO NERDS!' },
  { name: 'David Routt JR', initials: 'DR',  stars: 5, text: 'We partnered with ZERO NERDS for the migration of all our business IT infrastructure and could not have asked for a better partner. Every day the business is running more efficiently.' },
  { name: 'Nicole Nelson',  initials: 'NN',  stars: 5, text: 'Love working with ZERO NERDS! Quick, efficient, knowledgeable, overall great team!' },
  { name: 'Robert Smart',   initials: 'RS',  stars: 5, text: 'They handled my issues quickly and completely the first time — a massive bonus! You won\'t go wrong working with the team at ZERO NERDS.' },
  { name: 'Laura Brown',    initials: 'LB',  stars: 5, text: 'We love ZERO NERDS! Daniel and his team are so helpful!' },
];

const FAQS = [
  { q: 'How much does managed IT support cost?',          a: 'Managed IT services typically range from $100–$250 per user per month depending on scope. ZERO NERDS offers flat-rate pricing with no surprise invoices — contact us for a custom quote.' },
  { q: 'How quickly can ZERO NERDS respond to an issue?', a: 'Remote issues are typically addressed within 15 minutes. On-site support throughout the Portland metro area is available same-day or next-day depending on urgency.' },
  { q: 'Do you offer 24/7 IT support?',                   a: 'Yes. We provide 24/7 infrastructure monitoring and an emergency support line available around the clock for critical issues.' },
  { q: 'What areas do you serve?',                        a: 'We serve Portland, OR and the entire metro area including Vancouver, WA, Gresham, Hillsboro, Beaverton, Lake Oswego, and surrounding cities.' },
  { q: 'Do you require long-term contracts?',             a: 'No. All our agreements are month-to-month. You stay because the service works, not because you\'re locked in.' },
  { q: 'What industries do you support?',                 a: 'We support businesses across professional services, healthcare, retail, construction, non-profits, and more — any organization that depends on reliable IT infrastructure.' },
  { q: 'Can you support remote or hybrid teams?',         a: 'Absolutely. Our cloud management and remote IT support infrastructure is built for distributed teams regardless of where employees work.' },
  { q: 'How do I get started with ZERO NERDS?',           a: 'Call us at (503) 313-7121 or fill out our contact form to schedule a free IT assessment. We\'ll review your infrastructure and recommend next steps — no obligation.' },
];

const SERVICES = [
  { label: 'Managed IT Services',              href: '/solutions#managed-it',        price: 'From $99/mo per user' },
  { label: 'IT Support & Help Desk',            href: '/solutions#help-desk',         price: 'From $75/mo per user' },
  { label: 'Cloud Server Hosting & Management', href: '/solutions#cloud',             price: 'Custom quote' },
  { label: 'Cybersecurity & Infrastructure',    href: '/solutions#cybersecurity',     price: 'From $49/mo per user' },
  { label: 'Backup & Disaster Recovery',        href: '/solutions#backup',            price: 'From $25/mo' },
  { label: 'Incident Response Services',        href: '/solutions#incident-response', price: 'Custom quote' },
];

function Stars({ n }) {
  return <span className="text-yellow-400 text-sm">{'★'.repeat(n)}</span>;
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/8 rounded-xl overflow-hidden">
      <button className="w-full flex justify-between items-center px-6 py-5 text-left hover:bg-white/3 transition-colors gap-4" onClick={() => setOpen(!open)}>
        <span className="font-medium text-sm leading-snug text-white">{q}</span>
        <svg className={`w-4 h-4 text-teal flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-6 pb-5 text-gray text-sm leading-relaxed border-t border-white/5 pt-4">{a}</div>}
    </div>
  );
}

export default function GetStartedPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative w-full" style={{ backgroundColor: '#0d1530' }}>

        {/* Image — mobile: 260px tall / desktop: 55vh, object-contain so no zoom-in crop */}
        <div className="relative w-full h-[260px] md:h-[55vh] md:max-h-[580px]">
          <img
            src="/hero-bg.jpg"
            alt="IT Support"
            className="w-full h-full object-cover md:object-contain"
            style={{ backgroundColor: '#0d1530' }}
          />
          <div className="absolute inset-0 bg-black/35 md:bg-black/30" />

          {/* Mobile only — title + badge overlaid at bottom of image */}
          <div
            className="md:hidden absolute bottom-0 left-0 right-0 px-5 pb-5 pt-14"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)' }}
          >
            <div className="flex items-end justify-between gap-3">
              <h1 className="font-bold text-white text-2xl leading-tight">Find IT support in your area</h1>
              <span className="flex-shrink-0 bg-teal text-white text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap">18 near you</span>
            </div>
          </div>

          {/* Desktop only — glassmorphism card overlaid on image */}
          <div className="hidden md:flex absolute inset-0 items-center px-10 lg:px-16">
            <div className="rounded-2xl shadow-2xl p-7 w-full max-w-md border border-white/10"
                 style={{ background: 'rgba(13,21,48,0.92)', backdropFilter: 'blur(12px)' }}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h1 className="font-bold text-white text-2xl leading-tight">Find IT support in your area</h1>
                <span className="flex-shrink-0 bg-teal text-white text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap mt-0.5">18 near you</span>
              </div>
              <p className="text-white/60 text-sm mb-5">Confirm your location to see quality pros near you.</p>
              <div className="flex items-center gap-2 border border-white/15 rounded-lg px-4 py-3 mb-3 bg-white/5 focus-within:border-teal/50 transition-colors">
                <svg className="w-4 h-4 text-white/40 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/40 text-sm mr-1">Zip code</span>
                <input type="text" defaultValue="97205" className="flex-1 text-sm text-white outline-none bg-transparent" />
              </div>
              <a href="tel:+15033137121" className="w-full flex items-center justify-center bg-teal hover:bg-teal/90 text-white font-bold py-3.5 rounded-lg text-sm transition-all shadow-lg shadow-teal/20">
                Find a pro
              </a>
            </div>
          </div>
        </div>

        {/* Mobile only — form below image */}
        <div className="md:hidden bg-navy2 px-5 py-6 border-b border-white/6">
          <p className="text-gray/70 text-sm mb-4">Give us a few details and we'll match you with the right pro.</p>

          {/* Zip code */}
          <div className="flex items-center gap-2 border border-white/15 rounded-lg px-4 py-3 mb-3 bg-white/5">
            <svg className="w-4 h-4 text-white/40 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="text-white/40 text-sm mr-1">Zip code</span>
            <input type="text" defaultValue="97205" className="flex-1 text-sm text-white outline-none bg-transparent" />
          </div>

          {/* IT issue */}
          <div className="relative mb-3">
            <select className="w-full appearance-none border border-white/15 rounded-lg px-4 py-3 bg-navy text-sm text-white/80 outline-none focus:border-teal/50 transition-colors cursor-pointer">
              <option value="" disabled selected>IT issue</option>
              <option>Network / Internet issues</option>
              <option>Software troubleshooting</option>
              <option>Virus &amp; malware removal</option>
              <option>Data backup &amp; recovery</option>
              <option>Hardware issues</option>
              <option>Cloud setup &amp; migration</option>
              <option>General IT support</option>
            </select>
            <svg className="w-4 h-4 text-white/40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Computer type */}
          <div className="relative mb-3">
            <select className="w-full appearance-none border border-white/15 rounded-lg px-4 py-3 bg-navy text-sm text-white/80 outline-none focus:border-teal/50 transition-colors cursor-pointer">
              <option value="" disabled selected>Computer type</option>
              <option>PC (Windows)</option>
              <option>Mac (Apple)</option>
              <option>Linux</option>
              <option>Mixed / Multiple</option>
            </select>
            <svg className="w-4 h-4 text-white/40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Device type */}
          <div className="relative mb-4">
            <select className="w-full appearance-none border border-white/15 rounded-lg px-4 py-3 bg-navy text-sm text-white/80 outline-none focus:border-teal/50 transition-colors cursor-pointer">
              <option value="" disabled selected>Desktop or laptop</option>
              <option>Desktop</option>
              <option>Laptop</option>
              <option>Server</option>
              <option>Multiple devices</option>
            </select>
            <svg className="w-4 h-4 text-white/40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <a href="tel:+15033137121" className="w-full flex items-center justify-center bg-teal hover:bg-teal/90 text-white font-bold py-3.5 rounded-lg text-sm transition-all shadow-lg shadow-teal/20">
            Find a pro
          </a>
        </div>

      </section>

      {/* ── BREADCRUMB + TITLE ── */}
      <section className="bg-navy2 px-6 md:px-16 pt-8 pb-6 border-b border-white/6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-1.5 text-xs text-gray/50 mb-4">
            <Link href="/" className="hover:text-teal transition-colors">ZERO NERDS</Link>
            <span>›</span>
            <Link href="/areas" className="hover:text-teal transition-colors">OR</Link>
            <span>›</span>
            <Link href="/portland" className="hover:text-teal transition-colors">Portland</Link>
            <span>›</span>
            <span className="text-gray font-semibold">IT Support</span>
          </div>
          <h2 className="font-serif font-bold text-2xl md:text-3xl text-white mb-3">IT support technicians near Portland, OR</h2>
          <p className="text-gray text-sm leading-relaxed max-w-2xl">
            IT support pros in Portland, OR manage cloud infrastructure, monitor systems 24/7, and keep your business secure. They handle network setup, help desk support, and data backup so you spend less time troubleshooting and more time growing.
          </p>
        </div>
      </section>

      {/* ── PRO CARD ── */}
      <section className="bg-navy2 px-6 md:px-16 py-8 border-b border-white/6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-lg text-white">Top pros for your project</h3>
              <p className="text-gray text-xs mt-0.5">These highly recommended pros are experts, ready to help with your project.</p>
            </div>
            <div className="flex items-center gap-2 border border-white/10 bg-white/5 rounded-lg px-4 py-2 text-sm text-gray cursor-pointer">
              Recommended
              <svg className="w-4 h-4 text-gray/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="bg-navy border border-white/6 rounded-2xl p-6 flex flex-col sm:flex-row gap-5 hover:border-teal/30 transition-all">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center bg-[#dce6f5]">
                <Image src="/logo.png" alt="ZERO NERDS" width={72} height={72} className="object-contain p-1" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h4 className="font-bold text-white text-base">ZERO NERDS</h4>
                <span className="bg-teal/10 text-teal text-xs font-bold px-2 py-0.5 rounded-full border border-teal/20">Top Pro</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Stars n={5} />
                <span className="text-sm font-semibold text-white">Exceptional 5.0</span>
                <span className="text-gray text-sm">(50+ reviews)</span>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray mb-3">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-teal" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                  Portland, OR 97205
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-teal" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                  Responds within 15 min
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-teal" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
                  Serves Portland metro + Vancouver, WA
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-green-900/30 text-green-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-700/30">Great value</span>
                <span className="bg-amber-900/30 text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-700/30">In high demand</span>
                <span className="bg-teal/10 text-teal text-xs font-semibold px-2.5 py-1 rounded-full border border-teal/20">24/7 monitoring</span>
              </div>
              <blockquote className="text-gray text-sm italic leading-relaxed border-l-2 border-teal/30 pl-3">
                "ZERO NERDS is the absolute best IT service around. Very fast response time with a dedicated and educated team."
                <span className="block text-gray/60 text-xs mt-1 not-italic">— Kate LaMare</span>
              </blockquote>
            </div>
            <div className="flex flex-col gap-2 justify-center sm:min-w-[130px]">
              <a href="tel:+15033137121" className="bg-teal hover:bg-teal/90 text-white font-bold py-2.5 px-5 rounded-lg text-sm text-center transition-all">Call Now</a>
              <Link href="/contact" className="border border-white/15 hover:border-teal/40 text-gray hover:text-teal font-semibold py-2.5 px-5 rounded-lg text-sm text-center transition-all">View profile</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="bg-navy2 px-6 md:px-16 py-16 border-b border-white/6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label block text-center">Client Reviews</span>
            <h3 className="font-serif font-bold text-2xl md:text-3xl text-white mt-2 mb-2">What Our Clients Say</h3>
            <p className="text-gray text-sm">Verified reviews from businesses across Portland, OR and surrounding areas.</p>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
            {REVIEWS.map((r) => (
              <div key={r.name} className="break-inside-avoid mb-4 bg-navy border border-white/6 rounded-xl p-6 relative overflow-hidden">
                <span className="absolute top-3 right-4 text-white/5 font-serif select-none pointer-events-none leading-none" style={{ fontSize: '5rem' }}>&ldquo;</span>
                <Stars n={r.stars} />
                <p className="text-gray text-sm leading-relaxed mb-5 relative z-10 mt-1">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg,#29abe2,#1e5fa0)' }}>{r.initials}</div>
                  <div>
                    <div className="font-semibold text-sm text-white">{r.name}</div>
                    <div className="text-gray/60 text-xs">via Google Reviews</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ZERO NERDS ── */}
      <section className="bg-navy px-6 md:px-16 py-16 border-b border-white/6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="section-label block text-center mb-3">Why Choose Us</span>
          <h3 className="font-serif font-bold text-2xl md:text-3xl text-white mb-10">Why hire professionals at ZERO NERDS?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {[
              { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Flat-rate pricing', desc: 'No hidden fees — clear, predictable pricing upfront. Get cost estimates before committing.' },
              { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'Certified IT experts', desc: 'Vetted engineers with proven track records across networking, cloud, and security.' },
              { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Hire with confidence', desc: 'With 50+ verified reviews and 24/7 monitoring, you\'ll have all the info you need.' },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-xl bg-teal/10 flex items-center justify-center mb-4 border border-teal/15">
                  <svg className="w-7 h-7 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h4 className="font-bold text-white mb-2">{item.title}</h4>
                <p className="text-gray text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COST GUIDE ── */}
      <section className="bg-navy2 px-6 md:px-16 py-12 border-b border-white/6">
        <div className="max-w-5xl mx-auto">
          <span className="section-label block mb-2">Pricing</span>
          <h3 className="font-serif font-bold text-xl text-white mb-1">IT Support Cost Guide</h3>
          <p className="text-gray text-sm mb-8">Transparent pricing for Portland businesses.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s) => (
              <Link key={s.label} href={s.href} className="group flex items-start justify-between bg-navy hover:bg-navy/80 border border-white/6 hover:border-teal/30 rounded-xl p-4 transition-all">
                <div>
                  <p className="font-semibold text-sm text-white group-hover:text-teal transition-colors mb-1">{s.label}</p>
                  <p className="text-xs text-gray">{s.price}</p>
                </div>
                <svg className="w-4 h-4 text-white/20 group-hover:text-teal transition-colors mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
          <div className="mt-5">
            <Link href="/contact" className="text-teal text-sm font-semibold hover:text-cyan transition-colors">View cost guide →</Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-navy px-6 md:px-16 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="section-label block text-center">FAQ</span>
            <h3 className="font-serif font-bold text-2xl text-white mt-2 mb-2">Frequently Asked Questions</h3>
            <p className="text-gray text-sm">Common questions about IT support in Portland, OR.</p>
          </div>
          <div className="space-y-2">
            {FAQS.map((faq) => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>
    </>
  );
}

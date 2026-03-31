'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const SERVICES = [
  {
    id: 'managed-it',
    title: 'Managed IT Services',
    tagline: 'Proactive System Oversight',
    desc: 'Continuous monitoring and proactive system care that reduces outages and maintains reliable infrastructure performance.',
    href: '/solutions#managed-it',
  },
  {
    id: 'help-desk',
    title: 'IT Support & Help Desk',
    tagline: 'Responsive Technical Support',
    desc: 'Fast remote IT support that keeps your team productive and systems operating efficiently with structured tracking and clear communication.',
    href: '/solutions#help-desk',
  },
  {
    id: 'cloud',
    title: 'Cloud Server Hosting & Management',
    tagline: 'Secure Cloud Infrastructure',
    desc: 'Strengthen system stability and scalability while protecting your cloud infrastructure through proactive monitoring and optimization.',
    href: '/solutions#cloud',
  },
  {
    id: 'incident-response',
    title: 'Incident Response Services',
    tagline: 'Continuous Monitoring and Protection',
    desc: 'Real-time server monitoring, structured security configuration, and performance optimization that prevents disruptions before they impact operations.',
    href: '/solutions#incident-response',
  },
  {
    id: 'backup',
    title: 'Backup & Disaster Recovery',
    tagline: 'Protect Data and Maintain Continuity',
    desc: 'Automated cloud backups and structured recovery planning that protect critical data and restore operations quickly.',
    href: '/solutions#backup',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & Infrastructure Protection',
    tagline: 'Advanced Protection for Business Systems',
    desc: 'Layered security controls that defend networks, endpoints, and servers through 24/7 monitoring and structured threat response.',
    href: '/solutions#cybersecurity',
  },
];

const TESTIMONIALS = [
  {
    stars: 5,
    text: 'ZERO NERDS is the absolute best IT service around. Very fast response time with a dedicated and educated team. They can solve any issue that occurs, leaving us with less downtime than ever before.',
    name: 'Kate LaMare',
    initials: 'KL',
  },
  {
    stars: 5,
    text: 'Out of all the firms I\'ve hired, and even dedicated techs as employees, nothing compares to the level of expertise and sense of urgency as Daniel and his Team. Amazing Service, Integrity and Knowledge in all aspects of the craft. The patience and ability to break nomenclature down to means that non-technical folks can understand is extremely helpful.',
    name: 'Chris Wilson',
    initials: 'CW',
  },
  {
    stars: 5,
    text: 'The best IT services I have ever encountered. Quick to respond and always resolves any issues we are having. Danny and his team are the best at what they do.',
    name: 'Katelyn',
    initials: 'KT',
  },
  {
    stars: 5,
    text: 'Danny is an incredible IT support. Danny is super knowledgeable and works to get your company to the level you need to be and takes your budget into account. He is also accessible when an IT event happens no matter when. Your IT needs are in good hands with Danny and his team.',
    name: 'Lisa Cook',
    initials: 'LC',
  },
  {
    stars: 5,
    text: 'Danny and his team at ZERO NERDS have been awesome to work with. Their passion and dedication to their craft is very apparent. I look forward to further interactions and collaboration with them.',
    name: 'Robbie Myers',
    initials: 'RM',
  },
  {
    stars: 5,
    text: 'Love working with ZERO NERDS! Quick, efficient, knowledgeable, overall great Team!',
    name: 'Nicole Nelson',
    initials: 'NN',
  },
  {
    stars: 5,
    text: 'Daniel is awesome, so helpful and on top of everything. During our company change over, Daniel was integral in making sure we were set up and running smoothly. He helped me most any time day or night. I cannot say enough about Daniel, and I appreciate him and the whole team at ZERO NERDS!',
    name: 'Robert Moore',
    initials: 'RMO',
  },
  {
    stars: 5,
    text: 'We love ZERO NERDS! Daniel and his team are so helpful!',
    name: 'Laura Brown',
    initials: 'LB',
  },
  {
    stars: 5,
    text: 'Daniel and his team are AWESOME! Professional, friendly, and knowledgeable. Great communication on the status of issues. Any issues I\'ve had have been resolved quickly. Overall, a very positive experience with ZERO NERDS!',
    name: 'Jill Lee',
    initials: 'JL',
  },
  {
    stars: 5,
    text: 'Bridgewell Building Materials has partnered with Danny and ZERO NERDS for the migration of all of our business IT infrastructure and I could not have asked for a better partner. We have completed week one and every day the business is running more efficiently. Thank you Danny and your team for your dedication and hard work in this transition.',
    name: 'David Routt JR',
    initials: 'DR',
  },
  {
    stars: 5,
    text: 'These guys are terrific, responsible, and lovely to work with. We have a difficult house with lots of impediments and they helped us design a working home network, and followed up to help us tweak it. Great group and we will be calling again if we need it. So far everything has worked great since installed!',
    name: 'Laura Capper',
    initials: 'LCA',
  },
  {
    stars: 5,
    text: 'Danny and the team at ZERO NERDS are awesome! I know next to nothing about IT stuff, so having someone knowledgeable is a must when issues come up. The fact that they handled my issues quickly and completely the first time, is a massive bonus! You won\'t go wrong working with the team at ZERO NERDS!',
    name: 'Robert Smart',
    initials: 'RS',
  },
];

const FAQS = [
  {
    q: 'What does an IT support company provide?',
    a: 'An IT support company delivers proactive monitoring, troubleshooting, cybersecurity protection, and infrastructure management to maintain uptime and operational stability.',
  },
  {
    q: 'How do managed IT services reduce downtime?',
    a: 'Managed services include continuous monitoring, system updates, and infrastructure management that prevent outages before they impact productivity.',
  },
  {
    q: 'Do you support small businesses in Portland, OR?',
    a: 'Yes, we provide business IT support and cybersecurity services for growing organizations in Portland, OR, and across the United States.',
  },
  {
    q: 'How does cloud monitoring improve performance?',
    a: 'Cloud monitoring ensures stable cloud infrastructure management, identifies performance issues early, and protects data with high availability configurations.',
  },
  {
    q: 'What is included in disaster recovery solutions?',
    a: 'Our disaster recovery solutions include automated cloud backups, encrypted storage, and structured recovery planning to restore operations quickly.',
  },
  {
    q: 'How quickly can we get started?',
    a: 'After a free IT assessment, we typically have your environment fully onboarded and monitored within 48 hours with no long-term contracts required.',
  },
];

const TICKER_ITEMS = [
  'Managed IT Services', 'Cloud Monitoring', 'Cybersecurity Protection', '24/7 Help Desk',
  'Network Infrastructure', 'Disaster Recovery', 'Microsoft 365 Support', 'Incident Response',
  'Managed IT Services', 'Cloud Monitoring', 'Cybersecurity Protection', '24/7 Help Desk',
  'Network Infrastructure', 'Disaster Recovery', 'Microsoft 365 Support', 'Incident Response',
];

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

function Stars({ n }) {
  return <div className="text-yellow-400 text-sm mb-3">{'★'.repeat(n)}</div>;
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/8 rounded-xl overflow-hidden">
      <button
        className="w-full flex justify-between items-center px-6 py-5 text-left hover:bg-white/3 transition-colors gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-sm leading-snug">{q}</span>
        <svg
          className={`w-4 h-4 text-teal flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-6 pb-5 text-gray text-sm leading-relaxed border-t border-white/5 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

// Per-image tuning: scale + object-position to hide removebg edge artifacts
const TEAM_CONFIG = {
  1: { scale: 1.18, pos: 'center 8%'  },
  2: { scale: 1.22, pos: 'center 5%'  },
  3: { scale: 1.20, pos: 'center 6%'  },
  4: { scale: 1.18, pos: 'center 8%'  },
  5: { scale: 1.18, pos: 'center 8%'  },
  6: { scale: 1.15, pos: 'center 5%'  },
  7: { scale: 1.18, pos: 'center 6%'  },
  8: { scale: 1.18, pos: 'center 8%'  },
};

function TeamCircle({ n }) {
  const { scale, pos } = TEAM_CONFIG[n] || { scale: 1.18, pos: 'center 8%' };
  return (
    <div
      className="flex-shrink-0 relative rounded-full overflow-hidden border-2 md:border-4 border-white shadow-xl"
      style={{ width: 'clamp(90px, 22vw, 170px)', height: 'clamp(90px, 22vw, 170px)' }}
    >
      {/* Image scaled up so jagged removebg edges are pushed outside the circle clip */}
      <img
        src={`/team/team${n}.png`}
        alt="Team member"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: pos, transform: `scale(${scale})`, transformOrigin: 'center top' }}
      />
      {/* Radial vignette — fades rough edges to the section bg color */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 52%, rgba(13,21,48,0.55) 80%, rgba(13,21,48,0.85) 100%)' }}
      />
    </div>
  );
}

function MobileStickyCTA({ show }) {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${show ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="bg-navy2/95 backdrop-blur-md border-t border-white/10 p-3 flex gap-2">
        <a
          href="tel:+15033137121"
          className="flex-1 bg-teal hover:bg-teal/90 text-white font-bold py-3 rounded-lg text-sm inline-flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          Get Instant Help
        </a>
        <Link
          href="/contact"
          className="flex-1 border border-teal/50 text-teal font-bold py-3 rounded-lg text-sm inline-flex items-center justify-center"
        >
          Get Free Quote
        </Link>
      </div>
    </div>
  );
}

export default function HomePage() {
  useReveal();

  const [stickyVisible, setStickyVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById('hero-section');
    if (!hero) return;
    const obs = new IntersectionObserver(([e]) => setStickyVisible(!e.isIntersecting), { threshold: 0 });
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section id="hero-section" className="relative min-h-screen flex items-center justify-center text-center px-5 py-28 overflow-hidden bg-navy2">
        <div className="absolute inset-0 hero-grid-bg opacity-80 pointer-events-none" />
        <div
          className="absolute pointer-events-none"
          style={{
            width: 700, height: 700,
            background: 'radial-gradient(circle, rgba(53,178,159,.15) 0%, transparent 70%)',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1
            className="animate-fade-in-up-1 font-serif font-bold leading-[1.08] mb-6"
            style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5.2rem)' }}
          >
            <span className="grad-text"><span style={{ fontSize: '80%' }}>Near Zero Downtime.</span></span>
            <br />
            Your Team of Nerds
            <br />
            24/7/365
          </h1>

          <p
            className="animate-fade-in-up-2 text-gray leading-relaxed mx-auto mb-8"
            style={{ fontSize: 'clamp(.95rem, 2vw, 1.15rem)', maxWidth: 560 }}
          >
            We provide proactive IT services, cloud management, and cybersecurity that reduce downtime
            and protect your systems from disruption.
          </p>

          <div className="animate-fade-in-up-3 flex flex-wrap gap-3 justify-center mb-4">
            <a
              href="tel:+15033137121"
              className="bg-teal hover:bg-teal/90 text-white font-bold px-8 py-3.5 rounded-lg transition-all duration-200 shadow-lg shadow-teal/25 text-sm tracking-wide inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Get Instant Help
            </a>
            <Link
              href="/contact"
              className="border border-teal/50 text-cyan hover:border-teal hover:bg-teal/8 font-bold px-8 py-3.5 rounded-lg transition-all duration-200 text-sm tracking-wide"
            >
              Get Free Quote
            </Link>
          </div>

        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker-wrap py-3 overflow-hidden" style={{ background: 'linear-gradient(90deg,#1e5fa0,#29abe2)' }}>
        <div className="ticker-inner">
          {TICKER_ITEMS.map((item, i) => (
            <span key={i} className="text-white text-xs font-semibold tracking-widest uppercase opacity-90">
              {item}<span className="mx-4 opacity-40">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── TEAM FACES ── */}
      <section className="bg-navy2 pt-16 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center mb-10 px-5">
          <span className="section-label block text-center">Meet the Team</span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold mt-2">The People Behind Your IT</h2>
          <p className="text-gray text-sm mt-3 leading-relaxed max-w-sm mx-auto">Real people. Real expertise. Ready when you need us.</p>
        </div>

        {/* Scrolling row 1 — left */}
        <div className="relative overflow-hidden mb-4" style={{ height: 'clamp(110px, 26vw, 200px)' }}>
          <div className="flex items-center gap-3 md:gap-6 absolute" style={{ animation: 'teamScrollL 30s linear infinite', width: 'max-content' }}>
            {[0,1,2].flatMap((set) =>
              [1,2,3,4].map((n) => (
                <TeamCircle key={`r1-${set}-${n}`} n={n} />
              ))
            )}
          </div>
          <div className="absolute inset-y-0 left-0 w-12 md:w-24 pointer-events-none z-10" style={{ background: 'linear-gradient(to right,#0d1530,transparent)' }} />
          <div className="absolute inset-y-0 right-0 w-12 md:w-24 pointer-events-none z-10" style={{ background: 'linear-gradient(to left,#0d1530,transparent)' }} />
        </div>

        {/* Scrolling row 2 — right */}
        <div className="relative overflow-hidden mb-8" style={{ height: 'clamp(110px, 26vw, 200px)' }}>
          <div className="flex items-center gap-3 md:gap-6 absolute" style={{ animation: 'teamScrollR 36s linear infinite', width: 'max-content' }}>
            {[0,1,2].flatMap((set) =>
              [5,6,7,8].map((n) => (
                <TeamCircle key={`r2-${set}-${n}`} n={n} />
              ))
            )}
          </div>
          <div className="absolute inset-y-0 left-0 w-12 md:w-24 pointer-events-none z-10" style={{ background: 'linear-gradient(to right,#0d1530,transparent)' }} />
          <div className="absolute inset-y-0 right-0 w-12 md:w-24 pointer-events-none z-10" style={{ background: 'linear-gradient(to left,#0d1530,transparent)' }} />
        </div>

        {/* CTA */}
        <div className="text-center pb-10 px-5">
          <a
            href="tel:+15033137121"
            className="inline-flex items-center justify-center gap-3 bg-teal hover:bg-teal/90 text-white font-bold text-base md:text-lg px-10 md:px-14 py-4 md:py-5 rounded-xl transition-all shadow-xl shadow-teal/25 w-full max-w-lg"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Get Instant Help
          </a>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="bg-navy py-24 px-5">
        <div className="max-w-3xl mx-auto">
          <div className="reveal">
            <span className="section-label">Who We Are</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold leading-tight mt-3 mb-5">
              A Reliable IT Support Company in Portland, OR and Surrounding Areas
            </h2>
            <p className="text-gray text-sm leading-relaxed mb-8">
              We are a trusted IT support company with 11 years of experience serving businesses in Portland, OR and nationwide. ZERO NERDS delivers proactive managed IT, cybersecurity protection, and 24/7 infrastructure monitoring that keep systems stable, secure, and running without interruption.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <Link href="/about" className="inline-block bg-teal hover:bg-teal/90 text-white font-bold px-7 py-3 rounded-lg transition-all text-sm">
                Get To Know Us
              </Link>
              <Link href="/about" className="text-teal hover:text-cyan text-sm font-semibold transition-colors inline-flex items-center gap-1.5">
                About Our Company
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="bg-[#0f1d38] py-20 px-5" id="services">
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-14 max-w-2xl mx-auto">
            <span className="section-label">Our Solutions</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Dependable IT That Delivers
            </h2>
            <p className="text-gray text-sm leading-relaxed">
              Technology built for reliability and growth. Six core service areas
              designed to keep your business running without interruption.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {SERVICES.map((s) => (
              <Link
                key={s.id}
                href={s.href}
                className="reveal card-bar relative bg-navy border border-white/6 rounded-xl overflow-hidden hover:border-teal/30 hover:shadow-xl hover:shadow-black/20 transition-all duration-300 group flex flex-col"
              >
                <div className="bg-gradient-to-r from-amber-400 to-teal h-[3px]" />
                <div className="p-4 md:p-7 flex flex-col flex-1">
                  <span className="text-amber-400 text-[10px] md:text-xs font-bold uppercase tracking-widest block mb-2 group-hover:text-amber-300 transition-colors">{s.tagline}</span>
                  <h3 className="font-serif font-bold text-sm md:text-base mb-2 md:mb-3 text-white leading-snug">{s.title}</h3>
                  <p className="text-gray text-xs md:text-sm leading-relaxed flex-1 hidden sm:block">{s.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-teal text-xs font-bold tracking-wide uppercase">
                    Learn More
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="reveal text-center mt-10">
            <Link href="/solutions" className="border border-teal/40 text-teal hover:bg-teal hover:text-white font-bold px-8 py-3 rounded-lg transition-all duration-200 text-sm">
              View All Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-navy2 py-20 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-14 max-w-xl mx-auto">
            <span className="section-label">Client Reviews</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
              What Our Clients Say
            </h2>
            <p className="text-gray text-sm">Verified reviews from businesses across Portland, OR and surrounding areas.</p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="reveal break-inside-avoid mb-4 bg-navy border border-white/6 rounded-xl p-6 relative overflow-hidden">
                <span
                  className="absolute top-3 right-4 text-white/5 font-serif select-none pointer-events-none leading-none"
                  style={{ fontSize: '5rem' }}
                >
                  &ldquo;
                </span>
                <Stars n={t.stars} />
                <p className="text-gray text-sm leading-relaxed mb-5 relative z-10">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,#29abe2,#1e5fa0)' }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-gray/60 text-xs">via Google Reviews</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-navy py-20 px-5">
        <div className="max-w-3xl mx-auto">
          <div className="reveal text-center mb-12">
            <span className="section-label">FAQ</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-gray text-sm">Common questions about our IT services and how we work.</p>
          </div>
          <div className="reveal space-y-2">
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section
        className="py-24 px-5 text-center"
        style={{ background: 'linear-gradient(135deg,#091a33,#0d1530,#0a1828)' }}
      >
        <div className="reveal max-w-2xl mx-auto">
          <span className="section-label block text-center mb-4">Get Started</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-5 leading-tight">
            Identify Vulnerabilities Before<br />They Cause Downtime
          </h2>
          <p className="text-gray text-sm leading-relaxed mb-9 max-w-md mx-auto">
            Secure your Free Cyber Security Audit today. No commitment, no sales pressure —
            just clear, honest advice from a team that has been doing this for 11 years.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact"
              className="bg-teal hover:bg-teal/90 text-white font-bold px-8 py-3.5 rounded-lg transition-all shadow-lg shadow-teal/20 text-sm tracking-wide"
            >
              Claim Your Free Cyber Security Audit
            </Link>
            <a
              href="tel:+15033137121"
              className="border border-teal/40 text-cyan hover:border-teal hover:bg-teal/8 font-bold px-8 py-3.5 rounded-lg transition-all text-sm tracking-wide"
            >
              Call Us — (503) 313-7121
            </a>
          </div>
        </div>
      </section>

      <MobileStickyCTA show={stickyVisible} />
    </>
  );
}

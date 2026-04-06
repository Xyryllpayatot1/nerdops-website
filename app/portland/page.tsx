import Link from 'next/link';
import { FAQSection } from '@/components/FAQSection';
import PageClientShell from '@/components/PageClientShell';
import AuditButton from '@/components/AuditButton';

const SERVICES = [
  {
    title: 'Managed IT Services',
    tagline: 'Proactive System Oversight',
    desc: 'Continuous monitoring and proactive system care that reduces outages and maintains reliable infrastructure performance for Portland businesses.',
    href: '/solutions#managed-it',
  },
  {
    title: 'IT Support & Help Desk',
    tagline: 'Responsive Technical Support',
    desc: 'Fast remote IT support that keeps your Portland team productive and systems operating efficiently with structured tracking and clear communication.',
    href: '/solutions#help-desk',
  },
  {
    title: 'Cloud Server Hosting & Management',
    tagline: 'Secure Cloud Infrastructure',
    desc: 'Scalable, high-availability cloud infrastructure designed to support Portland businesses with proactive monitoring and performance optimization.',
    href: '/solutions#cloud',
  },
  {
    title: 'Incident Response Services',
    tagline: 'Continuous Monitoring and Protection',
    desc: 'Real-time server monitoring, structured security configuration, and performance optimization that prevents disruptions before they impact your operations.',
    href: '/solutions#incident-response',
  },
  {
    title: 'Backup & Disaster Recovery',
    tagline: 'Protect Data and Maintain Continuity',
    desc: 'Automated cloud backups and structured recovery planning that protect critical data and restore Portland business operations quickly.',
    href: '/solutions#backup',
  },
  {
    title: 'Cybersecurity & Infrastructure Protection',
    tagline: 'Advanced Protection for Business Systems',
    desc: 'Layered security controls that defend Portland networks, endpoints, and servers through 24/7 monitoring and structured threat response.',
    href: '/solutions#cybersecurity',
  },
];

const FAQS = [
  {
    q: 'Do you provide IT support for businesses in Portland, OR?',
    a: 'Yes. We serve businesses throughout Portland, OR and surrounding areas with managed IT services, cybersecurity, cloud hosting, and 24/7 help desk support.',
  },
  {
    q: 'What industries do you support in Portland?',
    a: 'We support a wide range of industries in Portland including professional services, healthcare, retail, construction, and non-profits — any organization that depends on reliable IT infrastructure.',
  },
  {
    q: 'How quickly can you respond to IT issues in Portland?',
    a: 'Remote issues are typically addressed within 15 minutes. On-site support in the Portland metro area is available with a structured SLA. Emergency support is available 24/7.',
  },
  {
    q: 'Do you offer managed IT services near downtown Portland?',
    a: 'Yes. Our office is located at 750 SW 9th Ave, Portland, OR 97205. We serve businesses throughout the greater Portland metro area including downtown, the Pearl District, and surrounding neighborhoods.',
  },
  {
    q: 'Can you support a Portland business that also has remote employees?',
    a: 'Absolutely. Our cloud management and remote IT support infrastructure is built for distributed teams. We can monitor, secure, and support your workforce regardless of where they work.',
  },
];

export default function PortlandPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center text-center px-5 py-28 overflow-hidden bg-navy2">
        <div className="absolute inset-0 hero-grid-bg opacity-60 pointer-events-none" />
        <div
          className="absolute pointer-events-none"
          style={{
            width: 600, height: 600,
            background: 'radial-gradient(circle, rgba(41,171,226,.12) 0%, transparent 70%)',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1
            className="animate-fade-in-up-1 font-serif font-bold leading-[1.08] mb-6"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)' }}
          >
            <span className="grad-text">Reliable IT Support</span>
            <br />
            for Portland Businesses
          </h1>
          <p
            className="animate-fade-in-up-2 text-gray leading-relaxed mx-auto mb-8"
            style={{ fontSize: 'clamp(.95rem, 2vw, 1.1rem)', maxWidth: 540 }}
          >
            We provide proactive managed IT services, cybersecurity protection, and 24/7 help desk
            support for businesses throughout Portland, OR and the surrounding metro area.
          </p>
          <div className="animate-fade-in-up-3 flex flex-wrap gap-3 justify-center">
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
              href="/get-started/wizard"
              className="border border-teal/50 text-cyan hover:border-teal hover:bg-teal/8 font-bold px-8 py-3.5 rounded-lg transition-all duration-200 text-sm tracking-wide"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* About Portland */}
      <section className="bg-navy py-20 px-5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="reveal">
            <span className="section-label">Portland, OR</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-5">
              IT Support Company Serving Portland, OR and Surrounding Areas
            </h2>
            <p className="text-gray text-sm leading-relaxed">
              We are a trusted IT support company serving businesses throughout Portland, OR. From downtown Portland to the surrounding metro area, we provide proactive IT services that reduce downtime, strengthen cybersecurity, and keep operations running smoothly. Located at 750 SW 9th Ave, Portland, OR 97205 — available for both remote and on-site support.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <AuditButton className="bg-teal hover:bg-teal/90 text-white font-bold px-7 py-3 rounded-lg transition-all text-sm">
                Schedule IT Assessment
              </AuditButton>
              <Link href="/about" className="border border-teal/40 text-teal hover:border-teal font-bold px-7 py-3 rounded-lg transition-all text-sm">
                About Our Company
              </Link>
            </div>
          </div>

          <div className="reveal bg-navy2 border border-teal/10 rounded-2xl p-8">
            <span className="section-label block mb-4">Our Portland Office</span>
            <h3 className="font-serif font-bold text-xl mb-6">Visit or Call Us</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal/10 border border-teal/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-teal" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray text-xs mb-0.5">Office Address</p>
                  <p className="font-semibold text-white leading-snug">750 SW 9th Ave<br />Portland, OR 97205</p>
                </div>
              </div>
              <a href="tel:+15033137121" className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-teal/10 border border-teal/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-teal" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray text-xs mb-0.5">Phone</p>
                  <p className="font-semibold text-white group-hover:text-teal transition-colors">(503) 313-7121</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services masonry */}
      <section className="bg-navy2 py-12 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-14 max-w-2xl mx-auto">
            <span className="section-label">Our Solutions</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              IT Services for Portland Businesses
            </h2>
            <p className="text-gray text-sm leading-relaxed">
              Structured IT services designed to keep Portland organizations secure, stable, and running without interruption.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="reveal card-bar relative bg-navy border border-white/6 rounded-xl p-7 overflow-hidden hover:border-teal/30 hover:shadow-xl hover:shadow-black/20 transition-all duration-300 group flex flex-col"
              >
                <span className="section-label block mb-2 group-hover:text-cyan transition-colors">{s.tagline}</span>
                <h3 className="font-serif font-bold text-base mb-3 text-white leading-snug">{s.title}</h3>
                <p className="text-gray text-sm leading-relaxed">{s.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-teal text-xs font-bold tracking-wide uppercase">
                  Learn More
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us for Portland */}
      <section className="bg-navy py-20 px-5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="reveal">
            <span className="section-label">Why Choose Us</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-5 leading-tight">
              Portland&apos;s Trusted IT Partner
            </h2>
            <p className="text-gray text-sm leading-relaxed mb-5">
              Businesses across Portland trust us to keep their technology secure, stable, and performing at its best.
            </p>
            <ul className="space-y-3.5 mb-8">
              {[
                '24/7 infrastructure monitoring with no geographic restriction',
                'On-site support available throughout the Portland metro area',
                'Flat-rate pricing — no surprise invoices',
                'Certified engineers across Microsoft, Cisco, AWS, and Google Cloud',
                'Structured incident response and root cause analysis',
                'Month-to-month agreements — no long-term lock-in',
                'Response within 15 minutes for remote issues',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray">
                  <svg className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal bg-navy2 border border-teal/10 rounded-2xl p-8">
            <span className="section-label block mb-4">Our Portland Office</span>
            <h3 className="font-serif font-bold text-xl mb-6">Visit or Call Us</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal/10 border border-teal/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-teal" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray text-xs mb-0.5">Office Address</p>
                  <p className="font-semibold text-white leading-snug">750 SW 9th Ave<br />Portland, OR 97205</p>
                </div>
              </div>
              <a href="tel:+15033137121" className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-teal/10 border border-teal/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-teal" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray text-xs mb-0.5">Phone</p>
                  <p className="font-semibold text-white group-hover:text-teal transition-colors">(503) 313-7121</p>
                </div>
              </a>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal/10 border border-teal/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-teal" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray text-xs mb-0.5">Business Hours</p>
                  <p className="font-semibold text-white">Mon – Fri: 8:00 AM – 5:00 PM</p>
                  <p className="text-teal text-xs mt-1 font-semibold">Emergency line available 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-navy2 py-12 px-5">
        <div className="max-w-3xl mx-auto">
          <div className="reveal text-center mb-12">
            <span className="section-label">FAQ</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">Portland IT Support — FAQs</h2>
            <p className="text-gray text-sm">Common questions from Portland businesses about our IT services.</p>
          </div>
          <div className="reveal">
            <FAQSection faqs={FAQS} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 px-5 text-center"
        style={{ background: 'linear-gradient(135deg,#091a33,#0d1530,#0a1828)' }}
      >
        <div className="reveal max-w-2xl mx-auto">
          <span className="section-label block text-center mb-4">Get Started in Portland</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-5 leading-tight">
            Claim Your Free Cyber Security Audit
          </h2>
          <p className="text-gray text-sm leading-relaxed mb-9 max-w-md mx-auto">
            Identify vulnerabilities before they cause downtime. Available to all businesses
            in Portland, OR and surrounding areas — no commitment, no sales pressure.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <AuditButton className="bg-teal hover:bg-teal/90 text-white font-bold px-8 py-3.5 rounded-lg transition-all shadow-lg shadow-teal/20 text-sm tracking-wide">
              Claim Your Free Cyber Security Audit
            </AuditButton>
            <a
              href="tel:+15033137121"
              className="border border-teal/40 text-cyan hover:border-teal hover:bg-teal/8 font-bold px-8 py-3.5 rounded-lg transition-all text-sm tracking-wide inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Get Instant Help
            </a>
          </div>
        </div>
      </section>

      <PageClientShell />
    </>
  );
}

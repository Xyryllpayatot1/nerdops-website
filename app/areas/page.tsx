import Link from 'next/link';
import { FAQSection } from '@/components/FAQSection';
import PageClientShell from '@/components/PageClientShell';
import AuditButton from '@/components/AuditButton';
import AreasMapClient from '@/components/AreasMapClient';

const OREGON_CITIES     = ['Portland','Gresham','Hillsboro','Beaverton','Lake Oswego','Tualatin','Tigard','Milwaukie','Oregon City','Troutdale','Fairview','Sherwood','Wilsonville','West Linn','Gladstone','Happy Valley'];
const WASHINGTON_CITIES = ['Vancouver','Battleground','Camas','Washougal','Ridgefield','La Center','Woodland','Longview'];
const TEXAS_CITIES      = ['Houston','Dallas','San Antonio','Austin','Fort Worth','Arlington','Plano','Garland','Corpus Christi'];
const FLORIDA_CITIES    = ['Miami','Jacksonville','Tampa','Orlando','St. Petersburg','Chula Vista'];

export default function AreasPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy2 py-20 px-5 overflow-hidden">
        <div className="absolute inset-0 hero-grid-bg opacity-40 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="section-label block text-center">Areas We Serve</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mt-3 mb-5 leading-tight">
            IT Support Across<br />the United States
          </h1>
          <p className="text-gray text-base leading-relaxed max-w-xl mx-auto">
            On-site managed IT, cybersecurity, and 24/7 help desk support throughout Portland, OR
            and the surrounding metro — both sides of the Columbia River. Active coverage in Texas & Florida with remote support available nationwide.
          </p>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="bg-navy py-12 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="reveal text-center mb-10">
            <span className="section-label">Service Map</span>
            <h2 className="font-serif text-3xl font-bold mb-2">Where We Operate</h2>
            <p className="text-gray text-sm">Hover over states or city pins to see coverage details.</p>
          </div>

          <div className="reveal mb-14">
            <AreasMapClient />
          </div>

          {/* City lists */}
          <div className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="bg-navy2 border border-white/8 rounded-2xl p-5">
              <h3 className="font-serif font-bold text-base text-white mb-3">Oregon</h3>
              <div className="grid grid-cols-2 gap-y-1.5 gap-x-2">
                {OREGON_CITIES.map((city) => (
                  <div key={city} className="flex items-center gap-1.5 text-gray text-xs">
                    <span className="w-1 h-1 rounded-full bg-teal flex-shrink-0" />
                    {city}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navy2 border border-white/8 rounded-2xl p-5">
              <h3 className="font-serif font-bold text-base text-white mb-3">Washington</h3>
              <div className="grid grid-cols-2 gap-y-1.5 gap-x-2">
                {WASHINGTON_CITIES.map((city) => (
                  <div key={city} className="flex items-center gap-1.5 text-gray text-xs">
                    <span className="w-1 h-1 rounded-full bg-teal flex-shrink-0" />
                    {city}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navy2 border border-teal/30 rounded-2xl p-5">
              <h3 className="font-serif font-bold text-base text-white mb-3">Texas</h3>
              <div className="grid grid-cols-2 gap-y-1.5 gap-x-2">
                {TEXAS_CITIES.map((city) => (
                  <div key={city} className="flex items-center gap-1.5 text-gray text-xs">
                    <span className="w-1 h-1 rounded-full bg-teal flex-shrink-0" />
                    {city}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navy2 border border-teal/30 rounded-2xl p-5">
              <h3 className="font-serif font-bold text-base text-white mb-3">Florida</h3>
              <div className="grid grid-cols-2 gap-y-1.5 gap-x-2">
                {FLORIDA_CITIES.map((city) => (
                  <div key={city} className="flex items-center gap-1.5 text-gray text-xs">
                    <span className="w-1 h-1 rounded-full bg-teal flex-shrink-0" />
                    {city}
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-xs text-gray/60">
                Remote support nationwide
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Remote section */}
      <section className="bg-navy2 py-12 px-5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="reveal">
            <span className="section-label">Nationwide Coverage</span>
            <h2 className="font-serif text-3xl font-bold mb-5 leading-tight">Remote IT Support Across the United States</h2>
            <p className="text-gray text-sm leading-relaxed mb-7">
              While on-site coverage focuses on the Portland metro area, Texas, and Florida, our remote support infrastructure extends to businesses nationwide — most issues resolved securely through encrypted remote access tools.
            </p>
            <ul className="space-y-3.5 mb-8">
              {[
                'Secure encrypted remote access for immediate resolution',
                '24/7 infrastructure monitoring — no geographic restriction',
                'Cloud services managed and optimized from anywhere',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray">
                  <svg className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/get-started/wizard" className="bg-teal hover:bg-teal/90 text-white font-bold px-7 py-3 rounded-lg transition-all text-sm">
              Get Free Quote
            </Link>
          </div>

          <div className="reveal bg-navy border border-teal/10 rounded-2xl p-8">
            <h3 className="font-serif font-bold text-xl mb-6">Remote Support Performance</h3>
            <div className="space-y-4">
              {[
                { label: 'Average Remote Response Time', val: '< 15 min' },
                { label: 'Remote Issue Resolution Rate',  val: '95%+' },
                { label: 'Connection Security',            val: '100% Encrypted' },
              ].map((m) => (
                <div key={m.label} className="flex items-center justify-between bg-navy2 border border-white/6 rounded-xl px-5 py-4">
                  <span className="text-gray text-sm">{m.label}</span>
                  <span className="font-serif font-bold text-cyan text-lg">{m.val}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-teal/8 border border-teal/15 rounded-xl text-sm text-gray leading-relaxed">
              Not seeing your city? Call{' '}
              <a href="tel:+15033137121" className="text-teal font-semibold">(503) 313-7121</a> — we likely serve your area.
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-16 px-5 text-center">
        <div className="reveal max-w-xl mx-auto">
          <h2 className="font-serif text-3xl font-bold mb-5">
            Identify Vulnerabilities Before They Cause Downtime
          </h2>
          <p className="text-gray text-sm leading-relaxed mb-8">
            Secure your Free Cyber Security Audit today. Available to all businesses in Portland, OR and surrounding areas.
          </p>
          <AuditButton className="bg-teal hover:bg-teal/90 text-white font-bold px-9 py-3.5 rounded-lg transition-all shadow-lg shadow-teal/20 text-sm">
            Claim Your Free Cyber Security Audit
          </AuditButton>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-navy2 py-20 px-5">
        <div className="max-w-3xl mx-auto">
          <div className="reveal text-center mb-12">
            <span className="section-label">FAQ</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-gray text-sm">Questions about our service areas and coverage.</p>
          </div>
          <div className="reveal">
            <FAQSection faqs={[
              { q: 'What areas do you serve?', a: 'We serve Portland, OR and the entire metro area including Vancouver, WA, Gresham, Hillsboro, Beaverton, Lake Oswego, and surrounding cities. Remote support is available nationwide.' },
              { q: 'Do you offer on-site support?', a: 'Yes. On-site support is available throughout the Portland metro area with same-day or next-day response depending on urgency.' },
              { q: 'Can you support businesses outside Oregon?', a: 'Absolutely. Our remote IT support infrastructure serves businesses nationwide, and we can coordinate on-site support through our partner network.' },
              { q: 'How quickly can you respond to an issue?', a: 'Remote issues are typically addressed within 15 minutes. On-site support is available same-day or next-day depending on the urgency of the issue.' },
              { q: 'Is remote support available 24/7?', a: 'Yes. We provide 24/7 infrastructure monitoring and emergency support line for critical issues regardless of the time or day.' },
            ]} />
          </div>
        </div>
      </section>

      <PageClientShell />
    </>
  );
}

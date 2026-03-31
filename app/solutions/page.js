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

const SOLUTIONS = [
  {
    id: 'managed-it',
    title: 'Managed IT Services',
    tagline: 'Proactive Infrastructure Oversight',
    desc: '24/7 infrastructure monitoring, patch management, and proactive system maintenance that keeps your business running without interruption.',
    features: [
      '24/7 Infrastructure Monitoring',
      'Server Management Services',
      'Patch and Update Management',
      'Infrastructure Management',
      'Proactive IT Solutions',
      'Enterprise IT Support Alignment',
    ],
    cta: 'Call For IT Management Services',
  },
  {
    id: 'help-desk',
    title: 'IT Support & Help Desk Services',
    tagline: 'Fast Technical Support When You Need It',
    desc: 'Fast remote IT support with structured ticketing that resolves issues quickly and keeps your team productive.',
    features: [
      'Remote IT Support — Secure remote access for fast issue resolution',
      'Help Desk Ticketing System — Structured tracking ensuring documentation and accountability',
      'Microsoft 365 Support — Account management, email troubleshooting, collaboration tools',
      'Desktop Support — Hardware diagnostics, software updates, workstation performance',
      'Network Troubleshooting — Connectivity issue identification and correction',
      'Technical Support Services — Ongoing guidance aligned with infrastructure stability',
    ],
    cta: 'Call For IT Support',
  },
  {
    id: 'cloud',
    title: 'Cloud Server Hosting & Management',
    tagline: 'Secure and Scalable Cloud Infrastructure',
    desc: 'Scalable, high-availability cloud infrastructure with continuous monitoring and secure migration support.',
    features: [
      'Cloud Server Hosting',
      'Managed Cloud Infrastructure',
      'Secure Cloud Migration',
      'Cloud Server Management',
      'Cloud Performance Tuning',
      'High Availability Cloud Architecture',
    ],
    cta: 'Call For Cloud Monitoring Services',
  },
  {
    id: 'incident-response',
    title: 'Incident Response Services',
    tagline: 'Continuous Monitoring and Protection',
    desc: 'Real-time server monitoring and structured security configuration that prevents disruptions before they impact operations.',
    features: [
      'Real-Time Server Monitoring Service',
      'Server Maintenance Services',
      'Security Configuration',
      'Remote Server Management',
      'Server Performance Optimization',
      'Incident Response Services',
    ],
    cta: 'Call For Server Management',
  },
  {
    id: 'backup',
    title: 'Backup & Disaster Recovery Services',
    tagline: 'Protect Data and Maintain Continuity',
    desc: 'Automated cloud backups, encrypted offsite storage, and tested recovery planning that protects critical data and restores operations fast.',
    features: [
      'Automated Cloud Backups',
      'Encrypted Offsite Storage Solutions',
      'Ransomware Recovery',
      'Disaster Recovery Service Planning',
      'Business Backup Solutions',
      'Continuity Planning and Testing',
    ],
    cta: 'Call For Backup Services',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & Infrastructure Protection',
    tagline: 'Advanced Protection for Business Systems',
    desc: 'Layered security controls — firewall management, endpoint protection, MFA, and 24/7 network monitoring — to defend your infrastructure.',
    features: [
      'Firewall Management — Configuration and oversight that control network traffic and block unauthorized access',
      'Endpoint Security — Protection for workstations, servers, and mobile devices to prevent malware and unauthorized intrusion',
      'Email Security — Filtering systems that reduce phishing attempts and malicious attachments',
      'Multi-Factor Authentication — Added verification layers that protect sensitive systems and applications',
      'Access Control Solutions — Structured user permission management that limits exposure and reduces internal risk',
      'Network Protection Services — Continuous monitoring tools that detect anomalies and respond to potential threats',
    ],
    cta: 'Call For Infrastructure Protection',
  },
];

export default function SolutionsPage() {
  useReveal();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy2 py-24 px-5 overflow-hidden">
        <div className="absolute inset-0 hero-grid-bg opacity-40 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="section-label block text-center">Our Solutions</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mt-3 mb-5 leading-tight">
            Structured IT Services Built<br />for Business Continuity
          </h1>
          <p className="text-gray text-base leading-relaxed max-w-xl mx-auto">
            Six core service areas designed to maintain uptime, protect infrastructure, and
            keep your organization operating without interruption.
          </p>
        </div>
      </section>

      {/* Solutions */}
      <section className="bg-navy py-16 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-6">
            {SOLUTIONS.map((s) => (
              <div key={s.id} id={s.id} className="bg-navy2 border border-white/6 rounded-2xl overflow-hidden flex flex-col">
                {/* Accent bar */}
                <div className="bg-gradient-to-r from-amber-400 to-teal h-[3px]" />
                <div className="p-8 flex flex-col flex-1">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">{s.tagline}</span>
                  <h2 className="font-serif text-xl font-bold mb-3 leading-snug text-white">{s.title}</h2>
                  <p className="text-gray text-sm leading-relaxed mb-6">{s.desc}</p>

                  <ul className="space-y-3 mb-7 flex-1">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-gray">
                        <svg className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-3 mt-auto">
                    <a
                      href="tel:+15033137121"
                      className="bg-teal hover:bg-teal/90 text-white font-bold px-6 py-3 rounded-lg transition-all text-sm"
                    >
                      {s.cta}
                    </a>
                    <Link
                      href="/contact"
                      className="border border-teal/40 text-teal hover:border-teal font-bold px-6 py-3 rounded-lg transition-all text-sm"
                    >
                      Talk to Us
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 px-5 text-center"
        style={{ background: 'linear-gradient(135deg,#091a33,#0d1530,#0a1828)' }}
      >
        <div className="reveal max-w-xl mx-auto">
          <span className="section-label block text-center mb-4">Not Sure Where to Start?</span>
          <h2 className="font-serif text-3xl font-bold mb-5">Schedule a Free IT Assessment</h2>
          <p className="text-gray text-sm leading-relaxed mb-8 max-w-md mx-auto">
            We will review your infrastructure, identify gaps, and recommend the right combination of
            services for your environment — at no cost and with no obligation.
          </p>
          <Link href="/contact" className="bg-teal hover:bg-teal/90 text-white font-bold px-9 py-3.5 rounded-lg transition-all shadow-lg shadow-teal/20 text-sm">
            Schedule Your IT Assessment
          </Link>
        </div>
      </section>
    </>
  );
}

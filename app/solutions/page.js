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
    headline: 'Strengthen Operations with Reliable Managed IT Services in Spring, TX and Surrounding Areas',
    problem: 'Unexpected downtime, slow systems, and recurring technical issues can disrupt your entire operation. Many businesses rely on reactive fixes, waiting until servers fail or networks crash before taking action.',
    challenge: 'Without structured monitoring and maintenance, vulnerabilities go unnoticed. Missed patches, outdated configurations, and unmanaged devices create opportunities for security threats and system failures.',
    solution: 'Our managed IT services provide a structured, prevention-focused solution. We continuously monitor your infrastructure, maintain system health, and optimize performance before issues disrupt operations. With 11 years of experience supporting business technology environments, we understand how to build reliable systems that remain stable under pressure.',
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
    headline: 'Restore Productivity with Reliable Help Desk Services in Spring, TX and Surrounding Areas',
    problem: 'Technical issues rarely happen at a convenient time. Slow computers, email failures, login problems, and network interruptions can quickly disrupt your workflow. When employees cannot access systems or applications, productivity declines and frustration increases.',
    challenge: 'Many businesses attempt to manage support internally or rely on inconsistent third-party assistance. This reactive approach often results in long wait times, unclear communication, and recurring technical problems.',
    solution: 'Our help desk services are built to resolve issues quickly while preventing repeat disruptions. We combine responsive remote IT support with proactive monitoring to maintain stability. Whether your team needs Microsoft 365 support, desktop support, email support, or network troubleshooting, we deliver dependable business IT support that keeps operations moving.',
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
    headline: 'Optimize Infrastructure with Reliable Cloud Monitoring in Spring, TX and Surrounding Areas',
    problem: 'Unstable servers, slow cloud performance, and unexpected outages can disrupt your entire organization. Businesses relying on outdated systems or poorly configured cloud environments experience performance bottlenecks, inconsistent access, and increased security exposure.',
    challenge: 'Cloud environments that are not properly designed for high availability can lead to data access interruptions and operational delays. Without structured management, performance tuning, and continuous oversight, organizations risk downtime that impacts productivity and customer trust.',
    solution: 'Our cloud monitoring services provide the structured oversight required to maintain reliable performance. We design, implement, and maintain managed cloud infrastructure supporting business continuity through proactive monitoring, secure cloud migration strategies, and ongoing optimization. We build high-availability cloud environments with redundancy and performance safeguards.',
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
    headline: 'Protect Infrastructure with Reliable Incident Response Services in Spring, TX and Surrounding Areas',
    problem: 'Server instability can disrupt operations without warning. Performance slowdowns, failed updates, and unpatched vulnerabilities often go unnoticed until they cause outages.',
    challenge: 'Without structured server monitoring and maintenance oversight, minor configuration issues can escalate into costly downtime. Delayed patch deployment, weak security configuration, and insufficient performance tracking create exposure to cyber threats and hardware failure.',
    solution: 'Our incident response services provide proactive remote server management designed to maintain uptime and reduce risk. We combine real-time server monitoring, structured security configuration, and performance optimization to prevent disruptions before they impact operations. We maintain continuous visibility into your server environment through 24/7 monitoring tools and structured reporting.',
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
    headline: 'Protect Operations with Reliable Data Backup Services in Spring, TX and Surrounding Areas',
    problem: 'Data loss can bring business operations to a halt. Hardware failure, ransomware, or natural disasters can strike without warning and without structured recovery planning, restoration can take days — or longer.',
    challenge: 'Many businesses mistakenly assume basic cloud backups are sufficient without recovery testing or encrypted offsite storage. Untested backup systems and incomplete continuity plans leave organizations exposed when they are needed most.',
    solution: 'Our layered backup and disaster recovery service strategies include automated cloud backups, encrypted storage, and ransomware recovery protocols with consistent monitoring and validation through recovery testing. We build structured plans that restore operations quickly regardless of the cause.',
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
    headline: 'Defend Operations with Reliable Cybersecurity Services in Spring, TX and Surrounding Areas',
    problem: 'Cyber threats are no longer isolated incidents. Ransomware attacks, phishing campaigns, unauthorized access attempts, and network breaches affect businesses of all sizes. Without layered protection and structured monitoring, a single vulnerability can expose sensitive data and disrupt operations.',
    challenge: 'Security gaps often result from outdated firewall configurations, inconsistent endpoint security, weak access control solutions, or insufficient monitoring. Even strong infrastructure can become vulnerable without continuous oversight.',
    solution: 'Our cybersecurity services are built to prevent disruption before it occurs. We implement structured, layered security strategies that protect servers, endpoints, and networks. Our approach combines proactive monitoring, security configuration management, and infrastructure protection to reduce exposure. Cybersecurity is not a one-time implementation — it requires ongoing monitoring and layered defenses that evolve alongside emerging threats.',
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
      <section className="bg-navy py-6 px-5">
        <div className="max-w-7xl mx-auto divide-y divide-white/5">
          {SOLUTIONS.map((s, i) => (
            <div key={s.id} id={s.id} className="py-20">
              <div className={`reveal grid grid-cols-1 lg:grid-cols-2 gap-14 items-start ${i % 2 === 1 ? '' : ''}`}>

                {/* Text side */}
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <span className="section-label block mb-2">{s.tagline}</span>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold mb-5 leading-snug">{s.title}</h2>

                  <div className="space-y-4 text-gray text-sm leading-relaxed mb-7">
                    <p>{s.problem}</p>
                    <p>{s.challenge}</p>
                    <p className="text-white/80">{s.solution}</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href="tel:+19366486488"
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

                {/* Features */}
                <div className={`bg-navy2 border border-white/6 rounded-2xl p-8 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <p className="text-xs font-bold text-teal uppercase tracking-widest mb-5">Service Components</p>
                  <ul className="space-y-4">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-gray">
                        <svg className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 px-5 text-center"
        style={{ background: 'linear-gradient(135deg,#0d2e24,#1b1736,#0a2233)' }}
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

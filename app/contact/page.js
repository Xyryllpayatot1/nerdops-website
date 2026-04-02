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

export default function ContactPage() {
  useReveal();
  const [auditOpen, setAuditOpen] = useState(false);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to backend / CRM / email service
    setSubmitted(true);
  };

  const inputClass =
    'w-full bg-navy border border-white/8 focus:border-teal rounded-lg px-4 py-3 text-sm text-white placeholder-gray/40 outline-none transition-colors';

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy2 py-24 px-5 overflow-hidden">
        <div className="absolute inset-0 hero-grid-bg opacity-40 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="section-label block text-center">Contact Us</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mt-3 mb-5 leading-tight">
            Schedule Managed IT Services
          </h1>
          <p className="text-gray text-base leading-relaxed max-w-xl mx-auto">
            Reach out to discuss your IT needs. A member of our team will respond within one business
            hour during office hours. Emergency support is available 24/7.
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section className="bg-navy py-20 px-5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-14">

          {/* Info */}
          <div className="lg:col-span-2 reveal space-y-8">
            <div>
              <span className="section-label">Reach Us Directly</span>
              <h2 className="font-serif text-2xl font-bold mb-6 mt-2">We Are Here When You Need Us</h2>

              <div className="space-y-5">
                <a href="tel:+15033137121" className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-teal/10 border border-teal/15 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4.5 h-4.5 text-teal" fill="currentColor" viewBox="0 0 20 20" style={{width:'18px',height:'18px'}}>
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
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray text-xs mb-0.5">Office Address</p>
                    <p className="font-semibold text-white leading-snug">750 SW 9th Ave<br />Portland, OR 97205</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal/10 border border-teal/15 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-teal" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray text-xs mb-0.5">Business Hours</p>
                    <p className="font-semibold text-white">Mon – Fri: 8:00 AM – 5:00 PM</p>
                    <p className="text-gray text-xs mt-0.5">Sat – Sun: Closed</p>
                    <p className="text-teal text-xs mt-1 font-semibold">Emergency line available 24/7</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Free audit callout */}
            <div className="bg-navy2 border border-teal/15 rounded-xl p-6">
              <h3 className="font-bold text-sm mb-3">Free Cyber Security Audit</h3>
              <p className="text-gray text-sm leading-relaxed mb-3">
                Identify vulnerabilities before they cause downtime. Our free audit gives you a
                complete picture of your security posture — no cost, no obligation.
              </p>
              <p className="text-teal text-xs font-semibold uppercase tracking-wide">Limited slots available monthly</p>
            </div>

            {/* Response time */}
            <div className="flex items-center gap-3 bg-teal/8 border border-teal/15 rounded-xl p-4">
              <span className="pulse-dot flex-shrink-0" />
              <p className="text-sm text-gray">
                We respond to all inquiries within{' '}
                <strong className="text-white">1 business hour</strong> during office hours.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 reveal">
            {submitted ? (
              <div className="bg-navy2 border border-teal/10 rounded-2xl p-14 text-center">
                <div className="w-14 h-14 bg-teal/10 border border-teal/20 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7 text-teal" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="font-serif text-2xl font-bold mb-3">Thank You</h2>
                <p className="text-gray text-sm leading-relaxed max-w-sm mx-auto">
                  Your message has been received. A member of our team will be in touch within
                  one business hour. For urgent matters, please call{' '}
                  <a href="tel:+15033137121" className="text-teal font-semibold">(503) 313-7121</a>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-navy2 border border-white/6 rounded-2xl p-8 space-y-5">
                <div className="mb-2">
                  <h2 className="font-serif text-xl font-bold">Schedule Your IT Assessment</h2>
                  <p className="text-gray text-sm mt-1">Fill out the form below and we will be in touch shortly.</p>
                </div>

                <button
                  type="button"
                  onClick={() => setAuditOpen(true)}
                  className="w-full bg-teal hover:bg-teal/90 text-white font-bold py-3.5 rounded-lg transition-all duration-200 shadow-lg shadow-teal/20 text-sm tracking-wide"
                >
                  Schedule Assessment — Quick Form
                </button>

                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-gray text-xs">or fill out the form below</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray/80 mb-2 uppercase tracking-wide" htmlFor="firstName">
                      First Name <span className="text-teal">*</span>
                    </label>
                    <input
                      id="firstName" name="firstName" type="text" required
                      value={form.firstName} onChange={handleChange}
                      placeholder="First name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray/80 mb-2 uppercase tracking-wide" htmlFor="lastName">
                      Last Name <span className="text-teal">*</span>
                    </label>
                    <input
                      id="lastName" name="lastName" type="text" required
                      value={form.lastName} onChange={handleChange}
                      placeholder="Last name"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray/80 mb-2 uppercase tracking-wide" htmlFor="email">
                      Email Address <span className="text-teal">*</span>
                    </label>
                    <input
                      id="email" name="email" type="email" required
                      value={form.email} onChange={handleChange}
                      placeholder="your@company.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray/80 mb-2 uppercase tracking-wide" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      id="phone" name="phone" type="tel"
                      value={form.phone} onChange={handleChange}
                      placeholder="(000) 000-0000"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray/80 mb-2 uppercase tracking-wide" htmlFor="service">
                    Service of Interest
                  </label>
                  <select
                    id="service" name="service"
                    value={form.service} onChange={handleChange}
                    className={inputClass + ' appearance-none'}
                  >
                    <option value="">Select a service…</option>
                    <option>Managed IT Services</option>
                    <option>IT Support &amp; Help Desk</option>
                    <option>Cloud Server Hosting &amp; Management</option>
                    <option>Incident Response Services</option>
                    <option>Backup &amp; Disaster Recovery</option>
                    <option>Cybersecurity &amp; Infrastructure Protection</option>
                    <option>Free Cyber Security Audit</option>
                    <option>General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray/80 mb-2 uppercase tracking-wide" htmlFor="message">
                    Message <span className="text-teal">*</span>
                  </label>
                  <textarea
                    id="message" name="message" rows={5} required
                    value={form.message} onChange={handleChange}
                    placeholder="Tell us about your business and what you are looking for…"
                    className={inputClass + ' resize-none'}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal hover:bg-teal/90 text-white font-bold py-3.5 rounded-lg transition-all duration-200 shadow-lg shadow-teal/20 text-sm tracking-wide"
                >
                  Send Message
                </button>

                <p className="text-gray/50 text-xs text-center">
                  By submitting you agree to our{' '}
                  <Link href="/privacy" className="text-gray/70 hover:text-teal underline">Privacy Policy</Link>.
                  We never share your information.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-navy2 py-20 px-5">
        <div className="max-w-3xl mx-auto">
          <div className="reveal text-center mb-12">
            <span className="section-label">FAQ</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-gray text-sm">Common questions about getting started with ZERO NERDS.</p>
          </div>
          <div className="reveal space-y-2">
            {[
              { q: 'How do I get started with ZERO NERDS?', a: 'Call us at (503) 313-7121 or fill out our contact form to schedule a free IT assessment. We will review your infrastructure and recommend next steps — no obligation.' },
              { q: 'What happens during a free IT assessment?', a: 'We will review your current IT infrastructure, identify gaps and vulnerabilities, and recommend the right combination of services for your environment — at no cost and with no obligation.' },
              { q: 'How much does managed IT support cost?', a: 'Managed IT services typically range from $100–$250 per user per month depending on scope. We offer flat-rate pricing with no surprise invoices — contact us for a custom quote.' },
              { q: 'Do you require long-term contracts?', a: 'No. All our agreements are month-to-month. You stay because the service works, not because you are locked in.' },
              { q: 'How quickly can ZERO NERDS respond to an issue?', a: 'Remote issues are typically addressed within 15 minutes. On-site support throughout the Portland metro area is available same-day or next-day depending on urgency.' },
            ].map((faq, i) => (
              <div key={i} className="border border-white/8 rounded-xl overflow-hidden">
                <button
                  className="w-full flex justify-between items-center px-6 py-5 text-left hover:bg-white/3 transition-colors gap-4"
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

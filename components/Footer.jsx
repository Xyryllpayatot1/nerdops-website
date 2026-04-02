import Link from 'next/link';
import Image from 'next/image';

const SOLUTIONS = [
  { label: 'Managed IT Services',               href: '/solutions#managed-it' },
  { label: 'IT Support & Help Desk Services',    href: '/solutions#help-desk' },
  { label: 'Cloud Server Hosting',               href: '/solutions#cloud' },
  { label: 'Incident Response Services',         href: '/solutions#incident-response' },
  { label: 'Backup & Disaster Recovery',         href: '/solutions#backup' },
  { label: 'Cybersecurity & Infrastructure',     href: '/solutions#cybersecurity' },
];

const COMPANY = [
  { label: 'Home',           href: '/' },
  { label: 'About Us',       href: '/about' },
  { label: 'Our Solutions',  href: '/solutions' },
  { label: 'Areas We Serve', href: '/areas' },
  { label: 'Gallery',        href: '/gallery' },
  { label: 'Contact Us',     href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-navy2 border-t border-white/5">
      {/* Top CTA strip */}
      <div
        className="text-white text-center py-4 px-5"
        style={{ background: 'linear-gradient(90deg,#1e5fa0,#29abe2)' }}
      >
        <p className="font-semibold text-sm tracking-wide">
          Claim Your Free Cyber Security Audit —{' '}
          <Link href="/contact" className="font-black underline hover:no-underline">
            Identify Vulnerabilities Before They Cause Downtime
          </Link>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <p className="text-gray text-sm leading-relaxed max-w-xs">
              Trusted IT support for businesses in Portland, OR and nationwide. Proactive managed IT, cybersecurity, and 24/7 help desk support.
            </p>
            <Link href="/" className="inline-block mt-3 mb-1">
              <img src="/zeronerdslogo.png" alt="ZERO NERDS — Speak With Nerds Instantly" className="w-[200px] h-auto" />
            </Link>
            <div className="mt-5 space-y-2.5">
              <a href="tel:+15033137121" className="flex items-center gap-2 text-teal hover:text-cyan transition-colors text-sm font-semibold">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                (503) 313-7121
              </a>
              <div className="flex items-start gap-2 text-gray text-xs">
                <svg className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>750 SW 9th Ave<br />Portland, OR 97205</span>
              </div>
              <div className="flex items-center gap-2 text-gray text-xs">
                <svg className="w-4 h-4 text-teal flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Mon–Fri: 8:00 AM – 5:00 PM
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-5">Our Solutions</h4>
            <ul className="space-y-3">
              {SOLUTIONS.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-gray hover:text-white text-sm transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-5">Company</h4>
            <ul className="space-y-3">
              {COMPANY.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-gray hover:text-white text-sm transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-5">Get Started</h4>
            <p className="text-gray text-sm mb-5 leading-relaxed">
              Schedule a free IT assessment or claim your Cyber Security Audit today.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-teal hover:bg-teal/90 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-all mb-5"
            >
              Schedule Assessment
            </Link>
            <div className="flex gap-2.5 mt-1">
              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 bg-white/5 hover:bg-teal/15 rounded-lg flex items-center justify-center text-gray hover:text-teal transition-all border border-white/5 hover:border-teal/20">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              {/* Thumbtack */}
              <a href="#" aria-label="Thumbtack" className="w-9 h-9 bg-white/5 hover:bg-teal/15 rounded-lg flex items-center justify-center text-gray hover:text-teal transition-all border border-white/5 hover:border-teal/20">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.3 5.3l-1.6-1.6C18.1 3.1 17.4 3 16.8 3H7.2C6.6 3 5.9 3.1 5.3 3.7L3.7 5.3C3.1 5.9 3 6.6 3 7.2v9.6c0 .6.1 1.3.7 1.9l1.6 1.6c.6.6 1.3.7 1.9.7h9.6c.6 0 1.3-.1 1.9-.7l1.6-1.6c.6-.6.7-1.3.7-1.9V7.2c0-.6-.1-1.3-.7-1.9zM12 17c-.6 0-1-.4-1-1v-4H8l4-7 4 7h-3v4c0 .6-.4 1-1 1z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="w-9 h-9 bg-white/5 hover:bg-teal/15 rounded-lg flex items-center justify-center text-gray hover:text-teal transition-all border border-white/5 hover:border-teal/20">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray/60">
          <span>&copy;{new Date().getFullYear()} ZERO NERDS. All Rights Reserved.</span>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <a href="#" className="hover:text-white transition-colors">Leave a Review!</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

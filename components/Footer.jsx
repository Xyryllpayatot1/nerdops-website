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
            <Link href="/" className="inline-block">
              <Image src="/logo.png" alt="ZERO NERDS" width={110} height={62} />
            </Link>
            <p className="text-gray text-sm leading-relaxed mt-3 max-w-xs">
              A trusted IT support company serving Portland, OR and businesses nationwide.
              Proactive IT services, cybersecurity protection, and structured infrastructure
              support that keep systems stable and secure.
            </p>
            <div className="mt-5 space-y-2.5">
              <a href="tel:+19366486488" className="flex items-center gap-2 text-teal hover:text-cyan transition-colors text-sm font-semibold">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                (936) 648-6488
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
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 bg-white/5 hover:bg-teal/15 rounded-lg flex items-center justify-center text-gray hover:text-teal transition-all border border-white/5 hover:border-teal/20"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Google Maps"
                className="w-9 h-9 bg-white/5 hover:bg-teal/15 rounded-lg flex items-center justify-center text-gray hover:text-teal transition-all border border-white/5 hover:border-teal/20"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </a>
              <a
                href="#"
                aria-label="Leave a Review"
                className="w-9 h-9 bg-white/5 hover:bg-teal/15 rounded-lg flex items-center justify-center text-gray hover:text-teal transition-all border border-white/5 hover:border-teal/20 text-xs font-bold"
              >
                G
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

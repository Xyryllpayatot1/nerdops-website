'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SOLUTIONS = [
  { label: 'Managed IT Services',               href: '/solutions#managed-it' },
  { label: 'IT Support & Help Desk Services',    href: '/solutions#help-desk' },
  { label: 'Cloud Server Hosting & Management',  href: '/solutions#cloud' },
  { label: 'Incident Response Services',         href: '/solutions#incident-response' },
  { label: 'Backup & Disaster Recovery',         href: '/solutions#backup' },
  { label: 'Cybersecurity & Infrastructure',     href: '/solutions#cybersecurity' },
];

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Announcement banner */}
      <div className="bg-teal text-white text-center text-xs font-semibold py-2 px-4 tracking-wide">
        Claim Your{' '}
        <Link href="/contact" className="underline font-bold hover:no-underline">
          Free Cyber Security Audit
        </Link>
        {' '}— Identify vulnerabilities before they cause downtime.
      </div>

      <nav
        className={`sticky top-0 z-50 transition-all duration-300 border-b border-[#c8d4e8] ${
          scrolled ? 'shadow-md' : ''
        }`}
        style={{ backgroundColor: '#dce6f5' }}
      >
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="select-none flex items-center">
            <Image src="/logo.png" alt="ZERO NERDS" width={120} height={67} priority />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-7 text-sm font-medium">
            <li>
              <Link href="/" className="text-navy hover:text-teal transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-navy/70 hover:text-teal transition-colors">
                Get To Know Us
              </Link>
            </li>

            {/* Solutions dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button className="text-navy/70 hover:text-teal transition-colors flex items-center gap-1.5">
                Our Solutions
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`absolute top-full left-0 w-72 z-50 pt-1 transition-all duration-200 ${
                  solutionsOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
              <div className="bg-white border border-slate-200 rounded-xl shadow-2xl py-2">
                {SOLUTIONS.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="flex items-center gap-2.5 px-4 py-3 text-navy/70 hover:text-teal hover:bg-teal/5 transition-colors text-sm"
                  >
                    <span className="w-1 h-1 rounded-full bg-teal/50 flex-shrink-0" />
                    {s.label}
                  </Link>
                ))}
              </div>
              </div>
            </li>

            <li>
              <Link href="/areas" className="text-navy/70 hover:text-teal transition-colors">
                Areas We Serve
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="text-navy/70 hover:text-teal transition-colors">
                Our Gallery
              </Link>
            </li>
            <li>
              <Link
                href="/portland"
                className="inline-flex items-center gap-1.5 bg-teal/10 hover:bg-teal/20 text-teal font-semibold text-xs px-3 py-1.5 rounded-full border border-teal/25 transition-all duration-200"
              >
                <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Portland, OR
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-navy/70 hover:text-teal transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+19366486488"
              className="hidden md:flex items-center gap-1.5 text-teal hover:text-cyan transition-colors text-sm font-semibold"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              (936) 648-6488
            </a>
            <Link
              href="/contact"
              className="hidden md:inline-block bg-teal hover:bg-teal/90 text-white text-sm font-bold px-4 py-2 rounded-lg transition-all duration-200"
            >
              Free Audit
            </Link>

            {/* Hamburger */}
            <button
              className="lg:hidden text-navy hover:text-teal p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-[#c8d4e8] px-5 py-4" style={{ backgroundColor: '#dce6f5' }}>
            {[
              { href: '/',          label: 'Home' },
              { href: '/about',     label: 'Get To Know Us' },
              { href: '/solutions', label: 'Our Solutions' },
              { href: '/areas',     label: 'Areas We Serve' },
              { href: '/gallery',   label: 'Our Gallery' },
              { href: '/portland',  label: 'Portland, OR' },
              { href: '/contact',   label: 'Contact Us' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 text-navy/70 hover:text-teal border-b border-gray/10 text-sm font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 space-y-3">
              <a
                href="tel:+19366486488"
                className="block text-center border border-teal/40 text-teal font-bold py-2.5 rounded-lg text-sm"
              >
                (936) 648-6488
              </a>
              <Link
                href="/contact"
                className="block text-center bg-teal text-white font-bold py-2.5 rounded-lg text-sm"
                onClick={() => setMenuOpen(false)}
              >
                Claim Free Cyber Security Audit
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

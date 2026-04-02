'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ─── CUSTOM DROPDOWN ─────────────────────────────────── */

function CustomDropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1.5px solid #9ca3af', borderRadius: 8, padding: '14px 16px', background: '#fff', cursor: 'pointer', fontSize: 15, fontWeight: 700, color: '#111827', minHeight: 52 }}
      >
        <span>{value || label}</span>
        <svg style={{ width: 18, height: 18, color: '#374151', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, background: '#fff', border: '1px solid #d1d5db', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 20, overflow: 'hidden' }}>
          {options.map((opt, i) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              style={{ width: '100%', padding: '14px 16px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 500, color: '#374151', borderBottom: i < options.length - 1 ? '1px solid #f3f4f6' : 'none' }}
              onMouseEnter={(e) => e.target.style.background = '#f5f5f5'}
              onMouseLeave={(e) => e.target.style.background = 'none'}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── DATA ─────────────────────────────────────────────── */

const REVIEWS = [
  { from: 'Kate L.',  company: 'ZERO NERDS', initials: 'KL', stars: 5, text: 'ZERO NERDS is the absolute best IT service around. Very fast response time with a dedicated and educated team. They can solve any issue that occurs, leaving us with less downtime than ever before.' },
  { from: 'Chris W.', company: 'ZERO NERDS', initials: 'CW', stars: 5, text: 'Nothing compares to the level of expertise and sense of urgency as Daniel and his team. Amazing service, integrity, and knowledge in all aspects of the craft.' },
  { from: 'Lisa C.',  company: 'ZERO NERDS', initials: 'LC', stars: 5, text: 'Danny is an incredible IT support. Super knowledgeable and works to get your company to the level you need to be, taking your budget into account.' },
];

const FAQS = [
  { q: 'How much does managed IT support cost?',          a: 'Managed IT services typically range from $100–$250 per user per month depending on scope. ZERO NERDS offers flat-rate pricing with no surprise invoices — contact us for a custom quote.' },
  { q: 'How quickly can ZERO NERDS respond to an issue?', a: 'Remote issues are typically addressed within 15 minutes. On-site support throughout the Portland metro area is available same-day or next-day depending on urgency.' },
  { q: 'Do you offer 24/7 IT support?',                   a: 'Yes. We provide 24/7 infrastructure monitoring and an emergency support line available around the clock for critical issues.' },
  { q: 'What areas do you serve?',                        a: 'We serve Portland, OR and the entire metro area including Vancouver, WA, Gresham, Hillsboro, Beaverton, Lake Oswego, and surrounding cities.' },
  { q: 'Do you require long-term contracts?',             a: "No. All our agreements are month-to-month. You stay because the service works, not because you're locked in." },
  { q: 'What industries do you support?',                 a: 'We support businesses across professional services, healthcare, retail, construction, non-profits, and more — any organization that depends on reliable IT infrastructure.' },
  { q: 'Can you support remote or hybrid teams?',         a: 'Absolutely. Our cloud management and remote IT support infrastructure is built for distributed teams regardless of where employees work.' },
  { q: 'How do I get started with ZERO NERDS?',           a: "Call us at (503) 313-7121 or fill out our contact form to schedule a free IT assessment. We'll review your infrastructure and recommend next steps — no obligation." },
  { q: 'Is it worth switching IT providers?',             a: "If you're experiencing frequent downtime, slow response times, or unclear billing, switching providers can dramatically improve operations. We offer a free assessment to help you decide." },
];

/* ─── COMPONENTS ────────────────────────────────────────── */

function Stars({ n, color = '#22c55e' }) {
  return (
    <span style={{ color, fontSize: 14, letterSpacing: -0.5 }}>
      {'★'.repeat(n)}{'☆'.repeat(5 - n)}
    </span>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid #e5e7eb' }}>
      <button
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', textAlign: 'left', gap: 16, background: 'none', border: 'none', cursor: 'pointer' }}
        onClick={() => setOpen(!open)}
      >
        <span style={{ color: '#111827', fontSize: 16, fontWeight: 700, lineHeight: 1.5 }}>{q}</span>
        <svg style={{ width: 16, height: 16, color: '#9ca3af', flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div style={{ paddingBottom: 20, color: '#6b7280', fontSize: 14, lineHeight: 1.6 }}>{a}</div>}
    </div>
  );
}

/* Bell curve matching Thumbtack's exact style:
   - Light mint (#86efac) for the full outer curve
   - Darker green (#10b981) for the middle portion (between dashed lines)
   - Diagonal hatching fill between the dashed lines
   - Dashed gray vertical lines
*/
function BellCurveChart() {
  const allPoints = "30,148 60,145 90,140 120,131 150,118 175,103 195,87 215,68 230,52 245,38 258,27 270,19 283,14 295,11 307,10 319,10 330,12 341,16 353,22 364,30 375,40 390,55 408,74 427,93 447,110 468,124 490,136 513,143 540,148 570,150";
  const middlePath = "M230,52 L245,38 L258,27 L270,19 L283,14 L295,11 L307,10 L319,10 L330,12 L341,16 L353,22 L364,30 L375,40";
  const shadedArea = "M230,52 L245,38 L258,27 L270,19 L283,14 L295,11 L307,10 L319,10 L330,12 L341,16 L353,22 L364,30 L375,40 L375,152 L230,152 Z";

  return (
    <svg viewBox="0 0 600 185" style={{ width: '100%', maxWidth: 420, display: 'block', margin: '0 auto' }}>
      <defs>
        <pattern id="diag" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#6ee7b7" strokeWidth="2" />
        </pattern>
      </defs>

      {/* Baseline */}
      <line x1="20" y1="152" x2="580" y2="152" stroke="#e5e7eb" strokeWidth="1" />

      {/* Diagonal hatched shaded area */}
      <path d={shadedArea} fill="url(#diag)" />

      {/* Full bell curve — light mint */}
      <polyline points={allPoints} fill="none" stroke="#86efac" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />

      {/* Middle portion overlay — darker green */}
      <path d={middlePath} fill="none" stroke="#10b981" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />

      {/* Dashed vertical lines */}
      <line x1="230" y1="8" x2="230" y2="152" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="5,4" />
      <line x1="375" y1="8" x2="375" y2="152" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="5,4" />

      {/* X-axis labels */}
      <text x="85"  y="174" textAnchor="middle" fontSize="13" fontFamily="sans-serif" fill="#111827">$</text>
      <text x="230" y="174" textAnchor="middle" fontSize="13" fontFamily="sans-serif" fill="#111827">$$</text>
      <text x="375" y="174" textAnchor="middle" fontSize="13" fontFamily="sans-serif" fill="#111827">$$$</text>
      <text x="515" y="174" textAnchor="middle" fontSize="13" fontFamily="sans-serif" fill="#111827">$$$$</text>
    </svg>
  );
}

/* ─── FUNNEL NAVBAR ─────────────────────────────────────── */

function FunnelNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDesktopDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const mainLinks = [
    { label: 'Home', href: '/' },
    { label: 'Sign up as a pro', href: '/contact' },
    { label: 'Plan', href: '/solutions' },
    { label: 'Team', href: '/about' },
    { label: 'Inbox', href: '/contact' },
  ];

  const bottomLinks = [
    { label: 'Profile', href: '/profile' },
    { label: 'Log out', href: '/logout' },
  ];

  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', color: '#374151' }}>
        <div style={{ width: '100%', padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="md:hidden" style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', background: 'transparent' }}>
              <Image src="/logo.png" alt="ZERO NERDS" width={240} height={72} style={{ height: 68, width: 'auto', objectFit: 'contain', background: 'transparent' }} priority />
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden mobile-menu-btn"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 0 4px', display: 'flex', alignItems: 'center', color: '#374151' }}
            >
              <svg style={{ width: 20, height: 20, transform: menuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
              </svg>
            </button>
          </div>
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 32, fontSize: 15, color: '#374151', fontWeight: 400 }}>
            <Link href="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Sign up as a pro</Link>
            <Link href="/solutions" style={{ color: 'inherit', textDecoration: 'none' }}>Services</Link>
            <Link href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About</Link>
            <Link href="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Inbox</Link>
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setDesktopDropdownOpen(!desktopDropdownOpen)}
                className="hidden md:flex"
                style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
              >
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#29abe2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>ZN</div>
                <span style={{ fontSize: 15, color: '#374151' }}>Client</span>
                <svg style={{ width: 14, height: 14, color: '#6b7280', transform: desktopDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {desktopDropdownOpen && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', minWidth: 150, overflow: 'hidden', zIndex: 60 }}>
                  <Link href="/profile" onClick={() => setDesktopDropdownOpen(false)} style={{ display: 'block', padding: '12px 16px', fontSize: 14, color: '#111827', textDecoration: 'none', borderBottom: '1px solid #f3f4f6' }}>Profile</Link>
                  <Link href="/logout" onClick={() => setDesktopDropdownOpen(false)} style={{ display: 'block', padding: '12px 16px', fontSize: 14, color: '#111827', textDecoration: 'none' }}>Log out</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden" style={{ position: 'fixed', top: 64, left: 0, right: 0, bottom: 0, backgroundColor: '#fff', zIndex: 49, overflowY: 'auto', borderTop: '1px solid #e5e7eb' }}>
          <div style={{ padding: '8px 0' }}>
            {mainLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{ display: 'block', padding: '18px 20px', fontSize: 17, fontWeight: 700, color: '#111827', textDecoration: 'none', borderBottom: '1px solid #f3f4f6' }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ height: 8, backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }} />
            {bottomLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{ display: 'block', padding: '18px 20px', fontSize: 17, fontWeight: 700, color: '#111827', textDecoration: 'none', borderBottom: '1px solid #f3f4f6' }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

/* ─── FUNNEL FOOTER ─────────────────────────────────────── */

function FunnelFooter() {
  const row1 = [
    {
      title: 'Related cost information',
      links: ['Managed IT prices','Computer support costs','Network setup cost','Cloud hosting prices','Cybersecurity costs'],
      href: '/solutions',
    },
    {
      title: 'Popular in Portland',
      links: ['IT support Portland','Networking Portland','Computer help Portland','Cloud services Portland','Cybersecurity Portland'],
      href: '/portland',
    },
    {
      title: 'You might also like',
      links: ['IT support near me','Managed IT near me','Computer repair near me','Network setup near me','Cybersecurity near me'],
      href: '/areas',
    },
    {
      title: 'In other nearby areas',
      links: ['Vancouver WA IT support','Gresham IT support','Hillsboro IT support','Beaverton IT support','Milwaukie IT support'],
      href: '/areas',
    },
  ];

  return (
    <footer style={{ backgroundColor: '#fff', borderTop: '1px solid #e5e7eb', color: '#111827', marginTop: 64 }}>
      {/* Row 1 — link columns */}
      <div className="grid grid-cols-1 md:grid-cols-4" style={{ maxWidth: 1152, margin: '0 auto', padding: '40px 20px', gap: 32 }}>
        {row1.map((col) => (
          <div key={col.title}>
            <p style={{ fontWeight: 700, fontSize: 14, color: '#111827', marginBottom: 12 }}>{col.title}</p>
            {col.links.map((l) => (
              <Link key={l} href={col.href} style={{ display: 'block', fontSize: 13, color: '#6b7280', textDecoration: 'none', marginBottom: 8 }}>{l}</Link>
            ))}
            <Link href={col.href} style={{ display: 'block', fontSize: 13, color: '#29abe2', fontWeight: 600, textDecoration: 'none', marginTop: 4 }}>Show more</Link>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid #e5e7eb' }} />

      {/* Row 2 — brand columns */}
      <div className="grid grid-cols-1 md:grid-cols-4" style={{ maxWidth: 1152, margin: '0 auto', padding: '40px 20px', gap: 32 }}>
        {/* Brand column */}
        <div>
          <p style={{ fontWeight: 700, fontSize: 14, color: '#111827', marginBottom: 2 }}>ZERO NERDS</p>
          <p style={{ fontWeight: 700, fontSize: 14, color: '#111827', marginBottom: 16 }}>Consider it done.</p>
          {['About','Partner with us','For developers','Careers','Press','Blog'].map((l) => (
            <Link key={l} href="/about" style={{ display: 'block', fontSize: 13, color: '#6b7280', textDecoration: 'none', marginBottom: 8 }}>{l}</Link>
          ))}
          {/* Social icons */}
          <div style={{ display: 'flex', gap: 14, marginTop: 16 }}>
            {[
              { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
              { label: 'X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
              { label: 'Pinterest', path: 'M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z' },
              { label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
            ].map((s) => (
              <svg key={s.label} style={{ width: 18, height: 18, fill: '#6b7280', cursor: 'pointer' }} viewBox="0 0 24 24">
                <path d={s.path} />
              </svg>
            ))}
          </div>
        </div>

        {/* Customers */}
        <div>
          <p style={{ fontWeight: 700, fontSize: 14, color: '#111827', marginBottom: 16 }}>Customers</p>
          {['How to use ZERO NERDS','Get the app','Services near me','Cost estimates','Home resource center'].map((l) => (
            <Link key={l} href="/contact" style={{ display: 'block', fontSize: 13, color: '#6b7280', textDecoration: 'none', marginBottom: 8 }}>{l}</Link>
          ))}
        </div>

        {/* Pros */}
        <div>
          <p style={{ fontWeight: 700, fontSize: 14, color: '#111827', marginBottom: 16 }}>Pros</p>
          {['ZERO NERDS for pros','Sign up as a pro','Community','Pro Resources','Pro reviews','IT support app','Android app for pros'].map((l) => (
            <Link key={l} href="/solutions" style={{ display: 'block', fontSize: 13, color: '#29abe2', textDecoration: 'none', marginBottom: 8 }}>{l}</Link>
          ))}
        </div>

        {/* Support */}
        <div>
          <p style={{ fontWeight: 600, fontSize: 14, color: '#111827', marginBottom: 16 }}>Support</p>
          {['Help','Safety','Terms of Use','Privacy Policy','CA Notice at Collection','Do not Sell or Share My Personal Information'].map((l) => (
            <Link key={l} href="/contact" style={{ display: 'block', fontSize: 13, color: '#6b7280', textDecoration: 'none', marginBottom: 8 }}>{l}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── PAGE ──────────────────────────────────────────────── */

export default function GetStartedPage() {
  const [computerIssue, setComputerIssue] = useState('');
  const [computerType, setComputerType] = useState('');
  const [desktopLaptop, setDesktopLaptop] = useState('');

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', color: '#111827' }}>
      <FunnelNavbar />

      {/* ── HERO ── */}
      <section style={{ position: 'relative', width: '100%', backgroundColor: '#0d1530' }}>
        <div className="relative w-full h-[300px] md:h-[55vh] md:max-h-[560px]">
          <img src="https://production-next-images-cdn.thumbtack.com/i/319590363801166026/width/1920.jpeg" alt="IT Support" className="w-full h-full object-cover" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)' }} />

          {/* Mobile — title on image */}
          <div className="md:hidden" style={{ position: 'absolute', top: 120, left: 20, right: 20, zIndex: 10 }}>
            <h1 style={{ fontWeight: 700, color: '#fff', fontSize: 22, marginBottom: 10 }}>Find an IT technician in your area</h1>
            <span style={{ display: 'inline-block', background: '#6366f1', color: '#fff', fontSize: 12, fontWeight: 700, padding: '6px 12px', borderRadius: 20 }}>18 near you</span>
          </div>

          {/* Desktop — white card */}
          <div className="hidden md:flex absolute inset-0 items-center" style={{ padding: '0 60px', justifyContent: 'flex-start' }}>
            <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.25)', padding: '28px 32px', width: 420, flexShrink: 0, border: '1px solid #f3f4f6', marginLeft: '15%' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 4 }}>
                <h1 style={{ fontWeight: 700, color: '#111827', fontSize: 28, lineHeight: 1.3, margin: 0 }}>Find IT support in your area</h1>
                <span style={{ flexShrink: 0, background: '#6366f1', color: '#fff', fontSize: 11, fontWeight: 700, padding: '6px 12px', borderRadius: 999, whiteSpace: 'nowrap', marginTop: 2 }}>18 near you</span>
              </div>
              <p style={{ color: '#9ca3af', fontSize: 13, marginBottom: 20, marginTop: 4 }}>Confirm your location to see quality pros near you.</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #e5e7eb', borderRadius: 8, padding: '12px 16px', marginBottom: 12, background: '#fff' }}>
                <svg style={{ width: 16, height: 16, color: '#9ca3af', flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span style={{ color: '#9ca3af', fontSize: 13, marginRight: 4 }}>Zip code</span>
                <input type="text" defaultValue="97205" style={{ flex: 1, fontSize: 13, color: '#111827', outline: 'none', background: 'transparent', border: 'none' }} />
              </div>
              <Link href="/get-started/wizard" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#29abe2', color: '#fff', fontWeight: 700, padding: '14px 0', borderRadius: 8, fontSize: 14, textDecoration: 'none', width: '100%' }}>
                Find a pro
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile — form below image */}
        <div className="md:hidden" style={{ background: '#fff', padding: '20px', borderBottom: '1px solid #f3f4f6' }}>
          <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 16 }}>Give us a few details and we'll match you with the right pro.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1.5px solid #9ca3af', borderRadius: 8, padding: '14px 16px', marginBottom: 12, background: '#fff', height: 52 }}>
            <svg style={{ width: 20, height: 20, color: '#9ca3af', flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span style={{ color: '#6b7280', fontSize: 15 }}>Zip code</span>
            <input type="text" defaultValue="97205" style={{ flex: 1, fontSize: 15, color: '#111827', outline: 'none', background: 'transparent', border: 'none' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 10 }}>
            <CustomDropdown
              label="Computer issue"
              options={['Network issues', 'Software issues', 'Virus removal', 'Data recovery', 'Hardware repair']}
              value={computerIssue}
              onChange={setComputerIssue}
            />
            <CustomDropdown
              label="Computer type"
              options={['PC / Windows', 'Mac / Apple', 'Linux', 'Multiple']}
              value={computerType}
              onChange={setComputerType}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <CustomDropdown
              label="Desktop or laptop"
              options={['Desktop', 'Laptop', 'Server', 'Multiple devices']}
              value={desktopLaptop}
              onChange={setDesktopLaptop}
            />
          </div>
          <Link href="/get-started/wizard" style={{ display: 'block', background: '#0099CC', color: '#fff', fontWeight: 700, padding: '16px', borderRadius: 10, fontSize: 15, textDecoration: 'none', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,153,204,0.3)' }}>
            Find a pro
          </Link>
        </div>
      </section>

      {/* ── BREADCRUMB + TITLE ── */}
      <section style={{ padding: '32px 20px 24px', borderBottom: '1px solid #f3f4f6', maxWidth: 1152, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#9ca3af', marginBottom: 16, flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>ZERO NERDS</Link>
          <span>›</span>
          <Link href="/areas" style={{ color: 'inherit', textDecoration: 'none' }}>OR</Link>
          <span>›</span>
          <Link href="/portland" style={{ color: 'inherit', textDecoration: 'none' }}>Portland</Link>
          <span>›</span>
          <span style={{ color: '#374151', fontWeight: 500 }}>IT Support</span>
        </div>
        <h2 style={{ fontWeight: 700, fontSize: 32, color: '#111827', marginBottom: 12 }}>IT support technicians near Portland, OR</h2>
        <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.6, maxWidth: 680 }}>
          IT support pros in Portland, OR manage cloud infrastructure, monitor systems 24/7, and keep your business secure. They handle network setup, help desk support, and data backup so you spend less time troubleshooting and more time growing.
        </p>
      </section>

      {/* ── TOP PROS ── */}
      <section style={{ padding: '32px 20px', borderBottom: '1px solid #f3f4f6', maxWidth: 1152, margin: '0 auto' }}>
        <div style={{ marginBottom: 16 }}>
          <h3 style={{ fontWeight: 700, fontSize: 24, color: '#111827', marginBottom: 4 }}>Top pros for your project</h3>
        </div>

        {/* Scrollable sort tabs */}
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 8, paddingBottom: 4, minWidth: 'max-content' }}>
            {[
              { label: 'Recommended', icon: true },
              { label: 'Highest rated' },
              { label: 'Most hires' },
              { label: 'Fastest response' },
            ].map((tab, i) => (
              <button key={tab.label} style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6, border: '1px solid #e5e7eb', borderRadius: 999, padding: '8px 16px', fontSize: 14, color: '#111827', background: '#fff', cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: i === 0 ? 600 : 400 }}>
                {tab.icon && (
                  <svg style={{ width: 14, height: 14, color: '#374151' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M6 12h12M9 17h6" />
                  </svg>
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 8 }}>These highly recommended pros are experts, ready to help with your project.</p>

        {/* Pro listings */}
        {[
          {
            num: 1,
            name: 'Aquilante Computers (prev. Aquilis)',
            logo: '/pros/aquilante.jpg',
            ratingLabel: 'Great 4.8',
            ratingColor: '#22c55e',
            stars: 5,
            reviews: 273,
            topPro: true,
            badges: [{ label: 'Great value', bg: '#eef2ff', color: '#4338ca', border: '#c7d2fe' }],
            hires: '437 hires on ZERO NERDS',
            area: 'Serves Portland, OR + Vancouver, WA',
            quote: 'Amy F. says, "They were ',
            bold: 'amazing',
            quoteEnd: '. I would recommend them to Family and Friends as well as use them again."',
          },
          {
            num: 2,
            name: 'Right Click Computer & Networking Service Portland',
            logo: '/pros/rightclick.jpg',
            ratingLabel: 'Good 4.4',
            ratingColor: '#22c55e',
            stars: 4,
            reviews: 94,
            topPro: false,
            badges: [{ label: 'In high demand', bg: '#eef2ff', color: '#4338ca', border: '#c7d2fe' }],
            hires: '224 hires on ZERO NERDS',
            area: '13 similar jobs done near you',
            quote: 'Mark L. says, "',
            bold: 'Responded',
            quoteEnd: ' and diagnosed promptly."',
          },
          {
            num: 3,
            name: 'Fixophile',
            logo: '/pros/fixophile.jpg',
            ratingLabel: '5.0',
            ratingColor: '#22c55e',
            stars: 5,
            reviews: 1,
            topPro: false,
            badges: [{ label: 'In high demand', bg: '#eef2ff', color: '#4338ca', border: '#c7d2fe' }],
            hires: '1 hire on ZERO NERDS',
            area: 'Serves Vancouver, WA',
            quote: 'Sahkidad E. says, "Their expertise, patience, and clear explanations made the ',
            bold: 'repair',
            quoteEnd: ' process seamless."',
            onlineNow: true,
          },
          {
            num: 4,
            name: 'J3LEgacy Ventures, LLC',
            logo: '/pros/j3legacy.jpg',
            ratingLabel: '5.0',
            ratingColor: '#22c55e',
            stars: 5,
            reviews: 1,
            topPro: false,
            badges: [],
            hires: '',
            area: 'Serves Vancouver, WA',
            quote: 'Carol Rusinko says, "I recently had my laptop ',
            bold: 'repaired',
            quoteEnd: ' by J3Legacy Ventures, LLC. I am very happy with the results."',
            onlineNow: false,
          },
        ].map((pro) => (
          <div key={pro.num} style={{ display: 'flex', gap: 16, padding: '24px 0', borderBottom: '1px solid #f3f4f6' }}>
            <div style={{ flexShrink: 0 }}>
              <div className="w-20 h-20 md:w-[140px] md:h-[140px]" style={{ borderRadius: '50%', overflow: 'hidden', border: '1px solid #e5e7eb', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={pro.logo} alt={pro.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: '#111827', fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{pro.num}. {pro.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
                    {pro.topPro && (
                      <span style={{ background: '#29abe2', color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 999 }}>Top Pro</span>
                    )}
                    <span style={{ color: pro.ratingColor, fontWeight: 600, fontSize: 13 }}>{pro.ratingLabel}</span>
                    <Stars n={pro.stars} color={pro.ratingColor} />
                    <span style={{ color: '#6b7280', fontSize: 13 }}>({pro.reviews})</span>
                  </div>
                  {pro.badges.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                      {pro.badges.map((b) => (
                        <span key={b.label} style={{ background: b.bg, color: b.color, border: `1px solid ${b.border}`, fontSize: 12, fontWeight: 500, padding: '4px 10px', borderRadius: 999 }}>{b.label}</span>
                      ))}
                    </div>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 10 }}>
                    {pro.hires && (
                      <span style={{ fontSize: 13, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <svg style={{ width: 14, height: 14, color: '#9ca3af', flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                        {pro.hires}
                      </span>
                    )}
                    <span style={{ fontSize: 13, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <svg style={{ width: 14, height: 14, color: '#9ca3af', flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                      {pro.area}
                    </span>
                    {pro.onlineNow && (
                      <span style={{ fontSize: 13, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
                        Online now
                      </span>
                    )}
                  </div>
                  {pro.quote && (
                    <p style={{ fontSize: 13, color: '#374151' }}>
                      {pro.quote}<strong>{pro.bold}</strong>{pro.quoteEnd}{' '}
                      <span style={{ color: '#29abe2', cursor: 'pointer', fontSize: 12 }}>See more</span>
                    </p>
                  )}
                </div>
                <a href="tel:+15033137121" className="hidden md:inline-flex" style={{ flexShrink: 0, alignItems: 'center', background: '#29abe2', color: '#fff', fontWeight: 600, padding: '10px 20px', borderRadius: 6, fontSize: 14, textDecoration: 'none', whiteSpace: 'nowrap', alignSelf: 'flex-start' }}>
                  View profile
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── COST GUIDE ── */}
      <section style={{ padding: '40px 20px', borderBottom: '1px solid #f3f4f6', maxWidth: 1152, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', minWidth: 200 }}>
            <h3 style={{ fontWeight: 700, fontSize: 20, color: '#111827', lineHeight: 1.4, marginBottom: 20 }}>IT Support Services<br />Cost Guide</h3>
            <a href="tel:+15033137121" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#29abe2', color: '#fff', fontWeight: 700, padding: '12px 28px', borderRadius: 6, fontSize: 14, textDecoration: 'none' }}>
              View cost guide
            </a>
          </div>
          <div style={{ flex: 1, minWidth: 280, maxWidth: 420 }}>
            <BellCurveChart />
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section style={{ padding: '40px 20px', borderBottom: '1px solid #f3f4f6', maxWidth: 1152, margin: '0 auto' }}>
        <h3 style={{ fontWeight: 700, fontSize: 24, color: '#111827', marginBottom: 6 }}>FAQs</h3>
        <p style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 24 }}>
          Answers to commonly asked questions from the experts on{' '}
          <span style={{ color: '#29abe2' }}>ZERO NERDS</span>.
        </p>
        <div>
          {FAQS.map((faq) => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section style={{ padding: '40px 20px', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 20px' }}>
          <h3 style={{ fontWeight: 700, fontSize: 20, color: '#111827', marginBottom: 24 }}>Reviews for Portland IT technicians on ZERO NERDS</h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, maxWidth: 1152, margin: '0 auto', padding: '0 20px' }} className="md:!flex-row">
          <button onClick={() => { const el = document.getElementById('reviews-carousel'); if(el) el.scrollBy({ left: -320, behavior: 'smooth' }); }} style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid #e5e7eb', background: '#fff', display: 'none', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', flexShrink: 0 }} className="md:!flex">
            <svg style={{ width: 16, height: 16, color: '#374151' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
            <div id="reviews-carousel" style={{ display: 'flex', gap: 16, overflowX: 'auto', scrollBehavior: 'smooth', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
              <style>{`#reviews-carousel::-webkit-scrollbar { display: none; } #reviews-carousel { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
              {[...REVIEWS, null].map((r) => (
                r ? (
                  <div key={r.from} style={{ width: 300, flexShrink: 0, scrollSnapAlign: 'start', border: '1px solid #e5e7eb', borderRadius: 12, padding: 20, background: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{r.initials}</div>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: '#111827', marginBottom: 2 }}>{r.from}</p>
                        <p style={{ fontSize: 12, color: '#9ca3af' }}>{r.company}</p>
                      </div>
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <Stars n={r.stars} />
                    </div>
                    <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.6, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis', wordWrap: 'break-word' }}>{r.text}</p>
                  </div>
                ) : (
                  <div key="cta" style={{ width: 300, flexShrink: 0, scrollSnapAlign: 'start', border: '1px solid #bfdbfe', borderRadius: 12, padding: 24, background: '#eff6ff', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                    <h4 style={{ fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 8 }}>Ready to find a pro?</h4>
                    <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.5, marginBottom: 16 }}>See more reviews, compare prices, and hire your favorite pros all with ZERO NERDS.</p>
                    <a href="tel:+15033137121" style={{ display: 'block', width: '100%', background: '#2563eb', color: '#fff', fontWeight: 700, padding: '12px 16px', borderRadius: 8, fontSize: 14, textDecoration: 'none', textAlign: 'center' }}>
                      Get started
                    </a>
                  </div>
                )
              ))}
            </div>
          </div>
          <button onClick={() => { const el = document.getElementById('reviews-carousel'); if(el) el.scrollBy({ left: 320, behavior: 'smooth' }); }} style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid #e5e7eb', background: '#fff', display: 'none', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', flexShrink: 0 }} className="md:!flex">
            <svg style={{ width: 16, height: 16, color: '#374151' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </section>

      {/* ── WHY HIRE ── */}
      <section style={{ padding: '56px 20px', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 8 }}>There are 18 five-star IT Technicians near Portland, OR on ZERO NERDS.</p>
          <h3 style={{ fontWeight: 700, fontSize: 28, color: '#111827', marginBottom: 48, lineHeight: 1.3 }}>Why hire professionals at ZERO NERDS?</h3>

          {/* 3-col on desktop, vertical on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 40, marginBottom: 40 }}>
            {/* Item 1 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid #6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <svg style={{ width: 22, height: 22, color: '#6366f1' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 style={{ fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 8 }}>Flat-rate pricing</h4>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>No hidden fees — clear, predictable pricing upfront. Get cost estimates, contact pros, and even book the job — all with no surprises.</p>
            </div>

            {/* Item 2 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid #6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <svg style={{ width: 22, height: 22, color: '#6366f1' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 style={{ fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 8 }}>Compare prices side-by-side</h4>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>You'll know how much your project costs even before booking a pro.</p>
            </div>

            {/* Item 3 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <svg style={{ width: 28, height: 28, color: '#6366f1' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 style={{ fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 8 }}>Hire with confidence</h4>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>With access to 50+ customer reviews and the pros' work history, you'll have all the info you need to make a hire.</p>
            </div>
          </div>

          <a href="tel:+15033137121" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#29abe2', color: '#fff', fontWeight: 700, padding: '14px 48px', borderRadius: 6, fontSize: 14, textDecoration: 'none' }}>
            Get started
          </a>
        </div>
      </section>

      <FunnelFooter />
    </div>
  );
}

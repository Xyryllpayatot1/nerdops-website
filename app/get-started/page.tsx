'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ─── TYPES ─────────────────────────────────────────────── */

interface DropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

interface Review {
  from: string;
  company: string;
  initials: string;
  stars: number;
  text: string;
}

interface Faq {
  q: string;
  a: string;
}

interface Badge {
  label: string;
  bg: string;
  color: string;
  border: string;
}

interface Pro {
  num: number;
  name: string;
  logo: string;
  ratingLabel: string;
  ratingColor: string;
  stars: number;
  reviews: number;
  topPro: boolean;
  badges: Badge[];
  hires: string;
  area: string;
  quote: string;
  bold: string;
  quoteEnd: string;
  onlineNow?: boolean;
}

interface SocialIcon {
  label: string;
  path: string;
}

interface FooterColumn {
  title: string;
  links: string[];
  href: string;
}

interface NavLink {
  label: string;
  href: string;
}

interface SortTab {
  label: string;
  icon?: boolean;
}

interface StarsProps {
  n: number;
  color?: string;
}

interface FaqItemProps {
  q: string;
  a: string;
}

/* ─── DATA ─────────────────────────────────────────────── */

const REVIEWS: Review[] = [
  { from: 'Kate L.',  company: 'ZERO NERDS', initials: 'KL', stars: 5, text: 'ZERO NERDS is the absolute best IT service around. Very fast response time with a dedicated and educated team. They can solve any issue that occurs, leaving us with less downtime than ever before.' },
  { from: 'Chris W.', company: 'ZERO NERDS', initials: 'CW', stars: 5, text: 'Nothing compares to the level of expertise and sense of urgency as Daniel and his team. Amazing service, integrity, and knowledge in all aspects of the craft.' },
  { from: 'Lisa C.',  company: 'ZERO NERDS', initials: 'LC', stars: 5, text: 'Danny is an incredible IT support. Super knowledgeable and works to get your company to the level you need to be, taking your budget into account.' },
];

const FAQS: Faq[] = [
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

const PROS: Pro[] = [
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
];

/* ─── COMPONENTS ────────────────────────────────────────── */

function CustomDropdown({ label, options, value, onChange }: DropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between border-[1.5px] border-gray-400 rounded-lg px-4 bg-white cursor-pointer text-[15px] font-bold text-gray-900 min-h-[52px]"
      >
        <span>{value || label}</span>
        <svg className="w-[18px] h-[18px] text-gray-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-md z-20 overflow-hidden">
          {options.map((opt, i) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full px-4 py-[14px] text-left bg-transparent border-none cursor-pointer text-base font-medium text-gray-700 hover:bg-gray-50 ${i < options.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Stars({ n, color = '#22c55e' }: StarsProps) {
  return (
    <span style={{ color, letterSpacing: -0.5 }} className="text-sm">
      {'★'.repeat(n)}{'☆'.repeat(5 - n)}
    </span>
  );
}

function FAQItem({ q, a }: FaqItemProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full flex justify-between items-center py-5 text-left gap-4 bg-transparent border-none cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="text-gray-900 text-base font-bold leading-normal">{q}</span>
        <svg
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="pb-5 text-gray-500 text-sm leading-relaxed">{a}</div>}
    </div>
  );
}

function BellCurveChart() {
  const allPoints = '30,148 60,145 90,140 120,131 150,118 175,103 195,87 215,68 230,52 245,38 258,27 270,19 283,14 295,11 307,10 319,10 330,12 341,16 353,22 364,30 375,40 390,55 408,74 427,93 447,110 468,124 490,136 513,143 540,148 570,150';
  const middlePath = 'M230,52 L245,38 L258,27 L270,19 L283,14 L295,11 L307,10 L319,10 L330,12 L341,16 L353,22 L364,30 L375,40';
  const shadedArea = 'M230,52 L245,38 L258,27 L270,19 L283,14 L295,11 L307,10 L319,10 L330,12 L341,16 L353,22 L364,30 L375,40 L375,152 L230,152 Z';

  return (
    <svg viewBox="0 0 600 185" className="w-full max-w-[420px] block mx-auto">
      <defs>
        <pattern id="diag" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#6ee7b7" strokeWidth="2" />
        </pattern>
      </defs>
      <line x1="20" y1="152" x2="580" y2="152" stroke="#e5e7eb" strokeWidth="1" />
      <path d={shadedArea} fill="url(#diag)" />
      <polyline points={allPoints} fill="none" stroke="#86efac" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      <path d={middlePath} fill="none" stroke="#10b981" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
      <line x1="230" y1="8" x2="230" y2="152" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="5,4" />
      <line x1="375" y1="8" x2="375" y2="152" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="5,4" />
      <text x="85"  y="174" textAnchor="middle" fontSize="13" fontFamily="sans-serif" fill="#111827">$</text>
      <text x="230" y="174" textAnchor="middle" fontSize="13" fontFamily="sans-serif" fill="#111827">$$</text>
      <text x="375" y="174" textAnchor="middle" fontSize="13" fontFamily="sans-serif" fill="#111827">$$$</text>
      <text x="515" y="174" textAnchor="middle" fontSize="13" fontFamily="sans-serif" fill="#111827">$$$$</text>
    </svg>
  );
}

/* ─── FUNNEL NAVBAR ─────────────────────────────────────── */

function FunnelNavbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDesktopDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const mainLinks: NavLink[] = [
    { label: 'Home', href: '/' },
    { label: 'Sign up as a pro', href: '/contact' },
    { label: 'Plan', href: '/solutions' },
    { label: 'Team', href: '/about' },
    { label: 'Inbox', href: '/contact' },
  ];

  const bottomLinks: NavLink[] = [
    { label: 'Profile', href: '/profile' },
    { label: 'Log out', href: '/logout' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 text-gray-700">
        <div className="w-full px-5 h-16 flex items-center justify-between">
          {/* Mobile: logo + hamburger */}
          <div className="md:hidden flex items-center">
            <Link href="/" className="flex items-center bg-transparent">
              <Image src="/mainlogo.png" alt="ZERO NERDS" width={220} height={110} className="h-[110px] w-auto object-contain bg-transparent" priority />
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden bg-transparent border-none cursor-pointer pl-1 flex items-center text-gray-700"
            >
              <svg className={`w-5 h-5 transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
              </svg>
            </button>
          </div>

          {/* Desktop: nav links */}
          <div className="hidden md:flex items-center gap-8 text-[15px] text-gray-700 font-normal">
            <Link href="/contact" className="text-gray-700 no-underline">Sign up as a pro</Link>
            <Link href="/solutions" className="text-gray-700 no-underline">Services</Link>
            <Link href="/about" className="text-gray-700 no-underline">About</Link>
            <Link href="/contact" className="text-gray-700 no-underline">Inbox</Link>
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDesktopDropdownOpen(!desktopDropdownOpen)}
                className="hidden md:flex items-center gap-2 cursor-pointer bg-transparent border-none p-0"
              >
                <div className="w-8 h-8 rounded-full bg-[#29abe2] flex items-center justify-center text-white text-[11px] font-bold shrink-0">ZN</div>
                <span className="text-[15px] text-gray-700">Client</span>
                <svg className={`w-[14px] h-[14px] text-gray-500 transition-transform duration-200 ${desktopDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {desktopDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-md min-w-[150px] overflow-hidden z-[60]">
                  <Link href="/profile" onClick={() => setDesktopDropdownOpen(false)} className="block px-4 py-3 text-sm text-gray-900 no-underline border-b border-gray-100">Profile</Link>
                  <Link href="/logout" onClick={() => setDesktopDropdownOpen(false)} className="block px-4 py-3 text-sm text-gray-900 no-underline">Log out</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bottom-0 bg-white z-[49] overflow-y-auto border-t border-gray-200">
          <div className="py-2">
            {mainLinks.map((link) => (
              <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
                className="block px-5 py-[18px] text-[17px] font-bold text-gray-900 no-underline border-b border-gray-100">
                {link.label}
              </Link>
            ))}
            <div className="h-2 bg-gray-50 border-t border-gray-200" />
            {bottomLinks.map((link) => (
              <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
                className="block px-5 py-[18px] text-[17px] font-bold text-gray-900 no-underline border-b border-gray-100">
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
  const row1: FooterColumn[] = [
    { title: 'Related cost information', links: ['Managed IT prices','Computer support costs','Network setup cost','Cloud hosting prices','Cybersecurity costs'], href: '/solutions' },
    { title: 'Popular in Portland',      links: ['IT support Portland','Networking Portland','Computer help Portland','Cloud services Portland','Cybersecurity Portland'], href: '/portland' },
    { title: 'You might also like',      links: ['IT support near me','Managed IT near me','Computer repair near me','Network setup near me','Cybersecurity near me'], href: '/areas' },
    { title: 'In other nearby areas',   links: ['Vancouver WA IT support','Gresham IT support','Hillsboro IT support','Beaverton IT support','Milwaukie IT support'], href: '/areas' },
  ];

  const socialIcons: SocialIcon[] = [
    { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
    { label: 'X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
    { label: 'Pinterest', path: 'M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z' },
    { label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 text-gray-900 mt-16">
      {/* Row 1 — link columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 max-w-6xl mx-auto px-5 py-10 gap-8">
        {row1.map((col) => (
          <div key={col.title}>
            <p className="font-bold text-sm text-gray-900 mb-3">{col.title}</p>
            {col.links.map((l) => (
              <Link key={l} href={col.href} className="block text-[13px] text-gray-500 no-underline mb-2">{l}</Link>
            ))}
            <Link href={col.href} className="block text-[13px] text-[#29abe2] font-semibold no-underline mt-1">Show more</Link>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200" />

      {/* Row 2 — brand columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 max-w-6xl mx-auto px-5 py-10 gap-8">
        {/* Brand */}
        <div>
          <p className="font-bold text-sm text-gray-900 mb-0.5">ZERO NERDS</p>
          <p className="font-bold text-sm text-gray-900 mb-4">Consider it done.</p>
          {['About','Partner with us','For developers','Careers','Press','Blog'].map((l) => (
            <Link key={l} href="/about" className="block text-[13px] text-gray-500 no-underline mb-2">{l}</Link>
          ))}
          <div className="flex gap-[14px] mt-4">
            {socialIcons.map((s) => (
              <svg key={s.label} className="w-[18px] h-[18px] fill-gray-500 cursor-pointer" viewBox="0 0 24 24">
                <path d={s.path} />
              </svg>
            ))}
          </div>
        </div>

        {/* Customers */}
        <div>
          <p className="font-bold text-sm text-gray-900 mb-4">Customers</p>
          {['How to use ZERO NERDS','Get the app','Services near me','Cost estimates','Home resource center'].map((l) => (
            <Link key={l} href="/contact" className="block text-[13px] text-gray-500 no-underline mb-2">{l}</Link>
          ))}
        </div>

        {/* Pros */}
        <div>
          <p className="font-bold text-sm text-gray-900 mb-4">Pros</p>
          {['ZERO NERDS for pros','Sign up as a pro','Community','Pro Resources','Pro reviews','IT support app','Android app for pros'].map((l) => (
            <Link key={l} href="/solutions" className="block text-[13px] text-[#29abe2] no-underline mb-2">{l}</Link>
          ))}
        </div>

        {/* Support */}
        <div>
          <p className="font-semibold text-sm text-gray-900 mb-4">Support</p>
          {['Help','Safety','Terms of Use','Privacy Policy','CA Notice at Collection','Do not Sell or Share My Personal Information'].map((l) => (
            <Link key={l} href="/contact" className="block text-[13px] text-gray-500 no-underline mb-2">{l}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── PAGE ──────────────────────────────────────────────── */

export default function GetStartedPage() {
  const [computerIssue, setComputerIssue] = useState<string>('');
  const [computerType, setComputerType] = useState<string>('');
  const [desktopLaptop, setDesktopLaptop] = useState<string>('');

  const sortTabs: SortTab[] = [
    { label: 'Recommended', icon: true },
    { label: 'Highest rated' },
    { label: 'Most hires' },
    { label: 'Fastest response' },
  ];

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <FunnelNavbar />

      {/* ── HERO ── */}
      <section className="relative w-full bg-[#0d1530]">
        <div className="relative w-full h-[300px] md:h-[55vh] md:max-h-[560px]">
          <img
            src="https://production-next-images-cdn.thumbtack.com/i/319590363801166026/width/1920.jpeg"
            alt="IT Support"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />

          {/* Mobile — title on image */}
          <div className="md:hidden absolute top-[120px] left-5 right-5 z-10">
            <h1 className="font-bold text-white text-[22px] mb-[10px]">Find an IT technician in your area</h1>
            <span className="inline-block bg-indigo-500 text-white text-xs font-bold px-3 py-[6px] rounded-[20px]">18 near you</span>
          </div>

          {/* Desktop — white card */}
          <div className="hidden md:flex absolute inset-0 items-center px-[60px]">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-[420px] shrink-0 border border-gray-100 ml-[15%]">
              <div className="flex items-start justify-between gap-3 mb-1">
                <h1 className="font-bold text-gray-900 text-[28px] leading-tight m-0">Find IT support in your area</h1>
                <span className="shrink-0 bg-indigo-500 text-white text-[11px] font-bold px-3 py-[6px] rounded-full whitespace-nowrap mt-0.5">18 near you</span>
              </div>
              <p className="text-gray-400 text-[13px] mb-5 mt-1">Confirm your location to see quality pros near you.</p>
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-3 mb-3 bg-white">
                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-400 text-[13px] mr-1">Zip code</span>
                <input type="text" defaultValue="97205" className="flex-1 text-[13px] text-gray-900 outline-none bg-transparent border-none" />
              </div>
              <Link href="/get-started/wizard" className="flex items-center justify-center bg-[#29abe2] text-white font-bold py-[14px] rounded-lg text-sm no-underline w-full">
                Find a pro
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile — form below image */}
        <div className="md:hidden bg-white p-5 border-b border-gray-100">
          <p className="text-gray-500 text-sm mb-4">Give us a few details and we&apos;ll match you with the right pro.</p>
          <div className="flex items-center gap-2 border-[1.5px] border-gray-400 rounded-lg px-4 mb-3 bg-white h-[52px]">
            <svg className="w-5 h-5 text-gray-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-500 text-[15px]">Zip code</span>
            <input type="text" defaultValue="97205" className="flex-1 text-[15px] text-gray-900 outline-none bg-transparent border-none" />
          </div>
          <div className="flex flex-col gap-[10px] mb-[10px]">
            <CustomDropdown label="Computer issue" options={['Network issues','Software issues','Virus removal','Data recovery','Hardware repair']} value={computerIssue} onChange={setComputerIssue} />
            <CustomDropdown label="Computer type" options={['PC / Windows','Mac / Apple','Linux','Multiple']} value={computerType} onChange={setComputerType} />
          </div>
          <div className="mb-4">
            <CustomDropdown label="Desktop or laptop" options={['Desktop','Laptop','Server','Multiple devices']} value={desktopLaptop} onChange={setDesktopLaptop} />
          </div>
          <Link href="/get-started/wizard" className="block bg-[#0099CC] text-white font-bold p-4 rounded-[10px] text-[15px] no-underline text-center shadow-[0_2px_8px_rgba(0,153,204,0.3)]">
            Find a pro
          </Link>
        </div>
      </section>

      {/* ── BREADCRUMB + TITLE ── */}
      <section className="px-5 pt-8 pb-6 border-b border-gray-100 max-w-6xl mx-auto">
        <div className="flex items-center gap-[6px] text-xs text-gray-400 mb-4 flex-wrap">
          <Link href="/" className="text-gray-400 no-underline">ZERO NERDS</Link>
          <span>›</span>
          <Link href="/areas" className="text-gray-400 no-underline">OR</Link>
          <span>›</span>
          <Link href="/portland" className="text-gray-400 no-underline">Portland</Link>
          <span>›</span>
          <span className="text-gray-700 font-medium">IT Support</span>
        </div>
        <h2 className="font-bold text-[32px] text-gray-900 mb-3">IT support technicians near Portland, OR</h2>
        <p className="text-gray-500 text-sm leading-relaxed max-w-[680px]">
          IT support pros in Portland, OR manage cloud infrastructure, monitor systems 24/7, and keep your business secure. They handle network setup, help desk support, and data backup so you spend less time troubleshooting and more time growing.
        </p>
      </section>

      {/* ── TOP PROS ── */}
      <section className="px-5 py-8 border-b border-gray-100 max-w-6xl mx-auto">
        <div className="mb-4">
          <h3 className="font-bold text-2xl text-gray-900 mb-1">Top pros for your project</h3>
        </div>

        {/* Scrollable sort tabs */}
        <div className="overflow-x-auto mb-3">
          <div className="flex gap-2 pb-1 min-w-max">
            {sortTabs.map((tab, i) => (
              <button key={tab.label} className={`shrink-0 flex items-center gap-[6px] border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-900 bg-white cursor-pointer whitespace-nowrap ${i === 0 ? 'font-semibold' : 'font-normal'}`}>
                {tab.icon && (
                  <svg className="w-[14px] h-[14px] text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M6 12h12M9 17h6" />
                  </svg>
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-2">These highly recommended pros are experts, ready to help with your project.</p>

        {/* Pro listings */}
        {PROS.map((pro) => (
          <div key={pro.num} className="flex flex-col gap-4 py-6 border-b border-gray-100">
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="w-20 h-20 md:w-[140px] md:h-[140px] rounded-full overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
                  <img src={pro.logo} alt={pro.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 font-bold text-base mb-1">{pro.num}. {pro.name}</p>
                    <div className="flex items-center gap-[6px] mb-2 flex-wrap">
                      {pro.topPro && (
                        <span className="bg-[#29abe2] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">Top Pro</span>
                      )}
                      <span style={{ color: pro.ratingColor }} className="font-semibold text-[13px]">{pro.ratingLabel}</span>
                      <Stars n={pro.stars} color={pro.ratingColor} />
                      <span className="text-gray-500 text-[13px]">({pro.reviews})</span>
                    </div>
                    {pro.badges.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {pro.badges.map((b) => (
                          <span key={b.label} style={{ background: b.bg, color: b.color, border: `1px solid ${b.border}` }} className="text-xs font-medium px-[10px] py-1 rounded-full">{b.label}</span>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-col gap-1 mb-[10px]">
                      {pro.hires && (
                        <span className="text-[13px] text-gray-500 flex items-center gap-[6px]">
                          <svg className="w-[14px] h-[14px] text-gray-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          {pro.hires}
                        </span>
                      )}
                      <span className="text-[13px] text-gray-500 flex items-center gap-[6px]">
                        <svg className="w-[14px] h-[14px] text-gray-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {pro.area}
                      </span>
                      {pro.onlineNow && (
                        <span className="text-[13px] text-gray-500 flex items-center gap-[6px]">
                          <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                          Online now
                        </span>
                      )}
                    </div>
                    {pro.quote && (
                      <p className="text-[13px] text-gray-700">
                        {pro.quote}<strong>{pro.bold}</strong>{pro.quoteEnd}{' '}
                        <span className="text-[#29abe2] cursor-pointer text-xs">See more</span>
                      </p>
                    )}
                  </div>
                  <div className="hidden md:flex flex-col gap-2 shrink-0 self-start">
                    <Link href="/get-started/wizard" className="inline-flex items-center bg-[#29abe2] text-white font-semibold px-5 py-[10px] rounded-[6px] text-sm no-underline whitespace-nowrap">
                      Get Free Quote
                    </Link>
                    <a href="tel:+15033137121" className="inline-flex items-center bg-white text-gray-900 font-semibold px-5 py-[10px] rounded-[6px] text-sm no-underline whitespace-nowrap border border-gray-200">
                      View profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/get-started/wizard" className="md:hidden flex items-center justify-center bg-[#29abe2] text-white font-semibold py-3 rounded-[6px] text-sm no-underline">
              Get Free Quote
            </Link>
          </div>
        ))}
      </section>

      {/* ── COST GUIDE ── */}
      <section className="px-5 py-10 border-b border-gray-100 max-w-6xl mx-auto">
        <div className="flex flex-row items-center gap-10 flex-wrap justify-center">
          <div className="text-center min-w-[200px]">
            <h3 className="font-bold text-xl text-gray-900 leading-snug mb-5">IT Support Services<br />Cost Guide</h3>
            <a href="tel:+15033137121" className="inline-flex items-center justify-center bg-[#29abe2] text-white font-bold px-7 py-3 rounded-[6px] text-sm no-underline">
              View cost guide
            </a>
          </div>
          <div className="flex-1 min-w-[280px] max-w-[420px]">
            <BellCurveChart />
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="px-5 py-10 border-b border-gray-100 max-w-6xl mx-auto">
        <h3 className="font-bold text-2xl text-gray-900 mb-[6px]">FAQs</h3>
        <p className="text-[15px] font-bold text-gray-900 mb-6">
          Answers to commonly asked questions from the experts on{' '}
          <span className="text-[#29abe2]">ZERO NERDS</span>.
        </p>
        <div>
          {FAQS.map((faq) => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-10 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 mb-6">
          <h3 className="font-bold text-xl text-gray-900">Reviews for Portland IT technicians on ZERO NERDS</h3>
        </div>
        <div className="flex items-center gap-3 max-w-6xl mx-auto px-5">
          <button
            onClick={() => { const el = document.getElementById('reviews-carousel'); if (el) el.scrollBy({ left: -320, behavior: 'smooth' }); }}
            className="hidden md:flex w-10 h-10 rounded-full border border-gray-200 bg-white items-center justify-center cursor-pointer shadow-sm shrink-0"
          >
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex-1 overflow-hidden relative">
            <div
              id="reviews-carousel"
              className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
              style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
            >
              <style>{`#reviews-carousel::-webkit-scrollbar { display: none; }`}</style>
              {([...REVIEWS, null] as (Review | null)[]).map((r) =>
                r ? (
                  <div key={r.from} className="w-[300px] shrink-0 snap-start border border-gray-200 rounded-xl p-5 bg-white">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-xs font-bold shrink-0">{r.initials}</div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 mb-0.5">{r.from}</p>
                        <p className="text-xs text-gray-400">{r.company}</p>
                      </div>
                    </div>
                    <div className="mb-2"><Stars n={r.stars} /></div>
                    <p className="text-[13px] text-gray-700 leading-relaxed line-clamp-3">{r.text}</p>
                  </div>
                ) : (
                  <div key="cta" className="w-[300px] shrink-0 snap-start border border-blue-200 rounded-xl p-6 bg-blue-50 flex flex-col justify-center text-center">
                    <h4 className="font-bold text-base text-gray-900 mb-2">Ready to find a pro?</h4>
                    <p className="text-[13px] text-gray-700 leading-relaxed mb-4">See more reviews, compare prices, and hire your favorite pros all with ZERO NERDS.</p>
                    <Link href="/get-started/wizard" className="block w-full bg-blue-600 text-white font-bold px-4 py-3 rounded-lg text-sm no-underline text-center">
                      Get Free Quote
                    </Link>
                  </div>
                )
              )}
            </div>
          </div>

          <button
            onClick={() => { const el = document.getElementById('reviews-carousel'); if (el) el.scrollBy({ left: 320, behavior: 'smooth' }); }}
            className="hidden md:flex w-10 h-10 rounded-full border border-gray-200 bg-white items-center justify-center cursor-pointer shadow-sm shrink-0"
          >
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* ── WHY HIRE ── */}
      <section className="px-5 py-14 border-b border-gray-100">
        <div className="max-w-[860px] mx-auto text-center">
          <p className="text-sm text-gray-500 mb-2">There are 18 five-star IT Technicians near Portland, OR on ZERO NERDS.</p>
          <h3 className="font-bold text-[28px] text-gray-900 mb-12 leading-snug">Why hire professionals at ZERO NERDS?</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full border-2 border-indigo-500 flex items-center justify-center mx-auto mb-4">
                <svg className="w-[22px] h-[22px] text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-[15px] text-gray-900 mb-2">Flat-rate pricing</h4>
              <p className="text-sm text-gray-500 leading-relaxed">No hidden fees — clear, predictable pricing upfront. Get cost estimates, contact pros, and even book the job — all with no surprises.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full border-2 border-indigo-500 flex items-center justify-center mx-auto mb-4">
                <svg className="w-[22px] h-[22px] text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-[15px] text-gray-900 mb-2">Compare prices side-by-side</h4>
              <p className="text-sm text-gray-500 leading-relaxed">You&apos;ll know how much your project costs even before booking a pro.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="font-bold text-[15px] text-gray-900 mb-2">Hire with confidence</h4>
              <p className="text-sm text-gray-500 leading-relaxed">With access to 50+ customer reviews and the pros&apos; work history, you&apos;ll have all the info you need to make a hire.</p>
            </div>
          </div>

          <Link href="/get-started/wizard" className="inline-flex items-center justify-center bg-[#29abe2] text-white font-bold px-12 py-[14px] rounded-[6px] text-sm no-underline">
            Get Free Quote
          </Link>
        </div>
      </section>

      {/* Sticky CTA — mobile only */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200">
        <div className="flex gap-2 p-3">
          <a href="tel:+15033137121" className="flex-1 bg-[#29abe2] text-white font-bold py-3 rounded-lg text-sm inline-flex items-center justify-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Call Now
          </a>
          <Link href="/get-started/wizard" className="flex-1 border border-[#29abe2] text-[#29abe2] font-bold py-3 rounded-lg text-sm inline-flex items-center justify-center">
            Get Free Quote
          </Link>
        </div>
      </div>

      <FunnelFooter />
    </div>
  );
}

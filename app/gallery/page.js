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

// Heights drive the masonry visual rhythm — vary them intentionally
const GALLERY_ITEMS = [
  { id: 1,  label: 'Server Room Installation',       category: 'Infrastructure', height: 280 },
  { id: 2,  label: 'Network Rack Configuration',      category: 'Infrastructure', height: 200 },
  { id: 3,  label: 'Workstation Deployment',          category: 'Setup',          height: 240 },
  { id: 4,  label: 'Cloud Migration Project',         category: 'Cloud',          height: 200 },
  { id: 5,  label: 'Security Audit Session',          category: 'Cybersecurity',  height: 260 },
  { id: 6,  label: 'Structured Cabling Project',      category: 'Infrastructure', height: 220 },
  { id: 7,  label: 'On-Site Client Support',          category: 'Support',        height: 240 },
  { id: 8,  label: 'Data Center Infrastructure',      category: 'Infrastructure', height: 200 },
  { id: 9,  label: 'Employee IT Training',            category: 'Training',       height: 280 },
  { id: 10, label: 'Wireless Network Deployment',     category: 'Infrastructure', height: 220 },
  { id: 11, label: 'Firewall Configuration',          category: 'Cybersecurity',  height: 240 },
  { id: 12, label: 'Disaster Recovery Testing',       category: 'Backup',         height: 200 },
  { id: 13, label: 'Help Desk Operations Center',     category: 'Support',        height: 260 },
  { id: 14, label: 'Microsoft 365 Migration',         category: 'Cloud',          height: 220 },
  { id: 15, label: 'Infrastructure Assessment',       category: 'Support',        height: 240 },
  { id: 16, label: 'UPS and Power Management',        category: 'Infrastructure', height: 200 },
];

const MUTED_PALETTE = [
  '#162028', '#101c28', '#0e1e1e', '#181428',
  '#1a1c14', '#14181a', '#201418', '#1a2014',
  '#101828', '#1c1410', '#141c20', '#201818',
  '#182010', '#141428', '#101c1c', '#181820',
];

export default function GalleryPage() {
  useReveal();

  // Split items into 3 columns for masonry
  const col1 = GALLERY_ITEMS.filter((_, i) => i % 3 === 0);
  const col2 = GALLERY_ITEMS.filter((_, i) => i % 3 === 1);
  const col3 = GALLERY_ITEMS.filter((_, i) => i % 3 === 2);

  const GalleryCard = ({ item }) => (
    <div
      className="relative rounded-xl overflow-hidden group cursor-default"
      style={{ height: item.height, background: MUTED_PALETTE[item.id % MUTED_PALETTE.length] }}
    >
      {/* Placeholder content area */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-10 h-10 border border-white/10 rounded-lg mx-auto mb-2 flex items-center justify-center">
            <svg className="w-5 h-5 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-white/15 text-xs font-medium">Photo Coming Soon</p>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-navy2/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex flex-col items-center justify-center p-5 text-center">
        <span className="text-teal text-xs font-bold uppercase tracking-widest mb-2">{item.category}</span>
        <p className="text-white font-semibold text-sm leading-snug">{item.label}</p>
      </div>

      {/* Category pill always visible */}
      <div className="absolute bottom-3 left-3">
        <span className="bg-black/40 backdrop-blur-sm text-white/60 text-xs px-2.5 py-1 rounded-full">
          {item.category}
        </span>
      </div>
    </div>
  );

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy2 py-24 px-5 overflow-hidden">
        <div className="absolute inset-0 hero-grid-bg opacity-40 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="section-label block text-center">Our Gallery</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mt-3 mb-5 leading-tight">
            Gallery Coming Soon
          </h1>
          <p className="text-gray text-base leading-relaxed max-w-xl mx-auto">
            Dependable IT services in Portland, OR. We are building out our gallery to showcase
            infrastructure projects, on-site work, and client environments.
          </p>
        </div>
      </section>

      {/* Masonry grid */}
      <section className="bg-navy py-20 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-12 max-w-xl mx-auto">
            <span className="section-label">Project Showcase</span>
            <h2 className="font-serif text-2xl font-bold mb-3">Infrastructure, Cloud, and Security Projects</h2>
            <p className="text-gray text-sm leading-relaxed">
              Our work spans server room builds, cloud migrations, network infrastructure, and cybersecurity
              implementations across businesses throughout Portland, OR and surrounding areas.
            </p>
          </div>

          {/* Masonry — 3 columns on desktop, 2 on tablet, 1 on mobile */}
          <div className="reveal columns-1 sm:columns-2 lg:columns-3 gap-4">
            {GALLERY_ITEMS.map((item) => (
              <div key={item.id} className="break-inside-avoid mb-4">
                <GalleryCard item={item} />
              </div>
            ))}
          </div>

          <div className="reveal text-center mt-12">
            <p className="text-gray text-sm mb-5">
              Have a project we worked on together? We would love to feature it here.
            </p>
            <Link href="/contact" className="border border-teal/40 text-teal hover:bg-teal hover:text-white font-bold px-8 py-3 rounded-lg transition-all text-sm">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 px-5 text-center"
        style={{ background: 'linear-gradient(135deg,#091a33,#0d1530,#0a1828)' }}
      >
        <div className="reveal max-w-xl mx-auto">
          <span className="section-label block text-center mb-4">Get Started</span>
          <h2 className="font-serif text-3xl font-bold mb-5">
            Reliable IT Support — Call Now
          </h2>
          <p className="text-gray text-sm leading-relaxed mb-8 max-w-md mx-auto">
            Identify vulnerabilities before they cause downtime.
            Secure your Free Cyber Security Audit today.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="bg-teal hover:bg-teal/90 text-white font-bold px-8 py-3.5 rounded-lg transition-all shadow-lg shadow-teal/20 text-sm">
              Claim Your Free Cyber Security Audit
            </Link>
            <a href="tel:+15033137121" className="border border-teal/40 text-cyan hover:border-teal font-bold px-8 py-3.5 rounded-lg transition-all text-sm">
              (503) 313-7121
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

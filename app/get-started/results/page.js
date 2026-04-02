'use client';

import Link from 'next/link';

export default function ResultsPage() {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <svg style={{ width: 40, height: 40, color: '#22c55e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111827', marginBottom: 12 }}>
          We found 18 IT pros for you!
        </h1>
        <p style={{ fontSize: 16, color: '#6b7280', marginBottom: 32, lineHeight: 1.6 }}>
          Based on your needs, we&apos;ve matched you with top-rated IT technicians in your area. They&apos;ll contact you shortly with quotes.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          <Link
            href="/get-started"
            style={{
              display: 'block',
              padding: '16px 24px',
              border: 'none',
              borderRadius: 10,
              background: '#0099CC',
              color: '#fff',
              fontSize: 16,
              fontWeight: 600,
              textDecoration: 'none',
              textAlign: 'center',
            }}
          >
            View Matching Pros
          </Link>
          <Link
            href="/get-started"
            style={{
              display: 'block',
              padding: '16px 24px',
              border: '1.5px solid #d1d5db',
              borderRadius: 10,
              background: '#fff',
              color: '#374151',
              fontSize: 16,
              fontWeight: 600,
              textDecoration: 'none',
              textAlign: 'center',
            }}
          >
            Back to Search
          </Link>
        </div>
        <p style={{ fontSize: 13, color: '#9ca3af' }}>
          Questions? Call us at{' '}
          <a href="tel:+15033137121" style={{ color: '#0099CC', textDecoration: 'none' }}>
            (503) 313-7121
          </a>
        </p>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden" style={{ background: '#fff', borderTop: '1px solid #e5e7eb' }}>
        <div className="flex gap-2 p-3">
          <a href="tel:+15033137121" className="flex-1 bg-teal hover:bg-teal/90 text-white font-bold py-3 rounded-lg text-sm inline-flex items-center justify-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Call Now
          </a>
          <Link href="/get-started/wizard" className="flex-1 border border-teal text-teal font-bold py-3 rounded-lg text-sm inline-flex items-center justify-center">
            Get Free Quote
          </Link>
        </div>
      </div>
    </div>
  );
}

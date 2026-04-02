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
    </div>
  );
}

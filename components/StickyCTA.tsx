'use client';

import Link from 'next/link';

const wrapperStyle = {
  background: 'linear-gradient(to top, rgba(13,21,48,0.98) 70%, rgba(13,21,48,0))',
  paddingTop: 40,
} as const;

const innerStyle = {
  background: '#0d1530',
  border: '1px solid rgba(53,178,159,0.3)',
  boxShadow: '0 -4px 30px rgba(53,178,159,0.15), 0 8px 40px rgba(0,0,0,0.5)',
} as const;

const callBtnStyle = { animation: 'pulse-subtle 2s ease-in-out infinite' } as const;

export default function StickyCTA() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={wrapperStyle}
    >
      <div
        className="flex gap-2 p-3 mx-3 mb-3 rounded-xl"
        style={innerStyle}
      >
        <a
          href="tel:+15033137121"
          className="flex-1 bg-gradient-to-r from-teal to-cyan hover:from-teal/90 hover:to-cyan/90 text-white font-bold py-3.5 rounded-lg text-sm inline-flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-teal/30"
          style={callBtnStyle}
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          Call Now
        </a>
        <Link 
          href="/get-started/wizard" 
          className="flex-1 border border-teal/50 text-teal hover:bg-teal hover:text-white font-bold py-3.5 rounded-lg text-sm inline-flex items-center justify-center transition-all duration-200"
        >
          Get Free Quote
        </Link>
      </div>
      <style>{`
        @keyframes pulse-subtle {
          0%, 100% {
            box-shadow: 0 4px 15px rgba(53,178,159,0.4);
          }
          50% {
            box-shadow: 0 4px 25px rgba(53,178,159,0.6);
          }
        }
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

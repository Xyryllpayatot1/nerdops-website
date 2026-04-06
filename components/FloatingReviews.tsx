'use client';

import { useState, useEffect } from 'react';

const floatingTestimonials = [
  { name: 'Kate LaMare',   text: 'ZERO NERDS is the absolute best IT service around. Very fast response time!', rating: 5 },
  { name: 'Chris Wilson',  text: 'Amazing service, integrity, and knowledge. Nothing compares to this team.', rating: 5 },
  { name: 'Katelyn',       text: 'The best IT services I have ever encountered. Quick to respond!', rating: 5 },
  { name: 'Robert Moore',  text: 'Daniel is awesome, so helpful and on top of everything.', rating: 5 },
];

export default function FloatingReviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % floatingTestimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto" style={{ maxWidth: 420, height: 140 }}>
      {floatingTestimonials.map((t, i) => {
        const isActive = i === activeIndex;
        const isPrev  = i === (activeIndex - 1 + floatingTestimonials.length) % floatingTestimonials.length;
        return (
          <div
            key={i}
            className="absolute left-0 right-0 rounded-xl p-5 transition-all ease-out"
            style={{
              transform:        isActive ? 'translateY(0) scale(1)' : isPrev ? 'translateY(20px) scale(0.95)' : 'translateY(40px) scale(0.9)',
              opacity:          isActive ? 1 : isPrev ? 0.4 : 0,
              zIndex:           isActive ? 10 : 1,
              top:              0,
              transitionDuration: '700ms',
              backdropFilter:   'blur(8px)',
              backgroundColor:  'rgba(255,255,255,0.08)',
              border:           '1px solid rgba(255,255,255,0.15)',
              boxShadow:        isActive ? '0 8px 32px rgba(0,0,0,0.3)' : 'none',
            }}
          >
            <div className="flex items-center gap-1 mb-2">
              {[...Array(t.rating)].map((_, j) => (
                <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-sm font-medium line-clamp-2 mb-2" style={{ color: 'rgba(255,255,255,0.95)' }}>&ldquo;{t.text}&rdquo;</p>
            <p className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.6)' }}>— {t.name}</p>
          </div>
        );
      })}
    </div>
  );
}

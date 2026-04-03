'use client';

import { useState } from 'react';

export function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/8 rounded-xl overflow-hidden">
      <button
        className="w-full flex justify-between items-center px-5 py-4 text-left hover:bg-white/3 transition-colors gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-sm leading-snug">{q}</span>
        <svg
          className={`w-4 h-4 text-teal flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-4 text-gray text-sm leading-relaxed border-t border-white/5 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

export function FAQSection({ faqs }) {
  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <FAQItem key={i} q={faq.q} a={faq.a} />
      ))}
    </div>
  );
}

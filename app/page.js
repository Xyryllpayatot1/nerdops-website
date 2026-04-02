'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CybersecurityAuditModal from '@/components/CybersecurityAuditModal';
import { saveLeadToAPI } from '@/lib/leads';

const SERVICES = [
  {
    id: 'managed-it',
    title: 'Managed IT Services',
    tagline: 'Proactive System Oversight',
    desc: 'Continuous monitoring and proactive system care that reduces outages and maintains reliable infrastructure performance.',
    href: '/solutions#managed-it',
  },
  {
    id: 'help-desk',
    title: 'IT Support & Help Desk',
    tagline: 'Responsive Technical Support',
    desc: 'Fast remote IT support that keeps your team productive and systems operating efficiently with structured tracking and clear communication.',
    href: '/solutions#help-desk',
  },
  {
    id: 'cloud',
    title: 'Cloud Server Hosting & Management',
    tagline: 'Secure Cloud Infrastructure',
    desc: 'Strengthen system stability and scalability while protecting your cloud infrastructure through proactive monitoring and optimization.',
    href: '/solutions#cloud',
  },
  {
    id: 'incident-response',
    title: 'Incident Response Services',
    tagline: 'Continuous Monitoring and Protection',
    desc: 'Real-time server monitoring, structured security configuration, and performance optimization that prevents disruptions before they impact operations.',
    href: '/solutions#incident-response',
  },
  {
    id: 'backup',
    title: 'Backup & Disaster Recovery',
    tagline: 'Protect Data and Maintain Continuity',
    desc: 'Automated cloud backups and structured recovery planning that protect critical data and restore operations quickly.',
    href: '/solutions#backup',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & Infrastructure Protection',
    tagline: 'Advanced Protection for Business Systems',
    desc: 'Layered security controls that defend networks, endpoints, and servers through 24/7 monitoring and structured threat response.',
    href: '/solutions#cybersecurity',
  },
];

const TESTIMONIALS = [
  {
    stars: 5,
    text: 'ZERO NERDS is the absolute best IT service around. Very fast response time with a dedicated and educated team. They can solve any issue that occurs, leaving us with less downtime than ever before.',
    name: 'Kate LaMare',
    initials: 'KL',
  },
  {
    stars: 5,
    text: 'Out of all the firms I\'ve hired, and even dedicated techs as employees, nothing compares to the level of expertise and sense of urgency as Daniel and his Team. Amazing Service, Integrity and Knowledge in all aspects of the craft. The patience and ability to break nomenclature down to means that non-technical folks can understand is extremely helpful.',
    name: 'Chris Wilson',
    initials: 'CW',
  },
  {
    stars: 5,
    text: 'The best IT services I have ever encountered. Quick to respond and always resolves any issues we are having. Danny and his team are the best at what they do.',
    name: 'Katelyn',
    initials: 'KT',
  },
  {
    stars: 5,
    text: 'Danny is an incredible IT support. Danny is super knowledgeable and works to get your company to the level you need to be and takes your budget into account. He is also accessible when an IT event happens no matter when. Your IT needs are in good hands with Danny and his team.',
    name: 'Lisa Cook',
    initials: 'LC',
  },
  {
    stars: 5,
    text: 'Danny and his team at ZERO NERDS have been awesome to work with. Their passion and dedication to their craft is very apparent. I look forward to further interactions and collaboration with them.',
    name: 'Robbie Myers',
    initials: 'RM',
  },
  {
    stars: 5,
    text: 'Love working with ZERO NERDS! Quick, efficient, knowledgeable, overall great Team!',
    name: 'Nicole Nelson',
    initials: 'NN',
  },
  {
    stars: 5,
    text: 'Daniel is awesome, so helpful and on top of everything. During our company change over, Daniel was integral in making sure we were set up and running smoothly. He helped me most any time day or night. I cannot say enough about Daniel, and I appreciate him and the whole team at ZERO NERDS!',
    name: 'Robert Moore',
    initials: 'RMO',
  },
  {
    stars: 5,
    text: 'We love ZERO NERDS! Daniel and his team are so helpful!',
    name: 'Laura Brown',
    initials: 'LB',
  },
  {
    stars: 5,
    text: 'Daniel and his team are AWESOME! Professional, friendly, and knowledgeable. Great communication on the status of issues. Any issues I\'ve had have been resolved quickly. Overall, a very positive experience with ZERO NERDS!',
    name: 'Jill Lee',
    initials: 'JL',
  },
  {
    stars: 5,
    text: 'Bridgewell Building Materials has partnered with Danny and ZERO NERDS for the migration of all of our business IT infrastructure and I could not have asked for a better partner. We have completed week one and every day the business is running more efficiently. Thank you Danny and your team for your dedication and hard work in this transition.',
    name: 'David Routt JR',
    initials: 'DR',
  },
  {
    stars: 5,
    text: 'These guys are terrific, responsible, and lovely to work with. We have a difficult house with lots of impediments and they helped us design a working home network, and followed up to help us tweak it. Great group and we will be calling again if we need it. So far everything has worked great since installed!',
    name: 'Laura Capper',
    initials: 'LCA',
  },
  {
    stars: 5,
    text: 'Danny and the team at ZERO NERDS are awesome! I know next to nothing about IT stuff, so having someone knowledgeable is a must when issues come up. The fact that they handled my issues quickly and completely the first time, is a massive bonus! You won\'t go wrong working with the team at ZERO NERDS!',
    name: 'Robert Smart',
    initials: 'RS',
  },
];

const FAQS = [
  {
    q: 'What does an IT support company provide?',
    a: 'An IT support company delivers proactive monitoring, troubleshooting, cybersecurity protection, and infrastructure management to maintain uptime and operational stability.',
  },
  {
    q: 'How do managed IT services reduce downtime?',
    a: 'Managed services include continuous monitoring, system updates, and infrastructure management that prevent outages before they impact productivity.',
  },
  {
    q: 'Do you support small businesses in Portland, OR?',
    a: 'Yes, we provide business IT support and cybersecurity services for growing organizations in Portland, OR, and across the United States.',
  },
  {
    q: 'How does cloud monitoring improve performance?',
    a: 'Cloud monitoring ensures stable cloud infrastructure management, identifies performance issues early, and protects data with high availability configurations.',
  },
  {
    q: 'What is included in disaster recovery solutions?',
    a: 'Our disaster recovery solutions include automated cloud backups, encrypted storage, and structured recovery planning to restore operations quickly.',
  },
  {
    q: 'How quickly can we get started?',
    a: 'After a free IT assessment, we typically have your environment fully onboarded and monitored within 48 hours with no long-term contracts required.',
  },
];

const TICKER_ITEMS = [
  'Managed IT Services', 'Cloud Monitoring', 'Cybersecurity Protection', '24/7 Help Desk',
  'Network Infrastructure', 'Disaster Recovery', 'Microsoft 365 Support', 'Incident Response',
  'Managed IT Services', 'Cloud Monitoring', 'Cybersecurity Protection', '24/7 Help Desk',
  'Network Infrastructure', 'Disaster Recovery', 'Microsoft 365 Support', 'Incident Response',
];

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

function Stars({ n }) {
  return <div className="text-yellow-400 text-sm mb-3">{'★'.repeat(n)}</div>;
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/8 rounded-xl overflow-hidden">
      <button
        className="w-full flex justify-between items-center px-6 py-5 text-left hover:bg-white/3 transition-colors gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-sm leading-snug">{q}</span>
        <svg
          className={`w-4 h-4 text-teal flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-6 pb-5 text-gray text-sm leading-relaxed border-t border-white/5 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

// Sticker heights per image for natural variation
const STICKER_H = { 1: 160, 2: 145, 3: 155, 4: 150, 5: 162, 6: 140, 7: 158, 8: 148 };

// Slight rotation per image for playful sticker feel
const STICKER_ROT = { 1: -2, 2: 1.5, 3: -1, 4: 2.5, 5: 1, 6: -2.5, 7: 2, 8: -1.5 };

// SVG filter — feMorphology dilate expands the alpha channel outward,
// filling inner holes (gaps between arms/body) before drawing the white border.
function StickerFilterDef() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <filter id="sticker-border" x="-15%" y="-15%" width="130%" height="130%">
          {/* Expand every non-transparent pixel outward by 10px — fills inner gaps */}
          <feMorphology in="SourceAlpha" operator="dilate" radius="10" result="dilated" />
          {/* Fill the expanded shape with solid white */}
          <feFlood floodColor="white" floodOpacity="1" result="white" />
          <feComposite in="white" in2="dilated" operator="in" result="whiteBorder" />
          {/* Place white border behind the original image */}
          <feMerge>
            <feMergeNode in="whiteBorder" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

function TeamSticker({ n }) {
  return (
    <div
      className="flex-shrink-0 relative"
      style={{
        width: 'clamp(80px, 18vw, 130px)',
        height: STICKER_H[n] || 150,
        transform: `rotate(${STICKER_ROT[n] || 0}deg)`,
        // SVG filter handles white border + hole-filling; CSS drop-shadow adds depth
        filter: 'url(#sticker-border) drop-shadow(0 6px 20px rgba(0,0,0,0.7))',
      }}
    >
      <img
        src={`/team/team${n}.png`}
        alt="Team member"
        className="w-full h-full object-contain object-bottom"
      />
    </div>
  );
}

function MobileStickyCTA({ show, onQuoteClick }) {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${show ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="bg-navy2/95 backdrop-blur-md border-t border-white/10 p-3 flex gap-2">
        <a
          href="tel:+15033137121"
          className="flex-1 bg-teal hover:bg-teal/90 text-white font-bold py-3 rounded-lg text-sm inline-flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          Get Instant Help
        </a>
        <button
          onClick={onQuoteClick}
          className="flex-1 border border-teal/50 text-teal font-bold py-3 rounded-lg text-sm inline-flex items-center justify-center"
        >
          Get Free Quote
        </button>
      </div>
    </div>
  );
}

function FloatingReviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const floatingTestimonials = [
    {
      name: 'Kate LaMare',
      text: 'ZERO NERDS is the absolute best IT service around. Very fast response time!',
      rating: 5,
    },
    {
      name: 'Chris Wilson',
      text: 'Amazing service, integrity, and knowledge. Nothing compares to this team.',
      rating: 5,
    },
    {
      name: 'Katelyn',
      text: 'The best IT services I have ever encountered. Quick to respond!',
      rating: 5,
    },
    {
      name: 'Robert Moore',
      text: 'Daniel is awesome, so helpful and on top of everything.',
      rating: 5,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % floatingTestimonials.length);
        setIsAnimating(false);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto" style={{ maxWidth: 420, height: 140 }}>
      {floatingTestimonials.map((t, i) => {
        const isActive = i === activeIndex;
        const isPrev = i === (activeIndex - 1 + floatingTestimonials.length) % floatingTestimonials.length;
        
        return (
          <div
            key={i}
            className="absolute left-0 right-0 rounded-xl p-5 transition-all ease-out"
            style={{
              transform: isActive 
                ? 'translateY(0) scale(1)' 
                : isPrev 
                  ? 'translateY(20px) scale(0.95)' 
                  : 'translateY(40px) scale(0.9)',
              opacity: isActive ? 1 : isPrev ? 0.4 : 0,
              zIndex: isActive ? 10 : 1,
              top: 0,
              transitionDuration: '700ms',
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: isActive ? '0 8px 32px rgba(0,0,0,0.3)' : 'none',
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

function WizardModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [textAnswer, setTextAnswer] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [checkbox, setCheckbox] = useState(false);

  const STEPS = [
    {
      id: 1,
      title: 'What is the main issue with your computer?',
      options: ['Network issues', 'Slow performance', 'Virus or malware', 'System error', 'Hardware repair', 'Software installation', 'Troubleshooting needed'],
    },
    {
      id: 2,
      title: 'Is your computer a PC or a Mac (Apple)?',
      options: ['PC / Windows', 'Mac / Apple', 'Linux', 'Multiple devices'],
    },
    {
      id: 3,
      title: 'Is your computer a desktop or laptop?',
      options: ['Desktop', 'Laptop', 'Server', 'Multiple devices'],
    },
    {
      id: 4,
      title: 'Confirm some details',
      isSummary: true,
    },
    {
      id: 5,
      title: 'Where will the work be done?',
      options: ["At the pro's location", 'My home', 'Venue / Office', 'Remotely'],
    },
    {
      id: 6,
      title: 'When do you need this job to start?',
      options: ["I haven't decided yet", 'Within 24 hours', 'In the next few days', 'This week', 'This month', 'Flexible'],
      hasCheckbox: true,
    },
    {
      id: 7,
      title: 'Send a message to the pro',
      isText: true,
      placeholder: 'Describe your issue in more detail...',
    },
    {
      id: 8,
      title: 'Review the zip and add your contact info',
      isContact: true,
    },
  ];

  const totalSteps = STEPS.length;
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
  const currentStepData = STEPS[currentStep - 1];

  const handleSelect = (option) => {
    setAnswers({ ...answers, [currentStep]: option });
    setTimeout(() => {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }, 300);
  };

  const handleSubmit = async () => {
    await saveLeadToAPI({
      formType: 'wizard',
      firstName,
      lastName,
      email,
      phone,
      zipCode: '97205',
      mainIssue: answers[1],
      computerType: answers[2],
      deviceType: answers[3],
      workLocation: answers[5],
      startTime: answers[6],
      message: textAnswer,
    });
    onClose();
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const isAnswered = currentStepData.isText ? true :
                     currentStepData.isSummary ? true :
                     currentStepData.isContact ? (firstName.trim() && lastName.trim()) :
                     answers[currentStep];

  const showSkipBtn = !currentStepData.isSummary && !currentStepData.isContact;
  const isLastStep = currentStep === totalSteps;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div 
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress Bar */}
        <div className="h-1 bg-gray-200 sticky top-0 z-10">
          <div className="h-full bg-teal transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between z-10">
          <button
            onClick={handleBack}
            className="p-2 -ml-2"
            style={{ color: currentStep > 1 ? '#374151' : '#d1d5db' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-sm" style={{ color: '#6b7280' }}>Step {currentStep} of {totalSteps}</span>
          <button onClick={onClose} className="p-2 -mr-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2" style={{ color: '#111827' }}>{currentStepData.title}</h2>
          <a href="/get-started" className="text-sm mb-6 inline-block" style={{ color: '#0099CC' }}>Change search</a>

          {/* Radio Options */}
          {!currentStepData.isSummary && !currentStepData.isText && !currentStepData.isContact && (
            <div className="flex flex-col gap-3 mb-6">
              {currentStepData.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="flex items-center gap-4 p-4 rounded-xl text-left transition-all"
                  style={{
                    border: `1.5px solid ${answers[currentStep] === option ? '#0099CC' : '#e5e7eb'}`,
                    background: answers[currentStep] === option ? '#f0f9ff' : '#fff',
                  }}
                >
                  <div 
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      border: `2px solid ${answers[currentStep] === option ? '#0099CC' : '#d1d5db'}`,
                      background: answers[currentStep] === option ? '#0099CC' : '#fff',
                    }}
                  >
                    {answers[currentStep] === option && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-base font-medium" style={{ color: '#111827' }}>{option}</span>
                </button>
              ))}
            </div>
          )}

          {/* Summary */}
          {currentStepData.isSummary && (
            <div className="bg-gray-50 rounded-xl p-5 mb-6">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between pb-3 border-b border-gray-200">
                  <span className="text-sm" style={{ color: '#6b7280' }}>Zip code</span>
                  <span className="text-sm font-semibold" style={{ color: '#111827' }}>97205</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-gray-200">
                  <span className="text-sm" style={{ color: '#6b7280' }}>Main issue</span>
                  <span className="text-sm font-semibold" style={{ color: '#111827' }}>{answers[1] || 'Not selected'}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-gray-200">
                  <span className="text-sm" style={{ color: '#6b7280' }}>Computer type</span>
                  <span className="text-sm font-semibold" style={{ color: '#111827' }}>{answers[2] || 'Not selected'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: '#6b7280' }}>Device type</span>
                  <span className="text-sm font-semibold" style={{ color: '#111827' }}>{answers[3] || 'Not selected'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Checkbox */}
          {currentStepData.hasCheckbox && (
            <label className="flex items-start gap-3 mb-6 cursor-pointer">
              <input
                type="checkbox"
                checked={checkbox}
                onChange={(e) => setCheckbox(e.target.checked)}
                className="w-5 h-5 mt-0.5 cursor-pointer accent-teal"
              />
              <span className="text-sm" style={{ color: '#374151' }}>
                I can work with the pro&apos;s schedule if they aren&apos;t available at the time I chose
              </span>
            </label>
          )}

          {/* Textarea */}
          {currentStepData.isText && (
            <textarea
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              placeholder={currentStepData.placeholder}
              className="w-full min-h-32 p-4 rounded-xl text-base outline-none mb-6"
              style={{ border: '1.5px solid #9ca3af', color: '#111827' }}
            />
          )}

          {/* Contact Form */}
          {currentStepData.isContact && (
            <div className="mb-6">
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2" style={{ color: '#374151' }}>Zip code</label>
                <input
                  type="text"
                  defaultValue="97205"
                  className="w-full p-4 rounded-xl text-base outline-none"
                  style={{ border: '1.5px solid #9ca3af', color: '#111827' }}
                />
              </div>
              <div className="flex gap-3 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#374151' }}>First name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className="w-full p-4 rounded-xl text-base outline-none"
                    style={{ border: '1.5px solid #9ca3af', color: '#111827' }}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#374151' }}>Last name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="w-full p-4 rounded-xl text-base outline-none"
                    style={{ border: '1.5px solid #9ca3af', color: '#111827' }}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2" style={{ color: '#374151' }}>Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full p-4 rounded-xl text-base outline-none"
                  style={{ border: '1.5px solid #9ca3af', color: '#111827' }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#374151' }}>Phone number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(503) 000-0000"
                  className="w-full p-4 rounded-xl text-base outline-none"
                  style={{ border: '1.5px solid #9ca3af', color: '#111827' }}
                />
              </div>
            </div>
          )}

          {/* Buttons */}
          {(!currentStepData.options) && (
            <div className="flex gap-3">
              {showSkipBtn && (
                <button
                  onClick={handleSkip}
                  className="flex-1 p-4 rounded-xl text-base font-semibold border transition-all"
                  style={{ borderColor: '#d1d5db', color: '#374151' }}
                >
                  Skip
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!isAnswered}
                className="flex-1 p-4 rounded-xl text-base font-semibold border-none transition-all"
                style={{
                  background: isAnswered ? '#0099CC' : '#9ca3af',
                  color: '#fff',
                  cursor: isAnswered ? 'pointer' : 'not-allowed',
                }}
              >
                {isLastStep ? 'Submit' : 'Next'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  useReveal();

  const [stickyVisible, setStickyVisible] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);
  
  useEffect(() => {
    const hero = document.getElementById('hero-section');
    if (!hero) return;
    const obs = new IntersectionObserver(([e]) => setStickyVisible(!e.isIntersecting), { threshold: 0 });
    obs.observe(hero);
    
    const handleOpenWizard = () => setWizardOpen(true);
    window.addEventListener('openWizard', handleOpenWizard);
    
    return () => {
      obs.disconnect();
      window.removeEventListener('openWizard', handleOpenWizard);
    };
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section id="hero-section" className="relative min-h-screen flex items-center justify-center text-center px-5 pt-8 pb-8 overflow-hidden bg-navy2">
        <div className="absolute inset-0 hero-grid-bg opacity-80 pointer-events-none" />
        <div
          className="absolute pointer-events-none"
          style={{
            width: 700, height: 700,
            background: 'radial-gradient(circle, rgba(53,178,159,.15) 0%, transparent 70%)',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1
            className="animate-fade-in-up-1 font-serif font-bold leading-[1.08] mb-6"
            style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5.2rem)' }}
          >
            <span className="grad-text"><span style={{ fontSize: '80%' }}>Near Zero Downtime.</span></span>
            <br />
            Your Team of Nerds
            <br />
            24/7/365
          </h1>

          <p
            className="animate-fade-in-up-2 text-gray leading-relaxed mx-auto mb-8"
            style={{ fontSize: 'clamp(.95rem, 2vw, 1.15rem)', maxWidth: 560 }}
          >
            We provide proactive IT services, cloud management, and cybersecurity that reduce downtime
            and protect your systems from disruption.
          </p>

          <div className="animate-fade-in-up-3 flex flex-wrap gap-3 justify-center mb-12">
            <a
              href="tel:+15033137121"
              className="bg-teal hover:bg-teal/90 text-white font-bold px-8 py-3.5 rounded-lg transition-all duration-200 shadow-lg shadow-teal/25 text-sm tracking-wide inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Get Instant Help
            </a>
            <button
              onClick={() => setWizardOpen(true)}
              className="border border-teal/50 text-cyan hover:border-teal hover:bg-teal/8 font-bold px-8 py-3.5 rounded-lg transition-all duration-200 text-sm tracking-wide"
            >
              Get Free Quote
            </button>
          </div>

          {/* Floating Reviews */}
          <FloatingReviews />

          {/* Google Rating */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-white/90 text-sm font-medium">Google Rating</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-white font-bold text-lg">4.8</span>
          </div>

        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker-wrap py-3 overflow-hidden" style={{ background: 'linear-gradient(90deg,#1e5fa0,#29abe2)' }}>
        <div className="ticker-inner">
          {TICKER_ITEMS.map((item, i) => (
            <span key={i} className="text-white text-xs font-semibold tracking-widest uppercase opacity-90">
              {item}<span className="mx-4 opacity-40">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── TEAM FACES ── */}
      <section className="bg-navy2 pt-16">
        <StickerFilterDef />
        <div className="max-w-5xl mx-auto text-center mb-10 px-5">
          <span className="section-label block text-center">Meet the Team</span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold mt-2">The People Behind Your IT</h2>
          <p className="text-gray text-sm mt-3 leading-relaxed max-w-sm mx-auto">Real people. Real expertise. Ready when you need us.</p>
        </div>

        {/* Scrolling row 1 — left
            Outer div is taller (+ 24px padding top/bottom) so overflow:hidden
            doesn't clip the white drop-shadow sticker border */}
        <div className="relative overflow-hidden mb-4" style={{ height: 'calc(clamp(120px, 22vw, 180px) + 24px)' }}>
          <div
            className="flex items-end gap-4 md:gap-8 absolute bottom-0"
            style={{ animation: 'teamScrollL 30s linear infinite', width: 'max-content', paddingTop: 14, paddingBottom: 14 }}
          >
            {[0,1,2,3].flatMap((set) =>
              [1,2,3,4].map((n) => (
                <TeamSticker key={`r1-${set}-${n}`} n={n} />
              ))
            )}
          </div>
          <div className="absolute inset-y-0 left-0 w-20 md:w-32 pointer-events-none z-10" style={{ background: 'linear-gradient(to right,#0d1530 40%,transparent)' }} />
          <div className="absolute inset-y-0 right-0 w-20 md:w-32 pointer-events-none z-10" style={{ background: 'linear-gradient(to left,#0d1530 40%,transparent)' }} />
        </div>

        {/* Scrolling row 2 — right */}
        <div className="relative overflow-hidden mb-8" style={{ height: 'calc(clamp(120px, 22vw, 180px) + 24px)' }}>
          <div
            className="flex items-end gap-4 md:gap-8 absolute bottom-0"
            style={{ animation: 'teamScrollR 36s linear infinite', width: 'max-content', paddingTop: 14, paddingBottom: 14 }}
          >
            {[0,1,2,3].flatMap((set) =>
              [5,6,7,8].map((n) => (
                <TeamSticker key={`r2-${set}-${n}`} n={n} />
              ))
            )}
          </div>
          <div className="absolute inset-y-0 left-0 w-20 md:w-32 pointer-events-none z-10" style={{ background: 'linear-gradient(to right,#0d1530 40%,transparent)' }} />
          <div className="absolute inset-y-0 right-0 w-20 md:w-32 pointer-events-none z-10" style={{ background: 'linear-gradient(to left,#0d1530 40%,transparent)' }} />
        </div>

        {/* CTA */}
        <div className="text-center pb-10 px-5">
          <a
            href="tel:+15033137121"
            className="inline-flex items-center justify-center gap-3 bg-teal hover:bg-teal/90 text-white font-bold text-base md:text-lg px-10 md:px-14 py-4 md:py-5 rounded-xl transition-all shadow-xl shadow-teal/25 w-full max-w-lg"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Get Instant Help
          </a>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="bg-navy py-24 px-5">
        <div className="max-w-3xl mx-auto">
          <div className="reveal">
            <span className="section-label">Who We Are</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold leading-tight mt-3 mb-5">
              A Reliable IT Support Company in Portland, OR and Surrounding Areas
            </h2>
            <p className="text-gray text-sm leading-relaxed mb-8">
              We are a trusted IT support company with 11 years of experience serving businesses in Portland, OR and nationwide. ZERO NERDS delivers proactive managed IT, cybersecurity protection, and 24/7 infrastructure monitoring that keep systems stable, secure, and running without interruption.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/about" className="inline-block bg-teal hover:bg-teal/90 text-white font-bold px-7 py-3 rounded-lg transition-all text-sm">
                Get To Know Us
              </Link>
              <button
                onClick={() => {
                  const event = new CustomEvent('openWizard');
                  window.dispatchEvent(event);
                }}
                className="border border-teal/50 text-cyan hover:border-teal hover:bg-teal/8 font-bold px-8 py-3.5 rounded-lg transition-all duration-200 text-sm tracking-wide inline-block"
              >
                Get Free Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="bg-[#0f1d38] py-20 px-5" id="services">
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-14 max-w-2xl mx-auto">
            <span className="section-label">Our Solutions</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Dependable IT That Delivers
            </h2>
            <p className="text-gray text-sm leading-relaxed">
              Technology built for reliability and growth. Six core service areas
              designed to keep your business running without interruption.
            </p>
          </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
            {SERVICES.map((s) => (
              <Link
                key={s.id}
                href={s.href}
                className="reveal card-bar relative bg-navy border border-white/6 rounded-xl overflow-hidden hover:border-teal/30 hover:shadow-xl hover:shadow-black/20 transition-all duration-300 group flex flex-col"
              >
                <div className="bg-gradient-to-r from-amber-400 to-teal h-[3px]" />
                <div className="p-4 md:p-7 flex flex-col flex-1">
                  <span className="text-amber-400 text-[10px] md:text-xs font-bold uppercase tracking-widest block mb-2 group-hover:text-amber-300 transition-colors">{s.tagline}</span>
                  <h3 className="font-serif font-bold text-sm md:text-base mb-2 md:mb-3 text-white leading-snug">{s.title}</h3>
                  <p className="text-gray text-xs md:text-sm leading-relaxed flex-1 hidden sm:block">{s.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-teal text-xs font-bold tracking-wide uppercase">
                    Learn More
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="reveal text-center mt-10">
            <Link href="/solutions" className="border border-teal/40 text-teal hover:bg-teal hover:text-white font-bold px-8 py-3 rounded-lg transition-all duration-200 text-sm">
              View All Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-navy2 py-20 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-14 max-w-xl mx-auto">
            <span className="section-label">Client Reviews</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
              What Our Clients Say
            </h2>
            <p className="text-gray text-sm">Verified reviews from businesses across Portland, OR and surrounding areas.</p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="reveal break-inside-avoid mb-4 bg-navy border border-white/6 rounded-xl p-6 relative overflow-hidden">
                <span
                  className="absolute top-3 right-4 text-white/5 font-serif select-none pointer-events-none leading-none"
                  style={{ fontSize: '5rem' }}
                >
                  &ldquo;
                </span>
                <Stars n={t.stars} />
                <p className="text-gray text-sm leading-relaxed mb-5 relative z-10">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,#29abe2,#1e5fa0)' }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-gray/60 text-xs">via Google Reviews</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-navy py-20 px-5">
        <div className="max-w-3xl mx-auto">
          <div className="reveal text-center mb-12">
            <span className="section-label">FAQ</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-gray text-sm">Common questions about our IT services and how we work.</p>
          </div>
          <div className="reveal space-y-2">
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section
        className="py-24 px-5 text-center"
        style={{ background: 'linear-gradient(135deg,#091a33,#0d1530,#0a1828)' }}
      >
        <div className="reveal max-w-2xl mx-auto">
          <span className="section-label block text-center mb-4">Get Started</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-5 leading-tight">
            Identify Vulnerabilities Before<br />They Cause Downtime
          </h2>
          <p className="text-gray text-sm leading-relaxed mb-9 max-w-md mx-auto">
            Secure your Free Cyber Security Audit today. No commitment, no sales pressure —
            just clear, honest advice from a team that has been doing this for 11 years.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setAuditOpen(true)}
              className="bg-teal hover:bg-teal/90 text-white font-bold px-8 py-3.5 rounded-lg transition-all shadow-lg shadow-teal/20 text-sm tracking-wide"
            >
              Claim Your Free Cyber Security Audit
            </button>
            <a
              href="tel:+15033137121"
              className="border border-teal/40 text-cyan hover:border-teal hover:bg-teal/8 font-bold px-8 py-3.5 rounded-lg transition-all text-sm tracking-wide"
            >
              Call Us — (503) 313-7121
            </a>
          </div>
        </div>
      </section>

      <MobileStickyCTA show={stickyVisible} onQuoteClick={() => setWizardOpen(true)} />
      <WizardModal isOpen={wizardOpen} onClose={() => setWizardOpen(false)} />
      <CybersecurityAuditModal isOpen={auditOpen} onClose={() => setAuditOpen(false)} />
    </>
  );
}

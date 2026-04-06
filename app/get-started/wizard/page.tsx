'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { saveLeadToAPI, validators, formatPhone, trackEvent } from '@/lib/leads';

const STEPS = [
  {
    id: 1,
    title: 'What is the main issue with your computer?',
    options: [
      'Network issues',
      'Slow performance',
      'Virus or malware',
      'System error',
      'Hardware repair',
      'Software installation',
      'Troubleshooting needed',
    ],
  },
  {
    id: 2,
    title: 'Is your computer a PC or a Mac (Apple)?',
    options: [
      'PC / Windows',
      'Mac / Apple',
      'Linux',
      'Multiple devices',
    ],
  },
  {
    id: 3,
    title: 'Is your computer a desktop or laptop?',
    options: [
      'Desktop',
      'Laptop',
      'Server',
      'Multiple devices',
    ],
  },
  {
    id: 4,
    title: 'Confirm some details',
    isSummary: true,
  },
  {
    id: 5,
    title: 'Where will the work be done?',
    options: [
      "At the pro's location",
      'My home',
      'Venue / Office',
      'Remotely',
    ],
  },
  {
    id: 6,
    title: 'When do you need this job to start?',
    options: [
      "I haven't decided yet",
      'Within 24 hours',
      'In the next few days',
      'This week',
      'This month',
      'Flexible',
    ],
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

export default function WizardPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [textAnswer, setTextAnswer] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    }, 500);
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

  const validateContactStep = () => {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    
    const emailError = validators.email(email);
    if (emailError) newErrors.email = emailError;
    
    const phoneError = validators.phone(phone);
    if (phoneError) newErrors.phone = phoneError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    trackEvent('form_submitted', { formType: 'wizard', step: currentStep });
    
    try {
      const leadData = {
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
      };
      await saveLeadToAPI(leadData);
      trackEvent('form_completed', { formType: 'wizard' });
      router.push('/get-started/results');
    } catch (error) {
      setSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentStep === 8 && !validateContactStep()) {
      return;
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const isAnswered = currentStepData.isText ? true :
                     currentStepData.isSummary ? true :
                     currentStepData.isContact ? (email.trim() && phone.trim() && firstName.trim() && lastName.trim()) :
                     answers[currentStep];

  const showSkipBtn = !currentStepData.isSummary && !currentStepData.isContact;
  const isLastStep = currentStep === totalSteps;

  return (
    <>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
      <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      {/* Progress Bar */}
      <div 
        role="progressbar" 
        aria-valuenow={currentStep} 
        aria-valuemin={1} 
        aria-valuemax={totalSteps}
        aria-label={`Step ${currentStep} of ${totalSteps}`}
        style={{ height: 4, backgroundColor: '#e5e7eb', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}
      >
        <div style={{ height: '100%', backgroundColor: '#0099CC', width: `${progress}%`, transition: 'width 0.3s ease' }} />
      </div>

      {/* Progress Dots - Screen Reader Only */}
      <div className="sr-only" aria-live="polite">
        Step {currentStep} of {totalSteps}: {currentStepData.title}
      </div>

      {/* Header */}
      <header style={{ position: 'sticky', top: 0, backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 50 }}>
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          aria-label={currentStep > 1 ? `Go back to step ${currentStep - 1}` : 'First step, cannot go back'}
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: currentStep > 1 ? 'pointer' : 'not-allowed', 
            padding: 8, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 4,
            color: currentStep > 1 ? '#374151' : '#d1d5db',
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {currentStep > 1 && 'Previous'}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: '#6b7280' }}>Step {currentStep} of {totalSteps}</span>
        </div>
        <Link 
          href="/get-started" 
          aria-label="Close and return to previous page"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', alignItems: 'center', color: '#374151' }}
        >
          <svg style={{ width: 24, height: 24 }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Link>
      </header>

      {/* Content */}
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '32px 20px' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 8, lineHeight: 1.4 }}>
          {currentStepData.title}
        </h1>

        {/* Change search link */}
        <Link href="/get-started" style={{ fontSize: 14, color: '#0099CC', textDecoration: 'none', display: 'inline-block', marginBottom: 24 }}>
          Change search
        </Link>

        {/* STEP 1-3, 5-6: Radio Options */}
        {!currentStepData.isSummary && !currentStepData.isText && !currentStepData.isContact && (
          <div 
            role="radiogroup" 
            aria-labelledby="step-question"
            style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}
          >
            <h2 id="step-question" className="sr-only">{currentStepData.title}</h2>
            {currentStepData.options.map((option, index) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                role="radio"
                aria-checked={answers[currentStep] === option}
                aria-label={option}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(option);
                  }
                  if (e.key === 'ArrowDown' && index < currentStepData.options.length - 1) {
                    e.preventDefault();
                    const buttons = e.currentTarget.parentElement.querySelectorAll('button');
                    buttons[index + 1]?.focus();
                  }
                  if (e.key === 'ArrowUp' && index > 0) {
                    e.preventDefault();
                    const buttons = e.currentTarget.parentElement.querySelectorAll('button');
                    buttons[index - 1]?.focus();
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '18px 20px',
                  border: `1.5px solid ${answers[currentStep] === option ? '#0099CC' : '#e5e7eb'}`,
                  borderRadius: 12,
                  background: answers[currentStep] === option ? '#f0f9ff' : '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                  outline: 'none',
                }}
              >
                <div 
                  aria-hidden="true"
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    border: `2px solid ${answers[currentStep] === option ? '#0099CC' : '#d1d5db'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    background: answers[currentStep] === option ? '#0099CC' : '#fff',
                  }}
                >
                  {answers[currentStep] === option && (
                    <svg style={{ width: 12, height: 12, color: '#fff' }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span style={{ fontSize: 16, fontWeight: 500, color: '#111827' }}>{option}</span>
              </button>
            ))}
          </div>
        )}

        {/* STEP 4: Summary */}
        {currentStepData.isSummary && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ background: '#f9fafb', borderRadius: 12, padding: 20, marginBottom: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid #e5e7eb' }}>
                  <span style={{ color: '#6b7280', fontSize: 14 }}>Zip code</span>
                  <span style={{ color: '#111827', fontSize: 14, fontWeight: 600 }}>97205</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid #e5e7eb' }}>
                  <span style={{ color: '#6b7280', fontSize: 14 }}>Main issue</span>
                  <span style={{ color: '#111827', fontSize: 14, fontWeight: 600 }}>{answers[1] || 'Not selected'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid #e5e7eb' }}>
                  <span style={{ color: '#6b7280', fontSize: 14 }}>Computer type</span>
                  <span style={{ color: '#111827', fontSize: 14, fontWeight: 600 }}>{answers[2] || 'Not selected'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280', fontSize: 14 }}>Device type</span>
                  <span style={{ color: '#111827', fontSize: 14, fontWeight: 600 }}>{answers[3] || 'Not selected'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Checkbox */}
        {currentStepData.hasCheckbox && (
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={checkbox}
                onChange={(e) => setCheckbox(e.target.checked)}
                style={{ width: 20, height: 20, marginTop: 2, cursor: 'pointer', accentColor: '#0099CC' }}
              />
              <span style={{ fontSize: 14, color: '#374151', lineHeight: 1.5 }}>
                I can work with the pro&apos;s schedule if they aren&apos;t available at the time I chose
              </span>
            </label>
          </div>
        )}

        {/* STEP 7: Textarea */}
        {currentStepData.isText && (
          <div style={{ marginBottom: 24 }}>
            <label htmlFor="message-input" className="sr-only">
              {currentStepData.title}
            </label>
            <textarea
              id="message-input"
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              placeholder={currentStepData.placeholder}
              aria-describedby="message-hint"
              style={{
                width: '100%',
                minHeight: 150,
                padding: '16px',
                border: '1.5px solid #9ca3af',
                borderRadius: 12,
                fontSize: 16,
                fontFamily: 'inherit',
                resize: 'vertical',
                outline: 'none',
                boxSizing: 'border-box',
                color: '#111827',
              }}
            />
            <p id="message-hint" className="sr-only">You can describe your issue in detail or skip this step</p>
          </div>
        )}

        {/* STEP 8: Contact Info */}
        {currentStepData.isContact && (
          <form 
            id="contact-form"
            onSubmit={(e) => { e.preventDefault(); handleNext(); }} 
            style={{ marginBottom: 24 }}
            aria-labelledby="contact-form-title"
          >
            <h2 id="contact-form-title" className="sr-only">Contact Information</h2>
            
            {/* Zip code */}
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="zip-code" style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
                Zip code
              </label>
              <input
                id="zip-code"
                type="text"
                defaultValue="97205"
                aria-readonly="true"
                style={{
                  width: '100%',
                  padding: '16px',
                  border: '1.5px solid #9ca3af',
                  borderRadius: 12,
                  fontSize: 16,
                  outline: 'none',
                  boxSizing: 'border-box',
                  color: '#111827',
                }}
              />
            </div>

            {/* Name */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="first-name" style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
                  First name <span style={{ color: '#ef4444' }} aria-label="required">*</span>
                </label>
                <input
                  id="first-name"
                  type="text"
                  value={firstName}
                  onChange={(e) => { setFirstName(e.target.value); setErrors({...errors, firstName: null}); }}
                  placeholder="John"
                  aria-required="true"
                  aria-invalid={!!errors.firstName}
                  aria-describedby={errors.firstName ? 'first-name-error' : undefined}
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: `1.5px solid ${errors.firstName ? '#ef4444' : '#9ca3af'}`,
                    borderRadius: 12,
                    fontSize: 16,
                    outline: 'none',
                    boxSizing: 'border-box',
                    color: '#111827',
                  }}
                />
                {errors.firstName && <p id="first-name-error" role="alert" style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.firstName}</p>}
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="last-name" style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
                  Last name <span style={{ color: '#ef4444' }} aria-label="required">*</span>
                </label>
                <input
                  id="last-name"
                  type="text"
                  value={lastName}
                  onChange={(e) => { setLastName(e.target.value); setErrors({...errors, lastName: null}); }}
                  placeholder="Doe"
                  aria-required="true"
                  aria-invalid={!!errors.lastName}
                  aria-describedby={errors.lastName ? 'last-name-error' : undefined}
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: `1.5px solid ${errors.lastName ? '#ef4444' : '#9ca3af'}`,
                    borderRadius: 12,
                    fontSize: 16,
                    outline: 'none',
                    boxSizing: 'border-box',
                    color: '#111827',
                  }}
                />
                {errors.lastName && <p id="last-name-error" role="alert" style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.lastName}</p>}
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="email" style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
                Email address <span style={{ color: '#ef4444' }} aria-label="required">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors({...errors, email: null}); }}
                placeholder="your@email.com"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                style={{
                  width: '100%',
                  padding: '16px',
                  border: `1.5px solid ${errors.email ? '#ef4444' : '#9ca3af'}`,
                  borderRadius: 12,
                  fontSize: 16,
                  outline: 'none',
                  boxSizing: 'border-box',
                  color: '#111827',
                }}
              />
              {errors.email && <p id="email-error" role="alert" style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
                Phone number <span style={{ color: '#ef4444' }} aria-label="required">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => { setPhone(formatPhone(e.target.value)); setErrors({...errors, phone: null}); }}
                placeholder="(503) 000-0000"
                aria-required="true"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                style={{
                  width: '100%',
                  padding: '16px',
                  border: `1.5px solid ${errors.phone ? '#ef4444' : '#9ca3af'}`,
                  borderRadius: 12,
                  fontSize: 16,
                  outline: 'none',
                  boxSizing: 'border-box',
                  color: '#111827',
                }}
              />
              {errors.phone && <p id="phone-error" role="alert" style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.phone}</p>}
            </div>
          </form>
        )}

        {/* Buttons */}
        {(!currentStepData.options) && (
          <div style={{ display: 'flex', gap: 12 }} role="group" aria-label="Form actions">
            {showSkipBtn && (
              <button
                type="button"
                onClick={handleSkip}
                disabled={submitting}
                aria-label="Skip this step"
                style={{
                  flex: 1,
                  padding: '16px 24px',
                  border: '1.5px solid #d1d5db',
                  borderRadius: 10,
                  background: '#fff',
                  color: '#374151',
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  opacity: submitting ? 0.6 : 1,
                }}
              >
                Skip
              </button>
            )}
            <button
              type="submit"
              form="contact-form"
              onClick={currentStepData.isContact ? undefined : handleNext}
              disabled={!isAnswered || submitting}
              aria-label={submitting ? 'Submitting form, please wait' : isLastStep ? 'Submit form' : 'Continue to next step'}
              style={{
                flex: showSkipBtn ? 1 : 2,
                padding: '16px 24px',
                border: 'none',
                borderRadius: 10,
                background: isAnswered ? '#0099CC' : '#9ca3af',
                color: '#fff',
                fontSize: 16,
                fontWeight: 600,
                cursor: isAnswered && !submitting ? 'pointer' : 'not-allowed',
                boxShadow: isAnswered ? '0 2px 8px rgba(0,153,204,0.3)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              {submitting ? (
                <>
                  <svg style={{ animation: 'spin 1s linear infinite', width: 20, height: 20 }} fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                isLastStep ? 'Submit' : 'Next'
              )}
            </button>
          </div>
        )}
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden" style={{ background: '#fff', borderTop: '1px solid #e5e7eb' }}>
        <div className="flex gap-2 p-3">
          <a href="tel:+15033137121" className="flex-1 bg-teal hover:bg-teal/90 text-white font-bold py-3 rounded-lg text-sm inline-flex items-center justify-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Get Instant Help
          </a>
          <Link href="/get-started/wizard" className="flex-1 border border-teal text-teal font-bold py-3 rounded-lg text-sm inline-flex items-center justify-center">
            Get Free Quote
          </Link>
        </div>
      </div>
      </div>
    </>
  );
}

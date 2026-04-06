'use client';

import { useState } from 'react';
import { saveLeadToAPI, validators, formatPhone, Toast, trackEvent } from '@/lib/leads';

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

interface WizardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WizardModal({ isOpen, onClose }: WizardModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [textAnswer, setTextAnswer] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: string; id: number } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
  const currentStepData = STEPS[currentStep - 1];

  const showToast = (message: string, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 4000);
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
    setSubmitError(null);

    trackEvent('form_submitted', { formType: 'wizard', step: currentStep });

    try {
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

      trackEvent('form_completed', { formType: 'wizard' });
      showToast('Thank you! We will be in touch soon.', 'success');
      setTimeout(() => onClose(), 1500);
    } catch {
      setSubmitError('Something went wrong. Please try again.');
      showToast('Failed to submit. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSelect = (option: string) => {
    setAnswers((prev) => ({ ...prev, [currentStep]: option }));
    setTimeout(() => {
      setCurrentStep((prev) => {
        if (prev < totalSteps) return prev + 1;
        return prev;
      });
      if (currentStep >= totalSteps) handleSubmit();
    }, 300);
  };

  const handleNext = () => {
    if (currentStep === 8 && !validateContactStep()) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSkip = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const isAnswered = currentStepData.isText ? true
    : currentStepData.isSummary ? true
    : currentStepData.isContact ? (firstName.trim() && lastName.trim() && email.trim() && phone.trim())
    : answers[currentStep];

  const showSkipBtn = !currentStepData.isSummary && !currentStepData.isContact;
  const isLastStep = currentStep === totalSteps;

  if (!isOpen) return null;

  return (
    <>
      <Toast toast={toast} />
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
                {currentStepData.options?.map((option) => (
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
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#374151' }}>First name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => { setFirstName(e.target.value); setErrors({ ...errors, firstName: '' }); }}
                      placeholder="John"
                      className="w-full p-4 rounded-xl text-base outline-none"
                      style={{ border: `1.5px solid ${errors.firstName ? '#ef4444' : '#9ca3af'}`, color: '#111827' }}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#374151' }}>Last name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => { setLastName(e.target.value); setErrors({ ...errors, lastName: '' }); }}
                      placeholder="Doe"
                      className="w-full p-4 rounded-xl text-base outline-none"
                      style={{ border: `1.5px solid ${errors.lastName ? '#ef4444' : '#9ca3af'}`, color: '#111827' }}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#374151' }}>Email address <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: '' }); }}
                    placeholder="your@email.com"
                    className="w-full p-4 rounded-xl text-base outline-none"
                    style={{ border: `1.5px solid ${errors.email ? '#ef4444' : '#9ca3af'}`, color: '#111827' }}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#374151' }}>Phone number <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => { setPhone(formatPhone(e.target.value)); setErrors({ ...errors, phone: '' }); }}
                    placeholder="(503) 000-0000"
                    className="w-full p-4 rounded-xl text-base outline-none"
                    style={{ border: `1.5px solid ${errors.phone ? '#ef4444' : '#9ca3af'}`, color: '#111827' }}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
            )}

            {/* Buttons */}
            {!currentStepData.options && (
              <div className="flex gap-3">
                {showSkipBtn && (
                  <button
                    onClick={handleSkip}
                    disabled={submitting}
                    className="flex-1 p-4 rounded-xl text-base font-semibold border transition-all"
                    style={{ borderColor: '#d1d5db', color: '#374151', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.6 : 1 }}
                  >
                    Skip
                  </button>
                )}
                <button
                  onClick={handleNext}
                  disabled={!isAnswered || submitting}
                  className="flex-1 p-4 rounded-xl text-base font-semibold border-none transition-all flex items-center justify-center gap-2"
                  style={{
                    background: isAnswered ? '#0099CC' : '#9ca3af',
                    color: '#fff',
                    cursor: isAnswered && !submitting ? 'pointer' : 'not-allowed',
                  }}
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    isLastStep ? 'Submit' : 'Next'
                  )}
                </button>
              </div>
            )}

            {submitError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{submitError}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

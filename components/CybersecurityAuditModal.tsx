'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { saveLeadToAPI, validators, formatPhone, Toast, trackEvent } from '@/lib/leads';

export default function CybersecurityAuditModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    teamSize: '',
    name: '',
    securityConcerns: '',
    hasSecurityTeam: '',
    sensitiveDataAccess: '',
    securityIncidents: '',
    complianceRequirements: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState(null);

  const STEPS = [
    { id: 1, title: 'Company Information', fields: ['companyName', 'email', 'phone', 'teamSize'] },
    { id: 2, title: 'Security Concerns', options: ['Ransomware protection', 'Phishing & email security', 'Data breach prevention', 'Compliance requirements', 'Insider threat protection', 'Network security'], multi: true },
    { id: 3, title: 'Current Security', options: ['Internal security team', 'External managed security provider', 'Handle it as needed', 'Not sure what we have'] },
    { id: 4, title: 'Data Access', options: ['All employees', 'Department managers only', 'IT administrators only', 'Varies by system'] },
    { id: 5, title: 'Security History', options: ['Yes, we experienced a breach', 'Yes, attempted attack', 'No incidents', 'Prefer not to answer'] },
    { id: 6, title: 'Compliance', options: ['Healthcare (HIPAA)', 'Financial (SOC2/PCI-DSS)', 'Government', 'General/None apply', 'Not sure'] },
    { id: 7, title: 'Contact Info', fields: ['name', 'email', 'phone'] },
  ];

  const totalSteps = STEPS.length;
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
  const currentStepData = STEPS[currentStep - 1];

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 4000);
  };

  const validateStep = (step) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      const companyError = validators.required(formData.companyName, 'Company name');
      if (companyError) newErrors.companyName = companyError;
      
      const emailError = validators.email(formData.email);
      if (emailError) newErrors.email = emailError;
      
      const phoneError = validators.phone(formData.phone);
      if (phoneError) newErrors.phone = phoneError;
      
      if (!formData.teamSize) newErrors.teamSize = 'Please select team size';
    }
    
    if (step === 7) {
      const nameError = validators.required(formData.name, 'Name');
      if (nameError) newErrors.name = nameError;
      
      const emailError = validators.email(formData.email);
      if (emailError) newErrors.email = emailError;
      
      const phoneError = validators.phone(formData.phone);
      if (phoneError) newErrors.phone = phoneError;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const handlePhoneChange = (field, value) => {
    handleFieldChange(field, formatPhone(value));
  };

  const handleSelect = (value, multi = false) => {
    const fieldMap = {
      'Ransomware protection': 'securityConcerns',
      'Phishing & email security': 'securityConcerns',
      'Data breach prevention': 'securityConcerns',
      'Compliance requirements': 'securityConcerns',
      'Insider threat protection': 'securityConcerns',
      'Network security': 'securityConcerns',
      'Internal security team': 'hasSecurityTeam',
      'External managed security provider': 'hasSecurityTeam',
      'Handle it as needed': 'hasSecurityTeam',
      'Not sure what we have': 'hasSecurityTeam',
      'All employees': 'sensitiveDataAccess',
      'Department managers only': 'sensitiveDataAccess',
      'IT administrators only': 'sensitiveDataAccess',
      'Varies by system': 'sensitiveDataAccess',
      'Yes, we experienced a breach': 'securityIncidents',
      'Yes, attempted attack': 'securityIncidents',
      'No incidents': 'securityIncidents',
      'Prefer not to answer': 'securityIncidents',
      'Healthcare (HIPAA)': 'complianceRequirements',
      'Financial (SOC2/PCI-DSS)': 'complianceRequirements',
      'Government': 'complianceRequirements',
      'General/None apply': 'complianceRequirements',
      'Not sure': 'complianceRequirements',
    };
    const field = fieldMap[value];
    if (field) {
      handleFieldChange(field, value);
      setTimeout(() => {
        setCurrentStep(prev => {
          if (prev < totalSteps) return prev + 1;
          return prev;
        });
        if (currentStep >= totalSteps) handleSubmit();
      }, 300);
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
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
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    
    trackEvent('form_submitted', { formType: 'cybersecurity', step: currentStep });
    
    try {
      await saveLeadToAPI({
        formType: 'cybersecurity',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        companyName: formData.companyName,
        teamSize: formData.teamSize,
        securityConcerns: formData.securityConcerns,
        hasSecurityTeam: formData.hasSecurityTeam,
        sensitiveDataAccess: formData.sensitiveDataAccess,
        securityIncidents: formData.securityIncidents,
        complianceRequirements: formData.complianceRequirements,
      });
      
      setSubmitted(true);
      trackEvent('form_completed', { formType: 'cybersecurity' });
      
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setCurrentStep(1);
        setFormData({
          companyName: '',
          email: '',
          phone: '',
          teamSize: '',
          name: '',
          securityConcerns: '',
          hasSecurityTeam: '',
          sensitiveDataAccess: '',
          securityIncidents: '',
          complianceRequirements: '',
        });
        setErrors({});
      }, 2000);
    } catch (error) {
      setSubmitError('Something went wrong. Please try again.');
      showToast('Failed to submit. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const isAnswered = useMemo(
    () => currentStepData.fields ? currentStepData.fields.every(f => formData[f]?.trim()) : true,
    [currentStepData, formData]
  );

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
          <div className="h-1 bg-gray-200 sticky top-0 z-10">
            <div className="h-full bg-teal transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>

          <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between z-10">
            <button
              onClick={handleBack}
              className="p-2 -ml-2"
              style={{ color: currentStep > 1 ? '#374151' : '#d1d5db' }}
              disabled={submitting}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm" style={{ color: '#6b7280' }}>
              {submitting ? 'Submitting...' : `Step ${currentStep} of ${totalSteps}`}
            </span>
            <button onClick={onClose} className="p-2 -mr-2" disabled={submitting}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-bold mb-2" style={{ color: '#111827' }}>{currentStepData.title}</h2>

            {currentStep === 1 && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#374151' }}>
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleFieldChange('companyName', e.target.value)}
                    placeholder="Your Company Name"
                    className="w-full p-4 rounded-xl text-base outline-none"
                    style={{ border: `1.5px solid ${errors.companyName ? '#ef4444' : '#9ca3af'}`, color: '#111827' }}
                  />
                  {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#374151' }}>
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    placeholder="you@company.com"
                    className="w-full p-4 rounded-xl text-base outline-none"
                    style={{ border: `1.5px solid ${errors.email ? '#ef4444' : '#9ca3af'}`, color: '#111827' }}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#374151' }}>
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange('phone', e.target.value)}
                    placeholder="(503) 000-0000"
                    className="w-full p-4 rounded-xl text-base outline-none"
                    style={{ border: `1.5px solid ${errors.phone ? '#ef4444' : '#9ca3af'}`, color: '#111827' }}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#374151' }}>
                    Team Size <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => handleFieldChange('teamSize', e.target.value)}
                    className="w-full p-4 rounded-xl text-base outline-none"
                    style={{ border: `1.5px solid ${errors.teamSize ? '#ef4444' : '#9ca3af'}`, color: '#111827', background: '#fff' }}
                  >
                    <option value="">Select team size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-100">51-100 employees</option>
                    <option value="101-250">101-250 employees</option>
                    <option value="250+">250+ employees</option>
                  </select>
                  {errors.teamSize && <p className="text-red-500 text-xs mt-1">{errors.teamSize}</p>}
                </div>
              </>
            )}

            {currentStep === 2 && (
              <p className="text-sm mb-4" style={{ color: '#6b7280' }}>Select all that apply</p>
            )}

            {(currentStep === 3 || currentStep === 4 || currentStep === 5 || currentStep === 6) && (
              <p className="text-sm mb-4" style={{ color: '#6b7280' }}>Select one</p>
            )}

            {currentStepData.options && (
              <div className="flex flex-col gap-3 mb-6">
                {currentStepData.options.map((option) => {
                  const fieldKey = currentStep === 2 ? 'securityConcerns' : 
                                   currentStep === 3 ? 'hasSecurityTeam' : 
                                   currentStep === 4 ? 'sensitiveDataAccess' : 
                                   currentStep === 5 ? 'securityIncidents' : 'complianceRequirements';
                  const isSelected = formData[fieldKey] === option;
                  
                  return (
                    <button
                      key={option}
                      onClick={() => handleSelect(option)}
                      className="flex items-center gap-4 p-4 rounded-xl text-left transition-all"
                      style={{
                        border: `1.5px solid ${isSelected ? '#0099CC' : '#e5e7eb'}`,
                        background: isSelected ? '#f0f9ff' : '#fff',
                      }}
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          border: `2px solid ${isSelected ? '#0099CC' : '#d1d5db'}`,
                          background: isSelected ? '#0099CC' : '#fff',
                        }}
                      >
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className="text-base font-medium" style={{ color: '#111827' }}>{option}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {currentStep === 7 && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#374151' }}>
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    placeholder="Your name"
                    className="w-full p-4 rounded-xl text-base outline-none"
                    style={{ border: `1.5px solid ${errors.name ? '#ef4444' : '#9ca3af'}`, color: '#111827' }}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#374151' }}>
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    placeholder="you@company.com"
                    className="w-full p-4 rounded-xl text-base outline-none"
                    style={{ border: `1.5px solid ${errors.email ? '#ef4444' : '#9ca3af'}`, color: '#111827' }}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#374151' }}>
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange('phone', e.target.value)}
                    placeholder="(503) 000-0000"
                    className="w-full p-4 rounded-xl text-base outline-none"
                    style={{ border: `1.5px solid ${errors.phone ? '#ef4444' : '#9ca3af'}`, color: '#111827' }}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </>
            )}

            {currentStepData.fields && !submitted && (
              <div className="flex gap-3">
                <button
                  onClick={handleNext}
                  disabled={submitting || !isAnswered}
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
                    isLastStep ? 'Claim Free Audit' : 'Next'
                  )}
                </button>
              </div>
            )}

            {submitError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{submitError}</p>
              </div>
            )}

            {submitted && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#111827' }}>Thank You!</h3>
                <p className="text-sm" style={{ color: '#6b7280' }}>Your submission has been received. We will be in touch shortly.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

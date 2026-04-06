'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ZIP_RE = /^\d{5}(-\d{4})?$/;

const LEADS_KEY = 'zeronerds_leads_v2';

// Analytics tracking
export function trackEvent(eventName, properties = {}) {
  if (typeof window === 'undefined') return;

  const event = {
    event: eventName,
    timestamp: new Date().toISOString(),
    properties: {
      ...properties,
      url: window.location.pathname,
      userAgent: navigator.userAgent,
    },
  };

  const write = () => {
    const events = JSON.parse(localStorage.getItem('zeronerds_analytics') || '[]');
    events.push(event);
    if (events.length > 100) events.shift();
    localStorage.setItem('zeronerds_analytics', JSON.stringify(events));
  };

  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(write);
  } else {
    setTimeout(write, 0);
  }

  console.log('[Analytics]', eventName, properties);
}

// Form validation utilities
export const validators = {
  email: (value) => {
    if (!value) return 'Email is required';
    if (!EMAIL_RE.test(value)) return 'Please enter a valid email';
    return null;
  },
  
  phone: (value) => {
    if (!value) return 'Phone number is required';
    const digits = value.replace(/\D/g, '');
    if (digits.length < 10) return 'Please enter a valid phone number';
    return null;
  },
  
  required: (value, fieldName = 'This field') => {
    if (!value || !value.trim()) return `${fieldName} is required`;
    return null;
  },
  
  zipCode: (value) => {
    if (!value) return null; // Optional
    if (!ZIP_RE.test(value)) return 'Please enter a valid ZIP code';
    return null;
  },
};

// Format phone number as user types
export function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

// Toast notification system
export function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success', duration = 4000) => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), duration);
  };

  return { toast, showToast };
}

// Toast component
export function Toast({ toast }) {
  if (!toast) return null;
  
  const bgColor = toast.type === 'success' ? 'bg-green-600' : toast.type === 'error' ? 'bg-red-600' : 'bg-teal';
  
  return (
    <div className="fixed top-4 right-4 z-[100] animate-fade-in-up">
      <div className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3`}>
        {toast.type === 'success' && (
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
        {toast.type === 'error' && (
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        <span className="font-medium">{toast.message}</span>
      </div>
    </div>
  );
}

// Module-level cache for localStorage reads
let leadsCache: ReturnType<typeof JSON.parse> | null = null;

// Get leads from storage
export function getLeadsFromStorage(): any[] {
  if (typeof window === 'undefined') return [];
  // Migrate v1 → v2 once
  if (!localStorage.getItem(LEADS_KEY) && localStorage.getItem('zeronerds_leads')) {
    localStorage.setItem(LEADS_KEY, localStorage.getItem('zeronerds_leads')!);
    localStorage.removeItem('zeronerds_leads');
  }
  if (leadsCache) return leadsCache;
  const stored = localStorage.getItem(LEADS_KEY);
  leadsCache = stored ? JSON.parse(stored) : [];
  return leadsCache;
}

function saveLeadsToStorage(leads: any[]): void {
  leadsCache = leads;
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
}

export function normalizeLead(lead) {
  return {
    id: lead.id,
    formType: lead.form_type || lead.formType,
    name: lead.name || lead.name,
    firstName: lead.first_name || lead.firstName,
    lastName: lead.last_name || lead.lastName,
    email: lead.email,
    phone: lead.phone,
    companyName: lead.company_name || lead.companyName,
    teamSize: lead.team_size || lead.teamSize,
    zipCode: lead.zip_code || lead.zipCode,
    mainIssue: lead.main_issue || lead.mainIssue,
    computerType: lead.computer_type || lead.computerType,
    deviceType: lead.device_type || lead.deviceType,
    workLocation: lead.work_location || lead.workLocation,
    startTime: lead.start_time || lead.startTime,
    message: lead.message,
    securityConcerns: lead.security_concerns || lead.securityConcerns,
    hasSecurityTeam: lead.has_security_team || lead.hasSecurityTeam,
    sensitiveDataAccess: lead.sensitive_data_access || lead.sensitiveDataAccess,
    securityIncidents: lead.security_incidents || lead.securityIncidents,
    complianceRequirements: lead.compliance_requirements || lead.complianceRequirements,
    createdAt: lead.created_at || lead.createdAt,
  };
}

// Save lead with retry logic
export async function saveLeadToAPI(lead, maxRetries = 2) {
  const leads = getLeadsFromStorage();
  const newLead = {
    ...lead,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    syncStatus: 'pending',
  };
  
  // Always save to localStorage first
  leads.unshift(newLead);
  saveLeadsToStorage(leads);

  // Track submission
  trackEvent('lead_submitted', { formType: lead.formType, hasEmail: !!lead.email });

  // Try to save to API with retry
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });

      if (response.ok) {
        // Mark as synced
        const updatedLeads = getLeadsFromStorage().map(l =>
          l.id === newLead.id ? { ...l, syncStatus: 'synced' } : l
        );
        saveLeadsToStorage(updatedLeads);
        
        trackEvent('lead_synced', { formType: lead.formType });
        return { ...newLead, syncStatus: 'synced' };
      }
    } catch (error) {
      console.log(`API attempt ${attempt + 1} failed:`, error.message);
      if (attempt < maxRetries) {
        await new Promise(r => setTimeout(r, 1000)); // Wait 1 second before retry
      }
    }
  }
  
  // API failed after retries, but we have local copy
  trackEvent('lead_local_only', { formType: lead.formType });
  return { ...newLead, syncStatus: 'pending' };
}

export function saveLead(lead) {
  const leads = getLeadsFromStorage();
  const newLead = {
    ...lead,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    syncStatus: 'synced',
  };
  leads.unshift(newLead);
  saveLeadsToStorage(leads);
  return newLead;
}

const fetcher = (url: string) =>
  fetch(url, { signal: AbortSignal.timeout(5000) })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))));

export function useLeads() {
  const { data, error, isLoading, mutate } = useSWR<any[]>('/api/leads', fetcher, {
    fallbackData: getLeadsFromStorage(),
    onError: () => { /* silently fall through to localStorage fallback */ },
  });

  const leads = data && Array.isArray(data)
    ? data.map(normalizeLead)
    : getLeadsFromStorage();

  return { leads, loading: isLoading, error, refresh: mutate };
}

// Form field component with validation
export function FormField({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  required = false,
  placeholder = '',
  options = null, // For select fields
  format = null, // For phone formatting
}) {
  const handleChange = (e) => {
    let val = e.target.value;
    if (format === 'phone') {
      val = formatPhone(val);
    }
    onChange(name, val);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-2" style={{ color: '#374151' }}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {options ? (
        <select
          name={name}
          value={value}
          onChange={handleChange}
          className="w-full p-4 rounded-xl text-base outline-none"
          style={{ 
            border: `1.5px solid ${error ? '#ef4444' : '#9ca3af'}`, 
            color: '#111827',
            background: '#fff',
          }}
        >
          <option value="">Select...</option>
          {options.map(opt => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full p-4 rounded-xl text-base outline-none"
          style={{ 
            border: `1.5px solid ${error ? '#ef4444' : '#9ca3af'}`, 
            color: '#111827',
          }}
        />
      )}
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}

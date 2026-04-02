'use client';

import { useState, useEffect, useCallback } from 'react';

export function getLeadsFromStorage() {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('zeronerds_leads');
  return stored ? JSON.parse(stored) : [];
}

function normalizeLead(lead) {
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

export async function saveLeadToAPI(lead) {
  // Always save to localStorage first (works everywhere)
  const leads = getLeadsFromStorage();
  const newLead = {
    ...lead,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  leads.unshift(newLead);
  localStorage.setItem('zeronerds_leads', JSON.stringify(leads));

  // Try to save to API (only works on Vercel with DATABASE_URL configured)
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });
    
    if (response.ok) {
      const apiLead = await response.json();
      // Remove the localStorage version since API succeeded
      const updatedLeads = leads.filter(l => l.id !== newLead.id);
      localStorage.setItem('zeronerds_leads', JSON.stringify(updatedLeads));
      return apiLead;
    }
  } catch (error) {
    // API failed, but we already saved to localStorage - that's fine
    console.log('API not available, using local storage');
  }
  
  return newLead;
}

export function saveLead(lead) {
  const leads = getLeadsFromStorage();
  const newLead = {
    ...lead,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  leads.unshift(newLead);
  localStorage.setItem('zeronerds_leads', JSON.stringify(leads));
  return newLead;
}

export function useLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeads = useCallback(async () => {
    // Always use localStorage for leads
    const localLeads = getLeadsFromStorage();
    
    try {
      // Try API first
      const response = await fetch('/api/leads', {
        signal: AbortSignal.timeout(3000), // 3 second timeout
      });
      
      if (response.ok) {
        const data = await response.json();
        setLeads(Array.isArray(data) ? data.map(normalizeLead) : localLeads);
      } else {
        // API not available, use localStorage
        setLeads(localLeads);
      }
    } catch (err) {
      // API failed (timeout or network error), use localStorage
      console.log('API not available, using local storage');
      setLeads(localLeads);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  return { leads, loading, error, refresh: fetchLeads };
}

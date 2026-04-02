'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useLeads } from '@/lib/leads';

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

function LeadModal({ lead, onClose }) {
  if (!lead) return null;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg font-bold" style={{ color: '#111827' }}>
              {lead.name || lead.firstName + ' ' + lead.lastName || 'Lead Details'}
            </h2>
            <p className="text-xs" style={{ color: '#6b7280' }}>
              {formatDate(lead.createdAt)}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: lead.formType === 'cybersecurity' ? '#dbeafe' : '#dcfce7',
                color: lead.formType === 'cybersecurity' ? '#1d4ed8' : '#166534',
              }}
            >
              {lead.formType === 'cybersecurity' ? 'Cybersecurity Audit' : 'Get Free Quote'}
            </span>
          </div>

          <div className="space-y-4">
            {lead.name && (
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Name</span>
                <span className="text-sm font-medium" style={{ color: '#111827' }}>{lead.name}</span>
              </div>
            )}

            {(lead.firstName || lead.lastName) && (
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Name</span>
                <span className="text-sm font-medium" style={{ color: '#111827' }}>
                  {lead.firstName} {lead.lastName}
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</span>
                <a href={`mailto:${lead.email}`} className="text-sm font-medium text-blue-600 hover:underline">
                  {lead.email}
                </a>
              </div>

              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Phone</span>
                <a href={`tel:${lead.phone}`} className="text-sm font-medium text-blue-600 hover:underline">
                  {lead.phone}
                </a>
              </div>
            </div>

            {lead.companyName && (
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Company</span>
                <span className="text-sm font-medium" style={{ color: '#111827' }}>{lead.companyName}</span>
              </div>
            )}

            {lead.teamSize && (
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Team Size</span>
                <span className="text-sm font-medium" style={{ color: '#111827' }}>{lead.teamSize}</span>
              </div>
            )}

            {lead.zipCode && (
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Zip Code</span>
                <span className="text-sm font-medium" style={{ color: '#111827' }}>{lead.zipCode}</span>
              </div>
            )}

            {lead.mainIssue && (
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Main Issue</span>
                <span className="text-sm font-medium" style={{ color: '#111827' }}>{lead.mainIssue}</span>
              </div>
            )}

            {lead.computerType && (
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Computer Type</span>
                <span className="text-sm font-medium" style={{ color: '#111827' }}>{lead.computerType}</span>
              </div>
            )}

            {lead.deviceType && (
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Device Type</span>
                <span className="text-sm font-medium" style={{ color: '#111827' }}>{lead.deviceType}</span>
              </div>
            )}

            {lead.workLocation && (
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Work Location</span>
                <span className="text-sm font-medium" style={{ color: '#111827' }}>{lead.workLocation}</span>
              </div>
            )}

            {lead.startTime && (
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">When to Start</span>
                <span className="text-sm font-medium" style={{ color: '#111827' }}>{lead.startTime}</span>
              </div>
            )}

            {lead.message && (
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Message</span>
                <span className="text-sm" style={{ color: '#374151' }}>{lead.message}</span>
              </div>
            )}

            {lead.securityConcerns && (
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Security Concerns</span>
                <span className="text-sm font-medium" style={{ color: '#111827' }}>{lead.securityConcerns}</span>
              </div>
            )}

            {lead.hasSecurityTeam && (
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Current Security</span>
                <span className="text-sm font-medium" style={{ color: '#111827' }}>{lead.hasSecurityTeam}</span>
              </div>
            )}

            {lead.sensitiveDataAccess && (
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Data Access</span>
                <span className="text-sm font-medium" style={{ color: '#111827' }}>{lead.sensitiveDataAccess}</span>
              </div>
            )}

            {lead.securityIncidents && (
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Security History</span>
                <span className="text-sm font-medium" style={{ color: '#111827' }}>{lead.securityIncidents}</span>
              </div>
            )}

            {lead.complianceRequirements && (
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Compliance</span>
                <span className="text-sm font-medium" style={{ color: '#111827' }}>{lead.complianceRequirements}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { leads, loading, refresh } = useLeads();
  const [selectedLead, setSelectedLead] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/dashboard/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f9fafb' }}>
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p style={{ color: '#6b7280' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  const normalizedLeads = leads.map(normalizeLead);

  const filteredLeads = normalizedLeads.filter((lead) => {
    const matchesSearch =
      (lead.name || `${lead.firstName || ''} ${lead.lastName || ''}`).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.companyName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.phone || '').includes(searchTerm);

    const matchesFilter = filterType === 'all' || lead.formType === filterType;

    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDisplayName = (lead) => {
    if (lead.name) return lead.name;
    if (lead.firstName || lead.lastName) return `${lead.firstName || ''} ${lead.lastName || ''}`.trim();
    return lead.companyName || 'Unknown';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f9fafb' }}>
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p style={{ color: '#6b7280' }}>Loading leads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#111827' }}>
                Lead Dashboard
              </h1>
              <p className="text-sm" style={{ color: '#6b7280' }}>
                {leads.length} total leads
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={refresh}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                style={{ color: '#374151' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
              <button
                onClick={() => signOut({ callbackUrl: '/dashboard/login' })}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by name, email, company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  style={{ color: '#111827' }}
                />
              </div>
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              style={{ color: '#374151' }}
            >
              <option value="all">All Forms</option>
              <option value="wizard">Get Free Quote</option>
              <option value="cybersecurity">Cybersecurity Audit</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lead List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredLeads.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <svg className="w-12 h-12 mx-auto mb-4" style={{ color: '#d1d5db' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-lg font-medium mb-2" style={{ color: '#374151' }}>
              {searchTerm || filterType !== 'all' ? 'No leads found' : 'No leads yet'}
            </h3>
            <p style={{ color: '#6b7280' }}>
              {searchTerm || filterType !== 'all'
                ? 'Try adjusting your search or filter'
                : 'Leads from your forms will appear here'}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200" style={{ backgroundColor: '#f9fafb' }}>
                    <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#6b7280' }}>Name</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide hidden sm:table-cell" style={{ color: '#6b7280' }}>Company</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide hidden md:table-cell" style={{ color: '#6b7280' }}>Email</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide hidden lg:table-cell" style={{ color: '#6b7280' }}>Phone</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#6b7280' }}>Form</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide hidden xl:table-cell" style={{ color: '#6b7280' }}>Date</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setSelectedLead(lead)}>
                      <td className="px-6 py-4">
                        <span className="font-medium text-sm" style={{ color: '#111827' }}>
                          {getDisplayName(lead)}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <span className="text-sm" style={{ color: '#374151' }}>
                          {lead.companyName || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-sm" style={{ color: '#374151' }}>
                          {lead.email || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span className="text-sm" style={{ color: '#374151' }}>
                          {lead.phone || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: lead.formType === 'cybersecurity' ? '#dbeafe' : '#dcfce7',
                            color: lead.formType === 'cybersecurity' ? '#1d4ed8' : '#166534',
                          }}
                        >
                          {lead.formType === 'cybersecurity' ? 'Audit' : 'Quote'}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden xl:table-cell">
                        <span className="text-sm whitespace-nowrap" style={{ color: '#6b7280' }}>
                          {formatDate(lead.createdAt)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <svg className="w-5 h-5" style={{ color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Lead Detail Modal */}
      <LeadModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
    </div>
  );
}

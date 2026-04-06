'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useLeads, normalizeLead } from '@/lib/leads';
import Image from 'next/image';

function StatCard({ title, value, color, onClick }: { title: string; value: number; color?: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 min-w-[120px] bg-white rounded-2xl p-4 shadow-sm border border-gray-100 active:scale-95 transition-transform"
    >
      <p className="text-xs text-black uppercase tracking-wide">{title}</p>
      <p className="text-3xl font-bold mt-1 text-black">{value}</p>
    </button>
  );
}

function LeadCard({ lead, onClick }) {
  const getDisplayName = () => {
    if (lead.name) return lead.name;
    if (lead.firstName || lead.lastName) return `${lead.firstName || ''} ${lead.lastName || ''}`.trim();
    return lead.companyName || 'Unknown';
  };

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-left active:bg-gray-50 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-black truncate">
              {getDisplayName()}
            </h3>
            {lead.syncStatus === 'pending' && (
              <span className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-black truncate">{lead.email || lead.phone || '-'}</p>
          <div className="flex items-center gap-2 mt-2">
            <span
              className="px-2 py-0.5 rounded-full text-xs font-medium"
              style={{
                backgroundColor: lead.formType === 'cybersecurity' ? '#dbeafe' : '#dcfce7',
                color: lead.formType === 'cybersecurity' ? '#1d4ed8' : '#166534',
              }}
            >
              {lead.formType === 'cybersecurity' ? 'Audit' : 'Quote'}
            </span>
            {lead.companyName && (
              <span className="text-xs text-black truncate">{lead.companyName}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 ml-3">
          <span className="text-xs text-black">{formatTime(lead.createdAt)}</span>
          <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
}

function DeleteConfirmation({ lead, onConfirm, onCancel }) {
  const getDisplayName = () => {
    if (lead.name) return lead.name;
    if (lead.firstName || lead.lastName) return `${lead.firstName || ''} ${lead.lastName || ''}`.trim();
    return 'this lead';
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50" onClick={onCancel} />
      <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 bg-white rounded-2xl p-6 shadow-xl">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-black text-center mb-2">Delete Lead?</h3>
        <p className="text-black text-center mb-6">
          Are you sure you want to delete <span className="font-semibold">{getDisplayName()}</span>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3.5 rounded-xl bg-gray-100 text-black font-semibold active:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(lead.id)}
            className="flex-1 py-3.5 rounded-xl bg-red-600 text-white font-semibold active:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

function BottomSheet({ lead, onClose, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (!lead) return null;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDisplayName = () => {
    if (lead.name) return lead.name;
    if (lead.firstName || lead.lastName) return `${lead.firstName || ''} ${lead.lastName || ''}`.trim();
    return 'Lead Details';
  };

  const fields = [
    { key: 'email', label: 'Email', show: !!lead.email },
    { key: 'phone', label: 'Phone', show: !!lead.phone },
    { key: 'companyName', label: 'Company', show: !!lead.companyName },
    { key: 'teamSize', label: 'Team Size', show: !!lead.teamSize },
    { key: 'zipCode', label: 'Zip Code', show: !!lead.zipCode },
    { key: 'mainIssue', label: 'Main Issue', show: !!lead.mainIssue },
    { key: 'computerType', label: 'Computer Type', show: !!lead.computerType },
    { key: 'deviceType', label: 'Device Type', show: !!lead.deviceType },
    { key: 'workLocation', label: 'Work Location', show: !!lead.workLocation },
    { key: 'startTime', label: 'When to Start', show: !!lead.startTime },
    { key: 'message', label: 'Message', show: !!lead.message },
    { key: 'securityConcerns', label: 'Security Concerns', show: !!lead.securityConcerns },
    { key: 'hasSecurityTeam', label: 'Current Security', show: !!lead.hasSecurityTeam },
    { key: 'sensitiveDataAccess', label: 'Data Access', show: !!lead.sensitiveDataAccess },
    { key: 'securityIncidents', label: 'Security History', show: !!lead.securityIncidents },
    { key: 'complianceRequirements', label: 'Compliance', show: !!lead.complianceRequirements },
  ].filter(f => f.show);

  if (showConfirm) {
    return <DeleteConfirmation lead={lead} onConfirm={onDelete} onCancel={() => setShowConfirm(false)} />;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-white pt-3 pb-2 px-4 border-b border-gray-100">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-black">{getDisplayName()}</h2>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200">
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-black mt-1">{formatDate(lead.createdAt)}</p>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="px-3 py-1 rounded-full text-sm font-semibold"
              style={{
                backgroundColor: lead.formType === 'cybersecurity' ? '#dbeafe' : '#dcfce7',
                color: lead.formType === 'cybersecurity' ? '#1d4ed8' : '#166534',
              }}
            >
              {lead.formType === 'cybersecurity' ? 'Cybersecurity Audit' : 'Get Free Quote'}
            </span>
          </div>

          <div className="space-y-3">
            {fields.map(({ key, label }) => {
              const value = lead[key];
              const isLink = (key === 'email' || key === 'phone');
              const href = isLink ? `${key === 'email' ? 'mailto' : 'tel'}:${value}` : null;

              return (
                <div key={key} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-black uppercase tracking-wide mb-1">{label}</p>
                  {href ? (
                    <a href={href} className="text-base font-medium text-black hover:underline block">
                      {value}
                    </a>
                  ) : (
                    <p className="text-base font-medium text-black">{value}</p>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setShowConfirm(true)}
            className="w-full mt-6 py-4 rounded-xl bg-red-50 text-red-600 font-semibold active:bg-red-100 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete Lead
          </button>
        </div>
      </div>
    </>
  );
}

function TabBar({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'all', label: 'All', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { id: 'wizard', label: 'Quotes', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'cybersecurity', label: 'Audits', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex-1 py-3 flex flex-col items-center gap-1 transition-colors"
          >
            <svg
              className={`w-6 h-6 ${activeTab === tab.id ? 'text-teal' : 'text-black'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === tab.id ? 2.5 : 2} d={tab.icon} />
            </svg>
            <span className={`text-xs font-medium ${activeTab === tab.id ? 'text-teal' : 'text-black'}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
      <div className="h-safe-area-inset-bottom bg-white" />
    </div>
  );
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { leads, loading, refresh } = useLeads();
  const [selectedLead, setSelectedLead] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/dashboard/login');
    }
  }, [status, router]);

  const normalizedLeads = useMemo(() => leads.map(normalizeLead), [leads]);

  const stats = useMemo(() => ({
    total: normalizedLeads.length,
    quotes: normalizedLeads.filter(l => l.formType === 'wizard').length,
    audits: normalizedLeads.filter(l => l.formType === 'cybersecurity').length,
    thisWeek: normalizedLeads.filter(l => {
      const d = new Date(l.createdAt);
      const now = new Date();
      return (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24) <= 7;
    }).length,
  }), [normalizedLeads]);

  const filteredLeads = useMemo(() => {
    let result = [...normalizedLeads];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(lead =>
        (lead.name || `${lead.firstName || ''} ${lead.lastName || ''}`).toLowerCase().includes(term) ||
        (lead.email || '').toLowerCase().includes(term) ||
        (lead.companyName || '').toLowerCase().includes(term) ||
        (lead.phone || '').includes(term)
      );
    }

    if (activeTab !== 'all') {
      result = result.filter(lead => lead.formType === activeTab);
    }

    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return result;
  }, [normalizedLeads, searchTerm, activeTab]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Company', 'Form Type', 'Date'];
    const rows = filteredLeads.map(lead => [
      lead.name || `${lead.firstName || ''} ${lead.lastName || ''}`.trim(),
      lead.email || '',
      lead.phone || '',
      lead.companyName || '',
      lead.formType === 'cybersecurity' ? 'Audit' : 'Quote',
      new Date(lead.createdAt).toLocaleString(),
    ]);
    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zeronerds-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const deleteLead = async (id) => {
    try {
      const response = await fetch(`/api/leads?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        const updated = leads.filter(l => l.id !== id);
        localStorage.setItem('zeronerds_leads', JSON.stringify(updated));
        setSelectedLead(null);
        refresh();
      } else {
        const updated = leads.filter(l => l.id !== id);
        localStorage.setItem('zeronerds_leads', JSON.stringify(updated));
        setSelectedLead(null);
        refresh();
      }
    } catch (error) {
      console.error('Failed to delete, removing from localStorage:', error);
      const updated = leads.filter(l => l.id !== id);
      localStorage.setItem('zeronerds_leads', JSON.stringify(updated));
      setSelectedLead(null);
      refresh();
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-teal text-white px-4 pt-12 pb-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-white/80 text-sm">{stats.total} Total Leads</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/dashboard/login' })}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center active:bg-white/30"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>

        {/* Stats Row */}
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
          <StatCard title="This Week" value={stats.thisWeek} />
          <StatCard title="Quotes" value={stats.quotes} />
          <StatCard title="Audits" value={stats.audits} />
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-4">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border-0 shadow-sm text-black placeholder-gray-400 focus:ring-2 focus:ring-teal outline-none"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 flex gap-3 mb-4">
        <button
          onClick={handleRefresh}
          className="flex-1 py-3.5 bg-white rounded-2xl shadow-sm border border-gray-100 font-semibold text-black active:bg-gray-50 flex items-center justify-center gap-2"
        >
          <svg className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
        <button
          onClick={exportToCSV}
          className="flex-1 py-3.5 bg-green-600 text-white rounded-2xl shadow-sm font-semibold active:bg-green-700 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export
        </button>
      </div>

      {/* Leads List */}
      <div className="px-4 space-y-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-black">Recent Leads</h2>
          <span className="text-sm text-black">{filteredLeads.length} shown</span>
        </div>

        {filteredLeads.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-black mb-1">
              {searchTerm ? 'No matches found' : 'No leads yet'}
            </h3>
            <p className="text-sm text-black">
              {searchTerm ? 'Try a different search term' : 'Leads from your forms will appear here'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLeads.map((lead) => (
              <div key={lead.id} style={{ contentVisibility: 'auto', containIntrinsicSize: '0 88px' }}>
                <LeadCard lead={lead} onClick={() => setSelectedLead(lead)} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Tab Bar */}
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Bottom Sheet Modal */}
      <BottomSheet
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onDelete={deleteLead}
      />
    </div>
  );
}

'use client';

import { signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const router = useRouter();

  // Clear error when user types
  useEffect(() => {
    if (error) setError('');
  }, [username, password]);

  // Lock after 5 failed attempts for 30 seconds
  useEffect(() => {
    if (attempts >= 5) {
      setLocked(true);
      const timer = setTimeout(() => {
        setLocked(false);
        setAttempts(0);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [attempts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (locked) {
      setError('Too many attempts. Please wait 30 seconds.');
      return;
    }

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        username: username.trim(),
        password,
        redirect: false,
      });

      if (result?.error) {
        setAttempts(prev => prev + 1);
        if (attempts >= 4) {
          setError('Too many attempts. Please wait 30 seconds.');
        } else {
          setError('Invalid username or password');
        }
        setLoading(false);
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f9fafb' }}>
      <div className="w-full max-w-md px-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold" style={{ color: '#111827' }}>
              Admin Login
            </h1>
            <p className="text-sm mt-2" style={{ color: '#6b7280' }}>
              Enter your credentials to access the dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            {attempts > 0 && attempts < 5 && !locked && (
              <div className="text-xs text-gray-500 text-center">
                {5 - attempts} attempts remaining
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={locked}
                required
                autoComplete="username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal focus:border-teal outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                style={{ color: '#111827' }}
                placeholder="Enter username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={locked}
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal focus:border-teal outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                style={{ color: '#111827' }}
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={loading || locked}
              className="w-full py-3 rounded-lg text-white font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ backgroundColor: '#0099CC' }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </>
              ) : locked ? (
                'Please wait...'
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-teal hover:underline flex items-center justify-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to website
            </a>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          Secured access • All activity is logged
        </p>
      </div>
    </div>
  );
}

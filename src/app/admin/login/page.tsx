'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      router.push('/admin/dashboard');
    } catch {
      setError('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="bg-gradient" />

      <div className="login-container">
        <Link href="/" className="login-brand">
          <div className="brand-mark">
            <span>A</span>
            <div className="brand-shine" />
          </div>
          <div className="brand-text">
            <span className="brand-name">Apis Digitech</span>
            <span className="brand-tagline">Admin Portal</span>
          </div>
        </Link>

        <div className="login-card">
          <div className="card-header">
            <h1>Welcome Back</h1>
            <p>Sign in to manage your content</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="login-error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@apisdigitech.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p className="login-note">Contact the administrator if you forgot your password.</p>
          </div>
        </div>

        <Link href="/" className="back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to website
        </Link>
      </div>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          min-height: 100dvh;
          background: #080c14;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
        }

        .bg-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(37, 99, 235, 0.15) 0%, transparent 60%);
        }

        .login-container {
          width: 100%;
          max-width: 400px;
          position: relative;
          z-index: 1;
        }

        .login-brand {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.875rem;
          text-decoration: none;
          margin-bottom: 1.5rem;
        }

        .brand-mark {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.25rem;
          color: #fff;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(37, 99, 235, 0.3);
          flex-shrink: 0;
        }

        .brand-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%);
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          color: #fff;
          font-weight: 600;
          font-size: 1.125rem;
          line-height: 1.2;
        }

        .brand-tagline {
          font-size: 0.6875rem;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .login-card {
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 1.5rem;
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.5);
        }

        .card-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .card-header h1 {
          color: #fff;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.375rem;
          background: linear-gradient(135deg, #fff 0%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .card-header p {
          color: #64748b;
          font-size: 0.875rem;
        }

        .login-footer {
          margin-top: 1.25rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .login-note {
          font-size: 0.75rem;
          color: #64748b;
          text-align: center;
        }

        .back-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: #64748b;
          text-decoration: none;
          font-size: 0.8125rem;
          margin-top: 1.5rem;
          transition: all 0.2s;
        }

        .back-link:hover {
          color: #94a3b8;
        }

        .back-link:hover :global(svg) {
          transform: translateX(-3px);
        }

        .back-link :global(svg) {
          transition: transform 0.2s;
        }

        @media (max-width: 480px) {
          .login-page {
            padding: 1rem;
            align-items: flex-start;
            padding-top: 15vh;
          }

          .login-container {
            max-width: 100%;
          }

          .login-brand {
            margin-bottom: 1.25rem;
          }

          .brand-mark {
            width: 40px;
            height: 40px;
            font-size: 1.125rem;
          }

          .brand-name {
            font-size: 1rem;
          }

          .login-card {
            padding: 1.25rem;
            border-radius: 14px;
          }

          .card-header h1 {
            font-size: 1.375rem;
          }
        }
      `}</style>

      <style jsx global>{`
        .login-error {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #f87171;
          padding: 0.75rem;
          border-radius: 10px;
          font-size: 0.8125rem;
          margin-bottom: 1.25rem;
          animation: shake 0.4s ease;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .login-form .form-group {
          margin-bottom: 1rem;
        }

        .login-form .form-group label {
          display: block;
          color: #94a3b8;
          font-size: 0.8125rem;
          font-weight: 500;
          margin-bottom: 0.375rem;
        }

        .login-form .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .login-form .input-icon {
          position: absolute;
          left: 0.875rem;
          color: #64748b;
          pointer-events: none;
          transition: color 0.2s;
        }

        .login-form .input-wrapper:focus-within .input-icon {
          color: #3b82f6;
        }

        .login-form .form-group input {
          width: 100%;
          padding: 0.75rem 0.875rem 0.75rem 2.625rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          color: #fff;
          font-size: 0.9375rem;
          transition: all 0.2s;
        }

        .login-form .form-group input:focus {
          outline: none;
          border-color: #3b82f6;
          background: rgba(59, 130, 246, 0.05);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .login-form .form-group input::placeholder {
          color: #475569;
        }

        .login-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.625rem;
          padding: 0.875rem 1.25rem;
          background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
          border: none;
          border-radius: 10px;
          color: #fff;
          font-size: 0.9375rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 0.25rem;
        }

        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.4);
        }

        .login-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .login-btn svg {
          transition: transform 0.2s;
        }

        .login-btn:hover:not(:disabled) svg {
          transform: translateX(3px);
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 480px) {
          .login-form .form-group input {
            font-size: 16px; /* Prevents iOS zoom on focus */
          }
        }
      `}</style>
    </div>
  );
}

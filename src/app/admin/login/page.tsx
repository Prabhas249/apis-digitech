'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin/dashboard';

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

      router.push(redirect);
    } catch {
      setError('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
  );
}

export default function LoginPage() {
  return (
    <div className="login-page">
      {/* Animated background */}
      <div className="bg-gradient" />
      <div className="bg-grid" />
      <div className="bg-glow glow-1" />
      <div className="bg-glow glow-2" />

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

          <Suspense fallback={
            <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
              Loading...
            </div>
          }>
            <LoginForm />
          </Suspense>

          <div className="login-footer">
            <div className="divider">
              <span>Demo Credentials</span>
            </div>
            <div className="demo-creds">
              <code>admin@apisdigitech.com</code>
              <code>admin123</code>
            </div>
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
          background: #080c14;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .bg-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(37, 99, 235, 0.08) 0%, transparent 50%);
        }

        .bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 50px 50px;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
        }

        .bg-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.4;
          animation: float 20s ease-in-out infinite;
        }

        .glow-1 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          top: -200px;
          right: -100px;
        }

        .glow-2 {
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          bottom: -150px;
          left: -100px;
          animation-delay: -10s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, 30px) scale(1.1); }
        }

        .login-container {
          width: 100%;
          max-width: 420px;
          position: relative;
          z-index: 1;
        }

        .login-brand {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          text-decoration: none;
          margin-bottom: 2rem;
        }

        .brand-mark {
          width: 52px;
          height: 52px;
          background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.5rem;
          color: #fff;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(37, 99, 235, 0.3);
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
          font-size: 1.25rem;
          line-height: 1.2;
        }

        .brand-tagline {
          font-size: 0.75rem;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .login-card {
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 2rem;
          backdrop-filter: blur(20px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .card-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .card-header h1 {
          color: #fff;
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #fff 0%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .card-header p {
          color: #64748b;
          font-size: 0.9375rem;
        }

        .login-footer {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .divider {
          text-align: center;
          margin-bottom: 1rem;
        }

        .divider span {
          font-size: 0.75rem;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .demo-creds {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .demo-creds code {
          padding: 0.375rem 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          color: #94a3b8;
          font-size: 0.8125rem;
          font-family: ui-monospace, monospace;
        }

        .back-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: #64748b;
          text-decoration: none;
          font-size: 0.875rem;
          margin-top: 2rem;
          transition: all 0.2s;
        }

        .back-link:hover {
          color: #94a3b8;
        }

        .back-link:hover svg {
          transform: translateX(-3px);
        }

        .back-link svg {
          transition: transform 0.2s;
        }
      `}</style>

      <style jsx global>{`
        .login-error {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #f87171;
          padding: 0.875rem 1rem;
          border-radius: 10px;
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
          animation: shake 0.4s ease;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-group label {
          display: block;
          color: #94a3b8;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          color: #64748b;
          pointer-events: none;
          transition: color 0.2s;
        }

        .input-wrapper:focus-within .input-icon {
          color: #3b82f6;
        }

        .form-group input {
          width: 100%;
          padding: 0.875rem 1rem 0.875rem 2.875rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          color: #fff;
          font-size: 1rem;
          transition: all 0.2s;
        }

        .form-group input:focus {
          outline: none;
          border-color: #3b82f6;
          background: rgba(59, 130, 246, 0.05);
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }

        .form-group input::placeholder {
          color: #475569;
        }

        .login-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
          border: none;
          border-radius: 10px;
          color: #fff;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 0.5rem;
        }

        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(37, 99, 235, 0.4);
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
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

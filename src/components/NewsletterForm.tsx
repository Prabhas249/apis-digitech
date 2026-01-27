'use client';

import { useState } from 'react';

interface NewsletterFormProps {
  className?: string;
}

export default function NewsletterForm({ className = '' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setStatus('success');
    setEmail('');

    // Reset success message after 5 seconds
    setTimeout(() => setStatus('idle'), 5000);
  };

  if (status === 'success') {
    return (
      <div className={`newsletter-success ${className}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <span>Thanks for subscribing! Check your inbox to confirm.</span>
      </div>
    );
  }

  return (
    <form className={`newsletter-form ${className}`} onSubmit={handleSubmit} aria-label="Newsletter subscription">
      <div className="newsletter-input-wrapper">
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          aria-label="Email address for newsletter"
          aria-invalid={status === 'error'}
        />
        {status === 'error' && (
          <span className="newsletter-error" role="alert">{errorMessage}</span>
        )}
      </div>
      <button
        type="submit"
        className="btn btn--primary"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? (
          <>
            <span className="btn-spinner"></span>
            <span>Subscribing...</span>
          </>
        ) : (
          'Subscribe'
        )}
      </button>
    </form>
  );
}

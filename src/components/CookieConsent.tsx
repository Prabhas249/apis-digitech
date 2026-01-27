'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-content">
        <div className="cookie-text">
          <p>
            We use cookies to enhance your experience and analyze site traffic.
            By continuing, you agree to our{' '}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </div>
        <div className="cookie-actions">
          <button onClick={handleDecline} className="cookie-btn cookie-btn--decline">
            Decline
          </button>
          <button onClick={handleAccept} className="cookie-btn cookie-btn--accept">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

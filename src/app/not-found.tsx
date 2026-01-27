'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="error-page">
      <div className="error-content">
        <div className="error-code">404</div>
        <h1 className="error-title">Page Not Found</h1>
        <p className="error-desc">
          Sorry, the page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="error-buttons">
          <Link href="/" className="btn btn--primary">
            Go to Homepage
          </Link>
          <Link href="/contact" className="btn btn--outline">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}

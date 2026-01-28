'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function PrivacyPolicyPage() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navigation */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link href="/" className="nav-brand">
            <div className="brand-mark">A</div>
            <span className="brand-text">Apis Digitech</span>
          </Link>
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
          <div className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <Link href="/" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/why-us" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Why Us?</Link>
            <div
              className="nav-dropdown"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="nav-item nav-item--dropdown" onClick={() => setServicesOpen(!servicesOpen)}>
                Services
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {servicesOpen && (
                <div className="nav-dropdown-menu">
                  <Link href="/services/seo" className="nav-dropdown-item" onClick={() => setMobileMenuOpen(false)}>SEO Services</Link>
                  <Link href="/services/aeo" className="nav-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Answer Engine Optimization</Link>
                  <Link href="/services/geo" className="nav-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Generative Engine Optimization</Link>
                  <Link href="/services/link-building" className="nav-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Link Building</Link>
                  <Link href="/services/content-marketing" className="nav-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Content Marketing</Link>
                  <Link href="/services/video-editing" className="nav-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Video Editing</Link>
                </div>
              )}
            </div>
            <Link href="/contact" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <Link href="/blog" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            <Link href="/reviews" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Reviews</Link>
            <Link href="/pricing" className="nav-item nav-item--cta" onClick={() => setMobileMenuOpen(false)}>View Plans</Link>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <section className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">Privacy Policy</h1>
          <p className="page-desc">Last updated: January 2026</p>
        </div>
      </section>

      {/* Content */}
      <article className="legal-content">
        <h2>1. Introduction</h2>
        <p>
          Apis Digitech ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
        </p>

        <h2>2. Information We Collect</h2>
        <h3>Personal Information</h3>
        <p>We may collect personal information that you voluntarily provide to us, including:</p>
        <ul>
          <li>Name and contact information (email address, phone number)</li>
          <li>Company name and job title</li>
          <li>Website URL</li>
          <li>Payment information (processed securely through third-party providers)</li>
          <li>Any other information you choose to provide</li>
        </ul>

        <h3>Automatically Collected Information</h3>
        <p>When you visit our website, we may automatically collect:</p>
        <ul>
          <li>IP address and browser type</li>
          <li>Device information</li>
          <li>Pages visited and time spent on pages</li>
          <li>Referring website addresses</li>
          <li>Geographic location (country/city level)</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, operate, and maintain our services</li>
          <li>Respond to your inquiries and provide customer support</li>
          <li>Send you marketing communications (with your consent)</li>
          <li>Analyze website usage and improve our services</li>
          <li>Protect against fraudulent or illegal activity</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2>4. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
        </p>

        <h2>5. Third-Party Services</h2>
        <p>
          We may use third-party services such as Google Analytics, payment processors, and email marketing platforms. These services have their own privacy policies, and we encourage you to review them.
        </p>

        <h2>6. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2>7. Your Rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Access the personal information we hold about you</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your personal information</li>
          <li>Object to or restrict processing of your data</li>
          <li>Data portability</li>
          <li>Withdraw consent at any time</li>
        </ul>

        <h2>8. Children's Privacy</h2>
        <p>
          Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
        </p>

        <h2>9. Changes to This Privacy Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          If you have any questions about this privacy policy, please contact us at:
        </p>
        <p>
          <strong>Email:</strong> support@apisdigitech.com<br/>
          <strong>Address:</strong> 30 N Gould St Ste R, Sheridan, WY 82801
        </p>
      </article>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-about">
            <h4>About Apis Digitech</h4>
            <p>Apis Digitech is all about equipping businesses with the best tools to help them prepare for the ride ahead.</p>
          </div>
          <div className="footer-column">
            <h4>Important Links</h4>
            <div className="footer-links">
              <Link href="/pricing">Pricing</Link>
              <Link href="/services/seo">SEO Services</Link>
              <Link href="/why-us">Why Us</Link>
              <Link href="/blog">Blog</Link>
            </div>
          </div>
          <div className="footer-column">
            <h4>Quick Contact</h4>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>support@apisdigitech.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-brand">
            <div className="brand-mark">A</div>
            <span className="brand-text">Apis Digitech</span>
          </div>
          <span className="footer-copy">© 2026 Apis Digitech | All Rights Reserved.</span>
          <div className="footer-legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms And Conditions</Link>
          </div>
        </div>
      </footer>
    </>
  );
}

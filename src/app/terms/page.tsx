'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TermsPage() {
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
          <h1 className="page-title">Terms and Conditions</h1>
          <p className="page-desc">Last updated: January 2026</p>
        </div>
      </section>

      {/* Content */}
      <article className="legal-content">
        <h2>1. Agreement to Terms</h2>
        <p>
          By accessing or using the services provided by Apis Digitech ("Company," "we," "our," or "us"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
        </p>

        <h2>2. Services Description</h2>
        <p>
          Apis Digitech provides digital marketing services including but not limited to Search Engine Optimization (SEO), Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), link building, and content marketing services.
        </p>

        <h2>3. Service Agreements</h2>
        <p>
          Specific service agreements, including scope of work, deliverables, timelines, and pricing, will be outlined in separate proposals or contracts. These agreements supplement these general terms and conditions.
        </p>

        <h2>4. Payment Terms</h2>
        <ul>
          <li>Payment terms are as specified in individual service agreements</li>
          <li>Invoices are due upon receipt unless otherwise stated</li>
          <li>Late payments may incur additional fees</li>
          <li>Services may be suspended for non-payment</li>
        </ul>

        <h2>5. Client Responsibilities</h2>
        <p>Clients agree to:</p>
        <ul>
          <li>Provide accurate and timely information needed for service delivery</li>
          <li>Grant necessary access to websites, analytics, and other tools</li>
          <li>Review and provide feedback on deliverables in a timely manner</li>
          <li>Ensure content provided does not infringe on third-party rights</li>
          <li>Maintain compliance with applicable laws and regulations</li>
        </ul>

        <h2>6. Intellectual Property</h2>
        <p>
          Unless otherwise specified in writing, intellectual property created during the engagement belongs to the client upon full payment. We retain the right to showcase work in our portfolio unless confidentiality is requested.
        </p>

        <h2>7. Confidentiality</h2>
        <p>
          Both parties agree to keep confidential any proprietary information shared during the engagement. This obligation survives termination of services.
        </p>

        <h2>8. No Guarantees</h2>
        <p>
          While we employ industry best practices and proven strategies, we cannot guarantee specific rankings, traffic increases, or other results. Search engine algorithms and AI systems are beyond our control and subject to change.
        </p>

        <h2>9. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Apis Digitech shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or relating to our services.
        </p>

        <h2>10. Termination</h2>
        <p>
          Either party may terminate services with 30 days written notice, unless otherwise specified in the service agreement. Upon termination, the client is responsible for payment of all work completed.
        </p>

        <h2>11. Governing Law</h2>
        <p>
          These terms shall be governed by and construed in accordance with the laws of the State of Texas, United States, without regard to conflict of law principles.
        </p>

        <h2>12. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.
        </p>

        <h2>13. Contact</h2>
        <p>
          For questions about these terms, please contact us at:
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

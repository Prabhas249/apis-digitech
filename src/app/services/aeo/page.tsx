'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AEOServicePage() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: 'Featured Snippet Optimization',
      desc: 'Strategic content structuring to capture featured snippets and position zero in search results.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ),
    },
    {
      title: 'Voice Search Optimization',
      desc: 'Optimize for conversational queries and voice assistants like Alexa, Siri, and Google Assistant.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/>
        </svg>
      ),
    },
    {
      title: 'FAQ Schema Implementation',
      desc: 'Structured data markup to help search engines understand and display your Q&A content.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>
        </svg>
      ),
    },
    {
      title: 'People Also Ask Targeting',
      desc: 'Identify and optimize for high-value "People Also Ask" questions in your niche.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
    },
    {
      title: 'Knowledge Panel Strategy',
      desc: 'Build entity authority to appear in Google Knowledge Panels and info boxes.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M3 9h18M9 21V9"/>
        </svg>
      ),
    },
    {
      title: 'Answer Quality Optimization',
      desc: 'Content refinement to provide clear, concise answers that search engines prefer.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Navigation */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link href="/" className="nav-brand">
            <div className="brand-mark">A</div>
            <span className="brand-text">Apis Digitech</span>
          </Link>
          {/* Mobile Menu Button */}
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
      <section className="page-header page-header--with-visual">
        <div className="page-header-content">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="breadcrumb-separator">/</span>
              <Link href="/services">Services</Link>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">AEO</span>
            </nav>
            <span className="section-tag">AEO Services</span>
          <h1 className="page-title">Answer Engine <span className="text-blue">Optimization</span></h1>
          <p className="page-desc">
            Get your content featured in answer boxes, voice search results, and AI-generated responses. Optimize for the future of search.
          </p>
          <div className="page-header-cta">
            <Link href="/contact" className="btn btn--primary btn--large">
              Get Free AEO Audit
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/pricing" className="btn btn--ghost">View Packages</Link>
          </div>
        </div>
        <div className="page-header-visual">
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none" className="service-illustration">
            <circle cx="150" cy="150" r="120" stroke="url(#gradAeo1)" strokeWidth="2" strokeDasharray="8 4"/>
            <circle cx="150" cy="150" r="90" stroke="url(#gradAeo1)" strokeWidth="3"/>
            <circle cx="150" cy="150" r="60" fill="url(#gradAeo2)" opacity="0.1"/>
            <circle cx="150" cy="150" r="40" fill="url(#gradAeo2)"/>
            <circle cx="150" cy="80" r="20" fill="#2563eb" opacity="0.2" className="float-circle"/>
            <circle cx="220" cy="150" r="15" fill="#2563eb" opacity="0.3" className="float-circle"/>
            <circle cx="150" cy="220" r="18" fill="#2563eb" opacity="0.25" className="float-circle"/>
            <circle cx="80" cy="150" r="12" fill="#2563eb" opacity="0.2" className="float-circle"/>
            <text x="150" y="155" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">?</text>
            <defs>
              <linearGradient id="gradAeo1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb"/>
                <stop offset="100%" stopColor="#7c3aed"/>
              </linearGradient>
              <linearGradient id="gradAeo2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb"/>
                <stop offset="100%" stopColor="#3b82f6"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* What is AEO */}
      <section className="service-intro-section">
        <div className="service-intro-content">
          <h2 className="section-title">What is Answer Engine Optimization?</h2>
          <p className="service-intro-text">
            Answer Engine Optimization (AEO) is the practice of optimizing your content to appear in direct answer formats across search engines and AI assistants. As more users expect instant answers rather than lists of links, AEO has become critical for maintaining visibility.
          </p>
          <p className="service-intro-text">
            AEO focuses on featured snippets, voice search, "People Also Ask" boxes, and knowledge panels—the prime real estate that captures user attention before traditional organic results.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="service-features-section">
        <h2 className="section-title">AEO Services We Offer</h2>
        <p className="section-subtitle">Comprehensive strategies to get your content featured as the answer</p>
        <div className="service-features-grid">
          {features.map((feature, i) => (
            <div key={i} className="service-feature-card">
              <div className="service-feature-icon">{feature.icon}</div>
              <h3 className="service-feature-title">{feature.title}</h3>
              <p className="service-feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">40+</span>
            <span className="stat-label">Featured Snippets Won</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">65%</span>
            <span className="stat-label">Voice Search Visibility</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">3x</span>
            <span className="stat-label">Click-Through Rate</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">90%</span>
            <span className="stat-label">Client Satisfaction</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to be the answer?</h2>
          <p className="cta-desc">
            Position your brand as the authoritative source in featured snippets and voice search.
          </p>
          <div className="cta-buttons">
            <Link href="/pricing" className="btn btn--primary">View AEO Packages</Link>
            <Link href="/contact" className="btn btn--outline">Get Free Consultation</Link>
          </div>
        </div>
      </section>

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
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span>30 N Gould St Ste R, Sheridan, WY 82801</span>
              </div>
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

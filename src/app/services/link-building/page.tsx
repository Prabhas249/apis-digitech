'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LinkBuildingPage() {
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
      title: 'Editorial Link Building',
      desc: 'Earn high-quality backlinks through compelling content that publications want to reference.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
        </svg>
      ),
    },
    {
      title: 'Guest Posting',
      desc: 'Strategic guest article placements on authoritative websites in your industry.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
      ),
    },
    {
      title: 'Digital PR',
      desc: 'Leverage newsworthy content to earn backlinks from major publications and news sites.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
          <path d="M18 14h-8M15 18h-5M10 6h8v4h-8V6z"/>
        </svg>
      ),
    },
    {
      title: 'Resource Link Building',
      desc: 'Create valuable resources that naturally attract links from industry websites.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
        </svg>
      ),
    },
    {
      title: 'Broken Link Building',
      desc: 'Find and replace broken links on relevant sites with links to your quality content.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/>
        </svg>
      ),
    },
    {
      title: 'Competitor Analysis',
      desc: 'Analyze competitor backlink profiles to identify and replicate their best links.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
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
            <Link href="/pricing" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
            <Link href="/blog" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            <Link href="/reviews" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Reviews</Link>
            <Link href="/contact" className="nav-item nav-item--cta" onClick={() => setMobileMenuOpen(false)}>Contact us</Link>
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
              <span className="breadcrumb-current">Link Building</span>
            </nav>
            <span className="section-tag">Link Building</span>
          <h1 className="page-title">Quality <span className="text-blue">Link Building</span> Services</h1>
          <p className="page-desc">
            Build domain authority with high-quality, white-hat backlinks from relevant, authoritative websites in your industry.
          </p>
          <div className="page-header-cta">
            <Link href="/contact" className="btn btn--primary btn--large">
              Get Free Quote
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/pricing" className="btn btn--ghost">View Pricing</Link>
          </div>
        </div>
        <div className="page-header-visual">
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none" className="service-illustration">
            <circle cx="150" cy="150" r="120" stroke="url(#gradLink1)" strokeWidth="2" strokeDasharray="8 4"/>
            <circle cx="150" cy="150" r="90" stroke="url(#gradLink1)" strokeWidth="3"/>
            <circle cx="150" cy="150" r="60" fill="url(#gradLink2)" opacity="0.1"/>
            <circle cx="150" cy="150" r="40" fill="url(#gradLink2)"/>
            <circle cx="150" cy="80" r="20" fill="#2563eb" opacity="0.2" className="float-circle"/>
            <circle cx="220" cy="150" r="15" fill="#2563eb" opacity="0.3" className="float-circle"/>
            <circle cx="150" cy="220" r="18" fill="#2563eb" opacity="0.25" className="float-circle"/>
            <circle cx="80" cy="150" r="12" fill="#2563eb" opacity="0.2" className="float-circle"/>
            <path d="M135 145a10 10 0 0 1 10-10h10a10 10 0 0 1 0 20h-10a10 10 0 0 1-10-10z" stroke="white" strokeWidth="2.5" fill="none"/>
            <path d="M155 155l8 8" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <defs>
              <linearGradient id="gradLink1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb"/>
                <stop offset="100%" stopColor="#10b981"/>
              </linearGradient>
              <linearGradient id="gradLink2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb"/>
                <stop offset="100%" stopColor="#059669"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="service-features-section">
        <h2 className="section-title">Our Link Building Services</h2>
        <p className="section-subtitle">Strategic backlink acquisition that drives rankings</p>
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
            <span className="stat-number">10K+</span>
            <span className="stat-label">Links Built</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">65+</span>
            <span className="stat-label">Avg Domain Authority</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">White Hat Methods</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Publisher Relationships</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to build authority?</h2>
          <p className="cta-desc">
            Start earning high-quality backlinks that move the needle for your rankings.
          </p>
          <div className="cta-buttons">
            <Link href="/pricing" className="btn btn--primary">View Packages</Link>
            <Link href="/contact" className="btn btn--outline">Get Free Quote</Link>
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
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>hello@apisdigitech.com</span>
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

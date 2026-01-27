'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SEOServicePage() {
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
      title: 'Technical SEO Audit',
      desc: 'Comprehensive analysis of your website\'s technical health including site speed, mobile-friendliness, crawlability, and indexation issues.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
      ),
    },
    {
      title: 'Keyword Research & Strategy',
      desc: 'In-depth keyword research to identify high-value opportunities and create a strategic content plan for maximum organic visibility.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
        </svg>
      ),
    },
    {
      title: 'On-Page Optimization',
      desc: 'Optimization of title tags, meta descriptions, headers, content, internal linking, and schema markup for better rankings.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
        </svg>
      ),
    },
    {
      title: 'Link Building',
      desc: 'Strategic acquisition of high-quality backlinks through content marketing, digital PR, and outreach campaigns.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
        </svg>
      ),
    },
    {
      title: 'Content Strategy',
      desc: 'Development of SEO-optimized content that attracts, engages, and converts your target audience.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
      ),
    },
    {
      title: 'Reporting & Analytics',
      desc: 'Regular performance reports with actionable insights on rankings, traffic, conversions, and ROI.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 20V10M18 20V4M6 20v-4"/>
        </svg>
      ),
    },
  ];

  const process = [
    { step: '01', title: 'Discovery & Audit', desc: 'We analyze your current SEO performance, competitors, and market opportunities.' },
    { step: '02', title: 'Strategy Development', desc: 'We create a customized SEO strategy aligned with your business goals.' },
    { step: '03', title: 'Implementation', desc: 'Our team executes the strategy across technical, on-page, and off-page SEO.' },
    { step: '04', title: 'Monitor & Optimize', desc: 'We continuously monitor results and optimize for maximum performance.' },
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
            <span className="breadcrumb-current">SEO</span>
          </nav>
          <span className="section-tag">SEO Services</span>
          <h1 className="page-title">Search Engine <span className="text-blue">Optimization</span></h1>
          <p className="page-desc">
            Drive sustainable organic growth with our comprehensive SEO services. We help businesses rank higher, attract more qualified traffic, and convert visitors into customers.
          </p>
          <div className="page-header-cta">
            <Link href="/contact" className="btn btn--primary btn--large">
              Get Free SEO Audit
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/pricing" className="btn btn--ghost">View Pricing</Link>
          </div>
        </div>
        <div className="page-header-visual">
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none" className="service-illustration">
            <circle cx="150" cy="150" r="120" stroke="url(#grad1)" strokeWidth="2" strokeDasharray="8 4"/>
            <circle cx="150" cy="150" r="90" stroke="url(#grad1)" strokeWidth="3"/>
            <circle cx="150" cy="150" r="60" fill="url(#grad2)" opacity="0.1"/>
            <circle cx="150" cy="150" r="40" fill="url(#grad2)"/>
            <circle cx="150" cy="80" r="20" fill="#2563eb" opacity="0.2"/>
            <circle cx="220" cy="150" r="15" fill="#2563eb" opacity="0.3"/>
            <circle cx="150" cy="220" r="18" fill="#2563eb" opacity="0.25"/>
            <circle cx="80" cy="150" r="12" fill="#2563eb" opacity="0.2"/>
            <path d="M140 140l8 8 15-15" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb"/>
                <stop offset="100%" stopColor="#7c3aed"/>
              </linearGradient>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb"/>
                <stop offset="100%" stopColor="#3b82f6"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="service-features-section">
        <h2 className="section-title">What's Included</h2>
        <p className="section-subtitle">Comprehensive SEO solutions to boost your online visibility</p>
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

      {/* Process */}
      <section className="service-process-section">
        <h2 className="section-title">Our SEO Process</h2>
        <p className="section-subtitle">A proven methodology for sustainable SEO success</p>
        <div className="service-process-grid">
          {process.map((item, i) => (
            <div key={i} className="service-process-step">
              <div className="service-process-number">{item.step}</div>
              <h3 className="service-process-title">{item.title}</h3>
              <p className="service-process-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">340%</span>
            <span className="stat-label">Avg Traffic Increase</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">85%</span>
            <span className="stat-label">Page 1 Rankings</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">5x</span>
            <span className="stat-label">Average ROI</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">94%</span>
            <span className="stat-label">Client Retention</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to dominate search results?</h2>
          <p className="cta-desc">
            Get a free SEO audit and discover exactly what's holding your website back.
          </p>
          <div className="cta-buttons">
            <Link href="/pricing" className="btn btn--primary">View SEO Packages</Link>
            <Link href="/contact" className="btn btn--outline">Get Free Audit</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-about">
            <h4>About Apis Digitech</h4>
            <p>
              Apis Digitech is all about equipping businesses with the best tools to help them prepare for the ride ahead.
            </p>
          </div>
          <div className="footer-column">
            <h4>Important Links</h4>
            <div className="footer-links">
              <Link href="/pricing">Pricing</Link>
              <Link href="/services/seo">SEO Services</Link>
              <Link href="/why-us">Why Us</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/reviews">Reviews</Link>
            </div>
          </div>
          <div className="footer-column">
            <h4>Quick Contact Info</h4>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Texas, USA</span>
              </div>
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

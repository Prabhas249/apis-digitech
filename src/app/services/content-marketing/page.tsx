'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ContentMarketingPage() {
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
      title: 'Content Strategy',
      desc: 'Data-driven content planning aligned with your business goals and target audience.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
        </svg>
      ),
    },
    {
      title: 'Blog Content Creation',
      desc: 'SEO-optimized blog posts that attract organic traffic and establish thought leadership.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
      ),
    },
    {
      title: 'Pillar & Cluster Content',
      desc: 'Comprehensive topic clusters that establish topical authority and improve rankings.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/>
        </svg>
      ),
    },
    {
      title: 'Landing Page Copy',
      desc: 'Conversion-focused landing page content that turns visitors into customers.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M3 9h18M9 21V9"/>
        </svg>
      ),
    },
    {
      title: 'Case Studies & Whitepapers',
      desc: 'In-depth content that showcases your expertise and generates qualified leads.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
        </svg>
      ),
    },
    {
      title: 'Content Refresh',
      desc: 'Update and optimize existing content to improve rankings and relevance.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
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
              <span className="breadcrumb-current">Content Marketing</span>
            </nav>
            <span className="section-tag">Content Marketing</span>
          <h1 className="page-title">Strategic <span className="text-blue">Content Marketing</span></h1>
          <p className="page-desc">
            Create content that attracts, engages, and converts. From strategy to execution, we help you build a content engine that drives results.
          </p>
          <div className="page-header-cta">
            <Link href="/contact" className="btn btn--primary btn--large">
              Get Free Strategy
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/pricing" className="btn btn--ghost">View Pricing</Link>
          </div>
        </div>
        <div className="page-header-visual">
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none" className="service-illustration">
            <circle cx="150" cy="150" r="120" stroke="url(#gradContent1)" strokeWidth="2" strokeDasharray="8 4"/>
            <circle cx="150" cy="150" r="90" stroke="url(#gradContent1)" strokeWidth="3"/>
            <circle cx="150" cy="150" r="60" fill="url(#gradContent2)" opacity="0.1"/>
            <circle cx="150" cy="150" r="40" fill="url(#gradContent2)"/>
            <circle cx="150" cy="80" r="20" fill="#f59e0b" opacity="0.2" className="float-circle"/>
            <circle cx="220" cy="150" r="15" fill="#f59e0b" opacity="0.3" className="float-circle"/>
            <circle cx="150" cy="220" r="18" fill="#f59e0b" opacity="0.25" className="float-circle"/>
            <circle cx="80" cy="150" r="12" fill="#f59e0b" opacity="0.2" className="float-circle"/>
            <path d="M140 140h20M140 150h15M140 160h20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <defs>
              <linearGradient id="gradContent1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b"/>
                <stop offset="100%" stopColor="#2563eb"/>
              </linearGradient>
              <linearGradient id="gradContent2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b"/>
                <stop offset="100%" stopColor="#d97706"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="service-features-section">
        <h2 className="section-title">Content Marketing Services</h2>
        <p className="section-subtitle">Content that ranks, engages, and converts</p>
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
            <span className="stat-number">5K+</span>
            <span className="stat-label">Articles Published</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">280%</span>
            <span className="stat-label">Avg Traffic Increase</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Expert Writers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">3x</span>
            <span className="stat-label">Lead Generation</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to scale your content?</h2>
          <p className="cta-desc">
            Let's build a content strategy that drives organic growth and establishes your authority.
          </p>
          <div className="cta-buttons">
            <Link href="/pricing" className="btn btn--primary">View Packages</Link>
            <Link href="/contact" className="btn btn--outline">Get Free Strategy</Link>
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

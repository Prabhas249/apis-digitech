'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function WebDevelopmentServicePage() {
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
      title: 'Custom Website Design',
      desc: 'Unique, visually stunning designs tailored to your brand identity. We create responsive, mobile-first websites that look great on all devices.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M3 9h18M9 21V9"/>
        </svg>
      ),
    },
    {
      title: 'E-Commerce Solutions',
      desc: 'Powerful online stores with secure payment integration, inventory management, and seamless checkout experiences that drive conversions.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
      ),
    },
    {
      title: 'Web Applications',
      desc: 'Full-stack web applications with modern frameworks like React, Next.js, and Node.js. Scalable solutions for complex business requirements.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M16 18l6-6-6-6"/>
          <path d="M8 6l-6 6 6 6"/>
        </svg>
      ),
    },
    {
      title: 'CMS Development',
      desc: 'User-friendly content management systems that let you update your website easily. WordPress, custom CMS, or headless solutions.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 20h9"/>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
      ),
    },
    {
      title: 'Performance Optimization',
      desc: 'Fast-loading websites optimized for Core Web Vitals. We ensure your site scores high on speed tests and provides excellent user experience.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      ),
    },
    {
      title: 'Maintenance & Support',
      desc: 'Ongoing website maintenance, security updates, backups, and technical support to keep your website running smoothly 24/7.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      ),
    },
  ];

  const process = [
    { step: '01', title: 'Discovery', desc: 'We learn about your business, goals, target audience, and requirements to create the perfect strategy.' },
    { step: '02', title: 'Design', desc: 'Our designers create wireframes and mockups, refining until you\'re delighted with the look and feel.' },
    { step: '03', title: 'Development', desc: 'Our developers bring the designs to life with clean, efficient code and modern technologies.' },
    { step: '04', title: 'Launch', desc: 'Thorough testing, optimization, and deployment. We ensure everything works perfectly before going live.' },
  ];

  return (
    <>
      {/* Navigation */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link href="/" className="nav-brand">
            <img src="/logo.png" alt="Apis Digitech" className="brand-logo" />
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
                  <Link href="/services/web-development" className="nav-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Web Development</Link>
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
            <span className="breadcrumb-current">Web Development</span>
          </nav>
          <span className="section-tag">Web Development Services</span>
          <h1 className="page-title">Professional <span className="text-blue">Web Development</span></h1>
          <p className="page-desc">
            Build a powerful online presence with our custom web development services. From stunning landing pages to complex web applications, we create websites that drive results and grow your business.
          </p>
          <div className="page-header-cta">
            <Link href="/contact" className="btn btn--primary btn--large">
              Get Started
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
            <rect x="100" y="100" width="100" height="75" rx="8" fill="url(#grad2)"/>
            <rect x="110" y="110" width="80" height="10" rx="2" fill="white" opacity="0.3"/>
            <rect x="110" y="130" width="30" height="35" rx="2" fill="white" opacity="0.5"/>
            <rect x="150" y="130" width="30" height="35" rx="2" fill="white" opacity="0.5"/>
            <path d="M140 195l10-15 10 15" stroke="white" strokeWidth="2" fill="none"/>
            <circle cx="150" cy="80" r="20" fill="#2563eb" opacity="0.2"/>
            <circle cx="220" cy="150" r="15" fill="#2563eb" opacity="0.3"/>
            <circle cx="150" cy="220" r="18" fill="#2563eb" opacity="0.25"/>
            <circle cx="80" cy="150" r="12" fill="#2563eb" opacity="0.2"/>
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
        <h2 className="section-title">What We Offer</h2>
        <p className="section-subtitle">End-to-end web development solutions for businesses of all sizes</p>
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
        <h2 className="section-title">Our Development Process</h2>
        <p className="section-subtitle">A proven methodology for delivering successful web projects</p>
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

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to build your dream website?</h2>
          <p className="cta-desc">
            Let's create a website that stands out and drives real business results.
          </p>
          <div className="cta-buttons">
            <Link href="/pricing" className="btn btn--primary">View Packages</Link>
            <Link href="/contact" className="btn btn--outline">Get Quote</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-about">
            <Link href="/" className="footer-brand-link">
              <img src="/logo.png" alt="Apis Digitech" className="footer-logo" />
            </Link>
            <p>
              Apis Digitech is all about equipping businesses with the best tools to help them prepare for the ride ahead.
            </p>
          </div>
          <div className="footer-column">
            <h4>Important Links</h4>
            <div className="footer-links">
              <Link href="/pricing">Pricing</Link>
              <Link href="/services/seo">SEO Services</Link>
              <Link href="/services/web-development">Web Development</Link>
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

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function WhyUsPage() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const reasons = [
    {
      title: 'Client First Approach',
      desc: 'Your satisfaction is our priority. Not only are we easy to work with, but we also work hard to deliver the best results possible. We treat every client as a partner in success.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
    },
    {
      title: 'Digital Era Experts',
      desc: 'Our SEO company has world-class online marketing capabilities and experts with years of experience to partner in your journey to the top of Google Search and AI platforms.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
        </svg>
      ),
    },
    {
      title: 'Proven Efficiency',
      desc: 'Proven efficiency and quality-driven development methodology gained through millions of man hours and hundreds of successful projects across diverse industries.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      ),
    },
    {
      title: 'Right Size Agency',
      desc: 'We are a search engine optimization agency providing services with the capabilities of a large organization and the agility of a small start-up. Best of both worlds.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M3 9h18M9 21V9"/>
        </svg>
      ),
    },
    {
      title: 'Strategic Partnerships',
      desc: 'Our services are being utilized by leading firms that rely on our SEO expertise for long-term growth and revenue generation. We build lasting relationships.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    {
      title: 'Excellent Support',
      desc: 'As your trusted SEO company, we are always there to provide promising solutions during each phase of the project. 24/7 support and regular communication.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
    },
  ];

  const certifications = [
    { name: 'Google Partner', desc: 'Certified Google Ads Partner' },
    { name: 'SEMrush Certified', desc: 'SEO Toolkit Certification' },
    { name: 'HubSpot Partner', desc: 'Inbound Marketing Certified' },
    { name: 'Ahrefs Certified', desc: 'SEO Professional Certification' },
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
      <section className="page-header">
        <div className="page-header-content">
          <span className="section-tag">Why Choose Us</span>
          <h1 className="page-title">The SEO Company That <span className="text-blue">Delivers Results</span></h1>
          <p className="page-desc">
            We're not just another SEO agency. We're your strategic partner in digital growth, combining expertise, innovation, and dedication to help you succeed.
          </p>
        </div>
      </section>

      {/* Why Reasons Grid */}
      <section className="why-reasons-section">
        <div className="why-reasons-grid">
          {reasons.map((reason, i) => (
            <div key={i} className="why-reason-card">
              <div className="why-reason-icon">{reason.icon}</div>
              <h3 className="why-reason-title">{reason.title}</h3>
              <p className="why-reason-desc">{reason.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-content">
          <h2 className="section-title">Our Mission</h2>
          <p className="mission-text">
            At Apis Digitech, our mission is simple: help businesses thrive in the digital age. We believe that every business deserves to be found online, and we're committed to making that happen through innovative SEO strategies, cutting-edge AI optimization, and genuine partnership with our clients.
          </p>
          <p className="mission-text">
            We stay ahead of the curve by constantly evolving our strategies to match the changing landscape of search—from traditional SEO to Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO). When AI changes how people find information, we're already optimizing for it.
          </p>
        </div>
      </section>

      {/* Certifications */}
      <section className="certifications-section">
        <h2 className="section-title">Certifications & Partnerships</h2>
        <p className="section-subtitle">Trusted by industry leaders and certified by the best</p>
        <div className="certifications-grid">
          {certifications.map((cert, i) => (
            <div key={i} className="certification-card">
              <div className="certification-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="7"/>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                </svg>
              </div>
              <h3 className="certification-name">{cert.name}</h3>
              <p className="certification-desc">{cert.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Projects Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">94%</span>
            <span className="stat-label">Client Retention Rate</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">8+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">45+</span>
            <span className="stat-label">Team Members</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to grow your business?</h2>
          <p className="cta-desc">
            Let's discuss how our expertise can help you achieve your digital marketing goals.
          </p>
          <div className="cta-buttons">
            <Link href="/pricing" className="btn btn--primary">View Packages</Link>
            <Link href="/contact" className="btn btn--outline">Get Free Consultation</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-about">
            <h4>About Apis Digitech</h4>
            <p>
              Apis Digitech is all about equipping businesses with the best tools to help them prepare for the ride ahead. Whether it is traditional SEO or cutting-edge AI optimization, it is imperative to align your company with a team that can navigate through digital challenges.
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
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>support@apisdigitech.com</span>
              </div>
              <div className="footer-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span>30 N Gould St Ste R, Sheridan, WY 82801</span>
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

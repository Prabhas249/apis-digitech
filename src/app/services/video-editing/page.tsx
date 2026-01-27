'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function VideoEditingServicePage() {
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
      title: 'Social Media Videos',
      desc: 'Engaging short-form content optimized for TikTok, Instagram Reels, YouTube Shorts, and other social platforms to maximize reach and engagement.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="2" width="20" height="20" rx="5"/>
          <path d="M10 8l6 4-6 4V8z"/>
        </svg>
      ),
    },
    {
      title: 'Corporate Videos',
      desc: 'Professional company profiles, training videos, internal communications, and presentations that reflect your brand identity.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/>
        </svg>
      ),
    },
    {
      title: 'Marketing Videos',
      desc: 'Compelling advertisements, promotional content, and product demos designed to drive conversions and boost your marketing campaigns.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 20V10M18 20V4M6 20v-4"/>
          <circle cx="12" cy="6" r="2"/>
        </svg>
      ),
    },
    {
      title: 'YouTube Content',
      desc: 'Long-form video editing, eye-catching thumbnails, custom intros and outros, and channel branding to grow your YouTube presence.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
          <path d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z"/>
        </svg>
      ),
    },
    {
      title: 'Motion Graphics',
      desc: 'Animated logos, lower thirds, kinetic typography, smooth transitions, and visual effects that bring your videos to life.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      ),
    },
    {
      title: 'Color Grading & Audio',
      desc: 'Professional color correction, cinematic grading, sound design, audio mixing, and music synchronization for polished final output.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 2a10 10 0 0 1 0 20"/>
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 8v8M8 12h8"/>
        </svg>
      ),
    },
  ];

  const process = [
    { step: '01', title: 'Consultation', desc: 'We discuss your vision, goals, target audience, and project requirements to ensure alignment.' },
    { step: '02', title: 'Editing', desc: 'Our professional editors bring your footage to life with expert cuts, transitions, and effects.' },
    { step: '03', title: 'Review', desc: 'You review the draft and provide feedback for refinements until you\'re completely satisfied.' },
    { step: '04', title: 'Delivery', desc: 'We deliver your final video in all required formats optimized for your intended platforms.' },
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
            <span className="breadcrumb-current">Video Editing</span>
          </nav>
          <span className="section-tag">Video Editing Services</span>
          <h1 className="page-title">Professional Video <span className="text-blue">Editing Services</span></h1>
          <p className="page-desc">
            Transform your raw footage into compelling visual stories. Our professional video editing services help businesses, content creators, and brands create engaging videos for social media, marketing campaigns, corporate communications, and more.
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
            <rect x="110" y="110" width="80" height="60" rx="8" fill="url(#grad2)"/>
            <polygon points="140,130 140,160 165,145" fill="white"/>
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
        <h2 className="section-title">What's Included</h2>
        <p className="section-subtitle">Comprehensive video editing solutions for every platform and purpose</p>
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
        <h2 className="section-title">Our Editing Process</h2>
        <p className="section-subtitle">A streamlined workflow designed for quality and efficiency</p>
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
          <h2 className="cta-title">Ready to bring your vision to life?</h2>
          <p className="cta-desc">
            Let's create stunning videos that captivate your audience and drive results.
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

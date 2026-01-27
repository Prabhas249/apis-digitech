'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import AnimatedCounter from '@/components/AnimatedCounter';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ url: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    alert('Thank you! We\'ll send your free SEO audit report shortly.');
    setFormData({ url: '', email: '', phone: '' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Navigation */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
        <div className="nav-container">
          <Link href="/" className="nav-brand">
            <div className="brand-mark">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
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
            <Link href="/" className="nav-item active" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/why-us" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Why Us?</Link>
            <div
              className="nav-dropdown"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="nav-item nav-item--dropdown">
                Services
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {servicesOpen && (
              <div className="nav-dropdown-menu">
                <Link href="/services/seo" className="nav-dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                  <span className="dropdown-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                  </span>
                  SEO Services
                </Link>
                <Link href="/services/aeo" className="nav-dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                  <span className="dropdown-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>
                    </svg>
                  </span>
                  Answer Engine Optimization
                </Link>
                <Link href="/services/geo" className="nav-dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                  <span className="dropdown-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M20 12a8 8 0 1 0-8 8"/>
                    </svg>
                  </span>
                  Generative Engine Optimization
                </Link>
                <Link href="/services/link-building" className="nav-dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                  <span className="dropdown-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                    </svg>
                  </span>
                  Link Building
                </Link>
                <Link href="/services/content-marketing" className="nav-dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                  <span className="dropdown-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                    </svg>
                  </span>
                  Content Marketing
                </Link>
                <Link href="/services/video-editing" className="nav-dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                  <span className="dropdown-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                    </svg>
                  </span>
                  Video Editing
                </Link>
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

      {/* Hero Section */}
      <main role="main">
      <section className="hero">
        {/* Animated Background with Glowing Orbs */}
        <div className="hero-bg">
          <div className="hero-bg-gradient"></div>
          <div className="hero-bg-pattern"></div>
          {/* Shadcn-style glowing orbs */}
          <div className="hero-bg-glow hero-bg-glow-1"></div>
          <div className="hero-bg-glow hero-bg-glow-2"></div>
          <div className="hero-floating-elements">
            <div className="floating-circle floating-circle-1"></div>
            <div className="floating-circle floating-circle-2"></div>
            <div className="floating-circle floating-circle-3"></div>
          </div>
        </div>

        <div className="hero-content animate-fade-in">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            #1 Rated SEO Agency in Texas
          </div>
          <h1 className="hero-title">
            Supercharge Your Revenue with{' '}
            <span className="hero-highlight">
              <span className="gradient-text">Outcome-Driven</span> SEO Services
            </span>
          </h1>
          <p className="hero-desc">
            Long-term growth and search engine optimization services go hand in hand! Leverage our proven SEO, AEO, and GEO strategies to boost your business visibility across traditional search and AI platforms.
          </p>
          <div className="hero-cta-row">
            <Link href="/pricing" className="btn btn--primary btn--large">
              <span>View Pricing</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/reviews" className="btn btn--ghost">
              See Client Results
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="hero-trust">
            <span className="hero-trust-label">Trusted by 500+ businesses</span>
            <div className="hero-trust-badges">
              <div className="trust-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span>Google Partner</span>
              </div>
              <div className="trust-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <span>4.9/5 Rating</span>
              </div>
              <div className="trust-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                </svg>
                <span>Award Winning</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-form-wrapper animate-slide-up">
          <div className="hero-form-card">
            <div className="hero-form-header">
              <div className="hero-form-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>
                </svg>
              </div>
              <h2 className="hero-form-title">Get Your Free SEO Audit</h2>
            </div>
            <p className="hero-form-desc">
              Discover your website's SEO score and get actionable insights in 30 seconds.
            </p>
            <form className="hero-form" onSubmit={handleSubmit} aria-label="Free SEO audit request form">
              <div className="hero-form-field">
                <label htmlFor="hero-url">Website URL</label>
                <div className="input-with-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  <input
                    type="url"
                    id="hero-url"
                    placeholder="https://yourwebsite.com"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    required
                    aria-label="Enter your website URL"
                  />
                </div>
              </div>
              <div className="hero-form-row">
                <div className="hero-form-field">
                  <label htmlFor="hero-email">Email</label>
                  <div className="input-with-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <input
                      type="email"
                      id="hero-email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      aria-label="Enter your email address"
                    />
                  </div>
                </div>
                <div className="hero-form-field">
                  <label htmlFor="hero-phone">Phone</label>
                  <div className="input-with-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <input
                      type="tel"
                      id="hero-phone"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      aria-label="Enter your phone number"
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className={`hero-form-btn ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Analyzing...
                  </>
                ) : (
                  <>
                    Get Free Audit
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
            <p className="hero-form-note">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Your data is secure. No spam, ever.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="trust-section">
        <div className="trust-content">
          <p className="trust-label">Trusted by industry leaders</p>
          <div className="trust-logos">
            <div className="trust-logo">
              <svg width="100" height="32" viewBox="0 0 100 32" fill="currentColor" opacity="0.5">
                <rect x="0" y="8" width="24" height="16" rx="2"/>
                <text x="30" y="22" fontSize="14" fontWeight="600">TechCorp</text>
              </svg>
            </div>
            <div className="trust-logo">
              <svg width="100" height="32" viewBox="0 0 100 32" fill="currentColor" opacity="0.5">
                <circle cx="12" cy="16" r="10"/>
                <text x="28" y="22" fontSize="14" fontWeight="600">Innovate</text>
              </svg>
            </div>
            <div className="trust-logo">
              <svg width="100" height="32" viewBox="0 0 100 32" fill="currentColor" opacity="0.5">
                <polygon points="12,2 22,16 12,30 2,16"/>
                <text x="28" y="22" fontSize="14" fontWeight="600">StartUp</text>
              </svg>
            </div>
            <div className="trust-logo">
              <svg width="100" height="32" viewBox="0 0 100 32" fill="currentColor" opacity="0.5">
                <rect x="2" y="6" width="20" height="20" rx="4"/>
                <text x="28" y="22" fontSize="14" fontWeight="600">Digital</text>
              </svg>
            </div>
            <div className="trust-logo">
              <svg width="100" height="32" viewBox="0 0 100 32" fill="currentColor" opacity="0.5">
                <path d="M12 2 L22 12 L12 22 L2 12 Z"/>
                <text x="28" y="22" fontSize="14" fontWeight="600">Growth</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-content">
          <span className="section-tag">Welcome</span>
          <h2 className="welcome-title">
            The One-Stop SEO Company You Need to{' '}
            <span className="gradient-text">Outperform Your Competition</span>
          </h2>
          <p className="welcome-desc">
            Out-of-the-box Thinking. World-Class SEO Capabilities. Result-Driven Strategies.
            This pretty much sums up why we are the leading SEO company. Let our professional
            SEO marketing expertise pave the way for your business success.
          </p>
        </div>
      </section>

      {/* Services Cards */}
      <section className="services-section">
        <div className="services-grid">
          <Link href="/services/seo" className="service-box">
            <div className="service-box-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <h3 className="service-box-title">Website Analysis</h3>
            <p className="service-box-desc">
              Comprehensive SEO audit to identify optimization opportunities and technical issues holding back your rankings.
            </p>
            <span className="service-box-link">
              Learn More
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>

          <Link href="/services/seo" className="service-box">
            <div className="service-box-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 20V10M18 20V4M6 20v-4"/>
              </svg>
            </div>
            <h3 className="service-box-title">SEO Strategy</h3>
            <p className="service-box-desc">
              Custom strategies combining on-page optimization, link building, and content marketing for sustainable growth.
            </p>
            <span className="service-box-link">
              Learn More
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>

          <Link href="/services/aeo" className="service-box">
            <div className="service-box-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>
              </svg>
            </div>
            <h3 className="service-box-title">AI Optimization</h3>
            <p className="service-box-desc">
              Get featured in AI-generated answers. Optimize for ChatGPT, Perplexity, and Google's AI overviews.
            </p>
            <span className="service-box-link">
              Learn More
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>

          <Link href="/services/link-building" className="service-box">
            <div className="service-box-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
            </div>
            <h3 className="service-box-title">Link Building</h3>
            <p className="service-box-desc">
              High-quality backlinks from authoritative sites to boost your domain authority and rankings.
            </p>
            <span className="service-box-link">
              Learn More
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>
        </div>
      </section>

      {/* Why Us Section - Fixed Center Visual */}
      <section className="why-section">
        <h2 className="section-title">Why Apis Digitech?</h2>
        <div className="why-grid">
          <div className="why-column why-column--left">
            <div className="why-item">
              <div className="why-item-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <h3 className="why-item-title">Client First</h3>
              <p className="why-item-desc">Your satisfaction is our priority. We work hard to deliver the best results possible.</p>
            </div>
            <div className="why-item">
              <div className="why-item-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
                </svg>
              </div>
              <h3 className="why-item-title">Digital Experts</h3>
              <p className="why-item-desc">World-class online marketing capabilities with years of experience.</p>
            </div>
            <div className="why-item">
              <div className="why-item-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <h3 className="why-item-title">Efficiency</h3>
              <p className="why-item-desc">Proven methodology gained through millions of man hours.</p>
            </div>
          </div>

          {/* Center Visual - Fixed */}
          <div className="why-column why-column--center">
            <div className="why-visual">
              <div className="why-visual-inner">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                  {/* Outer ring */}
                  <circle cx="60" cy="60" r="55" stroke="url(#gradient1)" strokeWidth="2" strokeDasharray="8 4"/>
                  {/* Middle ring */}
                  <circle cx="60" cy="60" r="40" stroke="url(#gradient1)" strokeWidth="3"/>
                  {/* Inner filled circle */}
                  <circle cx="60" cy="60" r="25" fill="url(#gradient2)"/>
                  {/* Center icon */}
                  <path d="M60 45v30M45 60h30" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  {/* Orbiting dots */}
                  <circle cx="60" cy="5" r="4" fill="#2563eb">
                    <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="10s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="115" cy="60" r="3" fill="#3b82f6">
                    <animateTransform attributeName="transform" type="rotate" from="120 60 60" to="480 60 60" dur="15s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="60" cy="115" r="3" fill="#60a5fa">
                    <animateTransform attributeName="transform" type="rotate" from="240 60 60" to="600 60 60" dur="12s" repeatCount="indefinite"/>
                  </circle>
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563eb"/>
                      <stop offset="100%" stopColor="#7c3aed"/>
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563eb"/>
                      <stop offset="100%" stopColor="#3b82f6"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="why-visual-label">500+ Projects</div>
            </div>
          </div>

          <div className="why-column why-column--right">
            <div className="why-item">
              <div className="why-item-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M3 9h18M9 21V9"/>
                </svg>
              </div>
              <h3 className="why-item-title">Right Size</h3>
              <p className="why-item-desc">Capabilities of a large firm with the agility of a start-up.</p>
            </div>
            <div className="why-item">
              <div className="why-item-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 className="why-item-title">Partnerships</h3>
              <p className="why-item-desc">Trusted by leading firms for long-term growth.</p>
            </div>
            <div className="why-item">
              <div className="why-item-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <h3 className="why-item-title">24/7 Support</h3>
              <p className="why-item-desc">Always there to provide solutions during every phase.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" aria-live="polite">
        <div className="stats-grid">
          <div className="stat-item">
            <AnimatedCounter end={500} suffix="+" className="stat-number" />
            <span className="stat-label">Projects Completed</span>
          </div>
          <div className="stat-item">
            <AnimatedCounter end={94} suffix="%" className="stat-number" />
            <span className="stat-label">Client Retention</span>
          </div>
          <div className="stat-item">
            <AnimatedCounter end={25} suffix="+" className="stat-number" />
            <span className="stat-label">SEO Experts</span>
          </div>
          <div className="stat-item">
            <AnimatedCounter end={8} suffix="+" className="stat-number" />
            <span className="stat-label">Years Experience</span>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <span className="section-tag">Our Process</span>
        <h2 className="section-title">How We Build Your Online Success</h2>
        <p className="section-subtitle">
          A proven 4-step methodology that delivers consistent results.
        </p>
        <div className="process-grid">
          <div className="process-step">
            <div className="process-number">01</div>
            <div className="process-connector"></div>
            <h3 className="process-title">Website Analysis</h3>
            <p className="process-desc">Comprehensive audit of your website and industry landscape.</p>
          </div>
          <div className="process-step">
            <div className="process-number">02</div>
            <div className="process-connector"></div>
            <h3 className="process-title">Strategy Planning</h3>
            <p className="process-desc">Custom action plan tailored to your business goals.</p>
          </div>
          <div className="process-step">
            <div className="process-number">03</div>
            <div className="process-connector"></div>
            <h3 className="process-title">Implementation</h3>
            <p className="process-desc">Execute SEO, content, and link building strategies.</p>
          </div>
          <div className="process-step">
            <div className="process-number">04</div>
            <h3 className="process-title">Reporting</h3>
            <p className="process-desc">Regular performance updates with actionable insights.</p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="case-studies-section">
        <span className="section-tag">Case Studies</span>
        <h2 className="section-title">Projects That Scaled With Us</h2>
        <p className="section-subtitle">Real results from real clients</p>
        <div className="case-studies-grid">
          <Link href="/reviews" className="case-study-card">
            <div className="case-study-image">
              <div className="case-study-image-gradient gradient-1"></div>
              <span className="case-study-industry">E-Commerce</span>
            </div>
            <div className="case-study-content">
              <h3 className="case-study-title">TechFlow Solutions</h3>
              <p className="case-study-desc">340% organic traffic increase and doubled leads within 4 months.</p>
              <div className="case-study-stats">
                <div className="case-study-stat">
                  <span className="stat-value">340%</span>
                  <span className="stat-text">Traffic Growth</span>
                </div>
                <div className="case-study-stat">
                  <span className="stat-value">2x</span>
                  <span className="stat-text">Lead Increase</span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/reviews" className="case-study-card">
            <div className="case-study-image">
              <div className="case-study-image-gradient gradient-2"></div>
              <span className="case-study-industry">Healthcare</span>
            </div>
            <div className="case-study-content">
              <h3 className="case-study-title">MedCare Plus</h3>
              <p className="case-study-desc">Page 1 rankings for 15+ competitive healthcare keywords.</p>
              <div className="case-study-stats">
                <div className="case-study-stat">
                  <span className="stat-value">15+</span>
                  <span className="stat-text">Page 1 Keywords</span>
                </div>
                <div className="case-study-stat">
                  <span className="stat-value">5x</span>
                  <span className="stat-text">ROI</span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/reviews" className="case-study-card">
            <div className="case-study-image">
              <div className="case-study-image-gradient gradient-3"></div>
              <span className="case-study-industry">Finance</span>
            </div>
            <div className="case-study-content">
              <h3 className="case-study-title">FinanceHub</h3>
              <p className="case-study-desc">Built authority in competitive finance niche with AI-optimized content.</p>
              <div className="case-study-stats">
                <div className="case-study-stat">
                  <span className="stat-value">25+</span>
                  <span className="stat-text">DA Increase</span>
                </div>
                <div className="case-study-stat">
                  <span className="stat-value">180%</span>
                  <span className="stat-text">Revenue Growth</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <Link href="/reviews" className="btn btn--outline">View All Case Studies</Link>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <span className="section-tag">Testimonials</span>
        <h2 className="section-title">What Our Clients Say</h2>
        <div className="testimonials-slider">
          <div className="testimonial-card">
            <div className="testimonial-rating">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
            </div>
            <p className="testimonial-text">
              "Apis Digitech transformed our SEO strategy. Within 4 months, we went from page 5 to page 1. Our organic traffic increased by 340%."
            </p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">S</div>
              <div>
                <span className="testimonial-name">Sarah Mitchell</span>
                <span className="testimonial-role">CMO at TechFlow Solutions</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-rating">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
            </div>
            <p className="testimonial-text">
              "Their AI optimization expertise is unmatched. We now appear in ChatGPT and Perplexity answers. The ROI has been incredible."
            </p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">M</div>
              <div>
                <span className="testimonial-name">Marcus Chen</span>
                <span className="testimonial-role">Founder at GrowthStack</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-rating">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
            </div>
            <p className="testimonial-text">
              "Best SEO agency we've worked with. They delivered more traffic, better rankings, and most importantly, more conversions."
            </p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">J</div>
              <div>
                <span className="testimonial-name">Jennifer Adams</span>
                <span className="testimonial-role">Director of Marketing, Velocity</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-bg-pattern"></div>
        <div className="cta-content">
          <h2 className="cta-title">Ready to dominate search rankings?</h2>
          <p className="cta-desc">
            Get a free SEO audit and discover exactly what's holding your website back. No obligations, just actionable insights.
          </p>
          <div className="cta-buttons">
            <Link href="/pricing" className="btn btn--primary btn--large">
              View Pricing Plans
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/contact" className="btn btn--outline-light">Get Free Proposal</Link>
          </div>
        </div>
      </section>

      </main>

      {/* Footer */}
      <footer className="footer" role="contentinfo">
        <div className="footer-main">
          <div className="footer-about">
            <Link href="/" className="footer-brand-link">
              <div className="brand-mark">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="brand-text">Apis Digitech</span>
            </Link>
            <p>
              Equipping businesses with the best SEO and AI optimization tools. Traditional SEO meets cutting-edge AI strategies for maximum digital growth.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Services</h4>
            <div className="footer-links">
              <Link href="/services/seo">SEO Services</Link>
              <Link href="/services/aeo">Answer Engine Optimization</Link>
              <Link href="/services/geo">Generative Engine Optimization</Link>
              <Link href="/services/link-building">Link Building</Link>
              <Link href="/services/content-marketing">Content Marketing</Link>
            </div>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <div className="footer-links">
              <Link href="/why-us">Why Us</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/reviews">Reviews</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          <div className="footer-column">
            <h4>Contact</h4>
            <div className="footer-contact">
              <a href="mailto:hello@apisdigitech.com" className="footer-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>hello@apisdigitech.com</span>
              </a>
              <a href="tel:+15551234567" className="footer-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>+1 (555) 123-4567</span>
              </a>
              <div className="footer-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Texas, USA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">© 2026 Apis Digitech | All Rights Reserved.</span>
          <div className="footer-legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </button>
    </>
  );
}

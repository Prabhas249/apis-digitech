'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { PricingPlan } from '@/lib/data';

interface PricingClientProps {
  allPricing: PricingPlan[];
}

export default function PricingClient({ allPricing }: PricingClientProps) {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('seo');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs = [
    { id: 'seo', label: 'SEO Packages' },
    { id: 'aeo', label: 'AEO Packages' },
    { id: 'geo', label: 'GEO Packages' },
    { id: 'local', label: 'Local SEO' },
    { id: 'web', label: 'Web Development' },
  ];

  const getCurrentPricing = () => {
    return allPricing.filter(plan => plan.category === activeTab).sort((a, b) => a.order - b.order);
  };

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
          <span className="section-tag">Pricing</span>
          <h1 className="page-title">Transparent Pricing, <span className="text-blue">Real Results</span></h1>
          <p className="page-desc">
            Choose the plan that fits your business goals. All packages include dedicated support and monthly reporting.
          </p>
        </div>
        <div className="page-header-visual">
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none" className="service-illustration">
            <circle cx="150" cy="150" r="120" stroke="url(#gradPrice1)" strokeWidth="2" strokeDasharray="8 4"/>
            <circle cx="150" cy="150" r="90" stroke="url(#gradPrice1)" strokeWidth="3"/>
            <circle cx="150" cy="150" r="60" fill="url(#gradPrice2)" opacity="0.1"/>
            <circle cx="150" cy="150" r="40" fill="url(#gradPrice2)"/>
            <circle cx="150" cy="80" r="20" fill="#2563eb" opacity="0.2" className="float-circle"/>
            <circle cx="220" cy="150" r="15" fill="#10b981" opacity="0.3" className="float-circle"/>
            <circle cx="150" cy="220" r="18" fill="#7c3aed" opacity="0.25" className="float-circle"/>
            <circle cx="80" cy="150" r="12" fill="#f59e0b" opacity="0.2" className="float-circle"/>
            <text x="150" y="155" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">$</text>
            <defs>
              <linearGradient id="gradPrice1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981"/>
                <stop offset="100%" stopColor="#2563eb"/>
              </linearGradient>
              <linearGradient id="gradPrice2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981"/>
                <stop offset="100%" stopColor="#059669"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* Pricing Tabs */}
      <section className="pricing-section">
        <div className="pricing-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`pricing-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="pricing-grid">
          {getCurrentPricing().map((plan) => (
            <div key={plan._id} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="pricing-badge">Most Popular</div>}
              <div className="pricing-price">
                <span className="price-amount">{plan.name}</span>
              </div>
              <Link href="/contact" className="pricing-contact-link">Contact Us</Link>
              <p className="pricing-desc">{plan.description}</p>
              <ul className="pricing-features">
                {plan.features.map((feature, j) => (
                  <li key={j}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className={`pricing-btn ${plan.popular ? 'primary' : ''}`}>
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>How long does it take to see results?</h3>
            <p>SEO is a long-term strategy. Most clients start seeing improvements in 3-6 months, with significant results in 6-12 months. AEO and GEO can show faster results in AI platforms.</p>
          </div>
          <div className="faq-item">
            <h3>Can I upgrade or downgrade my plan?</h3>
            <p>Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades apply at the start of your next billing cycle.</p>
          </div>
          <div className="faq-item">
            <h3>What&apos;s included in the reporting?</h3>
            <p>All plans include detailed reports showing keyword rankings, traffic growth, backlinks acquired, technical improvements, and actionable recommendations.</p>
          </div>
          <div className="faq-item">
            <h3>Do you require long-term contracts?</h3>
            <p>We recommend a minimum 6-month commitment for best results, but we offer month-to-month options. SEO success requires consistent effort over time.</p>
          </div>
          <div className="faq-item">
            <h3>What makes AEO and GEO different from SEO?</h3>
            <p>AEO optimizes for AI answer engines like featured snippets and voice search. GEO focuses on getting your content cited by AI platforms like ChatGPT and Perplexity.</p>
          </div>
          <div className="faq-item">
            <h3>Do you guarantee first page rankings?</h3>
            <p>We don&apos;t make specific ranking guarantees as search algorithms change constantly. We guarantee our best efforts and transparent reporting on all metrics.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Not sure which plan is right for you?</h2>
          <p className="cta-desc">
            Get a free consultation and we&apos;ll help you choose the perfect plan for your business goals.
          </p>
          <div className="cta-buttons">
            <Link href="/contact" className="btn btn--primary">Get Free Consultation</Link>
            <Link href="/reviews" className="btn btn--outline">See Client Results</Link>
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

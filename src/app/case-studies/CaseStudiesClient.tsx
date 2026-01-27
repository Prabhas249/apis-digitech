'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { CaseStudy } from '@/lib/data';

interface CaseStudiesClientProps {
  caseStudies: CaseStudy[];
  stats: { value: string; label: string }[];
}

export default function CaseStudiesClient({ caseStudies, stats }: CaseStudiesClientProps) {
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
      <section className="page-header">
        <div className="page-header-content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Case Studies</span>
          </nav>
          <span className="section-tag">Success Stories</span>
          <h1 className="page-title">Our <span className="text-blue">Case Studies</span></h1>
          <p className="page-desc">
            Real results from real clients. Explore how we have helped businesses across various industries
            achieve their digital marketing goals through strategic SEO and content marketing.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="case-studies-section">
        <div className="case-studies-grid">
          {caseStudies.map((study) => (
            <Link key={study._id} href={`/case-studies/${study.slug || 'case-study'}`} className="case-study-card">
              <div className="case-study-card-header">
                <span className="case-study-industry">{study.industry}</span>
                <span className="case-study-timeline">{study.timeline}</span>
              </div>
              <h3 className="case-study-card-title">{study.title}</h3>
              <p className="case-study-card-preview">{study.preview}</p>
              <div className="case-study-card-metric">
                <span className="metric-value">{study.metric}</span>
                <span className="metric-label">{study.metricLabel}</span>
              </div>
              <div className="case-study-card-cta">
                Read Full Case Study
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Results Overview */}
      <section className="stats-section">
        <h2 className="section-title">Proven Results Across Industries</h2>
        <p className="section-subtitle">Our track record speaks for itself</p>
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item">
              <span className="stat-number">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Be Our Next Success Story?</h2>
          <p className="cta-desc">
            Let us analyze your current situation and create a customized strategy to achieve similar results for your business.
          </p>
          <div className="cta-buttons">
            <Link href="/contact" className="btn btn--primary">Get Free Consultation</Link>
            <Link href="/pricing" className="btn btn--outline">View Pricing</Link>
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

      <style jsx>{`
        .case-studies-section {
          padding: 4rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .case-studies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .case-study-card {
          background: var(--card-bg, #ffffff);
          border: 1px solid var(--border-color, #e5e7eb);
          border-radius: 16px;
          padding: 2rem;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .case-study-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
          border-color: #2563eb;
        }

        .case-study-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .case-study-industry {
          font-size: 0.875rem;
          color: #2563eb;
          font-weight: 500;
          background: rgba(37, 99, 235, 0.1);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
        }

        .case-study-timeline {
          font-size: 0.75rem;
          color: #6b7280;
          background: #f3f4f6;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
        }

        .case-study-card-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary, #111827);
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }

        .case-study-card-preview {
          font-size: 0.9375rem;
          color: var(--text-secondary, #6b7280);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }

        .case-study-card-metric {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem;
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(124, 58, 237, 0.1));
          border-radius: 12px;
          margin-bottom: 1.5rem;
        }

        .metric-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2563eb;
          line-height: 1;
        }

        .metric-label {
          font-size: 0.875rem;
          color: var(--text-secondary, #6b7280);
          margin-top: 0.5rem;
        }

        .case-study-card-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: #2563eb;
          font-weight: 500;
          font-size: 0.9375rem;
        }

        .case-study-card-cta svg {
          transition: transform 0.2s ease;
        }

        .case-study-card:hover .case-study-card-cta svg {
          transform: translateX(4px);
        }

        @media (max-width: 768px) {
          .case-studies-section {
            padding: 2rem 1rem;
          }

          .case-studies-grid {
            grid-template-columns: 1fr;
          }

          .case-study-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </>
  );
}

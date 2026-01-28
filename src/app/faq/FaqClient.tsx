'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

interface FaqCategory {
  category: string;
  questions: FaqItem[];
}

interface FaqClientProps {
  faqsByCategory: FaqCategory[];
}

export default function FaqClient({ faqsByCategory }: FaqClientProps) {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
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
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">FAQ</span>
          </nav>
          <span className="section-tag">Support</span>
          <h1 className="page-title">Frequently Asked <span className="text-blue">Questions</span></h1>
          <p className="page-desc">
            Find answers to common questions about our SEO services, pricing, and process.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="faq-section">
        {faqsByCategory.map((category, catIndex) => (
          <div key={catIndex} className="faq-category">
            <h2 className="faq-category-title">{category.category}</h2>
            <div className="faq-list">
              {category.questions.map((item, qIndex) => {
                const key = `${catIndex}-${qIndex}`;
                const isOpen = openItems[key];
                return (
                  <div key={item._id} className={`faq-item ${isOpen ? 'open' : ''}`}>
                    <button
                      className="faq-question"
                      onClick={() => toggleItem(key)}
                      aria-expanded={isOpen}
                    >
                      <span>{item.question}</span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`faq-icon ${isOpen ? 'rotated' : ''}`}
                      >
                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                      <p>{item.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="faq-cta">
        <div className="faq-cta-content">
          <h2>Still have questions?</h2>
          <p>Can&apos;t find the answer you&apos;re looking for? Our team is here to help.</p>
          <Link href="/contact" className="btn btn--primary">Contact Us</Link>
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

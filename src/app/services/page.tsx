'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ServicesPage() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      id: 'seo',
      tag: 'SEO',
      color: 'blue',
      title: 'Search Engine Optimization',
      description: 'Comprehensive SEO strategies that drive organic growth. From technical audits to content optimization, we cover every aspect of search visibility.',
      longDescription: 'Our SEO services are designed to help your business achieve long-term organic growth. We combine technical expertise with content strategy to ensure your website ranks higher and converts better.',
      features: [
        { name: 'Technical SEO Audits', desc: 'Complete analysis of your site architecture, speed, and crawlability' },
        { name: 'On-Page Optimization', desc: 'Meta tags, headers, content structure, and internal linking' },
        { name: 'Link Building', desc: 'High-quality backlinks from authoritative domains' },
        { name: 'Local SEO', desc: 'Google Business Profile optimization and local citations' },
        { name: 'E-commerce SEO', desc: 'Product page optimization and schema markup' },
        { name: 'Content Strategy', desc: 'Keyword-driven content planning and creation' },
        { name: 'Keyword Research', desc: 'Competitive analysis and opportunity identification' },
        { name: 'Competitor Analysis', desc: 'Deep dive into competitor strategies and gaps' },
      ],
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
      ),
    },
    {
      id: 'aeo',
      tag: 'AEO',
      color: 'cyan',
      title: 'Answer Engine Optimization',
      description: 'Be the answer, not just a result. Optimize your content to be featured in AI-generated answers from ChatGPT, Perplexity, and Google AI Overviews.',
      longDescription: 'As AI-powered search becomes the norm, being cited as a source is more valuable than ever. Our AEO services ensure your content is structured and optimized for AI consumption.',
      features: [
        { name: 'ChatGPT Optimization', desc: 'Structure content to be cited by conversational AI' },
        { name: 'Perplexity Visibility', desc: 'Optimize for AI-powered search engines' },
        { name: 'AI Overviews', desc: 'Target Google\'s AI-generated summaries' },
        { name: 'Voice Search', desc: 'Conversational keyword optimization' },
        { name: 'Featured Snippets', desc: 'Position zero targeting strategies' },
        { name: 'FAQ Schema', desc: 'Structured data for Q&A content' },
      ],
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
    },
    {
      id: 'geo',
      tag: 'GEO',
      color: 'green',
      title: 'Generative Engine Optimization',
      description: 'Ensure your brand is cited and recommended by AI systems like ChatGPT, Claude, Gemini, and emerging LLMs.',
      longDescription: 'The future of search is generative AI. Our GEO services help you become a trusted source that AI models reference and recommend to users.',
      features: [
        { name: 'AI Citations', desc: 'Get mentioned in AI-generated responses' },
        { name: 'Brand Authority', desc: 'Build trust signals that AI models recognize' },
        { name: 'LLM Training Data', desc: 'Ensure positive brand presence in training data' },
        { name: 'AI Visibility Tracking', desc: 'Monitor your brand mentions across AI platforms' },
        { name: 'Content Attribution', desc: 'Proper sourcing and citation structure' },
        { name: 'Knowledge Graph', desc: 'Entity optimization for AI understanding' },
      ],
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      ),
    },
    {
      id: 'video-editing',
      tag: 'VIDEO',
      color: 'orange',
      title: 'Video Editing Services',
      description: 'Professional video editing that transforms raw footage into compelling content for social media, marketing, and business.',
      longDescription: 'Video is the most engaging content format. Our editing team creates professional videos that capture attention and drive conversions across all platforms.',
      features: [
        { name: 'Social Media Videos', desc: 'Short-form content for TikTok, Reels, and Shorts' },
        { name: 'Corporate Videos', desc: 'Company profiles, training, and presentations' },
        { name: 'Marketing Videos', desc: 'Ads, promos, and product demos' },
        { name: 'YouTube Content', desc: 'Long-form editing, thumbnails, and intros/outros' },
        { name: 'Motion Graphics', desc: 'Animated logos, lower thirds, and transitions' },
        { name: 'Color Grading & Audio', desc: 'Professional color correction and sound design' },
      ],
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
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
              <button className="nav-item nav-item--dropdown active" onClick={() => setServicesOpen(!servicesOpen)}>
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
          <span className="section-tag">Services</span>
          <h1 className="page-title">Comprehensive Digital <span className="title-gradient">Marketing Solutions</span></h1>
          <p className="page-desc">From traditional SEO to cutting-edge AI optimization, we offer a full spectrum of services to help you dominate the digital landscape.</p>
        </div>
      </section>

      {/* Services List */}
      <section className="services-page">
        {services.map((service, index) => (
          <div key={service.id} className="service-detail" id={service.id}>
            <div className="service-detail-header">
              <div className={`service-detail-icon service-detail-icon--${service.color}`}>
                {service.icon}
              </div>
              <div className="service-detail-meta">
                <span className={`sc-tag sc-tag--${service.color}`}>{service.tag}</span>
                <h2 className="service-detail-title">{service.title}</h2>
                <p className="service-detail-desc">{service.longDescription}</p>
              </div>
            </div>
            <div className="service-detail-features">
              <h3 className="features-heading">What's Included</h3>
              <div className="features-grid">
                {service.features.map((feature, i) => (
                  <div key={i} className="feature-item">
                    <div className="feature-check">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="feature-content">
                      <span className="feature-name">{feature.name}</span>
                      <span className="feature-desc">{feature.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Link href="/contact" className="btn btn--primary service-cta">
              <span>Get Started with {service.tag}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to grow your business?</h2>
          <p className="cta-desc">
            Let's discuss how we can help you achieve your digital marketing goals.
          </p>
          <Link href="/contact" className="cta-btn">
            <span>Schedule a Consultation</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand-section">
            <Link href="/" className="nav-brand">
              <div className="brand-mark">A</div>
              <span className="brand-text">Apis Digitech</span>
            </Link>
            <p className="footer-desc">
              Future-proof your digital presence with next-generation optimization strategies.
            </p>
          </div>

          <div className="footer-column">
            <h4>Services</h4>
            <div className="footer-links">
              <Link href="/services#seo" className="footer-link">Search Engine Optimization</Link>
              <Link href="/services#aeo" className="footer-link">Answer Engine Optimization</Link>
              <Link href="/services#geo" className="footer-link">Generative Engine Optimization</Link>
              <Link href="/services/video-editing" className="footer-link">Video Editing</Link>
            </div>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <div className="footer-links">
              <Link href="/about" className="footer-link">About Us</Link>
              <Link href="/#pricing" className="footer-link">Pricing</Link>
              <Link href="/contact" className="footer-link">Contact</Link>
              <Link href="/admin" className="footer-link">Admin</Link>
            </div>
          </div>

          <div className="footer-column">
            <h4>Contact</h4>
            <div className="footer-links">
              <span className="footer-link">support@apisdigitech.com</span>
              <span className="footer-link">30 N Gould St Ste R, Sheridan, WY 82801</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">© 2026 Apis Digitech. All rights reserved.</span>
          <div className="footer-legal">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </>
  );
}

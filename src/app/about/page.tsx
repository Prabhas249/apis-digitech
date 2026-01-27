'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AboutPage() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const team = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      initials: 'JS',
      description: '10+ years in digital marketing, leading innovative SEO strategies for Fortune 500 companies.',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of SEO',
      initials: 'SJ',
      description: 'Former Google search quality analyst with expertise in technical SEO and algorithm updates.',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Michael Chen',
      role: 'Technical Director',
      initials: 'MC',
      description: 'Full-stack developer specializing in SEO tools, automation, and web performance optimization.',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Emily Davis',
      role: 'Content Strategist',
      initials: 'ED',
      description: 'Content marketing expert with a proven track record of creating high-ranking, engaging content.',
      linkedin: '#',
      twitter: '#',
    },
  ];

  const values = [
    {
      title: 'Innovation',
      desc: 'We stay ahead of the curve, constantly adapting to new search technologies and AI advancements to keep our clients at the forefront.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      ),
    },
    {
      title: 'Results',
      desc: 'We measure success by your growth. Every strategy is designed to deliver measurable ROI and tangible business outcomes.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/>
        </svg>
      ),
    },
    {
      title: 'Transparency',
      desc: 'No black boxes. You\'ll always know exactly what we\'re doing and why. Clear reporting and honest communication are our promise.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
        </svg>
      ),
    },
    {
      title: 'Partnership',
      desc: 'We\'re not just a vendor. We become an extension of your team, invested in your long-term success and growth.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
  ];

  const stats = [
    { value: '500+', label: 'Projects Completed' },
    { value: '8+', label: 'Years Experience' },
    { value: '25+', label: 'Industry Experts' },
    { value: '94%', label: 'Client Retention' },
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
      <section className="page-header">
        <div className="page-header-content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">About Us</span>
          </nav>
          <span className="section-tag">About Us</span>
          <h1 className="page-title">About <span className="text-blue">Apis Digitech</span></h1>
          <p className="page-desc">
            We're a team of digital marketing experts passionate about helping businesses succeed in the ever-evolving world of search.
          </p>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="about-story-section">
        <div className="about-story-grid">
          <div className="about-story-content">
            <h2 className="section-title">Our Story</h2>
            <p className="about-story-text">
              Apis Digitech was founded with a simple yet powerful mission: help businesses succeed in the digital age. What started as a small SEO consultancy has grown into a full-service digital marketing agency specializing in search optimization across all platforms.
            </p>
            <p className="about-story-text">
              As search has evolved from simple keywords to AI-powered answers, we've evolved with it. Today, we're pioneers in Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO), helping our clients stay ahead of the curve.
            </p>
            <p className="about-story-text">
              Based in Texas, we work with businesses across the globe, from startups to enterprise companies. Our approach combines deep technical expertise with creative strategy to deliver results that matter.
            </p>

            <div className="about-mission">
              <h3 className="about-mission-title">Our Mission</h3>
              <p className="about-mission-text">
                To empower businesses of all sizes to achieve sustainable growth through innovative, ethical, and results-driven digital marketing strategies. We believe every business deserves to be found online, and we're committed to making that happen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values-section">
        <div className="section-intro">
          <span className="section-tag">Our Values</span>
          <h2 className="section-title">What Drives Us <span className="text-blue">Every Day</span></h2>
          <p className="section-subtitle">Our core values shape everything we do and guide how we work with our clients.</p>
        </div>
        <div className="about-values-grid">
          {values.map((value, i) => (
            <div key={i} className="about-value-card">
              <div className="about-value-icon">{value.icon}</div>
              <h3 className="about-value-title">{value.title}</h3>
              <p className="about-value-desc">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team-section">
        <div className="section-intro">
          <span className="section-tag">Our Team</span>
          <h2 className="section-title">Meet the <span className="text-blue">Experts</span></h2>
          <p className="section-subtitle">A dedicated team of SEO specialists, content strategists, and AI experts working together to deliver exceptional results.</p>
        </div>
        <div className="about-team-grid">
          {team.map((member, i) => (
            <div key={i} className="about-team-card">
              <div className="about-team-avatar">{member.initials}</div>
              <h3 className="about-team-name">{member.name}</h3>
              <p className="about-team-role">{member.role}</p>
              <p className="about-team-desc">{member.description}</p>
              <div className="about-team-social">
                <a href={member.linkedin} className="about-team-social-link" aria-label={`${member.name} LinkedIn`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
                <a href={member.twitter} className="about-team-social-link" aria-label={`${member.name} Twitter`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats-section">
        <div className="about-stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="about-stat-item">
              <span className="about-stat-value">{stat.value}</span>
              <span className="about-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to work with us?</h2>
          <p className="cta-desc">
            Let's discuss how our expertise can help your business grow and succeed in the digital landscape.
          </p>
          <div className="cta-buttons">
            <Link href="/contact" className="btn btn--primary">Get in Touch</Link>
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
              <div className="footer-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>+1 (555) 123-4567</span>
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
        /* About Story Section */
        .about-story-section {
          padding: 80px 24px;
          max-width: 900px;
          margin: 0 auto;
        }

        .about-story-content {
          text-align: left;
        }

        .about-story-text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--text-2);
          margin-bottom: 1.5rem;
        }

        .about-mission {
          margin-top: 3rem;
          padding: 2rem;
          background: var(--bg-1);
          border-radius: 16px;
          border-left: 4px solid var(--accent);
        }

        .about-mission-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-1);
          margin-bottom: 1rem;
        }

        .about-mission-text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--text-2);
          margin: 0;
        }

        /* Values Section */
        .about-values-section {
          padding: 80px 24px;
          background: var(--bg-1);
        }

        .section-intro {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 3rem;
        }

        .about-values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .about-value-card {
          background: var(--bg-0);
          padding: 2rem;
          border-radius: 16px;
          border: 1px solid var(--border);
          text-align: center;
          transition: all 0.3s ease;
        }

        .about-value-card:hover {
          border-color: var(--accent);
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
        }

        .about-value-icon {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(124, 58, 237, 0.1));
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: var(--accent);
        }

        .about-value-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-1);
          margin-bottom: 0.75rem;
        }

        .about-value-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-2);
          margin: 0;
        }

        /* Team Section */
        .about-team-section {
          padding: 80px 24px;
        }

        .about-team-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .about-team-card {
          background: var(--bg-0);
          padding: 2rem;
          border-radius: 16px;
          border: 1px solid var(--border);
          text-align: center;
          transition: all 0.3s ease;
        }

        .about-team-card:hover {
          border-color: var(--accent);
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
        }

        .about-team-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          font-size: 1.5rem;
          font-weight: 600;
          color: white;
        }

        .about-team-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-1);
          margin-bottom: 0.25rem;
        }

        .about-team-role {
          font-size: 0.9rem;
          color: var(--accent);
          font-weight: 500;
          margin-bottom: 1rem;
        }

        .about-team-desc {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--text-2);
          margin-bottom: 1.5rem;
        }

        .about-team-social {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .about-team-social-link {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: var(--bg-1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-2);
          transition: all 0.2s ease;
        }

        .about-team-social-link:hover {
          background: var(--accent);
          color: white;
        }

        /* Stats Section */
        .about-stats-section {
          padding: 80px 24px;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
        }

        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .about-stat-item {
          text-align: center;
        }

        .about-stat-value {
          display: block;
          font-size: 3rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
        }

        .about-stat-label {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.85);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .about-values-grid,
          .about-team-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .about-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
        }

        @media (max-width: 640px) {
          .about-story-section,
          .about-values-section,
          .about-team-section,
          .about-stats-section {
            padding: 60px 16px;
          }

          .about-values-grid,
          .about-team-grid {
            grid-template-columns: 1fr;
          }

          .about-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
          }

          .about-stat-value {
            font-size: 2.25rem;
          }

          .about-stat-label {
            font-size: 0.875rem;
          }

          .about-mission {
            padding: 1.5rem;
          }

          .about-story-text,
          .about-mission-text {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
}

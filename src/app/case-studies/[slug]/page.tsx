'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

// Case studies data
const caseStudiesData: Record<string, {
  title: string;
  clientName: string;
  industry: string;
  timeline: string;
  challenge: {
    summary: string;
    points: string[];
  };
  solution: {
    summary: string;
    points: string[];
  };
  results: {
    metric: string;
    label: string;
    description: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
}> = {
  'ecommerce-growth': {
    title: 'E-commerce Store - 340% Traffic Growth',
    clientName: 'Fashion Forward Boutique',
    industry: 'E-commerce / Retail',
    timeline: '8 months',
    challenge: {
      summary: 'Fashion Forward Boutique, an online fashion retailer, was struggling to compete with larger e-commerce players. Despite having quality products and competitive pricing, they were virtually invisible in organic search results.',
      points: [
        'Organic traffic was stagnant at around 2,000 monthly visitors',
        'No keywords ranking on the first page of Google',
        'High bounce rate of 78% due to poor site structure',
        'Product pages lacked optimization for search intent',
        'No content strategy to attract top-of-funnel traffic',
        'Competing against major retailers with bigger budgets',
      ],
    },
    solution: {
      summary: 'We developed a comprehensive SEO strategy that addressed technical issues, content gaps, and link building opportunities while focusing on long-tail keywords with high purchase intent.',
      points: [
        'Complete technical SEO audit and implementation of fixes for site speed, mobile optimization, and crawlability',
        'Keyword research identifying 500+ long-tail opportunities with high conversion potential',
        'On-page optimization of all product and category pages with unique descriptions and schema markup',
        'Content marketing strategy including style guides, trend reports, and buyer guides',
        'Strategic link building campaign targeting fashion and lifestyle publications',
        'Implementation of proper internal linking structure to distribute page authority',
      ],
    },
    results: [
      {
        metric: '340%',
        label: 'Traffic Increase',
        description: 'Organic traffic grew from 2,000 to 8,800 monthly visitors',
      },
      {
        metric: '45',
        label: 'Page 1 Rankings',
        description: 'Keywords ranking on first page of Google',
      },
      {
        metric: '156%',
        label: 'Revenue Growth',
        description: 'E-commerce revenue from organic traffic',
      },
      {
        metric: '52%',
        label: 'Bounce Rate Reduction',
        description: 'Improved from 78% to 37%',
      },
    ],
    testimonial: {
      quote: 'Working with Apis Digitech transformed our business. We went from being invisible online to now competing with much larger brands. The ROI has been incredible - our organic traffic is now our best performing sales channel.',
      author: 'Sarah Mitchell',
      role: 'Founder & CEO',
      company: 'Fashion Forward Boutique',
    },
  },
  'local-business': {
    title: 'Local Service Business - 15+ Page 1 Keywords',
    clientName: 'ProFlow Plumbing Services',
    industry: 'Home Services',
    timeline: '6 months',
    challenge: {
      summary: 'ProFlow Plumbing Services, a family-owned plumbing company, had been relying solely on word-of-mouth referrals for over 15 years. With increasing competition from larger franchises, they needed to establish an online presence to survive.',
      points: [
        'No Google Business Profile or online presence whatsoever',
        'Website was outdated and not mobile-friendly',
        'Zero visibility in local search results or map pack',
        'Competitors dominated all local search queries',
        'No reviews or online reputation to leverage',
        'Limited budget compared to franchise competitors',
      ],
    },
    solution: {
      summary: 'We implemented a focused local SEO strategy designed to maximize visibility in their service area while building trust and authority through reviews and local citations.',
      points: [
        'Complete Google Business Profile setup and optimization with service areas, photos, and attributes',
        'Website redesign with mobile-first approach and local keyword optimization',
        'Local citation building across 50+ relevant directories with consistent NAP information',
        'Review generation strategy that grew reviews from 0 to 75+ with 4.9 average rating',
        'Local content creation including service area pages and community involvement posts',
        'Local link building through chamber of commerce, local news, and community sponsorships',
      ],
    },
    results: [
      {
        metric: '15+',
        label: 'Page 1 Keywords',
        description: 'Local service keywords ranking on first page',
      },
      {
        metric: '#1',
        label: 'Map Pack Position',
        description: 'Top position for "plumber near me" in service area',
      },
      {
        metric: '280%',
        label: 'Lead Increase',
        description: 'Monthly leads generated through organic search',
      },
      {
        metric: '75+',
        label: 'Google Reviews',
        description: '4.9 star average rating achieved',
      },
    ],
    testimonial: {
      quote: 'I was skeptical about investing in SEO at first, but Apis Digitech made believers out of us. Now we get more calls from Google than we ever did from the Yellow Pages. Our schedule is booked weeks in advance.',
      author: 'Mike Johnson',
      role: 'Owner',
      company: 'ProFlow Plumbing Services',
    },
  },
  'saas-company': {
    title: 'SaaS Company - 25+ DA Increase',
    clientName: 'CloudMetrics Pro',
    industry: 'Software / Technology',
    timeline: '12 months',
    challenge: {
      summary: 'CloudMetrics Pro, a B2B analytics SaaS startup, had a great product but struggled to generate organic leads. Their domain authority was low, and they were getting outranked by established competitors for every valuable keyword.',
      points: [
        'Domain Authority of only 12, making it impossible to rank for competitive terms',
        'Very few quality backlinks - mostly from irrelevant or low-quality sites',
        'Content was product-focused with no thought leadership or educational resources',
        'Competitors with DA 50+ dominated all target keywords',
        'High cost per lead from paid advertising was unsustainable',
        'No brand recognition in the analytics software space',
      ],
    },
    solution: {
      summary: 'We developed a long-term authority building strategy combining strategic link building with thought leadership content to establish CloudMetrics Pro as an industry expert.',
      points: [
        'Comprehensive link building campaign targeting SaaS publications, tech blogs, and industry resources',
        'Original research content including annual analytics industry reports cited by major publications',
        'Guest posting strategy on high-authority marketing and analytics platforms',
        'HARO campaign resulting in features in Forbes, TechCrunch, and industry publications',
        'Content hub creation with comprehensive guides, tutorials, and comparison pages',
        'Digital PR campaign highlighting company milestones and unique product features',
      ],
    },
    results: [
      {
        metric: '25+',
        label: 'DA Increase',
        description: 'Domain Authority grew from 12 to 38',
      },
      {
        metric: '450%',
        label: 'Organic Traffic',
        description: 'Monthly organic visitors increase',
      },
      {
        metric: '320%',
        label: 'Lead Growth',
        description: 'Marketing qualified leads from organic',
      },
      {
        metric: '65%',
        label: 'CAC Reduction',
        description: 'Customer acquisition cost decrease',
      },
    ],
    testimonial: {
      quote: 'The team at Apis Digitech understood our SaaS business model and created a strategy that delivered long-term, sustainable results. Our organic channel now generates more qualified leads than paid advertising at a fraction of the cost.',
      author: 'David Chen',
      role: 'VP of Marketing',
      company: 'CloudMetrics Pro',
    },
  },
};

export default function CaseStudyDetailPage({ params }: { params: { slug: string } }) {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const caseStudy = caseStudiesData[params.slug];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!caseStudy) {
    notFound();
  }

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

      {/* Hero Section */}
      <section className="case-study-hero">
        <div className="case-study-hero-content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <Link href="/case-studies">Case Studies</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{caseStudy.clientName}</span>
          </nav>
          <div className="case-study-hero-tags">
            <span className="case-study-industry-tag">{caseStudy.industry}</span>
            <span className="case-study-timeline-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {caseStudy.timeline}
            </span>
          </div>
          <h1 className="case-study-hero-title">{caseStudy.title}</h1>
          <p className="case-study-hero-client">Client: {caseStudy.clientName}</p>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="case-study-section case-study-challenge">
        <div className="case-study-section-content">
          <div className="case-study-section-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <span className="case-study-section-label">The Challenge</span>
          <h2 className="case-study-section-title">What Problem Did They Face?</h2>
          <p className="case-study-section-summary">{caseStudy.challenge.summary}</p>
          <ul className="case-study-points">
            {caseStudy.challenge.points.map((point, index) => (
              <li key={index}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Solution Section */}
      <section className="case-study-section case-study-solution">
        <div className="case-study-section-content">
          <div className="case-study-section-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
          <span className="case-study-section-label">Our Solution</span>
          <h2 className="case-study-section-title">What We Did</h2>
          <p className="case-study-section-summary">{caseStudy.solution.summary}</p>
          <ul className="case-study-points case-study-points--solution">
            {caseStudy.solution.points.map((point, index) => (
              <li key={index}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Results Section */}
      <section className="case-study-section case-study-results">
        <div className="case-study-section-content">
          <div className="case-study-section-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>
            </svg>
          </div>
          <span className="case-study-section-label">The Results</span>
          <h2 className="case-study-section-title">Measurable Outcomes</h2>
          <div className="case-study-results-grid">
            {caseStudy.results.map((result, index) => (
              <div key={index} className="case-study-result-card">
                <span className="result-metric">{result.metric}</span>
                <span className="result-label">{result.label}</span>
                <span className="result-description">{result.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="case-study-section case-study-testimonial">
        <div className="case-study-section-content">
          <div className="testimonial-quote-mark">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" opacity="0.2">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
          </div>
          <blockquote className="testimonial-quote">
            {caseStudy.testimonial.quote}
          </blockquote>
          <div className="testimonial-author">
            <div className="testimonial-avatar">
              {caseStudy.testimonial.author.charAt(0)}
            </div>
            <div className="testimonial-info">
              <span className="testimonial-name">{caseStudy.testimonial.author}</span>
              <span className="testimonial-role">{caseStudy.testimonial.role}, {caseStudy.testimonial.company}</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Achieve Similar Results?</h2>
          <p className="cta-desc">
            Let us analyze your business and create a customized strategy that delivers measurable growth.
          </p>
          <div className="cta-buttons">
            <Link href="/contact" className="btn btn--primary">Get Free Consultation</Link>
            <Link href="/case-studies" className="btn btn--outline">View More Case Studies</Link>
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
        .case-study-hero {
          padding: 8rem 2rem 4rem;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          text-align: center;
        }

        :global([data-theme="dark"]) .case-study-hero {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        }

        .case-study-hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .case-study-hero-tags {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .case-study-industry-tag {
          background: rgba(37, 99, 235, 0.1);
          color: #2563eb;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .case-study-timeline-tag {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(34, 197, 94, 0.1);
          color: #16a34a;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .case-study-hero-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary, #111827);
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .case-study-hero-client {
          font-size: 1.125rem;
          color: var(--text-secondary, #6b7280);
        }

        .case-study-section {
          padding: 4rem 2rem;
        }

        .case-study-section-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .case-study-section-icon {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .case-study-challenge .case-study-section-icon {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .case-study-solution .case-study-section-icon {
          background: rgba(37, 99, 235, 0.1);
          color: #2563eb;
        }

        .case-study-results .case-study-section-icon {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }

        .case-study-section-label {
          display: inline-block;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #2563eb;
          margin-bottom: 0.5rem;
        }

        .case-study-section-title {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary, #111827);
          margin-bottom: 1.5rem;
        }

        .case-study-section-summary {
          font-size: 1.125rem;
          color: var(--text-secondary, #6b7280);
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .case-study-points {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .case-study-points li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 1rem;
          color: var(--text-secondary, #4b5563);
          line-height: 1.6;
        }

        .case-study-points li svg {
          flex-shrink: 0;
          margin-top: 0.125rem;
        }

        .case-study-solution {
          background: #f8fafc;
        }

        :global([data-theme="dark"]) .case-study-solution {
          background: #1e293b;
        }

        .case-study-results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .case-study-result-card {
          background: var(--card-bg, #ffffff);
          border: 1px solid var(--border-color, #e5e7eb);
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .case-study-result-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
        }

        .result-metric {
          display: block;
          font-size: 3rem;
          font-weight: 700;
          color: #2563eb;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .result-label {
          display: block;
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary, #111827);
          margin-bottom: 0.5rem;
        }

        .result-description {
          display: block;
          font-size: 0.875rem;
          color: var(--text-secondary, #6b7280);
        }

        .case-study-testimonial {
          background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
          color: white;
        }

        .case-study-testimonial .case-study-section-content {
          text-align: center;
          position: relative;
        }

        .testimonial-quote-mark {
          margin-bottom: 1rem;
        }

        .testimonial-quote-mark svg {
          fill: white;
        }

        .testimonial-quote {
          font-size: 1.5rem;
          font-style: italic;
          line-height: 1.6;
          margin: 0 0 2rem;
          color: white;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .testimonial-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .testimonial-info {
          text-align: left;
        }

        .testimonial-name {
          display: block;
          font-size: 1.125rem;
          font-weight: 600;
        }

        .testimonial-role {
          display: block;
          font-size: 0.875rem;
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .case-study-hero {
            padding: 6rem 1rem 3rem;
          }

          .case-study-hero-title {
            font-size: 1.75rem;
          }

          .case-study-hero-tags {
            flex-wrap: wrap;
          }

          .case-study-section {
            padding: 3rem 1rem;
          }

          .case-study-section-title {
            font-size: 1.5rem;
          }

          .case-study-results-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .result-metric {
            font-size: 2rem;
          }

          .testimonial-quote {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </>
  );
}

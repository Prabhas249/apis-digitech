'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { BlogPost } from '@/lib/sanity.types';

interface BlogClientProps {
  posts: BlogPost[];
  featuredPost: BlogPost | null;
  categories: string[];
}

export default function BlogClient({ posts, featuredPost, categories }: BlogClientProps) {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter posts based on search query and selected category
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Check if featured post matches filters
  const showFeaturedPost = featuredPost && (() => {
    const matchesSearch = featuredPost.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || featuredPost.category === selectedCategory;
    return matchesSearch && matchesCategory;
  })();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
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
            <Link href="/pricing" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
            <Link href="/blog" className="nav-item active" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            <Link href="/reviews" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Reviews</Link>
            <Link href="/contact" className="nav-item nav-item--cta" onClick={() => setMobileMenuOpen(false)}>Contact us</Link>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <section className="page-header">
        <div className="page-header-content">
          <span className="section-tag">Blog</span>
          <h1 className="page-title">SEO Insights & <span className="text-blue">Industry Updates</span></h1>
          <p className="page-desc">
            Stay ahead of the curve with expert insights on SEO, AEO, GEO, and digital marketing strategies.
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="blog-section">
        {/* Search Input */}
        <div className="blog-search" style={{
          maxWidth: '600px',
          margin: '0 auto 2rem',
          position: 'relative'
        }}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#6b7280',
              pointerEvents: 'none'
            }}
          >
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search articles by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px 14px 48px',
              fontSize: '1rem',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              backgroundColor: '#fff'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Categories */}
        <div className="blog-categories">
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`blog-category ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
              style={{
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {showFeaturedPost && featuredPost && (
          <Link href={`/blog/${featuredPost.slug?.current || 'article'}`} className="featured-post">
            <div className="featured-post-image">
              <div className="featured-post-image-gradient gradient-1"></div>
              <span className="featured-badge">Featured</span>
            </div>
            <div className="featured-post-content">
              <div className="featured-post-meta">
                <span className="featured-post-category">{featuredPost.category}</span>
                <span className="featured-post-date">{formatDate(featuredPost.publishedAt)}</span>
                <span className="featured-post-read">{featuredPost.readTime}</span>
              </div>
              <h2 className="featured-post-title">{featuredPost.title}</h2>
              <p className="featured-post-excerpt">{featuredPost.excerpt}</p>
              <span className="featured-post-link">
                Read Article
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </Link>
        )}

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="blog-grid">
            {filteredPosts.map((post, i) => (
              <Link key={post._id} href={`/blog/${post.slug?.current || 'article'}`} className="blog-card">
                <div className="blog-card-image">
                  <div className={`blog-card-image-gradient gradient-${(i % 3) + 1}`}></div>
                </div>
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span className="blog-card-category">{post.category}</span>
                    <span className="blog-card-date">{formatDate(post.publishedAt)}</span>
                  </div>
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <span className="blog-card-link">
                    Read More
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          !showFeaturedPost && (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              color: '#6b7280'
            }}>
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                style={{ margin: '0 auto 1rem', opacity: 0.5 }}
              >
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: '#374151' }}>
                No articles found
              </h3>
              <p>Try adjusting your search or filter to find what you&apos;re looking for.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                style={{
                  marginTop: '1rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#3b82f6',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}
              >
                Clear Filters
              </button>
            </div>
          )
        )}

        {/* Load More */}
        <div className="blog-load-more">
          <button className="btn btn--outline">Load More Articles</button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2 className="newsletter-title">Subscribe to Our Newsletter</h2>
          <p className="newsletter-desc">Get the latest SEO tips, industry news, and exclusive insights delivered to your inbox weekly.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit" className="btn btn--primary">Subscribe</button>
          </form>
          <p className="newsletter-note">No spam, unsubscribe anytime.</p>
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
    </>
  );
}

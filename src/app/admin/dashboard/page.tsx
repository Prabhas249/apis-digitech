'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Stats {
  blogPosts: number;
  pricingPlans: number;
  reviews: number;
  faqs: number;
  caseStudies: number;
}

const statCards = [
  { key: 'blogPosts', label: 'Blog Posts', href: '/admin/blog', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z', color: '#3b82f6' },
  { key: 'pricingPlans', label: 'Pricing Plans', href: '/admin/pricing', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: '#22c55e' },
  { key: 'reviews', label: 'Reviews', href: '/admin/reviews', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', color: '#f59e0b' },
  { key: 'faqs', label: 'FAQs', href: '/admin/faqs', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: '#a855f7' },
  { key: 'caseStudies', label: 'Case Studies', href: '/admin/case-studies', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: '#ec4899' },
];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function formatDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

const quickActions = [
  { label: 'New Blog Post', href: '/admin/blog', icon: 'M12 4v16m8-8H4' },
  { label: 'Edit Homepage', href: '/admin/homepage', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { label: 'Add Review', href: '/admin/reviews', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
  { label: 'Site Settings', href: '/admin/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [blog, pricing, reviews, faqs, caseStudies] = await Promise.all([
          fetch('/api/admin/blog').then((r) => r.json()),
          fetch('/api/admin/pricing').then((r) => r.json()),
          fetch('/api/admin/reviews').then((r) => r.json()),
          fetch('/api/admin/faqs').then((r) => r.json()),
          fetch('/api/admin/case-studies').then((r) => r.json()),
        ]);

        setStats({
          blogPosts: blog.posts?.length || 0,
          pricingPlans: pricing.plans?.length || 0,
          reviews: reviews.reviews?.length || 0,
          faqs: faqs.faqs?.length || 0,
          caseStudies: caseStudies.caseStudies?.length || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="greeting-section">
          <h1>{getGreeting()}</h1>
          <p className="date">{formatDate()}</p>
        </div>
        <p className="subtitle">Here&apos;s an overview of your content</p>
      </div>

      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <Link key={stat.key} href={stat.href} className="stat-card" style={{ animationDelay: `${index * 0.05}s` }}>
            <div className="stat-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={stat.icon} />
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">
                {loading ? '...' : stats?.[stat.key as keyof Stats] || 0}
              </span>
            </div>
            <div className="stat-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href} className="quick-action">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={action.icon} />
                </svg>
                <span>{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <h2>Site Status</h2>
          <div className="status-list">
            <div className="status-item">
              <span className="status-dot green" />
              <span className="status-label">Website Status</span>
              <span className="status-value green">Online</span>
            </div>
            <div className="status-item">
              <span className="status-dot blue" />
              <span className="status-label">Total Content</span>
              <span className="status-value">
                {loading ? '...' : Object.values(stats || {}).reduce((a, b) => a + b, 0)}
              </span>
            </div>
            <div className="status-item">
              <span className="status-dot orange" />
              <span className="status-label">CMS Type</span>
              <span className="status-value">JSON Storage</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          color: #fff;
        }

        .dashboard-header {
          margin-bottom: 2rem;
        }

        .greeting-section {
          margin-bottom: 0.5rem;
        }

        .dashboard-header h1 {
          font-size: 1.875rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
          background: linear-gradient(135deg, #fff 0%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .date {
          color: #64748b;
          font-size: 0.9375rem;
        }

        .subtitle {
          color: #475569;
          font-size: 0.875rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          background: #0f172a;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.25s ease;
          animation: fadeInUp 0.4s ease forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stat-card:hover {
          border-color: rgba(255,255,255,0.15);
          transform: translateY(-3px);
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .stat-label {
          font-size: 0.8125rem;
          color: #64748b;
          margin-bottom: 0.125rem;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
        }

        .stat-arrow {
          color: #475569;
          transition: all 0.2s;
        }

        .stat-card:hover .stat-arrow {
          color: #94a3b8;
          transform: translateX(3px);
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .dashboard-card {
          background: #0f172a;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .dashboard-card h2 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #fff;
        }

        .quick-actions {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .quick-action {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px;
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.875rem;
          transition: all 0.2s;
        }

        .quick-action:hover {
          background: rgba(37,99,235,0.1);
          border-color: rgba(37,99,235,0.3);
          color: #fff;
        }

        .status-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .status-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: rgba(255,255,255,0.03);
          border-radius: 8px;
        }

        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .status-dot.green { background: #22c55e; }
        .status-dot.blue { background: #3b82f6; }
        .status-dot.orange { background: #f97316; }

        .status-label {
          flex: 1;
          color: #94a3b8;
          font-size: 0.875rem;
        }

        .status-value {
          font-size: 0.875rem;
          font-weight: 500;
          color: #fff;
        }

        .status-value.green { color: #22c55e; }

        @media (max-width: 640px) {
          .quick-actions {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

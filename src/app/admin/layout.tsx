'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { href: '/admin/blog', label: 'Blog Posts', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
  { href: '/admin/pricing', label: 'Pricing', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { href: '/admin/reviews', label: 'Reviews', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
  { href: '/admin/faqs', label: 'FAQs', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { href: '/admin/case-studies', label: 'Case Studies', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { href: '/admin/homepage', label: 'Homepage', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
  { href: '/admin/settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Don't show layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <Link href="/admin/dashboard" className="admin-logo">
            <div className="brand-mark">
              <span>A</span>
              <div className="brand-glow" />
            </div>
            <div className="brand-text">
              <span className="brand-name">Apis Admin</span>
              <span className="brand-badge">CMS</span>
            </div>
          </Link>
          <button className="admin-sidebar-close" onClick={() => setSidebarOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="nav-section-label">Content</div>
        <nav className="admin-nav">
          {navItems.slice(0, 6).map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-item ${pathname === item.href ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
              style={{ animationDelay: `${index * 0.03}s` }}
            >
              <div className="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={item.icon} />
                </svg>
              </div>
              <span>{item.label}</span>
              {pathname === item.href && <div className="active-indicator" />}
            </Link>
          ))}
        </nav>

        <div className="nav-section-label">Configuration</div>
        <nav className="admin-nav">
          {navItems.slice(6).map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-item ${pathname === item.href ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
              style={{ animationDelay: `${(index + 6) * 0.03}s` }}
            >
              <div className="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={item.icon} />
                </svg>
              </div>
              <span>{item.label}</span>
              {pathname === item.href && <div className="active-indicator" />}
            </Link>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <button onClick={handleLogout} className="admin-logout-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        <header className="admin-header">
          <button className="admin-menu-btn" onClick={() => setSidebarOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="admin-header-title">
            <span className="page-title">{navItems.find(i => i.href === pathname)?.label || 'Admin'}</span>
          </div>
          <div className="header-actions">
            <Link href="/" className="admin-view-site" target="_blank">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              <span>View Site</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </Link>
          </div>
        </header>
        <main className="admin-content">
          <div className="content-wrapper">
            {children}
          </div>
        </main>
      </div>

      {/* Overlay */}
      {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}

      <style jsx>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: #080c14;
        }

        .admin-sidebar {
          width: 280px;
          background: linear-gradient(180deg, #0f172a 0%, #0c1322 100%);
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          z-index: 100;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .admin-sidebar-header {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .admin-sidebar-close {
          display: none;
          background: rgba(255,255,255,0.05);
          border: none;
          border-radius: 8px;
          padding: 0.5rem;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.2s;
        }

        .admin-sidebar-close:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }

        .admin-logo {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          text-decoration: none;
        }

        .brand-mark {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.25rem;
          color: #fff;
          position: relative;
          overflow: hidden;
        }

        .brand-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%);
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
          line-height: 1.2;
        }

        .brand-badge {
          font-size: 0.625rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .nav-section-label {
          padding: 1.25rem 1.5rem 0.5rem;
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #475569;
        }

        .admin-nav {
          padding: 0 0.75rem 0.5rem;
        }

        .admin-nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.9375rem;
          transition: all 0.2s ease;
          margin-bottom: 0.25rem;
          position: relative;
          animation: fadeIn 0.3s ease forwards;
          opacity: 0;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .nav-icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: rgba(255,255,255,0.03);
          transition: all 0.2s;
        }

        .admin-nav-item:hover {
          color: #fff;
        }

        .admin-nav-item:hover .nav-icon {
          background: rgba(255,255,255,0.08);
        }

        .admin-nav-item.active {
          color: #fff;
        }

        .admin-nav-item.active .nav-icon {
          background: linear-gradient(135deg, rgba(37,99,235,0.3), rgba(124,58,237,0.3));
          color: #60a5fa;
        }

        .active-indicator {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 24px;
          background: linear-gradient(180deg, #3b82f6, #8b5cf6);
          border-radius: 0 4px 4px 0;
        }

        .admin-sidebar-footer {
          padding: 1rem 1.25rem 1.5rem;
          margin-top: auto;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .admin-logout-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.875rem 1rem;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 10px;
          color: #f87171;
          font-size: 0.9375rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .admin-logout-btn:hover {
          background: rgba(239,68,68,0.15);
          border-color: rgba(239,68,68,0.4);
          transform: translateY(-1px);
        }

        .admin-main {
          flex: 1;
          margin-left: 280px;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .admin-header {
          height: 72px;
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          padding: 0 2rem;
          gap: 1rem;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .admin-menu-btn {
          display: none;
          background: rgba(255,255,255,0.05);
          border: none;
          border-radius: 10px;
          color: #94a3b8;
          cursor: pointer;
          padding: 0.625rem;
          transition: all 0.2s;
        }

        .admin-menu-btn:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }

        .admin-header-title {
          flex: 1;
        }

        .page-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #fff;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .admin-view-site {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .admin-view-site:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.15);
          color: #fff;
          transform: translateY(-1px);
        }

        .admin-content {
          flex: 1;
          padding: 2rem;
          background: linear-gradient(180deg, rgba(8,12,20,0) 0%, rgba(8,12,20,1) 100%);
        }

        .content-wrapper {
          max-width: 1400px;
          margin: 0 auto;
        }

        .admin-overlay {
          display: none;
        }

        @media (max-width: 1024px) {
          .admin-sidebar {
            transform: translateX(-100%);
            box-shadow: none;
          }

          .admin-sidebar.open {
            transform: translateX(0);
            box-shadow: 20px 0 60px rgba(0,0,0,0.5);
          }

          .admin-sidebar-close {
            display: flex;
          }

          .admin-main {
            margin-left: 0;
          }

          .admin-menu-btn {
            display: flex;
          }

          .admin-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(4px);
            z-index: 99;
            animation: fadeOverlay 0.2s ease;
          }

          @keyframes fadeOverlay {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        }

        @media (max-width: 640px) {
          .admin-content {
            padding: 1rem;
          }

          .admin-header {
            padding: 0 1rem;
          }

          .admin-view-site span {
            display: none;
          }

          .page-title {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </div>
  );
}

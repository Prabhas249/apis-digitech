'use client';

export default function PageLoader() {
  return (
    <div className="page-loader">
      <div className="loader-content">
        <div className="loader-spinner">
          <div className="spinner-ring"></div>
          <div className="brand-mark">A</div>
        </div>
        <p className="loader-text">Loading...</p>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-image"></div>
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text short"></div>
    </div>
  );
}

export function SkeletonArticle() {
  return (
    <div className="skeleton-article">
      <div className="skeleton skeleton-header"></div>
      <div className="skeleton skeleton-title large"></div>
      <div className="skeleton-meta">
        <div className="skeleton skeleton-avatar"></div>
        <div className="skeleton skeleton-text short"></div>
      </div>
      <div className="skeleton-body">
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text short"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
      </div>
    </div>
  );
}

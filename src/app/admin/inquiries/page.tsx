'use client';

import { useEffect, useState } from 'react';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  status: string;
  createdAt: string;
}

const serviceLabels: Record<string, string> = {
  'seo': 'SEO Services',
  'aeo': 'Answer Engine Optimization',
  'geo': 'Generative Engine Optimization',
  'local-seo': 'Local SEO',
  'link-building': 'Link Building',
  'content': 'Content Marketing',
  'full': 'Full Digital Marketing',
};

const statusColors: Record<string, { bg: string; text: string }> = {
  'new': { bg: 'rgba(59, 130, 246, 0.15)', text: '#3b82f6' },
  'contacted': { bg: 'rgba(245, 158, 11, 0.15)', text: '#f59e0b' },
  'converted': { bg: 'rgba(34, 197, 94, 0.15)', text: '#22c55e' },
  'closed': { bg: 'rgba(107, 114, 128, 0.15)', text: '#6b7280' },
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/admin/inquiries');
      const data = await res.json();
      setInquiries(data.inquiries || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch('/api/admin/inquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      fetchInquiries();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await fetch(`/api/admin/inquiries?id=${id}`, { method: 'DELETE' });
      fetchInquiries();
      setSelectedInquiry(null);
    } catch (error) {
      console.error('Error deleting inquiry:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const newCount = inquiries.filter(i => i.status === 'new').length;

  return (
    <div className="inquiries-page">
      <div className="admin-page-header">
        <div className="header-info">
          <h1>Contact Inquiries</h1>
          <p>Manage leads and contact form submissions</p>
        </div>
        {newCount > 0 && (
          <div className="new-badge">
            <span>{newCount}</span> new
          </div>
        )}
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <span>Loading inquiries...</span>
        </div>
      ) : inquiries.length === 0 ? (
        <div className="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <h3>No inquiries yet</h3>
          <p>When visitors submit the contact form, their inquiries will appear here.</p>
        </div>
      ) : (
        <div className="inquiries-layout">
          <div className="inquiries-list">
            {inquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className={`inquiry-card ${selectedInquiry?.id === inquiry.id ? 'selected' : ''} ${inquiry.status === 'new' ? 'is-new' : ''}`}
                onClick={() => setSelectedInquiry(inquiry)}
              >
                <div className="inquiry-header">
                  <div className="inquiry-name">{inquiry.name}</div>
                  <div
                    className="status-badge"
                    style={{
                      background: statusColors[inquiry.status]?.bg || statusColors['new'].bg,
                      color: statusColors[inquiry.status]?.text || statusColors['new'].text,
                    }}
                  >
                    {inquiry.status}
                  </div>
                </div>
                <div className="inquiry-email">{inquiry.email}</div>
                <div className="inquiry-preview">{inquiry.message.substring(0, 80)}...</div>
                <div className="inquiry-date">{formatDate(inquiry.createdAt)}</div>
              </div>
            ))}
          </div>

          {selectedInquiry && (
            <div className="inquiry-detail">
              <div className="detail-header">
                <h2>{selectedInquiry.name}</h2>
                <button className="close-btn" onClick={() => setSelectedInquiry(null)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="detail-meta">
                <div className="meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <a href={`mailto:${selectedInquiry.email}`}>{selectedInquiry.email}</a>
                </div>
                {selectedInquiry.phone && (
                  <div className="meta-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                    <a href={`tel:${selectedInquiry.phone}`}>{selectedInquiry.phone}</a>
                  </div>
                )}
                {selectedInquiry.company && (
                  <div className="meta-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"/>
                    </svg>
                    <span>{selectedInquiry.company}</span>
                  </div>
                )}
                <div className="meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <span>{formatDate(selectedInquiry.createdAt)}</span>
                </div>
              </div>

              {(selectedInquiry.service || selectedInquiry.budget) && (
                <div className="detail-tags">
                  {selectedInquiry.service && (
                    <span className="tag">{serviceLabels[selectedInquiry.service] || selectedInquiry.service}</span>
                  )}
                  {selectedInquiry.budget && (
                    <span className="tag">${selectedInquiry.budget}</span>
                  )}
                </div>
              )}

              <div className="detail-message">
                <h4>Message</h4>
                <p>{selectedInquiry.message}</p>
              </div>

              <div className="detail-actions">
                <div className="status-select">
                  <label>Status:</label>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => updateStatus(selectedInquiry.id, e.target.value)}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <button className="delete-btn" onClick={() => deleteInquiry(selectedInquiry.id)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .inquiries-page {
          color: #fff;
        }

        .admin-page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        .header-info h1 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .header-info p {
          color: #64748b;
          font-size: 0.875rem;
        }

        .new-badge {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 1rem;
          background: rgba(59, 130, 246, 0.15);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 20px;
          color: #3b82f6;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .new-badge span {
          background: #3b82f6;
          color: #fff;
          padding: 0.125rem 0.5rem;
          border-radius: 10px;
          font-size: 0.75rem;
        }

        .loading-state,
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          text-align: center;
          color: #64748b;
        }

        .spinner {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(255,255,255,0.1);
          border-top-color: #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .empty-state svg {
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .empty-state h3 {
          color: #fff;
          margin-bottom: 0.5rem;
        }

        .inquiries-layout {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 1.5rem;
        }

        .inquiries-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-height: calc(100vh - 250px);
          overflow-y: auto;
        }

        .inquiry-card {
          background: linear-gradient(145deg, #1e293b 0%, #0f172a 100%);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 1rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .inquiry-card:hover {
          border-color: rgba(255,255,255,0.15);
          background: linear-gradient(145deg, #253548 0%, #1e293b 100%);
        }

        .inquiry-card.selected {
          border-color: #3b82f6;
          background: rgba(59, 130, 246, 0.08);
        }

        .inquiry-card.is-new {
          border-left: 3px solid #3b82f6;
        }

        .inquiry-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.375rem;
        }

        .inquiry-name {
          font-weight: 600;
          color: #fff;
        }

        .status-badge {
          font-size: 0.6875rem;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .inquiry-email {
          font-size: 0.8125rem;
          color: #3b82f6;
          margin-bottom: 0.5rem;
        }

        .inquiry-preview {
          font-size: 0.8125rem;
          color: #94a3b8;
          line-height: 1.4;
          margin-bottom: 0.5rem;
        }

        .inquiry-date {
          font-size: 0.75rem;
          color: #475569;
        }

        .inquiry-detail {
          background: linear-gradient(145deg, #1e293b 0%, #0f172a 100%);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 1.5rem;
          position: sticky;
          top: 1rem;
        }

        .detail-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .detail-header h2 {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .close-btn {
          background: rgba(255,255,255,0.05);
          border: none;
          border-radius: 8px;
          padding: 0.5rem;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }

        .detail-meta {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #94a3b8;
        }

        .meta-item a {
          color: #3b82f6;
          text-decoration: none;
        }

        .meta-item a:hover {
          text-decoration: underline;
        }

        .detail-tags {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .tag {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 0.375rem 0.75rem;
          border-radius: 6px;
          font-size: 0.8125rem;
          color: #94a3b8;
        }

        .detail-message {
          margin-bottom: 1.5rem;
        }

        .detail-message h4 {
          font-size: 0.8125rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748b;
          margin-bottom: 0.5rem;
        }

        .detail-message p {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: #e2e8f0;
          background: rgba(255,255,255,0.03);
          border-radius: 8px;
          padding: 1rem;
        }

        .detail-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .status-select {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .status-select label {
          font-size: 0.875rem;
          color: #64748b;
        }

        .status-select select {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          padding: 0.5rem 0.75rem;
          color: #fff;
          font-size: 0.875rem;
          cursor: pointer;
        }

        .delete-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 8px;
          padding: 0.5rem 1rem;
          color: #f87171;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .delete-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.4);
        }

        @media (max-width: 1024px) {
          .inquiries-layout {
            grid-template-columns: 1fr;
          }

          .inquiry-detail {
            position: fixed;
            inset: 0;
            z-index: 100;
            border-radius: 0;
            overflow-y: auto;
          }
        }
      `}</style>
    </div>
  );
}

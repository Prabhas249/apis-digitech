'use client';

import { ReactNode, useEffect, useRef } from 'react';

// ============ MODAL ============
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widths = { sm: '400px', md: '500px', lg: '640px', xl: '800px' };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={modalRef}
        className="modal-container"
        style={{ maxWidth: widths[size] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          z-index: 1000;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .modal-container {
          width: 100%;
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          max-height: 90vh;
          max-height: 90dvh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: slideUp 0.3s ease;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          flex-shrink: 0;
        }
        .modal-header h2 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #fff;
          margin: 0;
        }
        .modal-close {
          background: rgba(255, 255, 255, 0.05);
          border: none;
          border-radius: 8px;
          padding: 0.5rem;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.2s;
          min-width: 36px;
          min-height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-close:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }
        .modal-body {
          padding: 1.25rem;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        @media (max-width: 640px) {
          .modal-overlay {
            padding: 0;
            align-items: flex-end;
          }
          .modal-container {
            max-width: 100% !important;
            max-height: 95vh;
            max-height: 95dvh;
            border-radius: 20px 20px 0 0;
            animation: slideUpMobile 0.3s ease;
          }
          @keyframes slideUpMobile {
            from { opacity: 0; transform: translateY(100%); }
            to { opacity: 1; transform: translateY(0); }
          }
          .modal-header {
            padding: 1rem;
          }
          .modal-body {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

// ============ FORM FIELD ============
interface FormFieldProps {
  label: string;
  children: ReactNode;
  error?: string;
  required?: boolean;
}

export function FormField({ label, children, error, required }: FormFieldProps) {
  return (
    <div className="form-field">
      <label>
        {label}
        {required && <span className="required">*</span>}
      </label>
      {children}
      {error && <span className="error">{error}</span>}

      <style jsx>{`
        .form-field {
          margin-bottom: 1rem;
        }
        label {
          display: block;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #94a3b8;
          margin-bottom: 0.375rem;
        }
        .required {
          color: #ef4444;
          margin-left: 0.25rem;
        }
        .error {
          display: block;
          font-size: 0.75rem;
          color: #ef4444;
          margin-top: 0.375rem;
        }
      `}</style>
    </div>
  );
}

// ============ INPUT ============
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}

export function Input({ fullWidth = true, ...props }: InputProps) {
  return (
    <>
      <input className={`admin-input ${fullWidth ? 'full-width' : ''}`} {...props} />
      <style jsx>{`
        .admin-input {
          padding: 0.875rem 1rem;
          background: #1e293b;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          color: #f1f5f9;
          font-size: 16px;
          transition: border-color 0.2s, box-shadow 0.2s;
          caret-color: #3b82f6;
        }
        .admin-input.full-width {
          width: 100%;
        }
        .admin-input:hover {
          border-color: rgba(255, 255, 255, 0.2);
        }
        .admin-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
          background: #1e293b;
        }
        .admin-input::placeholder {
          color: #64748b;
        }
        .admin-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: #0f172a;
        }
      `}</style>
    </>
  );
}

// ============ TEXTAREA ============
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  fullWidth?: boolean;
}

export function Textarea({ fullWidth = true, ...props }: TextareaProps) {
  return (
    <>
      <textarea className={`admin-textarea ${fullWidth ? 'full-width' : ''}`} {...props} />
      <style jsx>{`
        .admin-textarea {
          padding: 0.875rem 1rem;
          background: #1e293b;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          color: #f1f5f9;
          font-size: 16px;
          font-family: inherit;
          resize: vertical;
          min-height: 100px;
          transition: border-color 0.2s, box-shadow 0.2s;
          caret-color: #3b82f6;
        }
        .admin-textarea.full-width {
          width: 100%;
        }
        .admin-textarea:hover {
          border-color: rgba(255, 255, 255, 0.2);
        }
        .admin-textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
          background: #1e293b;
        }
        .admin-textarea::placeholder {
          color: #64748b;
        }
      `}</style>
    </>
  );
}

// ============ SELECT ============
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  fullWidth?: boolean;
}

export function Select({ options, fullWidth = true, ...props }: SelectProps) {
  return (
    <>
      <select className={`admin-select ${fullWidth ? 'full-width' : ''}`} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <style jsx>{`
        .admin-select {
          padding: 0.875rem 1rem;
          background: #1e293b;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          color: #f1f5f9;
          font-size: 16px;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1rem;
          padding-right: 2.5rem;
        }
        .admin-select.full-width {
          width: 100%;
        }
        .admin-select:hover {
          border-color: rgba(255, 255, 255, 0.2);
        }
        .admin-select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
        }
        .admin-select option {
          background: #1e293b;
          color: #f1f5f9;
          padding: 0.5rem;
        }
      `}</style>
    </>
  );
}

// ============ CHECKBOX ============
interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <label className="admin-checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="checkmark">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      <span className="label-text">{label}</span>

      <style jsx>{`
        .admin-checkbox {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          user-select: none;
          padding: 0.25rem 0;
        }
        .admin-checkbox input {
          display: none;
        }
        .checkmark {
          width: 22px;
          height: 22px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          color: transparent;
          flex-shrink: 0;
        }
        .admin-checkbox input:checked + .checkmark {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          border-color: transparent;
          color: #fff;
        }
        .label-text {
          color: #e2e8f0;
          font-size: 0.9375rem;
        }
      `}</style>
    </label>
  );
}

// ============ BUTTON ============
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading,
  fullWidth,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <>
      <button
        className={`admin-btn ${variant} ${size} ${fullWidth ? 'full-width' : ''}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="spinner" />
        ) : (
          children
        )}
      </button>
      <style jsx>{`
        .admin-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 500;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          white-space: nowrap;
          touch-action: manipulation;
        }
        .admin-btn.full-width {
          width: 100%;
        }
        .admin-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Sizes */
        .admin-btn.sm { padding: 0.5rem 1rem; font-size: 0.8125rem; min-height: 36px; }
        .admin-btn.md { padding: 0.75rem 1.25rem; font-size: 0.9375rem; min-height: 44px; }
        .admin-btn.lg { padding: 1rem 1.75rem; font-size: 1rem; min-height: 52px; }

        /* Variants */
        .admin-btn.primary {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          color: #fff;
        }
        .admin-btn.primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
        }
        .admin-btn.primary:active:not(:disabled) {
          transform: translateY(0);
        }

        .admin-btn.secondary {
          background: rgba(255, 255, 255, 0.08);
          color: #e2e8f0;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .admin-btn.secondary:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .admin-btn.danger {
          background: rgba(239, 68, 68, 0.15);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }
        .admin-btn.danger:hover:not(:disabled) {
          background: rgba(239, 68, 68, 0.25);
        }

        .admin-btn.ghost {
          background: transparent;
          color: #94a3b8;
        }
        .admin-btn.ghost:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top-color: currentColor;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}

// ============ DELETE CONFIRM ============
interface DeleteConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  loading?: boolean;
}

export function DeleteConfirm({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Item',
  message = 'Are you sure you want to delete this item? This action cannot be undone.',
  loading
}: DeleteConfirmProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>{message}</p>
      <div className="delete-actions">
        <Button variant="secondary" onClick={onClose} disabled={loading} fullWidth>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} loading={loading} fullWidth>
          Delete
        </Button>
      </div>
      <style jsx>{`
        .delete-actions {
          display: flex;
          gap: 0.75rem;
        }
        @media (max-width: 480px) {
          .delete-actions {
            flex-direction: column-reverse;
          }
        }
      `}</style>
    </Modal>
  );
}

// ============ TOAST NOTIFICATION ============
interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export function Toast({ message, type = 'success', onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)', color: '#22c55e' },
    error: { bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.3)', color: '#ef4444' },
    info: { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)', color: '#3b82f6' }
  };

  return (
    <div className="toast">
      <span>{message}</span>
      <button onClick={onClose}>×</button>

      <style jsx>{`
        .toast {
          position: fixed;
          bottom: 1rem;
          left: 1rem;
          right: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem;
          background: ${colors[type].bg};
          border: 1px solid ${colors[type].border};
          border-radius: 10px;
          color: ${colors[type].color};
          font-size: 0.875rem;
          z-index: 9999;
          animation: slideIn 0.3s ease;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        button {
          background: none;
          border: none;
          color: inherit;
          font-size: 1.5rem;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.2s;
          padding: 0.25rem;
          min-width: 32px;
          min-height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        button:hover {
          opacity: 1;
        }
        @media (min-width: 640px) {
          .toast {
            left: auto;
            right: 1.5rem;
            bottom: 1.5rem;
            max-width: 400px;
          }
        }
      `}</style>
    </div>
  );
}

// ============ EMPTY STATE ============
interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon = '📭', title, description, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action && <div className="action">{action}</div>}

      <style jsx>{`
        .empty-state {
          text-align: center;
          padding: 3rem 1.5rem;
        }
        .icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 0.5rem;
        }
        p {
          color: #64748b;
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
        }
        .action {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}

// ============ PAGE HEADER ============
interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div className="header-text">
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action && <div className="header-action">{action}</div>}

      <style jsx>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
          gap: 1rem;
        }
        .header-text {
          min-width: 0;
        }
        h1 {
          font-size: 1.375rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.25rem;
        }
        p {
          color: #64748b;
          font-size: 0.875rem;
        }
        .header-action {
          flex-shrink: 0;
        }
        @media (max-width: 480px) {
          .page-header {
            flex-direction: column;
            align-items: stretch;
          }
          h1 {
            font-size: 1.25rem;
          }
          .header-action {
            margin-top: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}

// ============ DATA TABLE ============
interface Column<T> {
  key: keyof T | 'actions';
  header: string;
  render?: (item: T) => ReactNode;
  width?: string;
  hideOnMobile?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
}

export function DataTable<T extends { _id: string }>({
  columns,
  data,
  loading,
  emptyMessage = 'No data found'
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="table-loading">
        <div className="spinner" />
        <span>Loading...</span>
        <style jsx>{`
          .table-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            padding: 4rem 2rem;
            color: #64748b;
          }
          .spinner {
            width: 32px;
            height: 32px;
            border: 3px solid rgba(255, 255, 255, 0.1);
            border-top-color: #3b82f6;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (data.length === 0) {
    return <EmptyState title={emptyMessage} />;
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="table-wrapper desktop-table">
        <table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)} style={{ width: col.width }} className={col.hideOnMobile ? 'hide-mobile' : ''}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                {columns.map((col) => (
                  <td key={String(col.key)} className={col.hideOnMobile ? 'hide-mobile' : ''}>
                    {col.render ? col.render(item) : String(item[col.key as keyof T] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="mobile-cards">
        {data.map((item) => (
          <div key={item._id} className="mobile-card">
            <div className="card-main">
              {columns[0].render ? columns[0].render(item) : String(item[columns[0].key as keyof T] ?? '')}
            </div>
            <div className="card-meta">
              {columns.slice(1, -1).map((col) => (
                col.key !== 'actions' && (
                  <div key={String(col.key)} className="meta-item">
                    <span className="meta-label">{col.header}</span>
                    <span className="meta-value">
                      {col.render ? col.render(item) : String(item[col.key as keyof T] ?? '')}
                    </span>
                  </div>
                )
              ))}
            </div>
            <div className="card-actions">
              {columns.find(c => c.key === 'actions')?.render?.(item)}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .table-wrapper {
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          overflow: hidden;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th {
          text-align: left;
          padding: 0.875rem 1rem;
          color: #64748b;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        td {
          padding: 0.875rem 1rem;
          color: #e2e8f0;
          font-size: 0.875rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        tr:last-child td {
          border-bottom: none;
        }
        tr:hover td {
          background: rgba(255, 255, 255, 0.02);
        }

        .mobile-cards {
          display: none;
        }

        .mobile-card {
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 0.75rem;
        }
        .mobile-card:last-child {
          margin-bottom: 0;
        }
        .card-main {
          margin-bottom: 0.75rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .card-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }
        .meta-label {
          font-size: 0.6875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748b;
        }
        .meta-value {
          font-size: 0.8125rem;
          color: #e2e8f0;
        }
        .card-actions {
          display: flex;
          justify-content: flex-end;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        @media (max-width: 768px) {
          .desktop-table {
            display: none;
          }
          .mobile-cards {
            display: block;
          }
        }
      `}</style>
    </>
  );
}

// ============ BADGE ============
interface BadgeProps {
  children: ReactNode;
  color?: 'blue' | 'green' | 'orange' | 'purple' | 'gray';
}

export function Badge({ children, color = 'blue' }: BadgeProps) {
  const colors = {
    blue: { bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' },
    green: { bg: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' },
    orange: { bg: 'rgba(249, 115, 22, 0.15)', color: '#f97316' },
    purple: { bg: 'rgba(168, 85, 247, 0.15)', color: '#a855f7' },
    gray: { bg: 'rgba(148, 163, 184, 0.15)', color: '#94a3b8' }
  };

  return (
    <span
      className="badge"
      style={{ background: colors[color].bg, color: colors[color].color }}
    >
      {children}
      <style jsx>{`
        .badge {
          display: inline-flex;
          padding: 0.25rem 0.625rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 500;
          white-space: nowrap;
        }
      `}</style>
    </span>
  );
}

// ============ ACTION BUTTONS (for tables) ============
interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function ActionButtons({ onEdit, onDelete }: ActionButtonsProps) {
  return (
    <div className="action-buttons">
      <button className="edit-btn" onClick={onEdit} title="Edit">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
        <span className="btn-label">Edit</span>
      </button>
      <button className="delete-btn" onClick={onDelete} title="Delete">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
        </svg>
        <span className="btn-label">Delete</span>
      </button>

      <style jsx>{`
        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }
        button {
          padding: 0.5rem 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.375rem;
          min-height: 36px;
        }
        .btn-label {
          font-size: 0.8125rem;
          display: none;
        }
        .edit-btn:hover {
          background: rgba(59, 130, 246, 0.15);
          border-color: rgba(59, 130, 246, 0.3);
          color: #3b82f6;
        }
        .delete-btn:hover {
          background: rgba(239, 68, 68, 0.15);
          border-color: rgba(239, 68, 68, 0.3);
          color: #ef4444;
        }
        @media (max-width: 768px) {
          .btn-label {
            display: inline;
          }
          button {
            padding: 0.625rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}

// ============ SEARCH INPUT ============
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = 'Search...' }: SearchInputProps) {
  return (
    <div className="search-wrapper">
      <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />
      {value && (
        <button className="clear-btn" onClick={() => onChange('')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}

      <style jsx>{`
        .search-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }
        .search-icon {
          position: absolute;
          left: 1rem;
          color: #64748b;
          pointer-events: none;
        }
        .search-input {
          width: 100%;
          padding: 0.875rem 1rem 0.875rem 2.75rem;
          background: #1e293b;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          color: #f1f5f9;
          font-size: 16px;
          transition: border-color 0.2s, box-shadow 0.2s;
          caret-color: #3b82f6;
        }
        .search-input:hover {
          border-color: rgba(255, 255, 255, 0.2);
        }
        .search-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
          background: #1e293b;
        }
        .search-input::placeholder {
          color: #64748b;
        }
        .clear-btn {
          position: absolute;
          right: 0.75rem;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 6px;
          padding: 0.375rem;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .clear-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
        }
      `}</style>
    </div>
  );
}

// ============ TABLE SKELETON ============
interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 5, columns = 4 }: TableSkeletonProps) {
  return (
    <>
      {/* Desktop Skeleton */}
      <div className="skeleton-wrapper desktop-skeleton">
        <div className="skeleton-header">
          {Array.from({ length: columns }).map((_, i) => (
            <div key={i} className="skeleton-cell header" />
          ))}
        </div>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="skeleton-row" style={{ animationDelay: `${rowIndex * 0.05}s` }}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div
                key={colIndex}
                className="skeleton-cell"
                style={{ width: colIndex === 0 ? '40%' : `${60 / (columns - 1)}%` }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Mobile Skeleton */}
      <div className="mobile-skeleton">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="skeleton-card" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="skeleton-title" />
            <div className="skeleton-meta" />
            <div className="skeleton-actions" />
          </div>
        ))}
      </div>

      <style jsx>{`
        .skeleton-wrapper {
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          overflow: hidden;
        }
        .skeleton-header {
          display: flex;
          gap: 1rem;
          padding: 0.875rem 1rem;
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .skeleton-row {
          display: flex;
          gap: 1rem;
          padding: 0.875rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          animation: fadeIn 0.5s ease forwards;
          opacity: 0;
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        .skeleton-row:last-child {
          border-bottom: none;
        }
        .skeleton-cell {
          height: 1rem;
          background: linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%);
          background-size: 200% 100%;
          border-radius: 4px;
          animation: shimmer 1.5s ease-in-out infinite;
        }
        .skeleton-cell.header {
          height: 0.75rem;
          width: 80px;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .mobile-skeleton {
          display: none;
        }
        .skeleton-card {
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 0.75rem;
          animation: fadeIn 0.5s ease forwards;
          opacity: 0;
        }
        .skeleton-title {
          height: 1.25rem;
          width: 70%;
          background: linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%);
          background-size: 200% 100%;
          border-radius: 4px;
          animation: shimmer 1.5s ease-in-out infinite;
          margin-bottom: 0.75rem;
        }
        .skeleton-meta {
          height: 0.875rem;
          width: 40%;
          background: linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%);
          background-size: 200% 100%;
          border-radius: 4px;
          animation: shimmer 1.5s ease-in-out infinite;
          margin-bottom: 0.75rem;
        }
        .skeleton-actions {
          height: 2.25rem;
          width: 100%;
          background: linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%);
          background-size: 200% 100%;
          border-radius: 6px;
          animation: shimmer 1.5s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .desktop-skeleton {
            display: none;
          }
          .mobile-skeleton {
            display: block;
          }
        }
      `}</style>
    </>
  );
}

// ============ STAT CARD ============
interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: { value: number; positive: boolean };
  color?: string;
}

export function StatCard({ label, value, icon, trend, color = '#3b82f6' }: StatCardProps) {
  return (
    <div className="stat-card">
      {icon && <div className="stat-icon" style={{ background: `${color}15`, color }}>{icon}</div>}
      <div className="stat-content">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
        {trend && (
          <span className={`stat-trend ${trend.positive ? 'positive' : 'negative'}`}>
            {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
        )}
      </div>

      <style jsx>{`
        .stat-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          transition: all 0.2s;
        }
        .stat-card:hover {
          border-color: rgba(255, 255, 255, 0.15);
        }
        .stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .stat-content {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .stat-label {
          font-size: 0.75rem;
          color: #64748b;
          margin-bottom: 0.125rem;
        }
        .stat-value {
          font-size: 1.375rem;
          font-weight: 700;
          color: #fff;
        }
        .stat-trend {
          font-size: 0.75rem;
          font-weight: 500;
          margin-top: 0.125rem;
        }
        .stat-trend.positive { color: #22c55e; }
        .stat-trend.negative { color: #ef4444; }
      `}</style>
    </div>
  );
}

// ============ CARD ============
interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({ children, title, subtitle, action, padding = 'md' }: CardProps) {
  const paddings = { sm: '1rem', md: '1.25rem', lg: '1.5rem' };

  return (
    <div className="card" style={{ padding: paddings[padding] }}>
      {(title || action) && (
        <div className="card-header">
          <div>
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      <div className="card-body">{children}</div>

      <style jsx>{`
        .card {
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .card-title {
          font-size: 1rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 0.125rem;
        }
        .card-subtitle {
          font-size: 0.8125rem;
          color: #64748b;
        }
      `}</style>
    </div>
  );
}

// ============ TABS ============
interface TabsProps {
  tabs: { id: string; label: string; count?: number }[];
  activeTab: string;
  onChange: (id: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="tabs-wrapper">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
          {tab.count !== undefined && <span className="count">{tab.count}</span>}
        </button>
      ))}

      <style jsx>{`
        .tabs-wrapper {
          display: flex;
          gap: 0.25rem;
          padding: 0.25rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 10px;
          margin-bottom: 1.25rem;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1rem;
          background: transparent;
          border: none;
          border-radius: 8px;
          color: #94a3b8;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .tab:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.05);
        }
        .tab.active {
          color: #fff;
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(124, 58, 237, 0.2));
        }
        .count {
          padding: 0.125rem 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 999px;
          font-size: 0.75rem;
        }
        .tab.active .count {
          background: rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </div>
  );
}

'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Modal,
  FormField,
  Input,
  Textarea,
  Button,
  DeleteConfirm,
  Toast,
  PageHeader,
  DataTable,
  Badge,
  ActionButtons
} from '@/components/admin/AdminComponents';

interface CaseStudy {
  _id: string;
  title: string;
  slug: string;
  industry: string;
  preview: string;
  metric: string;
  metricLabel: string;
  timeline: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial: string;
  clientName: string;
}

const emptyCaseStudy: Omit<CaseStudy, '_id'> = {
  title: '',
  slug: '',
  industry: '',
  preview: '',
  metric: '',
  metricLabel: '',
  timeline: '',
  challenge: '',
  solution: '',
  results: [],
  testimonial: '',
  clientName: ''
};

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<CaseStudy | null>(null);
  const [formData, setFormData] = useState(emptyCaseStudy);
  const [resultsText, setResultsText] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchCaseStudies = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/case-studies');
      const data = await res.json();
      setCaseStudies(data.caseStudies || []);
    } catch (error) {
      console.error('Error fetching case studies:', error);
      setToast({ message: 'Failed to load case studies', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCaseStudies();
  }, [fetchCaseStudies]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const openAddModal = () => {
    setEditingCase(null);
    setFormData(emptyCaseStudy);
    setResultsText('');
    setIsModalOpen(true);
  };

  const openEditModal = (caseStudy: CaseStudy) => {
    setEditingCase(caseStudy);
    setFormData({
      title: caseStudy.title,
      slug: caseStudy.slug,
      industry: caseStudy.industry,
      preview: caseStudy.preview,
      metric: caseStudy.metric,
      metricLabel: caseStudy.metricLabel,
      timeline: caseStudy.timeline,
      challenge: caseStudy.challenge,
      solution: caseStudy.solution,
      results: caseStudy.results,
      testimonial: caseStudy.testimonial,
      clientName: caseStudy.clientName
    });
    setResultsText(caseStudy.results.join('\n'));
    setIsModalOpen(true);
  };

  const openDeleteModal = (id: string) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      setToast({ message: 'Title is required', type: 'error' });
      return;
    }

    setSaving(true);
    try {
      const results = resultsText.split('\n').map(r => r.trim()).filter(Boolean);
      const method = editingCase ? 'PUT' : 'POST';
      const body = editingCase
        ? { ...formData, results, _id: editingCase._id }
        : { ...formData, results, _id: `case-${Date.now()}`, slug: formData.slug || generateSlug(formData.title) };

      const res = await fetch('/api/admin/case-studies', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error('Failed to save');

      setToast({ message: editingCase ? 'Case study updated!' : 'Case study created!', type: 'success' });
      setIsModalOpen(false);
      fetchCaseStudies();
    } catch (error) {
      console.error('Error saving case study:', error);
      setToast({ message: 'Failed to save case study', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setSaving(true);
    try {
      const res = await fetch('/api/admin/case-studies', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: deleteId })
      });

      if (!res.ok) throw new Error('Failed to delete');

      setToast({ message: 'Case study deleted!', type: 'success' });
      setIsDeleteOpen(false);
      setDeleteId(null);
      fetchCaseStudies();
    } catch (error) {
      console.error('Error deleting case study:', error);
      setToast({ message: 'Failed to delete case study', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    {
      key: 'title' as const,
      header: 'Case Study',
      render: (cs: CaseStudy) => (
        <div>
          <div style={{ fontWeight: 500, color: '#fff' }}>{cs.title}</div>
          <div style={{ fontSize: '0.8125rem', color: '#64748b', marginTop: '0.25rem' }}>
            {cs.industry} • {cs.timeline}
          </div>
        </div>
      )
    },
    {
      key: 'metric' as const,
      header: 'Key Metric',
      width: '160px',
      render: (cs: CaseStudy) => (
        <div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#22c55e' }}>{cs.metric}</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{cs.metricLabel}</div>
        </div>
      )
    },
    {
      key: 'clientName' as const,
      header: 'Client',
      width: '160px',
      render: (cs: CaseStudy) => <Badge>{cs.clientName.split(',')[0]}</Badge>
    },
    {
      key: 'actions' as const,
      header: 'Actions',
      width: '100px',
      render: (cs: CaseStudy) => (
        <ActionButtons
          onEdit={() => openEditModal(cs)}
          onDelete={() => openDeleteModal(cs._id)}
        />
      )
    }
  ];

  return (
    <div>
      <PageHeader
        title="Case Studies"
        description="Showcase your client success stories"
        action={<Button onClick={openAddModal}>+ Add Case Study</Button>}
      />

      <DataTable
        columns={columns}
        data={caseStudies}
        loading={loading}
        emptyMessage="No case studies yet. Add your first success story!"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCase ? 'Edit Case Study' : 'New Case Study'}
        size="xl"
      >
        <FormField label="Title" required>
          <Input
            value={formData.title}
            onChange={(e) => {
              const title = e.target.value;
              setFormData(prev => ({
                ...prev,
                title,
                slug: editingCase ? prev.slug : generateSlug(title)
              }));
            }}
            placeholder="E-commerce Store - 340% Traffic Growth"
          />
        </FormField>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <FormField label="Slug">
            <Input
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="ecommerce-growth"
            />
          </FormField>

          <FormField label="Industry">
            <Input
              value={formData.industry}
              onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
              placeholder="E-commerce / Retail"
            />
          </FormField>
        </div>

        <FormField label="Preview Text">
          <Textarea
            value={formData.preview}
            onChange={(e) => setFormData(prev => ({ ...prev, preview: e.target.value }))}
            placeholder="Brief overview of the case study"
            rows={2}
          />
        </FormField>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <FormField label="Key Metric">
            <Input
              value={formData.metric}
              onChange={(e) => setFormData(prev => ({ ...prev, metric: e.target.value }))}
              placeholder="340%"
            />
          </FormField>

          <FormField label="Metric Label">
            <Input
              value={formData.metricLabel}
              onChange={(e) => setFormData(prev => ({ ...prev, metricLabel: e.target.value }))}
              placeholder="Traffic Increase"
            />
          </FormField>

          <FormField label="Timeline">
            <Input
              value={formData.timeline}
              onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
              placeholder="8 months"
            />
          </FormField>
        </div>

        <FormField label="Challenge">
          <Textarea
            value={formData.challenge}
            onChange={(e) => setFormData(prev => ({ ...prev, challenge: e.target.value }))}
            placeholder="What problem was the client facing?"
            rows={3}
          />
        </FormField>

        <FormField label="Solution">
          <Textarea
            value={formData.solution}
            onChange={(e) => setFormData(prev => ({ ...prev, solution: e.target.value }))}
            placeholder="What did you do to solve it?"
            rows={3}
          />
        </FormField>

        <FormField label="Results (one per line)">
          <Textarea
            value={resultsText}
            onChange={(e) => setResultsText(e.target.value)}
            placeholder="340% increase in organic traffic&#10;Page 1 rankings for 50+ keywords&#10;180% increase in online sales"
            rows={4}
          />
        </FormField>

        <FormField label="Client Testimonial">
          <Textarea
            value={formData.testimonial}
            onChange={(e) => setFormData(prev => ({ ...prev, testimonial: e.target.value }))}
            placeholder="What did the client say about your work?"
            rows={2}
          />
        </FormField>

        <FormField label="Client Name">
          <Input
            value={formData.clientName}
            onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
            placeholder="John Smith, CEO"
          />
        </FormField>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} loading={saving}>
            {editingCase ? 'Update Case Study' : 'Create Case Study'}
          </Button>
        </div>
      </Modal>

      <DeleteConfirm
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Case Study"
        message="Are you sure you want to delete this case study? This action cannot be undone."
        loading={saving}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

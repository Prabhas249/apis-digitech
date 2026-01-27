'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Modal,
  FormField,
  Input,
  Textarea,
  Select,
  Button,
  DeleteConfirm,
  Toast,
  PageHeader,
  DataTable,
  Badge,
  ActionButtons,
  SearchInput,
  TableSkeleton
} from '@/components/admin/AdminComponents';

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

const CATEGORIES = [
  'General',
  'SEO Services',
  'Pricing & Contracts',
  'Process & Reporting'
];

const emptyFAQ: Omit<FAQ, '_id'> = {
  question: '',
  answer: '',
  category: 'General',
  order: 1
};

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState(emptyFAQ);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(search.toLowerCase()) ||
    faq.answer.toLowerCase().includes(search.toLowerCase()) ||
    faq.category.toLowerCase().includes(search.toLowerCase())
  );

  const fetchFAQs = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/faqs');
      const data = await res.json();
      setFaqs(data.faqs || []);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      setToast({ message: 'Failed to load FAQs', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFAQs();
  }, [fetchFAQs]);

  const openAddModal = () => {
    setEditingFAQ(null);
    setFormData(emptyFAQ);
    setIsModalOpen(true);
  };

  const openEditModal = (faq: FAQ) => {
    setEditingFAQ(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      order: faq.order
    });
    setIsModalOpen(true);
  };

  const openDeleteModal = (id: string) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const handleSave = async () => {
    if (!formData.question.trim() || !formData.answer.trim()) {
      setToast({ message: 'Question and answer are required', type: 'error' });
      return;
    }

    setSaving(true);
    try {
      const method = editingFAQ ? 'PUT' : 'POST';
      const body = editingFAQ
        ? { ...formData, _id: editingFAQ._id }
        : { ...formData, _id: `faq-${Date.now()}` };

      const res = await fetch('/api/admin/faqs', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error('Failed to save');

      setToast({ message: editingFAQ ? 'FAQ updated!' : 'FAQ created!', type: 'success' });
      setIsModalOpen(false);
      fetchFAQs();
    } catch (error) {
      console.error('Error saving FAQ:', error);
      setToast({ message: 'Failed to save FAQ', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setSaving(true);
    try {
      const res = await fetch('/api/admin/faqs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: deleteId })
      });

      if (!res.ok) throw new Error('Failed to delete');

      setToast({ message: 'FAQ deleted!', type: 'success' });
      setIsDeleteOpen(false);
      setDeleteId(null);
      fetchFAQs();
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      setToast({ message: 'Failed to delete FAQ', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    {
      key: 'question' as const,
      header: 'Question',
      render: (faq: FAQ) => (
        <div>
          <div style={{ fontWeight: 500, color: '#fff' }}>{faq.question}</div>
          <div style={{ fontSize: '0.8125rem', color: '#64748b', marginTop: '0.25rem', maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {faq.answer}
          </div>
        </div>
      )
    },
    {
      key: 'category' as const,
      header: 'Category',
      width: '160px',
      render: (faq: FAQ) => <Badge>{faq.category}</Badge>
    },
    {
      key: 'order' as const,
      header: 'Order',
      width: '80px',
      render: (faq: FAQ) => `#${faq.order}`
    },
    {
      key: 'actions' as const,
      header: 'Actions',
      width: '100px',
      render: (faq: FAQ) => (
        <ActionButtons
          onEdit={() => openEditModal(faq)}
          onDelete={() => openDeleteModal(faq._id)}
        />
      )
    }
  ];

  return (
    <div>
      <PageHeader
        title="FAQs"
        description="Manage frequently asked questions"
        action={<Button onClick={openAddModal}>+ Add FAQ</Button>}
      />

      <div style={{ marginBottom: '1.5rem', maxWidth: '400px' }}>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search FAQs..."
        />
      </div>

      {loading ? (
        <TableSkeleton rows={5} columns={4} />
      ) : (
        <DataTable
          columns={columns}
          data={filteredFAQs}
          emptyMessage={search ? `No FAQs matching "${search}"` : "No FAQs yet. Add your first question!"}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingFAQ ? 'Edit FAQ' : 'New FAQ'}
        size="lg"
      >
        <FormField label="Question" required>
          <Input
            value={formData.question}
            onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
            placeholder="What do customers frequently ask?"
          />
        </FormField>

        <FormField label="Answer" required>
          <Textarea
            value={formData.answer}
            onChange={(e) => setFormData(prev => ({ ...prev, answer: e.target.value }))}
            placeholder="Provide a helpful answer..."
            rows={5}
          />
        </FormField>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <FormField label="Category">
            <Select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              options={CATEGORIES.map(c => ({ value: c, label: c }))}
            />
          </FormField>

          <FormField label="Display Order">
            <Input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 1 }))}
              min={1}
            />
          </FormField>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} loading={saving}>
            {editingFAQ ? 'Update FAQ' : 'Add FAQ'}
          </Button>
        </div>
      </Modal>

      <DeleteConfirm
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete FAQ"
        message="Are you sure you want to delete this FAQ? This action cannot be undone."
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

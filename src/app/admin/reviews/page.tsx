'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Modal,
  FormField,
  Input,
  Textarea,
  Checkbox,
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

interface Review {
  _id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  result: string;
  featured: boolean;
}

const emptyReview: Omit<Review, '_id'> = {
  name: '',
  role: '',
  company: '',
  rating: 5,
  text: '',
  result: '',
  featured: false
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [formData, setFormData] = useState(emptyReview);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const filteredReviews = reviews.filter(review =>
    review.name.toLowerCase().includes(search.toLowerCase()) ||
    review.company.toLowerCase().includes(search.toLowerCase()) ||
    review.text.toLowerCase().includes(search.toLowerCase())
  );

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/reviews');
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setToast({ message: 'Failed to load reviews', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const openAddModal = () => {
    setEditingReview(null);
    setFormData(emptyReview);
    setIsModalOpen(true);
  };

  const openEditModal = (review: Review) => {
    setEditingReview(review);
    setFormData({
      name: review.name,
      role: review.role || '',
      company: review.company,
      rating: review.rating,
      text: review.text,
      result: review.result || '',
      featured: review.featured
    });
    setIsModalOpen(true);
  };

  const openDeleteModal = (id: string) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.text.trim()) {
      setToast({ message: 'Name and review text are required', type: 'error' });
      return;
    }

    setSaving(true);
    try {
      const method = editingReview ? 'PUT' : 'POST';
      const body = editingReview
        ? { ...formData, _id: editingReview._id }
        : { ...formData, _id: `review-${Date.now()}` };

      const res = await fetch('/api/admin/reviews', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error('Failed to save');

      setToast({ message: editingReview ? 'Review updated!' : 'Review created!', type: 'success' });
      setIsModalOpen(false);
      fetchReviews();
    } catch (error) {
      console.error('Error saving review:', error);
      setToast({ message: 'Failed to save review', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setSaving(true);
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: deleteId })
      });

      if (!res.ok) throw new Error('Failed to delete');

      setToast({ message: 'Review deleted!', type: 'success' });
      setIsDeleteOpen(false);
      setDeleteId(null);
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
      setToast({ message: 'Failed to delete review', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const columns = [
    {
      key: 'name' as const,
      header: 'Reviewer',
      render: (review: Review) => (
        <div>
          <div style={{ fontWeight: 500, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {review.name}
            {review.featured && <Badge color="orange">Featured</Badge>}
          </div>
          <div style={{ fontSize: '0.8125rem', color: '#64748b', marginTop: '0.25rem' }}>
            {review.role ? `${review.role} at ` : ''}{review.company}
          </div>
        </div>
      )
    },
    {
      key: 'rating' as const,
      header: 'Rating',
      width: '120px',
      render: (review: Review) => (
        <span style={{ color: '#fbbf24', letterSpacing: '2px' }}>{renderStars(review.rating)}</span>
      )
    },
    {
      key: 'result' as const,
      header: 'Result',
      width: '160px',
      render: (review: Review) => review.result ? (
        <Badge color="green">{review.result}</Badge>
      ) : '—'
    },
    {
      key: 'actions' as const,
      header: 'Actions',
      width: '100px',
      render: (review: Review) => (
        <ActionButtons
          onEdit={() => openEditModal(review)}
          onDelete={() => openDeleteModal(review._id)}
        />
      )
    }
  ];

  return (
    <div>
      <PageHeader
        title="Reviews"
        description="Manage customer testimonials and reviews"
        action={<Button onClick={openAddModal}>+ Add Review</Button>}
      />

      <div style={{ marginBottom: '1.5rem', maxWidth: '400px' }}>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search reviews..."
        />
      </div>

      {loading ? (
        <TableSkeleton rows={5} columns={4} />
      ) : (
        <DataTable
          columns={columns}
          data={filteredReviews}
          emptyMessage={search ? `No reviews matching "${search}"` : "No reviews yet. Add your first testimonial!"}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingReview ? 'Edit Review' : 'New Review'}
        size="lg"
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <FormField label="Name" required>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="John Smith"
            />
          </FormField>

          <FormField label="Role">
            <Input
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              placeholder="CEO, Marketing Director, etc."
            />
          </FormField>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <FormField label="Company">
            <Input
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              placeholder="Company Name"
            />
          </FormField>

          <FormField label="Rating">
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    color: star <= formData.rating ? '#fbbf24' : '#475569',
                    cursor: 'pointer',
                    transition: 'transform 0.1s'
                  }}
                >
                  ★
                </button>
              ))}
            </div>
          </FormField>
        </div>

        <FormField label="Review Text" required>
          <Textarea
            value={formData.text}
            onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
            placeholder="What did the customer say about your services?"
            rows={4}
          />
        </FormField>

        <FormField label="Key Result">
          <Input
            value={formData.result}
            onChange={(e) => setFormData(prev => ({ ...prev, result: e.target.value }))}
            placeholder="e.g., 340% traffic increase, 5x ROI"
          />
        </FormField>

        <div style={{ marginBottom: '1.5rem' }}>
          <Checkbox
            label="Featured review (shows prominently)"
            checked={formData.featured}
            onChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} loading={saving}>
            {editingReview ? 'Update Review' : 'Add Review'}
          </Button>
        </div>
      </Modal>

      <DeleteConfirm
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Review"
        message="Are you sure you want to delete this review? This action cannot be undone."
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

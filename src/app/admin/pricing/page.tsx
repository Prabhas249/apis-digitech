'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Modal,
  FormField,
  Input,
  Textarea,
  Select,
  Checkbox,
  Button,
  DeleteConfirm,
  Toast,
  PageHeader,
  DataTable,
  Badge,
  ActionButtons
} from '@/components/admin/AdminComponents';

interface PricingPlan {
  _id: string;
  name: string;
  category: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  order: number;
}

const CATEGORIES = [
  { value: 'seo', label: 'SEO Packages' },
  { value: 'aeo', label: 'AEO Packages' },
  { value: 'geo', label: 'GEO Packages' },
  { value: 'local', label: 'Local SEO' }
];

const emptyPlan: Omit<PricingPlan, '_id'> = {
  name: '',
  category: 'seo',
  price: '',
  period: '/month',
  description: '',
  features: [],
  popular: false,
  order: 1
};

export default function PricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [formData, setFormData] = useState(emptyPlan);
  const [featuresText, setFeaturesText] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchPlans = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/pricing');
      const data = await res.json();
      setPlans(data.plans || []);
    } catch (error) {
      console.error('Error fetching plans:', error);
      setToast({ message: 'Failed to load plans', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const openAddModal = () => {
    setEditingPlan(null);
    setFormData(emptyPlan);
    setFeaturesText('');
    setIsModalOpen(true);
  };

  const openEditModal = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      category: plan.category,
      price: plan.price,
      period: plan.period,
      description: plan.description,
      features: plan.features,
      popular: plan.popular,
      order: plan.order
    });
    setFeaturesText(plan.features.join('\n'));
    setIsModalOpen(true);
  };

  const openDeleteModal = (id: string) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.price.trim()) {
      setToast({ message: 'Name and price are required', type: 'error' });
      return;
    }

    setSaving(true);
    try {
      const features = featuresText.split('\n').map(f => f.trim()).filter(Boolean);
      const method = editingPlan ? 'PUT' : 'POST';
      const body = editingPlan
        ? { ...formData, features, _id: editingPlan._id }
        : { ...formData, features, _id: `plan-${Date.now()}` };

      const res = await fetch('/api/admin/pricing', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error('Failed to save');

      setToast({ message: editingPlan ? 'Plan updated!' : 'Plan created!', type: 'success' });
      setIsModalOpen(false);
      fetchPlans();
    } catch (error) {
      console.error('Error saving plan:', error);
      setToast({ message: 'Failed to save plan', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setSaving(true);
    try {
      const res = await fetch('/api/admin/pricing', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: deleteId })
      });

      if (!res.ok) throw new Error('Failed to delete');

      setToast({ message: 'Plan deleted!', type: 'success' });
      setIsDeleteOpen(false);
      setDeleteId(null);
      fetchPlans();
    } catch (error) {
      console.error('Error deleting plan:', error);
      setToast({ message: 'Failed to delete plan', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const getCategoryLabel = (cat: string) => {
    return CATEGORIES.find(c => c.value === cat)?.label || cat;
  };

  const columns = [
    {
      key: 'name' as const,
      header: 'Plan',
      render: (plan: PricingPlan) => (
        <div>
          <div style={{ fontWeight: 500, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {plan.name}
            {plan.popular && <Badge color="orange">Popular</Badge>}
          </div>
          <div style={{ fontSize: '0.8125rem', color: '#64748b', marginTop: '0.25rem' }}>
            {plan.description.slice(0, 50)}...
          </div>
        </div>
      )
    },
    {
      key: 'category' as const,
      header: 'Category',
      width: '140px',
      render: (plan: PricingPlan) => <Badge>{getCategoryLabel(plan.category)}</Badge>
    },
    {
      key: 'price' as const,
      header: 'Price',
      width: '120px',
      render: (plan: PricingPlan) => (
        <span style={{ fontWeight: 600, color: '#22c55e' }}>
          {plan.price}<span style={{ fontSize: '0.75rem', color: '#64748b' }}>{plan.period}</span>
        </span>
      )
    },
    {
      key: 'features' as const,
      header: 'Features',
      width: '100px',
      render: (plan: PricingPlan) => `${plan.features.length} items`
    },
    {
      key: 'actions' as const,
      header: 'Actions',
      width: '100px',
      render: (plan: PricingPlan) => (
        <ActionButtons
          onEdit={() => openEditModal(plan)}
          onDelete={() => openDeleteModal(plan._id)}
        />
      )
    }
  ];

  return (
    <div>
      <PageHeader
        title="Pricing Plans"
        description="Manage pricing packages and features"
        action={<Button onClick={openAddModal}>+ Add Plan</Button>}
      />

      <DataTable
        columns={columns}
        data={plans}
        loading={loading}
        emptyMessage="No pricing plans yet. Create your first plan!"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPlan ? 'Edit Plan' : 'New Plan'}
        size="lg"
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <FormField label="Plan Name" required>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Starter, Pro, Enterprise"
            />
          </FormField>

          <FormField label="Category">
            <Select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              options={CATEGORIES}
            />
          </FormField>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <FormField label="Price" required>
            <Input
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              placeholder="$999"
            />
          </FormField>

          <FormField label="Period">
            <Select
              value={formData.period}
              onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}
              options={[
                { value: '/month', label: 'Per Month' },
                { value: '/year', label: 'Per Year' },
                { value: '', label: 'One Time' }
              ]}
            />
          </FormField>
        </div>

        <FormField label="Description">
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Brief description of this plan"
            rows={2}
          />
        </FormField>

        <FormField label="Features (one per line)">
          <Textarea
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
            placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
            rows={6}
          />
        </FormField>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <FormField label="Display Order">
            <Input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 1 }))}
              min={1}
            />
          </FormField>

          <div style={{ display: 'flex', alignItems: 'center', paddingTop: '1.5rem' }}>
            <Checkbox
              label="Mark as Popular"
              checked={formData.popular}
              onChange={(checked) => setFormData(prev => ({ ...prev, popular: checked }))}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} loading={saving}>
            {editingPlan ? 'Update Plan' : 'Create Plan'}
          </Button>
        </div>
      </Modal>

      <DeleteConfirm
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Plan"
        message="Are you sure you want to delete this pricing plan? This action cannot be undone."
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

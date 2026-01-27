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
  ActionButtons,
  SearchInput,
  TableSkeleton
} from '@/components/admin/AdminComponents';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  featured: boolean;
  content: string;
}

const CATEGORIES = [
  'SEO', 'AEO', 'GEO', 'Local SEO', 'Technical SEO', 'Content', 'Strategy'
];

const emptyPost: Omit<BlogPost, '_id'> = {
  title: '',
  slug: '',
  excerpt: '',
  category: 'SEO',
  author: 'Apis Digitech Team',
  publishedAt: new Date().toISOString().split('T')[0],
  readTime: '5 min read',
  featured: false,
  content: ''
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState(emptyPost);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Filter posts by search
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.category.toLowerCase().includes(search.toLowerCase()) ||
    post.author.toLowerCase().includes(search.toLowerCase())
  );

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/blog');
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setToast({ message: 'Failed to load posts', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: editingPost ? prev.slug : generateSlug(title)
    }));
  };

  const openAddModal = () => {
    setEditingPost(null);
    setFormData(emptyPost);
    setIsModalOpen(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      category: post.category,
      author: post.author,
      publishedAt: post.publishedAt,
      readTime: post.readTime,
      featured: post.featured,
      content: post.content
    });
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
      const method = editingPost ? 'PUT' : 'POST';
      const body = editingPost
        ? { ...formData, _id: editingPost._id }
        : { ...formData, _id: `post-${Date.now()}` };

      const res = await fetch('/api/admin/blog', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error('Failed to save');

      setToast({ message: editingPost ? 'Post updated!' : 'Post created!', type: 'success' });
      setIsModalOpen(false);
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
      setToast({ message: 'Failed to save post', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setSaving(true);
    try {
      const res = await fetch('/api/admin/blog', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: deleteId })
      });

      if (!res.ok) throw new Error('Failed to delete');

      setToast({ message: 'Post deleted!', type: 'success' });
      setIsDeleteOpen(false);
      setDeleteId(null);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      setToast({ message: 'Failed to delete post', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    {
      key: 'title' as const,
      header: 'Title',
      render: (post: BlogPost) => (
        <div>
          <div style={{ fontWeight: 500, color: '#fff' }}>{post.title}</div>
          <div style={{ fontSize: '0.8125rem', color: '#64748b', marginTop: '0.25rem' }}>
            /{post.slug}
          </div>
        </div>
      )
    },
    {
      key: 'category' as const,
      header: 'Category',
      width: '120px',
      render: (post: BlogPost) => <Badge>{post.category}</Badge>
    },
    {
      key: 'publishedAt' as const,
      header: 'Date',
      width: '120px'
    },
    {
      key: 'featured' as const,
      header: 'Featured',
      width: '100px',
      render: (post: BlogPost) => post.featured ? '⭐' : '—'
    },
    {
      key: 'actions' as const,
      header: 'Actions',
      width: '100px',
      render: (post: BlogPost) => (
        <ActionButtons
          onEdit={() => openEditModal(post)}
          onDelete={() => openDeleteModal(post._id)}
        />
      )
    }
  ];

  return (
    <div>
      <PageHeader
        title="Blog Posts"
        description="Create and manage blog articles"
        action={<Button onClick={openAddModal}>+ Add Post</Button>}
      />

      <div style={{ marginBottom: '1.5rem', maxWidth: '400px' }}>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search posts by title, category, or author..."
        />
      </div>

      {loading ? (
        <TableSkeleton rows={5} columns={5} />
      ) : (
        <DataTable
          columns={columns}
          data={filteredPosts}
          emptyMessage={search ? `No posts matching "${search}"` : "No blog posts yet. Create your first post!"}
        />
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPost ? 'Edit Post' : 'New Post'}
        size="lg"
      >
        <FormField label="Title" required>
          <Input
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Enter post title"
          />
        </FormField>

        <FormField label="Slug">
          <Input
            value={formData.slug}
            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            placeholder="post-url-slug"
          />
        </FormField>

        <FormField label="Excerpt" required>
          <Textarea
            value={formData.excerpt}
            onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
            placeholder="Brief description of the post"
            rows={3}
          />
        </FormField>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <FormField label="Category">
            <Select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              options={CATEGORIES.map(c => ({ value: c, label: c }))}
            />
          </FormField>

          <FormField label="Read Time">
            <Input
              value={formData.readTime}
              onChange={(e) => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
              placeholder="5 min read"
            />
          </FormField>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <FormField label="Author">
            <Input
              value={formData.author}
              onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              placeholder="Author name"
            />
          </FormField>

          <FormField label="Publish Date">
            <Input
              type="date"
              value={formData.publishedAt}
              onChange={(e) => setFormData(prev => ({ ...prev, publishedAt: e.target.value }))}
            />
          </FormField>
        </div>

        <FormField label="Content">
          <Textarea
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            placeholder="Full post content (supports markdown)"
            rows={8}
          />
        </FormField>

        <div style={{ marginBottom: '1.5rem' }}>
          <Checkbox
            label="Featured post (shows at top)"
            checked={formData.featured}
            onChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} loading={saving}>
            {editingPost ? 'Update Post' : 'Create Post'}
          </Button>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <DeleteConfirm
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Post"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
        loading={saving}
      />

      {/* Toast */}
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

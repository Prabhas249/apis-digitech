'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  FormField,
  Input,
  Textarea,
  Button,
  Toast,
  PageHeader
} from '@/components/admin/AdminComponents';

interface HeroData {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

interface StatItem {
  value: string;
  label: string;
}

interface CtaData {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

interface HomepageData {
  hero: HeroData;
  stats: StatItem[];
  cta: CtaData;
  [key: string]: unknown;
}

export default function HomepagePage() {
  const [data, setData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'hero' | 'stats' | 'cta'>('hero');

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/homepage');
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error('Error fetching homepage data:', error);
      setToast({ message: 'Failed to load data', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async () => {
    if (!data) return;

    setSaving(true);
    try {
      const res = await fetch('/api/admin/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error('Failed to save');

      setToast({ message: 'Homepage updated!', type: 'success' });
    } catch (error) {
      console.error('Error saving homepage:', error);
      setToast({ message: 'Failed to save changes', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const updateHero = (field: keyof HeroData, value: string) => {
    if (!data) return;
    setData({
      ...data,
      hero: { ...data.hero, [field]: value }
    });
  };

  const updateStat = (index: number, field: 'value' | 'label', value: string) => {
    if (!data) return;
    const newStats = [...data.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setData({
      ...data,
      stats: newStats
    });
  };

  const updateCta = (field: keyof CtaData, value: string) => {
    if (!data) return;
    setData({
      ...data,
      cta: { ...data.cta, [field]: value }
    });
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <div style={{ color: '#64748b' }}>Loading...</div>
      </div>
    );
  }

  if (!data) return null;

  const tabs = [
    { id: 'hero' as const, label: 'Hero Section' },
    { id: 'stats' as const, label: 'Stats' },
    { id: 'cta' as const, label: 'CTA Section' }
  ];

  return (
    <div>
      <PageHeader
        title="Homepage Editor"
        description="Customize your homepage content"
        action={<Button onClick={handleSave} loading={saving}>Save Changes</Button>}
      />

      {/* Tabs */}
      <div className="homepage-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`homepage-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Hero Section */}
      {activeTab === 'hero' && (
        <div className="admin-editor-section">
          <div className="admin-section-header">
            <h3>Hero Section</h3>
            <p>Edit the main hero area of your homepage</p>
          </div>

          <FormField label="Title">
            <Input
              value={data.hero.title}
              onChange={(e) => updateHero('title', e.target.value)}
              placeholder="Dominate Search. Lead Your Industry."
            />
          </FormField>

          <FormField label="Subtitle">
            <Textarea
              value={data.hero.subtitle}
              onChange={(e) => updateHero('subtitle', e.target.value)}
              placeholder="Hero subtitle text..."
              rows={3}
            />
          </FormField>

          <div className="admin-form-grid">
            <FormField label="Primary CTA Text">
              <Input
                value={data.hero.ctaText}
                onChange={(e) => updateHero('ctaText', e.target.value)}
                placeholder="Get Free Audit"
              />
            </FormField>

            <FormField label="Primary CTA Link">
              <Input
                value={data.hero.ctaLink}
                onChange={(e) => updateHero('ctaLink', e.target.value)}
                placeholder="/contact"
              />
            </FormField>
          </div>

          <div className="admin-form-grid">
            <FormField label="Secondary CTA Text">
              <Input
                value={data.hero.secondaryCtaText}
                onChange={(e) => updateHero('secondaryCtaText', e.target.value)}
                placeholder="View Packages"
              />
            </FormField>

            <FormField label="Secondary CTA Link">
              <Input
                value={data.hero.secondaryCtaLink}
                onChange={(e) => updateHero('secondaryCtaLink', e.target.value)}
                placeholder="/pricing"
              />
            </FormField>
          </div>
        </div>
      )}

      {/* Stats Section */}
      {activeTab === 'stats' && (
        <div className="admin-editor-section">
          <div className="admin-section-header">
            <h3>Stats</h3>
            <p>Edit the statistics displayed on your homepage</p>
          </div>

          <div className="admin-stats-grid">
            {data.stats?.map((stat, index) => (
              <div key={index} className="stat-editor">
                <FormField label="Value">
                  <Input
                    value={stat.value}
                    onChange={(e) => updateStat(index, 'value', e.target.value)}
                    placeholder="500+"
                  />
                </FormField>
                <FormField label="Label">
                  <Input
                    value={stat.label}
                    onChange={(e) => updateStat(index, 'label', e.target.value)}
                    placeholder="Clients Served"
                  />
                </FormField>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Section */}
      {activeTab === 'cta' && (
        <div className="admin-editor-section">
          <div className="admin-section-header">
            <h3>Call to Action</h3>
            <p>Edit the CTA section at the bottom of pages</p>
          </div>

          <FormField label="Title">
            <Input
              value={data.cta.title}
              onChange={(e) => updateCta('title', e.target.value)}
              placeholder="Ready to Grow Your Business?"
            />
          </FormField>

          <FormField label="Subtitle">
            <Textarea
              value={data.cta.subtitle}
              onChange={(e) => updateCta('subtitle', e.target.value)}
              placeholder="Get a free SEO audit..."
              rows={2}
            />
          </FormField>

          <div className="admin-form-grid">
            <FormField label="Button Text">
              <Input
                value={data.cta.buttonText}
                onChange={(e) => updateCta('buttonText', e.target.value)}
                placeholder="Get Free Audit"
              />
            </FormField>

            <FormField label="Button Link">
              <Input
                value={data.cta.buttonLink}
                onChange={(e) => updateCta('buttonLink', e.target.value)}
                placeholder="/contact"
              />
            </FormField>
          </div>
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <style jsx>{`
        .homepage-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding-bottom: 1rem;
        }
        .homepage-tab {
          padding: 0.75rem 1.5rem;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          color: #94a3b8;
          font-size: 0.9375rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .homepage-tab:hover {
          background: rgba(255,255,255,0.05);
          color: #fff;
        }
        .homepage-tab.active {
          background: linear-gradient(135deg, rgba(37,99,235,0.2), rgba(124,58,237,0.2));
          border-color: rgba(37,99,235,0.3);
          color: #fff;
        }
        .admin-editor-section {
          background: #0f172a;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 1.5rem;
        }
        .admin-section-header {
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .admin-section-header h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 0.25rem;
        }
        .admin-section-header p {
          color: #64748b;
          font-size: 0.875rem;
        }
        .admin-form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }
        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }
        .stat-editor {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          background: rgba(255,255,255,0.02);
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.05);
        }
      `}</style>
    </div>
  );
}

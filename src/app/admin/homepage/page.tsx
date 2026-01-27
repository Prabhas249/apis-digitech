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
  status: string;
  title: string;
  titleGradient: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: { value: string; label: string }[];
}

interface CtaData {
  title: string;
  description: string;
  buttonText: string;
  email: string;
}

interface HomepageData {
  hero: HeroData;
  cta: CtaData;
}

export default function HomepagePage() {
  const [data, setData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'hero' | 'cta'>('hero');

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

  const updateHeroStat = (index: number, field: 'value' | 'label', value: string) => {
    if (!data) return;
    const newStats = [...data.hero.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setData({
      ...data,
      hero: { ...data.hero, stats: newStats }
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
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Hero Section */}
      {activeTab === 'hero' && (
        <div className="editor-section">
          <div className="section-header">
            <h3>Hero Section</h3>
            <p>Edit the main hero area of your homepage</p>
          </div>

          <div className="form-grid">
            <FormField label="Status Badge">
              <Input
                value={data.hero.status}
                onChange={(e) => updateHero('status', e.target.value)}
                placeholder="Now optimizing for AI Search"
              />
            </FormField>

            <FormField label="Title (main)">
              <Input
                value={data.hero.title}
                onChange={(e) => updateHero('title', e.target.value)}
                placeholder="Dominate Search"
              />
            </FormField>

            <FormField label="Title (gradient part)">
              <Input
                value={data.hero.titleGradient}
                onChange={(e) => updateHero('titleGradient', e.target.value)}
                placeholder="in the Age of AI"
              />
            </FormField>
          </div>

          <FormField label="Description">
            <Textarea
              value={data.hero.description}
              onChange={(e) => updateHero('description', e.target.value)}
              placeholder="Hero description text..."
              rows={3}
            />
          </FormField>

          <div className="form-grid">
            <FormField label="Primary CTA Button">
              <Input
                value={data.hero.ctaPrimary}
                onChange={(e) => updateHero('ctaPrimary', e.target.value)}
                placeholder="Get Free SEO Audit"
              />
            </FormField>

            <FormField label="Secondary CTA Button">
              <Input
                value={data.hero.ctaSecondary}
                onChange={(e) => updateHero('ctaSecondary', e.target.value)}
                placeholder="View Services"
              />
            </FormField>
          </div>

          <div className="subsection">
            <h4>Hero Stats</h4>
            <div className="stats-grid">
              {data.hero.stats.map((stat, index) => (
                <div key={index} className="stat-editor">
                  <FormField label="Value">
                    <Input
                      value={stat.value}
                      onChange={(e) => updateHeroStat(index, 'value', e.target.value)}
                      placeholder="500+"
                    />
                  </FormField>
                  <FormField label="Label">
                    <Input
                      value={stat.label}
                      onChange={(e) => updateHeroStat(index, 'label', e.target.value)}
                      placeholder="SEO Campaigns"
                    />
                  </FormField>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      {activeTab === 'cta' && (
        <div className="editor-section">
          <div className="section-header">
            <h3>Call to Action</h3>
            <p>Edit the CTA section at the bottom of pages</p>
          </div>

          <FormField label="Title">
            <Input
              value={data.cta.title}
              onChange={(e) => updateCta('title', e.target.value)}
              placeholder="Ready to dominate search rankings?"
            />
          </FormField>

          <FormField label="Description">
            <Textarea
              value={data.cta.description}
              onChange={(e) => updateCta('description', e.target.value)}
              placeholder="Get a free SEO audit..."
              rows={2}
            />
          </FormField>

          <div className="form-grid">
            <FormField label="Button Text">
              <Input
                value={data.cta.buttonText}
                onChange={(e) => updateCta('buttonText', e.target.value)}
                placeholder="Get Free SEO Audit"
              />
            </FormField>

            <FormField label="Contact Email">
              <Input
                value={data.cta.email}
                onChange={(e) => updateCta('email', e.target.value)}
                placeholder="hello@apisdigitech.com"
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
        .tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding-bottom: 1rem;
        }
        .tab {
          padding: 0.75rem 1.5rem;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          color: #94a3b8;
          font-size: 0.9375rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tab:hover {
          background: rgba(255,255,255,0.05);
          color: #fff;
        }
        .tab.active {
          background: linear-gradient(135deg, rgba(37,99,235,0.2), rgba(124,58,237,0.2));
          border-color: rgba(37,99,235,0.3);
          color: #fff;
        }
        .editor-section {
          background: #0f172a;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 1.5rem;
        }
        .section-header {
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .section-header h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 0.25rem;
        }
        .section-header p {
          color: #64748b;
          font-size: 0.875rem;
        }
        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }
        .subsection {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .subsection h4 {
          font-size: 1rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 1rem;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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

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

interface SettingsData {
  site: {
    name: string;
    tagline: string;
    description: string;
    url: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social: {
    twitter: string;
    linkedin: string;
    facebook: string;
    instagram: string;
  };
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    defaultKeywords: string[];
  };
}

export default function SettingsPage() {
  const [data, setData] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [keywordsText, setKeywordsText] = useState('');
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
  const [changingPassword, setChangingPassword] = useState(false);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/settings');
      const json = await res.json();
      setData(json);
      setKeywordsText(json.seo?.defaultKeywords?.join(', ') || '');
    } catch (error) {
      console.error('Error fetching settings:', error);
      setToast({ message: 'Failed to load settings', type: 'error' });
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
      const updatedData = {
        ...data,
        seo: {
          ...data.seo,
          defaultKeywords: keywordsText.split(',').map(k => k.trim()).filter(Boolean)
        }
      };

      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });

      if (!res.ok) throw new Error('Failed to save');

      setToast({ message: 'Settings saved!', type: 'success' });
    } catch (error) {
      console.error('Error saving settings:', error);
      setToast({ message: 'Failed to save settings', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const updateSite = (field: keyof SettingsData['site'], value: string) => {
    if (!data) return;
    setData({ ...data, site: { ...data.site, [field]: value } });
  };

  const updateContact = (field: keyof SettingsData['contact'], value: string) => {
    if (!data) return;
    setData({ ...data, contact: { ...data.contact, [field]: value } });
  };

  const updateSocial = (field: keyof SettingsData['social'], value: string) => {
    if (!data) return;
    setData({ ...data, social: { ...data.social, [field]: value } });
  };

  const updateSeo = (field: keyof Omit<SettingsData['seo'], 'defaultKeywords'>, value: string) => {
    if (!data) return;
    setData({ ...data, seo: { ...data.seo, [field]: value } });
  };

  const handlePasswordChange = async () => {
    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
      setToast({ message: 'Please fill all password fields', type: 'error' });
      return;
    }

    if (passwordData.new !== passwordData.confirm) {
      setToast({ message: 'New passwords do not match', type: 'error' });
      return;
    }

    if (passwordData.new.length < 6) {
      setToast({ message: 'Password must be at least 6 characters', type: 'error' });
      return;
    }

    setChangingPassword(true);
    try {
      const res = await fetch('/api/admin/auth/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.current,
          newPassword: passwordData.new,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to change password');
      }

      setToast({ message: 'Password changed successfully!', type: 'success' });
      setPasswordData({ current: '', new: '', confirm: '' });
    } catch (error) {
      setToast({ message: error instanceof Error ? error.message : 'Failed to change password', type: 'error' });
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <div style={{ color: '#64748b' }}>Loading...</div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div>
      <PageHeader
        title="Site Settings"
        description="Configure your website settings"
        action={<Button onClick={handleSave} loading={saving}>Save Settings</Button>}
      />

      {/* Site Info */}
      <div className="admin-settings-section">
        <div className="admin-section-header">
          <h3>Site Information</h3>
        </div>

        <div className="admin-form-grid">
          <FormField label="Site Name">
            <Input
              value={data.site.name}
              onChange={(e) => updateSite('name', e.target.value)}
              placeholder="Apis Digitech"
            />
          </FormField>

          <FormField label="Tagline">
            <Input
              value={data.site.tagline}
              onChange={(e) => updateSite('tagline', e.target.value)}
              placeholder="SEO, AEO & GEO Experts"
            />
          </FormField>
        </div>

        <FormField label="Site Description">
          <Textarea
            value={data.site.description}
            onChange={(e) => updateSite('description', e.target.value)}
            placeholder="We help businesses dominate search..."
            rows={2}
          />
        </FormField>

        <FormField label="Website URL">
          <Input
            value={data.site.url}
            onChange={(e) => updateSite('url', e.target.value)}
            placeholder="https://apisdigitech.com"
          />
        </FormField>
      </div>

      {/* Contact Info */}
      <div className="admin-settings-section">
        <div className="admin-section-header">
          <h3>Contact Information</h3>
        </div>

        <div className="admin-form-grid">
          <FormField label="Email">
            <Input
              type="email"
              value={data.contact.email}
              onChange={(e) => updateContact('email', e.target.value)}
              placeholder="hello@apisdigitech.com"
            />
          </FormField>

          <FormField label="Phone">
            <Input
              value={data.contact.phone}
              onChange={(e) => updateContact('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </FormField>
        </div>

        <FormField label="Address">
          <Input
            value={data.contact.address}
            onChange={(e) => updateContact('address', e.target.value)}
            placeholder="123 Digital Ave, Tech City"
          />
        </FormField>
      </div>

      {/* Social Links */}
      <div className="admin-settings-section">
        <div className="admin-section-header">
          <h3>Social Media</h3>
        </div>

        <div className="admin-form-grid">
          <FormField label="Twitter">
            <Input
              value={data.social.twitter}
              onChange={(e) => updateSocial('twitter', e.target.value)}
              placeholder="https://twitter.com/username"
            />
          </FormField>

          <FormField label="LinkedIn">
            <Input
              value={data.social.linkedin}
              onChange={(e) => updateSocial('linkedin', e.target.value)}
              placeholder="https://linkedin.com/company/name"
            />
          </FormField>

          <FormField label="Facebook">
            <Input
              value={data.social.facebook}
              onChange={(e) => updateSocial('facebook', e.target.value)}
              placeholder="https://facebook.com/page"
            />
          </FormField>

          <FormField label="Instagram">
            <Input
              value={data.social.instagram}
              onChange={(e) => updateSocial('instagram', e.target.value)}
              placeholder="https://instagram.com/username"
            />
          </FormField>
        </div>
      </div>

      {/* SEO Settings */}
      <div className="admin-settings-section">
        <div className="admin-section-header">
          <h3>SEO Settings</h3>
        </div>

        <FormField label="Default Title">
          <Input
            value={data.seo.defaultTitle}
            onChange={(e) => updateSeo('defaultTitle', e.target.value)}
            placeholder="Apis Digitech - SEO, AEO & GEO Experts"
          />
        </FormField>

        <FormField label="Title Template">
          <Input
            value={data.seo.titleTemplate}
            onChange={(e) => updateSeo('titleTemplate', e.target.value)}
            placeholder="%s | Apis Digitech"
          />
        </FormField>

        <FormField label="Default Description">
          <Textarea
            value={data.seo.defaultDescription}
            onChange={(e) => updateSeo('defaultDescription', e.target.value)}
            placeholder="Meta description for SEO..."
            rows={2}
          />
        </FormField>

        <FormField label="Keywords (comma separated)">
          <Input
            value={keywordsText}
            onChange={(e) => setKeywordsText(e.target.value)}
            placeholder="SEO, AEO, GEO, digital marketing"
          />
        </FormField>
      </div>

      {/* Security Settings */}
      <div className="admin-settings-section">
        <div className="admin-section-header">
          <h3>Security - Change Password</h3>
        </div>

        <div className="admin-form-grid">
          <FormField label="Current Password">
            <Input
              type="password"
              value={passwordData.current}
              onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
              placeholder="Enter current password"
            />
          </FormField>
        </div>

        <div className="admin-form-grid">
          <FormField label="New Password">
            <Input
              type="password"
              value={passwordData.new}
              onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
              placeholder="Enter new password (min 6 chars)"
            />
          </FormField>

          <FormField label="Confirm New Password">
            <Input
              type="password"
              value={passwordData.confirm}
              onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
              placeholder="Confirm new password"
            />
          </FormField>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <Button onClick={handlePasswordChange} loading={changingPassword} variant="danger">
            Change Password
          </Button>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <style jsx>{`
        .admin-settings-section {
          background: #0f172a;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .admin-section-header {
          margin-bottom: 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .admin-section-header h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #fff;
        }
        .admin-form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }
      `}</style>
    </div>
  );
}

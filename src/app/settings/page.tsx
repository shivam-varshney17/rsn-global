'use client';

import { useState, useEffect } from 'react';
import { Platform, PlatformConfig, VoiceRules as VoiceRulesType } from '@/types';
import { PlatformConfigCard } from '@/components/settings/PlatformConfigCard';
import { VoiceRulesEditor } from '@/components/settings/VoiceRulesEditor';
import {
  User,
  Link2,
  Calendar,
  Mic,
  Plug,
  Save,
  Check,
} from 'lucide-react';
import { LinkedinIcon, TwitterIcon, RedditIcon, InstagramIcon } from "@/components/icons/PlatformIcons";

// Platform configuration
const PLATFORMS: Platform[] = ['LINKEDIN', 'TWITTER', 'REDDIT', 'INSTAGRAM'];

const PLATFORM_COLORS: Record<Platform, string> = {
  LINKEDIN: '#0A66C2',
  TWITTER: '#000000',
  REDDIT: '#FF4500',
  INSTAGRAM: '#E1306C',
};

const PLATFORM_NAMES: Record<Platform, string> = {
  LINKEDIN: 'LinkedIn',
  TWITTER: 'Twitter/X',
  REDDIT: 'Reddit',
  INSTAGRAM: 'Instagram',
};

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const TIME_SLOTS = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
];

const TIMEZONES = [
  'America/New_York (EST)',
  'America/Chicago (CST)',
  'America/Denver (MST)',
  'America/Los_Angeles (PST)',
  'Europe/London (GMT)',
  'Europe/Paris (CET)',
  'Asia/Tokyo (JST)',
  'Asia/Shanghai (CST)',
  'Asia/Kolkata (IST)',
  'Australia/Sydney (AEST)',
];

type TabId = 'profile' | 'platforms' | 'schedule' | 'voice' | 'integrations';

interface Tab {
  id: TabId;
  label: string;
  icon: typeof User;
}

const TABS: Tab[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'platforms', label: 'Platforms', icon: Link2 },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'voice', label: 'Voice Rules', icon: Mic },
  { id: 'integrations', label: 'Integrations', icon: Plug },
];

// Mock user profile
const mockProfile = {
  display_name: 'Shivam Varshney',
  bio: 'Building AI-powered content systems. 10x your output with the right workflow.',
  avatar_url: '',
};

// Mock platform configs
const mockPlatformConfigs: Record<Platform, PlatformConfig> = {
  LINKEDIN: {
    id: '1',
    platform: 'LINKEDIN',
    account_handle: '@shivamvarshney',
    posting_schedule: { best_times: ['08:00', '09:00'], days: ['Tue', 'Wed', 'Thu'] },
    voice_rules_json: { use_em_dashes: true, use_arrow_bullets: true, hype_adjective_count: 2 },
    api_credentials: { access_token: 'mock_token_li', refresh_token: 'mock_refresh' },
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-04-20T10:00:00Z',
  },
  TWITTER: {
    id: '2',
    platform: 'TWITTER',
    account_handle: '@shivam_dev',
    posting_schedule: { best_times: ['08:00', '09:00', '17:00'], days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    voice_rules_json: { use_em_dashes: true, hype_adjective_count: 1 },
    api_credentials: { access_token: 'mock_token_tw' },
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-04-21T10:00:00Z',
  },
  REDDIT: {
    id: '3',
    platform: 'REDDIT',
    account_handle: 'u/shivam_dev',
    posting_schedule: { best_times: ['07:00', '08:00'], days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    voice_rules_json: { use_em_dashes: false },
    api_credentials: {},
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-04-15T10:00:00Z',
  },
  INSTAGRAM: {
    id: '4',
    platform: 'INSTAGRAM',
    account_handle: '@shivam.dev',
    posting_schedule: { best_times: ['11:00', '12:00', '19:00'], days: ['Mon', 'Wed', 'Fri', 'Sun'] },
    voice_rules_json: { use_em_dashes: true, use_emoji_steps: true, hype_adjective_count: 1 },
    api_credentials: { access_token: 'mock_token_ig' },
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-04-22T10:00:00Z',
  },
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('profile');
  const [profile, setProfile] = useState(mockProfile);
  const [platformConfigs, setPlatformConfigs] = useState(mockPlatformConfigs);
  const [voiceTabPlatform, setVoiceTabPlatform] = useState<Platform>('LINKEDIN');
  const [savingStates, setSavingStates] = useState<Record<string, boolean>>({});
  const [showSaved, setShowSaved] = useState<string | null>(null);
  const [supabaseConnected, setSupabaseConnected] = useState(true);

  // Integration settings
  const [minimaxKey, setMinimaxKey] = useState('');
  const [n8nWebhook, setN8nWebhook] = useState('');
  const [remotionFormat, setRemotionFormat] = useState('mp4');
  const [remotionDimensions, setRemotionDimensions] = useState({
    linkedin: '1080x1350',
    twitter: '1200x675',
    instagram: '1080x1920',
  });

  const handleProfileSave = async () => {
    setSavingStates((prev) => ({ ...prev, profile: true }));
    await new Promise((r) => setTimeout(r, 500));
    setSavingStates((prev) => ({ ...prev, profile: false }));
    setShowSaved('profile');
    setTimeout(() => setShowSaved(null), 2000);
  };

  const handlePlatformConfigUpdate = async (platform: Platform, config: Partial<PlatformConfig>) => {
    setPlatformConfigs((prev) => ({
      ...prev,
      [platform]: { ...prev[platform], ...config },
    }));

    // Call API
    try {
      const response = await fetch('/api/platform-configs', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, ...config }),
      });
      if (response.ok) {
        setShowSaved(platform);
        setTimeout(() => setShowSaved(null), 2000);
      }
    } catch (error) {
      console.error('Failed to update platform config:', error);
    }
  };

  const handleVoiceRulesUpdate = async (platform: Platform, rules: VoiceRulesType) => {
    try {
      const response = await fetch('/api/platform-configs', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, voice_rules: rules }),
      });
      if (response.ok) {
        setPlatformConfigs((prev) => ({
          ...prev,
          [platform]: { ...prev[platform], voice_rules_json: rules },
        }));
        setShowSaved('voice');
        setTimeout(() => setShowSaved(null), 2000);
      }
    } catch (error) {
      console.error('Failed to update voice rules:', error);
    }
  };

  const handleIntegrationsSave = async () => {
    setSavingStates((prev) => ({ ...prev, integrations: true }));
    await new Promise((r) => setTimeout(r, 500));
    setSavingStates((prev) => ({ ...prev, integrations: false }));
    setShowSaved('integrations');
    setTimeout(() => setShowSaved(null), 2000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab profile={profile} setProfile={setProfile} onSave={handleProfileSave} saving={savingStates.profile} saved={showSaved === 'profile'} />;
      case 'platforms':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {PLATFORMS.map((platform) => (
              <PlatformConfigCard
                key={platform}
                platform={platform}
                config={platformConfigs[platform]}
                onUpdate={handlePlatformConfigUpdate}
              />
            ))}
          </div>
        );
      case 'schedule':
        return <ScheduleTab platformConfigs={platformConfigs} onUpdate={handlePlatformConfigUpdate} />;
      case 'voice':
        return (
          <div>
            {/* Platform selector for voice rules */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {PLATFORMS.map((platform) => (
                <button
                  key={platform}
                  onClick={() => setVoiceTabPlatform(platform)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: voiceTabPlatform === platform ? 'white' : PLATFORM_COLORS[platform],
                    backgroundColor: voiceTabPlatform === platform ? PLATFORM_COLORS[platform] : 'transparent',
                    border: '1px solid',
                    borderColor: PLATFORM_COLORS[platform],
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {PLATFORM_NAMES[platform]}
                </button>
              ))}
            </div>
            <VoiceRulesEditor
              platform={voiceTabPlatform}
              platformName={PLATFORM_NAMES[voiceTabPlatform]}
              platformColor={PLATFORM_COLORS[voiceTabPlatform]}
              initialRules={platformConfigs[voiceTabPlatform].voice_rules_json}
              onUpdate={handleVoiceRulesUpdate}
            />
          </div>
        );
      case 'integrations':
        return (
          <IntegrationsTab
            minimaxKey={minimaxKey}
            setMinimaxKey={setMinimaxKey}
            n8nWebhook={n8nWebhook}
            setN8nWebhook={setN8nWebhook}
            remotionFormat={remotionFormat}
            setRemotionFormat={setRemotionFormat}
            remotionDimensions={remotionDimensions}
            setRemotionDimensions={setRemotionDimensions}
            supabaseConnected={supabaseConnected}
            onSave={handleIntegrationsSave}
            saving={savingStates.integrations}
            saved={showSaved === 'integrations'}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      {/* Header */}
      <header
        style={{
          padding: '24px 32px',
          backgroundColor: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <h1 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>Settings</h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Configure your profile, platform connections, and integrations
        </p>
      </header>

      {/* Tab Navigation */}
      <div
        style={{
          display: 'flex',
          gap: '4px',
          padding: '0 32px',
          backgroundColor: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 20px',
              fontSize: '14px',
              fontWeight: '500',
              color: activeTab === tab.id ? 'var(--accent)' : 'var(--text-secondary)',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: '2px solid',
              borderColor: activeTab === tab.id ? 'var(--accent)' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
        {renderTabContent()}
      </div>
    </div>
  );
}

// Profile Tab Component
function ProfileTab({
  profile,
  setProfile,
  onSave,
  saving,
  saved,
}: {
  profile: { display_name: string; bio: string; avatar_url: string };
  setProfile: (p: { display_name: string; bio: string; avatar_url: string }) => void;
  onSave: () => void;
  saving: boolean;
  saved: boolean;
}) {
  return (
    <div style={{ maxWidth: '600px' }}>
      <div
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '24px',
        }}
      >
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>Profile Settings</h2>

        {/* Avatar */}
        <div style={{ marginBottom: '24px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-secondary)',
              marginBottom: '8px',
            }}
          >
            Avatar URL
          </label>
          <input
            type="url"
            value={profile.avatar_url}
            onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
            placeholder="https://example.com/avatar.jpg"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '14px',
              color: 'var(--text-primary)',
              backgroundColor: 'var(--surface-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              outline: 'none',
            }}
          />
          {profile.avatar_url && (
            <img
              src={profile.avatar_url}
              alt="Avatar preview"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                marginTop: '12px',
                objectFit: 'cover',
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
        </div>

        {/* Display Name */}
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-secondary)',
              marginBottom: '8px',
            }}
          >
            Display Name
          </label>
          <input
            type="text"
            value={profile.display_name}
            onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '14px',
              color: 'var(--text-primary)',
              backgroundColor: 'var(--surface-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              outline: 'none',
            }}
          />
        </div>

        {/* Bio */}
        <div style={{ marginBottom: '24px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-secondary)',
              marginBottom: '8px',
            }}
          >
            Bio
          </label>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            rows={4}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '14px',
              color: 'var(--text-primary)',
              backgroundColor: 'var(--surface-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'inherit',
            }}
          />
        </div>

        {/* Save Button */}
        <button
          onClick={onSave}
          disabled={saving}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: '500',
            color: 'white',
            backgroundColor: 'var(--accent)',
            border: 'none',
            borderRadius: '8px',
            cursor: saving ? 'not-allowed' : 'pointer',
            opacity: saving ? 0.7 : 1,
          }}
        >
          <Save size={18} />
          {saved ? 'Saved!' : saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </div>
  );
}

// Schedule Tab Component
function ScheduleTab({
  platformConfigs,
  onUpdate,
}: {
  platformConfigs: Record<Platform, PlatformConfig>;
  onUpdate: (platform: Platform, config: Partial<PlatformConfig>) => void;
}) {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('LINKEDIN');
  const [schedule, setSchedule] = useState(platformConfigs[selectedPlatform].posting_schedule);
  const [timezone, setTimezone] = useState('America/New_York (EST)');

  useEffect(() => {
    setSchedule(platformConfigs[selectedPlatform].posting_schedule);
  }, [selectedPlatform, platformConfigs]);

  const handleDayToggle = (day: string) => {
    const newDays = schedule.days?.includes(day)
      ? schedule.days.filter((d) => d !== day)
      : [...(schedule.days || []), day];
    setSchedule({ ...schedule, days: newDays });
  };

  const handleTimeToggle = (time: string) => {
    const newTimes = schedule.best_times?.includes(time)
      ? schedule.best_times.filter((t) => t !== time)
      : [...(schedule.best_times || []), time];
    setSchedule({ ...schedule, best_times: newTimes });
  };

  const handleSaveSchedule = () => {
    onUpdate(selectedPlatform, {
      posting_schedule: { ...schedule, timezone },
    });
  };

  const generatePreview = () => {
    const times = schedule.best_times?.join(', ') || 'not set';
    const days = schedule.days?.join(', ') || 'none selected';
    return `${PLATFORM_NAMES[selectedPlatform]} posts at ${times} on ${days}`;
  };

  return (
    <div>
      {/* Platform selector */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {PLATFORMS.map((platform) => (
          <button
            key={platform}
            onClick={() => setSelectedPlatform(platform)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              fontSize: '13px',
              fontWeight: '500',
              color: selectedPlatform === platform ? 'white' : PLATFORM_COLORS[platform],
              backgroundColor: selectedPlatform === platform ? PLATFORM_COLORS[platform] : 'transparent',
              border: '1px solid',
              borderColor: PLATFORM_COLORS[platform],
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            {PLATFORM_NAMES[platform]}
          </button>
        ))}
      </div>

      {/* Schedule Editor */}
      <div
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '24px',
          maxWidth: '800px',
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>
          {PLATFORM_NAMES[selectedPlatform]} Posting Schedule
        </h3>

        {/* Days of Week */}
        <div style={{ marginBottom: '24px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-secondary)',
              marginBottom: '12px',
            }}
          >
            Days of Week
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {DAYS_OF_WEEK.map((day) => (
              <button
                key={day}
                onClick={() => handleDayToggle(day)}
                style={{
                  width: '48px',
                  height: '48px',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: schedule.days?.includes(day) ? 'white' : 'var(--text-secondary)',
                  backgroundColor: schedule.days?.includes(day)
                    ? PLATFORM_COLORS[selectedPlatform]
                    : 'var(--surface-secondary)',
                  border: '1px solid',
                  borderColor: schedule.days?.includes(day)
                    ? PLATFORM_COLORS[selectedPlatform]
                    : 'var(--border)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Best Times */}
        <div style={{ marginBottom: '24px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-secondary)',
              marginBottom: '12px',
            }}
          >
            Best Times (EST)
          </label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
              gap: '8px',
            }}
          >
            {TIME_SLOTS.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeToggle(time)}
                style={{
                  padding: '10px',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: schedule.best_times?.includes(time) ? 'white' : 'var(--text-secondary)',
                  backgroundColor: schedule.best_times?.includes(time)
                    ? PLATFORM_COLORS[selectedPlatform]
                    : 'var(--surface-secondary)',
                  border: '1px solid',
                  borderColor: schedule.best_times?.includes(time)
                    ? PLATFORM_COLORS[selectedPlatform]
                    : 'var(--border)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Timezone */}
        <div style={{ marginBottom: '24px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-secondary)',
              marginBottom: '8px',
            }}
          >
            Timezone
          </label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '300px',
              padding: '10px 12px',
              fontSize: '14px',
              color: 'var(--text-primary)',
              backgroundColor: 'var(--surface-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            {TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>

        {/* Visual Preview */}
        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--surface-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            marginBottom: '20px',
          }}
        >
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
            Schedule Preview
          </p>
          <p style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: '500' }}>
            {generatePreview()}
          </p>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveSchedule}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: '500',
            color: 'white',
            backgroundColor: PLATFORM_COLORS[selectedPlatform],
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          <Save size={18} />
          Save Schedule
        </button>
      </div>
    </div>
  );
}

// Integrations Tab Component
function IntegrationsTab({
  minimaxKey,
  setMinimaxKey,
  n8nWebhook,
  setN8nWebhook,
  remotionFormat,
  setRemotionFormat,
  remotionDimensions,
  setRemotionDimensions,
  supabaseConnected,
  onSave,
  saving,
  saved,
}: {
  minimaxKey: string;
  setMinimaxKey: (v: string) => void;
  n8nWebhook: string;
  setN8nWebhook: (v: string) => void;
  remotionFormat: string;
  setRemotionFormat: (v: string) => void;
  remotionDimensions: { linkedin: string; twitter: string; instagram: string };
  setRemotionDimensions: (d: { linkedin: string; twitter: string; instagram: string }) => void;
  supabaseConnected: boolean;
  onSave: () => void;
  saving: boolean;
  saved: boolean;
}) {
  return (
    <div style={{ maxWidth: '700px' }}>
      {/* MiniMax API Key */}
      <div
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '20px',
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>MiniMax API</h3>
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-secondary)',
              marginBottom: '8px',
            }}
          >
            API Key
          </label>
          <input
            type="password"
            value={minimaxKey}
            onChange={(e) => setMinimaxKey(e.target.value)}
            placeholder="Enter your MiniMax API key"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '14px',
              color: 'var(--text-primary)',
              backgroundColor: 'var(--surface-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Remotion Configuration */}
      <div
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '20px',
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Remotion</h3>

        {/* Output Format */}
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-secondary)',
              marginBottom: '8px',
            }}
          >
            Output Format
          </label>
          <select
            value={remotionFormat}
            onChange={(e) => setRemotionFormat(e.target.value)}
            style={{
              width: '200px',
              padding: '10px 12px',
              fontSize: '14px',
              color: 'var(--text-primary)',
              backgroundColor: 'var(--surface-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="mp4">MP4</option>
            <option value="webm">WebM</option>
            <option value="mov">MOV</option>
          </select>
        </div>

        {/* Platform Dimensions */}
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-secondary)',
              marginBottom: '12px',
            }}
          >
            Default Dimensions per Platform
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {PLATFORMS.map((platform) => (
              <div key={platform} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span
                  style={{
                    width: '100px',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: PLATFORM_COLORS[platform],
                  }}
                >
                  {PLATFORM_NAMES[platform]}
                </span>
                <input
                  type="text"
                  value={remotionDimensions[platform.toLowerCase() as keyof typeof remotionDimensions]}
                  onChange={(e) =>
                    setRemotionDimensions({
                      ...remotionDimensions,
                      [platform.toLowerCase()]: e.target.value,
                    })
                  }
                  placeholder="1920x1080"
                  style={{
                    flex: '1',
                    padding: '10px 12px',
                    fontSize: '14px',
                    color: 'var(--text-primary)',
                    backgroundColor: 'var(--surface-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    outline: 'none',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* n8n Webhook */}
      <div
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '20px',
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>n8n Webhook</h3>
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-secondary)',
              marginBottom: '8px',
            }}
          >
            Webhook URL
          </label>
          <input
            type="url"
            value={n8nWebhook}
            onChange={(e) => setN8nWebhook(e.target.value)}
            placeholder="https://your-n8n-instance.webhook.io/..."
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '14px',
              color: 'var(--text-primary)',
              backgroundColor: 'var(--surface-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Supabase Status */}
      <div
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Supabase Connection</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: supabaseConnected ? 'var(--success)' : 'var(--error)',
            }}
          />
          <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: '500' }}>
            {supabaseConnected ? 'Connected' : 'Not Connected'}
          </span>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={onSave}
        disabled={saving}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          fontSize: '14px',
          fontWeight: '500',
          color: 'white',
          backgroundColor: 'var(--accent)',
          border: 'none',
          borderRadius: '8px',
          cursor: saving ? 'not-allowed' : 'pointer',
          opacity: saving ? 0.7 : 1,
        }}
      >
        <Save size={18} />
        {saved ? 'Saved!' : saving ? 'Saving...' : 'Save Integrations'}
      </button>
    </div>
  );
}
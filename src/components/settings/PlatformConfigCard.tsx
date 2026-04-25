'use client';

import { Platform, PlatformConfig } from '@/types';
import { Edit3, Check, X } from 'lucide-react';
import { LinkedinIcon, TwitterIcon, RedditIcon, InstagramIcon } from '@/components/icons/PlatformIcons';
import { useState } from 'react';

interface PlatformConfigCardProps {
  platform: Platform;
  config: PlatformConfig;
  onUpdate: (platform: Platform, config: Partial<PlatformConfig>) => void;
}

const PLATFORM_COLORS: Record<Platform, string> = {
  LINKEDIN: '#0A66C2',
  TWITTER: '#000000',
  REDDIT: '#FF4500',
  INSTAGRAM: '#E1306C',
};

const PLATFORM_ICONS: Record<Platform, React.ComponentType<{ size?: number; color?: string }>> = {
  LINKEDIN: LinkedinIcon,
  TWITTER: TwitterIcon,
  REDDIT: RedditIcon,
  INSTAGRAM: InstagramIcon,
};

const PLATFORM_NAMES: Record<Platform, string> = {
  LINKEDIN: 'LinkedIn',
  TWITTER: 'Twitter/X',
  REDDIT: 'Reddit',
  INSTAGRAM: 'Instagram',
};

export function PlatformConfigCard({ platform, config, onUpdate }: PlatformConfigCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [handle, setHandle] = useState(config.account_handle || '');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  const color = PLATFORM_COLORS[platform];
  const Icon = PLATFORM_ICONS[platform];
  const platformName = PLATFORM_NAMES[platform];

  const isConnected = !!config.api_credentials?.access_token;

  const formatSchedule = (schedule: PlatformConfig['posting_schedule']) => {
    if (!schedule.days?.length && !schedule.best_times?.length) {
      return 'Not configured';
    }
    const parts = [];
    if (schedule.days?.length) {
      parts.push(schedule.days.join(', '));
    }
    if (schedule.best_times?.length) {
      parts.push(`at ${schedule.best_times.join(', ')}`);
    }
    return parts.join(' ');
  };

  const formatVoiceRules = (rules: PlatformConfig['voice_rules_json']) => {
    if (!rules) return 'Default rules';
    const active: string[] = [];
    if (rules.use_em_dashes) active.push('em dashes');
    if (rules.use_arrow_bullets) active.push('arrow bullets');
    if (rules.use_emoji_steps) active.push('emoji steps');
    if (rules.use_unicode_bold) active.push('unicode bold');
    if (rules.use_binary_closer) active.push('binary closer');
    if (rules.use_positioning_flip) active.push('positioning flip');
    if (rules.use_triads) active.push('triads');
    if (rules.hype_adjective_count) active.push(`${rules.hype_adjective_count} hype adj.`);
    return active.length > 0 ? active.join(', ') : 'Default rules';
  };

  const maskToken = (token?: string) => {
    if (!token) return '••••••••';
    return token.substring(0, 4) + '••••••••' + token.substring(token.length - 4);
  };

  const handleSave = () => {
    onUpdate(platform, {
      ...config,
      account_handle: handle,
      api_credentials: {
        ...config.api_credentials,
        access_token: accessToken || config.api_credentials?.access_token,
        refresh_token: refreshToken || config.api_credentials?.refresh_token,
      },
    });
    setIsEditing(false);
    setAccessToken('');
    setRefreshToken('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setHandle(config.account_handle || '');
    setAccessToken('');
    setRefreshToken('');
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--surface)',
        border: '2px solid',
        borderColor: color,
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              backgroundColor: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={22} />
          </div>
          <div>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '2px',
              }}
            >
              {platformName}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: isConnected ? 'var(--success)' : 'var(--text-muted)',
                }}
              />
              <span
                style={{
                  fontSize: '12px',
                  color: isConnected ? 'var(--success)' : 'var(--text-muted)',
                  fontWeight: '500',
                }}
              >
                {isConnected ? 'Connected' : 'Not Connected'}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '6px 10px',
            fontSize: '12px',
            fontWeight: '500',
            color: isEditing ? 'var(--text-secondary)' : color,
            backgroundColor: isEditing ? 'var(--surface-secondary)' : `${color}15`,
            border: '1px solid',
            borderColor: isEditing ? 'var(--border)' : color,
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          {isEditing ? (
            <>
              <X size={14} />
              Cancel
            </>
          ) : (
            <>
              <Edit3 size={14} />
              Edit
            </>
          )}
        </button>
      </div>

      {/* Content */}
      {isEditing ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Account Handle */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '500',
                color: 'var(--text-secondary)',
                marginBottom: '6px',
              }}
            >
              Account Handle
            </label>
            <input
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="@username"
              style={{
                width: '100%',
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

          {/* API Credentials */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: 'var(--text-secondary)',
                  marginBottom: '6px',
                }}
              >
                Access Token
              </label>
              <input
                type="password"
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                placeholder="Enter access token"
                style={{
                  width: '100%',
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
            <div style={{ flex: 1 }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: 'var(--text-secondary)',
                  marginBottom: '6px',
                }}
              >
                Refresh Token
              </label>
              <input
                type="password"
                value={refreshToken}
                onChange={(e) => setRefreshToken(e.target.value)}
                placeholder="Enter refresh token"
                style={{
                  width: '100%',
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
          </div>

          <button
            onClick={handleSave}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '10px',
              fontSize: '14px',
              fontWeight: '500',
              color: 'white',
              backgroundColor: color,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            <Check size={16} />
            Save Changes
          </button>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div
              style={{
                padding: '12px',
                backgroundColor: 'var(--surface-secondary)',
                borderRadius: '8px',
              }}
            >
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Account
              </p>
              <p style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>
                {config.account_handle || 'Not set'}
              </p>
            </div>
            <div
              style={{
                padding: '12px',
                backgroundColor: 'var(--surface-secondary)',
                borderRadius: '8px',
              }}
            >
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Last Sync
              </p>
              <p style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>
                {config.updated_at
                  ? new Date(config.updated_at).toLocaleDateString()
                  : 'Never'}
              </p>
            </div>
          </div>

          {/* Posting Schedule Summary */}
          <div>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>
              Posting Schedule
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              {formatSchedule(config.posting_schedule)}
            </p>
          </div>

          {/* Voice Rules Summary */}
          <div>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>
              Voice Rules
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              {formatVoiceRules(config.voice_rules_json)}
            </p>
          </div>

          {/* API Tokens Status */}
          <div>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>
              API Credentials
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Access: {maskToken(config.api_credentials?.access_token)}
            </p>
          </div>

          {/* Connect/Disconnect Button */}
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px',
              fontSize: '14px',
              fontWeight: '500',
              color: isConnected ? 'var(--error)' : color,
              backgroundColor: 'transparent',
              border: '1px solid',
              borderColor: isConnected ? 'var(--error)' : color,
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {isConnected ? 'Disconnect' : 'Connect'} via OAuth
          </button>
        </>
      )}
    </div>
  );
}
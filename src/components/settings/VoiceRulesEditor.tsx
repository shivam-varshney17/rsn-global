'use client';

import { useState, useEffect } from 'react';
import { Platform, VoiceRules as VoiceRulesType, SkeletonName } from '@/types';
import { SKELETON_TEMPLATES } from '@/types';
import { Save, RotateCcw } from 'lucide-react';

interface VoiceRulesEditorProps {
  platform: Platform;
  platformName: string;
  platformColor: string;
  initialRules?: VoiceRulesType;
  onUpdate: (platform: Platform, rules: VoiceRulesType) => void;
}

const VOICE_RULE_OPTIONS: { key: keyof VoiceRulesType; label: string }[] = [
  { key: 'use_em_dashes', label: 'Use em dashes (—) as beats' },
  { key: 'use_arrow_bullets', label: 'Use arrow bullets (→)' },
  { key: 'use_emoji_steps', label: 'Use emoji steps (1️⃣ 2️⃣ 3️⃣)' },
  { key: 'use_unicode_bold', label: 'Use Unicode bold text (𝐞𝐥𝐢𝐭𝐞)' },
  { key: 'use_binary_closer', label: 'Use binary closer ("Do X or don\'t")' },
  { key: 'use_positioning_flip', label: 'Use positioning flip ("Not X, Y")' },
  { key: 'use_triads', label: 'Use triads (3-word parallel structures)' },
  { key: 'use_repost_ask', label: 'Use repost ask (♻️ Repost if...)' },
  { key: 'use_scarcity_tail', label: 'Use scarcity tail ("Limited time...")' },
  { key: 'cta_keyword_mechanic', label: 'Use CTA keyword mechanic' },
];

export function VoiceRulesEditor({
  platform,
  platformName,
  platformColor,
  initialRules,
  onUpdate,
}: VoiceRulesEditorProps) {
  const [rules, setRules] = useState<VoiceRulesType>(initialRules || {});
  const [selectedSkeleton, setSelectedSkeleton] = useState<SkeletonName | ''>('');
  const [skeletonRules, setSkeletonRules] = useState<VoiceRulesType>({});
  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (initialRules) {
      setRules(initialRules);
    }
  }, [initialRules]);

  const handleToggle = (key: keyof VoiceRulesType) => {
    setRules((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleHypeChange = (value: number) => {
    setRules((prev) => ({
      ...prev,
      hype_adjective_count: value,
    }));
  };

  const handleSkeletonSelect = (skeletonName: SkeletonName) => {
    setSelectedSkeleton(skeletonName);
    if (rules.skeleton_rules?.[skeletonName]) {
      setSkeletonRules(rules.skeleton_rules[skeletonName]);
    } else {
      setSkeletonRules({});
    }
  };

  const handleSkeletonRuleToggle = (key: keyof VoiceRulesType) => {
    setSkeletonRules((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleReset = () => {
    setRules({});
    setSelectedSkeleton('');
    setSkeletonRules({});
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updatedRules: VoiceRulesType = {
        ...rules,
        ...(selectedSkeleton && {
          skeleton_rules: {
            ...rules.skeleton_rules,
            [selectedSkeleton]: skeletonRules,
          },
        }),
      };
      onUpdate(platform, updatedRules);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          paddingBottom: '16px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            backgroundColor: platformColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '600',
            fontSize: '14px',
          }}
        >
          {platformName.charAt(0)}
        </div>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>
            {platformName} Voice Rules
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Configure how content sounds on {platformName}
          </p>
        </div>
      </div>

      {/* Main Voice Toggles */}
      <div>
        <h4
          style={{
            fontSize: '14px',
            fontWeight: '500',
            color: 'var(--text-secondary)',
            marginBottom: '12px',
          }}
        >
          Voice Style Flags
        </h4>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '8px',
          }}
        >
          {VOICE_RULE_OPTIONS.map(({ key, label }) => (
            <label
              key={key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <input
                type="checkbox"
                checked={!!rules[key]}
                onChange={() => handleToggle(key)}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: platformColor,
                  cursor: 'pointer',
                }}
              />
              <span
                style={{
                  fontSize: '13px',
                  color: rules[key] ? 'var(--text-primary)' : 'var(--text-secondary)',
                }}
              >
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Hype Adjective Count */}
      <div>
        <h4
          style={{
            fontSize: '14px',
            fontWeight: '500',
            color: 'var(--text-secondary)',
            marginBottom: '12px',
          }}
        >
          Hype Adjective Count
        </h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <input
            type="range"
            min="0"
            max="5"
            value={rules.hype_adjective_count || 0}
            onChange={(e) => handleHypeChange(parseInt(e.target.value))}
            style={{
              flex: '1',
              accentColor: platformColor,
              cursor: 'pointer',
            }}
          />
          <span
            style={{
              minWidth: '24px',
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: '600',
              color: 'var(--text-primary)',
            }}
          >
            {rules.hype_adjective_count || 0}
          </span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
          Number of hype adjectives per post (0 = none, 5 = maximum)
        </p>
      </div>

      {/* Skeleton-Specific Rules */}
      <div>
        <h4
          style={{
            fontSize: '14px',
            fontWeight: '500',
            color: 'var(--text-secondary)',
            marginBottom: '12px',
          }}
        >
          Skeleton-Specific Rules
        </h4>

        {/* Skeleton selector */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '16px',
          }}
        >
          {(Object.keys(SKELETON_TEMPLATES) as SkeletonName[]).map((skeleton) => (
            <button
              key={skeleton}
              onClick={() => handleSkeletonSelect(skeleton)}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: '500',
                borderRadius: '6px',
                border: '1px solid',
                borderColor:
                  selectedSkeleton === skeleton ? platformColor : 'var(--border)',
                backgroundColor:
                  selectedSkeleton === skeleton ? `${platformColor}20` : 'var(--surface)',
                color:
                  selectedSkeleton === skeleton
                    ? platformColor
                    : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {SKELETON_TEMPLATES[skeleton].display_name}
            </button>
          ))}
        </div>

        {/* Skeleton rules configuration */}
        {selectedSkeleton && (
          <div
            style={{
              padding: '16px',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
            }}
          >
            <h5
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '12px',
              }}
            >
              {SKELETON_TEMPLATES[selectedSkeleton].display_name} Rules
            </h5>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '8px',
              }}
            >
              {VOICE_RULE_OPTIONS.map(({ key, label }) => (
                <label
                  key={key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    backgroundColor: 'var(--surface-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={!!skeletonRules[key]}
                    onChange={() => handleSkeletonRuleToggle(key)}
                    style={{
                      width: '16px',
                      height: '16px',
                      accentColor: platformColor,
                      cursor: 'pointer',
                    }}
                  />
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '16px',
          borderTop: '1px solid var(--border)',
        }}
      >
        <button
          onClick={handleReset}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 12px',
            fontSize: '13px',
            color: 'var(--text-secondary)',
            backgroundColor: 'transparent',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <RotateCcw size={14} />
          Reset
        </button>

        <button
          onClick={handleSave}
          disabled={isSaving}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: '500',
            color: 'white',
            backgroundColor: platformColor,
            border: 'none',
            borderRadius: '8px',
            cursor: isSaving ? 'not-allowed' : 'pointer',
            opacity: isSaving ? 0.7 : 1,
            transition: 'all 0.15s ease',
          }}
        >
          <Save size={16} />
          {showSaved ? 'Saved!' : isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
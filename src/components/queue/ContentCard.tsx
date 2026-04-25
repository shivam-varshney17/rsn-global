'use client';

import { Eye } from 'lucide-react';

interface ContentCardProps {
  item: {
    id: string;
    title: string;
    preview: string;
    platforms: string[];
    skeleton: string;
    stage: string;
    assignee: string;
    createdAt: string;
  };
  platformColors: Record<string, string>;
  stageColors: Record<string, string>;
  onClick: () => void;
  isSelected: boolean;
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

function getPlatformIcon(platform: string): string {
  const icons: Record<string, string> = {
    LinkedIn: 'in',
    Twitter: 'tw',
    Reddit: 'rd',
    Instagram: 'ig',
  };
  return icons[platform] || platform.slice(0, 2).toUpperCase();
}

export function ContentCard({
  item,
  platformColors,
  stageColors,
  onClick,
  isSelected,
}: ContentCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '12px',
        cursor: 'pointer',
        border: '2px solid',
        borderColor: isSelected ? '#6366f1' : 'transparent',
        boxShadow: isSelected
          ? '0 4px 12px rgba(99, 102, 241, 0.2)'
          : '0 1px 3px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        const viewBtn = e.currentTarget.querySelector('.view-action') as HTMLElement;
        if (viewBtn) viewBtn.style.opacity = '1';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = isSelected
          ? '0 4px 12px rgba(99, 102, 241, 0.2)'
          : '0 1px 3px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.transform = 'translateY(0)';
        const viewBtn = e.currentTarget.querySelector('.view-action') as HTMLElement;
        if (viewBtn) viewBtn.style.opacity = '0';
      }}
    >
      {/* Platform color left border */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '4px',
          backgroundColor:
            item.platforms.length === 1
              ? platformColors[item.platforms[0]]
              : `linear-gradient(to bottom, ${item.platforms.map((p) => platformColors[p]).join(', ')})`,
        }}
      />

      {/* Header: Skeleton badge */}
      <div style={{ marginBottom: '8px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '2px 8px',
            backgroundColor: '#ede9fe',
            color: '#7c3aed',
            fontSize: '11px',
            fontWeight: '500',
            borderRadius: '4px',
          }}
        >
          {item.skeleton}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '6px',
          lineHeight: '1.4',
        }}
      >
        {item.title}
      </h3>

      {/* Preview */}
      <p
        style={{
          fontSize: '12px',
          color: '#6b7280',
          lineHeight: '1.5',
          marginBottom: '10px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {item.preview}
      </p>

      {/* Footer: Platforms, stage, age */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Platform icons */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {item.platforms.map((platform) => (
            <span
              key={platform}
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '4px',
                backgroundColor: platformColors[platform],
                color: '#ffffff',
                fontSize: '9px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {getPlatformIcon(platform)}
            </span>
          ))}
        </div>

        {/* Age */}
        <span
          style={{
            fontSize: '11px',
            color: '#9ca3af',
          }}
        >
          {formatTimeAgo(item.createdAt)}
        </span>
      </div>

      {/* View action (appears on hover) */}
      <div
        className="view-action"
        style={{
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          opacity: 0,
          transition: 'opacity 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '11px',
          color: '#6366f1',
          fontWeight: '500',
        }}
      >
        <Eye size={12} />
        View
      </div>
    </div>
  );
}
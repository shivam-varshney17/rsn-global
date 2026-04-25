'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Edit2, Trash2, Eye, Lightbulb } from 'lucide-react';

type Platform = 'LINKEDIN' | 'TWITTER' | 'REDDIT' | 'INSTAGRAM';
type SkeletonName =
  | 'REPLACEMENT_STACK'
  | 'PRODUCT_INTRO'
  | 'REVENUE_PROOF'
  | 'ARSENAL_DROP'
  | 'SYSTEM_DROP'
  | 'CONTRARIAN_HOT_TAKE'
  | 'TOOL_STACK_FORMULA'
  | 'FRAMEWORK_EDUCATION'
  | 'FOUNDER_ARC'
  | 'SHORT_RAW';
type ContentStatus = 'DRAFT' | 'REVIEW' | 'APPROVED' | 'SCHEDULED' | 'PUBLISHED' | 'FAILED';

interface ContentPiece {
  id: string;
  idea_id: string;
  platform: Platform;
  final_text: string | null;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
}

interface Idea {
  id: string;
  title: string;
  core_concept: string;
  selected_skeleton: SkeletonName;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
  content_pieces: ContentPiece[];
}

interface IdeaCardProps {
  idea: Idea;
  onEdit?: (idea: Idea) => void;
  onDelete?: (ideaId: string) => void;
  onViewContent?: (idea: Idea) => void;
}

const skeletonLabels: Record<SkeletonName, string> = {
  REPLACEMENT_STACK: 'Replacement Stack',
  PRODUCT_INTRO: 'Product Intro',
  REVENUE_PROOF: 'Revenue Proof',
  ARSENAL_DROP: 'Arsenal Drop',
  SYSTEM_DROP: 'System Drop',
  CONTRARIAN_HOT_TAKE: 'Contrarian Hot Take',
  TOOL_STACK_FORMULA: 'Tool Stack Formula',
  FRAMEWORK_EDUCATION: 'Framework Education',
  FOUNDER_ARC: 'Founder Arc',
  SHORT_RAW: 'Short Raw',
};

const skeletonColors: Record<SkeletonName, string> = {
  REPLACEMENT_STACK: '#6366f1',
  PRODUCT_INTRO: '#8b5cf6',
  REVENUE_PROOF: '#10b981',
  ARSENAL_DROP: '#f59e0b',
  SYSTEM_DROP: '#3b82f6',
  CONTRARIAN_HOT_TAKE: '#ef4444',
  TOOL_STACK_FORMULA: '#14b8a6',
  FRAMEWORK_EDUCATION: '#ec4899',
  FOUNDER_ARC: '#f97316',
  SHORT_RAW: '#64748b',
};

const statusColors: Record<ContentStatus, string> = {
  DRAFT: '#6b7280',
  REVIEW: '#f59e0b',
  APPROVED: '#10b981',
  SCHEDULED: '#3b82f6',
  PUBLISHED: '#8b5cf6',
  FAILED: '#ef4444',
};

const platformColors: Record<Platform, string> = {
  LINKEDIN: '#0A66C2',
  TWITTER: '#000000',
  REDDIT: '#FF4500',
  INSTAGRAM: '#E4405F',
};

const platformLabels: Record<Platform, string> = {
  LINKEDIN: 'LinkedIn',
  TWITTER: 'Twitter',
  REDDIT: 'Reddit',
  INSTAGRAM: 'Instagram',
};

const platformIcons: Record<Platform, string> = {
  LINKEDIN: 'in',
  TWITTER: 'tw',
  REDDIT: 'rd',
  INSTAGRAM: 'ig',
};

export function IdeaCard({ idea, onEdit, onDelete, onViewContent }: IdeaCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getPlatformsForIdea = (): Platform[] => {
    const platforms = new Set<Platform>();
    idea.content_pieces.forEach((cp) => platforms.add(cp.platform));
    return Array.from(platforms);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const ideaPlatforms = getPlatformsForIdea();

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Header */}
      <div
        style={{
          padding: '16px 20px',
          cursor: 'pointer',
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
          {/* Title and Badges */}
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
              {idea.title}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
              {/* Skeleton Badge */}
              <span
                style={{
                  padding: '4px 10px',
                  backgroundColor: skeletonColors[idea.selected_skeleton] + '20',
                  color: skeletonColors[idea.selected_skeleton],
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '600',
                }}
              >
                {skeletonLabels[idea.selected_skeleton]}
              </span>

              {/* Status Badge */}
              <span
                style={{
                  padding: '4px 10px',
                  backgroundColor: statusColors[idea.status] + '20',
                  color: statusColors[idea.status],
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'capitalize',
                }}
              >
                {idea.status.toLowerCase()}
              </span>

              {/* Platform Icons */}
              <div style={{ display: 'flex', gap: '4px' }}>
                {ideaPlatforms.map((platform) => (
                  <span
                    key={platform}
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '4px',
                      backgroundColor: platformColors[platform],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '9px',
                      fontWeight: '700',
                      color: '#ffffff',
                    }}
                    title={platformLabels[platform]}
                  >
                    {platformIcons[platform]}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right side: pieces count and expand icon */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                padding: '4px 10px',
                backgroundColor: '#ede9fe',
                color: '#7c3aed',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: '600',
              }}
            >
              {idea.content_pieces.length} piece{idea.content_pieces.length !== 1 ? 's' : ''}
            </span>
            {isExpanded ? <ChevronUp size={18} color="#6b7280" /> : <ChevronDown size={18} color="#6b7280" />}
          </div>
        </div>

        {/* Date */}
        <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '8px' }}>
          Created {formatDate(idea.created_at)}
        </p>
      </div>

      {/* Hover Actions */}
      {isHovered && (
        <div
          style={{
            display: 'flex',
            gap: '8px',
            padding: '0 20px 12px',
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(idea);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '500',
              color: '#374151',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e5e7eb')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
          >
            <Edit2 size={14} />
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(idea.id);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              backgroundColor: '#fef2f2',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '500',
              color: '#dc2626',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fee2e2')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fef2f2')}
          >
            <Trash2 size={14} />
            Delete
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewContent?.(idea);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              backgroundColor: '#eff6ff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '500',
              color: '#2563eb',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#dbeafe')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#eff6ff')}
          >
            <Eye size={14} />
            View Content
          </button>
        </div>
      )}

      {/* Expanded Content Pieces */}
      {isExpanded && (
        <div
          style={{
            borderTop: '1px solid #e5e7eb',
            padding: '16px 20px',
            backgroundColor: '#f9fafb',
          }}
        >
          {idea.content_pieces.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px', textAlign: 'center' }}>
              <Lightbulb size={24} color="#d1d5db" style={{ marginBottom: '8px' }} />
              <p style={{ fontSize: '13px', color: '#9ca3af', fontStyle: 'italic' }}>
                No content pieces generated yet
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h4 style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', marginBottom: '4px' }}>
                Content Pieces
              </h4>
              {idea.content_pieces.map((cp) => (
                <div
                  key={cp.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    backgroundColor: '#ffffff',
                    borderRadius: '6px',
                    border: '1px solid #e5e7eb',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '6px',
                        backgroundColor: platformColors[cp.platform],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        fontWeight: '700',
                        color: '#ffffff',
                      }}
                    >
                      {platformIcons[cp.platform]}
                    </span>
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: '500', color: '#111827' }}>
                        {platformLabels[cp.platform]}
                      </span>
                      {cp.final_text && (
                        <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px', maxWidth: '350px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {cp.final_text}
                        </p>
                      )}
                    </div>
                  </div>
                  <span
                    style={{
                      padding: '4px 8px',
                      backgroundColor: statusColors[cp.status] + '20',
                      color: statusColors[cp.status],
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: '600',
                    }}
                  >
                    {cp.status.toLowerCase()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
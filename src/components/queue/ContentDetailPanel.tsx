'use client';

import { X, ArrowRight, Edit, Calendar, Trash2, Check, MessageSquare } from 'lucide-react';

interface ContentDetailPanelProps {
  content: {
    id: string;
    title: string;
    fullContent: string;
    platforms: string[];
    skeleton: string;
    stage: string;
    assignee: string;
    createdAt: string;
    ideaId: string;
    scheduledFor?: string;
    preview: string;
  } | null;
  onClose: () => void;
  onAdvance: (item: any) => void;
  onDelete: (id: string) => void;
  stages: string[];
  stageColors: Record<string, string>;
  platformColors: Record<string, string>;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
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

export function ContentDetailPanel({
  content,
  onClose,
  onAdvance,
  onDelete,
  stages,
  stageColors,
  platformColors,
}: ContentDetailPanelProps) {
  if (!content) return null;

  const currentStageIndex = stages.indexOf(content.stage);
  const canAdvance = currentStageIndex < stages.length - 1;
  const isLastStage = currentStageIndex === stages.length - 1;
  const isReviewStage = content.stage === 'Review';

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          zIndex: 40,
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '480px',
          maxWidth: '100vw',
          backgroundColor: '#ffffff',
          boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.15)',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          transform: content ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '8px',
                lineHeight: '1.4',
              }}
            >
              {content.title}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span
                style={{
                  padding: '4px 10px',
                  backgroundColor: '#ede9fe',
                  color: '#7c3aed',
                  fontSize: '12px',
                  fontWeight: '500',
                  borderRadius: '6px',
                }}
              >
                {content.skeleton}
              </span>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  backgroundColor: `${stageColors[content.stage]}15`,
                  color: stageColors[content.stage],
                  fontSize: '12px',
                  fontWeight: '500',
                  borderRadius: '6px',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: stageColors[content.stage],
                  }}
                />
                {content.stage}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '8px',
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} color="#6b7280" />
          </button>
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
          }}
        >
          {/* Platforms */}
          <div style={{ marginBottom: '24px' }}>
            <h3
              style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '10px',
              }}
            >
              Target Platforms
            </h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              {content.platforms.map((platform) => (
                <span
                  key={platform}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    backgroundColor: platformColors[platform],
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: '600',
                    borderRadius: '6px',
                  }}
                >
                  <span style={{ fontSize: '10px', fontWeight: '700' }}>
                    {getPlatformIcon(platform)}
                  </span>
                  {platform}
                </span>
              ))}
            </div>
          </div>

          {/* Full Content */}
          <div style={{ marginBottom: '24px' }}>
            <h3
              style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '10px',
              }}
            >
              Content
            </h3>
            <div
              style={{
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                padding: '16px',
                fontSize: '14px',
                lineHeight: '1.7',
                color: '#374151',
                whiteSpace: 'pre-wrap',
              }}
            >
              {content.fullContent}
            </div>
          </div>

          {/* Meta info */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              padding: '16px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '11px',
                  color: '#6b7280',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                Assignee
              </span>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                {content.assignee}
              </span>
            </div>
            <div>
              <span
                style={{
                  fontSize: '11px',
                  color: '#6b7280',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                Created
              </span>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                {formatDate(content.createdAt)}
              </span>
            </div>
            {content.scheduledFor && (
              <div>
                <span
                  style={{
                    fontSize: '11px',
                    color: '#6b7280',
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  Scheduled For
                </span>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                  {formatDate(content.scheduledFor)}
                </span>
              </div>
            )}
            <div>
              <span
                style={{
                  fontSize: '11px',
                  color: '#6b7280',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                Idea ID
              </span>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#6366f1',
                  cursor: 'pointer',
                }}
              >
                #{content.ideaId.split('-')[1]}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div
          style={{
            padding: '20px 24px',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          {/* Advance / Stage-specific action */}
          {content.stage === 'Review' && (
            <>
              <button
                onClick={() => onAdvance(content)}
                style={{
                  flex: 1,
                  minWidth: '140px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                <Check size={16} />
                Approve
              </button>
              <button
                style={{
                  flex: 1,
                  minWidth: '140px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  backgroundColor: '#fef3c7',
                  color: '#d97706',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                <MessageSquare size={16} />
                Request Changes
              </button>
            </>
          )}

          {content.stage !== 'Review' && canAdvance && !isLastStage && (
            <button
              onClick={() => onAdvance(content)}
              style={{
                flex: 1,
                minWidth: '140px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '10px 16px',
                backgroundColor: '#6366f1',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              <ArrowRight size={16} />
              Advance Stage
            </button>
          )}

          {content.stage === 'Approved' && (
            <button
              style={{
                flex: 1,
                minWidth: '140px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '10px 16px',
                backgroundColor: '#3b82f6',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              <Calendar size={16} />
              Schedule
            </button>
          )}

          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 16px',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            <Edit size={16} />
            Edit
          </button>

          <button
            onClick={() => onDelete(content.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 16px',
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
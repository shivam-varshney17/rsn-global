'use client';

import { useParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import { Plus, Calendar, BarChart3, Clock } from 'lucide-react';
import { LinkedinIcon, TwitterIcon, InstagramIcon } from '@/components/icons/PlatformIcons';
import { PageHeader } from '@/components/layout/PageHeader';
import { PlatformNav } from '@/components/platforms/PlatformNav';

type Platform = 'LINKEDIN' | 'TWITTER' | 'REDDIT' | 'INSTAGRAM';
type ContentStatus = 'DRAFT' | 'REVIEW' | 'APPROVED' | 'SCHEDULED' | 'PUBLISHED' | 'FAILED';
type Stage = 'DRAFT' | 'REVIEW' | 'APPROVED' | 'SCHEDULED' | 'PUBLISHED';

interface ContentItem {
  id: string;
  title: string;
  preview: string;
  platforms: ('LinkedIn' | 'Twitter' | 'Reddit' | 'Instagram')[];
  skeleton: string;
  stage: Stage;
  createdAt: string;
  ideaId: string;
  scheduledFor?: string;
}

// Map route param to platform
const routeToPlatform: Record<string, Platform> = {
  linkedin: 'LINKEDIN',
  twitter: 'TWITTER',
  reddit: 'REDDIT',
  instagram: 'INSTAGRAM',
};

const platformInfo: Record<Platform, { label: string; color: string; icon: React.ReactNode }> = {
  LINKEDIN: { label: 'LinkedIn', color: '#0A66C2', icon: <LinkedinIcon size={20} /> },
  TWITTER: { label: 'Twitter', color: '#000000', icon: <TwitterIcon size={20} /> },
  REDDIT: { label: 'Reddit', color: '#FF4500', icon: <span style={{fontSize:20}}>📮</span> },
  INSTAGRAM: { label: 'Instagram', color: '#E4405F', icon: <InstagramIcon size={20} /> },
};

const stageColors: Record<Stage, string> = {
  Draft: '#6b7280',
  Review: '#f59e0b',
  Approved: '#10b981',
  Scheduled: '#3b82f6',
  Published: '#8b5cf6',
};

const STAGES: Stage[] = ['Draft', 'Review', 'Approved', 'Scheduled', 'Published'];

// Mock data filtered by platform
const mockContent: ContentItem[] = [
  {
    id: '1',
    title: 'AI SDR Agent Success Story',
    preview: 'We replaced our $200K SDR team with an AI agent. Here\'s the exact setup...',
    platforms: ['LinkedIn', 'Twitter', 'Instagram'],
    skeleton: 'Replacement Stack',
    stage: 'Review',
    createdAt: '2026-04-20T10:00:00Z',
    ideaId: 'idea-1',
  },
  {
    id: '2',
    title: 'n8n Workflow Automation Stack',
    preview: 'After 6 months testing automation tools, here\'s what\'s actually production-ready...',
    platforms: ['LinkedIn', 'Twitter'],
    skeleton: 'Arsenal Drop',
    stage: 'Draft',
    createdAt: '2026-04-22T14:30:00Z',
    ideaId: 'idea-2',
  },
  {
    id: '3',
    title: 'Revenue System Launch',
    preview: 'This system made me $47K last month. No sales calls. No cold outreach...',
    platforms: ['LinkedIn', 'Twitter', 'Reddit', 'Instagram'],
    skeleton: 'Revenue Proof',
    stage: 'Approved',
    createdAt: '2026-04-18T09:00:00Z',
    ideaId: 'idea-3',
  },
  {
    id: '4',
    title: 'Hot Take: Agencies Are Dead',
    preview: 'Hot take: The traditional marketing agency model is dead...',
    platforms: ['Twitter', 'LinkedIn'],
    skeleton: 'Contrarian Hot Take',
    stage: 'Scheduled',
    createdAt: '2026-04-15T16:00:00Z',
    ideaId: 'idea-4',
    scheduledFor: '2026-04-26T08:00:00Z',
  },
  {
    id: '5',
    title: 'Tool Stack Formula',
    preview: 'Claude + n8n + Apollo = your entire outbound pipeline...',
    platforms: ['LinkedIn', 'Twitter', 'Reddit'],
    skeleton: 'Tool Stack Formula',
    stage: 'Published',
    createdAt: '2026-04-10T11:00:00Z',
    ideaId: 'idea-5',
  },
  {
    id: '6',
    title: 'Framework: 5 Levels of AI Adoption',
    preview: 'Here\'s the cheat sheet for where you are in the AI adoption curve...',
    platforms: ['LinkedIn', 'Twitter', 'Instagram'],
    skeleton: 'Framework Education',
    stage: 'Draft',
    createdAt: '2026-04-23T08:00:00Z',
    ideaId: 'idea-6',
  },
];

// Platform posting schedule (mock)
const platformSchedules: Record<Platform, { bestTimes: string[]; days: string[] }> = {
  LINKEDIN: { bestTimes: ['08:00', '09:00'], days: ['Tuesday', 'Wednesday', 'Thursday'] },
  TWITTER: { bestTimes: ['08:00', '09:00', '17:00', '18:00'], days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] },
  REDDIT: { bestTimes: ['07:00', '08:00', '09:00'], days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
  INSTAGRAM: { bestTimes: ['11:00', '12:00', '19:00', '20:00'], days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
};

export default function PlatformPipelinePage() {
  const params = useParams();
  const platformParam = params.platform as string;
  const platform = routeToPlatform[platformParam] || 'LINKEDIN';
  const info = platformInfo[platform];

  // Filter content for this platform
  const platformLabel = info.label;
  const platformContent = mockContent.filter((item) =>
    item.platforms.some((p) => p.toUpperCase() === platform || (platform === 'LINKEDIN' && p === 'LinkedIn'))
  );

  const getContentByStage = (stage: Stage) =>
    platformContent.filter((item) => item.stage === stage);

  // Stats
  const stats = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const thisWeek = platformContent.filter((item) => new Date(item.createdAt) >= weekAgo);
    const scheduled = platformContent.filter((item) => item.stage === 'Scheduled');
    const published = platformContent.filter((item) => item.stage === 'Published');

    return {
      postsThisWeek: thisWeek.length,
      scheduled: scheduled.length,
      published: published.length,
      avgEngagement: Math.floor(Math.random() * 500) + 100,
    };
  }, [platformContent]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <PageHeader
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: platform === 'INSTAGRAM' ? 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' : info.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
              }}
            >
              {info.icon}
            </span>
            <span>{platformLabel} Pipeline</span>
          </div>
        }
        description={`Manage and track your ${platformLabel} content across all stages`}
        actions={
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              backgroundColor: info.color,
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            <Plus size={18} />
            Create {platformLabel} Content
          </button>
        }
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px 24px' }}>
        {/* Platform Nav */}
        <div style={{ marginBottom: '24px' }}>
          <PlatformNav postCounts={{ linkedin: 12, twitter: 24, reddit: 8, instagram: 16 }} />
        </div>

        {/* Platform Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              padding: '20px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: info.color + '20',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <BarChart3 size={20} color={info.color} />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500', marginBottom: '4px' }}>Posts This Week</p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>{stats.postsThisWeek}</p>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: '20px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: '#3b82f620',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Clock size={20} color="#3b82f6" />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500', marginBottom: '4px' }}>Scheduled</p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>{stats.scheduled}</p>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: '20px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: '#8b5cf620',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Calendar size={20} color="#8b5cf6" />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500', marginBottom: '4px' }}>Published</p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>{stats.published}</p>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: '20px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: '#10b98120',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <BarChart3 size={20} color="#10b981" />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500', marginBottom: '4px' }}>Avg Engagement</p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>{stats.avgEngagement}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Posting Schedule */}
        <div
          style={{
            padding: '20px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            marginBottom: '24px',
          }}
        >
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>
            Posting Schedule
          </h3>
          <div style={{ display: 'flex', gap: '24px' }}>
            <div>
              <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '6px' }}>Best Times (EST)</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                {platformSchedules[platform].bestTimes.map((time) => (
                  <span
                    key={time}
                    style={{
                      padding: '4px 10px',
                      backgroundColor: info.color + '15',
                      color: info.color,
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                    }}
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '6px' }}>Days</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {platformSchedules[platform].days.map((day) => (
                  <span
                    key={day}
                    style={{
                      padding: '4px 10px',
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                    }}
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            paddingBottom: '16px',
          }}
        >
          {STAGES.map((stage) => (
            <div
              key={stage}
              style={{
                flex: '0 0 280px',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#f3f4f6',
                borderRadius: '12px',
                maxHeight: 'calc(100vh - 400px)',
              }}
            >
              {/* Column Header */}
              <div
                style={{
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '2px solid',
                  borderColor: stageColors[stage],
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: stageColors[stage],
                    }}
                  />
                  <span style={{ fontWeight: '600', color: '#374151' }}>{stage}</span>
                </div>
                <span
                  style={{
                    backgroundColor: '#e5e7eb',
                    color: '#6b7280',
                    fontSize: '12px',
                    fontWeight: '500',
                    padding: '2px 8px',
                    borderRadius: '10px',
                  }}
                >
                  {getContentByStage(stage).length}
                </span>
              </div>

              {/* Cards */}
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {getContentByStage(stage).map((item) => (
                  <div
                    key={item.id}
                    style={{
                      padding: '14px',
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '6px', lineHeight: '1.4' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px', lineHeight: '1.4' }}>
                      {item.preview.length > 80 ? item.preview.substring(0, 80) + '...' : item.preview}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span
                        style={{
                          padding: '3px 8px',
                          backgroundColor: '#ede9fe',
                          color: '#7c3aed',
                          borderRadius: '4px',
                          fontSize: '10px',
                          fontWeight: '600',
                        }}
                      >
                        {item.skeleton}
                      </span>
                      {item.scheduledFor && (
                        <span style={{ fontSize: '10px', color: '#9ca3af' }}>
                          {new Date(item.scheduledFor).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {getContentByStage(stage).length === 0 && (
                  <div
                    style={{
                      padding: '24px 12px',
                      textAlign: 'center',
                      color: '#9ca3af',
                      fontSize: '12px',
                    }}
                  >
                    No content in {stage.toLowerCase()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
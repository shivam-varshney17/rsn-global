'use client';

import { useState } from 'react';
import { Lightbulb, Filter, Plus, ChevronDown, ChevronUp, Edit2, Trash2, Eye } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { NewIdeaModal } from '@/components/queue/NewIdeaModal';

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

// Mock data
const mockIdeas: Idea[] = [
  {
    id: 'idea-1',
    title: 'AI SDR Agent Success Story',
    core_concept: 'We replaced our $200K SDR team with an AI agent. Here\'s the exact setup that generated $340K in pipeline within 90 days.',
    selected_skeleton: 'REPLACEMENT_STACK',
    status: 'REVIEW',
    created_at: '2026-04-20T10:00:00Z',
    updated_at: '2026-04-20T10:00:00Z',
    content_pieces: [
      { id: 'cp-1', idea_id: 'idea-1', platform: 'LINKEDIN', final_text: 'Full LinkedIn post...', status: 'REVIEW', created_at: '2026-04-20T10:30:00Z', updated_at: '2026-04-20T10:30:00Z' },
      { id: 'cp-2', idea_id: 'idea-1', platform: 'TWITTER', final_text: 'Compressed tweet version...', status: 'DRAFT', created_at: '2026-04-20T10:35:00Z', updated_at: '2026-04-20T10:35:00Z' },
      { id: 'cp-3', idea_id: 'idea-1', platform: 'INSTAGRAM', final_text: 'Carousel caption...', status: 'DRAFT', created_at: '2026-04-20T10:40:00Z', updated_at: '2026-04-20T10:40:00Z' },
    ],
  },
  {
    id: 'idea-2',
    title: 'n8n Workflow Automation Stack',
    core_concept: 'After 6 months testing automation tools, here\'s what\'s actually production-ready.',
    selected_skeleton: 'ARSENAL_DROP',
    status: 'DRAFT',
    created_at: '2026-04-22T14:30:00Z',
    updated_at: '2026-04-22T14:30:00Z',
    content_pieces: [
      { id: 'cp-4', idea_id: 'idea-2', platform: 'LINKEDIN', final_text: null, status: 'DRAFT', created_at: '2026-04-22T15:00:00Z', updated_at: '2026-04-22T15:00:00Z' },
      { id: 'cp-5', idea_id: 'idea-2', platform: 'TWITTER', final_text: null, status: 'DRAFT', created_at: '2026-04-22T15:05:00Z', updated_at: '2026-04-22T15:05:00Z' },
    ],
  },
  {
    id: 'idea-3',
    title: 'Revenue System Launch',
    core_concept: 'This system made me $47K last month. No sales calls. No cold outreach.',
    selected_skeleton: 'REVENUE_PROOF',
    status: 'APPROVED',
    created_at: '2026-04-18T09:00:00Z',
    updated_at: '2026-04-19T11:00:00Z',
    content_pieces: [
      { id: 'cp-6', idea_id: 'idea-3', platform: 'LINKEDIN', final_text: 'Full LinkedIn post...', status: 'APPROVED', created_at: '2026-04-18T09:30:00Z', updated_at: '2026-04-19T11:00:00Z' },
      { id: 'cp-7', idea_id: 'idea-3', platform: 'TWITTER', final_text: 'Tweet version...', status: 'APPROVED', created_at: '2026-04-18T09:35:00Z', updated_at: '2026-04-19T11:00:00Z' },
      { id: 'cp-8', idea_id: 'idea-3', platform: 'REDDIT', final_text: 'Reddit technical breakdown...', status: 'SCHEDULED', created_at: '2026-04-18T09:40:00Z', updated_at: '2026-04-24T08:00:00Z' },
      { id: 'cp-9', idea_id: 'idea-3', platform: 'INSTAGRAM', final_text: 'Carousel caption...', status: 'PUBLISHED', created_at: '2026-04-18T09:45:00Z', updated_at: '2026-04-20T12:00:00Z' },
    ],
  },
  {
    id: 'idea-4',
    title: 'Hot Take: Agencies Are Dead',
    core_concept: 'The traditional marketing agency model is dead. Here\'s why AI wins.',
    selected_skeleton: 'CONTRARIAN_HOT_TAKE',
    status: 'SCHEDULED',
    created_at: '2026-04-15T16:00:00Z',
    updated_at: '2026-04-24T08:00:00Z',
    content_pieces: [
      { id: 'cp-10', idea_id: 'idea-4', platform: 'TWITTER', final_text: 'Twitter hot take...', status: 'SCHEDULED', created_at: '2026-04-15T16:30:00Z', updated_at: '2026-04-24T08:00:00Z' },
      { id: 'cp-11', idea_id: 'idea-4', platform: 'LINKEDIN', final_text: 'LinkedIn expanded version...', status: 'SCHEDULED', created_at: '2026-04-15T16:35:00Z', updated_at: '2026-04-24T08:00:00Z' },
    ],
  },
  {
    id: 'idea-5',
    title: 'Framework: 5 Levels of AI Adoption',
    core_concept: 'Here\'s the cheat sheet for where you are in the AI adoption curve.',
    selected_skeleton: 'FRAMEWORK_EDUCATION',
    status: 'DRAFT',
    created_at: '2026-04-23T08:00:00Z',
    updated_at: '2026-04-23T08:00:00Z',
    content_pieces: [],
  },
];

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

type SortOption = 'newest' | 'oldest' | 'skeleton' | 'status';
type FilterSkeleton = SkeletonName | 'ALL';
type FilterStatus = ContentStatus | 'ALL';
type FilterPlatform = Platform | 'ALL';

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>(mockIdeas);
  const [expandedIdea, setExpandedIdea] = useState<string | null>(null);
  const [isNewIdeaOpen, setIsNewIdeaOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filterSkeleton, setFilterSkeleton] = useState<FilterSkeleton>('ALL');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('ALL');
  const [filterPlatform, setFilterPlatform] = useState<FilterPlatform>('ALL');

  const getPlatformsForIdea = (idea: Idea): Platform[] => {
    const platforms = new Set<Platform>();
    idea.content_pieces.forEach((cp) => platforms.add(cp.platform));
    return Array.from(platforms);
  };

  const filteredIdeas = ideas
    .filter((idea) => {
      if (filterSkeleton !== 'ALL' && idea.selected_skeleton !== filterSkeleton) return false;
      if (filterStatus !== 'ALL' && idea.status !== filterStatus) return false;
      if (filterPlatform !== 'ALL' && !getPlatformsForIdea(idea).includes(filterPlatform)) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'skeleton':
          return a.selected_skeleton.localeCompare(b.selected_skeleton);
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <PageHeader
        title="Ideas"
        description="Manage your content ideas and track content pieces across platforms"
        actions={
          <button
            onClick={() => setIsNewIdeaOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
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
            <Plus size={18} />
            New Idea
          </button>
        }
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px 24px' }}>
        {/* Filters Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            padding: '16px 20px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            marginBottom: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={16} color="#6b7280" />
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#6b7280' }}>Filter:</span>
          </div>

          {/* Skeleton Filter */}
          <select
            value={filterSkeleton}
            onChange={(e) => setFilterSkeleton(e.target.value as FilterSkeleton)}
            style={{
              padding: '8px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '13px',
              backgroundColor: '#f9fafb',
              cursor: 'pointer',
            }}
          >
            <option value="ALL">All Skeletons</option>
            {Object.entries(skeletonLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
            style={{
              padding: '8px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '13px',
              backgroundColor: '#f9fafb',
              cursor: 'pointer',
            }}
          >
            <option value="ALL">All Statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="REVIEW">Review</option>
            <option value="APPROVED">Approved</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="PUBLISHED">Published</option>
          </select>

          {/* Platform Filter */}
          <select
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value as FilterPlatform)}
            style={{
              padding: '8px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '13px',
              backgroundColor: '#f9fafb',
              cursor: 'pointer',
            }}
          >
            <option value="ALL">All Platforms</option>
            <option value="LINKEDIN">LinkedIn</option>
            <option value="TWITTER">Twitter</option>
            <option value="REDDIT">Reddit</option>
            <option value="INSTAGRAM">Instagram</option>
          </select>

          {/* Sort */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: '#6b7280' }}>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              style={{
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '13px',
                backgroundColor: '#f9fafb',
                cursor: 'pointer',
              }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="skeleton">Skeleton Type</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>

        {/* Ideas Table */}
        {filteredIdeas.length === 0 ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '80px 20px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <Lightbulb size={48} color="#d1d5db" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              No ideas yet
            </h3>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px' }}>
              Start by adding your first content idea.
            </p>
            <button
              onClick={() => setIsNewIdeaOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
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
              <Plus size={18} />
              New Idea
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Table Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
                gap: '16px',
                padding: '12px 20px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px 8px 0 0',
                borderBottom: '1px solid #e5e7eb',
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Title</span>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Skeleton</span>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Status</span>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Platforms</span>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Created</span>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Pieces</span>
            </div>

            {/* Table Rows */}
            {filteredIdeas.map((idea) => {
              const isExpanded = expandedIdea === idea.id;
              const ideaPlatforms = getPlatformsForIdea(idea);

              return (
                <div key={idea.id}>
                  <div
                    onClick={() => setExpandedIdea(isExpanded ? null : idea.id)}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
                      gap: '16px',
                      padding: '16px 20px',
                      backgroundColor: '#ffffff',
                      borderRadius: isExpanded ? '8px 8px 0 0' : '8px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      cursor: 'pointer',
                      transition: 'box-shadow 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)')}
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)')}
                  >
                    {/* Title */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {isExpanded ? <ChevronUp size={18} color="#6b7280" /> : <ChevronDown size={18} color="#6b7280" />}
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>{idea.title}</span>
                    </div>

                    {/* Skeleton Badge */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
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
                    </div>

                    {/* Status Badge */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
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
                    </div>

                    {/* Platform Icons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {ideaPlatforms.length === 0 ? (
                        <span style={{ fontSize: '12px', color: '#9ca3af' }}>—</span>
                      ) : (
                        ideaPlatforms.map((platform) => (
                          <span
                            key={platform}
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '4px',
                              backgroundColor: platformColors[platform],
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '10px',
                              fontWeight: '700',
                              color: '#ffffff',
                            }}
                            title={platformLabels[platform]}
                          >
                            {platformIcons[platform]}
                          </span>
                        ))
                      )}
                    </div>

                    {/* Created Date */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', color: '#6b7280' }}>{formatDate(idea.created_at)}</span>
                    </div>

                    {/* Content Pieces Count */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span
                        style={{
                          padding: '4px 10px',
                          backgroundColor: '#ede9fe',
                          color: '#7c3aed',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                        }}
                      >
                        {idea.content_pieces.length} piece{idea.content_pieces.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Content Pieces */}
                  {isExpanded && (
                    <div
                      style={{
                        padding: '16px 20px',
                        backgroundColor: '#ffffff',
                        borderRadius: '0 0 8px 8px',
                        borderTop: '1px solid #e5e7eb',
                        marginTop: '-1px',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                        <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                          Content Pieces
                        </h4>
                        {idea.content_pieces.length === 0 ? (
                          <p style={{ fontSize: '13px', color: '#9ca3af', fontStyle: 'italic' }}>
                            No content pieces generated yet
                          </p>
                        ) : (
                          idea.content_pieces.map((cp) => (
                            <div
                              key={cp.id}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '10px 14px',
                                backgroundColor: '#f9fafb',
                                borderRadius: '6px',
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span
                                  style={{
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '6px',
                                    backgroundColor: platformColors[cp.platform],
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '11px',
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
                                    <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px', maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                      {cp.final_text}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <span
                                style={{
                                  padding: '4px 10px',
                                  backgroundColor: statusColors[cp.status] + '20',
                                  color: statusColors[cp.status],
                                  borderRadius: '6px',
                                  fontSize: '11px',
                                  fontWeight: '600',
                                }}
                              >
                                {cp.status.toLowerCase()}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <NewIdeaModal
        isOpen={isNewIdeaOpen}
        onClose={() => setIsNewIdeaOpen(false)}
        platformColors={platformColors}
      />
    </div>
  );
}
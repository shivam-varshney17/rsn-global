// Platform types
export type Platform = 'linkedin' | 'twitter' | 'reddit' | 'instagram';

// Pipeline stages
export type PipelineStage = 'draft' | 'in_review' | 'approved' | 'scheduled' | 'published';

// Content skeleton types
export type SkeletonType =
  | 'replacement_stack'
  | 'product_intro'
  | 'revenue_proof'
  | 'arsenal_drop'
  | 'system_drop'
  | 'contrarian_take'
  | 'tool_stack'
  | 'framework_education'
  | 'founder_arc'
  | 'short_raw';

// Pipeline item
export interface PipelineItem {
  id: string;
  title: string;
  platform: Platform;
  skeleton: SkeletonType;
  createdAt: string;
}

// Platform metrics
export interface PlatformMetrics {
  platform: Platform;
  postsThisWeek: number;
  scheduled: number;
  engagementEstimate: string;
}

// Calendar day
export interface CalendarDay {
  date: string;
  dayName: string;
  postCount: number;
}

// Idea/Content item
export interface IdeaItem {
  id: string;
  title: string;
  skeleton: SkeletonType;
  platforms: Platform[];
  status: PipelineStage;
  createdAt: string;
}

// Pipeline metrics (from API)
export interface PipelineMetrics {
  totalIdeasThisWeek: number;
  contentInPipeline: number;
  scheduledThisWeek: number;
  publishedThisWeek: number;
  pipelineByStage: Record<PipelineStage, PipelineItem[]>;
  platformMetrics: PlatformMetrics[];
  weeklyCalendar: CalendarDay[];
  recentIdeas: IdeaItem[];
}

// Platform color mapping
export const platformColors: Record<Platform, string> = {
  linkedin: '#0A66C2',
  twitter: '#000000',
  reddit: '#FF4500',
  instagram: '#E4405F',
};

// Platform display names
export const platformNames: Record<Platform, string> = {
  linkedin: 'LinkedIn',
  twitter: 'Twitter/X',
  reddit: 'Reddit',
  instagram: 'Instagram',
};

// Skeleton display names
export const skeletonNames: Record<SkeletonType, string> = {
  replacement_stack: 'Replacement Stack',
  product_intro: 'Product Intro',
  revenue_proof: 'Revenue Proof',
  arsenal_drop: 'Arsenal Drop',
  system_drop: 'System Drop',
  contrarian_take: 'Contrarian Take',
  tool_stack: 'Tool Stack',
  framework_education: 'Framework Education',
  founder_arc: 'Founder Arc',
  short_raw: 'Short Raw',
};

// Pipeline stage display names
export const stageNames: Record<PipelineStage, string> = {
  draft: 'Draft',
  in_review: 'In Review',
  approved: 'Approved',
  scheduled: 'Scheduled',
  published: 'Published',
};

// Mock data for development (replace with real API calls)
export const mockMetrics: PipelineMetrics = {
  totalIdeasThisWeek: 12,
  contentInPipeline: 8,
  scheduledThisWeek: 5,
  publishedThisWeek: 3,
  pipelineByStage: {
    draft: [
      {
        id: '1',
        title: 'AI SDR Agent replaced $200K team',
        platform: 'linkedin',
        skeleton: 'replacement_stack',
        createdAt: '2026-04-24T10:00:00Z',
      },
      {
        id: '2',
        title: 'n8n + Claude workflow breakdown',
        platform: 'reddit',
        skeleton: 'system_drop',
        createdAt: '2026-04-24T11:00:00Z',
      },
    ],
    in_review: [
      {
        id: '3',
        title: 'Hot take: LangChain is over',
        platform: 'twitter',
        skeleton: 'contrarian_take',
        createdAt: '2026-04-23T09:00:00Z',
      },
      {
        id: '4',
        title: 'MiniMax Video generation guide',
        platform: 'instagram',
        skeleton: 'framework_education',
        createdAt: '2026-04-23T14:00:00Z',
      },
      {
        id: '5',
        title: 'My AI stack for 2026',
        platform: 'linkedin',
        skeleton: 'arsenal_drop',
        createdAt: '2026-04-22T16:00:00Z',
      },
    ],
    approved: [
      {
        id: '6',
        title: 'Built a $50K/month revenue system',
        platform: 'linkedin',
        skeleton: 'revenue_proof',
        createdAt: '2026-04-21T10:00:00Z',
      },
    ],
    scheduled: [
      {
        id: '7',
        title: 'Introducing AutoClaw - our new agent',
        platform: 'twitter',
        skeleton: 'product_intro',
        createdAt: '2026-04-20T08:00:00Z',
      },
      {
        id: '8',
        title: 'Claude + n8n integration guide',
        platform: 'reddit',
        skeleton: 'tool_stack',
        createdAt: '2026-04-20T09:00:00Z',
      },
      {
        id: '9',
        title: 'We fired our marketing team',
        platform: 'instagram',
        skeleton: 'replacement_stack',
        createdAt: '2026-04-20T10:00:00Z',
      },
    ],
    published: [
      {
        id: '10',
        title: 'The framework that prints revenue',
        platform: 'linkedin',
        skeleton: 'framework_education',
        createdAt: '2026-04-19T08:00:00Z',
      },
      {
        id: '11',
        title: 'Stop using LangChain in 2026',
        platform: 'twitter',
        skeleton: 'contrarian_take',
        createdAt: '2026-04-18T09:00:00Z',
      },
      {
        id: '12',
        title: 'Founder story: from 0 to $1M ARR',
        platform: 'linkedin',
        skeleton: 'founder_arc',
        createdAt: '2026-04-17T10:00:00Z',
      },
    ],
  },
  platformMetrics: [
    {
      platform: 'linkedin',
      postsThisWeek: 4,
      scheduled: 2,
      engagementEstimate: 'High',
    },
    {
      platform: 'twitter',
      postsThisWeek: 3,
      scheduled: 1,
      engagementEstimate: 'Medium',
    },
    {
      platform: 'reddit',
      postsThisWeek: 2,
      scheduled: 1,
      engagementEstimate: 'Medium',
    },
    {
      platform: 'instagram',
      postsThisWeek: 3,
      scheduled: 1,
      engagementEstimate: 'High',
    },
  ],
  weeklyCalendar: [
    { date: '2026-04-20', dayName: 'Mon', postCount: 3 },
    { date: '2026-04-21', dayName: 'Tue', postCount: 2 },
    { date: '2026-04-22', dayName: 'Wed', postCount: 4 },
    { date: '2026-04-23', dayName: 'Thu', postCount: 1 },
    { date: '2026-04-24', dayName: 'Fri', postCount: 3 },
    { date: '2026-04-25', dayName: 'Sat', postCount: 0 },
    { date: '2026-04-26', dayName: 'Sun', postCount: 0 },
  ],
  recentIdeas: [
    {
      id: '1',
      title: 'AI SDR Agent replaced $200K team',
      skeleton: 'replacement_stack',
      platforms: ['linkedin', 'twitter', 'instagram'],
      status: 'draft',
      createdAt: '2026-04-24T10:00:00Z',
    },
    {
      id: '2',
      title: 'n8n + Claude workflow breakdown',
      skeleton: 'system_drop',
      platforms: ['reddit', 'linkedin'],
      status: 'in_review',
      createdAt: '2026-04-23T09:00:00Z',
    },
    {
      id: '3',
      title: 'Hot take: LangChain is over',
      skeleton: 'contrarian_take',
      platforms: ['twitter'],
      status: 'in_review',
      createdAt: '2026-04-23T14:00:00Z',
    },
    {
      id: '4',
      title: 'MiniMax Video generation guide',
      skeleton: 'framework_education',
      platforms: ['instagram', 'linkedin'],
      status: 'approved',
      createdAt: '2026-04-22T16:00:00Z',
    },
    {
      id: '5',
      title: 'My AI stack for 2026',
      skeleton: 'arsenal_drop',
      platforms: ['linkedin', 'twitter'],
      status: 'scheduled',
      createdAt: '2026-04-21T10:00:00Z',
    },
  ],
};

// API fetch function (replace mock with real API call)
export async function fetchPipelineMetrics(): Promise<PipelineMetrics> {
  try {
    const res = await fetch('/api/pipeline-metrics');
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  } catch {
    // Fall back to mock data when API is not available
    return mockMetrics;
  }
}
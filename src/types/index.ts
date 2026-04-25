// Content Production System — TypeScript Type Definitions
// Multi-platform content engine: ideas → content pieces → assets → scheduled posts

// ─────────────────────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────────────────────

export type Platform = 'LINKEDIN' | 'TWITTER' | 'REDDIT' | 'INSTAGRAM';

export type SkeletonName =
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

export type ContentStatus = 'DRAFT' | 'REVIEW' | 'APPROVED' | 'SCHEDULED' | 'PUBLISHED' | 'FAILED';

export type AssetType = 'IMAGE' | 'VIDEO' | 'AUDIO' | 'MUSIC';

export type WorkflowStage = 'DRAFT' | 'REVIEW' | 'APPROVED' | 'SCHEDULED' | 'PUBLISHED';

export type PostStatus = 'PENDING' | 'PUBLISHED' | 'FAILED' | 'CANCELLED';

// ─────────────────────────────────────────────────────────────
// DATABASE ENTITIES
// ─────────────────────────────────────────────────────────────

export interface Idea {
  id: string;
  title: string;
  core_concept: string;
  selected_skeleton: SkeletonName;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
}

export interface ContentPiece {
  id: string;
  idea_id: string;
  platform: Platform;
  final_text: string | null;
  status: ContentStatus;
  metadata: ContentPieceMetadata;
  created_at: string;
  updated_at: string;
}

export interface ContentPieceMetadata {
  // Platform-native content details
  hook?: string;
  body?: string;
  cta_keyword?: string;
  // Skeleton-specific data
  skeleton_version?: string;
  // Character counts per platform limits
  character_count?: number;
  // Hook/engagement metrics
  hook_type?: string;
  // For LinkedIn carousel
  carousel_slides?: CarouselSlide[];
  // For Reddit technical posts
  subreddit?: string;
  title_format?: string;
  // For Instagram Reels
  reel_duration?: number;
  caption_preview?: string;
  // Cross-post tracking
  original_platform?: Platform;
  adaptation_notes?: string;
  [key: string]: unknown;
}

export interface CarouselSlide {
  slide_number: number;
  headline: string;
  body?: string;
  image_url?: string;
  type: 'hook' | 'problem' | 'solution' | 'proof' | 'cta';
}

export interface Asset {
  id: string;
  content_piece_id: string;
  type: AssetType;
  url: string;
  metadata: AssetMetadata;
  created_at: string;
}

export interface AssetMetadata {
  // For images
  width?: number;
  height?: number;
  alt_text?: string;
  // For videos
  duration_seconds?: number;
  format?: string;
  thumbnail_url?: string;
  // For audio/music
  duration_ms?: number;
  bpm?: number;
  key?: string;
  genre?: string;
  // Generation metadata
  generated_by?: 'MINIMAX' | 'REMOTION' | 'MANUAL';
  generation_prompt?: string;
  [key: string]: unknown;
}

export interface ScheduledPost {
  id: string;
  content_piece_id: string;
  platform: Platform;
  scheduled_for: string;
  published_at: string | null;
  status: PostStatus;
  external_post_id: string | null;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

export interface WorkflowState {
  id: string;
  content_piece_id: string;
  stage: WorkflowStage;
  assigned_to: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface PlatformConfig {
  id: string;
  platform: Platform;
  account_handle: string | null;
  posting_schedule: PostingSchedule;
  voice_rules_json: VoiceRules;
  api_credentials: ApiCredentials;
  created_at: string;
  updated_at: string;
}

export interface PostingSchedule {
  best_times: string[];
  days: string[];
  timezone?: string;
}

export interface VoiceRules {
  // Platform voice settings
  use_em_dashes?: boolean;
  use_arrow_bullets?: boolean;
  use_emoji_steps?: boolean;
  use_unicode_bold?: boolean;
  hype_adjective_count?: number;
  use_binary_closer?: boolean;
  use_positioning_flip?: boolean;
  use_triads?: boolean;
  use_repost_ask?: boolean;
  use_scarcity_tail?: boolean;
  cta_keyword_mechanic?: boolean;
  // Skeleton-specific voice rules
  skeleton_rules?: Record<SkeletonName, SkeletonVoiceRule>;
  [key: string]: unknown;
}

export interface SkeletonVoiceRule {
  hook_format?: string;
  body_format?: string;
  cta_format?: string;
  tone?: string;
  [key: string]: unknown;
}

export interface ApiCredentials {
  // Platform API credentials (encrypted/stored securely)
  access_token?: string;
  refresh_token?: string;
  token_expires_at?: string;
  api_key?: string;
  [key: string]: unknown;
}

export interface ContentCalendar {
  id: string;
  content_piece_id: string;
  scheduled_date: string;
  scheduled_time: string | null;
  timezone: string;
  platform: Platform;
  skeleton: SkeletonName;
  title: string;
  created_at: string;
}

export interface PipelineMetric {
  id: string;
  date: string;
  platform: Platform;
  posts_published: number;
  engagement_estimates: EngagementEstimates;
  created_at: string;
}

export interface EngagementEstimates {
  // Estimated engagement metrics (before actual posting)
  estimated_impressions?: number;
  estimated_engagement_rate?: number;
  estimated_saves?: number;
  estimated_shares?: number;
  estimated_comments?: number;
  // Actual metrics (after posting)
  actual_impressions?: number;
  actual_likes?: number;
  actual_comments?: number;
  actual_saves?: number;
  actual_shares?: number;
  actual_dms?: number;
  // Platform-specific metrics
  linkedin_profile_views?: number;
  linkedin_connection_requests?: number;
  twitter_bookmarks?: number;
  twitter_quote_tweets?: number;
  reddit_upvotes?: number;
  reddit_karma?: number;
  instagram_saves?: number;
  instagram_shares?: number;
  instagram_profile_visits?: number;
  [key: string]: unknown;
}

// ─────────────────────────────────────────────────────────────
// RELATIONSHIPS
// ─────────────────────────────────────────────────────────────

export interface IdeaWithContentPieces extends Idea {
  content_pieces: ContentPiece[];
}

export interface ContentPieceWithAssets extends ContentPiece {
  assets: Asset[];
}

export interface ContentPieceWithWorkflow extends ContentPiece {
  workflow_state: WorkflowState | null;
}

export interface ContentPieceFull extends ContentPiece {
  idea: Idea;
  assets: Asset[];
  workflow_state: WorkflowState | null;
  scheduled_posts: ScheduledPost[];
}

// ─────────────────────────────────────────────────────────────
// INPUT TYPES (for creating/updating)
// ─────────────────────────────────────────────────────────────

export interface CreateIdeaInput {
  title: string;
  core_concept: string;
  selected_skeleton: SkeletonName;
  status?: ContentStatus;
}

export interface UpdateIdeaInput {
  title?: string;
  core_concept?: string;
  selected_skeleton?: SkeletonName;
  status?: ContentStatus;
}

export interface CreateContentPieceInput {
  idea_id: string;
  platform: Platform;
  final_text?: string;
  status?: ContentStatus;
  metadata?: ContentPieceMetadata;
}

export interface UpdateContentPieceInput {
  final_text?: string;
  status?: ContentStatus;
  metadata?: ContentPieceMetadata;
}

export interface CreateAssetInput {
  content_piece_id: string;
  type: AssetType;
  url: string;
  metadata?: AssetMetadata;
}

export interface CreateScheduledPostInput {
  content_piece_id: string;
  platform: Platform;
  scheduled_for: string;
}

export interface UpdateScheduledPostInput {
  scheduled_for?: string;
  published_at?: string;
  status?: PostStatus;
  external_post_id?: string;
  error_message?: string;
}

export interface UpdateWorkflowStateInput {
  stage: WorkflowStage;
  assigned_to?: string;
  notes?: string;
}

export interface UpdatePlatformConfigInput {
  account_handle?: string;
  posting_schedule?: PostingSchedule;
  voice_rules_json?: VoiceRules;
  api_credentials?: ApiCredentials;
}

export interface CreatePipelineMetricInput {
  date: string;
  platform: Platform;
  posts_published?: number;
  engagement_estimates?: EngagementEstimates;
}

// ─────────────────────────────────────────────────────────────
// SKELETON CONTENT TEMPLATES
// ─────────────────────────────────────────────────────────────

export interface SkeletonTemplate {
  name: SkeletonName;
  display_name: string;
  description: string;
  platforms: Platform[];
  optimal_posting_times: Partial<Record<Platform, string[]>>;
  voice_rules: Partial<Record<Platform, VoiceRules>>;
}

export const SKELETON_TEMPLATES: Record<SkeletonName, SkeletonTemplate> = {
  REPLACEMENT_STACK: {
    name: 'REPLACEMENT_STACK',
    display_name: 'Replacement Stack',
    description: '"This [thing] replaces your $[X] [role]." — System reveal with proof.',
    platforms: ['LINKEDIN', 'TWITTER', 'REDDIT', 'INSTAGRAM'],
    optimal_posting_times: {
      LINKEDIN: ['08:00', '09:00'],
      TWITTER: ['08:00', '09:00', '17:00', '18:00'],
      REDDIT: ['07:00', '08:00', '09:00'],
      INSTAGRAM: ['11:00', '12:00', '19:00', '20:00'],
    },
    voice_rules: {
      LINKEDIN: { use_em_dashes: true, use_arrow_bullets: true, use_emoji_steps: true, hype_adjective_count: 2 },
      TWITTER: { use_em_dashes: true, use_arrow_bullets: false, hype_adjective_count: 1 },
      REDDIT: { use_em_dashes: false, use_arrow_bullets: false, hype_adjective_count: 0 },
      INSTAGRAM: { use_em_dashes: true, use_arrow_bullets: true, use_emoji_steps: true, hype_adjective_count: 1 },
    },
  },
  PRODUCT_INTRO: {
    name: 'PRODUCT_INTRO',
    display_name: 'Product Intro',
    description: '"Introducing [Product Name]." — Feature showcase with positioning flip.',
    platforms: ['LINKEDIN', 'TWITTER', 'REDDIT', 'INSTAGRAM'],
    optimal_posting_times: {
      LINKEDIN: ['08:00', '09:00'],
      TWITTER: ['08:00', '09:00', '17:00'],
      REDDIT: ['07:00', '08:00', '09:00'],
      INSTAGRAM: ['11:00', '12:00', '19:00'],
    },
    voice_rules: {
      LINKEDIN: { use_em_dashes: true, use_positioning_flip: true, hype_adjective_count: 2 },
      TWITTER: { use_em_dashes: true, use_positioning_flip: true, hype_adjective_count: 1 },
      REDDIT: { use_em_dashes: false, hype_adjective_count: 0 },
      INSTAGRAM: { use_em_dashes: true, use_positioning_flip: true, hype_adjective_count: 1 },
    },
  },
  REVENUE_PROOF: {
    name: 'REVENUE_PROOF',
    display_name: 'Revenue Proof',
    description: '"This system made me $[X] last month." — Financial results with mechanism.',
    platforms: ['LINKEDIN', 'TWITTER', 'REDDIT', 'INSTAGRAM'],
    optimal_posting_times: {
      LINKEDIN: ['08:00', '09:00'],
      TWITTER: ['08:00', '09:00', '17:00', '18:00'],
      REDDIT: ['07:00', '08:00'],
      INSTAGRAM: ['11:00', '12:00', '19:00', '20:00'],
    },
    voice_rules: {
      LINKEDIN: { use_em_dashes: true, use_arrow_bullets: true, use_binary_closer: true, hype_adjective_count: 2 },
      TWITTER: { use_em_dashes: true, use_binary_closer: true, hype_adjective_count: 1 },
      REDDIT: { use_em_dashes: false, hype_adjective_count: 0 },
      INSTAGRAM: { use_em_dashes: true, use_binary_closer: true, hype_adjective_count: 1 },
    },
  },
  ARSENAL_DROP: {
    name: 'ARSENAL_DROP',
    display_name: 'Arsenal Drop',
    description: '"After [N] hours testing..." — Full tool list with honest assessments.',
    platforms: ['LINKEDIN', 'TWITTER', 'REDDIT', 'INSTAGRAM'],
    optimal_posting_times: {
      LINKEDIN: ['08:00', '09:00'],
      TWITTER: ['08:00', '09:00', '17:00'],
      REDDIT: ['07:00', '08:00', '09:00'],
      INSTAGRAM: ['11:00', '12:00', '19:00', '20:00'],
    },
    voice_rules: {
      LINKEDIN: { use_em_dashes: true, use_arrow_bullets: true, use_triads: true, hype_adjective_count: 2 },
      TWITTER: { use_em_dashes: true, use_triads: true, hype_adjective_count: 1 },
      REDDIT: { use_em_dashes: false, hype_adjective_count: 0 },
      INSTAGRAM: { use_em_dashes: true, use_arrow_bullets: true, hype_adjective_count: 1 },
    },
  },
  SYSTEM_DROP: {
    name: 'SYSTEM_DROP',
    display_name: 'System Drop',
    description: '"Built this in [time]." — Complete system reveal with soft positioning.',
    platforms: ['LINKEDIN', 'TWITTER', 'REDDIT', 'INSTAGRAM'],
    optimal_posting_times: {
      LINKEDIN: ['08:00', '09:00'],
      TWITTER: ['08:00', '09:00', '17:00', '18:00'],
      REDDIT: ['07:00', '08:00', '09:00'],
      INSTAGRAM: ['11:00', '12:00', '19:00', '20:00'],
    },
    voice_rules: {
      LINKEDIN: { use_em_dashes: true, use_arrow_bullets: true, hype_adjective_count: 2 },
      TWITTER: { use_em_dashes: true, hype_adjective_count: 1 },
      REDDIT: { use_em_dashes: false, hype_adjective_count: 0 },
      INSTAGRAM: { use_em_dashes: true, use_arrow_bullets: true, hype_adjective_count: 1 },
    },
  },
  CONTRARIAN_HOT_TAKE: {
    name: 'CONTRARIAN_HOT_TAKE',
    display_name: 'Contrarian Hot Take',
    description: '"NEVER [thing] again." — Bold opinion with supporting evidence.',
    platforms: ['LINKEDIN', 'TWITTER', 'REDDIT', 'INSTAGRAM'],
    optimal_posting_times: {
      LINKEDIN: ['08:00', '09:00'],
      TWITTER: ['08:00', '09:00', '17:00', '18:00'],
      REDDIT: ['07:00', '08:00', '09:00'],
      INSTAGRAM: ['11:00', '12:00', '19:00', '20:00'],
    },
    voice_rules: {
      LINKEDIN: { use_em_dashes: true, hype_adjective_count: 3, use_binary_closer: true },
      TWITTER: { use_em_dashes: true, hype_adjective_count: 1, use_binary_closer: true },
      REDDIT: { use_em_dashes: false, hype_adjective_count: 0 },
      INSTAGRAM: { use_em_dashes: true, hype_adjective_count: 1, use_binary_closer: true },
    },
  },
  TOOL_STACK_FORMULA: {
    name: 'TOOL_STACK_FORMULA',
    display_name: 'Tool Stack Formula',
    description: '"[Tool A] + [Tool B] + [Tool C] = [Result]." — Formulaic stack reveal.',
    platforms: ['LINKEDIN', 'TWITTER', 'REDDIT', 'INSTAGRAM'],
    optimal_posting_times: {
      LINKEDIN: ['08:00', '09:00'],
      TWITTER: ['08:00', '09:00', '17:00', '18:00'],
      REDDIT: ['07:00', '08:00', '09:00'],
      INSTAGRAM: ['11:00', '12:00', '19:00', '20:00'],
    },
    voice_rules: {
      LINKEDIN: { use_em_dashes: true, use_arrow_bullets: true, use_triads: true, hype_adjective_count: 2 },
      TWITTER: { use_em_dashes: true, use_triads: true, hype_adjective_count: 1 },
      REDDIT: { use_em_dashes: false, hype_adjective_count: 0 },
      INSTAGRAM: { use_em_dashes: true, use_arrow_bullets: true, hype_adjective_count: 1 },
    },
  },
  FRAMEWORK_EDUCATION: {
    name: 'FRAMEWORK_EDUCATION',
    display_name: 'Framework Education',
    description: '5-7 level framework with teaching authority. "Which level are you at?"',
    platforms: ['LINKEDIN', 'TWITTER', 'REDDIT', 'INSTAGRAM'],
    optimal_posting_times: {
      LINKEDIN: ['08:00', '09:00'],
      TWITTER: ['08:00', '09:00', '17:00'],
      REDDIT: ['07:00', '08:00', '09:00'],
      INSTAGRAM: ['11:00', '12:00', '19:00', '20:00'],
    },
    voice_rules: {
      LINKEDIN: { use_em_dashes: true, use_arrow_bullets: true, hype_adjective_count: 2 },
      TWITTER: { use_em_dashes: true, hype_adjective_count: 1 },
      REDDIT: { use_em_dashes: false, hype_adjective_count: 0 },
      INSTAGRAM: { use_em_dashes: true, use_arrow_bullets: true, hype_adjective_count: 1 },
    },
  },
  FOUNDER_ARC: {
    name: 'FOUNDER_ARC',
    display_name: 'Founder Arc',
    description: 'Honest vulnerability + specific proof. Build log format.',
    platforms: ['LINKEDIN', 'TWITTER', 'REDDIT', 'INSTAGRAM'],
    optimal_posting_times: {
      LINKEDIN: ['08:00', '09:00'],
      TWITTER: ['08:00', '09:00', '17:00', '18:00'],
      REDDIT: ['07:00', '08:00', '09:00'],
      INSTAGRAM: ['11:00', '12:00', '19:00', '20:00'],
    },
    voice_rules: {
      LINKEDIN: { use_em_dashes: true, use_arrow_bullets: true, hype_adjective_count: 2 },
      TWITTER: { use_em_dashes: true, hype_adjective_count: 1 },
      REDDIT: { use_em_dashes: false, hype_adjective_count: 0 },
      INSTAGRAM: { use_em_dashes: true, use_arrow_bullets: true, hype_adjective_count: 1 },
    },
  },
  SHORT_RAW: {
    name: 'SHORT_RAW',
    display_name: 'Short Raw',
    description: '1-4 lines. No CTA. Pure punchline. Native format per platform.',
    platforms: ['LINKEDIN', 'TWITTER', 'INSTAGRAM'],
    optimal_posting_times: {
      LINKEDIN: ['08:00', '09:00'],
      TWITTER: ['08:00', '09:00', '17:00', '18:00'],
      INSTAGRAM: ['11:00', '12:00', '19:00', '20:00'],
    },
    voice_rules: {
      LINKEDIN: { use_em_dashes: true },
      TWITTER: { use_em_dashes: true },
      INSTAGRAM: { use_em_dashes: true },
    },
  },
};

// ─────────────────────────────────────────────────────────────
// PLATFORM CONFIG DEFAULTS
// ─────────────────────────────────────────────────────────────

export const PLATFORM_LIMITS: Record<Platform, PlatformLimits> = {
  LINKEDIN: {
    text_limit: 3000,
    image_limit: 9,
    video_limit_seconds: 600,
    carousel_slides_max: 300,
    hashtag_recommendation: '0-3',
  },
  TWITTER: {
    text_limit: 280,
    long_form_limit: 25000,
    image_limit: 4,
    video_limit_seconds: 140,
  },
  REDDIT: {
    text_limit: null, // Unlimited
    image_limit: 20,
    title_limit: 300,
  },
  INSTAGRAM: {
    text_limit: 2200,
    caption_preview_chars: 125,
    image_limit: 20,
    video_limit_seconds: 90,
    carousel_slides_max: 20,
    hashtag_recommendation: '3-5',
  },
};

export interface PlatformLimits {
  text_limit: number | null;
  image_limit: number;
  video_limit_seconds?: number;
  carousel_slides_max?: number;
  long_form_limit?: number;
  title_limit?: number;
  caption_preview_chars?: number;
  hashtag_recommendation?: string;
}

// ─────────────────────────────────────────────────────────────
// UTILITY TYPES
// ─────────────────────────────────────────────────────────────

export type Database = {
  public: {
    Tables: {
      ideas: {
        Row: Idea;
        Insert: Omit<Idea, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Idea, 'id' | 'created_at' | 'updated_at'>>;
      };
      content_pieces: {
        Row: ContentPiece;
        Insert: Omit<ContentPiece, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ContentPiece, 'id' | 'created_at' | 'updated_at'>>;
      };
      assets: {
        Row: Asset;
        Insert: Omit<Asset, 'id' | 'created_at'>;
        Update: Partial<Omit<Asset, 'id' | 'created_at'>>;
      };
      scheduled_posts: {
        Row: ScheduledPost;
        Insert: Omit<ScheduledPost, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ScheduledPost, 'id' | 'created_at' | 'updated_at'>>;
      };
      workflow_states: {
        Row: WorkflowState;
        Insert: Omit<WorkflowState, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<WorkflowState, 'id' | 'created_at' | 'updated_at'>>;
      };
      platform_configs: {
        Row: PlatformConfig;
        Insert: Omit<PlatformConfig, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<PlatformConfig, 'id' | 'created_at' | 'updated_at'>>;
      };
      content_calendar: {
        Row: ContentCalendar;
        Insert: Omit<ContentCalendar, 'id' | 'created_at'>;
        Update: Partial<Omit<ContentCalendar, 'id' | 'created_at'>>;
      };
      pipeline_metrics: {
        Row: PipelineMetric;
        Insert: Omit<PipelineMetric, 'id' | 'created_at'>;
        Update: Partial<Omit<PipelineMetric, 'id' | 'created_at'>>;
      };
    };
  };
};
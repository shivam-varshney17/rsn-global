-- Content Production System — Initial Schema
-- Multi-platform content engine: ideas → content pieces → assets → scheduled posts
-- Platforms: LinkedIn, Twitter/X, Reddit, Instagram

-- ─────────────────────────────────────────────────────────────
-- ENUMS
-- ─────────────────────────────────────────────────────────────

CREATE TYPE platform AS ENUM ('LINKEDIN', 'TWITTER', 'REDDIT', 'INSTAGRAM');

CREATE TYPE skeleton_name AS ENUM (
  'REPLACEMENT_STACK',
  'PRODUCT_INTRO',
  'REVENUE_PROOF',
  'ARSENAL_DROP',
  'SYSTEM_DROP',
  'CONTRARIAN_HOT_TAKE',
  'TOOL_STACK_FORMULA',
  'FRAMEWORK_EDUCATION',
  'FOUNDER_ARC',
  'SHORT_RAW'
);

CREATE TYPE content_status AS ENUM ('DRAFT', 'REVIEW', 'APPROVED', 'SCHEDULED', 'PUBLISHED', 'FAILED');

CREATE TYPE asset_type AS ENUM ('IMAGE', 'VIDEO', 'AUDIO', 'MUSIC');

CREATE TYPE workflow_stage AS ENUM ('DRAFT', 'REVIEW', 'APPROVED', 'SCHEDULED', 'PUBLISHED');

CREATE TYPE post_status AS ENUM ('PENDING', 'PUBLISHED', 'FAILED', 'CANCELLED');

-- ─────────────────────────────────────────────────────────────
-- TABLE: ideas
-- Raw content ideas from which platform-specific content is derived
-- ─────────────────────────────────────────────────────────────

CREATE TABLE ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  core_concept TEXT NOT NULL,
  selected_skeleton skeleton_name NOT NULL,
  status content_status NOT NULL DEFAULT 'DRAFT',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_ideas_status ON ideas(status);
CREATE INDEX idx_ideas_skeleton ON ideas(selected_skeleton);
CREATE INDEX idx_ideas_created_at ON ideas(created_at DESC);

-- ─────────────────────────────────────────────────────────────
-- TABLE: content_pieces
-- Platform-specific content derived from an idea
-- ─────────────────────────────────────────────────────────────

CREATE TABLE content_pieces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  idea_id UUID NOT NULL REFERENCES ideas(id) ON DELETE CASCADE,
  platform platform NOT NULL,
  final_text TEXT,
  status content_status NOT NULL DEFAULT 'DRAFT',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- One piece per idea per platform (no duplicates)
  UNIQUE(idea_id, platform)
);

CREATE INDEX idx_content_pieces_idea_id ON content_pieces(idea_id);
CREATE INDEX idx_content_pieces_platform ON content_pieces(platform);
CREATE INDEX idx_content_pieces_status ON content_pieces(status);

-- ─────────────────────────────────────────────────────────────
-- TABLE: assets
-- Generated media assets (images, videos, audio, music)
-- Linked to a content piece
-- ─────────────────────────────────────────────────────────────

CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_piece_id UUID NOT NULL REFERENCES content_pieces(id) ON DELETE CASCADE,
  type asset_type NOT NULL,
  url TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_assets_content_piece_id ON assets(content_piece_id);
CREATE INDEX idx_assets_type ON assets(type);

-- ─────────────────────────────────────────────────────────────
-- TABLE: scheduled_posts
-- Publishing queue for content pieces
-- ─────────────────────────────────────────────────────────────

CREATE TABLE scheduled_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_piece_id UUID NOT NULL REFERENCES content_pieces(id) ON DELETE CASCADE,
  platform platform NOT NULL,
  scheduled_for TIMESTAMPTZ NOT NULL,
  published_at TIMESTAMPTZ,
  status post_status NOT NULL DEFAULT 'PENDING',
  external_post_id TEXT,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_scheduled_posts_content_piece_id ON scheduled_posts(content_piece_id);
CREATE INDEX idx_scheduled_posts_platform ON scheduled_posts(platform);
CREATE INDEX idx_scheduled_posts_scheduled_for ON scheduled_posts(scheduled_for);
CREATE INDEX idx_scheduled_posts_status ON scheduled_posts(status);

-- ─────────────────────────────────────────────────────────────
-- TABLE: workflow_states
-- Pipeline state per content piece (draft → review → approved → scheduled → published)
-- ─────────────────────────────────────────────────────────────

CREATE TABLE workflow_states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_piece_id UUID NOT NULL UNIQUE REFERENCES content_pieces(id) ON DELETE CASCADE,
  stage workflow_stage NOT NULL DEFAULT 'DRAFT',
  assigned_to TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_workflow_states_content_piece_id ON workflow_states(content_piece_id);
CREATE INDEX idx_workflow_states_stage ON workflow_states(stage);

-- ─────────────────────────────────────────────────────────────
-- TABLE: platform_configs
-- Per-platform settings and voice rules
-- ─────────────────────────────────────────────────────────────

CREATE TABLE platform_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform platform NOT NULL UNIQUE,
  account_handle TEXT,
  posting_schedule JSONB DEFAULT '{}',
  voice_rules_json JSONB DEFAULT '{}',
  api_credentials JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- TABLE: content_calendar
-- Calendar view of scheduled posts (denormalized for convenience)
-- ─────────────────────────────────────────────────────────────

CREATE TABLE content_calendar (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_piece_id UUID NOT NULL REFERENCES content_pieces(id) ON DELETE CASCADE,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME,
  timezone TEXT DEFAULT 'America/New_York',
  platform platform NOT NULL,
  skeleton skeleton_name NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- One entry per content piece per day
  UNIQUE(content_piece_id, scheduled_date)
);

CREATE INDEX idx_content_calendar_scheduled_date ON content_calendar(scheduled_date);
CREATE INDEX idx_content_calendar_platform ON content_calendar(platform);

-- ─────────────────────────────────────────────────────────────
-- TABLE: pipeline_metrics
-- Daily/weekly stats for content pipeline
-- ─────────────────────────────────────────────────────────────

CREATE TABLE pipeline_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  platform platform NOT NULL,
  posts_published INTEGER DEFAULT 0,
  engagement_estimates JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(date, platform)
);

CREATE INDEX idx_pipeline_metrics_date ON pipeline_metrics(date);
CREATE INDEX idx_pipeline_metrics_platform ON pipeline_metrics(platform);

-- ─────────────────────────────────────────────────────────────
-- UPDATED_AT trigger function
-- ─────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER ideas_updated_at
  BEFORE UPDATE ON ideas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER content_pieces_updated_at
  BEFORE UPDATE ON content_pieces
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER scheduled_posts_updated_at
  BEFORE UPDATE ON scheduled_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER workflow_states_updated_at
  BEFORE UPDATE ON workflow_states
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER platform_configs_updated_at
  BEFORE UPDATE ON platform_configs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────────────────────────

ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_pieces ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline_metrics ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables (adjust for your auth strategy)
CREATE POLICY "Allow public read" ON ideas FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON ideas FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON ideas FOR UPDATE USING (true);

CREATE POLICY "Allow public read" ON content_pieces FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON content_pieces FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON content_pieces FOR UPDATE USING (true);

CREATE POLICY "Allow public read" ON assets FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON assets FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON assets FOR UPDATE USING (true);

CREATE POLICY "Allow public read" ON scheduled_posts FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON scheduled_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON scheduled_posts FOR UPDATE USING (true);

CREATE POLICY "Allow public read" ON workflow_states FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON workflow_states FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON workflow_states FOR UPDATE USING (true);

CREATE POLICY "Allow public read" ON platform_configs FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON platform_configs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON platform_configs FOR UPDATE USING (true);

CREATE POLICY "Allow public read" ON content_calendar FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON content_calendar FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON content_calendar FOR UPDATE USING (true);

CREATE POLICY "Allow public read" ON pipeline_metrics FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON pipeline_metrics FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON pipeline_metrics FOR UPDATE USING (true);

-- ─────────────────────────────────────────────────────────────
-- SEED: Default platform configs
-- ─────────────────────────────────────────────────────────────

INSERT INTO platform_configs (platform, account_handle, posting_schedule, voice_rules_json) VALUES
  ('LINKEDIN', NULL, '{"best_times": ["08:00", "09:00"], "days": ["Tuesday", "Wednesday", "Thursday"]}'::jsonb, '{}'),
  ('TWITTER', NULL, '{"best_times": ["08:00", "09:00", "17:00", "18:00"], "days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}'::jsonb, '{}'),
  ('REDDIT', NULL, '{"best_times": ["07:00", "08:00", "09:00"], "days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}'::jsonb, '{}'),
  ('INSTAGRAM', NULL, '{"best_times": ["11:00", "12:00", "13:00", "19:00", "20:00", "21:00"], "days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]}'::jsonb, '{}');
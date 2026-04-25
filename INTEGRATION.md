# Content Production System Integration Guide

This guide covers how to set up and connect all components of the multi-platform content production system.

---

## Section 1: Supabase Setup

### 1.1 Run the Migration

1. Navigate to your Supabase project dashboard
2. Go to **SQL Editor** in the left sidebar
3. Create a new query and paste the contents of `supabase/migrations/001_initial_schema.sql`
4. Click **Run** to execute the migration
5. Verify tables were created: `ideas`, `content_pieces`, `assets`, `scheduled_posts`, `workflow_states`, `platform_configs`, `content_calendar`, `pipeline_metrics`

### 1.2 Get Your Service Role Key

1. Go to **Settings** > **API** in Supabase dashboard
2. Find the `service_role` key under "Service Role Key"
3. Copy this key (never expose it client-side)
4. Add to your environment variables as `SUPABASE_SERVICE_ROLE_KEY`

### 1.3 Configure Row Level Security (RLS)

For production, configure RLS policies to protect your data:

```sql
-- Enable RLS on tables
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_pieces ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_posts ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated content creation
CREATE POLICY "Authenticated users can insert ideas"
  ON ideas FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view own content"
  ON content_pieces FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Service role can do everything"
  ON content_pieces FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
```

### 1.4 Supabase Connection String

```
PostgreSQL: postgresql://postgres.[project-id]:[password]@db.[project-id].supabase.co:5432/postgres
```

---

## Section 2: MiniMax API Setup

### 2.1 Get Your MiniMax API Key

1. Log into your MiniMax account at https://api.minimax.chat
2. Navigate to **Dashboard** > **API Keys**
3. Create a new API key or use an existing one
4. Copy the key and store securely

### 2.2 Rate Limits (10x Starter Plan)

| Capability | Rate Limit | Notes |
|------------|------------|-------|
| Text Generation | 100 requests/min | ~50-100 posts/day |
| Image Generation | 20 requests/min | ~50 images/batch |
| Video Generation | 5 requests/min | 6-10s clips |
| Speech Synthesis | 20 requests/min | Voiceover generation |
| Music Generation | 5 requests/min | Background tracks |
| Vision Analysis | 10 requests/min | Competitor screenshots |
| Web Search | 20 requests/min | Intelligence gathering |

### 2.3 Voice Cloning Setup

1. Record a 10-second audio sample of your voice
2. Upload to MiniMax via `POST /v1/speech/voice_clone`
3. Receive a `voice_id` for use in all future TTS calls
4. Example:
```bash
curl -X POST https://api.minimax.chat/v1/speech/voice_clone \
  -H "Authorization: Bearer {{ API_KEY }}" \
  -F "audio=@your_voice_sample.mp3" \
  -F "name=MyVoice"
```

---

## Section 3: n8n Setup

### 3.1 Import Workflow JSON Files

1. Open your n8n instance (self-hosted or cloud)
2. Click **Workflows** > **Import from File**
3. Select each JSON file from `n8n/workflows/`
4. Configure credentials as described below

### 3.2 Required Environment Variables

Configure these in n8n **Settings** > **Variables**:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
MINIMAX_API_KEY=your_minimax_api_key_here
REMOTION_LICENSE_KEY=your_remotion_license_key_here
N8N_WEBHOOK_URL=https://your-n8n-instance/webhook
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx/yyy/zzz
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
```

### 3.3 Configure Webhook URLs

For each workflow, n8n generates a webhook URL:

1. **weekly-content-batch**: `https://your-n8n/webhook/weekly-content-batch`
2. **content-publishing**: `https://your-n8n/webhook/content-publishing`
3. **content-intelligence**: `https://your-n8n/webhook/content-intelligence`
4. **distribution-agent**: `https://your-n8n/webhook/distribution-agent`

Configure these in your Next.js API routes to trigger workflows externally.

### 3.4 Testing Workflows

1. Open each workflow in n8n
2. Click **Test Workflow** to run with sample data
3. Check execution logs for any errors
4. Verify Supabase records are created
5. For scheduled triggers, click **Execute Workflow** to test manually

---

## Section 4: Remotion Setup

### 4.1 Install Remotion

```bash
npm install @remotion/cli @remotion/bundle
```

### 4.2 Create Video Templates

Create templates in `src/remotion/templates/`:

```tsx
// ReelTemplate.tsx
import { AbsoluteFill, Sequence, useVideoConfig } from 'remotion';

export const ReelTemplate: React.FC<{
  hook: string;
  points: string[];
  cta: string;
  voiceoverUrl: string;
  backgroundClip: string;
  musicUrl: string;
}> = ({ hook, points, cta }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a2e' }}>
      <Sequence name="Hook" from={0} durationInFrames={60}>
        <div style={{ fontSize: 48, color: 'white', textAlign: 'center' }}>
          {hook}
        </div>
      </Sequence>
      <Sequence name="Points" from={60}>
        {points.map((point, i) => (
          <div key={i} style={{ fontSize: 36, color: 'white' }}>
            {point}
          </div>
        ))}
      </Sequence>
      <Sequence name="CTA" from={240}>
        <div style={{ fontSize: 40, color: '#e94560' }}>{cta}</div>
      </Sequence>
    </AbsoluteFill>
  );
};
```

### 4.3 Render Videos via API

Create an API route at `src/app/api/remotion/render/route.ts`:

```typescript
import { renderAsync } from '@remotion/renderer';

export async function POST(request: Request) {
  const { template_id, data, output_format } = await request.json();

  const inputProps = {
    hook: data.hook,
    points: data.points,
    cta: data.cta,
    voiceoverUrl: data.voiceover_audio,
    backgroundClip: data.background_clips[0],
    musicUrl: data.music,
  };

  const outputDir = `/tmp/remotion/${template_id}-${Date.now()}`;

  await renderAsync({
    composition: template_id,
    inputProps,
    outputDir,
    output: output_format || 'mp4',
  });

  return Response.json({
    status: 'complete',
    video_url: `${outputDir}/out.mp4`,
  });
}
```

### 4.4 Remotion License

Obtain a license from https://www.remotion.dev and set:
```
REMOTION_LICENSE_KEY=your_license_key
```

---

## Section 5: Platform API Setup

### 5.1 LinkedIn

#### Create OAuth App

1. Go to https://developer.linkedin.com/
2. Create a new app
3. Configure OAuth 2.0 settings:
   - Authorized redirect URL: `https://your-app.com/api/auth/linkedin/callback`
   - Scopes: `openid`, `profile`, `email`, `w_member_social`, `w_organization_social`

#### Get Access Token

1. Implement OAuth flow to get authorization code
2. Exchange code for access token
3. Store refresh token securely
4. Token expires in 60 days - implement refresh logic

#### Required Permissions

- `w_member_social`: Post content on behalf of users
- `w_organization_social`: Manage organization pages

### 5.2 Twitter/X

#### Create Developer App

1. Go to https://developer.twitter.com/
2. Create a project and app
3. Enable OAuth 2.0
4. Configure callback URL: `https://your-app.com/api/auth/twitter/callback`

#### Scopes Required

- `tweet.read`: Read tweets and metrics
- `tweet.write`: Post tweets and replies
- `offline.access`: Refresh tokens for long-term access

#### OAuth 2.0 Flow

```typescript
const twitterAuthUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${TWITTER_API_KEY}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=tweet.read+tweet.write+offline.access`;
```

### 5.3 Instagram (Basic Display API)

#### Create Facebook Developer App

1. Go to https://developers.facebook.com/
2. Create a new app > Consumer
3. Add Instagram Basic Display product
4. Configure OAuth redirect: `https://your-app.com/api/auth/instagram/callback`

#### Get Long-Lived Token

Instagram Basic Display tokens expire in 60 minutes. Exchange for long-lived token (60 days):

```
GET https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id={{ APP_ID }}&client_secret={{ APP_SECRET }}&fb_exchange_token={{ SHORT_LIVED_TOKEN }}
```

#### Required Permissions

- `instagram_basic`: View insights and manage content
- `instagram_content_publish`: Publish media
- `pages_read_engagement`: Access page data

### 5.4 Reddit

#### Create Reddit App

1. Go to https://www.reddit.com/prefs/apps
2. Create a new app > Script
3. Set redirect URI: `https://your-app.com/api/auth/reddit/callback`

#### PRAW Setup

```python
import praw

reddit = praw.Reddit(
    client_id=REDDIT_CLIENT_ID,
    client_secret=REDDIT_CLIENT_SECRET,
    user_agent="ContentProductionBot/1.0 (by u/your_username)",
    redirect_uri="https://your-app.com/api/auth/reddit/callback"
)

# Get authorization URL
print(reddit.auth.url(["submit", "read", "vote"], "unique_state", "permanent"))
```

#### Required Scopes

- `submit`: Post content
- `read`: View posts and comments
- `identity`: Access your account

---

## Section 6: Environment Variables Reference

All required environment variables for the content production system:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# MiniMax
MINIMAX_API_KEY=your_minimax_api_key_here

# Remotion
REMOTION_LICENSE_KEY=your_remotion_license_key_here

# LinkedIn OAuth
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret

# Twitter/X OAuth 2.0
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret

# Instagram Basic Display
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token

# Reddit (PRAW)
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret

# n8n Webhooks
N8N_WEBHOOK_URL=https://your-n8n-instance/webhook
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx/yyy/zzz
```

---

## Quick Start Checklist

- [ ] Supabase project created and migration run
- [ ] Service role key obtained and stored securely
- [ ] MiniMax API key obtained
- [ ] n8n imported and environment variables configured
- [ ] Remotion installed and templates created
- [ ] LinkedIn OAuth app created
- [ ] Twitter developer account set up
- [ ] Instagram Facebook app configured
- [ ] Reddit app created with PRAW credentials
- [ ] Slack webhook created for notifications
- [ ] All workflows tested end-to-end
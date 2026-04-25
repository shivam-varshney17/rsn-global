# n8n Nodes Reference

This document describes the custom and configured n8n nodes used in the content production workflows.

---

## Supabase Node

The Supabase node (`n8n-nodes-supabase`) is a native n8n integration for connecting to Supabase databases.

### Connection Setup

1. In n8n, go to **Credentials** > **Supabase API**
2. Configure with:
   - **Account URL**: Your Supabase project URL (e.g., `https://xxxxx.supabase.co`)
   - **Service Role Key**: Found in Supabase Dashboard > Settings > API

### Supported Operations

#### Insert

```json
{
  "operation": "insert",
  "table": "assets",
  "columns": {
    "assignments": [
      { "column": "content_piece_id", "value": "{{ $json.content_piece_id }}" },
      { "column": "type", "value": "IMAGE" },
      { "column": "url", "value": "{{ $json.asset_url }}" },
      { "column": "metadata", "value": "{{ $json.asset_metadata }}" }
    ]
  }
}
```

#### Select

```json
{
  "operation": "select",
  "table": "scheduled_posts",
  "columns": ["*"],
  "filter": "status = 'PENDING' AND scheduled_for <= now()"
}
```

#### Update

```json
{
  "operation": "update",
  "table": "scheduled_posts",
  "filter": "id = '{{ $json.scheduled_post_id }}'",
  "columns": {
    "assignments": [
      { "column": "status", "value": "PUBLISHED" },
      { "column": "published_at", "value": "=now()" }
    ]
  }
}
```

### RLS Policy Requirements

For service role key operations, RLS is bypassed. For anon key operations, ensure policies allow:
- `assets`: INSERT for authenticated users
- `content_pieces`: SELECT, INSERT for authenticated users
- `scheduled_posts`: SELECT, UPDATE for authenticated users
- `ideas`: SELECT, INSERT for authenticated users

---

## MiniMax Node (HTTP Request)

MiniMax API calls are made via the HTTP Request node configured with Bearer token authentication.

### Text Generation

```json
{
  "method": "POST",
  "url": "https://api.minimax.chat/v1/text/chatcompletion_v2",
  "authentication": "genericCredentialType",
  "genericAuthType": "bearerAuth",
  "headers": {
    "Authorization": "Bearer {{$env.MINIMAX_API_KEY}}"
  },
  "body": {
    "model": "MiniMax-Text-01",
    "messages": [
      { "role": "system", "content": "System prompt here" },
      { "role": "user", "content": "User prompt here" }
    ]
  }
}
```

### Image Generation

```json
{
  "method": "POST",
  "url": "https://api.minimax.chat/v1/image",
  "body": {
    "model": "image-01",
    "prompt": "Your image prompt",
    "aspect_ratio": "3:4"
  }
}
```

### Video Generation (Hailuo 2.3)

```json
{
  "method": "POST",
  "url": "https://api.minimax.chat/v1/video/hailuo",
  "body": {
    "model": "MiniMax-Hailuo-2.3",
    "prompt": "Your video prompt"
  }
}
```

### Speech Synthesis (TTS)

```json
{
  "method": "POST",
  "url": "https://api.minimax.chat/v1/speech/t2a",
  "body": {
    "model": "speech-02",
    "text": "Your voiceover text",
    "voice": "adult_female_bright"
  }
}
```

### Music Generation

```json
{
  "method": "POST",
  "url": "https://api.minimax.chat/v1/music",
  "body": {
    "model": "music-02",
    "prompt": "Your music prompt",
    "instrumental": true,
    "bpm": 110,
    "mood": "confident, modern"
  }
}
```

### Vision Analysis

```json
{
  "method": "POST",
  "url": "https://api.minimax.chat/v1/vision",
  "body": {
    "model": "vision-01",
    "messages": [
      { "role": "user", "content": [{ "type": "image_url", "url": "{{ $json.screenshot_url }}" }] },
      { "role": "user", "content": "Analyze this content" }
    ]
  }
}
```

### Auth: Bearer Token

Configure a generic credential with:
- **Name**: MiniMax API
- **Type**: Bearer Authentication
- **Token**: Your MiniMax API key

---

## Remotion Node (Webhook + HTTP Request)

Remotion rendering is triggered via HTTP Request to the Remotion render endpoint.

### Render Trigger

```json
{
  "method": "POST",
  "url": "={{ $env.N8N_WEBHOOK_URL }}/remotion/render",
  "body": {
    "template_id": "{{ $json.template_id }}",
    "data": {
      "hook": "Your hook text",
      "points": ["Point 1", "Point 2", "Point 3"],
      "cta": "Comment KEYWORD for access",
      "voiceover_audio": "{{ $json.voiceover_url }}",
      "background_clips": ["{{ $json.clip1_url }}", "{{ $json.clip2_url }}"],
      "music": "{{ $json.music_url }}",
      "brand_colors": {
        "primary": "#1a1a2e",
        "accent": "#e94560"
      }
    },
    "output_format": "mp4"
  },
  "options": {
    "timeout": 180000
  }
}
```

### Response Handling

The Remotion render endpoint returns:
```json
{
  "render_id": "abc123",
  "status": "processing",
  "video_url": null
}
```

Poll for completion or use webhook callback.

---

## Platform API Nodes

### LinkedIn API

**Base URL**: `https://api.linkedin.com/v2`

**Authentication**: OAuth 2.0

#### Share Post

```
POST https://api.linkedin.com/v2/ugcPosts
Headers:
  Authorization: Bearer {{ access_token }}
  X-Restli-Protocol-Version: 2.0.0
Body:
{
  "author": "urn:li:person:{{ person_id }}",
  "lifecycleState": "PUBLISHED",
  "specificContent": {
    "com.linkedin.ugc.ShareContent": {
      "shareCommentary": { "text": "{{ final_text }}" },
      "shareMediaCategory": "IMAGE",
      "media": [{ "status": "READY", "originalUrl": "{{ image_url }}" }]
    }
  },
  "visibility": {
    "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
  }
}
```

#### Get Metrics

```
GET https://api.linkedin.com/v2/organizationalEntityFollowerStatistics?q=organizationalEntity&organizationalEntity=urn:li:organization:{{ company_id }}
```

**Required Scopes**: `w_organization_social`, `r_organizationsocial`

---

### Twitter/X API

**Base URL**: `https://api.twitter.com/2`

**Authentication**: OAuth 2.0

#### Tweet

```
POST https://api.twitter.com/2/tweets
Headers:
  Authorization: Bearer {{ access_token }}
Body:
{
  "text": "{{ final_text }}"
}
```

#### Reply

```
POST https://api.twitter.com/2/tweets/{{ tweet_id }}/reply
Body:
{
  "text": "{{ reply_text }}",
  "reply": { "in_reply_to_tweet_id": "{{ tweet_id }}" }
}
```

#### Get Tweet Metrics

```
GET https://api.twitter.com/2/tweets/{{ tweet_id }}/metrics
```

**Required Scopes**: `tweet.read`, `tweet.write`, `offline.access`

---

### Instagram API (Basic Display API)

**Base URL**: `https://graph.facebook.com/v18.0`

**Authentication**: OAuth 2.0 with Instagram token

#### Post Image

```
POST https://graph.facebook.com/v18.0/{{ instagram_account_id }}/media
Body:
{
  "image_url": "{{ image_url }}",
  "caption": "{{ caption_text }}"
}
```

#### Publish Media

```
POST https://graph.facebook.com/v18.0/{{ instagram_account_id }}/media_publish
Body:
{
  "creation_id": "{{ creation_id }}"
}
```

#### Get Media Insights

```
GET https://graph.facebook.com/v18.0/{{ media_id }}/insights
```

**Required Permissions**: `instagram_basic`, `instagram_content_publish`, `pages_read_engagement`

---

### Reddit API (PRAW)

**Base URL**: `https://oauth.reddit.com`

**Authentication**: OAuth 2.0 via PRAW library

#### Submit Post

```
POST https://oauth.reddit.com/api/submit
Headers:
  Authorization: Bearer {{ access_token }}
Body:
{
  "title": "{{ title }}",
  "text": "{{ text }}",
  "sr": "{{ subreddit }}",
  "kind": "self"
}
```

#### Get Post Metrics

```
GET https://www.reddit.com/r/{{ subreddit }}/comments/{{ post_id }}.json
```

**Required Scopes**: `submit`, `read`, `vote`

**PRAW Configuration**:
```python
import praw

reddit = praw.Reddit(
    client_id="{{ client_id }}",
    client_secret="{{ client_secret }}",
    user_agent="ContentProductionBot/1.0",
    refresh_token="{{ refresh_token }}"
)
```

---

## n8n Workflow Variables

These environment variables must be configured in n8n:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key for database operations |
| `MINIMAX_API_KEY` | Your MiniMax API key |
| `REMOTION_LICENSE_KEY` | Your Remotion license key |
| `N8N_WEBHOOK_URL` | Your n8n webhook base URL |
| `SLACK_WEBHOOK_URL` | Your Slack incoming webhook URL |
| `LINKEDIN_CLIENT_ID` | LinkedIn OAuth client ID |
| `LINKEDIN_CLIENT_SECRET` | LinkedIn OAuth client secret |
| `TWITTER_API_KEY` | Twitter developer API key |
| `TWITTER_API_SECRET` | Twitter developer API secret |
| `INSTAGRAM_ACCESS_TOKEN` | Instagram long-lived access token |
| `REDDIT_CLIENT_ID` | Reddit OAuth client ID |
| `REDDIT_CLIENT_SECRET` | Reddit OAuth client secret |

---

## Workflow Templates Summary

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `weekly-content-batch.json` | Sunday 6 PM | Generate weekly batch content |
| `content-publishing.json` | Every 15 min | Auto-publish scheduled posts |
| `content-intelligence.json` | Daily 9 AM | Monitor competitors, generate briefs |
| `distribution-agent.json` | Every hour | Engagement tracking and reply |
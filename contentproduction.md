# Content Production Engine — MiniMax + Remotion + Full Media Stack

*Companion to the Multi-Platform Content System. This document covers the production infrastructure — how content actually gets made, rendered, and distributed at scale.*

---

## WHAT THIS DOCUMENT IS

The Multi-Platform Content System tells you WHAT to post, WHERE, and in WHAT format.

This document tells you HOW to produce it — the actual machines, APIs, and pipelines that turn one idea into finished assets across text, image, video, audio, and music.

**The stack:**
- **MiniMax M2.7** — bulk text generation, image generation, video generation, speech synthesis, music creation, vision analysis, web search
- **Remotion** — programmatic video editing pipeline (React-based, template-driven, batch-capable)
- **Claude** — orchestration brain, prompt engineering, strategy, quality control (MiniMax does NOT code — Claude handles all orchestration logic)
- **n8n** — workflow automation connecting everything together

---

# SECTION 1 — MINIMAX M2.7: THE MEDIA ENGINE

---

## 1.1 Your Plan Specs

```
Model: MiniMax-M2.7
Speed: ~50 TPS normal, 100 TPS off-peak
Plan: 10x Starter (10× the 5-hour usage quota)
Agent support: 2-3 OpenClaw agents
Access: Image understanding, web search MCP, image/speech/music/video generation
```

**What this means in practice:** You have enough quota to run 2-3 automated content agents that generate text, images, speech, music, and video — all from the same API. The 10x Starter plan gives you headroom for daily batch content production across all platforms.

---

## 1.2 MiniMax Capabilities Map (Everything Except Coding)

MiniMax is NOT your coding model. It's your bulk content factory. Here's every capability mapped to your content system:

### Text Generation (M2.7)

| Capability | Content system use | How to call |
|---|---|---|
| Multi-turn chat | Generate platform-native post variations from a single core idea | `mmx text chat --message "[prompt]"` or API |
| System prompts | Load Aryan voice rules + platform-specific tone as system prompt | `--system "You write in Aryan's voice..."` |
| JSON output mode | Structured content batches — 7 posts at once with metadata | `--output json` |
| 197K context window | Feed entire content system master doc as context for consistent voice | Full master doc fits in one call |
| Streaming output | Real-time content preview during generation | `--stream` flag |

**Bulk text workflow:**
1. Feed MiniMax the Aryan Content System Master Doc + platform voice rules as system prompt
2. Give it a core idea + target skeleton + target platform
3. It generates the platform-native version
4. Repeat for each platform — LinkedIn, Twitter, Reddit, Instagram caption
5. One idea → 4 finished posts in under 2 minutes

**Daily text quota estimate:** At 10x Starter, you can comfortably generate 50-100 full posts per day across all platforms. More than enough for weekly batching.

---

### Image Generation

| Capability | Content system use | How to call |
|---|---|---|
| Text-to-image | Social media graphics, carousel slide backgrounds, post thumbnails | `mmx image "prompt" --aspect-ratio 9:16` |
| Subject reference | Consistent brand character/mascot across all generated images | `--subject-ref reference_image.jpg` |
| Batch generation | Multiple variations in one call | `--n 4` (up to 4 per call) |
| Custom aspect ratios | Platform-native dimensions (1:1 IG feed, 9:16 Reels/Stories, 4:5 IG carousel) | `--aspect-ratio` flag |

**Image generation use cases for your content system:**

| Content type | Image spec | MiniMax prompt pattern |
|---|---|---|
| LinkedIn carousel backgrounds | 1080×1350, clean, branded | "Professional dark background with subtle grid pattern, tech aesthetic, no text" |
| Instagram carousel slides | 1080×1350, bold, visual | "Bold gradient background [brand colors], minimalist, space for text overlay" |
| Twitter post images | 1200×675, screenshot-style | "Clean UI mockup showing [tool dashboard/workflow], dark mode" |
| Instagram Reel thumbnails | 1080×1920, eye-catching | "Vertical thumbnail, bold text overlay space, [topic] visual metaphor" |
| Blog/article hero images | 1200×630, professional | "Wide format tech illustration, [topic], editorial style" |
| Profile/brand assets | Various | Use `--subject-ref` for consistent brand elements across all generated images |

**Subject reference for brand consistency:**
Upload one reference image of your brand character, logo treatment, or visual style. MiniMax preserves the subject's characteristics across all future generations. This means every carousel, every thumbnail, every social graphic looks like it came from the same brand — without a designer.

---

### Video Generation (Hailuo 2.3)

| Capability | Content system use | How to call |
|---|---|---|
| Text-to-video | Short social clips, B-roll for Reels, visual hooks | `mmx video generate --prompt "..."` |
| Hailuo 2.3 standard | 768P, 6s or 10s clips | Default model |
| Hailuo 2.3 Fast | Faster generation, same quality tier | `--model MiniMax-Hailuo-2.3-Fast` |
| 1080P option | Higher resolution for polished output | Resolution flag |

**Video generation use cases:**

| Content type | Spec | Use |
|---|---|---|
| Instagram Reel B-roll | 9:16, 6-10s | Background visuals behind text overlays or voiceover |
| Twitter video posts | 16:9, 6s | Eye-catching clips to stop the scroll |
| LinkedIn video thumbnails | 16:9, 6s | Animated preview that auto-plays in feed |
| YouTube Shorts B-roll | 9:16, 10s | Supporting visuals for talking head content |
| Ad creative variations | Various, 6-10s | A/B test different visual hooks at near-zero cost |

**Important limitation:** MiniMax video generation creates short clips (6-10 seconds), not full-length videos. For longer content, these clips feed into the Remotion pipeline as B-roll components (see Section 2).

---

### Speech Synthesis (TTS)

| Capability | Content system use | How to call |
|---|---|---|
| 100+ system voices | Voiceovers for Reels, tutorials, narrated carousels | `mmx speech synthesize --text "..." --out audio.mp3` |
| Voice cloning | Clone your own voice from a 10-second sample | Upload reference audio via API |
| Voice design | Create custom voices from text descriptions | `mmx speech design --description "warm male baritone, confident, slightly fast"` |
| 40 languages | Multi-language content for international audiences | Language parameter |
| Emotional control | 7 emotional registers (neutral, happy, sad, angry, fearful, disgusted, surprised) | Emotional tags in prompt |
| Long-form async | Up to 1M characters per request (full audiobooks) | Async API endpoint |
| Pitch/speed/volume control | Fine-tune delivery for each platform's vibe | Modifier parameters |

**Speech production workflow for content:**

1. **Instagram Reels voiceover:** Generate narration for carousel slide content → overlay on video in Remotion
2. **Twitter video posts:** Short, punchy voiceover (10-30 sec) for tool demos or hot takes
3. **Podcast clips:** Generate intro/outro music + narrated highlights from long-form content
4. **YouTube Shorts:** Full voiceover for educational short-form content
5. **Audiograms:** Turn text posts into audio snippets with waveform visualization (Remotion renders the visual)

**Voice cloning strategy:** Clone your own voice once. Use it for ALL voiceover content. Every Reel, every video post, every narrated carousel — sounds like you, produced in seconds, not hours in a recording studio.

---

### Music Generation (Music 2.5 / 2.6)

| Capability | Content system use | How to call |
|---|---|---|
| Text-to-music | Background music for Reels, videos, intros | `mmx music generate --prompt "..." --lyrics "[verse]..."` |
| Genre/mood/tempo control | Match music to content vibe per platform | `--genre "lo-fi" --mood "focused" --tempo "slow"` |
| Vocals or instrumental | Instrumental for background, vocals for branded jingles | `--instrumental` flag |
| BPM/key control | Precise timing for video sync | `--bpm 120 --key "C minor"` |
| Cover generation (Music 2.6) | Upload a song → restyle completely | Upload + restyle prompt |
| Structure tags | [Verse], [Chorus], [Bridge] for compositional control | In lyrics/prompt |
| AIGC watermark | AI-generated content marking for compliance | `--aigc-watermark` flag |

**Music production use cases:**

| Content type | Music spec | Prompt pattern |
|---|---|---|
| Instagram Reel background | 15-30s, trending vibe, instrumental | "Upbeat electronic, lo-fi percussion, confident energy, 120 BPM" |
| YouTube intro/outro | 5-10s, branded jingle | "Short tech startup jingle, synth, clean, professional, 3 seconds" |
| Podcast intro | 15-30s, mood-setting | "Warm acoustic intro, building energy, podcast vibe, fade out at 20s" |
| Twitter video background | 10-15s, subtle | "Minimal ambient, tech feel, quiet, not distracting, 90 BPM" |
| Spotify automation | Full tracks, 2-4 min | See Section 4 below |

---

### Vision (Image Understanding)

| Capability | Content system use | How to call |
|---|---|---|
| Image analysis | Analyze competitor content, extract text from screenshots | `mmx vision image.jpg --prompt "What makes this post engaging?"` |
| URL-based analysis | Analyze any image from the web | `mmx vision --url "https://..."` |

**Competitive intelligence use:** Feed MiniMax screenshots of competitor posts that went viral. Ask it to analyze the hook structure, visual hierarchy, and engagement mechanics. Then use that analysis to inform your own content strategy.

---

### Web Search

| Capability | Content system use | How to call |
|---|---|---|
| Real-time search | Research trending topics, verify stats, find current data | `mmx search "topic"` |
| JSON output | Structured results for automated pipelines | `--output json` |

**Content research workflow:** Before generating any post, run a search for the latest data points on your topic. Feed the results into the text generation prompt so your content always cites current, verifiable numbers.

---

## 1.3 MiniMax Content Batch Workflow

Here's how to produce a full week of content in one sitting:

```
WEEKLY BATCH (Sunday evening or Monday morning)

Step 1: Define 4 core ideas for the week
  → Each idea maps to 1 skeleton from the master system

Step 2: For each idea, run MiniMax text generation:
  → LinkedIn version (full skeleton, Aryan voice)
  → Twitter version (compressed, native Twitter voice)
  → Reddit version (stripped voice, technical depth)
  → Instagram caption (under 2,200 chars, hook-first)
  → Total: 16 text posts generated in ~10 minutes

Step 3: For each idea, run MiniMax image generation:
  → Instagram carousel slides (7-10 images per carousel, 4 carousels = 28-40 images)
  → Twitter post images (1 per post, 4 images)
  → LinkedIn carousel backgrounds (if doing PDF carousel, 9-12 per carousel)
  → Total: ~50 images generated in ~15 minutes

Step 4: For each idea that needs video:
  → Generate 2-3 short video clips per Reel concept (6-10s each)
  → Generate voiceover audio for each Reel
  → Generate background music for each Reel
  → Total: ~10-15 video clips + audio in ~20 minutes

Step 5: Assemble in Remotion (see Section 2)
  → Combine clips + voiceover + music + captions into finished Reels
  → Render carousel PDFs
  → Export all assets to platform-ready formats

Total batch time: ~2-3 hours for a full week of multi-platform content
```

---

## 1.4 What MiniMax Does NOT Do (And What Handles It Instead)

| Task | DON'T use MiniMax | USE instead |
|---|---|---|
| Coding / scripting | Bad at coding — confirmed | Claude (orchestration), Claude Code (automation scripts) |
| Complex strategy | Decent but not deep enough | Claude Opus (strategic planning, skeleton selection) |
| Video editing / assembly | Generates clips only | Remotion (assembly, rendering, templates) |
| Workflow automation | No native automation | n8n (connects all APIs together) |
| Quality control / editing | Can draft but needs review | Claude (final pass on voice consistency, hook quality) |
| Long-form writing (10K+ words) | Can do but quality drops | Claude (maintains voice over long content) |

**The rule:** MiniMax is your factory. Claude is your quality control. Remotion is your video assembly line. n8n is your conveyor belt.

---

# SECTION 2 — REMOTION: THE VIDEO PIPELINE

---

## 2.1 What Remotion Is (And Isn't)

**Remotion IS:** A React framework that turns code into videos. You define templates as React components, feed them data (text, images, audio, timing), and Remotion renders finished MP4/WebM files. It's deterministic, branded, and batch-capable.

**Remotion IS NOT:** A traditional video editor. You don't upload a video and drag clips around. You build templates that assemble content programmatically.

**Why this matters for your content system:** You don't need to manually edit 20 videos per week. You build 5-6 Remotion templates once, then feed them new data every week. The templates handle all the animation, timing, branding, and rendering automatically.

---

## 2.2 The Content Template Library

Build these templates once. Reuse them forever.

### Template 1: Instagram Reel — Talking Points

**What it produces:** A 30-60 second vertical video (1080×1920) with:
- Background B-roll (MiniMax-generated video clips)
- Text overlays that animate in/out (your post content, reformatted as 3-5 word phrases)
- TikTok-style captions synced to voiceover
- Background music (MiniMax-generated)
- Branded intro (1-2 sec) and outro (3 sec with CTA)

**Data input:**
```json
{
  "hook": "We replaced our $200K SDR team.",
  "points": ["Claude + n8n + Apollo", "Setup: 3 hours", "Runs 24/7", "$340K pipeline in 90 days"],
  "cta": "Comment SDR for the workflow",
  "voiceover_audio": "path/to/voiceover.mp3",
  "background_clips": ["clip1.mp4", "clip2.mp4"],
  "music": "path/to/background.mp3",
  "brand_colors": { "primary": "#1a1a2e", "accent": "#e94560" }
}
```

**Render time:** ~30-90 seconds per video on a modern machine.

---

### Template 2: Carousel Video (LinkedIn + Instagram)

**What it produces:** An animated carousel where each "slide" transitions smoothly — like a video version of your PDF carousel. 30-60 seconds total.

- Each slide animates in with spring physics
- Text fades/slides per element
- Branded color scheme throughout
- Optional voiceover narration per slide
- Exports as MP4 (for video posts) or individual PNGs (for image carousels)

**Data input:**
```json
{
  "slides": [
    { "headline": "We fired our marketing team.", "body": "", "type": "hook" },
    { "headline": "The problem:", "body": "→ $15K/month agencies\n→ 3-week turnaround\n→ Generic copy", "type": "problem" },
    { "headline": "The solution:", "body": "One AI system. 47 seconds.", "type": "solution" }
  ],
  "brand": { "font": "Inter", "bg": "#0f0f23", "text": "#ffffff", "accent": "#ff6b35" },
  "music": "path/to/subtle-background.mp3"
}
```

---

### Template 3: Tool Demo / Screen Recording Overlay

**What it produces:** A polished screen recording presentation with:
- Animated border/frame around the screen recording
- Zoomed callouts on key areas
- Text annotations that appear at specific timestamps
- Lower-third branding
- Intro/outro with CTA

**Use case:** Showing your n8n workflow, Claude setup, tool dashboard, or any build you're posting about. Upload the raw screen recording → Remotion adds all the polish.

---

### Template 4: Audiogram (for repurposing audio content)

**What it produces:** A vertical video with:
- Waveform visualization synced to audio
- Highlighted captions (word-by-word, TikTok-style)
- Speaker name/topic overlay
- Background image or gradient

**Use case:** Turn any voiceover, podcast clip, or audio insight into a shareable video for Instagram/Twitter/LinkedIn.

---

### Template 5: Stats/Data Visualization

**What it produces:** Animated charts, counters, and data comparisons.

- Animated number counters (e.g., "$0 → $340,000")
- Before/after split screens with animated transitions
- Bar/line charts that draw themselves
- Metric comparison cards

**Use case:** Proof slides for Revenue Proof or Replacement Stack posts. Instead of static screenshots, the numbers animate — which dramatically increases dwell time and saves.

---

### Template 6: Quote Card / Short Raw

**What it produces:** A single animated card with a punchy quote or statement.

- Bold text animation (scale up, fade in, or typewriter effect)
- Subtle background animation (gradient shift, particle effect)
- Branded corner logo
- 5-10 seconds total

**Use case:** Short Raw posts for Instagram (single slide) and Twitter (video post). Also works as Instagram Stories.

---

## 2.3 The Remotion + MiniMax Production Pipeline

Here's how the two systems work together:

```
CONTENT IDEA
    │
    ├── MiniMax Text → Post copy for each platform
    │
    ├── MiniMax Image → Carousel slides, thumbnails, backgrounds
    │
    ├── MiniMax Video → 6-10s B-roll clips
    │
    ├── MiniMax Speech → Voiceover audio (your cloned voice)
    │
    ├── MiniMax Music → Background tracks
    │
    └── All assets feed into ──→ REMOTION TEMPLATES
                                    │
                                    ├── Instagram Reel (MP4, 1080×1920)
                                    ├── Animated Carousel (MP4 or PNG sequence)
                                    ├── Twitter Video Post (MP4, 1280×720)
                                    ├── YouTube Short (MP4, 1080×1920)
                                    ├── Audiogram (MP4, 1080×1080)
                                    └── Quote Card (MP4 or PNG, various)
```

**What Claude does in this pipeline:**
- Selects which skeleton to use for each idea
- Writes the MiniMax prompts (system prompt + content prompt per platform)
- Reviews generated content for voice consistency
- Defines the Remotion data payload (which template, what text, what timing)
- Does NOT write Remotion code (that's built once and reused)

**What n8n does:**
- Triggers the entire pipeline on a schedule (e.g., every Sunday at 6 PM)
- Calls MiniMax APIs in sequence (text → image → video → speech → music)
- Passes outputs to Remotion render
- Moves finished assets to a staging folder or CMS (Airtable)
- Optionally auto-publishes to platforms via their APIs

---

# SECTION 3 — IMAGE GENERATION SYSTEM

---

## 3.1 Brand Image System

Your visual brand needs consistency. Here's how to set it up once and maintain it across all generated images.

### Step 1: Define your visual brand

```
Brand palette: [3 colors — background, primary text, accent]
Typography style: [clean/bold, handwritten/editorial, tech/minimal]
Visual mood: [dark tech, light minimal, warm editorial, cyberpunk, corporate clean]
Recurring elements: [grid patterns, gradient overlays, circuit board motifs, etc.]
Subject reference: [Upload 1 key image for subject consistency]
```

### Step 2: Create prompt templates

**LinkedIn carousel slide background:**
```
"Professional [mood] background, [color] tones, subtle [element] pattern, 
clean space for text overlay, portrait orientation, high contrast edges, 
no text, no people, editorial quality"
```

**Instagram post image:**
```
"Bold [mood] graphic, [accent color] highlights on [background color], 
minimalist composition, strong focal point, [topic] visual metaphor, 
social media ready, square crop"
```

**Twitter header/post image:**
```
"Wide format [mood] illustration, [topic] concept, editorial style, 
landscape orientation, clean composition, [color palette], 
professional tech publication quality"
```

### Step 3: Batch generate

For each week's content batch:
- Generate 4-6 variants per prompt
- Pick the best from each batch
- Use `--subject-ref` for any images needing brand character consistency
- Store approved images in your asset library for reuse

---

# SECTION 4 — SPOTIFY MUSIC AUTOMATION

---

## 4.1 What's Possible

MiniMax Music 2.5/2.6 can generate full tracks — vocals, instruments, structured compositions with verse/chorus/bridge, in any genre, mood, or tempo. Combined with Spotify for Artists (DistroKid, TuneCore, or similar distributor), you can:

1. **Generate lo-fi/ambient study playlists** — instrumental tracks, 2-4 minutes each, batch-produced
2. **Create branded intro/outro music** — short jingles for podcasts, YouTube, Reels
3. **Produce background music libraries** — royalty-free tracks for your own content and clients
4. **Build niche genre playlists** — AI-generated music in specific genres, published under your artist profile

### 4.2 Music Generation Workflow

**For content background music:**
```bash
# Generate an instrumental lo-fi track
mmx music generate \
  --prompt "Lo-fi hip hop instrumental, vinyl crackle, soft piano, jazz chords, chill study vibe" \
  --instrumental \
  --bpm 85 \
  --key "D minor" \
  --mood "relaxed, focused" \
  --genre "lo-fi hip hop"
```

**For a full song with vocals:**
```bash
mmx music generate \
  --prompt "Upbeat indie pop, warm male vocal, acoustic guitar, building energy" \
  --vocals "warm male baritone, slightly breathy, indie feel" \
  --lyrics "[Verse 1] Walking through the morning light / Every step feels almost right / [Chorus] We're building something new / Something only we can do" \
  --bpm 120 \
  --key "G major" \
  --genre "indie pop" \
  --mood "hopeful, energetic"
```

**For Spotify playlist automation:**
1. Define a playlist concept (e.g., "AI-Generated Lo-Fi for Deep Work")
2. Generate 10-15 tracks with consistent mood/genre parameters
3. Upload through DistroKid/TuneCore to Spotify
4. Create a Spotify artist profile for your brand
5. Cross-promote: link playlist in LinkedIn bio, mention in content posts
6. Use generated tracks as background music for ALL your own video content (zero licensing cost)

### 4.3 Music Production Batch

**Weekly music batch (run alongside content batch):**
- 2-3 background tracks for Reels/video content (instrumental, 30-60s)
- 1 full track for Spotify playlist (2-4 min)
- 1 branded jingle/intro update (5-15s)

**Monthly Spotify output:** 4 full tracks → 1 new playlist every 3 months.

---

# SECTION 5 — FULL PRODUCTION ARCHITECTURE

---

## 5.1 System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLAUDE (Orchestration Brain)                 │
│  Strategy · Skeleton selection · Prompt engineering · QC pass    │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│                     n8n (Automation Layer)                       │
│  Scheduling · API calls · File routing · Platform publishing     │
└──────┬──────────┬──────────┬──────────┬──────────┬──────────────┘
       │          │          │          │          │
       ▼          ▼          ▼          ▼          ▼
┌──────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│ MiniMax  │ │MiniMax │ │MiniMax │ │MiniMax │ │MiniMax │
│  Text    │ │ Image  │ │ Video  │ │ Speech │ │ Music  │
│ (M2.7)   │ │        │ │(Hailuo)│ │ (TTS)  │ │(2.5/6) │
└────┬─────┘ └───┬────┘ └───┬────┘ └───┬────┘ └───┬────┘
     │           │          │          │          │
     └───────────┴──────────┴──────────┴──────────┘
                            │
                            ▼
              ┌──────────────────────────┐
              │     REMOTION             │
              │  Template rendering      │
              │  Video assembly          │
              │  Carousel generation     │
              │  Audiogram production    │
              └────────────┬─────────────┘
                           │
                           ▼
              ┌──────────────────────────┐
              │     OUTPUT STAGING       │
              │  (Airtable CMS)          │
              │                          │
              │  Platform-ready assets:  │
              │  → LinkedIn posts + PDFs │
              │  → Twitter posts + media │
              │  → Reddit posts          │
              │  → IG carousels + Reels  │
              │  → YouTube Shorts        │
              │  → Spotify tracks        │
              └────────────┬─────────────┘
                           │
                           ▼
              ┌──────────────────────────┐
              │   PLATFORM PUBLISHING    │
              │  (n8n → platform APIs)   │
              │                          │
              │  → LinkedIn API          │
              │  → Twitter/X API         │
              │  → Instagram API         │
              │  → YouTube API           │
              │  → Spotify (via distro)  │
              │  → Reddit (manual/API)   │
              └──────────────────────────┘
```

---

## 5.2 Role Division: What Each Tool Does

| Tool | Role | What it DOES | What it DOES NOT do |
|---|---|---|---|
| **Claude** | Brain | Strategy, skeleton selection, prompt writing, quality control, orchestration logic | Bulk content generation (too expensive at scale), media generation |
| **MiniMax M2.7** | Factory | Bulk text, images, video clips, voiceovers, music — all media production | Coding, complex strategy, workflow automation, video assembly |
| **Remotion** | Assembly line | Combines all MiniMax outputs into finished video content with templates | Generate content from scratch, replace traditional editing for creative projects |
| **n8n** | Conveyor belt | Connects all APIs, schedules batches, routes files, triggers publishing | Content strategy, quality decisions |
| **Airtable** | Staging warehouse | Stores all generated content, tracks status (draft/reviewed/published), holds CTA keyword tracking | Content generation, media rendering |

---

## 5.3 Weekly Production Schedule

| Day | Time | Action | Tools used |
|---|---|---|---|
| **Sunday** | 6 PM | Define 4 core ideas for the week. Select skeletons. Write MiniMax prompts. | Claude |
| **Sunday** | 7 PM | Run full text batch (16 posts across 4 platforms) | MiniMax Text (M2.7) |
| **Sunday** | 7:30 PM | Run image batch (carousel slides, post images, thumbnails) | MiniMax Image |
| **Sunday** | 8 PM | Run video clip batch (B-roll for Reels, Shorts) | MiniMax Video (Hailuo) |
| **Sunday** | 8:15 PM | Run voiceover batch (narration for Reels) | MiniMax Speech |
| **Sunday** | 8:30 PM | Run music batch (background tracks for videos) | MiniMax Music |
| **Sunday** | 9 PM | Assemble all Reels and video content through Remotion templates | Remotion |
| **Sunday** | 9:30 PM | Quality check all content. Final edits. | Claude |
| **Sunday** | 10 PM | Stage everything in Airtable CMS with publish dates | n8n + Airtable |
| **Mon-Sun** | Scheduled | Auto-publish per cadence (Mon/Wed/Fri/Sun LinkedIn, daily Twitter, etc.) | n8n → Platform APIs |

**Total Sunday production time: ~4 hours for an entire week of content across all platforms.**

---

## 5.4 Cost Estimate

| Component | Monthly cost | Notes |
|---|---|---|
| MiniMax 10x Starter | ~$100/month (annual) | Text + image + video + speech + music |
| Claude (for orchestration/QC) | $20/month (Pro) | Strategy, prompts, review |
| Remotion | Free (individual license) | Commercial license needed for 4+ employees |
| n8n | Free (self-hosted) or $20/month (cloud) | Workflow automation |
| Airtable | Free tier or $20/month | Content staging CMS |
| DistroKid (Spotify) | $22/year | Music distribution |
| **Total** | **~$160-180/month** | Full multi-platform, multi-modal content engine |

**Compare to:** $10,000-15,000/month for a content team or agency doing the same output volume.

---

# SECTION 6 — OPENCLAWAGENTS: YOUR AUTOMATED CONTENT CREW

Your plan supports 2-3 OpenClaw agents. Here's how to deploy them:

---

## Agent 1: Content Intelligence Agent

**Job:** Monitor competitor content across all platforms. Analyze what's working. Feed insights into your content strategy.

**Capabilities used:** MiniMax web search + vision + text

**Workflow:**
1. Daily web search for trending content in your niche
2. Vision analysis on top-performing competitor posts (screenshots)
3. Text generation: structured report on hooks, formats, and engagement patterns that are working right now
4. Output: weekly intelligence brief in Airtable

---

## Agent 2: Content Production Agent

**Job:** Take core ideas and produce platform-native content across all platforms.

**Capabilities used:** MiniMax text + image + speech

**Workflow:**
1. Receives core idea + skeleton selection from you (or Agent 1's intelligence)
2. Generates all text variations (LinkedIn, Twitter, Reddit, Instagram)
3. Generates carousel images and post graphics
4. Generates voiceover audio for video content
5. Stages everything in Airtable with metadata (platform, publish date, CTA keyword)

---

## Agent 3: Distribution Agent (optional — if quota allows)

**Job:** Handle publishing and engagement tracking.

**Capabilities used:** MiniMax text (for comment replies) + web search (for trend monitoring)

**Workflow:**
1. Publishes staged content on schedule via platform APIs
2. Monitors early engagement (first 2 hours)
3. Generates comment replies using the Comment Reply Bank from the master system
4. Alerts you if a post is breaking out (needs manual engagement boost)

---

# SECTION 7 — QUICK REFERENCE: API CALLS

All MiniMax calls via mmx-cli or direct API. Here are the most common patterns for content production:

```bash
# ── TEXT: Generate a LinkedIn post ──
mmx text chat \
  --system "You are Aryan Mahajan. Write LinkedIn posts using em dashes, arrow bullets, hype adjectives, binary closers. Voice: confident, technical, authoritative." \
  --message "Write a Replacement Stack post about an AI SDR agent that replaced a $200K sales team. Use Claude + n8n + Apollo as the stack. Include specific metrics." \
  --output json

# ── TEXT: Generate a Twitter version ──
mmx text chat \
  --system "You write Twitter/X posts. Short, punchy, no arrow bullets, no emoji steps, no repost asks. Keep it under 280 chars or write a concise long-form post." \
  --message "Compress this LinkedIn post into a native Twitter post: [paste LinkedIn post]"

# ── IMAGE: Carousel slide backgrounds ──
mmx image "Dark tech background, subtle grid pattern, deep navy with electric blue accents, clean space for white text overlay, portrait 1080x1350, editorial quality" \
  --aspect-ratio 3:4 --n 4

# ── VIDEO: B-roll clip for Reel ──
mmx video generate \
  --prompt "Close-up of hands typing on a laptop with code on screen, soft blue lighting, shallow depth of field, cinematic, 4K quality"

# ── SPEECH: Voiceover for Reel ──
mmx speech synthesize \
  --text "We replaced our entire SDR team with an AI agent. Claude plus n8n plus Apollo. Setup took 3 hours. It runs 24/7. 340K in pipeline in 90 days." \
  --out sdr_voiceover.mp3

# ── MUSIC: Background for Reel ──
mmx music generate \
  --prompt "Minimal tech beat, confident energy, subtle bass, clean production" \
  --instrumental --bpm 110 --mood "confident, modern" --genre "electronic"

# ── VISION: Analyze competitor post ──
mmx vision competitor_post.jpg \
  --prompt "Analyze this LinkedIn post image. What makes the hook effective? What's the visual hierarchy? What emotional triggers are being used?"

# ── SEARCH: Find current stats ──
mmx search "AI agent production deployment statistics 2026"
```

---

That's the complete production engine.

MiniMax is your media factory — text, image, video, speech, music, vision, search.
Remotion is your video assembly line — templates that turn raw assets into finished content.
Claude is your quality control and strategic brain.
n8n is the automation that connects it all.

One idea → every format → every platform → every week → on autopilot.
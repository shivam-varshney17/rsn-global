/**
 * MiniMax API Client
 *
 * Production-ready client for MiniMax M2.7 media generation.
 * Currently uses mock data since we don't have a live MiniMax API key.
 * Replace MOCK_MODE with false and add your MINIMAX_API_KEY to use real API.
 */

import { type Platform, type SkeletonName, SKELETON_TEMPLATES } from '@/types';

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const MINIMAX_BASE_URL = 'https://api.minimax.chat/v1';
const MOCK_MODE = true; // Set to false when you have a real API key

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

export interface TextGenParams {
  systemPrompt: string
  userMessage: string
  maxTokens?: number
  temperature?: number
}

export interface GeneratedText {
  content: string
  usage: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
  model: string
  finishReason: string
}

export interface ImageGenParams {
  prompt: string
  aspectRatio?: '9:16' | '3:4' | '16:9' | '1:1'
  n?: number
  subjectReference?: string
  resolution?: '768P' | '1080P'
}

export interface GeneratedImage {
  url: string
  prompt: string
  aspectRatio: string
  seed?: number
  metadata?: Record<string, unknown>
}

export interface VideoGenParams {
  prompt: string
  duration?: 6 | 10
  model?: 'MiniMax-Hailuo-2.3' | 'MiniMax-Hailuo-2.3-Fast'
  resolution?: '768P' | '1080P'
}

export interface GeneratedVideo {
  url: string
  thumbnailUrl?: string
  durationSeconds: number
  model: string
  prompt: string
}

export interface SpeechGenParams {
  text: string
  voiceId?: string
  language?: string
  pitch?: number // -1 to 1
  speed?: number // 0.5 to 2
  volume?: number // 0 to 1
  emotion?: 'neutral' | 'happy' | 'sad' | 'angry' | 'fearful' | 'disgusted' | 'surprised'
}

export interface GeneratedSpeech {
  url: string
  durationMs: number
  format: string
  voiceId: string
}

export interface MusicGenParams {
  prompt: string
  genre?: string
  mood?: string
  tempo?: number // BPM
  key?: string // e.g., "C minor"
  instrumental?: boolean
  vocals?: string
  lyrics?: string
  duration?: number // seconds
}

export interface GeneratedMusic {
  url: string
  durationSeconds: number
  bpm?: number
  key?: string
  genre?: string
  mood?: string
  instrumental: boolean
}

export interface ImageAnalysisParams {
  imageUrl: string
  prompt: string
}

export interface ImageAnalysis {
  description: string
  tags: string[]
  analysis: string
  suggestions?: string[]
}

export interface SearchResult {
  title: string
  url: string
  snippet: string
  publishedAt?: string
}

// ─────────────────────────────────────────────────────────────
// ARYAN VOICE RULES
// ─────────────────────────────────────────────────────────────

const ARYAN_VOICE_BASE = `You are Aryan Mahajan. Write content that is:
- Confident, technical, authoritative
- Uses em dashes (—) as pauses and beats
- Includes "hype adjectives" sparingly but powerfully (game-changing, brutal, elite)
- Shows specific proof points and numbers
- Binary closers: "It works or it doesn't."
- Triads for rhythm: "Fast. Cheap. Reliable."
- No fluff, no corporate speak

Platform voice rules are applied separately.`

// ─────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────

function getVoiceRulesForPlatform(platform: Platform, skeleton: SkeletonName): string {
  const template = SKELETON_TEMPLATES[skeleton]
  const voiceRules = template?.voice_rules[platform]

  if (!voiceRules) return ''

  let rules = '\n\nPlatform voice rules:\n'

  if (voiceRules.use_em_dashes) rules += '- Use em dashes (—) as pauses and beats\n'
  if (voiceRules.use_arrow_bullets) rules += '- Use arrow bullets (→) for lists\n'
  if (voiceRules.use_emoji_steps) rules += '- Use number-emoji steps (1️⃣ 2️⃣ 3️⃣)\n'
  if (voiceRules.use_unicode_bold) rules += '- Use Unicode bold for emphasis\n'
  if (voiceRules.hype_adjective_count) rules += `- Use ${voiceRules.hype_adjective_count} hype adjective(s) max\n`
  if (voiceRules.use_binary_closer) rules += '- End with a binary closer\n'
  if (voiceRules.use_positioning_flip) rules += '- Use positioning flip: "This isn\'t X. It\'s Y."\n'
  if (voiceRules.use_triads) rules += '- Use triads for rhythm\n'
  if (voiceRules.use_repost_ask) rules += '- Include a repost ask at the end\n'
  if (voiceRules.use_scarcity_tail) rules += '- Use scarcity tail sparingly\n'
  if (voiceRules.cta_keyword_mechanic) rules += '- Include CTA keyword mechanic\n'

  return rules
}

function buildSystemPrompt(skeleton: SkeletonName, platform: Platform): string {
  const voiceRules = getVoiceRulesForPlatform(platform, skeleton)
  return `${ARYAN_VOICE_BASE}${voiceRules}`
}

// ─────────────────────────────────────────────────────────────
// MOCK DATA GENERATORS
// ─────────────────────────────────────────────────────────────

function generateMockText(params: TextGenParams): GeneratedText {
  const skeleton = params.systemPrompt.includes('REPLACEMENT_STACK') ? 'REPLACEMENT_STACK'
    : params.systemPrompt.includes('PRODUCT_INTRO') ? 'PRODUCT_INTRO'
    : params.systemPrompt.includes('REVENUE_PROOF') ? 'REVENUE_PROOF'
    : params.systemPrompt.includes('ARSENAL_DROP') ? 'ARSENAL_DROP'
    : params.systemPrompt.includes('SYSTEM_DROP') ? 'SYSTEM_DROP'
    : params.systemPrompt.includes('CONTRARIAN') ? 'CONTRARIAN_HOT_TAKE'
    : params.systemPrompt.includes('TOOL_STACK') ? 'TOOL_STACK_FORMULA'
    : params.systemPrompt.includes('FRAMEWORK') ? 'FRAMEWORK_EDUCATION'
    : params.systemPrompt.includes('FOUNDER') ? 'FOUNDER_ARC'
    : 'SHORT_RAW'

  const platform = params.systemPrompt.includes('LinkedIn') ? 'LINKEDIN'
    : params.systemPrompt.includes('Twitter') ? 'TWITTER'
    : params.systemPrompt.includes('Reddit') ? 'REDDIT'
    : params.systemPrompt.includes('Instagram') ? 'INSTAGRAM'
    : 'LINKEDIN'

  // Generate platform-appropriate mock content
  const mockContent = generateMockContent(skeleton, platform, params.userMessage)

  return {
    content: mockContent,
    usage: {
      promptTokens: Math.floor(params.systemPrompt.length / 4),
      completionTokens: Math.floor(mockContent.length / 4),
      totalTokens: Math.floor((params.systemPrompt.length + mockContent.length) / 4),
    },
    model: 'MiniMax-M2.7',
    finishReason: 'stop',
  }
}

function generateMockContent(skeleton: SkeletonName, platform: Platform, coreIdea: string): string {
  const ideas = {
    REPLACEMENT_STACK: {
      LINKEDIN: `This AI agent replaces your $200K SDR team.

→ Claude reads every prospect's LinkedIn, 10-K, and recent news before writing the first line
→ n8n orchestrates the entire pipeline — 1,000 personalized emails/day
→ Apollo finds verified emails and company data automatically

Setup took 3 hours. Runs 24/7. No cold callers. No ramp time.

Results after 90 days:
• $340K pipeline generated
• 18% reply rate (industry average: 3%)
• Zero human intervention after initial setup

Humans can't do that at scale. AI can.

Comment SDR below and I'll DM you the full n8n workflow.`,
      TWITTER: `Replaced our $200K SDR team with an AI agent.

Claude + n8n + Apollo.
18% reply rate. $340K pipeline in 90 days.

No humans. No ramp time. No excuses.`,
      REDDIT: `I built an AI SDR pipeline that does what our $200K sales team used to do. Here's the full architecture.

**The problem:**
Our SDRs spent 70% of their time on research — finding company news, LinkedIn posts, earnings calls. They'd start outreach at 9am and have 3 real conversations by 3pm.

**The architecture:**
- \`claude-sonnet-4\`: Research agent that reads LinkedIn, 10-K, recent news for every prospect
- \`n8n\`: Workflow orchestration — triggers, timing, follow-up sequences
- \`Apollo\` + \`Clearbit\`: Email finding and verification

**What actually worked:**
The research agent was the key insight. We found that personalized opening lines (referencing a prospect's recent LinkedIn post or earnings call) tripled reply rates.

**What didn't work:**
Fully automated follow-ups felt pushy. We added a 48-hour delay and human review option.

Happy to share the n8n workflow templates.`,
      INSTAGRAM: `We fired our $200K SDR team.

And replaced them with an AI agent that runs 24/7.

The old way:
→ Manual research per prospect
→ Generic email templates
→ 3-hour response time

The new way:
→ Claude reads everything
→ 1,000 personalized emails/day
→ 18% reply rate

Comment SDR for the workflow.`,
    },
    SHORT_RAW: {
      LINKEDIN: `The best time to build was 3 years ago. The second best time is now.`,
      TWITTER: `Build now. Ship fast. Fix later.`,
      INSTAGRAM: `The best time to build was 3 years ago. The second best time is now. #BuildInPublic`,
    },
  }

  // Return appropriate mock content or generate dynamic content
  const skeletonContent = ideas[skeleton as keyof typeof ideas] as Record<Platform, string> | undefined

  if (skeletonContent && skeletonContent[platform]) {
    return skeletonContent[platform]
  }

  // Fallback: generate generic content based on skeleton
  const fallbackContent: Record<SkeletonName, Record<Platform, string>> = {
    REPLACEMENT_STACK: {
      LINKEDIN: `This system replaces your $[X] [role].

→ Step 1: [First mechanism]
→ Step 2: [Second mechanism]
→ Step 3: [Third mechanism]

Setup took [time]. Runs [schedule].

Results: [specific metrics].

Comment [KEYWORD] below for the workflow.`,
      TWITTER: `Replaced our [role] with [system].

[Key insight]. [Specific metrics].

[CTA]`,
      REDDIT: `[Detailed technical breakdown of the system]

**Problem:**
[What was broken]

**Solution:**
[How the system works]

**Results:**
[Honest metrics including failures]

Happy to answer questions.`,
      INSTAGRAM: `[Bold hook]

[Visual reveal]

[3 proof points]

Comment [WORD] for the template.`,
    },
    PRODUCT_INTRO: {
      LINKEDIN: `Introducing [Product Name].

This isn't [competitor X]. It's [category Y].

→ [Feature 1]: [value]
→ [Feature 2]: [value]
→ [Feature 3]: [value]

[Specific proof point].

Comment [KEYWORD] for early access.`,
      TWITTER: `Just shipped [Product].

[One-line what it does].

[Link or DM for access]`,
      REDDIT: `I built [Product Name] — [what it solves]. Here's the architecture and what I learned.

[Technical breakdown with honest tradeoffs]

Would love feedback on [specific aspect].`,
      INSTAGRAM: `[Product name + tagline]

Here's what it does:

[Feature 1]
[Feature 2]
[Feature 3]

Comment [WORD] for early access.`,
    },
    REVENUE_PROOF: {
      LINKEDIN: `This system made me $[X] last month.

No [old way]. No [old problem].

→ [Mechanism 1]
→ [Mechanism 2]
→ [Mechanism 3]

[Detailed breakdown with metrics]

It works or it doesn't.`,
      TWITTER: `$[X] last month. No [problem].

[Mechanism]. [Results].

[DM or link]`,
      REDDIT: `After 3 months building this system, here's the real data — including what didn't work.

[The honest breakdown]

[What worked, what didn't]`,
      INSTAGRAM: `$[X] in [timeframe].

Zero [problem].

[3 key mechanics]

Comment [WORD] for the case study.`,
    },
    ARSENAL_DROP: {
      LINKEDIN: `After [N] hours testing [category] tools...

Only [M] survived.

→ [Tool 1]: [honest take]
→ [Tool 2]: [honest take]
→ [Tool 3]: [honest take]

[One-liner summary].

Comment [KEYWORD] for the full list.`,
      TWITTER: `Tested [N] tools in [timeframe].

Only [M] are production-ready.

[Tool] [one-line verdict]
[Tool] [one-line verdict]

Bookmark this. I'll update it quarterly.`,
      REDDIT: `I've been testing [category] tools for [N] months. Here's my honest take on everything.

[Detailed structured review with tradeoffs]

Let me know what I missed.`,
      INSTAGRAM: `[N] tools tested.

Here's what survived:

[Tool] — [verdict]
[Tool] — [verdict]

Save this. Comment [WORD] for the spreadsheet.`,
    },
    SYSTEM_DROP: {
      LINKEDIN: `Built this in [time].

→ [Component 1]
→ [Component 2]
→ [Component 3]

[How it works + why it matters]

[Soft CTA]`,
      TWITTER: `Built this in [time]. [Brief description].

[One key insight].

[Link or screenshot]`,
      REDDIT: `I built a [system] in [time]. Here's the workflow and what I learned.

[Technical walkthrough with honest assessment]

Happy to answer questions about the setup.`,
      INSTAGRAM: `Built this in [time].

[Visual of the system]

[How it works]

[Why it matters]`,
    },
    CONTRARIAN_HOT_TAKE: {
      LINKEDIN: `NEVER [conventional wisdom] again.

Here's why:

→ [Point 1]
→ [Point 2]
→ [Point 3]

The old way is dead. Here's what's next.

Agree? Disagree? Drop your take below.`,
      TWITTER: `Hot take: [controversial claim].

[4 words]: [punchline]

Ratio me if I'm wrong.`,
      REDDIT: `Unpopular opinion: [thing]. Here's my reasoning and the data.

[Evidence block with citations]

Curious if this matches what others are seeing.`,
      INSTAGRAM: `Stop doing [thing].

[Evidence]

[Final punchline]

Save this. Share it with someone who needs to hear it.`,
    },
    TOOL_STACK_FORMULA: {
      LINKEDIN: `[Tool A] + [Tool B] + [Tool C] = [Result]

→ [Tool A] does [this]
→ [Tool B] does [this]
→ [Tool C] does [this]

[Proof point]

Comment [KEYWORD] for the setup guide.`,
      TWITTER: `[Tool] + [Tool] + [Tool] = [Result]

[One-liner for each]
[One-liner for each]

[DM or link]`,
      REDDIT: `[Tool A] + [Tool B] + [Tool C] for [use case]. Here's my setup and what I learned.

[Detailed walkthrough with honest tradeoffs]

[Link to repo if relevant]`,
      INSTAGRAM: `[Tool] + [Tool] = [Result]

[Breakdown]

Comment [WORD] for the guide.`,
    },
    FRAMEWORK_EDUCATION: {
      LINKEDIN: `The [Name] Framework:

Level 1: [Description]
Level 2: [Description]
Level 3: [Description]
Level 4: [Description]
Level 5: [Description]

Which level are you at? Drop your number below.`,
      TWITTER: `The [Name] Framework:

1. [Level 1]
2. [Level 2]
3. [Level 3]
4. [Level 4]
5. [Level 5]

Which one are you? Reply with your number.`,
      REDDIT: `Here's how I think about [topic]. The [Name] Framework:

[Detailed explanation of each level with examples]

Where are you in this? Curious how others see this.`,
      INSTAGRAM: `The [Name] Framework:

Level 1: [One line]
Level 2: [One line]
Level 3: [One line]
Level 4: [One line]
Level 5: [One line]

Save this. Tag someone stuck at Level 2.`,
    },
    FOUNDER_ARC: {
      LINKEDIN: `I almost quit [N] times.

[What happened]:

→ [Moment 1]
→ [Moment 2]
→ [Moment 3]

Here's what I learned about [theme].

[Final insight]`,
      TWITTER: `Almost quit [N] times.

[One key moment].

[What I learned].

[CTA if any]`,
      REDDIT: `Honest founder story. I've been building [thing] for [time]. Here's what actually happened.

[The real journey — including failures]

[What I wish I knew earlier]

Happy to answer questions.`,
      INSTAGRAM: `I almost quit.

[What kept me going]

[What I learned]

[Final message]`,
    },
    SHORT_RAW: {
      LINKEDIN: `The best time to build was 3 years ago. The second best time is now.`,
      TWITTER: `Build now. Ship fast. Fix later.`,
      REDDIT: ``,
      INSTAGRAM: `The best time to build was 3 years ago. The second best time is now. #BuildInPublic`,
    },
  }

  return fallbackContent[skeleton]?.[platform] || `${skeleton} content for ${platform}: ${coreIdea.substring(0, 100)}...`
}

function generateMockImage(params: ImageGenParams): GeneratedImage {
  const aspectRatios = {
    '9:16': { width: 1080, height: 1920 },
    '3:4': { width: 1080, height: 1350 },
    '16:9': { width: 1920, height: 1080 },
    '1:1': { width: 1080, height: 1080 },
  }

  const dims = aspectRatios[params.aspectRatio || '1:1']

  return {
    url: `https://picsum.photos/${dims.width}/${dims.height}?random=${Date.now()}`,
    prompt: params.prompt,
    aspectRatio: params.aspectRatio || '1:1',
    seed: Math.floor(Math.random() * 1000000),
    metadata: {
      width: dims.width,
      height: dims.height,
      generatedBy: 'MINIMAX',
      generationPrompt: params.prompt,
    },
  }
}

function generateMockVideo(params: VideoGenParams): GeneratedVideo {
  return {
    url: `https://sample-videos.com/video123/mp4/${params.duration || 6}s.mp4`,
    thumbnailUrl: `https://picsum.photos/1920/1080?random=${Date.now()}`,
    durationSeconds: params.duration || 6,
    model: params.model || 'MiniMax-Hailuo-2.3',
    prompt: params.prompt,
  }
}

function generateMockSpeech(params: SpeechGenParams): GeneratedSpeech {
  return {
    url: `https://api.minimax.chat/assets/speech/${Date.now()}.mp3`,
    durationMs: Math.floor(params.text.length * 50), // ~50ms per character
    format: 'mp3',
    voiceId: params.voiceId || 'aryan-voice-clone',
  }
}

function generateMockMusic(params: MusicGenParams): GeneratedMusic {
  return {
    url: `https://api.minimax.chat/assets/music/${Date.now()}.mp3`,
    durationSeconds: params.duration || 30,
    bpm: params.tempo || 120,
    key: params.key || 'C minor',
    genre: params.genre || 'electronic',
    mood: params.mood || 'confident',
    instrumental: params.instrumental ?? true,
  }
}

// ─────────────────────────────────────────────────────────────
// API CLIENT
// ─────────────────────────────────────────────────────────────

class MiniMaxClient {
  private apiKey: string
  private baseUrl: string

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.MINIMAX_API_KEY || 'mock-key'
    this.baseUrl = MINIMAX_BASE_URL
  }

  /**
   * Generate text content using MiniMax M2.7
   */
  async generateText(params: TextGenParams): Promise<GeneratedText> {
    if (MOCK_MODE) {
      return generateMockText(params)
    }

    const response = await fetch(`${this.baseUrl}/text/chat`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'MiniMax-M2.7',
        messages: [
          { role: 'system', content: params.systemPrompt },
          { role: 'user', content: params.userMessage },
        ],
        max_tokens: params.maxTokens || 2000,
        temperature: params.temperature || 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error(`MiniMax API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return {
      content: data.choices[0].message.content,
      usage: data.usage,
      model: data.model,
      finishReason: data.choices[0].finish_reason,
    }
  }

  /**
   * Generate images using MiniMax
   */
  async generateImage(params: ImageGenParams): Promise<GeneratedImage[]> {
    if (MOCK_MODE) {
      return Array.from({ length: params.n || 1 }, () => generateMockImage(params))
    }

    const response = await fetch(`${this.baseUrl}/image/generation`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'MiniMax-Image-2.0',
        prompt: params.prompt,
        aspect_ratio: params.aspectRatio || '1:1',
        n: params.n || 1,
        subject_reference: params.subjectReference,
        resolution: params.resolution || '768P',
      }),
    })

    if (!response.ok) {
      throw new Error(`MiniMax API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data.images.map((img: { url: string; seed?: number }) => ({
      url: img.url,
      prompt: params.prompt,
      aspectRatio: params.aspectRatio || '1:1',
      seed: img.seed,
    }))
  }

  /**
   * Generate video clips using MiniMax Hailuo
   */
  async generateVideo(params: VideoGenParams): Promise<GeneratedVideo> {
    if (MOCK_MODE) {
      return generateMockVideo(params)
    }

    const response = await fetch(`${this.baseUrl}/video/generation`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: params.model || 'MiniMax-Hailuo-2.3',
        prompt: params.prompt,
        duration: params.duration || 6,
        resolution: params.resolution || '768P',
      }),
    })

    if (!response.ok) {
      throw new Error(`MiniMax API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return {
      url: data.video.url,
      thumbnailUrl: data.video.thumbnail_url,
      durationSeconds: params.duration || 6,
      model: params.model || 'MiniMax-Hailuo-2.3',
      prompt: params.prompt,
    }
  }

  /**
   * Generate speech/audio using MiniMax TTS
   */
  async generateSpeech(params: SpeechGenParams): Promise<GeneratedSpeech> {
    if (MOCK_MODE) {
      return generateMockSpeech(params)
    }

    const response = await fetch(`${this.baseUrl}/speech/synthesize`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'MiniMax-Speech-2.0',
        text: params.text,
        voice_id: params.voiceId || 'aryan-voice-clone',
        language: params.language || 'en',
        pitch: params.pitch || 0,
        speed: params.speed || 1,
        volume: params.volume || 1,
        emotion: params.emotion || 'neutral',
      }),
    })

    if (!response.ok) {
      throw new Error(`MiniMax API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return {
      url: data.audio.url,
      durationMs: data.audio.duration_ms,
      format: data.audio.format || 'mp3',
      voiceId: params.voiceId || 'aryan-voice-clone',
    }
  }

  /**
   * Generate music using MiniMax Music
   */
  async generateMusic(params: MusicGenParams): Promise<GeneratedMusic> {
    if (MOCK_MODE) {
      return generateMockMusic(params)
    }

    const response = await fetch(`${this.baseUrl}/music/generation`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'MiniMax-Music-2.6',
        prompt: params.prompt,
        genre: params.genre || 'electronic',
        mood: params.mood || 'confident',
        tempo: params.tempo || 120,
        key: params.key || 'C minor',
        instrumental: params.instrumental ?? true,
        vocals: params.vocals,
        lyrics: params.lyrics,
        duration: params.duration || 30,
      }),
    })

    if (!response.ok) {
      throw new Error(`MiniMax API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return {
      url: data.music.url,
      durationSeconds: params.duration || 30,
      bpm: params.tempo || 120,
      key: params.key || 'C minor',
      genre: params.genre || 'electronic',
      mood: params.mood || 'confident',
      instrumental: params.instrumental ?? true,
    }
  }

  /**
   * Analyze images using MiniMax Vision
   */
  async analyzeImage(params: ImageAnalysisParams): Promise<ImageAnalysis> {
    if (MOCK_MODE) {
      return {
        description: `Analysis of image showing: ${params.prompt}`,
        tags: ['tech', 'social', 'engagement', 'viral'],
        analysis: `This image appears to be a high-performing social media post. The hook uses [technique], the visual hierarchy is [observation], and the engagement mechanics include [elements]. Based on the composition and style, this is likely to perform well on LinkedIn/Twitter based on similar successful posts.`,
        suggestions: [
          'Consider using bolder contrast in the headline',
          'The visual metaphor could be more specific',
          'Add a clearer CTA element',
        ],
      }
    }

    const response = await fetch(`${this.baseUrl}/vision/analyze`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_url: params.imageUrl,
        prompt: params.prompt,
      }),
    })

    if (!response.ok) {
      throw new Error(`MiniMax API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return {
      description: data.description,
      tags: data.tags,
      analysis: data.analysis,
      suggestions: data.suggestions,
    }
  }

  /**
   * Web search using MiniMax search
   */
  async webSearch(query: string): Promise<SearchResult[]> {
    if (MOCK_MODE) {
      return [
        {
          title: `Research: ${query} - Latest trends and data`,
          url: `https://example.com/search?q=${encodeURIComponent(query)}`,
          snippet: `Recent data shows significant growth in AI agent adoption across industries. Studies indicate 47% of enterprises are deploying AI-powered automation tools...`,
          publishedAt: '2026-04-20',
        },
        {
          title: `${query} - Industry benchmarks and case studies`,
          url: `https://example.com/benchmarks?q=${encodeURIComponent(query)}`,
          snippet: `Industry analysis reveals that companies implementing AI automation see an average 340% ROI within the first 90 days...`,
          publishedAt: '2026-04-18',
        },
        {
          title: `The state of ${query} in 2026`,
          url: `https://example.com/state-of?q=${encodeURIComponent(query)}`,
          snippet: `Market research indicates a 67% year-over-year increase in AI tool adoption. Key drivers include cost reduction, scalability requirements, and competitive pressure...`,
          publishedAt: '2026-04-15',
        },
      ]
    }

    const response = await fetch(`${this.baseUrl}/search`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        num_results: 10,
      }),
    })

    if (!response.ok) {
      throw new Error(`MiniMax API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data.results.map((r: { title: string; url: string; snippet: string; published_at?: string }) => ({
      title: r.title,
      url: r.url,
      snippet: r.snippet,
      publishedAt: r.published_at,
    }))
  }
}

// ─────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────

// Singleton instance
export const minimax = new MiniMaxClient()

// Export class for custom instances
export { MiniMaxClient }

// Export types
export type {
  TextGenParams,
  GeneratedText,
  ImageGenParams,
  GeneratedImage,
  VideoGenParams,
  GeneratedVideo,
  SpeechGenParams,
  GeneratedSpeech,
  MusicGenParams,
  GeneratedMusic,
  ImageAnalysisParams,
  ImageAnalysis,
  SearchResult,
}
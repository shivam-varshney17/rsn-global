/**
 * Platform Content Generator
 *
 * Takes a core idea + skeleton + platform and generates platform-native content
 * using the MiniMax client with proper voice rules per platform.
 */

import { type Platform, type SkeletonName, SKELETON_TEMPLATES, type VoiceRules } from '@/types'
import { minimax, type GeneratedText, type GeneratedImage } from './minimax'

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

export interface GenerationRequest {
  coreIdea: string
  skeleton: SkeletonName
  platforms: Platform[]
  voiceRules?: Partial<VoiceRules>
  metadata?: Record<string, unknown>
}

export interface GenerationResult {
  platform: Platform
  content: string
  hook: string
  cta_keyword?: string
  images?: GeneratedImage[]
  metadata: Record<string, unknown>
}

// ─────────────────────────────────────────────────────────────
// PLATFORM VOICE ADAPTERS
// ─────────────────────────────────────────────────────────────

/**
 * Adapts content for LinkedIn
 * - Em dashes, arrow bullets, emoji steps, hype adjectives
 * - Full skeleton format
 * - CTA keyword mechanic
 */
function adaptForLinkedIn(content: string, skeleton: SkeletonName): string {
  // LinkedIn already uses the full skeleton format
  // Just ensure proper formatting
  return content
}

/**
 * Adapts content for Twitter/X
 * - No arrow bullets, no emoji steps
 * - Short and punchy
 * - 1 hype adjective max
 * - No repost asks
 */
function adaptForTwitter(content: string, _skeleton: SkeletonName): string {
  let adapted = content
    // Remove arrow bullets (→) - replace with line breaks
    .replace(/→/g, '•')
    // Remove number emoji steps (1️⃣ 2️⃣ 3️⃣)
    .replace(/[1-9]️⃣/g, '')
    // Remove repost asks
    .replace(/♻️.*$/gm, '')
    // Remove "Comment [KEYWORD] below" - replace with DM
    .replace(/Comment \[([^\]]+)\] below/gi, 'DM me "$1"')
    // Remove scarcity tails
    .replace(/This post goes down in 24 hours.*$/gmi, '')
    // Clean up multiple newlines
    .replace(/\n{3,}/g, '\n\n')

  // Twitter prefers shorter content - truncate if too long
  if (adapted.length > 280) {
    // Find a good breaking point
    const truncated = adapted.substring(0, 277)
    const lastNewline = truncated.lastIndexOf('\n')
    const lastBullet = truncated.lastIndexOf('•')

    const breakPoint = lastNewline > 200 ? lastNewline : lastBullet > 200 ? lastBullet : 277
    adapted = truncated.substring(0, breakPoint) + '...'
  }

  return adapted.trim()
}

/**
 * Adapts content for Reddit
 * - NO voice signatures
 * - Plain English, technical depth
 * - No CTA
 * - Show your work with code snippets
 */
function adaptForReddit(content: string, skeleton: SkeletonName): string {
  let adapted = content
    // Remove em dashes as beats - use periods
    .replace(/—/g, ' — ') // Keep em dashes but spaced out
    // Remove arrow bullets - use markdown bullets
    .replace(/→/g, '-')
    // Remove number emoji steps
    .replace(/[1-9]️⃣/g, '')
    // Remove unicode bold
    .replace(/𝐞𝐥𝐢𝐭𝐞/g, 'elite')
    // Remove hype adjectives
    .replace(/\b(game-changing|brutal|elite|fire|poweful|insane|crazy)\b/gi, '')
    // Remove binary closers
    .replace(/It works or it doesn't\./g, '')
    // Remove triads - they sound marketing-y
    .replace(/\b(Fast|Cheap|Reliable)\b/g, '')
    // Remove all CTAs
    .replace(/Comment \[([^\]]+)\]/gi, '')
    .replace(/DM me/gi, '')
    .replace(/link in (bio|replies)/gi, '')
    // Remove scarcity
    .replace(/This post goes down in 24 hours.*$/gmi, '')

  // For Reddit, prepend the skeleton type as context for technical depth
  const skeletonPrefix: Record<SkeletonName, string> = {
    REPLACEMENT_STACK: '[I Built] ',
    PRODUCT_INTRO: '[I Built] ',
    REVENUE_PROOF: '',
    ARSENAL_DROP: '',
    SYSTEM_DROP: '',
    CONTRARIAN_HOT_TAKE: '[Unpopular Opinion] ',
    TOOL_STACK_FORMULA: '',
    FRAMEWORK_EDUCATION: '',
    FOUNDER_ARC: '',
    SHORT_RAW: '',
  }

  return adapted.trim()
}

/**
 * Adapts content for Instagram
 * - Keep hooks
 * - Kill long text
 * - Emoji steps work
 * - 3-5 hashtags
 */
function adaptForInstagram(content: string, skeleton: SkeletonName): string {
  // Instagram format: slide text + caption
  let adapted = content

  // Add hashtags at the end (3-5 max)
  const hashtags = '#BuildInPublic #AI #Automation #TechStack'

  // Remove long text blocks - Instagram prefers visual content
  if (content.length > 500) {
    // Extract first 3-4 lines as preview
    const lines = content.split('\n').filter(l => l.trim())
    adapted = lines.slice(0, 4).join('\n')
  }

  // Instagram keeps some elements
  // - Em dashes work
  // - Arrow bullets work (but as visual elements, not text)
  // - Emoji steps work
  // - Binary closers work on final slide

  return adapted.trim() + '\n\n' + hashtags
}

// ─────────────────────────────────────────────────────────────
// CONTENT GENERATION
// ─────────────────────────────────────────────────────────────

/**
 * Generate platform-native content for a single platform
 */
async function generateForPlatform(
  coreIdea: string,
  skeleton: SkeletonName,
  platform: Platform,
  voiceRules?: Partial<VoiceRules>
): Promise<GenerationResult> {
  // Get template for skeleton
  const template = SKELETON_TEMPLATES[skeleton]

  // Build system prompt with Aryan voice + platform rules
  const systemPrompt = buildSystemPrompt(skeleton, platform, voiceRules)

  // Build user message with core idea
  const userMessage = buildUserMessage(coreIdea, skeleton, platform)

  // Generate text
  const textResult = await minimax.generateText({
    systemPrompt,
    userMessage,
    maxTokens: platform === 'REDDIT' ? 3000 : 2000,
    temperature: 0.7,
  })

  // Adapt content for platform
  let adaptedContent: string
  let hook: string
  let cta_keyword: string | undefined

  switch (platform) {
    case 'LINKEDIN':
      adaptedContent = adaptForLinkedIn(textResult.content, skeleton)
      hook = extractHook(textResult.content, skeleton)
      cta_keyword = extractCtaKeyword(textResult.content)
      break

    case 'TWITTER':
      adaptedContent = adaptForTwitter(textResult.content, skeleton)
      hook = extractHook(textResult.content, skeleton)
      cta_keyword = undefined // Twitter uses DM instead
      break

    case 'REDDIT':
      adaptedContent = adaptForReddit(textResult.content, skeleton)
      hook = adaptedContent.split('\n')[0] || ''
      cta_keyword = undefined // No CTAs on Reddit
      break

    case 'INSTAGRAM':
      adaptedContent = adaptForInstagram(textResult.content, skeleton)
      hook = extractHook(textResult.content, skeleton)
      cta_keyword = extractCtaKeyword(textResult.content)
      break

    default:
      adaptedContent = textResult.content
      hook = ''
  }

  return {
    platform,
    content: adaptedContent,
    hook,
    cta_keyword,
    metadata: {
      skeleton,
      characterCount: adaptedContent.length,
      generatedAt: new Date().toISOString(),
      model: textResult.model,
      usage: textResult.usage,
    },
  }
}

/**
 * Build system prompt with Aryan voice + platform rules
 */
function buildSystemPrompt(
  skeleton: SkeletonName,
  platform: Platform,
  _voiceRules?: Partial<VoiceRules>
): string {
  const template = SKELETON_TEMPLATES[skeleton]
  const platformVoice = template?.voice_rules[platform]

  let prompt = `You are Aryan Mahajan. You write content that is confident, technical, and authoritative.

Skeleton: ${skeleton}
Description: ${template?.description || ''}

Platform: ${platform}
`

  // Add platform-specific voice rules
  switch (platform) {
    case 'LINKEDIN':
      prompt += `
Write LinkedIn posts using:
- Em dashes (—) as pauses and beats
- Arrow bullets (→) for lists
- Number-emoji steps (1️⃣ 2️⃣ 3️⃣)
- Hype adjectives sparingly (${platformVoice?.hype_adjective_count || 2} max)
- Binary closers at end: "It works or it doesn't."
- CTA keyword mechanic: "Comment [KEYWORD] below"
- Full skeleton format with all sections
`
      break

    case 'TWITTER':
      prompt += `
Write Twitter/X posts:
- Short and punchy — aim for under 280 characters
- No arrow bullets — use line breaks or dashes
- No emoji steps — use plain numbers
- No repost asks (♻️) — engagement bait hurts on Twitter
- Hype adjectives at most 1 per post
- DM-based CTAs instead of comment CTAs
- Can use long-form (up to 25,000 chars) if the content warrants it
`
      break

    case 'REDDIT':
      prompt += `
Write Reddit posts:
- NO voice signatures — plain, direct English
- No em dashes as beats, no arrow bullets, no emoji steps
- Technical depth — show your work, include specifics
- No CTAs — Reddit hates self-promotion
- Lead with the insight, not the outcome
- Markdown formatting for readability
- Acknowledge limitations and tradeoffs honestly
`
      break

    case 'INSTAGRAM':
      prompt += `
Write Instagram content:
- Keep hooks short (5-8 words max, stopping scroll in 1 second)
- Kill long text — each slide should have 20-40 words max
- Em dashes work for caption
- Arrow bullets work as visual design elements
- Emoji steps work on Instagram
- 3-5 targeted hashtags at end of caption
- CTA: "Comment [WORD] and I'll DM you [thing]"
- Carousel format: 7-10 slides per post
`
      break
  }

  return prompt
}

/**
 * Build user message with core idea
 */
function buildUserMessage(coreIdea: string, skeleton: SkeletonName, platform: Platform): string {
  return `Write a ${skeleton} post for ${platform}.

Core idea: ${coreIdea}

Follow the ${skeleton} skeleton format exactly. Generate platform-native content that fits the ${platform} format and voice rules.

Return the full post content ready to publish.`
}

/**
 * Extract hook from content
 */
function extractHook(content: string, skeleton: SkeletonName): string {
  const firstLine = content.split('\n')[0] || ''

  // Different hooks for different skeletons
  switch (skeleton) {
    case 'REPLACEMENT_STACK':
      // Extract "This X replaces your $Y Z" pattern
      const match = firstLine.match(/This (.+?) replaces your (.+?)\./)
      return match ? `This ${match[1]} replaces your ${match[2]}` : firstLine

    case 'PRODUCT_INTRO':
      // "Introducing [Product]"
      return firstLine.replace(/^Introducing /, '').trim()

    case 'REVENUE_PROOF':
      // "This system made me $X"
      return firstLine.match(/made me (.+?)\./)?.[0] || firstLine

    case 'CONTRARIAN_HOT_TAKE':
      // "NEVER [thing]" or "Hot take:"
      return firstLine.match(/NEVER (.+?)(?:\.|again)/)?.[0] || firstLine

    case 'SHORT_RAW':
      // Just the punchline
      return firstLine

    default:
      return firstLine.substring(0, 100)
  }
}

/**
 * Extract CTA keyword from content
 */
function extractCtaKeyword(content: string): string | undefined {
  const match = content.match(/Comment (\w+) below/i)
  return match ? match[1] : undefined
}

// ─────────────────────────────────────────────────────────────
// MAIN FUNCTION
// ─────────────────────────────────────────────────────────────

/**
 * Generate platform-native content for multiple platforms
 */
export async function generatePlatformContent(
  request: GenerationRequest
): Promise<GenerationResult[]> {
  const { coreIdea, skeleton, platforms, voiceRules } = request

  // Generate content for each platform in parallel
  const results = await Promise.all(
    platforms.map(platform =>
      generateForPlatform(coreIdea, skeleton, platform, voiceRules)
    )
  )

  return results
}

// Export types
export type { GenerationRequest, GenerationResult }
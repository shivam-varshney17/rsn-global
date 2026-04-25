/**
 * Batch Content Generator
 *
 * Weekly batch generation workflow - generates content for multiple ideas
 * across multiple platforms, including all assets (images, videos, audio).
 */

import { type Platform, type SkeletonName } from '@/types'
import { minimax, type GeneratedImage, type GeneratedVideo, type GeneratedSpeech, type GeneratedMusic } from './minimax'
import { generatePlatformContent, type GenerationResult } from './platform-generator'

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

export interface WeeklyBatchRequest {
  ideas: Array<{
    coreIdea: string
    skeleton: SkeletonName
    platforms: Platform[]
  }>
  options?: {
    generateImages?: boolean
    generateVideos?: boolean
    generateAudio?: boolean
    generateMusic?: boolean
    imageCount?: number // Per platform
    videoCount?: number // Per idea
  }
}

export interface WeeklyBatchResult {
  ideas: Array<{
    idea: string
    skeleton: SkeletonName
    contentPieces: GenerationResult[]
    assets: {
      images: GeneratedImage[]
      videos: GeneratedVideo[]
      audio: GeneratedSpeech[]
      music: GeneratedMusic[]
    }
  }>
  totalCost: EstimatedCost
  timeEstimate: string
}

interface EstimatedCost {
  textApiCalls: number
  imageApiCalls: number
  videoApiCalls: number
  audioApiCalls: number
  musicApiCalls: number
  searchApiCalls: number
  totalTokens: number
  estimatedUsd: number
}

// ─────────────────────────────────────────────────────────────
// ASSET GENERATION
// ─────────────────────────────────────────────────────────────

/**
 * Generate images for a specific idea and platforms
 */
async function generateImagesForIdea(
  coreIdea: string,
  skeleton: SkeletonName,
  platforms: Platform[],
  imageCount: number = 2
): Promise<GeneratedImage[]> {
  // Determine image types based on platforms
  const imagePrompts: string[] = []

  // LinkedIn carousel backgrounds
  if (platforms.includes('LINKEDIN')) {
    imagePrompts.push(
      `Professional dark tech background, subtle grid pattern, deep navy with electric blue accents, clean space for white text overlay, portrait 1080x1350, editorial quality`
    )
  }

  // Instagram carousel slides
  if (platforms.includes('INSTAGRAM')) {
    imagePrompts.push(
      `Bold gradient background, vibrant tech aesthetic, minimalist design, space for text overlay, portrait 1080x1350, social media ready`
    )
  }

  // Twitter post images
  if (platforms.includes('TWITTER')) {
    imagePrompts.push(
      `Clean UI mockup showing automation workflow, dark mode aesthetic, wide format 1920x1080, professional tech illustration style`
    )
  }

  // Generate all images
  const imagePromises = imagePrompts.flatMap(prompt =>
    Array.from({ length: imageCount }, () =>
      minimax.generateImage({ prompt, n: 1 }).then(imgs => imgs[0])
    )
  )

  return Promise.all(imagePromises)
}

/**
 * Generate video clips for Reels/Shorts
 */
async function generateVideosForIdea(
  coreIdea: string,
  videoCount: number = 2
): Promise<GeneratedVideo[]> {
  const videoPrompts = [
    `Close-up of hands typing on a laptop with code on screen, soft blue lighting, shallow depth of field, cinematic, 4K quality`,
    `Abstract visualization of data flow and automation processes, glowing particles, dark background, tech aesthetic`,
    `Screen recording style showing workflow automation, clean UI, professional presentation`,
  ]

  const videos = await Promise.all(
    videoPrompts.slice(0, videoCount).map(prompt =>
      minimax.generateVideo({ prompt, duration: 6, model: 'MiniMax-Hailuo-2.3' })
    )
  )

  return videos
}

/**
 * Generate voiceover audio for video content
 */
async function generateAudioForIdea(
  coreIdea: string,
  platforms: Platform[]
): Promise<GeneratedSpeech[]> {
  // Create a short voiceover script from the core idea
  const voiceoverText = extractVoiceoverScript(coreIdea)

  if (!voiceoverText) return []

  // Generate audio for platforms that need it
  const audioPromises: Promise<GeneratedSpeech>[] = []

  if (platforms.includes('INSTAGRAM')) {
    audioPromises.push(
      minimax.generateSpeech({
        text: voiceoverText,
        voiceId: 'aryan-voice-clone',
        language: 'en',
        speed: 1.1,
        emotion: 'confident',
      })
    )
  }

  return Promise.all(audioPromises)
}

/**
 * Generate background music for videos
 */
async function generateMusicForIdea(
  coreIdea: string,
  musicCount: number = 1
): Promise<GeneratedMusic[]> {
  const musicPrompts = [
    'Minimal tech beat, confident energy, subtle bass, clean production, electronic ambient',
    'Upbeat lo-fi hip hop, vinyl crackle, soft piano chords, chill study vibe',
  ]

  const music = await Promise.all(
    musicPrompts.slice(0, musicCount).map(prompt =>
      minimax.generateMusic({
        prompt,
        genre: 'electronic',
        mood: 'confident',
        tempo: 110,
        key: 'C minor',
        instrumental: true,
        duration: 30,
      })
    )
  )

  return music
}

/**
 * Extract a voiceover script from the core idea
 */
function extractVoiceoverScript(coreIdea: string): string {
  // Strip out skeleton-specific patterns and create a narration script
  let script = coreIdea
    // Remove dollar amounts for natural speech
    .replace(/\$[0-9,]+/g, 'a significant amount')
    // Make it speakable
    .replace(/\b(great|amazing|game-changing)\b/gi, '')
    .trim()

  // If too short, expand it
  if (script.length < 50) {
    script = `${script}. Here's how it works and why it matters for your business.`
  }

  // Limit to ~60 seconds of speech (~150 words)
  const maxLength = 750
  if (script.length > maxLength) {
    script = script.substring(0, maxLength) + '...'
  }

  return script
}

// ─────────────────────────────────────────────────────────────
// BATCH GENERATION
// ─────────────────────────────────────────────────────────────

/**
 * Generate a full week's worth of content across all platforms
 */
export async function generateWeeklyBatch(
  request: WeeklyBatchRequest
): Promise<WeeklyBatchResult> {
  const {
    ideas,
    options = {
      generateImages: true,
      generateVideos: true,
      generateAudio: true,
      generateMusic: true,
      imageCount: 2,
      videoCount: 2,
    },
  } = request

  // Track costs
  const cost: EstimatedCost = {
    textApiCalls: 0,
    imageApiCalls: 0,
    videoApiCalls: 0,
    audioApiCalls: 0,
    musicApiCalls: 0,
    searchApiCalls: 0,
    totalTokens: 0,
    estimatedUsd: 0,
  }

  // Process each idea
  const results = await Promise.all(
    ideas.map(async (idea) => {
      // 1. Generate text for all platforms
      const contentPieces = await generatePlatformContent({
        coreIdea: idea.coreIdea,
        skeleton: idea.skeleton,
        platforms: idea.platforms,
      })

      cost.textApiCalls += idea.platforms.length
      contentPieces.forEach(cp => {
        cost.totalTokens += (cp.metadata.usage as { totalTokens?: number })?.totalTokens || 500
      })

      // 2. Generate images
      let images: GeneratedImage[] = []
      if (options.generateImages) {
        images = await generateImagesForIdea(
          idea.coreIdea,
          idea.skeleton,
          idea.platforms,
          options.imageCount
        )
        cost.imageApiCalls += images.length
      }

      // 3. Generate videos
      let videos: GeneratedVideo[] = []
      if (options.generateVideos && (idea.platforms.includes('INSTAGRAM') || idea.platforms.includes('TWITTER'))) {
        videos = await generateVideosForIdea(idea.coreIdea, options.videoCount)
        cost.videoApiCalls += videos.length
      }

      // 4. Generate audio
      let audio: GeneratedSpeech[] = []
      if (options.generateAudio) {
        audio = await generateAudioForIdea(idea.coreIdea, idea.platforms)
        cost.audioApiCalls += audio.length
      }

      // 5. Generate music
      let music: GeneratedMusic[] = []
      if (options.generateMusic && videos.length > 0) {
        music = await generateMusicForIdea(idea.coreIdea, 1)
        cost.musicApiCalls += music.length
      }

      return {
        idea: idea.coreIdea,
        skeleton: idea.skeleton,
        contentPieces,
        assets: {
          images,
          videos,
          audio,
          music,
        },
      }
    })
  )

  // Calculate cost estimate
  // MiniMax pricing (approximate):
  // Text: $0.002 per 1K tokens
  // Image: $0.05 per image
  // Video: $0.10 per video clip
  // Audio: $0.02 per speech
  // Music: $0.10 per music track
  cost.estimatedUsd =
    (cost.totalTokens / 1000) * 0.002 +
    cost.imageApiCalls * 0.05 +
    cost.videoApiCalls * 0.10 +
    cost.audioApiCalls * 0.02 +
    cost.musicApiCalls * 0.10

  // Time estimate based on operations
  const totalOperations =
    cost.textApiCalls +
    cost.imageApiCalls +
    cost.videoApiCalls +
    cost.audioApiCalls +
    cost.musicApiCalls

  // Rough estimate: 10 seconds per text call, 30 seconds per image, 60 seconds per video
  const timeSeconds =
    cost.textApiCalls * 10 +
    cost.imageApiCalls * 30 +
    cost.videoApiCalls * 60 +
    cost.audioApiCalls * 30 +
    cost.musicApiCalls * 60

  const minutes = Math.ceil(timeSeconds / 60)
  cost.timeEstimate = minutes < 60
    ? `~${minutes} minutes`
    : `~${Math.floor(minutes / 60)} hours ${minutes % 60} minutes`

  return {
    ideas: results,
    totalCost: cost,
    timeEstimate: cost.timeEstimate,
  }
}

// ─────────────────────────────────────────────────────────────
// SINGLE IDEA BATCH
// ─────────────────────────────────────────────────────────────

export interface SingleIdeaBatchRequest {
  coreIdea: string
  skeleton: SkeletonName
  platforms: Platform[]
}

export interface SingleIdeaBatchResult {
  contentPieces: GenerationResult[]
  assets: {
    images: GeneratedImage[]
    videos: GeneratedVideo[]
    audio: GeneratedSpeech[]
    music: GeneratedMusic[]
  }
}

/**
 * Generate all content and assets for a single idea
 */
export async function generateSingleIdeaBatch(
  request: SingleIdeaBatchRequest
): Promise<SingleIdeaBatchResult> {
  const { coreIdea, skeleton, platforms } = request

  // Generate text for all platforms
  const contentPieces = await generatePlatformContent({
    coreIdea,
    skeleton,
    platforms,
  })

  // Generate images
  const images = await generateImagesForIdea(coreIdea, skeleton, platforms, 2)

  // Generate videos (for IG/Twitter)
  const videos = platforms.includes('INSTAGRAM') || platforms.includes('TWITTER')
    ? await generateVideosForIdea(coreIdea, 2)
    : []

  // Generate audio
  const audio = await generateAudioForIdea(coreIdea, platforms)

  // Generate music
  const music = videos.length > 0
    ? await generateMusicForIdea(coreIdea, 1)
    : []

  return {
    contentPieces,
    assets: {
      images,
      videos,
      audio,
      music,
    },
  }
}

// Export types
export type {
  WeeklyBatchRequest,
  WeeklyBatchResult,
  SingleIdeaBatchRequest,
  SingleIdeaBatchResult,
  EstimatedCost,
}
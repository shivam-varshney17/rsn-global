/**
 * POST /api/generate/batch
 * Run weekly batch generation for multiple ideas across platforms
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { generateWeeklyBatch, type WeeklyBatchRequest } from '@/lib/batch-generator'
import { type Platform, type SkeletonName } from '@/types'

// Request validation schema
const BatchGenerationSchema = z.object({
  ideas: z.array(z.object({
    coreIdea: z.string().min(1, 'Core idea is required'),
    skeleton: z.enum([
      'REPLACEMENT_STACK',
      'PRODUCT_INTRO',
      'REVENUE_PROOF',
      'ARSENAL_DROP',
      'SYSTEM_DROP',
      'CONTRARIAN_HOT_TAKE',
      'TOOL_STACK_FORMULA',
      'FRAMEWORK_EDUCATION',
      'FOUNDER_ARC',
      'SHORT_RAW',
    ] as const),
    platforms: z.array(z.enum(['LINKEDIN', 'TWITTER', 'REDDIT', 'INSTAGRAM'] as const)).min(1, 'At least one platform required'),
  })).min(1, 'At least one idea is required'),
  options: z.object({
    generateImages: z.boolean().optional().default(true),
    generateVideos: z.boolean().optional().default(true),
    generateAudio: z.boolean().optional().default(true),
    generateMusic: z.boolean().optional().default(true),
    imageCount: z.number().min(1).max(4).optional().default(2),
    videoCount: z.number().min(1).max(3).optional().default(2),
  }).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body
    const parseResult = BatchGenerationSchema.safeParse(body)
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parseResult.error.issues },
        { status: 400 }
      )
    }

    const { ideas, options } = parseResult.data

    // Build batch request
    const batchRequest: WeeklyBatchRequest = {
      ideas: ideas.map(idea => ({
        coreIdea: idea.coreIdea,
        skeleton: idea.skeleton as SkeletonName,
        platforms: idea.platforms as Platform[],
      })),
      options,
    }

    // Run batch generation
    const result = await generateWeeklyBatch(batchRequest)

    // In production: store all content pieces and assets in Supabase
    // for (const ideaResult of result.ideas) {
    //   // Store content_pieces
    //   for (const piece of ideaResult.contentPieces) {
    //     await supabase.from('content_pieces').insert({
    //       platform: piece.platform,
    //       final_text: piece.content,
    //       status: 'REVIEW',
    //       metadata: piece.metadata,
    //     })
    //   }
    //
    //   // Store assets
    //   for (const img of ideaResult.assets.images) {
    //     await supabase.from('assets').insert({ type: 'IMAGE', url: img.url, metadata: img.metadata })
    //   }
    //   ... etc
    // }

    return NextResponse.json({
      success: true,
      data: result,
      meta: {
        generatedAt: new Date().toISOString(),
        ideasCount: ideas.length,
        totalContentPieces: result.ideas.reduce((sum, i) => sum + i.contentPieces.length, 0),
        totalImages: result.ideas.reduce((sum, i) => sum + i.assets.images.length, 0),
        totalVideos: result.ideas.reduce((sum, i) => sum + i.assets.videos.length, 0),
        totalAudio: result.ideas.reduce((sum, i) => sum + i.assets.audio.length, 0),
        totalMusic: result.ideas.reduce((sum, i) => sum + i.assets.music.length, 0),
        estimatedCost: result.totalCost.estimatedUsd.toFixed(4),
        timeEstimate: result.timeEstimate,
      },
    })
  } catch (error) {
    console.error('Batch generation error:', error)
    return NextResponse.json(
      { error: 'Generation failed', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
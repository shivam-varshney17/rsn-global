/**
 * POST /api/generate/text
 * Generate text content for a platform
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { generatePlatformContent, type GenerationRequest } from '@/lib/platform-generator'
import { type Platform, type SkeletonName } from '@/types'

// Request validation schema
const TextGenerationSchema = z.object({
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
  platforms: z.array(z.enum(['LINKEDIN', 'TWITTER', 'REDDIT', 'INSTAGRAM'] as const)).min(1, 'At least one platform is required'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body
    const parseResult = TextGenerationSchema.safeParse(body)
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parseResult.error.issues },
        { status: 400 }
      )
    }

    const { coreIdea, skeleton, platforms } = parseResult.data

    // Generate content
    const generationRequest: GenerationRequest = {
      coreIdea,
      skeleton: skeleton as SkeletonName,
      platforms: platforms as Platform[],
    }

    const results = await generatePlatformContent(generationRequest)

    // In production: store in Supabase
    // await supabase.from('content_pieces').insert(...)

    return NextResponse.json({
      success: true,
      data: {
        contentPieces: results,
        count: results.length,
      },
      meta: {
        generatedAt: new Date().toISOString(),
        skeleton,
        platforms,
      },
    })
  } catch (error) {
    console.error('Text generation error:', error)
    return NextResponse.json(
      { error: 'Generation failed', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
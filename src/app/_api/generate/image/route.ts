/**
 * POST /api/generate/image
 * Generate images using MiniMax
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { minimax, type ImageGenParams } from '@/lib/minimax'

// Request validation schema
const ImageGenerationSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required'),
  aspectRatio: z.enum(['9:16', '3:4', '16:9', '1:1']).optional().default('1:1'),
  n: z.number().min(1).max(4).optional().default(1),
  subjectReference: z.string().optional(),
  resolution: z.enum(['768P', '1080P']).optional().default('768P'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body
    const parseResult = ImageGenerationSchema.safeParse(body)
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parseResult.error.issues },
        { status: 400 }
      )
    }

    const { prompt, aspectRatio, n, subjectReference, resolution } = parseResult.data

    // Generate images
    const imageParams: ImageGenParams = {
      prompt,
      aspectRatio,
      n,
      subjectReference,
      resolution,
    }

    const images = await minimax.generateImage(imageParams)

    // In production: store in Supabase assets table
    // await supabase.from('assets').insert(
    //   images.map(img => ({
    //     type: 'IMAGE',
    //     url: img.url,
    //     metadata: { ...img.metadata, prompt, aspectRatio },
    //   }))
    // )

    return NextResponse.json({
      success: true,
      data: {
        images,
        count: images.length,
      },
      meta: {
        generatedAt: new Date().toISOString(),
        prompt,
        aspectRatio,
      },
    })
  } catch (error) {
    console.error('Image generation error:', error)
    return NextResponse.json(
      { error: 'Generation failed', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
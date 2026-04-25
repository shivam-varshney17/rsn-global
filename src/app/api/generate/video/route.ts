/**
 * POST /api/generate/video
 * Generate video clips using MiniMax Hailuo
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { minimax, type VideoGenParams } from '@/lib/minimax'

// Request validation schema
const VideoGenerationSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required'),
  duration: z.enum(['6', '10']).optional().default('6'),
  model: z.enum(['MiniMax-Hailuo-2.3', 'MiniMax-Hailuo-2.3-Fast']).optional().default('MiniMax-Hailuo-2.3'),
  resolution: z.enum(['768P', '1080P']).optional().default('768P'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body
    const parseResult = VideoGenerationSchema.safeParse(body)
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parseResult.error.issues },
        { status: 400 }
      )
    }

    const { prompt, duration, model, resolution } = parseResult.data

    // Generate video
    const videoParams: VideoGenParams = {
      prompt,
      duration: parseInt(duration) as 6 | 10,
      model: model as 'MiniMax-Hailuo-2.3' | 'MiniMax-Hailuo-2.3-Fast',
      resolution: resolution as '768P' | '1080P',
    }

    const video = await minimax.generateVideo(videoParams)

    // In production: store in Supabase assets table
    // await supabase.from('assets').insert({
    //   type: 'VIDEO',
    //   url: video.url,
    //   metadata: {
    //     durationSeconds: video.durationSeconds,
    //     model: video.model,
    //     prompt,
    //     thumbnailUrl: video.thumbnailUrl,
    //   },
    // })

    return NextResponse.json({
      success: true,
      data: {
        video,
      },
      meta: {
        generatedAt: new Date().toISOString(),
        prompt,
        duration: video.durationSeconds,
        model: video.model,
      },
    })
  } catch (error) {
    console.error('Video generation error:', error)
    return NextResponse.json(
      { error: 'Generation failed', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
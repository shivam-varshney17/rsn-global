/**
 * POST /api/generate/speech
 * Generate speech/audio using MiniMax TTS
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { minimax, type SpeechGenParams } from '@/lib/minimax'

// Request validation schema
const SpeechGenerationSchema = z.object({
  text: z.string().min(1, 'Text is required').max(50000, 'Text too long (max 50000 chars)'),
  voiceId: z.string().optional().default('aryan-voice-clone'),
  language: z.string().optional().default('en'),
  pitch: z.number().min(-1).max(1).optional().default(0),
  speed: z.number().min(0.5).max(2).optional().default(1),
  volume: z.number().min(0).max(1).optional().default(1),
  emotion: z.enum(['neutral', 'happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised']).optional().default('neutral'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body
    const parseResult = SpeechGenerationSchema.safeParse(body)
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parseResult.error.issues },
        { status: 400 }
      )
    }

    const { text, voiceId, language, pitch, speed, volume, emotion } = parseResult.data

    // Generate speech
    const speechParams: SpeechGenParams = {
      text,
      voiceId,
      language,
      pitch,
      speed,
      volume,
      emotion: emotion as 'neutral' | 'happy' | 'sad' | 'angry' | 'fearful' | 'disgusted' | 'surprised',
    }

    const speech = await minimax.generateSpeech(speechParams)

    // In production: store in Supabase assets table
    // await supabase.from('assets').insert({
    //   type: 'AUDIO',
    //   url: speech.url,
    //   metadata: {
    //     durationMs: speech.durationMs,
    //     format: speech.format,
    //     voiceId: speech.voiceId,
    //     textLength: text.length,
    //   },
    // })

    return NextResponse.json({
      success: true,
      data: {
        speech,
      },
      meta: {
        generatedAt: new Date().toISOString(),
        textLength: text.length,
        durationMs: speech.durationMs,
        voiceId: speech.voiceId,
      },
    })
  } catch (error) {
    console.error('Speech generation error:', error)
    return NextResponse.json(
      { error: 'Generation failed', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
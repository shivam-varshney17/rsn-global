import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

const VALID_PLATFORMS = ['linkedin', 'twitter', 'reddit', 'instagram'] as const

/**
 * GET /api/platform-configs - Get all platform configurations
 */
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('platform_configs')
      .select('*')
      .order('platform', { ascending: true })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch platform configs', details: error },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/platform-configs - Update a platform configuration
 * Body: { platform, account_handle?, posting_schedule?, voice_rules?, metadata? }
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      platform,
      account_handle,
      posting_schedule,
      voice_rules,
      metadata,
    } = body

    if (!platform) {
      return NextResponse.json(
        { error: 'Platform is required' },
        { status: 400 }
      )
    }

    const platformLower = platform.toLowerCase()
    if (!VALID_PLATFORMS.includes(platformLower as typeof VALID_PLATFORMS[number])) {
      return NextResponse.json(
        { error: `Invalid platform. Must be one of: ${VALID_PLATFORMS.join(', ')}` },
        { status: 400 }
      )
    }

    const updateData: Record<string, unknown> = {
      platform: platformLower,
      updated_at: new Date().toISOString(),
    }

    if (account_handle !== undefined) updateData.account_handle = account_handle
    if (posting_schedule !== undefined) updateData.posting_schedule = posting_schedule
    if (voice_rules !== undefined) updateData.voice_rules = voice_rules
    if (metadata !== undefined) updateData.metadata = metadata

    const { data, error } = await supabaseAdmin
      .from('platform_configs')
      .upsert(updateData)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to update platform config', details: error },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
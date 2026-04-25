import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { advanceStage } from '@/lib/pipeline'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const { platform_config_id, scheduled_for, metadata } = body

  // Get piece with its current workflow state
  const { data: piece, error: fetchError } = await supabaseAdmin
    .from('content_pieces')
    .select('*, workflow_states(stage)')
    .eq('id', id)
    .single()

  if (fetchError || !piece) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const currentStage = piece.workflow_states?.stage ?? 'DRAFT'

  // If scheduling for a future date, move to SCHEDULED
  if (scheduled_for) {
    const scheduledDate = new Date(scheduled_for)
    if (scheduledDate > new Date()) {
      await advanceStage(id, 'SCHEDULED')

      await supabaseAdmin.from('scheduled_posts').insert({
        content_piece_id: id,
        platform: piece.platform,
        scheduled_for,
        status: 'PENDING',
      })

      return NextResponse.json({
        data: { ...piece, workflow_state: { ...piece.workflow_states, stage: 'SCHEDULED' } },
        message: 'Content piece scheduled',
      })
    }
  }

  // Otherwise publish immediately: approved → scheduled → published
  if (currentStage === 'APPROVED') {
    await advanceStage(id, 'SCHEDULED')
  }

  const ws = await advanceStage(id, 'PUBLISHED')
  if (!ws) {
    return NextResponse.json({ error: 'Invalid state transition' }, { status: 400 })
  }

  // Record the published post
  await supabaseAdmin.from('scheduled_posts').insert({
    content_piece_id: id,
    platform: piece.platform,
    scheduled_for: new Date().toISOString(),
    published_at: new Date().toISOString(),
    status: 'PUBLISHED',
  })

  // Update content piece metadata
  if (platform_config_id || metadata) {
    await supabaseAdmin
      .from('content_pieces')
      .update({ metadata: { ...piece.metadata, ...metadata, platform_config_id, published_at: new Date().toISOString() } })
      .eq('id', id)
  }

  const { data: updated } = await supabaseAdmin
    .from('content_pieces')
    .select('*, workflow_states(*)')
    .eq('id', id)
    .single()

  return NextResponse.json({ data: updated, message: 'Published' })
}

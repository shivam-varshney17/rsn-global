import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { advanceStage } from '@/lib/pipeline'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const stage = searchParams.get('stage')
  const platform = searchParams.get('platform')
  const ideaId = searchParams.get('idea_id')
  const limit = parseInt(searchParams.get('limit') ?? '50', 10)
  const offset = parseInt(searchParams.get('offset') ?? '0', 10)

  let query = supabaseAdmin
    .from('content_pieces')
    .select('*, workflow_states(stage)')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (stage) query = query.eq('workflow_states.stage', stage.toUpperCase())
  if (platform) query = query.eq('platform', platform.toUpperCase())
  if (ideaId) query = query.eq('idea_id', ideaId)

  const { data, error, count } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ data, total: count ?? 0, limit, offset })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { idea_id, platform, final_text, metadata } = body

  if (!idea_id || !platform) {
    return NextResponse.json({ error: 'Missing idea_id or platform' }, { status: 400 })
  }

  // Create content piece
  const { data: piece, error: pieceError } = await supabaseAdmin
    .from('content_pieces')
    .insert({ idea_id, platform: platform.toUpperCase(), final_text, metadata })
    .select()
    .single()

  if (pieceError) return NextResponse.json({ error: pieceError.message }, { status: 500 })

  // Create initial workflow state
  await advanceStage(piece.id, 'DRAFT')

  const { data: ws } = await supabaseAdmin
    .from('workflow_states')
    .select('*')
    .eq('content_piece_id', piece.id)
    .single()

  return NextResponse.json({ data: { ...piece, workflow_state: ws } }, { status: 201 })
}

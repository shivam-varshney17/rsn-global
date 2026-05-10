import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const start = searchParams.get('start')
  const end = searchParams.get('end')
  const platform = searchParams.get('platform')

  let query = supabaseAdmin
    .from('scheduled_posts')
    .select('*, content_pieces(id, final_text, platform, metadata)')
    .order('scheduled_for', { ascending: true })

  if (start) query = query.gte('scheduled_for', start)
  if (end) query = query.lte('scheduled_for', end)
  if (platform) query = query.eq('platform', platform.toUpperCase())

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Group by date for calendar view
  const calendarView: Record<string, typeof data> = {}
  data?.forEach((post: any) => {
    const date = new Date(post.scheduled_for).toISOString().split('T')[0]
    if (!calendarView[date]) calendarView[date] = []
    calendarView[date].push(post)
  })

  return NextResponse.json({ data, calendar_view: calendarView, total: data?.length ?? 0 })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { content_piece_id, scheduled_for, platform } = body

  if (!content_piece_id || !scheduled_for) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { data: piece } = await supabaseAdmin
    .from('content_pieces')
    .select('platform')
    .eq('id', content_piece_id)
    .single()

  const { data, error } = await supabaseAdmin
    .from('scheduled_posts')
    .insert({
      content_piece_id,
      platform: platform?.toUpperCase() ?? piece?.platform,
      scheduled_for,
      status: 'PENDING',
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Advance workflow state
  const { createClient } = await import('@/lib/supabase')
  const { advanceStage } = await import('@/lib/pipeline')
  await advanceStage(content_piece_id, 'SCHEDULED')

  return NextResponse.json({ data }, { status: 201 })
}

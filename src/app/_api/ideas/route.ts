import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import type { Idea } from '@/types'

/**
 * GET /api/ideas - List all ideas
 * Query params: ?status=active&limit=10&offset=0
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50', 10)
    const offset = parseInt(searchParams.get('offset') || '0', 10)

    let query = supabaseAdmin
      .from('ideas')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error, count } = await query

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch ideas', details: error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data,
      total: count || data?.length || 0,
      limit,
      offset,
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/ideas - Create a new idea
 * Body: { title, description, core_concept, skeleton_type, target_platforms?, status?, metadata? }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      title,
      description,
      core_concept,
      skeleton_type,
      target_platforms,
      status = 'active',
      metadata,
    } = body

    if (!title || !core_concept) {
      return NextResponse.json(
        { error: 'Missing required fields: title and core_concept are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('ideas')
      .insert({
        title,
        description,
        core_concept,
        skeleton_type,
        target_platforms,
        status,
        metadata,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to create idea', details: error },
        { status: 500 }
      )
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
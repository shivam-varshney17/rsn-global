import { NextRequest, NextResponse } from 'next/server'
import { getPipelineStats } from '@/lib/pipeline'

/**
 * GET /api/pipeline-metrics - Get pipeline statistics
 * Returns counts per stage per platform, plus ideas stats
 */
export async function GET(request: NextRequest) {
  try {
    const stats = await getPipelineStats()

    return NextResponse.json({
      data: stats,
      summary: {
        total_content_pieces: stats.total,
        total_ideas: stats.ideasTotal,
        stage_distribution: stats.byStage,
        platform_breakdown: stats.byPlatform,
      },
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pipeline metrics', details: error },
      { status: 500 }
    )
  }
}
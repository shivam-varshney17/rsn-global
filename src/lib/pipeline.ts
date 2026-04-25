import { supabaseAdmin } from './supabase'
import type { ContentPiece, WorkflowState } from '@/types'

export const PIPELINE_STAGES = ['DRAFT', 'REVIEW', 'APPROVED', 'SCHEDULED', 'PUBLISHED'] as const
export type PipelineStage = typeof PIPELINE_STAGES[number]

const VALID_TRANSITIONS: Record<PipelineStage, PipelineStage[]> = {
  DRAFT: ['REVIEW'],
  REVIEW: ['APPROVED', 'DRAFT'],
  APPROVED: ['SCHEDULED', 'REVIEW'],
  SCHEDULED: ['PUBLISHED', 'APPROVED'],
  PUBLISHED: [],
}

export async function advanceStage(
  pieceId: string,
  newStage: PipelineStage
): Promise<WorkflowState | null> {
  if (!PIPELINE_STAGES.includes(newStage)) return null

  // Get current workflow state
  const { data: current } = await supabaseAdmin
    .from('workflow_states')
    .select('stage')
    .eq('content_piece_id', pieceId)
    .single()

  const currentStage = current?.stage as PipelineStage | undefined

  if (!currentStage) {
    // Create initial workflow state
    const { data, error } = await supabaseAdmin
      .from('workflow_states')
      .insert({ content_piece_id: pieceId, stage: newStage })
      .select()
      .single()
    return error ? null : data as WorkflowState
  }

  if (!VALID_TRANSITIONS[currentStage]?.includes(newStage)) return null

  const { data, error } = await supabaseAdmin
    .from('workflow_states')
    .update({ stage: newStage, updated_at: new Date().toISOString() })
    .eq('content_piece_id', pieceId)
    .select()
    .single()

  return error ? null : data as WorkflowState
}

export interface PipelineStats {
  total: number
  byStage: Record<PipelineStage, number>
  byPlatform: Record<string, Record<PipelineStage, number>>
  ideasTotal: number
  ideasByStatus: Record<string, number>
}

export async function getPipelineStats(): Promise<PipelineStats> {
  const [{ data: pieces }, { data: ideas }] = await Promise.all([
    supabaseAdmin.from('content_pieces').select('platform'),
    supabaseAdmin.from('ideas').select('status'),
  ])

  const [{ data: workflowStates }] = await Promise.all([
    supabaseAdmin.from('workflow_states').select('content_piece_id, stage'),
  ])

  // Map pieceId → stage
  const stageMap: Record<string, PipelineStage> = {}
  workflowStates?.forEach((ws: any) => {
    stageMap[ws.content_piece_id] = ws.stage as PipelineStage
  })

  const stats: PipelineStats = {
    total: pieces?.length ?? 0,
    byStage: { DRAFT: 0, REVIEW: 0, APPROVED: 0, SCHEDULED: 0, PUBLISHED: 0 },
    byPlatform: {},
    ideasTotal: ideas?.length ?? 0,
    ideasByStatus: {},
  }

  pieces?.forEach((piece: any) => {
    const stage = stageMap[piece.id] ?? 'DRAFT'
    if (stats.byStage[stage] !== undefined) stats.byStage[stage]++

    const platform = piece.platform ?? 'UNKNOWN'
    if (!stats.byPlatform[platform]) {
      stats.byPlatform[platform] = { DRAFT: 0, REVIEW: 0, APPROVED: 0, SCHEDULED: 0, PUBLISHED: 0 }
    }
    if (stats.byPlatform[platform][stage] !== undefined) {
      stats.byPlatform[platform][stage]++
    }
  })

  ideas?.forEach((idea: any) => {
    const s = idea.status ?? 'DRAFT'
    stats.ideasByStatus[s] = (stats.ideasByStatus[s] ?? 0) + 1
  })

  return stats
}

export function isValidTransition(current: PipelineStage, next: PipelineStage): boolean {
  return VALID_TRANSITIONS[current]?.includes(next) ?? false
}

export function getNextStages(current: PipelineStage): PipelineStage[] {
  return VALID_TRANSITIONS[current] ?? []
}

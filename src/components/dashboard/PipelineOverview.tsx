'use client';

import { type PipelineItem, type PipelineStage, platformColors, platformNames, stageNames } from './types';

interface PipelineColumnProps {
  stage: PipelineStage;
  items: PipelineItem[];
}

function PipelineColumn({ stage, items }: PipelineColumnProps) {
  const topItems = items.slice(0, 3);

  return (
    <div className="flex flex-col rounded-lg border border-border bg-surface-secondary">
      {/* Column header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium text-foreground">
          {stageNames[stage]}
        </span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-tertiary text-xs font-medium text-text-secondary">
          {items.length}
        </span>
      </div>

      {/* Items list */}
      <div className="flex flex-col p-2">
        {topItems.length === 0 ? (
          <div className="py-6 text-center text-xs text-text-muted">
            No items
          </div>
        ) : (
          topItems.map((item) => (
            <div
              key={item.id}
              className="mb-2 flex items-start gap-2 rounded-md border border-border bg-surface p-3 last:mb-0"
            >
              {/* Platform dot */}
              <div
                className="mt-1 h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: platformColors[item.platform] }}
                title={platformNames[item.platform]}
              />

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground line-clamp-2">
                  {item.title}
                </p>
                <span className="mt-1 text-xs text-text-secondary">
                  {platformNames[item.platform]}
                </span>
              </div>
            </div>
          ))
        )}

        {/* Show more indicator */}
        {items.length > 3 && (
          <div className="mt-2 text-center text-xs text-text-muted">
            +{items.length - 3} more
          </div>
        )}
      </div>
    </div>
  );
}

interface PipelineOverviewProps {
  pipelineByStage: Record<PipelineStage, PipelineItem[]>;
}

export function PipelineOverview({ pipelineByStage }: PipelineOverviewProps) {
  const stages: PipelineStage[] = ['draft', 'in_review', 'approved', 'scheduled', 'published'];

  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {stages.map((stage) => (
        <div key={stage} className="min-w-[200px] flex-1">
          <PipelineColumn stage={stage} items={pipelineByStage[stage]} />
        </div>
      ))}
    </div>
  );
}

// Skeleton loader
export function PipelineOverviewSkeleton() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="min-w-[200px] flex-1 animate-pulse rounded-lg border border-border bg-surface-secondary"
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="h-4 w-20 rounded skeleton" />
            <div className="h-5 w-5 rounded-full skeleton" />
          </div>
          <div className="p-2">
            {[...Array(3)].map((_, j) => (
              <div
                key={j}
                className="mb-2 flex items-start gap-2 rounded-md border border-border bg-surface p-3"
              >
                <div className="mt-1 h-2 w-2 rounded-full skeleton" />
                <div className="flex-1">
                  <div className="h-4 w-full rounded skeleton" />
                  <div className="mt-1 h-3 w-16 rounded skeleton" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
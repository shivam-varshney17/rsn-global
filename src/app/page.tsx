import { fetchPipelineMetrics } from '@/components/dashboard/types';
import { StatsRow } from '@/components/dashboard/StatsRow';
import { PipelineOverview } from '@/components/dashboard/PipelineOverview';
import { PlatformActivityGrid } from '@/components/dashboard/PlatformActivityGrid';
import { WeeklyCalendarStrip } from '@/components/dashboard/WeeklyCalendarStrip';
import { RecentIdeasFeed } from '@/components/dashboard/RecentIdeasFeed';

// Force dynamic rendering since we're fetching data
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const metrics = await fetchPipelineMetrics();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Content Dashboard
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Multi-platform content production overview
          </p>
        </div>
      </div>

      {/* Section 1: Stats Row */}
      <section>
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-text-muted">
          Overview
        </h2>
        <StatsRow
          totalIdeas={metrics.totalIdeasThisWeek}
          contentInPipeline={metrics.contentInPipeline}
          scheduledThisWeek={metrics.scheduledThisWeek}
          publishedThisWeek={metrics.publishedThisWeek}
        />
      </section>

      {/* Section 2: Pipeline Overview */}
      <section>
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-text-muted">
          Pipeline
        </h2>
        <PipelineOverview pipelineByStage={metrics.pipelineByStage} />
      </section>

      {/* Section 3: Platform Activity Grid */}
      <section>
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-text-muted">
          Platform Activity
        </h2>
        <PlatformActivityGrid platformMetrics={metrics.platformMetrics} />
      </section>

      {/* Section 4: Weekly Calendar Strip */}
      <section>
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-text-muted">
          This Week
        </h2>
        <div className="rounded-xl border border-border bg-surface p-4">
          <WeeklyCalendarStrip weeklyCalendar={metrics.weeklyCalendar} />
        </div>
      </section>

      {/* Section 5: Recent Ideas Feed */}
      <section>
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-text-muted">
          Recent Ideas
        </h2>
        <RecentIdeasFeed ideas={metrics.recentIdeas} />
      </section>
    </div>
  );
}
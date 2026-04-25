'use client';

import { type CalendarDay } from './types';

interface WeeklyCalendarStripProps {
  weeklyCalendar: CalendarDay[];
}

export function WeeklyCalendarStrip({ weeklyCalendar }: WeeklyCalendarStripProps) {
  const maxPosts = Math.max(...weeklyCalendar.map((d) => d.postCount), 1);

  return (
    <div className="flex gap-2">
      {weeklyCalendar.map((day) => {
        const intensity = day.postCount / maxPosts;
        const isToday = day.date === '2026-04-25'; // Would be dynamically determined

        return (
          <div key={day.date} className="flex flex-1 flex-col items-center gap-1">
            {/* Day name */}
            <span className="text-xs font-medium text-text-secondary">
              {day.dayName}
            </span>

            {/* Calendar cell */}
            <div
              className={`
                relative flex h-12 w-full min-w-[40px] items-center justify-center rounded-lg border transition-all
                ${isToday ? 'border-accent ring-2 ring-accent/20' : 'border-border'}
                ${day.postCount === 0 ? 'bg-surface-secondary' : ''}
              `}
              style={{
                backgroundColor:
                  day.postCount > 0
                    ? `rgba(59, 130, 246, ${0.1 + intensity * 0.4})`
                    : undefined,
              }}
              title={`${day.postCount} post${day.postCount !== 1 ? 's' : ''} scheduled`}
            >
              {day.postCount > 0 && (
                <span
                  className={`text-sm font-semibold ${
                    intensity > 0.5 ? 'text-accent' : 'text-blue-500 dark:text-blue-400'
                  }`}
                >
                  {day.postCount}
                </span>
              )}
            </div>

            {/* Date */}
            <span className="text-xs text-text-muted">
              {new Date(day.date).getDate()}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// Skeleton loader
export function WeeklyCalendarStripSkeleton() {
  return (
    <div className="flex gap-2">
      {[...Array(7)].map((_, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1">
          <div className="h-3 w-6 rounded skeleton" />
          <div className="h-12 w-full min-w-[40px] animate-pulse rounded-lg bg-surface-secondary" />
          <div className="h-3 w-6 rounded skeleton" />
        </div>
      ))}
    </div>
  );
}
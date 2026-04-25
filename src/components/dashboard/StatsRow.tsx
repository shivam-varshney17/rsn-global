'use client';

import { Lightbulb, FileStack, CalendarCheck, Globe, type LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  accentColor: string;
}

function StatCard({ icon: Icon, value, label, accentColor }: StatCardProps) {
  return (
    <div className="card relative overflow-hidden">
      {/* Accent bar */}
      <div
        className="absolute left-0 top-0 h-1 w-full"
        style={{ backgroundColor: accentColor }}
      />

      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="text-3xl font-semibold text-foreground">
            {value}
          </span>
          <span className="mt-1 text-sm text-text-secondary">{label}</span>
        </div>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${accentColor}15` }}
        >
          <Icon className="h-5 w-5" style={{ color: accentColor }} />
        </div>
      </div>
    </div>
  );
}

interface StatsRowProps {
  totalIdeas: number;
  contentInPipeline: number;
  scheduledThisWeek: number;
  publishedThisWeek: number;
}

export function StatsRow({
  totalIdeas,
  contentInPipeline,
  scheduledThisWeek,
  publishedThisWeek,
}: StatsRowProps) {
  const stats = [
    {
      icon: Lightbulb,
      value: totalIdeas,
      label: 'Ideas this week',
      accentColor: '#F59E0B',
    },
    {
      icon: FileStack,
      value: contentInPipeline,
      label: 'In pipeline',
      accentColor: '#8B5CF6',
    },
    {
      icon: CalendarCheck,
      value: scheduledThisWeek,
      label: 'Scheduled this week',
      accentColor: '#3B82F6',
    },
    {
      icon: Globe,
      value: publishedThisWeek,
      label: 'Published this week',
      accentColor: '#10B981',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}

// Skeleton loader
export function StatsRowSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="card h-28 animate-pulse"
        >
          <div className="flex h-full items-center justify-between p-5">
            <div className="flex flex-col">
              <div className="h-8 w-16 rounded skeleton" />
              <div className="mt-2 h-4 w-24 rounded skeleton" />
            </div>
            <div className="h-10 w-10 rounded-lg skeleton" />
          </div>
        </div>
      ))}
    </div>
  );
}
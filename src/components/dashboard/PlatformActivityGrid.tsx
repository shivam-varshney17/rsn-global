'use client';

import { type PlatformMetrics, platformColors, platformNames } from './types';
import { MessageCircle } from 'lucide-react';
import { LinkedinIcon, TwitterIcon, InstagramIcon } from '@/components/icons/PlatformIcons';

const platformIcons: Record<string, React.ElementType> = {
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
  reddit: MessageCircle,
  instagram: InstagramIcon,
};

interface PlatformCardProps {
  metrics: PlatformMetrics;
}

function PlatformCard({ metrics }: PlatformCardProps) {
  const Icon = platformIcons[metrics.platform] || Linkedin;
  const color = platformColors[metrics.platform];

  const engagementColors: Record<string, string> = {
    High: 'text-accent',
    Medium: 'text-yellow-500 dark:text-yellow-400',
    Low: 'text-text-muted',
  };

  return (
    <div className="card">
      {/* Platform header */}
      <div
        className="flex items-center gap-2 rounded-t-xl px-4 py-3"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon className="h-5 w-5" style={{ color }} />
        <span className="font-medium text-foreground">
          {platformNames[metrics.platform]}
        </span>
      </div>

      {/* Metrics */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-2xl font-semibold text-foreground">
              {metrics.postsThisWeek}
            </p>
            <p className="text-xs text-text-secondary">Posted</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-foreground">
              {metrics.scheduled}
            </p>
            <p className="text-xs text-text-secondary">Scheduled</p>
          </div>
          <div>
            <p className={`text-2xl font-semibold ${engagementColors[metrics.engagementEstimate]}`}>
              {metrics.engagementEstimate}
            </p>
            <p className="text-xs text-text-secondary">Engagement</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PlatformActivityGridProps {
  platformMetrics: PlatformMetrics[];
}

export function PlatformActivityGrid({ platformMetrics }: PlatformActivityGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {platformMetrics.map((pm) => (
        <PlatformCard key={pm.platform} metrics={pm} />
      ))}
    </div>
  );
}

// Skeleton loader
export function PlatformActivityGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="card animate-pulse"
        >
          <div className="h-12 rounded-t-xl skeleton" />
          <div className="p-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="h-8 w-8 rounded skeleton" />
                <div className="mt-1 h-3 w-12 rounded skeleton" />
              </div>
              <div>
                <div className="h-8 w-8 rounded skeleton" />
                <div className="mt-1 h-3 w-12 rounded skeleton" />
              </div>
              <div>
                <div className="h-8 w-8 rounded skeleton" />
                <div className="mt-1 h-3 w-12 rounded skeleton" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
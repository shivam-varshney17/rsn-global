'use client';

import { type IdeaItem, platformColors, platformNames, skeletonNames, stageNames, type Platform } from './types';
import { MessageCircle } from 'lucide-react';
import { LinkedinIcon, TwitterIcon, InstagramIcon } from '@/components/icons/PlatformIcons';

const platformIcons: Record<Platform, React.ElementType> = {
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
  reddit: MessageCircle,
  instagram: InstagramIcon,
};

const skeletonBadgeColors: Record<string, string> = {
  replacement_stack: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  product_intro: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  revenue_proof: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  arsenal_drop: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  system_drop: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
  contrarian_take: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
  tool_stack: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  framework_education: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
  founder_arc: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  short_raw: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200',
};

const statusColors: Record<string, string> = {
  draft: 'bg-surface-tertiary text-text-secondary',
  in_review: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
  approved: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  scheduled: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  published: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
};

interface RecentIdeasFeedProps {
  ideas: IdeaItem[];
}

export function RecentIdeasFeed({ ideas }: RecentIdeasFeedProps) {
  return (
    <div className="flex flex-col gap-3">
      {ideas.map((idea) => (
        <div
          key={idea.id}
          className="card flex items-center justify-between gap-4"
        >
          {/* Left: content info */}
          <div className="min-w-0 flex-1">
            <p className="font-medium text-foreground line-clamp-1">
              {idea.title}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              {/* Skeleton badge */}
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                  skeletonBadgeColors[idea.skeleton] || 'bg-surface-tertiary text-text-secondary'
                }`}
              >
                {skeletonNames[idea.skeleton]}
              </span>

              {/* Status badge */}
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                  statusColors[idea.status] || 'bg-surface-tertiary text-text-secondary'
                }`}
              >
                {stageNames[idea.status]}
              </span>
            </div>
          </div>

          {/* Right: platform icons */}
          <div className="flex items-center gap-1.5">
            {idea.platforms.map((platform) => {
              const Icon = platformIcons[platform];
              return (
                <div
                  key={platform}
                  className="flex h-7 w-7 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${platformColors[platform]}15` }}
                  title={platformNames[platform]}
                >
                  <Icon
                    className="h-3.5 w-3.5"
                    style={{ color: platformColors[platform] }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// Skeleton loader
export function RecentIdeasFeedSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="card flex items-center justify-between gap-4"
        >
          <div className="min-w-0 flex-1">
            <div className="h-5 w-3/4 rounded skeleton" />
            <div className="mt-2 flex gap-2">
              <div className="h-5 w-24 rounded-full skeleton" />
              <div className="h-5 w-20 rounded-full skeleton" />
            </div>
          </div>
          <div className="flex gap-1.5">
            <div className="h-7 w-7 rounded-full skeleton" />
            <div className="h-7 w-7 rounded-full skeleton" />
            <div className="h-7 w-7 rounded-full skeleton" />
          </div>
        </div>
      ))}
    </div>
  );
}
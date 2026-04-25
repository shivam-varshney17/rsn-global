"use client";

import { useState, useMemo } from "react";
import { CalendarDays, Clock, MessageSquare } from "lucide-react";
import { LinkedinIcon, TwitterIcon, InstagramIcon } from "@/components/icons/PlatformIcons";
import CalendarGrid, { CalendarPost } from "@/components/calendar/CalendarGrid";

// Mock data for scheduled posts
const mockPosts: CalendarPost[] = [
  {
    id: "p1",
    platform: "linkedin",
    contentPreview: "We replaced our $200K SDR team with an AI agent. Here's the full setup.",
    scheduledTime: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 1,
      8,
      0
    ).toISOString(),
    status: "scheduled",
  },
  {
    id: "p2",
    platform: "twitter",
    contentPreview: "Hot take: LinkedIn carousels are dead. Short-form video wins now.",
    scheduledTime: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 1,
      10,
      0
    ).toISOString(),
    status: "scheduled",
  },
  {
    id: "p3",
    platform: "instagram",
    contentPreview: "The 5 levels of content automation maturity. Which level are you at?",
    scheduledTime: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 2,
      12,
      0
    ).toISOString(),
    status: "scheduled",
  },
  {
    id: "p4",
    platform: "linkedin",
    contentPreview: "After testing 47 AI tools, here's what's actually production-ready.",
    scheduledTime: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 3,
      8,
      30
    ).toISOString(),
    status: "scheduled",
  },
  {
    id: "p5",
    platform: "reddit",
    contentPreview: "I built a content pipeline that generates 100 posts per day. Here's the architecture.",
    scheduledTime: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 3,
      14,
      0
    ).toISOString(),
    status: "scheduled",
  },
  {
    id: "p6",
    platform: "twitter",
    contentPreview: "$47K last month. No sales team. No ads. Just automated content that compounds.",
    scheduledTime: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 4,
      9,
      0
    ).toISOString(),
    status: "scheduled",
  },
  {
    id: "p7",
    platform: "linkedin",
    contentPreview: "Introducing AryanStack — the complete AI-powered content production system.",
    scheduledTime: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 5,
      8,
      0
    ).toISOString(),
    status: "draft",
  },
  {
    id: "p8",
    platform: "instagram",
    contentPreview: "We fired our marketing team. And replaced them with this.",
    scheduledTime: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 6,
      11,
      0
    ).toISOString(),
    status: "scheduled",
  },
  {
    id: "p9",
    platform: "linkedin",
    contentPreview: "This system made me $47K last month. No sales team. The breakdown.",
    scheduledTime: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 8,
      8,
      0
    ).toISOString(),
    status: "scheduled",
  },
  {
    id: "p10",
    platform: "twitter",
    contentPreview: "Tested 47 AI tools for content production. Only 4 survived.",
    scheduledTime: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 10,
      10,
      0
    ).toISOString(),
    status: "scheduled",
  },
];

const platformConfig: Record<
  CalendarPost["platform"],
  { label: string; color: string; Icon: React.ComponentType<{ size?: number }> }
> = {
  linkedin: { label: "LinkedIn", color: "bg-blue-600", Icon: LinkedinIcon },
  twitter: { label: "Twitter", color: "bg-black", Icon: TwitterIcon },
  reddit: { label: "Reddit", color: "bg-orange-500", Icon: MessageSquare },
  instagram: {
    label: "Instagram",
    color: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400",
    Icon: InstagramIcon,
  },
};

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function CalendarPage() {
  const [posts] = useState<CalendarPost[]>(mockPosts);

  // Get upcoming posts for the sidebar (next 7 days)
  const upcomingPosts = useMemo(() => {
    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    return posts
      .filter((post) => {
        const postDate = new Date(post.scheduledTime);
        return postDate >= now && postDate <= weekFromNow;
      })
      .sort(
        (a, b) =>
          new Date(a.scheduledTime).getTime() -
          new Date(b.scheduledTime).getTime()
      );
  }, [posts]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <CalendarDays className="w-8 h-8 text-gray-400" />
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Content Calendar
              </h1>
              <p className="text-sm text-gray-500">
                {posts.length} posts scheduled
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Main calendar */}
          <div className="flex-1">
            <CalendarGrid posts={posts} />

            {/* Platform legend */}
            <div className="mt-4 flex items-center gap-4">
              <span className="text-xs text-gray-500">Platforms:</span>
              {Object.entries(platformConfig).map(([key, config]) => (
                <div
                  key={key}
                  className="flex items-center gap-1.5 text-xs text-gray-600"
                >
                  <span
                    className={`w-2 h-2 rounded-full ${config.color}`}
                  />
                  {config.label}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar: upcoming posts */}
          <div className="w-72 shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden sticky top-6">
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">
                    Upcoming Posts
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">Next 7 days</p>
              </div>

              <div className="divide-y divide-gray-100 max-h-[calc(100vh-200px)] overflow-y-auto">
                {upcomingPosts.length === 0 ? (
                  <div className="px-4 py-6 text-center text-sm text-gray-500">
                    No upcoming posts
                  </div>
                ) : (
                  upcomingPosts.map((post) => {
                    const config = platformConfig[post.platform];
                    return (
                      <div key={post.id} className="px-4 py-3 hover:bg-gray-50">
                        {/* Platform badge */}
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs text-white ${config.color}`}
                          >
                            <config.Icon size={10} />
                            {config.label}
                          </span>
                        </div>

                        {/* Content preview */}
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {post.contentPreview}
                        </p>

                        {/* Date/time */}
                        <p className="text-xs text-gray-400 mt-1">
                          {formatDate(new Date(post.scheduledTime))} at{" "}
                          {formatTime(post.scheduledTime)}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
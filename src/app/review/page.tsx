"use client";

import { useState, useMemo } from "react";
import {
  Check,
  RotateCcw,
  Filter,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react";
import ReviewItem, {
  ReviewItemData,
  Platform,
  SkeletonType,
} from "@/components/review/ReviewItem";

// Mock data
const mockReviewItems: ReviewItemData[] = [
  {
    id: "1",
    content:
      "We replaced our $200K SDR team with an AI agent that runs 24/7. Claude + n8n + Apollo. Setup took 3 hours. It generates 1,000 personalized emails per day with an 18% reply rate. $340K pipeline in 90 days. No cold callers. No SDR salaries. No ramp time.",
    platforms: ["linkedin", "twitter"],
    skeletonType: "replacement-stack",
    ideaContext: "AI SDR agent replacing sales team",
    submittedBy: "Content Agent",
    submittedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    status: "pending",
  },
  {
    id: "2",
    content:
      "Hot take: LinkedIn carousels are dead. Nobody reads 10 slides anymore. The algorithm buries them. Short-form video wins now. Here's the data from our last 30 posts: Reels got 5x more saves. Carousels got 2x more comments but 10x fewer shares.",
    platforms: ["linkedin", "instagram"],
    skeletonType: "contrarian-hot-take",
    ideaContext: "Contrarian take on LinkedIn content formats",
    submittedBy: "Content Agent",
    submittedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    status: "pending",
  },
  {
    id: "3",
    content:
      "Introducing AryanStack — the complete AI-powered content production system. Four platforms. One core idea. 47 seconds to generate platform-native content. Features: bulk text generation, image synthesis, video clips, voiceovers, music creation, and automated publishing via n8n workflows.",
    platforms: ["linkedin", "twitter", "instagram"],
    skeletonType: "product-intro",
    ideaContext: "Product intro for AryanStack",
    submittedBy: "Content Agent",
    submittedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
    status: "pending",
  },
  {
    id: "4",
    content:
      "After testing 47 AI tools for content production, here's what's actually production-ready: MiniMax for text/image/video/music generation, Remotion for video assembly, n8n for automation, Claude for orchestration. Everything else is either too slow, too expensive, or not ready for primetime.",
    platforms: ["linkedin", "twitter", "reddit"],
    skeletonType: "arsenal-drop",
    ideaContext: "Tool stack comparison for content production",
    submittedBy: "Content Agent",
    submittedAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(), // 26 hours ago
    status: "pending",
  },
  {
    id: "5",
    content:
      "This system made me $47K last month. No sales team. No ads. Just automated content that compounds. The trick: one core idea becomes four platform-native posts in under 2 minutes. LinkedIn, Twitter, Reddit, Instagram. Same insight. Different format.",
    platforms: ["linkedin", "twitter"],
    skeletonType: "revenue-proof",
    ideaContext: "Revenue proof post about automated content",
    submittedBy: "Content Agent",
    submittedAt: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(), // 30 hours ago
    status: "pending",
  },
  {
    id: "6",
    content:
      "The 5 levels of content automation maturity. Level 1: Manual posting. Level 2: Content calendar with scheduling. Level 3: AI-assisted content generation. Level 4: Multi-platform auto-repurposing. Level 5: Full pipeline with automated publishing and engagement. Most creators are at Level 2.",
    platforms: ["linkedin", "twitter", "instagram"],
    skeletonType: "framework-education",
    ideaContext: "Content automation maturity framework",
    submittedBy: "Content Agent",
    submittedAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(), // 36 hours ago
    status: "pending",
  },
];

const allPlatforms: Platform[] = ["linkedin", "twitter", "reddit", "instagram"];
const allSkeletonTypes: SkeletonType[] = [
  "replacement-stack",
  "product-intro",
  "revenue-proof",
  "arsenal-drop",
  "system-drop",
  "contrarian-hot-take",
  "tool-stack",
  "framework-education",
  "founder-arc",
  "short-raw",
];

const skeletonLabels: Record<SkeletonType, string> = {
  "replacement-stack": "Replacement Stack",
  "product-intro": "Product Intro",
  "revenue-proof": "Revenue Proof",
  "arsenal-drop": "Arsenal Drop",
  "system-drop": "System Drop",
  "contrarian-hot-take": "Contrarian Hot Take",
  "tool-stack": "Tool Stack",
  "framework-education": "Framework Education",
  "founder-arc": "Founder Arc",
  "short-raw": "Short Raw",
};

export default function ReviewPage() {
  const [items, setItems] = useState<ReviewItemData[]>(mockReviewItems);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [platformFilter, setPlatformFilter] = useState<Platform | "all">("all");
  const [skeletonFilter, setSkeletonFilter] = useState<SkeletonType | "all">(
    "all"
  );
  const [dateRange, setDateRange] = useState<"all" | "24hr" | "48hr" | "week">(
    "all"
  );
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Platform filter
      if (platformFilter !== "all") {
        if (!item.platforms.includes(platformFilter)) return false;
      }

      // Skeleton type filter
      if (skeletonFilter !== "all") {
        if (item.skeletonType !== skeletonFilter) return false;
      }

      // Date range filter
      if (dateRange !== "all") {
        const now = new Date();
        const submitted = new Date(item.submittedAt);
        const diffHours = (now.getTime() - submitted.getTime()) / (1000 * 60 * 60);

        if (dateRange === "24hr" && diffHours > 24) return false;
        if (dateRange === "48hr" && diffHours > 48) return false;
        if (dateRange === "week" && diffHours > 24 * 7) return false;
      }

      return true;
    });
  }, [items, platformFilter, skeletonFilter, dateRange]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredItems.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredItems.map((item) => item.id)));
    }
  };

  const handleApprove = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "approved" as const } : item
      )
    );
    setActiveItemId(null);
  };

  const handleApproveSelected = () => {
    setItems((prev) =>
      prev.map((item) =>
        selectedIds.has(item.id) ? { ...item, status: "approved" as const } : item
      )
    );
    setSelectedIds(new Set());
  };

  const handleRequestChanges = (id: string, feedback: string) => {
    console.log(`Changes requested for ${id}: ${feedback}`);
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "changes-requested" as const } : item
      )
    );
    setActiveItemId(null);
  };

  const handleRequestChangesSelected = () => {
    const feedback = "Bulk changes requested";
    setItems((prev) =>
      prev.map((item) =>
        selectedIds.has(item.id)
          ? { ...item, status: "changes-requested" as const }
          : item
      )
    );
    setSelectedIds(new Set());
  };

  const handleSkip = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "skipped" as const } : item
      )
    );
    setActiveItemId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <CalendarDays className="w-8 h-8 text-gray-400" />
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Review Inbox
              </h1>
              <p className="text-sm text-gray-500">
                {filteredItems.length} items pending review
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Filter bar */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filters</span>
          </div>

          <div className="flex flex-wrap gap-4">
            {/* Platform filter */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Platform
              </label>
              <select
                value={platformFilter}
                onChange={(e) =>
                  setPlatformFilter(e.target.value as Platform | "all")
                }
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Platforms</option>
                {allPlatforms.map((p) => (
                  <option key={p} value={p}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Skeleton type filter */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Skeleton Type
              </label>
              <select
                value={skeletonFilter}
                onChange={(e) =>
                  setSkeletonFilter(e.target.value as SkeletonType | "all")
                }
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                {allSkeletonTypes.map((s) => (
                  <option key={s} value={s}>
                    {skeletonLabels[s]}
                  </option>
                ))}
              </select>
            </div>

            {/* Date range filter */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Date Range
              </label>
              <select
                value={dateRange}
                onChange={(e) =>
                  setDateRange(
                    e.target.value as "all" | "24hr" | "48hr" | "week"
                  )
                }
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Time</option>
                <option value="24hr">Last 24 Hours</option>
                <option value="48hr">Last 48 Hours</option>
                <option value="week">Last Week</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bulk actions */}
        {selectedIds.size > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">
                {selectedIds.size} item
                {selectedIds.size > 1 ? "s" : ""} selected
              </span>
              <div className="flex gap-3">
                <button
                  onClick={handleApproveSelected}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Check size={14} />
                  Approve Selected
                </button>
                <button
                  onClick={handleRequestChangesSelected}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  <RotateCcw size={14} />
                  Request Changes on Selected
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Review items list */}
        <div className="space-y-4">
          {/* Select all header */}
          <div className="flex items-center gap-2 px-1">
            <input
              type="checkbox"
              checked={
                filteredItems.length > 0 &&
                selectedIds.size === filteredItems.length
              }
              onChange={toggleSelectAll}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-sm text-gray-500">
              Select all ({filteredItems.length})
            </span>
          </div>

          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <p className="text-gray-500">No items match your filters.</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <ReviewItem
                key={item.id}
                item={item}
                isSelected={selectedIds.has(item.id)}
                onToggleSelect={toggleSelect}
                onApprove={handleApprove}
                onRequestChanges={handleRequestChanges}
                onSkip={handleSkip}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
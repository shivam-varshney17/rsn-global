"use client";

import { useEffect, useRef } from "react";
import {
  Clock,
  CheckCircle,
  X,
} from "lucide-react";
import { LinkedinIcon, TwitterIcon, InstagramIcon } from "@/components/icons/PlatformIcons";
import { useRouter } from "next/navigation";

export interface ScheduledPost {
  id: string;
  platform: "linkedin" | "twitter" | "reddit" | "instagram";
  contentPreview: string;
  scheduledTime: string;
  status: "scheduled" | "published" | "draft";
}

interface PostPopoverProps {
  date: Date;
  posts: ScheduledPost[];
  position: { top: number; left: number };
  onClose: () => void;
}

const platformConfig: Record<
  ScheduledPost["platform"],
  {
    label: string;
    color: string;
    Icon: React.ComponentType<{ size?: number }>;
  }
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

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function PostPopover({
  date,
  posts,
  position,
  onClose,
}: PostPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    // Close on Escape
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handlePostClick = (postId: string) => {
    // Navigate to post detail
    router.push(`/posts/${postId}`);
    onClose();
  };

  return (
    <div
      ref={popoverRef}
      className="fixed z-50 w-72 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
      style={{ top: position.top, left: position.left }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-gray-400" />
          <span className="text-sm font-medium text-gray-900">
            {formatDate(date)}
          </span>
          <span className="text-xs text-gray-500">
            {posts.length} post{posts.length !== 1 ? "s" : ""}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
        >
          <X size={14} />
        </button>
      </div>

      {/* Posts list */}
      <div className="max-h-64 overflow-y-auto">
        {posts.length === 0 ? (
          <div className="px-4 py-6 text-center text-sm text-gray-500">
            No posts scheduled for this day
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {posts.map((post) => {
              const config = platformConfig[post.platform];
              return (
                <div
                  key={post.id}
                  onClick={() => handlePostClick(post.id)}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                >
                  {/* Platform + status */}
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs text-white ${config.color}`}
                    >
                      <config.Icon size={10} />
                      {config.label}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-xs ${
                        post.status === "published"
                          ? "text-green-600"
                          : post.status === "scheduled"
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      {post.status === "published" ? (
                        <CheckCircle size={10} />
                      ) : (
                        <Clock size={10} />
                      )}
                      {post.status.charAt(0).toUpperCase() +
                        post.status.slice(1)}
                    </span>
                  </div>

                  {/* Content preview */}
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {post.contentPreview.length > 50
                      ? post.contentPreview.slice(0, 50) + "..."
                      : post.contentPreview}
                  </p>

                  {/* Scheduled time */}
                  <p className="text-xs text-gray-400 mt-1">
                    {formatTime(post.scheduledTime)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

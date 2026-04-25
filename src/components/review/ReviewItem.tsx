"use client";

import { useState } from "react";
import {
  Check,
  RotateCcw,
  SkipForward,
  ChevronDown,
  ChevronUp,
  MessageSquare,
} from "lucide-react";
import { LinkedinIcon, TwitterIcon, InstagramIcon } from "@/components/icons/PlatformIcons";

export type Platform = "linkedin" | "twitter" | "reddit" | "instagram";

export type SkeletonType =
  | "replacement-stack"
  | "product-intro"
  | "revenue-proof"
  | "arsenal-drop"
  | "system-drop"
  | "contrarian-hot-take"
  | "tool-stack"
  | "framework-education"
  | "founder-arc"
  | "short-raw";

export interface ReviewItemData {
  id: string;
  content: string;
  platforms: Platform[];
  skeletonType: SkeletonType;
  ideaContext: string;
  submittedBy: string;
  submittedAt: string; // ISO string
  status: "pending" | "approved" | "changes-requested" | "skipped";
}

interface ReviewItemProps {
  item: ReviewItemData;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onApprove: (id: string) => void;
  onRequestChanges: (id: string, feedback: string) => void;
  onSkip: (id: string) => void;
}

const platformConfig: Record<
  Platform,
  { label: string; color: string; Icon: React.ComponentType<{ size?: number }> }
> = {
  linkedin: { label: "LinkedIn", color: "bg-blue-600", Icon: LinkedinIcon },
  twitter: { label: "Twitter", color: "bg-black", Icon: TwitterIcon },
  reddit: { label: "Reddit", color: "bg-orange-500", Icon: MessageSquare },
  instagram: { label: "Instagram", color: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400", Icon: InstagramIcon },
};

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

function getAgeIndicator(submittedAt: string): {
  color: string;
  bgColor: string;
  label: string;
} {
  const now = new Date();
  const submitted = new Date(submittedAt);
  const diffMs = now.getTime() - submitted.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours < 2) {
    return { color: "text-green-600", bgColor: "bg-green-100", label: "<2hr" };
  } else if (diffHours < 24) {
    return { color: "text-yellow-600", bgColor: "bg-yellow-100", label: "<24hr" };
  } else {
    return { color: "text-red-600", bgColor: "bg-red-100", label: ">24hr" };
  }
}

function formatTimestamp(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function ReviewItem({
  item,
  isSelected,
  onToggleSelect,
  onApprove,
  onRequestChanges,
  onSkip,
}: ReviewItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFeedbackInput, setShowFeedbackInput] = useState(false);
  const [feedback, setFeedback] = useState("");

  const age = getAgeIndicator(item.submittedAt);

  const handleRequestChanges = () => {
    if (feedback.trim()) {
      onRequestChanges(item.id, feedback);
      setFeedback("");
      setShowFeedbackInput(false);
    }
  };

  return (
    <div
      className={`border rounded-lg p-4 transition-colors ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      {/* Header row */}
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(item.id)}
          className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
        />

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Top row: platforms + skeleton + age */}
          <div className="flex items-center gap-2 flex-wrap">
            {item.platforms.map((platform) => {
              const config = platformConfig[platform];
              return (
                <span
                  key={platform}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs text-white ${config.color}`}
                >
                  <config.Icon size={12} />
                  {config.label}
                </span>
              );
            })}
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              {skeletonLabels[item.skeletonType]}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded font-medium ${age.color} ${age.bgColor}`}
            >
              {age.label}
            </span>
          </div>

          {/* Content preview */}
          <p className="mt-2 text-sm text-gray-900 line-clamp-2">{item.content}</p>

          {/* Meta row */}
          <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
            <span>by {item.submittedBy}</span>
            <span>{formatTimestamp(item.submittedAt)}</span>
          </div>

          {/* Idea context */}
          {item.ideaContext && (
            <p className="mt-1 text-xs text-gray-400 italic">
              Idea: {item.ideaContext}
            </p>
          )}
        </div>

        {/* Expand/collapse */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 text-gray-400 hover:text-gray-600"
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="mt-4 pl-7">
          {/* Full content */}
          <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-800 whitespace-pre-wrap">
            {item.content}
          </div>

          {/* Feedback input for request changes */}
          {showFeedbackInput && (
            <div className="mt-3">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Describe what changes are needed..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
              />
              <div className="mt-2 flex gap-2">
                <button
                  onClick={handleRequestChanges}
                  disabled={!feedback.trim()}
                  className="px-3 py-1.5 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Feedback
                </button>
                <button
                  onClick={() => {
                    setShowFeedbackInput(false);
                    setFeedback("");
                  }}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => onApprove(item.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Check size={14} />
              Approve
            </button>
            <button
              onClick={() => setShowFeedbackInput(!showFeedbackInput)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              <RotateCcw size={14} />
              Request Changes
            </button>
            <button
              onClick={() => onSkip(item.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
            >
              <SkipForward size={14} />
              Skip
            </button>
          </div>

          {/* Keyboard shortcut hints */}
          <div className="mt-3 text-xs text-gray-400">
            <span className="font-mono">A</span> to approve,{" "}
            <span className="font-mono">R</span> for revisions,{" "}
            <span className="font-mono">S</span> to skip
          </div>
        </div>
      )}
    </div>
  );
}
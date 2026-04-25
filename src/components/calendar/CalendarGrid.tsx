"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Clock, CheckCircle } from "lucide-react";
import PostPopover, { ScheduledPost } from "./PostPopover";

export interface CalendarPost {
  id: string;
  platform: "linkedin" | "twitter" | "reddit" | "instagram";
  contentPreview: string;
  scheduledTime: string; // ISO string
  status: "scheduled" | "published" | "draft";
}

interface CalendarGridProps {
  posts: CalendarPost[];
}

const PLATFORM_COLORS: Record<string, string> = {
  linkedin: "bg-blue-600",
  twitter: "bg-black",
  reddit: "bg-orange-500",
  instagram: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400",
};

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

export default function CalendarGrid({ posts }: CalendarGridProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [popoverPosition, setPopoverPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

  const calendarDays = useMemo(() => {
    const days: (Date | null)[] = [];

    // Pad the beginning with nulls for empty cells
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(currentYear, currentMonth, day));
    }

    return days;
  }, [currentYear, currentMonth, daysInMonth, firstDayOfMonth]);

  const postsByDay = useMemo(() => {
    const map = new Map<string, CalendarPost[]>();

    posts.forEach((post) => {
      const postDate = new Date(post.scheduledTime);
      const key = `${postDate.getFullYear()}-${postDate.getMonth()}-${postDate.getDate()}`;
      const existing = map.get(key) || [];
      map.set(key, [...existing, post]);
    });

    return map;
  }, [posts]);

  const goToPrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDayClick = (
    day: Date,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setSelectedDay(day);
    const rect = event.currentTarget.getBoundingClientRect();
    setPopoverPosition({
      top: rect.bottom + 8,
      left: Math.max(rect.left, window.innerWidth - 300),
    });
  };

  const handleClosePopover = () => {
    setSelectedDay(null);
    setPopoverPosition(null);
  };

  const getPostsForDay = (day: Date): ScheduledPost[] => {
    const key = `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`;
    const dayPosts = postsByDay.get(key) || [];
    return dayPosts.map((p) => ({
      id: p.id,
      platform: p.platform,
      contentPreview: p.contentPreview,
      scheduledTime: p.scheduledTime,
      status: p.status,
    }));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Calendar header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-gray-900">
            {MONTHS[currentMonth]} {currentYear}
          </h2>
          <button
            onClick={goToToday}
            className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 border border-gray-300 rounded hover:bg-gray-50"
          >
            Today
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevMonth}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="p-2 text-center text-xs font-medium text-gray-500 uppercase"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {calendarDays.map((day, index) => {
          if (day === null) {
            return (
              <div
                key={`empty-${index}`}
                className="min-h-24 border border-gray-100 bg-gray-50"
              />
            );
          }

          const dayPosts = getPostsForDay(day);
          const isCurrentDay = isToday(day);
          const isSelected =
            selectedDay !== null && isSameDay(day, selectedDay);

          return (
            <div
              key={day.toISOString()}
              onClick={(e) => handleDayClick(day, e)}
              className={`min-h-24 border border-gray-100 p-1.5 cursor-pointer transition-colors ${
                isSelected
                  ? "bg-blue-50"
                  : isCurrentDay
                  ? "bg-blue-50/50 hover:bg-blue-100"
                  : "hover:bg-gray-50"
              } ${isCurrentDay ? "ring-2 ring-blue-500 ring-inset" : ""}`}
            >
              {/* Day number */}
              <div
                className={`text-xs font-medium mb-1 ${
                  isCurrentDay
                    ? "text-blue-600"
                    : "text-gray-700"
                }`}
              >
                {day.getDate()}
              </div>

              {/* Platform dots */}
              <div className="flex flex-wrap gap-1">
                {dayPosts.slice(0, 4).map((post) => (
                  <div
                    key={post.id}
                    className={`w-2 h-2 rounded-full ${PLATFORM_COLORS[post.platform]}`}
                    title={`${post.platform}: ${post.contentPreview}`}
                  />
                ))}
                {dayPosts.length > 4 && (
                  <span className="text-[10px] text-gray-400">
                    +{dayPosts.length - 4}
                  </span>
                )}
              </div>

              {/* Post count badge on hover would be shown via CSS */}
            </div>
          );
        })}
      </div>

      {/* Popover */}
      {selectedDay && popoverPosition && (
        <PostPopover
          date={selectedDay}
          posts={getPostsForDay(selectedDay)}
          position={popoverPosition}
          onClose={handleClosePopover}
        />
      )}
    </div>
  );
}

"use client";

import { Bell, Plus, ChevronDown } from "lucide-react";
import { useState } from "react";

export function TopBar() {
  const [notificationCount] = useState(3);
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="fixed top-0 right-0 left-0 md:left-[260px] h-16 bg-surface/80 backdrop-blur-sm border-b border-border z-30 transition-all duration-200">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Left side - Date */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-text-secondary">
            <span className="text-sm">{dateStr}</span>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          {/* New Idea button */}
          <button className="btn btn-primary h-9 px-4">
            <Plus size={16} />
            <span className="hidden sm:inline">New Idea</span>
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-surface-hover text-text-secondary hover:text-foreground transition-colors">
            <Bell size={20} />
            {notificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold text-white bg-error rounded-full px-1">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </button>

          {/* User menu */}
          <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-hover transition-colors">
            <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
              <span className="text-sm font-medium text-accent">S</span>
            </div>
            <ChevronDown size={14} className="text-text-muted hidden md:block" />
          </button>
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ListTodo,
  Inbox,
  Calendar,
  Lightbulb,
  GitBranch,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { LinkedinIcon, TwitterIcon, RedditIcon, InstagramIcon } from "@/components/icons/PlatformIcons";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/queue", label: "Content Queue", icon: ListTodo },
  { href: "/inbox", label: "Review Inbox", icon: Inbox },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/ideas", label: "Ideas", icon: Lightbulb },
  { href: "/pipelines", label: "Platform Pipelines", icon: GitBranch },
  { href: "/settings", label: "Settings", icon: Settings },
];

const platformFilters = [
  { id: "linkedin", label: "LinkedIn", icon: LinkedinIcon, color: "#0A66C2" },
  { id: "twitter", label: "Twitter/X", icon: TwitterIcon, color: "#000000" },
  { id: "reddit", label: "Reddit", icon: RedditIcon, color: "#FF4500" },
  { id: "instagram", label: "Instagram", icon: InstagramIcon, color: "#E1306C" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-surface border border-border md:hidden hover:bg-surface-hover transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-surface border-r border-border z-40
          transition-all duration-200 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${isCollapsed ? "w-[72px]" : "w-[260px]"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo area */}
          <div className={`flex items-center h-16 px-4 border-b border-border ${isCollapsed ? "justify-center" : "justify-between"}`}>
            {!isCollapsed && (
              <span className="text-lg font-semibold text-foreground">ContentOS</span>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-md hover:bg-surface-hover text-text-secondary transition-colors hidden md:block"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <Menu size={18} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4 px-3 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg
                        transition-all duration-150
                        ${isCollapsed ? "justify-center" : ""}
                        ${isActive
                          ? "bg-accent/10 text-accent border border-accent/20"
                          : "text-text-secondary hover:text-foreground hover:bg-surface-hover border border-transparent"
                        }
                      `}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <item.icon size={20} className="flex-shrink-0" />
                      {!isCollapsed && (
                        <span className="text-sm font-medium">{item.label}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Platform filters */}
            {!isCollapsed && (
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-xs font-medium text-text-muted uppercase tracking-wider px-3 mb-3">
                  Platform Filters
                </p>
                <div className="space-y-1">
                  {platformFilters.map((platform) => (
                    <button
                      key={platform.id}
                      className="platform-chip w-full justify-start"
                    >
                      <platform.icon size={14} style={{ color: platform.color }} />
                      <span>{platform.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </nav>

          {/* Collapse toggle on mobile */}
          <div className="p-3 border-t border-border md:hidden">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="btn btn-ghost w-full justify-center"
            >
              <Menu size={18} />
              <span className="text-sm">{isCollapsed ? "Expand" : "Collapse"}</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
  Rocket,
  LayoutDashboard,
  MessageSquare,
  Calendar,
  Users,
  Kanban,
  CreditCard,
  Bot,
  Megaphone,
  Workflow,
  Globe,
  GraduationCap,
  FolderOpen,
  Star,
  BarChart3,
  Store,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export function SubAccountSidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar, activeLocationId, subAccounts, conversations } = useAppStore();

  const activeSubAccount = subAccounts.find((s) => s.id === activeLocationId) || subAccounts[0];
  const totalUnreadConversations = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  const navItems = [
    { label: "Launchpad", href: `/${activeLocationId}/launchpad`, icon: Rocket },
    { label: "Dashboard", href: `/${activeLocationId}/dashboard`, icon: LayoutDashboard },
    {
      label: "Conversations",
      href: `/${activeLocationId}/conversations`,
      icon: MessageSquare,
      badge: totalUnreadConversations > 0 ? totalUnreadConversations : undefined,
    },
    { label: "Calendars", href: `/${activeLocationId}/calendars`, icon: Calendar },
    { label: "Contacts", href: `/${activeLocationId}/contacts`, icon: Users },
    { label: "Opportunities", href: `/${activeLocationId}/opportunities`, icon: Kanban },
    { label: "Payments", href: `/${activeLocationId}/payments`, icon: CreditCard },
    { label: "AI Agents", href: `/${activeLocationId}/ai-agents`, icon: Bot, highlight: true },
    { label: "Marketing", href: `/${activeLocationId}/marketing`, icon: Megaphone },
    { label: "Automation", href: `/${activeLocationId}/automation`, icon: Workflow },
    { label: "Sites", href: `/${activeLocationId}/sites`, icon: Globe },
    { label: "Memberships", href: `/${activeLocationId}/memberships`, icon: GraduationCap },
    { label: "Media Storage", href: `/${activeLocationId}/media`, icon: FolderOpen },
    { label: "Reputation", href: `/${activeLocationId}/reputation`, icon: Star },
    { label: "Reporting", href: `/${activeLocationId}/reporting`, icon: BarChart3 },
    { label: "App Marketplace", href: `/${activeLocationId}/marketplace`, icon: Store },
  ];

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-slate-800 bg-[#111827] text-slate-300 transition-all duration-200 select-none",
        sidebarCollapsed ? "w-16" : "w-56"
      )}
    >
      {/* Top Brand Banner */}
      <div className="flex h-14 items-center justify-between px-3 border-b border-slate-800">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm shadow-md">
              HL
            </div>
            <div className="truncate">
              <div className="truncate text-xs font-semibold text-white tracking-wide">
                {activeSubAccount.name}
              </div>
              <div className="text-[10px] text-emerald-400 font-medium">
                ${activeSubAccount.walletBalance.toFixed(2)} Balance
              </div>
            </div>
          </div>
        )}
        {sidebarCollapsed && (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
            HL
          </div>
        )}
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-md px-2.5 py-2 text-xs font-medium transition-colors",
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:bg-slate-800/80 hover:text-white"
              )}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors",
                  isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                )}
              />
              {!sidebarCollapsed && (
                <span className="flex-1 truncate">{item.label}</span>
              )}
              {!sidebarCollapsed && item.badge && (
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {item.badge}
                </span>
              )}
              {!sidebarCollapsed && item.highlight && (
                <span className="flex items-center text-[10px] text-amber-400 font-medium bg-amber-400/10 px-1.5 py-0.5 rounded">
                  <Sparkles className="h-2.5 w-2.5 mr-0.5" /> AI
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Settings Link & Collapse Toggle */}
      <div className="border-t border-slate-800 p-2 space-y-1">
        <Link
          href={`/${activeLocationId}/settings`}
          className={cn(
            "group flex items-center gap-3 rounded-md px-2.5 py-2 text-xs font-medium transition-colors",
            pathname?.includes("/settings")
              ? "bg-blue-600 text-white"
              : "text-slate-400 hover:bg-slate-800/80 hover:text-white"
          )}
          title={sidebarCollapsed ? "Settings" : undefined}
        >
          <Settings className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-slate-200" />
          {!sidebarCollapsed && <span className="flex-1 truncate">Settings</span>}
        </Link>

        <button
          onClick={toggleSidebar}
          className="flex w-full items-center justify-center rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ChevronLeft className="h-4 w-4" />
              <span>Collapse</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}

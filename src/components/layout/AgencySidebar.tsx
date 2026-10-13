"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
  Building2,
  DollarSign,
  Layers,
  Search,
  Users2,
  Sparkles,
  Store,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

export function AgencySidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { agency, sidebarCollapsed, toggleSidebar, activeLocationId, toggleAgencyView } = useAppStore();

  const navItems = [
    { label: "Sub-Accounts", href: "/agency/accounts", icon: Building2 },
    { label: "SaaS Configurator", href: "/agency/saas-configurator", icon: DollarSign, highlight: true },
    { label: "Snapshots", href: "/agency/snapshots", icon: Layers },
    { label: "Prospecting Tool", href: "/agency/prospecting", icon: Search },
    { label: "Affiliate Portal", href: "/agency/affiliates", icon: Users2 },
    { label: "Reselling", href: "/agency/reselling", icon: Store },
    { label: "Settings", href: "/agency/settings", icon: Settings },
  ];

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-purple-900/50 bg-[#0f0c1b] text-slate-300 transition-all duration-200 select-none",
        sidebarCollapsed ? "w-16" : "w-56"
      )}
    >
      {/* Top Brand Banner */}
      <div className="flex h-14 items-center justify-between px-3 border-b border-purple-900/40">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold text-sm shadow-md">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="truncate">
              <div className="truncate text-xs font-semibold text-white tracking-wide">
                {agency.name}
              </div>
              <div className="text-[10px] text-purple-400 font-medium">
                Agency Super-Admin
              </div>
            </div>
          </div>
        )}
        {sidebarCollapsed && (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 text-white">
            <ShieldCheck className="h-4 w-4" />
          </div>
        )}
      </div>

      {/* Switch back to Sub-Account button */}
      <div className="p-2 border-b border-purple-900/40">
        <button
          onClick={() => {
            toggleAgencyView(false);
            router.push(`/${activeLocationId}/dashboard`);
          }}
          className="flex w-full items-center gap-2 rounded-md bg-purple-950/60 hover:bg-purple-900/60 px-2.5 py-2 text-xs font-medium text-purple-200 transition-colors"
          title="Switch to Sub-Account"
        >
          <ArrowLeft className="h-4 w-4 shrink-0 text-purple-400" />
          {!sidebarCollapsed && <span className="truncate">Back to Sub-Account</span>}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-md px-2.5 py-2 text-xs font-medium transition-colors",
                isActive
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-slate-400 hover:bg-purple-900/30 hover:text-white"
              )}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors",
                  isActive ? "text-white" : "text-slate-400 group-hover:text-purple-300"
                )}
              />
              {!sidebarCollapsed && (
                <span className="flex-1 truncate">{item.label}</span>
              )}
              {!sidebarCollapsed && item.highlight && (
                <span className="flex items-center text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  SaaS Mode
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Collapse Toggle */}
      <div className="border-t border-purple-900/40 p-2">
        <button
          onClick={toggleSidebar}
          className="flex w-full items-center justify-center rounded-md p-1.5 text-slate-400 hover:bg-purple-900/30 hover:text-white transition-colors"
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

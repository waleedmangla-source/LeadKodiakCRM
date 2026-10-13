"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import {
  Building2,
  ChevronDown,
  Search,
  Plus,
  Phone,
  Bell,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Check,
  CheckCircle2,
} from "lucide-react";

export function TopHeader() {
  const router = useRouter();
  const {
    agency,
    subAccounts,
    activeLocationId,
    setActiveLocation,
    isAgencyView,
    toggleAgencyView,
    currentUser,
    setQuickActionOpen,
    setDialerOpen,
    setGlobalSearchOpen,
    callActive,
  } = useAppStore();

  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const activeSubAccount = subAccounts.find((s) => s.id === activeLocationId) || subAccounts[0];
  const filteredSubAccounts = subAccounts.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <header className="flex h-14 w-full items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm z-30">
      {/* Left: Location & Agency Switcher */}
      <div className="relative flex items-center gap-3">
        <button
          onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-800 hover:bg-slate-100 transition-colors"
        >
          {isAgencyView ? (
            <>
              <ShieldCheck className="h-4 w-4 text-purple-600" />
              <span className="font-semibold">{agency.name} (Agency View)</span>
            </>
          ) : (
            <>
              <Building2 className="h-4 w-4 text-blue-600" />
              <span className="font-semibold">{activeSubAccount.name}</span>
              <span className="text-slate-400">({activeSubAccount.city}, {activeSubAccount.state})</span>
            </>
          )}
          <ChevronDown className="h-3.5 w-3.5 text-slate-500 ml-1" />
        </button>

        {/* Dropdown Menu */}
        {locationDropdownOpen && (
          <div className="absolute top-11 left-0 w-72 rounded-lg border border-slate-200 bg-white shadow-xl py-2 z-50">
            <div className="px-3 pb-2 border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search sub-accounts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-md border border-slate-200 pl-8 pr-3 py-1.5 text-xs outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Switch to Agency View button */}
            <div className="p-1 border-b border-slate-100">
              <button
                onClick={() => {
                  toggleAgencyView(true);
                  setLocationDropdownOpen(false);
                  router.push("/agency/accounts");
                }}
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-semibold text-purple-700 hover:bg-purple-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-purple-600" />
                  <span>Switch to Agency View</span>
                </div>
                {isAgencyView && <Check className="h-4 w-4 text-purple-600" />}
              </button>
            </div>

            {/* Locations list */}
            <div className="max-h-56 overflow-y-auto p-1 space-y-0.5">
              <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Sub-Accounts (Locations)
              </div>
              {filteredSubAccounts.map((account) => (
                <button
                  key={account.id}
                  onClick={() => {
                    setActiveLocation(account.id);
                    setLocationDropdownOpen(false);
                    router.push(`/${account.id}/dashboard`);
                  }}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <div className="text-left">
                    <div className="font-medium text-slate-900">{account.name}</div>
                    <div className="text-[11px] text-slate-500">
                      {account.city}, {account.state} • ${account.walletBalance.toFixed(2)}
                    </div>
                  </div>
                  {!isAgencyView && activeLocationId === account.id && (
                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Center: Global Search Bar trigger */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <button
          onClick={() => setGlobalSearchOpen(true)}
          className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-400 hover:border-slate-300 hover:bg-white transition-all shadow-inner"
        >
          <div className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span>Search contacts, pipelines, pages...</span>
          </div>
          <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-mono text-slate-500 shadow-sm">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Quick Actions, Softphone Dialer, Notifications, User Profile */}
      <div className="flex items-center gap-2.5">
        {/* Quick Action + button */}
        <button
          onClick={() => setQuickActionOpen(true)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-transform active:scale-95"
          title="Quick Actions (Add Contact, Deal, Appointment, SMS)"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
        </button>

        {/* Softphone Dialer */}
        <button
          onClick={() => setDialerOpen(true)}
          className={`relative flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
            callActive
              ? "border-emerald-500 bg-emerald-50 text-emerald-600 animate-pulse"
              : "border-slate-200 text-slate-600 hover:bg-slate-100"
          }`}
          title="Open Softphone Dialer"
        >
          <Phone className="h-4 w-4" />
          {callActive && (
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          )}
        </button>

        {/* Notifications */}
        <button
          className="relative flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Help Center */}
        <button
          className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
          title="Help & Guides"
        >
          <HelpCircle className="h-4 w-4" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-semibold text-xs shadow-sm">
            WM
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-semibold text-slate-900">{currentUser.name}</div>
            <div className="text-[10px] text-slate-500 font-medium">Agency Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}

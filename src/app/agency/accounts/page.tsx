"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import {
  Building2,
  Plus,
  Search,
  ExternalLink,
  ShieldCheck,
  CreditCard,
  DollarSign,
  ArrowRight,
  MoreVertical,
  Sliders,
} from "lucide-react";

export default function AgencyAccountsPage() {
  const router = useRouter();
  const { subAccounts, setActiveLocation, toggleAgencyView } = useAppStore();
  const [search, setSearch] = useState("");

  const filteredAccounts = subAccounts.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.city.toLowerCase().includes(search.toLowerCase())
  );

  const handleSwitchToLocation = (id: string) => {
    setActiveLocation(id);
    toggleAgencyView(false);
    router.push(`/${id}/dashboard`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-purple-400" />
            <h1 className="text-xl font-bold text-white">Sub-Accounts (Client Locations)</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage your agency's client portals, active SaaS subscriptions, and rebilling wallets.
          </p>
        </div>

        <button className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg hover:brightness-110 transition-all">
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span>Create New Sub-Account</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search sub-accounts by name or city..."
          className="w-full rounded-xl border border-slate-800 bg-slate-900/80 pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-purple-500"
        />
      </div>

      {/* Sub-Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredAccounts.map((acc) => (
          <div
            key={acc.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl space-y-4 hover:border-purple-500/50 transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-300 font-bold text-sm">
                  {acc.name[0]}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                    {acc.name}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {acc.city}, {acc.state}
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 text-[10px] font-bold text-purple-300 uppercase">
                {acc.activePlan.replace("_", " ")}
              </span>
            </div>

            {/* Wallet & Rebilling Stats */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Prepaid Balance</span>
                <span className="text-base font-bold text-emerald-400">${acc.walletBalance.toFixed(2)}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Auto-Recharge</span>
                <span className="text-xs text-slate-300 font-medium">When &lt; ${acc.autoRechargeThreshold}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <button
                onClick={() => handleSwitchToLocation(acc.id)}
                className="flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
              >
                <span>Switch to Location</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <button className="p-1 text-slate-400 hover:text-white">
                <Sliders className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

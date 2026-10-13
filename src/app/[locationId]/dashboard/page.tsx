"use client";

import React, { useState } from "react";
import { useAppStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import {
  DollarSign,
  TrendingUp,
  Users,
  Target,
  Calendar,
  ArrowUpRight,
  Filter,
  CheckCircle,
  Clock,
  Sparkles,
} from "lucide-react";

export default function DashboardPage() {
  const { opportunities, contacts, calendarEvents, pipeline } = useAppStore();
  const [dateFilter, setDateFilter] = useState("This Month");

  const totalValue = opportunities.reduce((acc, o) => acc + o.monetaryValue, 0);
  const wonOpportunities = opportunities.filter((o) => o.status === "won");
  const wonValue = wonOpportunities.reduce((acc, o) => acc + o.monetaryValue, 0);
  const conversionRate = opportunities.length > 0 ? Math.round((wonOpportunities.length / opportunities.length) * 100) : 0;
  const avgDealSize = opportunities.length > 0 ? Math.round(totalValue / opportunities.length) : 0;

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Performance Dashboard</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time pipeline metrics, conversion velocity, and upcoming consultations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <span>Range:</span>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-transparent font-semibold text-blue-600 outline-none cursor-pointer"
            >
              <option>This Week</option>
              <option>This Month</option>
              <option>Last 30 Days</option>
              <option>This Quarter</option>
              <option>All Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4 Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pipeline Value</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(totalValue)}</div>
            <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold text-emerald-600">
              <ArrowUpRight className="h-3 w-3" />
              <span>+18.4% vs last period</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Conversion Rate</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900">{conversionRate}%</div>
            <div className="text-[11px] text-slate-500 mt-1">
              {wonOpportunities.length} of {opportunities.length} deals closed won
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Active Leads</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900">{contacts.length}</div>
            <div className="text-[11px] text-purple-600 font-semibold mt-1">
              4 new leads captured this week
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Average Deal Value</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Target className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(avgDealSize)}</div>
            <div className="text-[11px] text-slate-500 mt-1">
              Across {pipeline.name}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Pipeline Funnel Breakdown + Upcoming Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Pipeline Funnel Stages */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Pipeline Stage Distribution</h2>
              <p className="text-xs text-slate-500">Deals in {pipeline.name}</p>
            </div>
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
              {opportunities.length} Deals Tracked
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {pipeline.stages.map((stage) => {
              const stageDeals = opportunities.filter((o) => o.stageId === stage.id);
              const stageValue = stageDeals.reduce((acc, o) => acc + o.monetaryValue, 0);
              const pct = totalValue > 0 ? Math.round((stageValue / totalValue) * 100) : 0;

              return (
                <div key={stage.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: stage.color }}
                      />
                      <span className="font-semibold text-slate-800">{stage.name}</span>
                      <span className="text-slate-400 font-mono">({stageDeals.length})</span>
                    </div>
                    <span className="font-bold text-slate-900">{formatCurrency(stageValue)}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.max(pct, stageDeals.length > 0 ? 8 : 0)}%`,
                        backgroundColor: stage.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Upcoming Appointments & Consultation Radar */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span>Upcoming Appointments</span>
            </h2>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Live Sync
            </span>
          </div>

          <div className="space-y-3">
            {calendarEvents.map((evt) => (
              <div
                key={evt.id}
                className="rounded-lg border border-slate-200 p-3 bg-slate-50/60 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-xs font-bold text-slate-900">{evt.title}</h3>
                  <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold text-blue-700 uppercase">
                    {evt.status}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-500">
                  <Clock className="h-3 w-3" />
                  <span>Thursday, Oct 15 • 2:30 PM (45m)</span>
                </div>
                {evt.appointmentNotes && (
                  <p className="mt-1 text-[11px] text-slate-600 italic">
                    "{evt.appointmentNotes}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useAppStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import {
  Kanban,
  Plus,
  DollarSign,
  User,
  ArrowRight,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Tag,
} from "lucide-react";

export default function OpportunitiesPage() {
  const { pipeline, opportunities, contacts, updateOpportunityStage, setQuickActionOpen } = useAppStore();

  const totalValue = opportunities.reduce((acc, o) => acc + o.monetaryValue, 0);

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden bg-slate-100">
      {/* Top Controls Bar */}
      <div className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Kanban className="h-5 w-5 text-blue-600" />
            <h1 className="text-sm font-bold text-slate-900">{pipeline.name}</h1>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-700">
            <span>Total Pipeline Value:</span>
            <span>{formatCurrency(totalValue)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuickActionOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>Add Opportunity</span>
          </button>
        </div>
      </div>

      {/* Horizontal Kanban Columns Container */}
      <div className="flex-1 overflow-x-auto p-6">
        <div className="flex gap-4 h-full min-w-max items-start">
          {pipeline.stages.map((stage) => {
            const stageDeals = opportunities.filter((o) => o.stageId === stage.id);
            const stageSum = stageDeals.reduce((acc, o) => acc + o.monetaryValue, 0);

            return (
              <div
                key={stage.id}
                className="w-72 flex flex-col max-h-full rounded-xl border border-slate-200 bg-slate-50 shadow-sm overflow-hidden"
              >
                {/* Column Header */}
                <div className="p-3.5 border-b border-slate-200 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-3 w-3 rounded-full shrink-0"
                        style={{ backgroundColor: stage.color }}
                      />
                      <h3 className="text-xs font-bold text-slate-900 truncate">{stage.name}</h3>
                    </div>
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">
                      {stageDeals.length}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">Win Probability: {stage.probability}%</span>
                    <span className="font-bold text-slate-900">{formatCurrency(stageSum)}</span>
                  </div>
                </div>

                {/* Deal Cards Column Body */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
                  {stageDeals.map((deal) => {
                    const contact = contacts.find((c) => c.id === deal.contactId);

                    return (
                      <div
                        key={deal.id}
                        className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm hover:shadow-md transition-all space-y-2.5 group"
                      >
                        <div className="flex items-start justify-between">
                          <h4 className="text-xs font-bold text-slate-900 leading-snug">{deal.name}</h4>
                          <span className="text-xs font-bold text-emerald-600 shrink-0 ml-2">
                            {formatCurrency(deal.monetaryValue)}
                          </span>
                        </div>

                        {contact && (
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
                            <User className="h-3 w-3 text-slate-400" />
                            <span>{contact.firstName} {contact.lastName}</span>
                          </div>
                        )}

                        {deal.source && (
                          <div className="flex items-center gap-1">
                            <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-700 border border-blue-100">
                              {deal.source}
                            </span>
                          </div>
                        )}

                        {/* Interactive Stage Mover */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                          <span className="text-slate-400">Move stage:</span>
                          <select
                            value={deal.stageId}
                            onChange={(e) => updateOpportunityStage(deal.id, e.target.value)}
                            className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-700 outline-none hover:bg-slate-100 cursor-pointer"
                          >
                            {pipeline.stages.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    );
                  })}

                  {stageDeals.length === 0 && (
                    <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 p-4 text-center">
                      <p className="text-[11px] text-slate-400">No opportunities in this stage</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

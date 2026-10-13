"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAppStore } from "@/lib/store";
import {
  Globe,
  Plus,
  ArrowRight,
  TrendingUp,
  Layers,
  FileText,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Edit3,
} from "lucide-react";

export default function SitesPage() {
  const params = useParams();
  const locationId = params?.locationId as string;
  const { funnels } = useAppStore();
  const [activeTab, setActiveTab] = useState<"funnels" | "websites" | "forms">("funnels");

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Sites & Funnels</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            High-converting sales funnels, multi-page websites, and embedded lead forms.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/${locationId}/sites/builder/fnl_invisalign`}
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>Launch Visual Builder</span>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab("funnels")}
          className={`pb-3 px-3 border-b-2 transition-all ${
            activeTab === "funnels"
              ? "border-blue-600 text-blue-600 font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Funnels ({funnels.length})
        </button>
        <button
          onClick={() => setActiveTab("websites")}
          className={`pb-3 px-3 border-b-2 transition-all ${
            activeTab === "websites"
              ? "border-blue-600 text-blue-600 font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Websites (2)
        </button>
        <button
          onClick={() => setActiveTab("forms")}
          className={`pb-3 px-3 border-b-2 transition-all ${
            activeTab === "forms"
              ? "border-blue-600 text-blue-600 font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Forms & Surveys (4)
        </button>
      </div>

      {/* Funnels List */}
      <div className="space-y-4">
        {funnels.map((funnel) => (
          <div
            key={funnel.id}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">{funnel.name}</h2>
                  <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold">
                    Active
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <Globe className="h-3.5 w-3.5 text-blue-500" />
                  <span className="font-mono">{funnel.domain}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/${locationId}/sites/builder/${funnel.id}`}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  <span>Open Funnel Builder</span>
                </Link>
              </div>
            </div>

            {/* Funnel Steps Chain */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Funnel Steps ({funnel.steps.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {funnel.steps.map((step, idx) => (
                  <div
                    key={step.id}
                    className="relative rounded-lg border border-slate-200 bg-slate-50/70 p-3.5 space-y-2 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-400">Step {idx + 1}</span>
                      {step.conversionRate && (
                        <span className="font-bold text-emerald-600">
                          {step.conversionRate}% Conv.
                        </span>
                      )}
                    </div>
                    <div className="font-semibold text-xs text-slate-900">{step.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono truncate">/{step.slug}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

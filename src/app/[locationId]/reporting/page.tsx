"use client";

import React from "react";
import { BarChart3, TrendingUp, Phone, Users, DollarSign, ArrowUpRight } from "lucide-react";

export default function ReportingPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Attribution & Ads Reporting</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          First-touch and last-touch lead attribution, Google Ads ROI, Facebook Ads ROAS, and call analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Ad Spend (30d)</span>
          <div className="text-2xl font-bold text-slate-900 mt-2">$2,450.00</div>
          <span className="text-[11px] text-slate-500">Google ($1,400) • Meta ($1,050)</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Leads Generated</span>
          <div className="text-2xl font-bold text-slate-900 mt-2">68 Leads</div>
          <span className="text-[11px] text-emerald-600 font-semibold">$36.02 CPL</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Revenue Attributed</span>
          <div className="text-2xl font-bold text-slate-900 mt-2">$14,250.00</div>
          <span className="text-[11px] text-emerald-600 font-semibold">5.8x Blended ROAS</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Call Answer Rate</span>
          <div className="text-2xl font-bold text-slate-900 mt-2">94.2%</div>
          <span className="text-[11px] text-blue-600 font-semibold">Average duration: 3m 42s</span>
        </div>
      </div>
    </div>
  );
}

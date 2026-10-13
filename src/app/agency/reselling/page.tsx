"use client";

import React from "react";
import { Store, Globe, CheckCircle2 } from "lucide-react";

export default function AgencyResellingPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Reselling Add-ons (High-Margin Upsells)</h1>
        <p className="text-xs text-slate-400 mt-1">
          Resell premium third-party services directly inside your sub-accounts with custom wholesale-to-retail markups.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-3">
          <div className="text-xs font-bold text-purple-400">Yext Listing Distribution</div>
          <h3 className="text-sm font-bold text-white">Online Listings & SEO Sync</h3>
          <p className="text-xs text-slate-400">Sync 70+ business directories automatically.</p>
          <div className="pt-2 border-t border-slate-800 flex justify-between text-xs">
            <span className="text-slate-400">Wholesale: $25/mo</span>
            <span className="text-emerald-400 font-bold">Sell: $49/mo</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-3">
          <div className="text-xs font-bold text-blue-400">Dedicated WordPress</div>
          <h3 className="text-sm font-bold text-white">Managed High-Speed WP Hosting</h3>
          <p className="text-xs text-slate-400">Staging environments, daily backups, Google Cloud infra.</p>
          <div className="pt-2 border-t border-slate-800 flex justify-between text-xs">
            <span className="text-slate-400">Wholesale: $10/mo</span>
            <span className="text-emerald-400 font-bold">Sell: $29/mo</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-3">
          <div className="text-xs font-bold text-emerald-400">WhatsApp Business API</div>
          <h3 className="text-sm font-bold text-white">Official Green-Badge WhatsApp</h3>
          <p className="text-xs text-slate-400">Official Meta Cloud API connection for 2-way messaging.</p>
          <div className="pt-2 border-t border-slate-800 flex justify-between text-xs">
            <span className="text-slate-400">Wholesale: $5/mo</span>
            <span className="text-emerald-400 font-bold">Sell: $19/mo</span>
          </div>
        </div>
      </div>
    </div>
  );
}

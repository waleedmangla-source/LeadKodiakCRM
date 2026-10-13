"use client";

import React from "react";
import { Store, Download, ExternalLink } from "lucide-react";

export default function MarketplacePage() {
  const apps = [
    {
      id: "app_slack",
      name: "Slack Notifications Sync",
      desc: "Receive real-time lead alerts and inbound phone call updates in your team's Slack channels.",
      developer: "HighLevel Official",
      installed: true,
    },
    {
      id: "app_quickbooks",
      name: "QuickBooks Online 2-Way Sync",
      desc: "Automatically sync invoices, contact customer records, and payment receipts with QuickBooks.",
      developer: "Intuit Certified",
      installed: true,
    },
    {
      id: "app_shopify",
      name: "Shopify Abandoned Cart Connect",
      desc: "Trigger high-converting SMS and email follow-ups when customers abandon carts in Shopify.",
      developer: "LeadConnector Labs",
      installed: false,
    },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">App Marketplace</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Connect third-party apps, custom webhooks, and marketplace developer integrations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {apps.map((app) => (
          <div
            key={app.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase">{app.developer}</span>
                {app.installed && (
                  <span className="rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 text-[10px] font-bold">
                    Installed
                  </span>
                )}
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-2">{app.name}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{app.desc}</p>
            </div>

            <button
              className={`w-full py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                app.installed
                  ? "border border-slate-200 text-slate-700 hover:bg-slate-50"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {app.installed ? "Configure App" : "Install App"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

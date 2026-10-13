"use client";

import React, { useState } from "react";
import {
  Layers,
  Plus,
  Share2,
  Copy,
  Download,
  Upload,
  CheckCircle2,
  FileCode,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function AgencySnapshotsPage() {
  const [snapshots, setSnapshots] = useState([
    {
      id: "snap_dental",
      name: "Dental Implant & Cosmetic Surgery Snapshot",
      vertical: "Healthcare / Dental",
      version: "v2.4",
      assets: "4 Funnels, 2 Pipelines, 6 Workflows, 8 Custom Fields, 12 Email Templates",
      deployments: 14,
      shareLink: "https://app.apexscaledigital.com/snapshot/share/dental-master-v2",
    },
    {
      id: "snap_solar",
      name: "Solar & Roofing High-Ticket Lead Machine",
      vertical: "Home Improvement",
      version: "v1.8",
      assets: "2 Funnels, 1 Pipeline, 4 Workflows, 14 Custom Fields, 6 Forms",
      deployments: 8,
      shareLink: "https://app.apexscaledigital.com/snapshot/share/solar-lead-v1",
    },
    {
      id: "snap_gym",
      name: "Fitness Club 21-Day Challenge Snapshot",
      vertical: "Health & Fitness",
      version: "v3.1",
      assets: "3 Funnels, 1 Pipeline, 8 Workflows, 2 Calendars, 4 Forms",
      deployments: 22,
      shareLink: "https://app.apexscaledigital.com/snapshot/share/gym-21day-v3",
    },
  ]);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = (id: string, link: string) => {
    navigator.clipboard?.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="h-6 w-6 text-purple-400" />
            <h1 className="text-xl font-bold text-white">Agency Account Snapshots</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Package entire sub-account architectures (Funnels, Workflows, Pipelines, Forms) into deployable JSON bundles.
          </p>
        </div>

        <button className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg hover:brightness-110 transition-all">
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span>Create Snapshot from Location</span>
        </button>
      </div>

      {/* Snapshots Grid */}
      <div className="space-y-4">
        {snapshots.map((snap) => (
          <div
            key={snap.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="text-base font-bold text-white">{snap.name}</h3>
                  <span className="rounded-full bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 text-[10px] font-bold text-purple-300">
                    {snap.version}
                  </span>
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-400">
                    {snap.vertical}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Bundled Assets: <span className="text-slate-200">{snap.assets}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyLink(snap.id, snap.shareLink)}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span>{copiedId === snap.id ? "Link Copied!" : "Share Link"}</span>
                </button>
                <button className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-purple-500 transition-colors shadow-sm">
                  <span>Deploy to Sub-Accounts</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Deployed to {snap.deployments} client locations</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Zero Conflict Migration Verified</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

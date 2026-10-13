"use client";

import React, { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Settings, ShieldCheck, Globe, Palette, Save, Check } from "lucide-react";

export default function AgencySettingsPage() {
  const { agency } = useAppStore();
  const [agencyName, setAgencyName] = useState(agency.name);
  const [domain, setDomain] = useState(agency.whiteLabelDomain);
  const [color, setColor] = useState(agency.primaryColor || "#2563eb");
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Agency White-Label Settings</h1>
        <p className="text-xs text-slate-400 mt-1">
          Customize your agency brand identity, custom CNAME domain, and platform themes.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
        <form onSubmit={handleSave} className="space-y-5 text-xs max-w-xl">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Agency Company Name</label>
            <input
              type="text"
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs text-white outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">White-Label Custom CNAME Domain</label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs text-white outline-none focus:border-purple-500 font-mono"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Point your DNS CNAME record for this subdomain to <span className="font-mono text-purple-400">cname.leadconnector.app</span>
            </p>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Primary Theme Brand Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-9 w-12 rounded cursor-pointer border border-slate-700 bg-slate-950"
              />
              <span className="font-mono text-slate-300">{color}</span>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg hover:bg-purple-500 transition-all"
            >
              {savedNotice ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              <span>{savedNotice ? "Settings Updated!" : "Save Agency Settings"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

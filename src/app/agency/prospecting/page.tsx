"use client";

import React, { useState } from "react";
import { Search, MapPin, Globe, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

export default function AgencyProspectingPage() {
  const [city, setCity] = useState("Austin, TX");
  const [niche, setNiche] = useState("Dentists");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Agency Prospecting & Local Audit Engine</h1>
        <p className="text-xs text-slate-400 mt-1">
          Search local businesses on Google Maps, generate instant automated SEO & review audit reports, and pitch them high-ticket SaaS solutions.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="Business Category (e.g. Dentists, Solar, HVAC)"
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs text-white outline-none focus:border-purple-500"
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City & State (e.g. Austin, TX)"
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs text-white outline-none focus:border-purple-500"
          />
        </div>
        <button className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-2 text-xs font-semibold text-white hover:bg-purple-500 shadow-md">
          <Search className="h-4 w-4" />
          <span>Search Prospects</span>
        </button>
      </div>

      <div className="space-y-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Riverside Family Dentistry</h3>
              <span className="rounded bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 text-[10px] font-bold">
                Low GMB Score (3.4★)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">2100 S Congress Ave, Austin, TX • Missing Web Chat • WordPress detected</p>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow hover:brightness-110">
            <span>Generate Pitch Deck</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useAppStore } from "@/lib/store";
import {
  Settings,
  Building2,
  Users,
  Kanban,
  FileCode,
  Globe,
  Share2,
  CheckCircle2,
  Save,
  Check,
} from "lucide-react";

export default function SettingsPage() {
  const { subAccounts, activeLocationId, pipeline } = useAppStore();
  const activeSubAccount = subAccounts.find((s) => s.id === activeLocationId) || subAccounts[0];

  const [activeTab, setActiveTab] = useState<"profile" | "staff" | "pipelines" | "domains" | "custom_fields">("profile");
  const [savedNotice, setSavedNotice] = useState(false);

  // Form states
  const [companyName, setCompanyName] = useState(activeSubAccount.companyName);
  const [phone, setPhone] = useState(activeSubAccount.phone);
  const [email, setEmail] = useState(activeSubAccount.email);
  const [city, setCity] = useState(activeSubAccount.city);
  const [state, setState] = useState(activeSubAccount.state);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Settings: {activeSubAccount.name}</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage business profile details, team members, custom fields, and domain routing.
          </p>
        </div>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab("profile")}
          className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
            activeTab === "profile"
              ? "border-blue-600 text-blue-600 font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Building2 className="h-3.5 w-3.5" />
          <span>Business Profile</span>
        </button>
        <button
          onClick={() => setActiveTab("staff")}
          className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
            activeTab === "staff"
              ? "border-blue-600 text-blue-600 font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Users className="h-3.5 w-3.5" />
          <span>My Staff</span>
        </button>
        <button
          onClick={() => setActiveTab("pipelines")}
          className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
            activeTab === "pipelines"
              ? "border-blue-600 text-blue-600 font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Kanban className="h-3.5 w-3.5" />
          <span>Pipelines</span>
        </button>
        <button
          onClick={() => setActiveTab("domains")}
          className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
            activeTab === "domains"
              ? "border-blue-600 text-blue-600 font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Globe className="h-3.5 w-3.5" />
          <span>Domains & SSL</span>
        </button>
        <button
          onClick={() => setActiveTab("custom_fields")}
          className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
            activeTab === "custom_fields"
              ? "border-blue-600 text-blue-600 font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <FileCode className="h-3.5 w-3.5" />
          <span>Custom Fields</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        {activeTab === "profile" && (
          <form onSubmit={handleSave} className="space-y-5 max-w-2xl text-xs">
            <h2 className="text-sm font-bold text-slate-900">General Business Information</h2>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Company Legal Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full rounded-md border border-slate-300 p-2 outline-none focus:border-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Business Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-md border border-slate-300 p-2 outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">Business Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-slate-300 p-2 outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-md border border-slate-300 p-2 outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">State / Province</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full rounded-md border border-slate-300 p-2 outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="flex justify-start pt-3">
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 shadow-sm"
              >
                {savedNotice ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                <span>{savedNotice ? "Changes Saved!" : "Save Profile"}</span>
              </button>
            </div>
          </form>
        )}

        {activeTab === "domains" && (
          <div className="space-y-4 max-w-2xl text-xs">
            <h2 className="text-sm font-bold text-slate-900">Configured Custom Domains</h2>
            <div className="rounded-xl border border-slate-200 p-4 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">offers.apexdentalspa.com</div>
                <div className="text-slate-400 text-[11px] font-mono mt-0.5">CNAME: cname.leadconnector.app</div>
              </div>
              <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold">
                SSL Active (Auto-Renew)
              </span>
            </div>
          </div>
        )}

        {activeTab === "pipelines" && (
          <div className="space-y-4 max-w-2xl text-xs">
            <h2 className="text-sm font-bold text-slate-900">Active Pipelines: {pipeline.name}</h2>
            <div className="space-y-2">
              {pipeline.stages.map((stg) => (
                <div
                  key={stg.id}
                  className="rounded-lg border border-slate-200 p-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: stg.color }} />
                    <span className="font-semibold text-slate-800">{stg.name}</span>
                  </div>
                  <span className="text-slate-500 font-mono">{stg.probability}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

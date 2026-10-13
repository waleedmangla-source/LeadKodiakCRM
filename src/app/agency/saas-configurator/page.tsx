"use client";

import React, { useState } from "react";
import { useAppStore } from "@/lib/store";
import {
  DollarSign,
  CreditCard,
  Sparkles,
  Phone,
  Mail,
  Bot,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Save,
  Check,
} from "lucide-react";

export default function SaaSConfiguratorPage() {
  const { agency } = useAppStore();

  const [smsMultiplier, setSmsMultiplier] = useState(agency.rebillingMarkups.smsMultiplier);
  const [emailMultiplier, setEmailMultiplier] = useState(agency.rebillingMarkups.emailMultiplier);
  const [voiceMultiplier, setVoiceMultiplier] = useState(agency.rebillingMarkups.voiceMultiplier);
  const [aiMultiplier, setAiMultiplier] = useState(agency.rebillingMarkups.aiTokenMultiplier);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-emerald-400" />
            <h1 className="text-xl font-bold text-white">SaaS Mode & Rebilling Configurator</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure automatic Stripe usage rebilling, custom markup multipliers, and subscription plan tiers.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-lg hover:bg-emerald-500 transition-all"
        >
          {savedNotice ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          <span>{savedNotice ? "Multipliers Saved!" : "Save Markups"}</span>
        </button>
      </div>

      {/* Stripe Connect Live Status Banner */}
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
            <CreditCard className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Stripe Connect: Active</h3>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                Connected
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Account ID: {agency.stripeConnectedAccountId} • Automatic daily payouts enabled
            </p>
          </div>
        </div>

        <button className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white">
          Manage Stripe Connect
        </button>
      </div>

      {/* Usage Rebilling Multipliers */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-6">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Sliders className="h-4 w-4 text-purple-400" />
            <span>Usage Rebilling Multipliers (Profit on Autopilot)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            When sub-accounts send SMS, emails, make phone calls, or run AI agents, our engine bills the wholesale cost to you and charges your client at your chosen markup.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* SMS Multiplier */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-xs font-bold text-white">Twilio / LC Phone SMS</span>
              </div>
              <span className="text-xs font-bold text-emerald-400">{smsMultiplier}x Markup</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="5.0"
              step="0.1"
              value={smsMultiplier}
              onChange={(e) => setSmsMultiplier(parseFloat(e.target.value))}
              className="w-full accent-purple-600"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Wholesale: $0.0079 / SMS</span>
              <span className="text-purple-300 font-semibold">
                Client Charged: ${(0.0079 * smsMultiplier).toFixed(4)}
              </span>
            </div>
          </div>

          {/* Email Multiplier */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-purple-400" />
                <span className="text-xs font-bold text-white">Mailgun / LC Email</span>
              </div>
              <span className="text-xs font-bold text-emerald-400">{emailMultiplier}x Markup</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="5.0"
              step="0.1"
              value={emailMultiplier}
              onChange={(e) => setEmailMultiplier(parseFloat(e.target.value))}
              className="w-full accent-purple-600"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Wholesale: $0.0008 / Email</span>
              <span className="text-purple-300 font-semibold">
                Client Charged: ${(0.0008 * emailMultiplier).toFixed(4)}
              </span>
            </div>
          </div>

          {/* Voice Calls Multiplier */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">Voice Calls & Minutes</span>
              </div>
              <span className="text-xs font-bold text-emerald-400">{voiceMultiplier}x Markup</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="5.0"
              step="0.1"
              value={voiceMultiplier}
              onChange={(e) => setVoiceMultiplier(parseFloat(e.target.value))}
              className="w-full accent-purple-600"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Wholesale: $0.014 / Min</span>
              <span className="text-purple-300 font-semibold">
                Client Charged: ${(0.014 * voiceMultiplier).toFixed(4)}
              </span>
            </div>
          </div>

          {/* AI Tokens Multiplier */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-amber-400" />
                <span className="text-xs font-bold text-white">Conversation & Voice AI Tokens</span>
              </div>
              <span className="text-xs font-bold text-emerald-400">{aiMultiplier}x Markup</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="5.0"
              step="0.1"
              value={aiMultiplier}
              onChange={(e) => setAiMultiplier(parseFloat(e.target.value))}
              className="w-full accent-purple-600"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Wholesale: $0.0015 / 1k Tokens</span>
              <span className="text-purple-300 font-semibold">
                Client Charged: ${(0.0015 * aiMultiplier).toFixed(4)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Plans Packaging */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
        <h2 className="text-sm font-bold text-white">Default Agency SaaS Subscription Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
            <span className="text-[10px] font-bold uppercase text-slate-500">Standard Tier</span>
            <div className="text-xl font-bold text-white">$97 <span className="text-xs font-normal text-slate-400">/ mo</span></div>
            <p className="text-xs text-slate-400">CRM, 2-Way SMS, Unified Inbox, Calendars.</p>
          </div>
          <div className="rounded-xl border border-purple-500/40 bg-purple-950/20 p-4 space-y-2">
            <span className="text-[10px] font-bold uppercase text-purple-400">Unlimited Tier</span>
            <div className="text-xl font-bold text-white">$297 <span className="text-xs font-normal text-slate-400">/ mo</span></div>
            <p className="text-xs text-slate-400">Everything in Standard + Funnels, Websites, Workflows.</p>
          </div>
          <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-4 space-y-2">
            <span className="text-[10px] font-bold uppercase text-emerald-400">Pro SaaS Tier</span>
            <div className="text-xl font-bold text-white">$497 <span className="text-xs font-normal text-slate-400">/ mo</span></div>
            <p className="text-xs text-slate-400">Everything in Unlimited + Automated Rebilling + Voice AI Agents.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

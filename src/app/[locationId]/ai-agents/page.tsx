"use client";

import React, { useState } from "react";
import {
  Bot,
  Sparkles,
  Phone,
  MessageSquare,
  BookOpen,
  Sliders,
  CheckCircle2,
  Mic,
  Save,
  Check,
} from "lucide-react";

export default function AIAgentsPage() {
  const [botMode, setBotMode] = useState<"off" | "suggestive" | "autopilot">("autopilot");
  const [voiceGender, setVoiceGender] = useState("Rachel (ElevenLabs Natural)");
  const [prompt, setPrompt] = useState(
    "You are an empathetic front-desk AI receptionist for Apex Dental Spa in Austin, TX. Your goal is to answer patient questions about Invisalign, teeth whitening, and dental cleanings, and encourage them to book a complimentary 3D scan."
  );
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-purple-600" />
            <h1 className="text-xl font-bold text-slate-900">AI Agents & Conversation AI</h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Autonomous 24/7 lead qualification, appointment booking, and Voice AI phone receptionists.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-purple-700 transition-colors"
        >
          {savedNotice ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          <span>{savedNotice ? "Configuration Saved!" : "Save Agent Settings"}</span>
        </button>
      </div>

      {/* Bot Operating Mode Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <span>Conversation AI: Operating Mode</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setBotMode("off")}
            className={`p-4 rounded-xl border text-left transition-all ${
              botMode === "off"
                ? "border-slate-800 bg-slate-50 shadow-sm"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="text-xs font-bold text-slate-900">Off</div>
            <p className="text-[11px] text-slate-500 mt-1">AI bot is disabled. All replies are manual.</p>
          </button>

          <button
            onClick={() => setBotMode("suggestive")}
            className={`p-4 rounded-xl border text-left transition-all ${
              botMode === "suggestive"
                ? "border-blue-600 bg-blue-50/50 shadow-sm"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="text-xs font-bold text-blue-900">Suggestive Mode</div>
            <p className="text-[11px] text-slate-500 mt-1">
              AI drafts instant responses in the inbox for human team review before sending.
            </p>
          </button>

          <button
            onClick={() => setBotMode("autopilot")}
            className={`p-4 rounded-xl border text-left transition-all ${
              botMode === "autopilot"
                ? "border-purple-600 bg-purple-50/50 shadow-sm ring-1 ring-purple-600"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="text-xs font-bold text-purple-900 flex items-center justify-between">
              <span>Auto-Pilot (Recommended)</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              AI automatically responds across SMS, WhatsApp, and Web Chat, and books appointments.
            </p>
          </button>
        </div>
      </div>

      {/* Voice AI Phone Agent Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Phone className="h-4 w-4 text-emerald-600" />
          <span>Voice AI Agent (Inbound Front-Desk Phone Call Answering)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Synthetic Voice Engine</label>
            <select
              value={voiceGender}
              onChange={(e) => setVoiceGender(e.target.value)}
              className="w-full rounded-md border border-slate-300 p-2 text-xs outline-none focus:border-purple-600"
            >
              <option>Rachel (ElevenLabs Natural)</option>
              <option>Adam (ElevenLabs Professional)</option>
              <option>Sonic English (Cartesia Low-Latency)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Max Call Duration</label>
            <select className="w-full rounded-md border border-slate-300 p-2 text-xs outline-none focus:border-purple-600">
              <option>5 Minutes</option>
              <option>10 Minutes</option>
              <option>15 Minutes</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">System Prompt & Instructions</label>
          <textarea
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full rounded-md border border-slate-300 p-2.5 text-xs outline-none focus:border-purple-600 font-mono text-slate-800"
          />
        </div>
      </div>
    </div>
  );
}

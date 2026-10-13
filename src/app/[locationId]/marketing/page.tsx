"use client";

import React, { useState } from "react";
import {
  Megaphone,
  Plus,
  Share2,
  Mail,
  Link as LinkIcon,
  Users,
  Calendar,
  Sparkles,
} from "lucide-react";

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState<"social" | "emails" | "trigger_links">("social");

  const socialPosts = [
    {
      id: "p1",
      platforms: ["Facebook", "Instagram"],
      content: "Transform your smile before the holidays! 🌟 Claim our limited $1,000 Invisalign voucher this week only. Link in bio!",
      scheduledFor: "Tomorrow at 10:00 AM",
      status: "scheduled",
    },
    {
      id: "p2",
      platforms: ["Google Business", "LinkedIn"],
      content: "Proud to be recognized as Austin's top dental spa 3 years in a row. Thank you to our amazing patients!",
      scheduledFor: "Friday at 2:00 PM",
      status: "scheduled",
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Marketing Suite</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Omnichannel Social Planner, Broadcast Email Campaigns, and Click-Tracking Trigger Links.
          </p>
        </div>

        <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span>New Post / Campaign</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab("social")}
          className={`pb-3 px-3 border-b-2 transition-all ${
            activeTab === "social"
              ? "border-blue-600 text-blue-600 font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Social Planner (Facebook, IG, LinkedIn, GMB, TikTok)
        </button>
        <button
          onClick={() => setActiveTab("emails")}
          className={`pb-3 px-3 border-b-2 transition-all ${
            activeTab === "emails"
              ? "border-blue-600 text-blue-600 font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Email Campaigns & Templates
        </button>
        <button
          onClick={() => setActiveTab("trigger_links")}
          className={`pb-3 px-3 border-b-2 transition-all ${
            activeTab === "trigger_links"
              ? "border-blue-600 text-blue-600 font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Trigger Links
        </button>
      </div>

      {/* Social Planner Content */}
      <div className="space-y-4">
        {socialPosts.map((post) => (
          <div
            key={post.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {post.platforms.map((p) => (
                  <span
                    key={p}
                    className="rounded bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 text-[10px] font-bold"
                  >
                    {p}
                  </span>
                ))}
              </div>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                <Calendar className="h-3 w-3 text-slate-400" />
                <span>Scheduled: {post.scheduledFor}</span>
              </span>
            </div>

            <p className="text-xs text-slate-800 leading-relaxed">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

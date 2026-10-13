"use client";

import React from "react";
import { Star, Send, MessageSquare, ThumbsUp, RefreshCw, CheckCircle2 } from "lucide-react";

export default function ReputationPage() {
  const reviews = [
    {
      id: "r1",
      author: "Samantha Hayes",
      rating: 5,
      date: "2 days ago",
      source: "Google Business",
      content: "Dr. Rivera and the team at Apex Dental are extraordinary! The 3D scan took literally 5 minutes and my aligners arrived within a week. Highly recommended!",
      reply: "Thank you Samantha! It has been an absolute pleasure assisting you with your smile journey. — Dr. Rivera",
    },
    {
      id: "r2",
      author: "Robert Miller",
      rating: 5,
      date: "4 days ago",
      source: "Google Business",
      content: "Clean, modern, and zero wait time. Best dental experience I've had in Austin.",
      reply: "Thank you Robert! We take immense pride in our patient care. See you soon!",
    },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Reputation & Reviews</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated Google & Facebook review requests and AI auto-replies.
          </p>
        </div>

        <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors">
          <Send className="h-3.5 w-3.5" />
          <span>Send Review Request (SMS)</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase text-slate-400">Average Rating</div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-3xl font-black text-slate-900">4.9</span>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400" />
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-1">Based on 148 verified Google reviews</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase text-slate-400">Requests Sent This Month</div>
          <div className="text-3xl font-black text-slate-900 mt-2">64</div>
          <p className="text-xs text-emerald-600 font-semibold mt-1">32.8% Conversion rate</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase text-slate-400">AI Auto-Reply</div>
          <div className="text-3xl font-black text-purple-600 mt-2">Active</div>
          <p className="text-xs text-slate-500 mt-1">100% of reviews replied within 1 hr</p>
        </div>
      </div>

      {/* Reviews Stream */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900">{rev.author}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">• {rev.date} via {rev.source}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">"{rev.content}"</p>

            {rev.reply && (
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs text-slate-600">
                <span className="font-bold text-slate-800 block mb-1">Business Reply:</span>
                <p>{rev.reply}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

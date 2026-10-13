"use client";

import React from "react";
import { GraduationCap, Users, Plus, Award } from "lucide-react";

export default function MembershipsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Memberships & Courses</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Deliver online video courses, Skool-like community discussion feeds, and certificates.
          </p>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span>Create Course Product</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-600 uppercase">Active Course</span>
            <span className="rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 text-[10px] font-bold">Published</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900">Patient Post-Op & Smile Maintenance Masterclass</h3>
          <p className="text-xs text-slate-500">6 Video Lessons • 142 Active Enrolled Patients</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-600 uppercase">Community Group</span>
            <span className="rounded-full bg-purple-50 text-purple-700 px-2 py-0.5 text-[10px] font-bold">Community</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900">VIP Smile Transformation Club (Discussion Feed)</h3>
          <p className="text-xs text-slate-500">Member Leaderboards • Gamified Badges • Chat</p>
        </div>
      </div>
    </div>
  );
}

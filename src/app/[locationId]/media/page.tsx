"use client";

import React from "react";
import { FolderOpen, Upload, Image, Video, FileText } from "lucide-react";

export default function MediaStoragePage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Media Storage</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Cloudflare R2 / S3 storage for funnel assets, lead magnets, logos, and videos.
          </p>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors">
          <Upload className="h-4 w-4" />
          <span>Upload Files</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm text-center space-y-2">
          <FolderOpen className="h-8 w-8 text-blue-500 mx-auto" />
          <h3 className="text-xs font-bold text-slate-800">Funnel Images</h3>
          <p className="text-[11px] text-slate-400">24 files • 42 MB</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm text-center space-y-2">
          <FolderOpen className="h-8 w-8 text-purple-500 mx-auto" />
          <h3 className="text-xs font-bold text-slate-800">Email Assets</h3>
          <p className="text-[11px] text-slate-400">18 files • 12 MB</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm text-center space-y-2">
          <FolderOpen className="h-8 w-8 text-emerald-500 mx-auto" />
          <h3 className="text-xs font-bold text-slate-800">Patient PDF Guides</h3>
          <p className="text-[11px] text-slate-400">8 files • 6 MB</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm text-center space-y-2">
          <FolderOpen className="h-8 w-8 text-amber-500 mx-auto" />
          <h3 className="text-xs font-bold text-slate-800">Video Testimonials</h3>
          <p className="text-[11px] text-slate-400">6 files • 280 MB</p>
        </div>
      </div>
    </div>
  );
}

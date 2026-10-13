"use client";

import React, { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { AgencySidebar } from "@/components/layout/AgencySidebar";
import { TopHeader } from "@/components/layout/TopHeader";

export default function AgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toggleAgencyView } = useAppStore();

  useEffect(() => {
    toggleAgencyView(true);
  }, [toggleAgencyView]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* 1:1 Agency Sidebar */}
      <AgencySidebar />

      {/* Main Content Pane */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <TopHeader />

        {/* Dynamic Agency Canvas */}
        <main className="flex-1 overflow-y-auto bg-slate-900/60 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

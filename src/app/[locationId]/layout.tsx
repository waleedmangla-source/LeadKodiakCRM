"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { SubAccountSidebar } from "@/components/layout/SubAccountSidebar";
import { TopHeader } from "@/components/layout/TopHeader";

export default function SubAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const locationId = params?.locationId as string;
  const { setActiveLocation } = useAppStore();

  useEffect(() => {
    if (locationId) {
      setActiveLocation(locationId);
    }
  }, [locationId, setActiveLocation]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50">
      {/* 1:1 Left Sidebar */}
      <SubAccountSidebar />

      {/* Main Content Pane */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <TopHeader />

        {/* Dynamic Page Canvas */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}

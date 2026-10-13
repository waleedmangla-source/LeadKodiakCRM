"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";

export default function RootPage() {
  const router = useRouter();
  const { activeLocationId } = useAppStore();

  useEffect(() => {
    router.replace(`/${activeLocationId}/dashboard`);
  }, [router, activeLocationId]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-900 text-white">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
        <p className="text-xs font-medium text-slate-400">Loading HighLevel Environment...</p>
      </div>
    </div>
  );
}

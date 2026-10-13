"use client";

import React from "react";
import { Users2, DollarSign, Award } from "lucide-react";

export default function AgencyAffiliatesPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Agency Affiliate Portal</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage agency affiliates, tiered recurring commission payouts, and referral leaderboards.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-center py-16 space-y-3">
        <Users2 className="h-12 w-12 text-purple-400 mx-auto" />
        <h3 className="text-base font-bold text-white">40% Monthly Recurring Commission Structure</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Share your agency affiliate sign-up link. When sub-accounts upgrade to Pro SaaS, commissions are automatically credited to your affiliates.
        </p>
      </div>
    </div>
  );
}

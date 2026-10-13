"use client";

import React, { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import {
  CreditCard,
  Plus,
  FileText,
  DollarSign,
  ArrowUpRight,
  Send,
  Download,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState<"invoices" | "transactions" | "products">("invoices");

  const invoices = [
    {
      id: "inv_101",
      customer: "Marcus Vance",
      amount: 4800,
      status: "paid",
      date: "Oct 12, 2026",
      desc: "Full Invisalign Treatment - Deposit",
    },
    {
      id: "inv_102",
      customer: "Elena Rostova",
      amount: 850,
      status: "pending",
      date: "Oct 13, 2026",
      desc: "In-Office Zoom Whitening Package",
    },
    {
      id: "inv_103",
      customer: "David Chen",
      amount: 3900,
      status: "paid",
      date: "Oct 09, 2026",
      desc: "Implant Surgery Phase 1",
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Payments & Invoicing</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Stripe Connect integration, recurring subscriptions, Text2Pay links, and e-signatures.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>Create Invoice</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase text-slate-400">Total Revenue Collected</div>
          <div className="text-2xl font-bold text-slate-900 mt-2">$8,700.00</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">Stripe Payouts Live</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase text-slate-400">Pending Receivables</div>
          <div className="text-2xl font-bold text-slate-900 mt-2">$850.00</div>
          <div className="text-[11px] text-amber-600 font-semibold mt-1">1 Open Invoice</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase text-slate-400">Active Subscriptions</div>
          <div className="text-2xl font-bold text-slate-900 mt-2">18 Members</div>
          <div className="text-[11px] text-blue-600 font-semibold mt-1">VIP Dental Club</div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-900">Recent Invoices & Text2Pay Links</h2>
          <span className="text-xs text-blue-600 font-semibold cursor-pointer">View All Orders</span>
        </div>

        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
            <tr>
              <th className="py-3 px-4">Invoice #</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-mono font-bold text-blue-600">{inv.id}</td>
                <td className="py-3.5 px-4 font-semibold text-slate-900">{inv.customer}</td>
                <td className="py-3.5 px-4 text-slate-600">{inv.desc}</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">{formatCurrency(inv.amount)}</td>
                <td className="py-3.5 px-4">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                      inv.status === "paid"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-500">{inv.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

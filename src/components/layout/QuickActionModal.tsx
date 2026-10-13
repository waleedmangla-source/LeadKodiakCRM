"use client";

import React, { useState } from "react";
import { useAppStore } from "@/lib/store";
import { X, UserPlus, Kanban, Calendar, MessageSquare, Check } from "lucide-react";

export function QuickActionModal() {
  const { quickActionOpen, setQuickActionOpen, addContact, addOpportunity, activeLocationId, pipeline } = useAppStore();
  const [activeTab, setActiveTab] = useState<"contact" | "opportunity" | "appointment" | "sms">("contact");

  // Contact form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tag, setTag] = useState("Manual Entry");

  // Opportunity form state
  const [dealName, setDealName] = useState("");
  const [dealValue, setDealValue] = useState("2500");
  const [stageId, setStageId] = useState(pipeline.stages[0]?.id || "stg_lead");

  const [successNotice, setSuccessNotice] = useState("");

  if (!quickActionOpen) return null;

  const handleCreateContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email) return;

    addContact({
      locationId: activeLocationId,
      firstName,
      lastName,
      email,
      phone: phone || "+1 (555) 000-0000",
      tags: [tag],
      dndSettings: { all: false, sms: false, email: false, calls: false, whatsapp: false },
      customFields: {},
    });

    setSuccessNotice(`Contact "${firstName} ${lastName}" created successfully!`);
    setTimeout(() => {
      setSuccessNotice("");
      setQuickActionOpen(false);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
    }, 1200);
  };

  const handleCreateOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealName) return;

    addOpportunity({
      locationId: activeLocationId,
      pipelineId: pipeline.id,
      stageId,
      contactId: "cnt_1",
      name: dealName,
      monetaryValue: parseFloat(dealValue) || 1000,
      status: "open",
    });

    setSuccessNotice(`Opportunity "${dealName}" added to pipeline!`);
    setTimeout(() => {
      setSuccessNotice("");
      setQuickActionOpen(false);
      setDealName("");
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-900">Quick Actions</h2>
          <button
            onClick={() => setQuickActionOpen(false)}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="grid grid-cols-4 border-b border-slate-100 bg-slate-50 text-xs font-medium">
          <button
            onClick={() => setActiveTab("contact")}
            className={`flex items-center justify-center gap-1.5 py-3 border-b-2 transition-all ${
              activeTab === "contact"
                ? "border-blue-600 bg-white text-blue-600 font-semibold"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <UserPlus className="h-4 w-4" />
            <span>Contact</span>
          </button>
          <button
            onClick={() => setActiveTab("opportunity")}
            className={`flex items-center justify-center gap-1.5 py-3 border-b-2 transition-all ${
              activeTab === "opportunity"
                ? "border-blue-600 bg-white text-blue-600 font-semibold"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Kanban className="h-4 w-4" />
            <span>Deal</span>
          </button>
          <button
            onClick={() => setActiveTab("appointment")}
            className={`flex items-center justify-center gap-1.5 py-3 border-b-2 transition-all ${
              activeTab === "appointment"
                ? "border-blue-600 bg-white text-blue-600 font-semibold"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Calendar className="h-4 w-4" />
            <span>Book</span>
          </button>
          <button
            onClick={() => setActiveTab("sms")}
            className={`flex items-center justify-center gap-1.5 py-3 border-b-2 transition-all ${
              activeTab === "sms"
                ? "border-blue-600 bg-white text-blue-600 font-semibold"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            <span>SMS</span>
          </button>
        </div>

        {/* Content body */}
        <div className="p-6">
          {successNotice ? (
            <div className="flex flex-col items-center justify-center py-8 text-center text-emerald-600">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 mb-3">
                <Check className="h-6 w-6 stroke-[3]" />
              </div>
              <p className="font-semibold text-sm">{successNotice}</p>
            </div>
          ) : activeTab === "contact" ? (
            <form onSubmit={handleCreateContact} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-xs outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-xs outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john.doe@example.com"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-xs outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 234-5678"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-xs outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Lead Tag</label>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-xs outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setQuickActionOpen(false)}
                  className="rounded-md border border-slate-300 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700 shadow-sm"
                >
                  Save Contact
                </button>
              </div>
            </form>
          ) : activeTab === "opportunity" ? (
            <form onSubmit={handleCreateOpportunity} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Opportunity Title *</label>
                <input
                  type="text"
                  required
                  value={dealName}
                  onChange={(e) => setDealName(e.target.value)}
                  placeholder="High-Ticket Invisalign Plan"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-xs outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Deal Value ($)</label>
                <input
                  type="number"
                  value={dealValue}
                  onChange={(e) => setDealValue(e.target.value)}
                  placeholder="2500"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-xs outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Pipeline Stage</label>
                <select
                  value={stageId}
                  onChange={(e) => setStageId(e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-xs outline-none focus:border-blue-600"
                >
                  {pipeline.stages.map((stg) => (
                    <option key={stg.id} value={stg.id}>
                      {stg.name} ({stg.probability}%)
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setQuickActionOpen(false)}
                  className="rounded-md border border-slate-300 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700 shadow-sm"
                >
                  Add Opportunity
                </button>
              </div>
            </form>
          ) : (
            <div className="py-8 text-center text-slate-500 text-xs">
              Direct booking and broadcast SMS quick launcher available from calendar and contact tabs.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

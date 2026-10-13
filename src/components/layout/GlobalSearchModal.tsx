"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { Search, X, Users, Kanban, Calendar, Globe, Workflow, Settings } from "lucide-react";

export function GlobalSearchModal() {
  const router = useRouter();
  const { globalSearchOpen, setGlobalSearchOpen, contacts, opportunities, activeLocationId } = useAppStore();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setGlobalSearchOpen(!globalSearchOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [globalSearchOpen, setGlobalSearchOpen]);

  if (!globalSearchOpen) return null;

  const filteredContacts = contacts.filter((c) =>
    `${c.firstName} ${c.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
    c.email.toLowerCase().includes(query.toLowerCase()) ||
    c.phone.includes(query)
  );

  const filteredOpportunities = opportunities.filter((o) =>
    o.name.toLowerCase().includes(query.toLowerCase())
  );

  const navigationPages = [
    { name: "Launchpad", path: `/${activeLocationId}/launchpad`, icon: Globe },
    { name: "Dashboard", path: `/${activeLocationId}/dashboard`, icon: Globe },
    { name: "Conversations (Inbox)", path: `/${activeLocationId}/conversations`, icon: Globe },
    { name: "Calendars & Scheduling", path: `/${activeLocationId}/calendars`, icon: Calendar },
    { name: "Contacts & Smart Lists", path: `/${activeLocationId}/contacts`, icon: Users },
    { name: "Opportunities & Pipelines", path: `/${activeLocationId}/opportunities`, icon: Kanban },
    { name: "Visual Funnel Builder", path: `/${activeLocationId}/sites`, icon: Globe },
    { name: "Workflow Automation", path: `/${activeLocationId}/automation`, icon: Workflow },
    { name: "Account Settings", path: `/${activeLocationId}/settings`, icon: Settings },
  ];

  const filteredPages = navigationPages.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center px-4 border-b border-slate-200">
          <Search className="h-4 w-4 text-slate-400 mr-2" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, search contact, deal, or page..."
            className="w-full py-3.5 text-sm outline-none text-slate-800 placeholder-slate-400"
          />
          <button
            onClick={() => setGlobalSearchOpen(false)}
            className="rounded p-1 text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-2 space-y-4">
          {/* Contacts Section */}
          {filteredContacts.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Users className="h-3 w-3" /> Contacts
              </div>
              {filteredContacts.slice(0, 4).map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setGlobalSearchOpen(false);
                    router.push(`/${activeLocationId}/contacts`);
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs hover:bg-slate-100 transition-colors text-left"
                >
                  <div>
                    <span className="font-semibold text-slate-900">{c.firstName} {c.lastName}</span>
                    <span className="text-slate-500 ml-2">({c.email})</span>
                  </div>
                  <span className="text-[10px] text-blue-600 font-medium">{c.phone}</span>
                </button>
              ))}
            </div>
          )}

          {/* Opportunities Section */}
          {filteredOpportunities.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Kanban className="h-3 w-3" /> Deals & Opportunities
              </div>
              {filteredOpportunities.slice(0, 3).map((o) => (
                <button
                  key={o.id}
                  onClick={() => {
                    setGlobalSearchOpen(false);
                    router.push(`/${activeLocationId}/opportunities`);
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs hover:bg-slate-100 transition-colors text-left"
                >
                  <span className="font-medium text-slate-900">{o.name}</span>
                  <span className="font-semibold text-emerald-600">${o.monetaryValue.toLocaleString()}</span>
                </button>
              ))}
            </div>
          )}

          {/* Pages Section */}
          <div>
            <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Quick Navigation
            </div>
            {filteredPages.slice(0, 5).map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.name}
                  onClick={() => {
                    setGlobalSearchOpen(false);
                    router.push(p.path);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <Icon className="h-4 w-4 text-slate-400" />
                  <span>{p.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

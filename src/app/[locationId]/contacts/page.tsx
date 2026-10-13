"use client";

import React, { useState } from "react";
import { useAppStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import {
  Users,
  Search,
  Filter,
  Plus,
  Mail,
  MessageSquare,
  Tag,
  Trash2,
  Download,
  Upload,
  CheckSquare,
  Square,
  MoreHorizontal,
  Phone,
  UserCheck,
} from "lucide-react";

export default function ContactsPage() {
  const { contacts, deleteContact, setQuickActionOpen, setDialerNumber, setDialerOpen, startCall } = useAppStore();

  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const [activeSmartList, setActiveSmartList] = useState<string>("All Contacts");

  const smartLists = ["All Contacts", "Facebook Leads", "Appointment Scheduled", "VIP Customers"];

  const filteredContacts = contacts.filter((c) => {
    const matchesSearch =
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);

    if (activeSmartList === "Facebook Leads") {
      return matchesSearch && c.tags.includes("Facebook Lead");
    }
    if (activeSmartList === "Appointment Scheduled") {
      return matchesSearch && c.tags.includes("Appointment Scheduled");
    }
    if (activeSmartList === "VIP Customers") {
      return matchesSearch && c.tags.includes("VIP Customer");
    }
    return matchesSearch;
  });

  const toggleSelectAll = () => {
    if (selectedContactIds.length === filteredContacts.length) {
      setSelectedContactIds([]);
    } else {
      setSelectedContactIds(filteredContacts.map((c) => c.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedContactIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    selectedContactIds.forEach((id) => deleteContact(id));
    setSelectedContactIds([]);
  };

  const handleCall = (phone: string) => {
    setDialerNumber(phone);
    setDialerOpen(true);
    startCall();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden bg-slate-50">
      {/* Smart Lists Top Tab Bar */}
      <div className="border-b border-slate-200 bg-white px-6 pt-3 shrink-0">
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            <h1 className="text-sm font-bold text-slate-900">Contacts & Smart Lists</h1>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
              {contacts.length} Total
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuickActionOpen(true)}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 stroke-[2.5]" />
              <span>Add Contact</span>
            </button>
          </div>
        </div>

        {/* Smart Lists Tabs */}
        <div className="flex gap-4 overflow-x-auto text-xs font-semibold">
          {smartLists.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSmartList(tab)}
              className={`pb-2.5 border-b-2 transition-all ${
                activeSmartList === tab
                  ? "border-blue-600 text-blue-600 font-bold"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Bulk Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 bg-white px-6 py-3 shrink-0">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or phone..."
              className="w-full rounded-lg border border-slate-200 pl-8 pr-3 py-1.5 text-xs outline-none focus:border-blue-600"
            />
          </div>
        </div>

        {/* Bulk Actions Menu (active when contacts selected) */}
        {selectedContactIds.length > 0 ? (
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1 rounded-lg animate-in fade-in">
            <span className="text-xs font-bold text-blue-700">
              {selectedContactIds.length} Selected:
            </span>
            <button className="flex items-center gap-1 text-xs text-blue-700 hover:text-blue-900 font-medium px-2 py-1 rounded hover:bg-blue-100">
              <MessageSquare className="h-3.5 w-3.5" /> SMS
            </button>
            <button className="flex items-center gap-1 text-xs text-blue-700 hover:text-blue-900 font-medium px-2 py-1 rounded hover:bg-blue-100">
              <Mail className="h-3.5 w-3.5" /> Email
            </button>
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-1 text-xs text-red-600 hover:text-red-800 font-medium px-2 py-1 rounded hover:bg-red-50"
            >
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 text-xs text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50">
              <Download className="h-3.5 w-3.5 text-slate-400" /> Export CSV
            </button>
          </div>
        )}
      </div>

      {/* Main Table */}
      <div className="flex-1 overflow-auto bg-white">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4 w-10">
                <button onClick={toggleSelectAll} className="flex items-center">
                  {selectedContactIds.length === filteredContacts.length && filteredContacts.length > 0 ? (
                    <CheckSquare className="h-4 w-4 text-blue-600" />
                  ) : (
                    <Square className="h-4 w-4 text-slate-300" />
                  )}
                </button>
              </th>
              <th className="py-3 px-4">Contact Name</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Tags</th>
              <th className="py-3 px-4">Created Date</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredContacts.map((contact) => {
              const isSelected = selectedContactIds.includes(contact.id);

              return (
                <tr
                  key={contact.id}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    isSelected ? "bg-blue-50/40" : ""
                  }`}
                >
                  <td className="py-3 px-4">
                    <button onClick={() => toggleSelectOne(contact.id)}>
                      {isSelected ? (
                        <CheckSquare className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Square className="h-4 w-4 text-slate-300" />
                      )}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 font-bold text-xs">
                        {contact.firstName[0]}{contact.lastName[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">
                          {contact.firstName} {contact.lastName}
                        </div>
                        {contact.companyName && (
                          <div className="text-[11px] text-slate-400">{contact.companyName}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleCall(contact.phone)}
                      className="font-medium text-slate-700 hover:text-blue-600 flex items-center gap-1 group"
                    >
                      <Phone className="h-3 w-3 text-slate-400 group-hover:text-blue-600" />
                      <span>{contact.phone}</span>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{contact.email}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {contact.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded bg-blue-50 border border-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-medium">
                    {formatDate(contact.dateAdded)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleCall(contact.phone)}
                      className="rounded p-1 text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                      title="Quick Call"
                    >
                      <Phone className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

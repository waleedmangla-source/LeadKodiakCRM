"use client";

import React, { useState } from "react";
import { useAppStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import {
  MessageSquare,
  Mail,
  Phone,
  Send,
  Paperclip,
  Smile,
  Star,
  CheckCheck,
  User,
  Tag,
  ShieldAlert,
  Kanban,
  Sparkles,
  Search,
} from "lucide-react";

export default function ConversationsPage() {
  const { conversations, messages, contacts, opportunities, sendMessage, markConversationRead, setDialerNumber, startCall, setDialerOpen } = useAppStore();

  const [activeConvId, setActiveConvId] = useState(conversations[0]?.id || "conv_1");
  const [inputText, setInputText] = useState("");
  const [selectedChannel, setSelectedChannel] = useState<"sms" | "email" | "whatsapp">("sms");
  const [filterTab, setFilterTab] = useState<"all" | "unread" | "starred">("all");

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];
  const activeContact = contacts.find((c) => c.id === activeConv?.contactId) || contacts[0];
  const activeMessages = messages[activeConvId] || [];
  const contactOpportunity = opportunities.find((o) => o.contactId === activeContact?.id);

  const filteredConversations = conversations.filter((c) => {
    if (filterTab === "unread") return c.unreadCount > 0;
    if (filterTab === "starred") return c.isStarred;
    return true;
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(activeConvId, inputText, selectedChannel);
    setInputText("");
  };

  const handleCallContact = () => {
    if (activeContact?.phone) {
      setDialerNumber(activeContact.phone);
      setDialerOpen(true);
      startCall();
    }
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden bg-white">
      {/* Col 1: Conversation List (320px) */}
      <div className="w-80 flex flex-col border-r border-slate-200 bg-white">
        {/* Inbox header tabs */}
        <div className="p-3 border-b border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-bold text-slate-900">Conversations</h1>
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-blue-600">
              Omnichannel
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex rounded-lg bg-slate-100 p-0.5 text-xs font-medium">
            <button
              onClick={() => setFilterTab("all")}
              className={`flex-1 rounded-md py-1 text-center transition-colors ${
                filterTab === "all" ? "bg-white font-bold text-slate-900 shadow-sm" : "text-slate-600"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterTab("unread")}
              className={`flex-1 rounded-md py-1 text-center transition-colors ${
                filterTab === "unread" ? "bg-white font-bold text-slate-900 shadow-sm" : "text-slate-600"
              }`}
            >
              Unread
            </button>
            <button
              onClick={() => setFilterTab("starred")}
              className={`flex-1 rounded-md py-1 text-center transition-colors ${
                filterTab === "starred" ? "bg-white font-bold text-slate-900 shadow-sm" : "text-slate-600"
              }`}
            >
              Starred
            </button>
          </div>
        </div>

        {/* Conversation Items */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {filteredConversations.map((conv) => {
            const contact = contacts.find((c) => c.id === conv.contactId);
            const isSelected = conv.id === activeConvId;

            return (
              <button
                key={conv.id}
                onClick={() => {
                  setActiveConvId(conv.id);
                  markConversationRead(conv.id);
                }}
                className={`w-full text-left p-3.5 transition-colors flex items-start gap-3 ${
                  isSelected ? "bg-blue-50/70 border-l-4 border-blue-600" : "hover:bg-slate-50"
                }`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-700 font-bold text-xs">
                  {contact ? `${contact.firstName[0]}${contact.lastName[0]}` : "U"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {contact ? `${contact.firstName} ${contact.lastName}` : "Unknown Contact"}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {formatDate(conv.lastMessageAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {conv.lastMessageChannel === "sms" && (
                      <MessageSquare className="h-3 w-3 text-blue-500 shrink-0" />
                    )}
                    {conv.lastMessageChannel === "email" && (
                      <Mail className="h-3 w-3 text-purple-500 shrink-0" />
                    )}
                    {conv.lastMessageChannel === "live_chat" && (
                      <Sparkles className="h-3 w-3 text-emerald-500 shrink-0" />
                    )}
                    <p className="text-[11px] text-slate-500 truncate">{conv.lastMessage}</p>
                  </div>
                </div>
                {conv.unreadCount > 0 && (
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                    {conv.unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Col 2: Active Thread Stream & Rich Composer */}
      <div className="flex-1 flex flex-col bg-slate-50 border-r border-slate-200">
        {/* Thread Header */}
        <div className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xs">
              {activeContact?.firstName[0]}{activeContact?.lastName[0]}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                {activeContact?.firstName} {activeContact?.lastName}
              </div>
              <div className="text-[11px] text-slate-500">{activeContact?.phone}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCallContact}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 transition-colors shadow-sm"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Call Contact</span>
            </button>
          </div>
        </div>

        {/* Message Bubble List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeMessages.map((msg) => {
            const isOutbound = msg.direction === "outbound";
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isOutbound ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-md rounded-2xl px-4 py-2.5 text-xs shadow-sm ${
                    isOutbound
                      ? "bg-blue-600 text-white rounded-br-xs"
                      : "bg-white text-slate-900 border border-slate-200 rounded-bl-xs"
                  }`}
                >
                  <p className="leading-relaxed">{msg.body}</p>
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-[10px] text-slate-400">
                  <span>{formatDate(msg.createdAt)}</span>
                  {isOutbound && (
                    <span className="flex items-center gap-0.5 text-emerald-600 font-semibold">
                      <CheckCheck className="h-3 w-3" /> Delivered
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Rich Message Composer */}
        <div className="border-t border-slate-200 bg-white p-4">
          <form onSubmit={handleSend} className="space-y-3">
            {/* Channel Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Send via:</span>
              <button
                type="button"
                onClick={() => setSelectedChannel("sms")}
                className={`flex items-center gap-1 rounded px-2 py-0.5 text-xs font-semibold ${
                  selectedChannel === "sms" ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <MessageSquare className="h-3 w-3" /> SMS (Twilio)
              </button>
              <button
                type="button"
                onClick={() => setSelectedChannel("email")}
                className={`flex items-center gap-1 rounded px-2 py-0.5 text-xs font-semibold ${
                  selectedChannel === "email" ? "bg-purple-600 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Mail className="h-3 w-3" /> Email
              </button>
              <button
                type="button"
                onClick={() => setSelectedChannel("whatsapp")}
                className={`flex items-center gap-1 rounded px-2 py-0.5 text-xs font-semibold ${
                  selectedChannel === "whatsapp" ? "bg-emerald-600 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                WhatsApp
              </button>
            </div>

            {/* Input Textarea */}
            <div className="rounded-xl border border-slate-200 p-2 focus-within:border-blue-600 transition-colors">
              <textarea
                rows={3}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Type a message to ${activeContact?.firstName}... (press enter to send)`}
                className="w-full resize-none bg-transparent text-xs text-slate-800 outline-none placeholder-slate-400"
              />
              <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="p-1 text-slate-400 hover:text-slate-600 transition-colors rounded"
                    title="Insert Canned Snippet"
                  >
                    <Sparkles className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="p-1 text-slate-400 hover:text-slate-600 transition-colors rounded"
                    title="Attach File"
                  >
                    <Paperclip className="h-4 w-4" />
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-40 transition-colors"
                >
                  <span>Send</span>
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Col 3: Contact Context Drawer (320px) */}
      <div className="w-80 border-l border-slate-200 bg-white p-5 overflow-y-auto space-y-6">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Contact Context
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
              {activeContact?.firstName[0]}{activeContact?.lastName[0]}
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">
                {activeContact?.firstName} {activeContact?.lastName}
              </div>
              <div className="text-xs text-slate-500">{activeContact?.email}</div>
            </div>
          </div>
        </div>

        {/* Lead Tags */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Tag className="h-3.5 w-3.5 text-slate-400" /> Tags
          </span>
          <div className="flex flex-wrap gap-1.5">
            {activeContact?.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700 border border-blue-200/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Active Pipeline Deal */}
        {contactOpportunity && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Kanban className="h-3.5 w-3.5 text-blue-600" /> Active Deal
              </span>
              <span className="font-bold text-emerald-600">${contactOpportunity.monetaryValue}</span>
            </div>
            <div className="text-xs text-slate-600 font-medium">{contactOpportunity.name}</div>
          </div>
        )}

        {/* Do Not Disturb (DND) settings */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <ShieldAlert className="h-3.5 w-3.5 text-slate-400" /> DND Permissions
          </span>
          <div className="space-y-1.5 text-xs text-slate-600">
            <label className="flex items-center justify-between">
              <span>Allow SMS</span>
              <span className="text-emerald-600 font-bold">Active</span>
            </label>
            <label className="flex items-center justify-between">
              <span>Allow Voice Calls</span>
              <span className="text-emerald-600 font-bold">Active</span>
            </label>
          </div>
        </div>

        {/* Custom Fields */}
        {activeContact?.customFields && (
          <div className="space-y-2 border-t border-slate-100 pt-4">
            <span className="text-xs font-semibold text-slate-700">Custom Fields</span>
            <div className="space-y-1.5 text-xs">
              {Object.entries(activeContact.customFields).map(([k, v]) => (
                <div key={k} className="flex justify-between text-slate-600">
                  <span className="text-slate-400">{k}:</span>
                  <span className="font-medium text-slate-800">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

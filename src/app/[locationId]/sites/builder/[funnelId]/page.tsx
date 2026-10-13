"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Smartphone,
  Tablet,
  Monitor,
  Save,
  Eye,
  Undo,
  Redo,
  Plus,
  Trash2,
  Settings2,
  Type,
  Image as ImageIcon,
  Square,
  CreditCard,
  Video,
  Clock,
  Sparkles,
  Check,
} from "lucide-react";

interface CanvasElement {
  id: string;
  type: "heading" | "paragraph" | "button" | "order_form" | "video" | "countdown";
  content: string;
  settings: {
    color?: string;
    bgColor?: string;
    align?: "left" | "center" | "right";
    fontSize?: string;
    buttonAction?: string;
  };
}

export default function VisualFunnelBuilderPage() {
  const params = useParams();
  const locationId = params?.locationId as string;
  const funnelId = params?.funnelId as string;

  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [selectedElementId, setSelectedElementId] = useState<string>("el_1");
  const [savedNotice, setSavedNotice] = useState(false);

  const [elements, setElements] = useState<CanvasElement[]>([
    {
      id: "el_1",
      type: "heading",
      content: "Claim Your $1,000 Invisalign Smile Voucher Today",
      settings: { color: "#111827", align: "center", fontSize: "text-3xl" },
    },
    {
      id: "el_2",
      type: "paragraph",
      content: "Transform your smile with Austin's #1 Diamond Plus Invisalign Provider. Limited to the first 25 patients this month.",
      settings: { color: "#4b5563", align: "center", fontSize: "text-base" },
    },
    {
      id: "el_3",
      type: "order_form",
      content: "2-Step Order Form (Stripe Elements + 1-Click Upsell Ready)",
      settings: { bgColor: "#ffffff" },
    },
    {
      id: "el_4",
      type: "button",
      content: "RESERVE YOUR VOUCHER NOW (STEP 2)",
      settings: { bgColor: "#2563eb", color: "#ffffff", align: "center" },
    },
  ]);

  const selectedElement = elements.find((e) => e.id === selectedElementId) || elements[0];

  const handleAddElement = (type: CanvasElement["type"]) => {
    const newEl: CanvasElement = {
      id: `el_${Date.now()}`,
      type,
      content:
        type === "heading"
          ? "New Attention-Grabbing Headline"
          : type === "paragraph"
          ? "Describe your offer, social proof, and value proposition."
          : type === "button"
          ? "Click to Claim Offer"
          : type === "video"
          ? "https://www.youtube.com/watch?v=mock"
          : type === "countdown"
          ? "Offer Expires in 14:59"
          : "Two-Step Checkout Form",
      settings: {
        align: "center",
        fontSize: type === "heading" ? "text-2xl" : "text-sm",
        bgColor: type === "button" ? "#2563eb" : undefined,
        color: type === "button" ? "#ffffff" : "#111827",
      },
    };
    setElements([...elements, newEl]);
    setSelectedElementId(newEl.id);
  };

  const handleDeleteElement = (id: string) => {
    setElements(elements.filter((e) => e.id !== id));
    if (selectedElementId === id && elements.length > 1) {
      setSelectedElementId(elements[0].id);
    }
  };

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-900 text-slate-100">
      {/* Top Builder Navigation */}
      <div className="flex h-12 items-center justify-between border-b border-slate-800 bg-slate-950 px-4 shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href={`/${locationId}/sites`}
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back</span>
          </Link>
          <span className="text-slate-600">|</span>
          <span className="text-xs font-semibold text-slate-200">
            Step 1: Claim $1,000 Voucher Optin
          </span>
        </div>

        {/* Device preview toggles */}
        <div className="flex items-center rounded-lg bg-slate-800 p-0.5 border border-slate-700">
          <button
            onClick={() => setDeviceMode("desktop")}
            className={`p-1.5 rounded transition-colors ${
              deviceMode === "desktop" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
            }`}
            title="Desktop Mode"
          >
            <Monitor className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setDeviceMode("tablet")}
            className={`p-1.5 rounded transition-colors ${
              deviceMode === "tablet" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
            }`}
            title="Tablet Mode (768px)"
          >
            <Tablet className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setDeviceMode("mobile")}
            className={`p-1.5 rounded transition-colors ${
              deviceMode === "mobile" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
            }`}
            title="Mobile Mode (375px)"
          >
            <Smartphone className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 shadow-sm transition-colors"
          >
            {savedNotice ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
            <span>{savedNotice ? "Saved!" : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* Main Builder Canvas Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Elements Tool Palette (240px) */}
        <div className="w-60 border-r border-slate-800 bg-slate-950 p-4 overflow-y-auto space-y-4 shrink-0">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Add Elements
            </h3>
            <p className="text-[11px] text-slate-500 mb-3">Click to insert into canvas</p>
          </div>

          <div className="space-y-1.5">
            <button
              onClick={() => handleAddElement("heading")}
              className="flex w-full items-center gap-2.5 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-300 hover:border-blue-500 hover:text-white transition-colors"
            >
              <Type className="h-4 w-4 text-blue-400" />
              <span>Heading</span>
            </button>
            <button
              onClick={() => handleAddElement("paragraph")}
              className="flex w-full items-center gap-2.5 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-300 hover:border-blue-500 hover:text-white transition-colors"
            >
              <Type className="h-4 w-4 text-slate-400" />
              <span>Subheadline / Text</span>
            </button>
            <button
              onClick={() => handleAddElement("button")}
              className="flex w-full items-center gap-2.5 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-300 hover:border-blue-500 hover:text-white transition-colors"
            >
              <Square className="h-4 w-4 text-emerald-400" />
              <span>Call-To-Action Button</span>
            </button>
            <button
              onClick={() => handleAddElement("order_form")}
              className="flex w-full items-center gap-2.5 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-300 hover:border-blue-500 hover:text-white transition-colors"
            >
              <CreditCard className="h-4 w-4 text-purple-400" />
              <span>2-Step Order Form</span>
            </button>
            <button
              onClick={() => handleAddElement("countdown")}
              className="flex w-full items-center gap-2.5 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-300 hover:border-blue-500 hover:text-white transition-colors"
            >
              <Clock className="h-4 w-4 text-amber-400" />
              <span>Urgency Countdown</span>
            </button>
          </div>
        </div>

        {/* Center Live Canvas Viewport */}
        <div className="flex-1 overflow-y-auto bg-slate-900 p-6 flex justify-center items-start">
          <div
            className={`min-h-full rounded-xl bg-white text-slate-900 shadow-2xl transition-all duration-300 p-8 space-y-6 ${
              deviceMode === "desktop"
                ? "w-full max-w-4xl"
                : deviceMode === "tablet"
                ? "w-[768px]"
                : "w-[375px]"
            }`}
          >
            {elements.map((el) => {
              const isSelected = el.id === selectedElementId;

              return (
                <div
                  key={el.id}
                  onClick={() => setSelectedElementId(el.id)}
                  className={`group relative rounded-lg p-3 transition-all cursor-pointer ${
                    isSelected
                      ? "ring-2 ring-blue-600 bg-blue-50/20"
                      : "hover:ring-1 hover:ring-slate-300"
                  }`}
                >
                  {/* Delete button hover overlay */}
                  {isSelected && (
                    <div className="absolute -top-3 right-2 flex items-center gap-1 bg-blue-600 text-white rounded px-2 py-0.5 text-[10px] font-bold shadow">
                      <span>{el.type.toUpperCase()}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteElement(el.id);
                        }}
                        className="hover:text-red-300 ml-1"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  )}

                  {el.type === "heading" && (
                    <h2
                      className={`font-black ${el.settings.fontSize || "text-3xl"} text-${
                        el.settings.align || "center"
                      }`}
                      style={{ color: el.settings.color }}
                    >
                      {el.content}
                    </h2>
                  )}

                  {el.type === "paragraph" && (
                    <p
                      className={`text-${el.settings.align || "center"} leading-relaxed ${
                        el.settings.fontSize || "text-base"
                      }`}
                      style={{ color: el.settings.color }}
                    >
                      {el.content}
                    </p>
                  )}

                  {el.type === "button" && (
                    <div className={`flex justify-${el.settings.align || "center"}`}>
                      <button
                        className="rounded-xl px-8 py-4 font-bold text-sm tracking-wide shadow-lg hover:brightness-110 transition-all uppercase"
                        style={{
                          backgroundColor: el.settings.bgColor || "#2563eb",
                          color: el.settings.color || "#ffffff",
                        }}
                      >
                        {el.content}
                      </button>
                    </div>
                  )}

                  {el.type === "order_form" && (
                    <div className="rounded-xl border-2 border-dashed border-purple-300 bg-purple-50/40 p-6 space-y-4">
                      <div className="flex items-center justify-between border-b border-purple-200 pb-3">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5 text-purple-600" />
                          <span className="font-bold text-sm text-purple-900">
                            HighLevel 2-Step Checkout
                          </span>
                        </div>
                        <span className="text-[10px] font-bold bg-purple-200 text-purple-800 px-2 py-0.5 rounded">
                          Stripe Elements Live
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <input
                          disabled
                          placeholder="Full Name"
                          className="rounded border border-slate-300 p-2 bg-white"
                        />
                        <input
                          disabled
                          placeholder="Email Address"
                          className="rounded border border-slate-300 p-2 bg-white"
                        />
                      </div>
                      <div className="rounded border border-emerald-300 bg-emerald-50/70 p-3 text-xs text-emerald-800">
                        <span className="font-bold">Order Bump Offer ($47):</span> Check this box to add 3D Whitening Gel Kit to your reservation.
                      </div>
                    </div>
                  )}

                  {el.type === "countdown" && (
                    <div className="flex justify-center">
                      <div className="inline-flex items-center gap-2 rounded-lg bg-amber-100 text-amber-900 px-4 py-2 font-mono font-bold text-sm">
                        <Clock className="h-4 w-4" />
                        <span>{el.content}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Element Inspector Panel (280px) */}
        <div className="w-72 border-l border-slate-800 bg-slate-950 p-4 overflow-y-auto space-y-4 shrink-0">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Settings2 className="h-3.5 w-3.5 text-blue-400" /> Element Properties
            </h3>
          </div>

          {selectedElement && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Text Content</label>
                <textarea
                  rows={3}
                  value={selectedElement.content}
                  onChange={(e) => {
                    setElements(
                      elements.map((el) =>
                        el.id === selectedElement.id ? { ...el, content: e.target.value } : el
                      )
                    );
                  }}
                  className="w-full rounded-md border border-slate-800 bg-slate-900 p-2 text-xs text-slate-200 outline-none focus:border-blue-500"
                />
              </div>

              {selectedElement.type === "button" && (
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Button Action</label>
                  <select className="w-full rounded-md border border-slate-800 bg-slate-900 p-2 text-xs text-slate-200 outline-none">
                    <option>Go to Next Funnel Step (1-Click Upsell)</option>
                    <option>Open Popup Modal</option>
                    <option>Scroll to Order Form</option>
                    <option>Redirect to External URL</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-slate-400 font-medium mb-1">Text Alignment</label>
                <div className="flex rounded-md bg-slate-900 p-1 border border-slate-800">
                  {(["left", "center", "right"] as const).map((align) => (
                    <button
                      key={align}
                      onClick={() => {
                        setElements(
                          elements.map((el) =>
                            el.id === selectedElement.id
                              ? { ...el, settings: { ...el.settings, align } }
                              : el
                          )
                        );
                      }}
                      className={`flex-1 capitalize py-1 rounded text-center transition-colors ${
                        selectedElement.settings.align === align
                          ? "bg-blue-600 text-white font-bold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {align}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useAppStore } from "@/lib/store";
import {
  Workflow,
  Plus,
  Play,
  CheckCircle2,
  Clock,
  GitBranch,
  MessageSquare,
  Mail,
  Tag,
  DollarSign,
  ChevronDown,
  Trash2,
  Sparkles,
} from "lucide-react";

export default function AutomationPage() {
  const { workflows } = useAppStore();
  const [activeWorkflow, setActiveWorkflow] = useState(workflows[0]);
  const [nodes, setNodes] = useState(activeWorkflow?.nodes || []);
  const [isPublished, setIsPublished] = useState(activeWorkflow?.status === "published");
  const [showAddMenuIndex, setShowAddMenuIndex] = useState<number | null>(null);

  const handleAddAction = (category: string, name: string, index: number) => {
    const newNode = {
      id: `n_${Date.now()}`,
      type: (category === "Logic" ? "delay" : "action") as any,
      name,
      category,
      config: {},
      position: { x: 250, y: (index + 1) * 120 },
    };

    const newNodes = [...nodes];
    newNodes.splice(index + 1, 0, newNode);
    setNodes(newNodes);
    setShowAddMenuIndex(null);
  };

  const handleDeleteNode = (id: string) => {
    setNodes(nodes.filter((n) => n.id !== id));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden bg-slate-100">
      {/* Top Workflow Builder Bar */}
      <div className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <Workflow className="h-5 w-5 text-blue-600" />
          <div>
            <h1 className="text-xs font-bold text-slate-900">{activeWorkflow.name}</h1>
            <p className="text-[10px] text-slate-400">Triggered by Form & Ad Submissions</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPublished(!isPublished)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all ${
              isPublished
                ? "bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-xs"
                : "bg-slate-100 text-slate-600 border border-slate-300"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isPublished ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
              }`}
            />
            <span>{isPublished ? "Published (Live)" : "Draft Mode"}</span>
          </button>
        </div>
      </div>

      {/* Visual Workflow Canvas */}
      <div className="flex-1 overflow-y-auto p-12 flex justify-center">
        <div className="flex flex-col items-center max-w-lg w-full">
          {nodes.map((node, index) => {
            const isTrigger = node.type === "trigger";
            const isDelay = node.type === "delay";
            const isCondition = node.type === "condition";

            return (
              <React.Fragment key={node.id}>
                {/* Node Box */}
                <div
                  className={`relative w-full rounded-xl border p-4 shadow-sm transition-all group ${
                    isTrigger
                      ? "border-amber-300 bg-amber-50/80 text-amber-900"
                      : isDelay
                      ? "border-purple-300 bg-purple-50/80 text-purple-900"
                      : isCondition
                      ? "border-blue-300 bg-blue-50/80 text-blue-900"
                      : "border-slate-200 bg-white text-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {isTrigger && <Play className="h-4 w-4 text-amber-600 fill-amber-600" />}
                      {isDelay && <Clock className="h-4 w-4 text-purple-600" />}
                      {isCondition && <GitBranch className="h-4 w-4 text-blue-600" />}
                      {!isTrigger && !isDelay && !isCondition && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      )}
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-75">
                        {node.category}
                      </span>
                    </div>

                    {!isTrigger && (
                      <button
                        onClick={() => handleDeleteNode(node.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-600 transition-opacity"
                        title="Delete Step"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  <h3 className="text-xs font-bold mt-1.5">{node.name}</h3>
                </div>

                {/* Connecting Line + Add Step Button */}
                <div className="relative flex flex-col items-center my-2">
                  <div className="h-6 w-0.5 bg-slate-300" />
                  <button
                    onClick={() =>
                      setShowAddMenuIndex(showAddMenuIndex === index ? null : index)
                    }
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white shadow hover:scale-110 transition-transform"
                    title="Insert Action"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                  <div className="h-6 w-0.5 bg-slate-300" />

                  {/* Add Action Dropdown Menu */}
                  {showAddMenuIndex === index && (
                    <div className="absolute top-10 z-30 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-2xl space-y-1 text-xs">
                      <div className="px-2 py-1 text-[10px] font-bold uppercase text-slate-400">
                        Choose Action
                      </div>
                      <button
                        onClick={() =>
                          handleAddAction("Communication", "Send Follow-up SMS", index)
                        }
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-slate-100 text-slate-700"
                      >
                        <MessageSquare className="h-3.5 w-3.5 text-blue-500" />
                        <span>Send SMS Message</span>
                      </button>
                      <button
                        onClick={() =>
                          handleAddAction("Communication", "Send Email Sequence", index)
                        }
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-slate-100 text-slate-700"
                      >
                        <Mail className="h-3.5 w-3.5 text-purple-500" />
                        <span>Send Email</span>
                      </button>
                      <button
                        onClick={() =>
                          handleAddAction("CRM", "Add Tag: VIP Lead", index)
                        }
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-slate-100 text-slate-700"
                      >
                        <Tag className="h-3.5 w-3.5 text-emerald-500" />
                        <span>Add / Remove Tag</span>
                      </button>
                      <button
                        onClick={() =>
                          handleAddAction("Logic", "Wait 24 Hours", index)
                        }
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-slate-100 text-slate-700"
                      >
                        <Clock className="h-3.5 w-3.5 text-amber-500" />
                        <span>Wait / Time Delay</span>
                      </button>
                    </div>
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

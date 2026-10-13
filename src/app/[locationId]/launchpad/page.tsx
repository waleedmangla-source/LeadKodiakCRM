"use client";

import React, { useState } from "react";
import { CheckCircle2, Circle, ArrowRight, ExternalLink, Smartphone, MessageSquare, CreditCard, Users, Globe } from "lucide-react";

export default function LaunchpadPage() {
  const [tasks, setTasks] = useState([
    {
      id: "google",
      title: "Connect your Google Business Profile",
      desc: "Automatically sync reviews, respond via Conversation AI, and capture leads directly from Google Maps.",
      completed: true,
      icon: Globe,
      color: "text-blue-500",
      buttonText: "Connected (Apex Dental)",
    },
    {
      id: "facebook",
      title: "Connect Facebook & Instagram Pages",
      desc: "Manage direct messages, comments, and lead form ad campaigns directly from your unified inbox.",
      completed: true,
      icon: MessageSquare,
      color: "text-indigo-500",
      buttonText: "Connected (2 Pages)",
    },
    {
      id: "stripe",
      title: "Connect Stripe to Collect Payments",
      desc: "Enable Text-to-Pay, recurring memberships, 1-click upsells, and invoice payments.",
      completed: true,
      icon: CreditCard,
      color: "text-emerald-500",
      buttonText: "Live (Stripe Connect)",
    },
    {
      id: "chat_widget",
      title: "Generate Leads with Web Chat Widget",
      desc: "Install our two-way SMS capture bubble on your WordPress, Webflow, or Funnel pages.",
      completed: false,
      icon: MessageSquare,
      color: "text-amber-500",
      buttonText: "Configure Widget",
    },
    {
      id: "mobile_app",
      title: "Download LeadConnector Mobile App",
      desc: "Respond to incoming calls, leads, and SMS on the go with our white-label iOS and Android apps.",
      completed: false,
      icon: Smartphone,
      color: "text-purple-500",
      buttonText: "Send Download Link",
    },
    {
      id: "team",
      title: "Add Team Members & Assign Permissions",
      desc: "Invite your front-desk staff, dentists, or closers with custom calendar and pipeline access.",
      completed: false,
      icon: Users,
      color: "text-rose-500",
      buttonText: "Invite Staff",
    },
  ]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Launchpad: Rapid Onboarding</h1>
            <p className="text-xs text-slate-500 mt-1">
              Complete these foundational integrations to unlock full CRM automation, inbox syncing, and revenue tracking.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl px-5 py-3">
            <div className="text-right">
              <div className="text-xs font-semibold text-slate-700">Account Readiness</div>
              <div className="text-lg font-bold text-blue-600">{progressPercent}% Completed</div>
            </div>
            <div className="h-10 w-10 rounded-full border-4 border-blue-600 border-t-slate-200 flex items-center justify-center font-bold text-xs text-slate-800">
              {completedCount}/{tasks.length}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Task Cards */}
      <div className="space-y-3">
        {tasks.map((task) => {
          const Icon = task.icon;
          return (
            <div
              key={task.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border p-5 transition-all shadow-sm ${
                task.completed
                  ? "bg-white border-slate-200"
                  : "bg-white border-slate-200 hover:border-blue-400"
              }`}
            >
              <div className="flex items-start gap-3.5">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="mt-0.5 text-slate-300 hover:text-blue-600 transition-colors"
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-slate-300" />
                  )}
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${task.color}`} />
                    <h3 className={`text-sm font-semibold ${task.completed ? "text-slate-900" : "text-slate-900"}`}>
                      {task.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 max-w-2xl">{task.desc}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:self-center">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-colors shadow-sm ${
                    task.completed
                      ? "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  <span>{task.buttonText}</span>
                  {!task.completed && <ArrowRight className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

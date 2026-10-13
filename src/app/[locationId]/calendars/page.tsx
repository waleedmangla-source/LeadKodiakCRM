"use client";

import React, { useState } from "react";
import { useAppStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  User,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Filter,
  Check,
} from "lucide-react";

export default function CalendarsPage() {
  const { calendars, calendarEvents, contacts, bookAppointment, activeLocationId } = useAppStore();

  const [activeCalId, setActiveCalId] = useState(calendars[0]?.id || "cal_invisalign");
  const [showBookingModal, setShowBookingModal] = useState(false);

  // New booking form
  const [title, setTitle] = useState("New Consultation");
  const [contactId, setContactId] = useState(contacts[0]?.id || "cnt_1");
  const [notes, setNotes] = useState("");

  const activeCalendar = calendars.find((c) => c.id === activeCalId) || calendars[0];
  const activeEvents = calendarEvents.filter((e) => e.calendarId === activeCalId);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    bookAppointment({
      locationId: activeLocationId,
      calendarId: activeCalId,
      contactId,
      title,
      startTime: "2026-10-18T14:00:00Z",
      endTime: "2026-10-18T14:45:00Z",
      status: "confirmed",
      appointmentNotes: notes,
    });
    setShowBookingModal(false);
    setTitle("New Consultation");
    setNotes("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden bg-white">
      {/* Top Calendar Toolbar */}
      <div className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-blue-600" />
            <h1 className="text-sm font-bold text-slate-900">Calendars & Appointments</h1>
          </div>

          <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1 text-xs">
            {calendars.map((cal) => (
              <button
                key={cal.id}
                onClick={() => setActiveCalId(cal.id)}
                className={`rounded px-2.5 py-1 font-semibold transition-colors ${
                  activeCalId === cal.id
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {cal.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowBookingModal(true)}
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>Book Appointment</span>
          </button>
        </div>
      </div>

      {/* Main Agenda Grid */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Upcoming Slots for {activeCalendar.name}</h2>
              <p className="text-xs text-slate-500">
                Slot duration: {activeCalendar.slotDurationMinutes} mins • Round-robin lead routing
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 text-xs font-semibold">
              Google 2-Way Sync Active
            </span>
          </div>

          <div className="space-y-3">
            {activeEvents.map((evt) => {
              const contact = contacts.find((c) => c.id === evt.contactId);

              return (
                <div
                  key={evt.id}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <CalendarIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-slate-900">{evt.title}</h3>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                          <Clock className="h-3 w-3" />
                          <span>Oct 15, 2026 • 2:30 PM - 3:15 PM</span>
                        </div>
                      </div>
                    </div>

                    <span className="rounded-full bg-blue-100 text-blue-700 px-2.5 py-0.5 text-[10px] font-bold uppercase">
                      {evt.status}
                    </span>
                  </div>

                  {contact && (
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-100 text-xs text-slate-600">
                      <span className="flex items-center gap-1 font-medium">
                        <User className="h-3.5 w-3.5 text-slate-400" />
                        {contact.firstName} {contact.lastName}
                      </span>
                      <span>•</span>
                      <span>{contact.phone}</span>
                      <span>•</span>
                      <span>{contact.email}</span>
                    </div>
                  )}

                  {evt.appointmentNotes && (
                    <p className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      "{evt.appointmentNotes}"
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Book Appointment Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <h2 className="text-sm font-bold text-slate-900">Book Client Appointment</h2>

            <form onSubmit={handleBook} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Appointment Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded border border-slate-300 p-2 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Select Contact</label>
                <select
                  value={contactId}
                  onChange={(e) => setContactId(e.target.value)}
                  className="w-full rounded border border-slate-300 p-2 outline-none focus:border-blue-600"
                >
                  {contacts.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.firstName} {c.lastName} ({c.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Internal Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Reason for consultation..."
                  className="w-full rounded border border-slate-300 p-2 outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="rounded px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-blue-600 px-4 py-1.5 font-semibold text-white hover:bg-blue-700 shadow-sm"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

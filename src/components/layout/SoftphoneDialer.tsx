"use client";

import React, { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { X, Phone, PhoneOff, Mic, MicOff, Volume2, Delete, Clock } from "lucide-react";

export function SoftphoneDialer() {
  const { dialerOpen, setDialerOpen, dialerNumber, setDialerNumber, callActive, startCall, endCall } = useAppStore();
  const [muted, setMuted] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callActive) {
      timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      setSeconds(0);
      setMuted(false);
    }
    return () => clearInterval(timer);
  }, [callActive]);

  if (!dialerOpen) return null;

  const handleDigit = (digit: string) => {
    if (!callActive) {
      setDialerNumber(dialerNumber + digit);
    }
  };

  const handleBackspace = () => {
    if (!callActive) {
      setDialerNumber(dialerNumber.slice(0, -1));
    }
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const rem = sec % 60;
    return `${mins.toString().padStart(2, "0")}:${rem.toString().padStart(2, "0")}`;
  };

  const keypad = [
    { num: "1", sub: "" },
    { num: "2", sub: "ABC" },
    { num: "3", sub: "DEF" },
    { num: "4", sub: "GHI" },
    { num: "5", sub: "JKL" },
    { num: "6", sub: "MNO" },
    { num: "7", sub: "PQRS" },
    { num: "8", sub: "TUV" },
    { num: "9", sub: "WXYZ" },
    { num: "*", sub: "" },
    { num: "0", sub: "+" },
    { num: "#", sub: "" },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
      {/* Dialer Header */}
      <div className="flex items-center justify-between bg-slate-900 px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-semibold tracking-wide">LeadConnector Web Dialer</span>
        </div>
        <button
          onClick={() => setDialerOpen(false)}
          className="rounded p-1 text-slate-400 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Screen Area */}
      <div className="bg-slate-50 p-4 border-b border-slate-200 text-center">
        {callActive ? (
          <div className="space-y-1">
            <div className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider flex items-center justify-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              Live Call Connected
            </div>
            <div className="text-lg font-bold text-slate-900">{dialerNumber || "+1 (512) 555-0192"}</div>
            <div className="text-xs font-mono text-slate-500">{formatTimer(seconds)}</div>
          </div>
        ) : (
          <div className="flex items-center justify-between border-b border-slate-300 pb-2">
            <input
              type="text"
              readOnly
              value={dialerNumber}
              placeholder="Enter phone number..."
              className="w-full bg-transparent text-center text-lg font-bold text-slate-800 outline-none"
            />
            {dialerNumber && (
              <button
                onClick={handleBackspace}
                className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <Delete className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Keypad or Active Call Controls */}
      <div className="p-4">
        {callActive ? (
          <div className="py-6 space-y-6">
            <div className="flex justify-center gap-6">
              <button
                onClick={() => setMuted(!muted)}
                className={`flex h-12 w-12 flex-col items-center justify-center rounded-full border transition-colors ${
                  muted ? "bg-red-50 border-red-300 text-red-600" : "bg-slate-100 border-slate-200 text-slate-700"
                }`}
              >
                {muted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
              <button className="flex h-12 w-12 flex-col items-center justify-center rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                <Volume2 className="h-5 w-5" />
              </button>
            </div>

            <div className="flex justify-center">
              <button
                onClick={endCall}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 transition-transform active:scale-95"
              >
                <PhoneOff className="h-6 w-6" />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-2">
              {keypad.map((k) => (
                <button
                  key={k.num}
                  onClick={() => handleDigit(k.num)}
                  className="flex flex-col items-center justify-center rounded-xl py-2.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 transition-colors active:scale-95 text-slate-800"
                >
                  <span className="text-base font-semibold leading-none">{k.num}</span>
                  {k.sub && <span className="text-[9px] font-medium text-slate-400 leading-none mt-1">{k.sub}</span>}
                </button>
              ))}
            </div>

            {/* Bottom Call Button */}
            <div className="mt-4 flex items-center justify-center">
              <button
                onClick={() => {
                  if (dialerNumber) startCall();
                  else setDialerNumber("+1 (512) 555-0192");
                }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md hover:bg-emerald-700 transition-transform active:scale-95"
                title="Initiate Outbound Call"
              >
                <Phone className="h-5 w-5 stroke-[2.5]" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

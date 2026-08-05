"use client";

import React, { useState, useEffect } from "react";
import { CONTROL_METRICS } from "@/data/controlRoomMetrics";
import { SectionHeader } from "./atoms/SectionHeader";
import { StatusDot } from "./atoms/StatusDot";
import { MonoLabel } from "./atoms/MonoLabel";

function AnimatedProgress({ percent }: { percent: number }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(percent), 200);
    return () => clearTimeout(timer);
  }, [percent]);

  return (
    <div className="w-full h-2 bg-[#1e293b] rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-[#38bdf8] to-[#818cf8] rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

export function ControlRoom() {
  const topMetrics = CONTROL_METRICS.filter((m) => !m.progressPercent);
  const barMetrics = CONTROL_METRICS.filter((m) => m.progressPercent !== undefined);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-[rgba(255,255,255,0.08)]">
      <SectionHeader
        label="SYSTEM TELEMETRY // CONTROL ROOM"
        title="Engineering Control Room"
        description="Real-time operational intelligence across the entire software delivery infrastructure."
      />

      <div className="bg-[#0f172a] border border-[rgba(56,189,248,0.3)] rounded-2xl overflow-hidden">
        {/* Header bar */}
        <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ef4444]/80" />
              <span className="w-3 h-3 rounded-full bg-[#f59e0b]/80" />
              <span className="w-3 h-3 rounded-full bg-[#22c55e]/80" />
            </div>
            <MonoLabel className="text-[#64748b]">sre-control-room.sys</MonoLabel>
          </div>
          <div className="flex items-center gap-2">
            <StatusDot status="healthy" pulse size="md" />
            <MonoLabel className="text-[#22c55e]">ALL SYSTEMS NOMINAL</MonoLabel>
          </div>
        </div>

        {/* Top metrics grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-px bg-[rgba(255,255,255,0.04)]">
          {topMetrics.map((metric) => (
            <div key={metric.id} className="bg-[#0f172a] p-5 flex flex-col items-center text-center gap-2">
              <MonoLabel className="text-[#64748b]">{metric.label}</MonoLabel>
              <span className="text-2xl font-mono font-bold text-white">{metric.value}</span>
              <StatusDot status={metric.status} pulse />
            </div>
          ))}
        </div>

        {/* Progress bar metrics */}
        <div className="p-6 space-y-5">
          {barMetrics.map((metric) => (
            <div key={metric.id} className="flex items-center gap-4">
              <MonoLabel className="text-[#94a3b8] w-32 shrink-0">{metric.label}</MonoLabel>
              <span className="text-sm font-mono font-bold text-white w-20 shrink-0">{metric.value}</span>
              <div className="flex-1">
                <AnimatedProgress percent={metric.progressPercent!} />
              </div>
              <MonoLabel className="text-[#38bdf8] w-10 text-right">{metric.progressPercent}%</MonoLabel>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

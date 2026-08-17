"use client";

import React, { useState, useEffect } from "react";
import { CONTROL_METRICS } from "@/data/controlRoomMetrics";
import { SectionHeader } from "./atoms/SectionHeader";
import { StatusDot } from "./atoms/StatusDot";
import { MonoLabel } from "./atoms/MonoLabel";
import { ScrollReveal } from "./interaction/ScrollReveal";
import { useInViewOnce } from "@/hooks/useInViewOnce";

function AnimatedProgress({ percent }: { percent: number }) {
  const [containerRef, isInView] = useInViewOnce<HTMLDivElement>({ threshold: 0.1 });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setWidth(percent), 150);
      return () => clearTimeout(timer);
    }
  }, [isInView, percent]);

  return (
    <div
      ref={containerRef}
      className="w-full h-2.5 bg-[#1e293b] rounded-full overflow-hidden p-0.5 border border-[rgba(255,255,255,0.05)]"
    >
      <div
        className="h-full bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#818cf8] rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(56,189,248,0.5)]"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

export function ControlRoom() {
  const topMetrics = CONTROL_METRICS.filter((m) => !m.progressPercent);
  const barMetrics = CONTROL_METRICS.filter((m) => m.progressPercent !== undefined);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-[rgba(255,255,255,0.08)] chapter-confidence">
      <SectionHeader
        label="SYSTEM TELEMETRY // CONTROL ROOM"
        title="Engineering Control Room"
        description="Illustrative delivery telemetry demonstrating the real-time operational visibility SRE builds into client delivery pipelines."
      />

      <ScrollReveal
        direction="up"
        className="bg-[#0f172a] border border-[rgba(56,189,248,0.3)] rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl relative"
        as="div"
      >
        {/* Header bar */}
        <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.08)] bg-[#090d16]/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ef4444]/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
              <span className="w-3 h-3 rounded-full bg-[#f59e0b]/80 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
              <span className="w-3 h-3 rounded-full bg-[#22c55e]/80 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            </div>
            <MonoLabel className="text-[#94a3b8]">sre-control-room.sys</MonoLabel>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[10px] font-mono text-[#7dd3fc]">
              SAMPLE TELEMETRY PREVIEW
            </span>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30">
              <StatusDot status="healthy" pulse size="md" />
              <MonoLabel className="text-[#22c55e]">ALL SYSTEMS NOMINAL</MonoLabel>
            </div>
          </div>
        </div>

        {/* Top metrics grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-px bg-[rgba(255,255,255,0.06)]">
          {topMetrics.map((metric) => (
            <div
              key={metric.id}
              className="bg-[#0f172a] p-6 flex flex-col items-center text-center gap-2 hover:bg-[#131d35] transition-colors cursor-default"
            >
              <MonoLabel className="text-[#64748b] uppercase tracking-wider">{metric.label}</MonoLabel>
              <span className="text-2xl sm:text-3xl font-mono font-black text-white tracking-tight">
                {metric.value}
              </span>
              <div className="mt-1">
                <StatusDot status={metric.status} pulse />
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar metrics */}
        <div className="p-6 sm:p-8 space-y-6 bg-[#090d16]/50">
          {barMetrics.map((metric) => (
            <div key={metric.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <MonoLabel className="text-[#94a3b8] sm:w-44 shrink-0">{metric.label}</MonoLabel>
              <div className="flex items-center gap-3 flex-1">
                <span className="text-xs sm:text-sm font-mono font-bold text-white w-20 shrink-0">
                  {metric.value}
                </span>
                <div className="flex-1">
                  <AnimatedProgress percent={metric.progressPercent!} />
                </div>
                <MonoLabel className="text-[#38bdf8] w-12 text-right font-bold">
                  {metric.progressPercent}%
                </MonoLabel>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

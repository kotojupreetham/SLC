"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONTROL_METRICS } from "@/data/controlRoomMetrics";
import { SectionHeader } from "./atoms/SectionHeader";
import { StatusDot } from "./atoms/StatusDot";
import { MonoLabel } from "./atoms/MonoLabel";
import { isReducedMotion } from "@/lib/gsapHelpers";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function MetricProgressBar({ percent, label }: { percent: number; label: string }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !barRef.current) return;

    if (isReducedMotion()) {
      gsap.set(barRef.current, { width: `${percent}%` });
      return;
    }

    gsap.fromTo(
      barRef.current,
      { width: "0%" },
      {
        width: `${percent}%`,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: barRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, [percent]);

  return (
    <div className="w-full h-2.5 bg-[#1e293b] rounded-full overflow-hidden p-0.5 border border-[rgba(255,255,255,0.05)]">
      <div
        ref={barRef}
        role="progressbar"
        aria-label={`${label} progress`}
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-full bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#a855f7] rounded-full shadow-[0_0_12px_rgba(56,189,248,0.5),0_0_8px_rgba(168,85,247,0.3)]"
        style={{ width: "0%" }}
      />
    </div>
  );
}

export function ControlRoom() {
  const sectionRef = useRef<HTMLElement>(null);
  const consoleCardRef = useRef<HTMLDivElement>(null);
  const sheenBadgeRef = useRef<HTMLSpanElement>(null);

  const topMetrics = CONTROL_METRICS.filter((m) => !m.progressPercent);
  const barMetrics = CONTROL_METRICS.filter((m) => m.progressPercent !== undefined);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // TELE-01: Console Card Entrance
      if (consoleCardRef.current && !isReducedMotion()) {
        gsap.from(consoleCardRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: consoleCardRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }

      // TELE-03: Repeating sheen sweep on preview badge
      if (sheenBadgeRef.current && !isReducedMotion()) {
        const sheen = sheenBadgeRef.current.querySelector(".sheen-layer");
        if (sheen) {
          gsap.fromTo(
            sheen,
            { x: "-100%" },
            {
              x: "200%",
              duration: 1.2,
              ease: "power1.inOut",
              repeat: -1,
              repeatDelay: 3.5,
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 max-w-7xl mx-auto chapter-confidence">
      <SectionHeader
        label="SYSTEM TELEMETRY // CONTROL ROOM"
        title="Engineering Control Room"
        description="Illustrative delivery telemetry demonstrating the real-time operational visibility SRE builds into client delivery pipelines."
      />

      <div
        ref={consoleCardRef}
        className="bg-[#0f172a]/95 border border-[rgba(129,140,248,0.3)] rounded-3xl overflow-hidden shadow-[0_16px_60px_rgba(0,0,0,0.65),0_0_40px_rgba(129,140,248,0.1),0_0_80px_rgba(168,85,247,0.05)] backdrop-blur-2xl relative"
      >
        {/* Header bar */}
        <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.08)] bg-[#090d16]/90 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ef4444]/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
              <span className="w-3 h-3 rounded-full bg-[#f59e0b]/80 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
              <span className="w-3 h-3 rounded-full bg-[#22c55e]/80 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            </div>
            <MonoLabel className="text-[#94a3b8]">sre-control-room.sys</MonoLabel>
          </div>

          <div className="flex items-center gap-3">
            {/* TELE-03: Sheen Badge */}
            <span
              ref={sheenBadgeRef}
              className="relative overflow-hidden px-3 py-1 rounded-full bg-[#818cf8]/10 border border-[#818cf8]/35 text-[10px] font-mono text-[#c4b5fd] shadow-[0_0_12px_rgba(129,140,248,0.15)]"
            >
              <span className="relative z-10">SAMPLE TELEMETRY PREVIEW</span>
              <span className="sheen-layer absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
            </span>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 shadow-[0_0_10px_rgba(34,197,94,0.15)]">
              <StatusDot status="healthy" pulse size="md" />
              <MonoLabel className="text-[#22c55e]">ALL SYSTEMS NOMINAL</MonoLabel>
            </div>
          </div>
        </div>

        {/* Top metrics grid (TELE-01) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-px bg-[rgba(255,255,255,0.06)]">
          {topMetrics.map((metric) => (
            <div
              key={metric.id}
              className="bg-[#0f172a] p-6 flex flex-col items-center text-center gap-2 hover:bg-[#141e36] transition-colors cursor-default group"
            >
              <MonoLabel className="text-[#64748b] uppercase tracking-wider group-hover:text-[#94a3b8] transition-colors">
                {metric.label}
              </MonoLabel>
              <span className="text-2xl sm:text-3xl font-mono font-black text-white tracking-tight group-hover:text-[#38bdf8] transition-colors">
                {metric.value}
              </span>
              <div className="mt-1">
                <StatusDot status={metric.status} pulse />
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar metrics (TELE-02) */}
        <div className="p-6 sm:p-8 space-y-6 bg-[#090d16]/60">
          {barMetrics.map((metric) => (
            <div key={metric.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <MonoLabel className="text-[#94a3b8] sm:w-44 shrink-0">{metric.label}</MonoLabel>
              <div className="flex items-center gap-3 flex-1">
                <span className="text-xs sm:text-sm font-mono font-bold text-white w-20 shrink-0">
                  {metric.value}
                </span>
                <div className="flex-1">
                  <MetricProgressBar percent={metric.progressPercent!} label={metric.label} />
                </div>
                <MonoLabel className="text-[#38bdf8] w-12 text-right font-bold">
                  {metric.progressPercent}%
                </MonoLabel>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

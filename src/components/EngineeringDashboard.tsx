"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/data/services";
import { SectionHeader } from "./atoms/SectionHeader";
import { StatusDot } from "./atoms/StatusDot";
import { MonoLabel } from "./atoms/MonoLabel";
import { cn } from "@/lib/cn";
import { ArrowRight } from "lucide-react";
import { getServiceIcon } from "@/lib/icons";
import { isReducedMotion } from "@/lib/gsapHelpers";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function EngineeringDashboard() {
  const [selectedId, setSelectedId] = useState(SERVICES[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const rowsListRef = useRef<HTMLDivElement>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);
  const chipsContainerRef = useRef<HTMLDivElement>(null);

  const active = SERVICES.find((s) => s.id === selectedId) || SERVICES[0];
  const ActiveServiceIcon = getServiceIcon(active.id);

  // CAP-01: Row entrance stagger
  useEffect(() => {
    if (typeof window === "undefined" || !rowsListRef.current) return;

    const ctx = gsap.context(() => {
      const rows = rowsListRef.current?.querySelectorAll(".module-row");
      if (!rows || rows.length === 0) return;

      if (isReducedMotion()) {
        gsap.set(rows, { opacity: 1, y: 0 });
        return;
      }

      gsap.from(rows, {
        y: 20,
        opacity: 0,
        duration: 0.45,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rowsListRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // CAP-02 & CAP-04: Crossfade & Chip stagger on detail selection
  useEffect(() => {
    if (typeof window === "undefined" || !detailPanelRef.current) return;

    if (isReducedMotion()) return;

    // Crossfade detail panel
    gsap.fromTo(
      detailPanelRef.current,
      { opacity: 0.7, y: 8 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" }
    );

    // CAP-04: Chip stagger
    if (chipsContainerRef.current) {
      const chips = chipsContainerRef.current.querySelectorAll(".tech-chip");
      if (chips.length > 0) {
        gsap.fromTo(
          chips,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: "power1.out" }
        );
      }
    }
  }, [selectedId]);

  return (
    <section ref={sectionRef} className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeader
        label="SYSTEM CAPABILITIES // SERVICES"
        title="Engineering Control Console"
        description="We deploy specialized, automated engineering modules directly into your software delivery pipelines."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Module List (CAP-01) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div
            ref={rowsListRef}
            role="tablist"
            aria-label="Engineering Capabilities"
            className="flex flex-col gap-3"
          >
            {SERVICES.map((service) => {
              const isSelected = service.id === selectedId;
              const ServiceIcon = getServiceIcon(service.id);

              return (
                <button
                  key={service.id}
                  id={`tab-${service.id}`}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`panel-${service.id}`}
                  onClick={() => setSelectedId(service.id)}
                  data-cursor="interactive"
                  className={cn(
                    "module-row p-5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between relative overflow-hidden group",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] cursor-pointer",
                    isSelected
                      ? "bg-[#0f172a] border-[#38bdf8] shadow-[0_0_25px_rgba(56,189,248,0.22)] scale-[1.01]"
                      : "bg-[#030712]/80 border-[rgba(255,255,255,0.08)] hover:border-[#38bdf8]/40 hover:bg-[#0f172a]/60 hover:translate-x-1"
                  )}
                >
                  {/* Active Indicator Strip */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#38bdf8] to-[#818cf8] shadow-[0_0_12px_#38bdf8]" />
                  )}

                  <div className="flex items-center gap-3.5">
                    <div
                      className={cn(
                        "p-2.5 rounded-xl border transition-all shrink-0",
                        isSelected
                          ? "bg-[#38bdf8]/20 border-[#38bdf8]/50 text-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                          : "bg-[#090d16] border-[rgba(255,255,255,0.08)] text-[#64748b] group-hover:text-[#38bdf8]"
                      )}
                    >
                      <ServiceIcon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <MonoLabel className="text-[#38bdf8]">{service.code}</MonoLabel>
                      <span
                        className={cn(
                          "text-base font-bold tracking-tight transition-colors",
                          isSelected ? "text-white" : "text-[#cbd5e1] group-hover:text-white"
                        )}
                      >
                        {service.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "text-[10px] font-mono px-3 py-1 rounded-full uppercase tracking-wider hidden sm:inline-block transition-colors",
                        isSelected
                          ? "bg-[rgba(56,189,248,0.15)] text-[#38bdf8] border border-[rgba(56,189,248,0.3)]"
                          : "bg-[#1e293b]/70 border border-[rgba(255,255,255,0.06)] text-[#94a3b8]"
                      )}
                    >
                      {service.category}
                    </span>
                    <ArrowRight
                      className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        isSelected ? "text-[#38bdf8] translate-x-1" : "text-[#475569] group-hover:text-[#38bdf8]"
                      )}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail Panel (CAP-02, CAP-03, CAP-04) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden border border-[rgba(255,255,255,0.1)] shadow-2xl">
          <div
            ref={detailPanelRef}
            id={`panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${active.id}`}
            className="relative z-10"
          >
            <div className="flex justify-between items-center pb-4 border-b border-[rgba(255,255,255,0.08)] mb-6">
              <MonoLabel className="text-[#38bdf8]">{`${active.code} // TELEMETRY DETAIL`}</MonoLabel>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#030712]/70 border border-[rgba(255,255,255,0.1)] shadow-inner">
                <StatusDot status="healthy" pulse />
                <MonoLabel className="text-[#22c55e]">ACTIVE MODULE</MonoLabel>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="p-3.5 rounded-2xl bg-[#38bdf8]/15 border border-[#38bdf8]/40 text-[#38bdf8] shadow-[0_0_20px_rgba(56,189,248,0.25)]">
                <ActiveServiceIcon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {active.name}
              </h3>
            </div>

            <p className="text-[#cbd5e1] text-sm md:text-base leading-relaxed mb-8">
              {active.description}
            </p>

            {/* Stat Tiles (CAP-03) */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {active.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-[#030712]/70 border border-[rgba(255,255,255,0.08)] shadow-inner transition-all hover:border-[#38bdf8]/35 hover:bg-[#030712]"
                >
                  <span className="text-xs font-mono text-[#64748b] block mb-1 uppercase tracking-wider">
                    {metric.label}
                  </span>
                  <span className="text-xl md:text-2xl font-mono font-bold text-[#38bdf8]">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Integrated Technology Chips (CAP-04) */}
          <div className="relative z-10 pt-4 border-t border-[rgba(255,255,255,0.08)]">
            <MonoLabel className="block mb-3 text-[#64748b]">INTEGRATED TECHNOLOGIES</MonoLabel>
            <div ref={chipsContainerRef} className="flex flex-wrap gap-2">
              {active.tags.map((tag, i) => (
                <span
                  key={i}
                  data-cursor="interactive"
                  className="tech-chip px-3.5 py-1.5 rounded-xl bg-[#1e293b]/80 border border-[#334155] text-xs font-mono text-[#cbd5e1] shadow-sm hover:border-[#38bdf8]/50 hover:text-white transition-all duration-200 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

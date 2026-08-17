"use client";

import React, { useState } from "react";
import { SERVICES } from "@/data/services";
import { SectionHeader } from "./atoms/SectionHeader";
import { StatusDot } from "./atoms/StatusDot";
import { MonoLabel } from "./atoms/MonoLabel";
import { ScrollReveal } from "./interaction/ScrollReveal";
import { cn } from "@/lib/cn";
import { ArrowRight } from "lucide-react";
import { getServiceIcon } from "@/lib/icons";

export function EngineeringDashboard() {
  const [selectedId, setSelectedId] = useState(SERVICES[0].id);
  const active = SERVICES.find((s) => s.id === selectedId) || SERVICES[0];
  const ActiveServiceIcon = getServiceIcon(active.id);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeader
        label="SYSTEM CAPABILITIES // SERVICES"
        title="Engineering Control Console"
        description="We deploy specialized, automated engineering modules directly into your software delivery pipelines."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Module List */}
        <ScrollReveal
          direction="left"
          className="lg:col-span-5 flex flex-col gap-3"
          as="div"
        >
          <div role="tablist" aria-label="Engineering Capabilities" className="flex flex-col gap-3">
            {SERVICES.map((service, index) => {
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
                  style={{
                    transitionDelay: `${index * 40}ms`,
                  }}
                  className={cn(
                    "p-5 rounded-2xl border text-left transition-all duration-240 flex items-center justify-between relative overflow-hidden group",
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
        </ScrollReveal>

        {/* Detail Panel */}
        <ScrollReveal
          direction="right"
          className="lg:col-span-7 glass-panel rounded-3xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden border border-[rgba(255,255,255,0.1)] shadow-2xl"
          as="div"
        >
          <div
            id={`panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${active.id}`}
            key={active.id}
            className="relative z-10 transition-all duration-280 animate-in fade-in slide-in-from-right-3"
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

          <div className="relative z-10 pt-4 border-t border-[rgba(255,255,255,0.08)]">
            <MonoLabel className="block mb-3 text-[#64748b]">INTEGRATED TECHNOLOGIES</MonoLabel>
            <div className="flex flex-wrap gap-2">
              {active.tags.map((tag, i) => (
                <span
                  key={i}
                  data-cursor="interactive"
                  className="px-3.5 py-1.5 rounded-xl bg-[#1e293b]/80 border border-[#334155] text-xs font-mono text-[#cbd5e1] shadow-sm hover:border-[#38bdf8]/50 hover:text-white transition-all duration-200 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

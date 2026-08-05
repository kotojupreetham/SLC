"use client";

import React, { useState } from "react";
import { SERVICES } from "@/data/services";
import { SectionHeader } from "./atoms/SectionHeader";
import { StatusDot } from "./atoms/StatusDot";
import { MonoLabel } from "./atoms/MonoLabel";
import { cn } from "@/lib/cn";

export function EngineeringDashboard() {
  const [selectedId, setSelectedId] = useState(SERVICES[0].id);
  const active = SERVICES.find((s) => s.id === selectedId) || SERVICES[0];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeader
        label="SYSTEM CAPABILITIES // SERVICES"
        title="Engineering Control Console"
        description="We don't offer generic IT consulting. We deploy specialized engineering modules into your software infrastructure."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Module list */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {SERVICES.map((service) => {
            const isSelected = service.id === selectedId;
            return (
              <button
                key={service.id}
                onClick={() => setSelectedId(service.id)}
                className={cn(
                  "p-4 rounded-xl border text-left transition-all duration-200 flex items-center justify-between",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d16]",
                  isSelected
                    ? "bg-[#0f172a] border-[#38bdf8] shadow-[0_0_20px_rgba(56,189,248,0.15)]"
                    : "bg-[#090d16] border-[rgba(255,255,255,0.08)] hover:border-[#334155] hover:bg-[#0f172a]/40"
                )}
              >
                <div className="flex flex-col gap-1">
                  <MonoLabel>{service.code}</MonoLabel>
                  <span className={cn("text-sm font-semibold", isSelected ? "text-white" : "text-[#cbd5e1]")}>
                    {service.name}
                  </span>
                </div>
                <span
                  className={cn(
                    "text-xs font-mono px-2.5 py-1 rounded-md",
                    isSelected
                      ? "bg-[rgba(56,189,248,0.15)] text-[#38bdf8] border border-[rgba(56,189,248,0.3)]"
                      : "bg-[#1e293b] text-[#94a3b8]"
                  )}
                >
                  {service.category}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-7 bg-[#0f172a] border border-[rgba(56,189,248,0.3)] rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

          <div className="relative">
            <div className="flex justify-between items-center pb-4 border-b border-[rgba(255,255,255,0.08)] mb-6">
              <MonoLabel className="text-[#38bdf8]">{`${active.code} // TELEMETRY DETAIL`}</MonoLabel>
              <div className="inline-flex items-center gap-2">
                <StatusDot status="healthy" pulse />
                <MonoLabel className="text-[#22c55e]">ACTIVE MODULE</MonoLabel>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{active.name}</h3>
            <p className="text-[#cbd5e1] text-sm leading-relaxed mb-8">{active.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {active.metrics.map((metric, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#090d16]/80 border border-[rgba(255,255,255,0.08)]">
                  <span className="text-xs font-mono text-[#64748b] block mb-1">{metric.label}</span>
                  <span className="text-xl font-mono font-bold text-[#38bdf8]">{metric.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <MonoLabel className="block mb-2">INTEGRATED TECHNOLOGIES</MonoLabel>
            <div className="flex flex-wrap gap-2">
              {active.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 rounded-md bg-[#1e293b]/80 border border-[#334155] text-xs font-mono text-[#cbd5e1]">
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

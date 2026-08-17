"use client";

import React, { useState } from "react";
import { TECH_NODES } from "@/data/techNodes";
import { SectionHeader } from "./atoms/SectionHeader";
import { StatusDot } from "./atoms/StatusDot";
import { MonoLabel } from "./atoms/MonoLabel";
import { ScrollReveal } from "./interaction/ScrollReveal";
import { cn } from "@/lib/cn";
import { Cpu, Layers } from "lucide-react";

export function TechEcosystem() {
  const [activeTech, setActiveTech] = useState(TECH_NODES[0]);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-[rgba(255,255,255,0.08)] chapter-proof">
      <SectionHeader
        label="CONNECTED ECOSYSTEM // TECH STACK"
        title="Interactive Architecture Matrix"
        description="Select a component to inspect its exact position and operational purpose within the software delivery pipeline."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Tech Grid */}
        <ScrollReveal
          direction="up"
          className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4"
          as="div"
        >
          {TECH_NODES.map((node, index) => {
            const isActive = node.id === activeTech.id;
            return (
              <button
                key={node.id}
                onClick={() => setActiveTech(node)}
                data-cursor="interactive"
                style={{
                  transitionDelay: `${index * 30}ms`,
                }}
                className={cn(
                  "p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between h-36 cursor-pointer relative overflow-hidden group",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d16]",
                  isActive
                    ? "bg-[#0f172a] border-[#38bdf8] ring-1 ring-[#38bdf8] shadow-[0_0_25px_rgba(56,189,248,0.25)] scale-[1.02]"
                    : "bg-[#090d16] border-[rgba(255,255,255,0.08)] hover:border-[#38bdf8]/40 hover:bg-[#0f172a]/70 hover:-translate-y-1"
                )}
              >
                <div className="flex justify-between items-start">
                  <MonoLabel className="text-[#94a3b8]">{node.category}</MonoLabel>
                  <StatusDot status={isActive ? "accent" : "healthy"} pulse={isActive} size="md" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1 tracking-tight group-hover:text-[#38bdf8] transition-colors">
                    {node.name}
                  </h4>
                  <MonoLabel className="text-[#818cf8]">{node.pipelineStage}</MonoLabel>
                </div>
              </button>
            );
          })}
        </ScrollReveal>

        {/* Node Inspector Panel */}
        <ScrollReveal
          direction="right"
          className="bg-[#0f172a] border border-[rgba(56,189,248,0.3)] rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[360px] shadow-2xl relative overflow-hidden backdrop-blur-xl"
          as="div"
        >
          <div key={activeTech.id} className="transition-all duration-280 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(255,255,255,0.08)] mb-5">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#38bdf8]" />
                <MonoLabel className="text-[#38bdf8]">NODE INSPECTOR</MonoLabel>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#1e293b] border border-[rgba(255,255,255,0.08)] text-[#94a3b8]">
                {activeTech.category}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight">
              {activeTech.name}
            </h3>

            <div className="space-y-4 mb-4">
              <div>
                <MonoLabel className="text-[#64748b] block mb-1">[ PIPELINE STAGE ]</MonoLabel>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[rgba(56,189,248,0.12)] border border-[rgba(56,189,248,0.3)] text-[#38bdf8] text-xs font-mono font-bold">
                  <Layers className="w-3.5 h-3.5" />
                  {activeTech.pipelineStage}
                </span>
              </div>

              <div>
                <MonoLabel className="text-[#64748b] block mb-1">[ OPERATIONAL ROLE ]</MonoLabel>
                <p className="text-[#cbd5e1] text-xs sm:text-sm leading-relaxed">
                  {activeTech.roleDescription}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] mt-4 flex items-center justify-between">
            <MonoLabel className="text-[#64748b]">STATUS: INTEGRATED</MonoLabel>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30">
              <StatusDot status="healthy" pulse />
              <MonoLabel className="text-[#22c55e]">NOMINAL</MonoLabel>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { TECH_NODES } from "@/data/techNodes";
import { SectionHeader } from "./atoms/SectionHeader";
import { StatusDot } from "./atoms/StatusDot";
import { MonoLabel } from "./atoms/MonoLabel";
import { cn } from "@/lib/cn";

export function TechEcosystem() {
  const [activeTech, setActiveTech] = useState(TECH_NODES[0]);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-[rgba(255,255,255,0.08)]">
      <SectionHeader
        label="CONNECTED ECOSYSTEM // TECH STACK"
        title="Interactive Architecture Matrix"
        description="Select a component to inspect its exact position and operational purpose within the software delivery pipeline."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {TECH_NODES.map((node) => {
            const isActive = node.id === activeTech.id;
            return (
              <button
                key={node.id}
                onClick={() => setActiveTech(node)}
                className={cn(
                  "p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between h-36",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d16]",
                  isActive
                    ? "bg-[#0f172a] border-[#38bdf8] ring-1 ring-[#38bdf8] shadow-[0_0_25px_rgba(56,189,248,0.2)]"
                    : "bg-[#090d16] border-[rgba(255,255,255,0.08)] hover:border-[#334155] hover:bg-[#0f172a]/50"
                )}
              >
                <div className="flex justify-between items-start">
                  <MonoLabel>{node.category}</MonoLabel>
                  <StatusDot status={isActive ? "accent" : "healthy"} pulse={isActive} size="md" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">{node.name}</h4>
                  <MonoLabel className="text-[#818cf8]">{node.pipelineStage}</MonoLabel>
                </div>
              </button>
            );
          })}
        </div>

        <div className="bg-[#0f172a] border border-[rgba(56,189,248,0.3)] rounded-2xl p-6 flex flex-col justify-between min-h-[300px]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(255,255,255,0.08)] mb-4">
              <MonoLabel className="text-[#38bdf8]">NODE INSPECTOR</MonoLabel>
              <MonoLabel>{activeTech.category}</MonoLabel>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{activeTech.name}</h3>
            <div className="inline-block px-2.5 py-1 rounded bg-[rgba(56,189,248,0.1)] border border-[rgba(56,189,248,0.2)] text-[#38bdf8] text-xs font-mono mb-4">
              Pipeline Stage: {activeTech.pipelineStage}
            </div>
            <p className="text-[#cbd5e1] text-sm leading-relaxed">{activeTech.roleDescription}</p>
          </div>
          <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] mt-6 flex items-center justify-between">
            <MonoLabel className="text-[#64748b]">STATUS: INTEGRATED</MonoLabel>
            <div className="flex items-center gap-1.5">
              <StatusDot status="healthy" />
              <MonoLabel className="text-[#22c55e]">CONNECTED</MonoLabel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

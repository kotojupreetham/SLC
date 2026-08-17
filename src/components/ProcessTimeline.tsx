import React from "react";
import { PROCESS_STEPS } from "@/data/processSteps";
import { SectionHeader } from "./atoms/SectionHeader";
import { ScrollReveal } from "./interaction/ScrollReveal";
import { ArrowRight } from "lucide-react";

export function ProcessTimeline() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-[rgba(255,255,255,0.08)] chapter-proof">
      <SectionHeader
        label="ENGINEERING METHODOLOGY // PROCESS"
        title="How We Build Reliability"
        description="Our proven multi-stage consulting methodology transforms legacy deployment friction into hardened, automated delivery pipelines."
      />

      {/* Desktop Circuit Trace Line */}
      <div className="hidden lg:block mb-8 circuit-divider" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {PROCESS_STEPS.map((s, index) => (
          <ScrollReveal
            key={s.step}
            staggerIndex={index}
            direction="up"
            as="div"
            className="p-8 rounded-3xl bg-[#0f172a] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(56,189,248,0.35)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.55),0_0_20px_rgba(56,189,248,0.06)] hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden cursor-default"
          >
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#38bdf8]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#818cf8] block group-hover:scale-105 transition-transform duration-200">
                  {s.step}
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#1e293b] border border-[rgba(255,255,255,0.06)] text-[#64748b] group-hover:text-[#94a3b8] transition-colors">
                  {`PHASE ${s.step}`}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#38bdf8] transition-colors duration-200">
                {s.name}
              </h3>

              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                {s.desc}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-[#64748b] group-hover:text-[#38bdf8] transition-colors">
              <span className="text-[10px] font-mono tracking-wider uppercase">METHODOLOGY TRACK</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-200" />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

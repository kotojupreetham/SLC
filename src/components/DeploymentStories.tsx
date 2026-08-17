import React from "react";
import { CASE_STUDIES } from "@/data/caseStudies";
import { SectionHeader } from "./atoms/SectionHeader";
import { MonoLabel } from "./atoms/MonoLabel";
import { CheckCircle2, TrendingUp } from "lucide-react";

export function DeploymentStories() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-[rgba(255,255,255,0.08)]">
      <SectionHeader
        label="PROVEN OUTCOMES // CASE STUDIES"
        title="Deployment Stories"
        description="Real-world case studies detailing how we resolve release bottlenecks, eliminate downtime, and accelerate software delivery."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CASE_STUDIES.map((story) => (
          <article
            key={story.id}
            className="bg-[#0f172a] border border-[rgba(255,255,255,0.08)] rounded-3xl p-8 sm:p-10 flex flex-col justify-between hover:border-[rgba(56,189,248,0.35)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300 relative overflow-hidden group"
          >
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#38bdf8]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <MonoLabel className="text-[#38bdf8] block">{story.clientCategory}</MonoLabel>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#1e293b] border border-[rgba(255,255,255,0.06)] text-[#94a3b8]">
                  VERIFIED OUTCOME
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight group-hover:text-[#38bdf8] transition-colors duration-200">
                {story.title}
              </h3>

              <div className="space-y-5 mb-8">
                <div className="p-4 rounded-2xl bg-[#090d16]/70 border border-[rgba(239,68,68,0.15)]">
                  <MonoLabel className="text-[#ef4444] block mb-1.5">[ CHALLENGE ]</MonoLabel>
                  <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">{story.problem}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#090d16]/70 border border-[rgba(56,189,248,0.15)]">
                  <MonoLabel className="text-[#38bdf8] block mb-1.5">[ ARCHITECTURAL SOLUTION ]</MonoLabel>
                  <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">{story.architectureFix}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[rgba(255,255,255,0.08)]">
              <div className="flex items-center gap-1.5 mb-3">
                <TrendingUp className="w-3.5 h-3.5 text-[#22c55e]" />
                <MonoLabel className="text-[#22c55e]">[ BUSINESS IMPACT ]</MonoLabel>
              </div>
              <ul className="space-y-2.5">
                {story.businessImpact.map((impact, idx) => (
                  <li
                    key={idx}
                    className="p-2.5 rounded-xl bg-[#030712]/60 border border-[rgba(34,197,94,0.15)] text-xs font-mono text-[#e2e8f0] flex items-center gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0" />
                    <span>{impact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

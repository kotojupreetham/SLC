import React from "react";
import { CASE_STUDIES } from "@/data/caseStudies";
import { SectionHeader } from "./atoms/SectionHeader";
import { MonoLabel } from "./atoms/MonoLabel";
import { ScrollReveal } from "./interaction/ScrollReveal";
import { CheckCircle2, TrendingUp, Terminal } from "lucide-react";

export function DeploymentStories() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-[rgba(255,255,255,0.08)] chapter-proof">
      <SectionHeader
        label="PROVEN OUTCOMES // CASE STUDIES"
        title="Deployment Stories"
        description="Real-world case studies detailing how we resolve release bottlenecks, eliminate downtime, and accelerate software delivery."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CASE_STUDIES.map((story, index) => (
          <ScrollReveal
            key={story.id}
            staggerIndex={index}
            direction="up"
            as="article"
            className="bg-[#0f172a] border border-[rgba(255,255,255,0.08)] rounded-3xl p-8 sm:p-10 flex flex-col justify-between hover:border-[rgba(56,189,248,0.35)] hover:shadow-[0_16px_45px_rgba(0,0,0,0.55),0_0_25px_rgba(56,189,248,0.06)] hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group cursor-default"
          >
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#38bdf8]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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

              {/* Interactive Telemetry Visual Snippet */}
              <div className="mb-6 p-3.5 rounded-2xl bg-[#030712]/90 border border-[rgba(56,189,248,0.18)] font-mono text-[11px] space-y-2 overflow-hidden shadow-inner group-hover:border-[rgba(56,189,248,0.35)] transition-colors">
                <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-1.5 text-[10px] text-[#64748b]">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-[#38bdf8]" />
                    <span className="text-[#94a3b8]">
                      {index === 0 ? "argo-canary-rollout.yaml" : "cosign-vault-policy.rego"}
                    </span>
                  </div>
                  <span className="text-[#22c55e] font-bold">● VERIFIED PASS</span>
                </div>
                <div className="text-[#94a3b8] space-y-0.5 text-[10px]">
                  <div>
                    <span className="text-[#38bdf8]">&gt;</span>{" "}
                    {index === 0
                      ? "Traffic shifting: 10% ➔ 50% ➔ 100% (Canary Promotion)"
                      : "Image signature valid: cosign verify --key k8s-cosign.pub"}
                  </div>
                  <div className="text-[#818cf8]">
                    <span className="text-[#38bdf8]">&gt;</span>{" "}
                    {index === 0
                      ? "MTTR latency: 42ms | Error rate: 0.00% (Stable)"
                      : "SAST/DAST Gate: 0 Critical / 0 High vulnerabilities"}
                  </div>
                </div>
                <div className="w-full bg-[#1e293b] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#38bdf8] to-[#22c55e] rounded-full transition-all duration-700"
                    style={{ width: index === 0 ? "100%" : "98%" }}
                  />
                </div>
              </div>

              <div className="space-y-5 mb-8">
                <div className="p-4 rounded-2xl bg-[#090d16]/70 border border-[rgba(239,68,68,0.15)] group-hover:border-[rgba(239,68,68,0.25)] transition-colors">
                  <MonoLabel className="text-[#ef4444] block mb-1.5">[ CHALLENGE ]</MonoLabel>
                  <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">{story.problem}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#090d16]/70 border border-[rgba(56,189,248,0.15)] group-hover:border-[rgba(56,189,248,0.3)] transition-colors">
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
                    className="p-2.5 rounded-xl bg-[#030712]/60 border border-[rgba(34,197,94,0.15)] text-xs font-mono text-[#e2e8f0] flex items-center gap-2.5 group-hover:border-[rgba(34,197,94,0.25)] transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0" />
                    <span>{impact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROCESS_STEPS } from "@/data/processSteps";
import { SectionHeader } from "./atoms/SectionHeader";
import { ArrowRight } from "lucide-react";
import { isReducedMotion } from "@/lib/gsapHelpers";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const steps = stepsContainerRef.current?.querySelectorAll(".process-step-card");
      if (!steps || steps.length === 0) return;

      if (isReducedMotion()) {
        gsap.set(steps, { opacity: 1, y: 0 });
        return;
      }

      // CASE-01: Line draw animation
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, opacity: 0.2 },
          {
            scaleX: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "bottom 70%",
              scrub: 0.5,
            },
          }
        );
      }

      // CASE-02: Step cards entrance stagger
      gsap.from(steps, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: stepsContainerRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 max-w-7xl mx-auto border-t border-[rgba(255,255,255,0.08)] chapter-proof">
      <SectionHeader
        label="ENGINEERING METHODOLOGY // PROCESS"
        title="How We Build Reliability"
        description="Our proven multi-stage consulting methodology transforms legacy deployment friction into hardened, automated delivery pipelines."
      />

      {/* Desktop Circuit Trace Line (CASE-01) */}
      <div
        ref={lineRef}
        style={{ transformOrigin: "left center" }}
        className="hidden lg:block mb-8 circuit-divider"
      />

      <div
        ref={stepsContainerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative"
      >
        {PROCESS_STEPS.map((s) => (
          <div
            key={s.step}
            className="process-step-card p-8 rounded-3xl bg-[#0f172a] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(56,189,248,0.35)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.55),0_0_20px_rgba(56,189,248,0.06)] hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden cursor-default"
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
          </div>
        ))}
      </div>
    </section>
  );
}

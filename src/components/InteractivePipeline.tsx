"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PIPELINE_STAGES } from "@/data/pipelineStages";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MonoLabel } from "./atoms/MonoLabel";
import { StatusDot } from "./atoms/StatusDot";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function InteractivePipeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<SVGSVGElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      if (typeof window === "undefined" || window.innerWidth < 768) return;

      const totalRotation = -360 * 3;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=3500",
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const currentAngle = self.progress * totalRotation;

          if (wheelRef.current) {
            gsap.set(wheelRef.current, {
              rotate: currentAngle,
              force3D: true,
            });
          }

          const normalizedAngle = ((-currentAngle % 360) + 360) % 360;
          const stageStep = 360 / PIPELINE_STAGES.length;
          const index = Math.floor(
            ((normalizedAngle + stageStep / 2) % 360) / stageStep
          );

          setActiveIndex(index);
        },
      });
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  const activeStage = PIPELINE_STAGES[activeIndex];

  return (
    <section
      id="pipeline"
      ref={containerRef}
      className="relative w-full h-screen bg-[#090d16] overflow-hidden flex items-center justify-center px-4"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Frame */}
      <div className="relative w-full max-w-5xl h-[85vh] border border-[rgba(255,255,255,0.08)] rounded-2xl bg-[#0f172a]/40 backdrop-blur-md flex items-center justify-center shadow-2xl overflow-hidden">
        {/* Top telemetry bar */}
        <div className="absolute top-5 left-6 right-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <StatusDot status="healthy" pulse size="md" />
            <MonoLabel className="text-[#38bdf8]">LIVE PIPELINE STREAM</MonoLabel>
          </div>
          <MonoLabel>SCROLL TO NAVIGATE</MonoLabel>
        </div>

        {/* Top pointer */}
        <div className="absolute top-14 z-20 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-[#38bdf8] drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" />

        {/* Wheel */}
        <div className="relative w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px] flex items-center justify-center">
          <svg
            ref={wheelRef}
            viewBox="0 0 500 500"
            className="w-full h-full transform-gpu will-change-transform"
            role="img"
            aria-label="DevOps pipeline lifecycle wheel showing 8 stages"
          >
            <defs>
              <linearGradient id="ringGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Outer ring */}
            <circle cx="250" cy="250" r="235" fill="none" stroke="url(#ringGlow)" strokeWidth="3" />
            {/* Inner dashed ring */}
            <circle cx="250" cy="250" r="160" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4 4" />

            {/* Stage nodes */}
            {PIPELINE_STAGES.map((stage, idx) => {
              const angle = idx * (360 / PIPELINE_STAGES.length);
              const isActive = idx === activeIndex;
              return (
                <g key={stage.id} transform={`rotate(${angle}, 250, 250)`}>
                  <text
                    x="250"
                    y="42"
                    fill={isActive ? "#38bdf8" : "#f8fafc"}
                    fontSize="11"
                    fontWeight="700"
                    fontFamily="monospace"
                    textAnchor="middle"
                    letterSpacing="2"
                    className="select-none transition-colors"
                  >
                    {stage.id.toUpperCase()}
                  </text>
                  <circle
                    cx="250"
                    cy="58"
                    r={isActive ? 4 : 2.5}
                    fill={isActive ? "#38bdf8" : "#64748b"}
                    className="transition-all"
                  />
                </g>
              );
            })}
          </svg>

          {/* Center telemetry card */}
          <div
            aria-live="polite"
            className="absolute w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[270px] md:h-[270px] rounded-full bg-[#0f172a]/90 border border-[rgba(56,189,248,0.3)] backdrop-blur-xl flex flex-col justify-center items-center text-center p-5 shadow-[inset_0_0_20px_rgba(0,0,0,0.5),0_8px_32px_rgba(0,0,0,0.5)] z-10 pointer-events-none"
          >
            <MonoLabel className="text-[#38bdf8] mb-1">{activeStage.badge}</MonoLabel>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 tracking-tight">
              {activeStage.title}
            </h3>
            <p className="text-[10px] sm:text-[11px] md:text-xs text-[#94a3b8] mb-3 line-clamp-2 leading-relaxed">
              {activeStage.description}
            </p>

            <div className="w-full grid grid-cols-2 gap-2 pt-2 border-t border-[rgba(255,255,255,0.08)]">
              {activeStage.metrics.map((m, i) => (
                <div key={i} className="flex flex-col text-left">
                  <span className="text-[8px] sm:text-[9px] font-mono text-[#64748b] uppercase">
                    {m.label}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-[#38bdf8]">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom status */}
        <div className="absolute bottom-4 flex items-center gap-3">
          <MonoLabel className="text-[#64748b]">SYSTEM STATE: OPERATIONAL</MonoLabel>
          <StatusDot status="healthy" />
        </div>
      </div>
    </section>
  );
}

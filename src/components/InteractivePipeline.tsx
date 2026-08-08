"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PIPELINE_STAGES } from "@/data/pipelineStages";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MonoLabel } from "./atoms/MonoLabel";
import { StatusDot } from "./atoms/StatusDot";
import {
  ClipboardList,
  Code2,
  Box,
  ShieldCheck,
  Rocket,
  CloudUpload,
  Settings,
  BarChart3,
  GitBranch,
  Cloud,
  Lock,
  ChevronDown,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STAGE_ICONS = [
  ClipboardList, // 01: Plan
  Code2,         // 02: Code
  Box,           // 03: Build
  ShieldCheck,   // 04: Test
  Rocket,        // 05: Release
  CloudUpload,   // 06: Deploy
  Settings,      // 07: Operate
  BarChart3,     // 08: Monitor
];

// Vibrant wedge colors matching DevOps reference diagram
const WEDGE_COLORS = [
  { main: "#0284c7", glow: "rgba(2, 132, 199, 0.4)", text: "#7dd3fc" }, // Plan: Sky Blue
  { main: "#2563eb", glow: "rgba(37, 99, 235, 0.4)", text: "#93c5fd" }, // Code: Royal Blue
  { main: "#4f46e5", glow: "rgba(79, 70, 229, 0.4)", text: "#a5b4fc" }, // Build: Indigo
  { main: "#7c3aed", glow: "rgba(124, 58, 237, 0.4)", text: "#c4b5fd" }, // Test: Purple
  { main: "#db2777", glow: "rgba(219, 39, 119, 0.4)", text: "#fbcfe8" }, // Release: Pink
  { main: "#059669", glow: "rgba(5, 150, 105, 0.4)", text: "#6ee7b7" }, // Deploy: Emerald
  { main: "#d97706", glow: "rgba(217, 119, 6, 0.4)", text: "#fde68a" }, // Operate: Amber
  { main: "#0891b2", glow: "rgba(8, 145, 178, 0.4)", text: "#67e8f9" }, // Monitor: Cyan
];

// Pre-calculated 45-degree wedge sector path (Center: 700, 700)
// Outer radius R = 560, Inner radius r = 400
// Angle range: -112.5° to -67.5° (Top centered wedge)
const WEDGE_PATH = "M 485.7 182.6 A 560 560 0 0 1 914.3 182.6 L 853.1 330.5 A 400 400 0 0 0 546.9 330.5 Z";

export function InteractivePipeline() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const wheelSvgRef = useRef<SVGSVGElement>(null);
  const textInnerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      if (typeof window === "undefined") return;

      const totalStages = PIPELINE_STAGES.length;
      const totalRotation = -(totalStages - 1) * 45; // -315 degrees sweep

      // GSAP ScrollTrigger timeline pinned section with mechanical snap
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=4200",
          pin: stickyRef.current,
          scrub: 0.8,
          snap: {
            snapTo: 1 / (totalStages - 1),
            duration: { min: 0.25, max: 0.5 },
            delay: 0.1,
            ease: "power2.inOut",
          },
        },
      });

      tl.to(wheelSvgRef.current, {
        rotate: totalRotation,
        ease: "none",
        duration: 4,
        onUpdate: function () {
          const progress = this.progress();
          const rawIndex = Math.round(progress * (totalStages - 1));
          const newIndex = Math.min(Math.max(rawIndex, 0), totalStages - 1);

          setActiveIndex((prev) => {
            if (prev !== newIndex) {
              if (textInnerRef.current) {
                gsap.fromTo(
                  textInnerRef.current,
                  { opacity: 0.15, y: -10, scale: 0.97 },
                  { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" }
                );
              }
              return newIndex;
            }
            return prev;
          });
        },
      });
    },
    { scope: wrapperRef, dependencies: [prefersReducedMotion] }
  );

  const activeStage = PIPELINE_STAGES[activeIndex];
  const ActiveIcon = STAGE_ICONS[activeIndex] || ClipboardList;
  const activeColor = WEDGE_COLORS[activeIndex] || WEDGE_COLORS[0];

  return (
    <section
      id="pipeline"
      ref={wrapperRef}
      className="relative w-full bg-[#030712] text-white"
    >
      {/* Sticky Viewport Window Container (Acts as a Mask) */}
      <div
        ref={stickyRef}
        className="relative h-screen w-full flex flex-col justify-between items-center overflow-hidden px-6 py-8"
      >
        {/* Ambient Glow Orbs */}
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-orb orb-3" />

        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        {/* --- TOP HEADER & TELEMETRY BAR --- */}
        <div className="w-full max-w-7xl flex items-center justify-between z-30 pt-4">
          <div className="flex items-center gap-3">
            <StatusDot status="healthy" pulse size="md" />
            <MonoLabel className="text-[#38bdf8] text-xs tracking-widest uppercase">
              ENGINEERING CONTROL CONSOLE // LIFECYCLE DIAL
            </MonoLabel>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono font-bold text-[#38bdf8] bg-[#0f172a]/90 px-4 py-2 rounded-full border border-[rgba(56,189,248,0.3)] shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              STAGE 0{activeIndex + 1} / 08
            </span>
          </div>
        </div>

        {/* --- FIXED CENTER INFORMATION (DOES NOT ROTATE) --- */}
        <div className="relative z-30 max-w-2xl text-center flex flex-col items-center my-auto">
          {/* Laser Pointer Dial Marker */}
          <div className="flex flex-col items-center mb-4">
            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[16px] border-t-[#38bdf8] drop-shadow-[0_0_20px_rgba(56,189,248,0.95)]" />
            <div className="w-px h-6 bg-gradient-to-b from-[#38bdf8] to-transparent animate-pulse" />
          </div>

          <div ref={textInnerRef} className="flex flex-col items-center">
            {/* Dynamic Stage Icon in Glowing Glass Badge */}
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-[#0f172a]/90 border border-[rgba(255,255,255,0.15)] flex items-center justify-center mb-4 backdrop-blur-xl transition-all duration-300"
              style={{
                boxShadow: `0 0 40px ${activeColor.glow}, inset 0 0 20px ${activeColor.glow}`,
                borderColor: activeColor.main,
              }}
            >
              <ActiveIcon className="w-8 h-8 sm:w-10 sm:h-10 transition-colors" style={{ color: activeColor.text }} />
            </div>

            {/* Badge & Subtitle */}
            <MonoLabel className="mb-2 tracking-widest text-xs font-bold" style={{ color: activeColor.text }}>
              {activeStage.badge}
            </MonoLabel>

            {/* Stage Title */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-3 drop-shadow-[0_0_35px_rgba(255,255,255,0.3)]">
              {activeStage.title}
            </h2>

            {/* Stage Description */}
            <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed mb-6 max-w-xl">
              {activeStage.description}
            </p>

            {/* Telemetry Metrics */}
            <div className="flex items-center justify-center gap-6 sm:gap-10 border-t border-[rgba(255,255,255,0.12)] pt-4 w-full max-w-md">
              {activeStage.metrics.map((m, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-[10px] font-mono text-[#64748b] uppercase tracking-wider mb-1">
                    {m.label}
                  </span>
                  <span
                    className="text-sm sm:text-base font-mono font-extrabold"
                    style={{ color: activeColor.text }}
                  >
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 8-Stage Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {PIPELINE_STAGES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  if (wrapperRef.current) {
                    const progress = idx / (PIPELINE_STAGES.length - 1);
                    const targetScroll = wrapperRef.current.offsetTop + progress * 4200;
                    window.scrollTo({ top: targetScroll, behavior: "smooth" });
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex
                    ? "w-8 bg-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.9)]"
                    : "w-2 bg-[#1e293b] hover:bg-[#334155]"
                }`}
                aria-label={`Jump to stage 0${idx + 1} ${s.id}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 mt-4 text-[11px] font-mono text-[#64748b] animate-bounce">
            <span>SCROLL DOWN TO ROTATE MECHANICAL DIAL</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#38bdf8]" />
          </div>
        </div>

        {/* --- GIANT ROTATING MECHANICAL DIAL (CLIPPED AT BOTTOM VIEWPORT MASK) --- */}
        <div className="absolute -bottom-[540px] sm:-bottom-[640px] md:-bottom-[720px] left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] sm:w-[1300px] sm:h-[1300px] md:w-[1450px] md:h-[1450px] pointer-events-auto z-20">

          {/* FLOATING RELATIONAL DEVOPS OBJECTS FLOATING AROUND THE ARC */}
          <div className="floating-devops-obj obj-delay-1 top-[8%] left-[12%] px-3.5 py-2 rounded-2xl bg-[#0f172a]/90 border border-[rgba(56,189,248,0.4)] backdrop-blur-md flex items-center gap-2 text-xs font-mono text-[#38bdf8] shadow-[0_0_20px_rgba(56,189,248,0.3)]">
            <GitBranch className="w-4 h-4 text-[#38bdf8]" />
            <span>git-branch: main</span>
          </div>

          <div className="floating-devops-obj obj-delay-2 top-[8%] right-[12%] px-3.5 py-2 rounded-2xl bg-[#0f172a]/90 border border-[rgba(129,140,248,0.4)] backdrop-blur-md flex items-center gap-2 text-xs font-mono text-[#818cf8] shadow-[0_0_20px_rgba(129,140,248,0.3)]">
            <Cloud className="w-4 h-4 text-[#818cf8]" />
            <span>k8s-pod: active</span>
          </div>

          <div className="floating-devops-obj obj-delay-3 top-[28%] left-[2%] px-3.5 py-2 rounded-2xl bg-[#0f172a]/90 border border-[rgba(34,197,94,0.4)] backdrop-blur-md flex items-center gap-2 text-xs font-mono text-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.3)]">
            <Box className="w-4 h-4 text-[#22c55e]" />
            <span>docker: build:ok</span>
          </div>

          <div className="floating-devops-obj obj-delay-1 top-[28%] right-[2%] px-3.5 py-2 rounded-2xl bg-[#0f172a]/90 border border-[rgba(245,158,11,0.4)] backdrop-blur-md flex items-center gap-2 text-xs font-mono text-[#f59e0b] shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            <Lock className="w-4 h-4 text-[#f59e0b]" />
            <span>sec-gate: zero-vuln</span>
          </div>

          {/* Outer Glowing Ambient Ring Container */}
          <div className="absolute inset-0 rounded-full border-2 border-[rgba(56,189,248,0.25)] shadow-[0_0_120px_rgba(56,189,248,0.15),inset_0_0_80px_rgba(56,189,248,0.08)] pointer-events-none" />

          {/* ROTATING SVG LIFE-CYCLE WHEEL */}
          <svg
            ref={wheelSvgRef}
            viewBox="0 0 1400 1400"
            className="w-full h-full transform-gpu will-change-transform"
            textRendering="geometricPrecision"
            shapeRendering="geometricPrecision"
            role="img"
            aria-label="DevOps mechanical lifecycle rotary dial"
          >
            <defs>
              <linearGradient id="dialOuterGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.9" />
              </linearGradient>

              <filter id="dialDropShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Outer Structural Bezel Circles */}
            <circle cx="700" cy="700" r="660" fill="none" stroke="url(#dialOuterGlow)" strokeWidth="3" />
            <circle cx="700" cy="700" r="380" fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="2" strokeDasharray="8 8" />

            {/* 8 SEGMENTED DEV-OPS CHEVRON WEDGES & STAGE TITLES */}
            {PIPELINE_STAGES.map((stage, idx) => {
              const angle = idx * 45;
              const isActive = idx === activeIndex;
              const colorConfig = WEDGE_COLORS[idx] || WEDGE_COLORS[0];
              const IconComp = STAGE_ICONS[idx] || ClipboardList;

              return (
                <g
                  key={stage.id}
                  transform={`rotate(${angle}, 700, 700)`}
                  onClick={() => {
                    if (wrapperRef.current) {
                      const progress = idx / (PIPELINE_STAGES.length - 1);
                      const targetScroll = wrapperRef.current.offsetTop + progress * 4200;
                      window.scrollTo({ top: targetScroll, behavior: "smooth" });
                    }
                  }}
                  className="cursor-pointer group"
                >
                  {/* Segmented Chevron Wedge */}
                  <path
                    d={WEDGE_PATH}
                    fill={isActive ? colorConfig.main : "rgba(15, 23, 42, 0.85)"}
                    fillOpacity={isActive ? 0.95 : 0.65}
                    stroke={isActive ? "#ffffff" : "rgba(255, 255, 255, 0.12)"}
                    strokeWidth={isActive ? "3.5" : "1.5"}
                    filter={isActive ? "url(#dialDropShadow)" : undefined}
                    className="transition-all duration-300 group-hover:fill-opacity-90"
                  />

                  {/* BOLD LARGE STAGE TEXT ON THE WHEEL */}
                  <text
                    x="700"
                    y="235"
                    textAnchor="middle"
                    fill={isActive ? "#ffffff" : colorConfig.text}
                    fontFamily="var(--font-mono)"
                    fontWeight="900"
                    fontSize={isActive ? "28" : "24"}
                    letterSpacing="4"
                    className="transition-all duration-300 select-none uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                  >
                    {stage.id}
                  </text>

                  {/* CIRCULAR ICON BADGE INSIDE WEDGE */}
                  <g transform="translate(700, 310)">
                    <circle
                      cx="0"
                      cy="0"
                      r={isActive ? "36" : "28"}
                      fill={isActive ? "#ffffff" : "#0f172a"}
                      stroke={isActive ? colorConfig.main : "rgba(255, 255, 255, 0.25)"}
                      strokeWidth="2.5"
                      className="transition-all duration-300"
                    />
                    {/* SVG Icon inside badge */}
                    <g transform={isActive ? "translate(-14, -14) scale(1.16)" : "translate(-12, -12) scale(1)"}>
                      <IconComp
                        className="w-6 h-6 transition-colors"
                        style={{ color: isActive ? colorConfig.main : colorConfig.text }}
                      />
                    </g>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}

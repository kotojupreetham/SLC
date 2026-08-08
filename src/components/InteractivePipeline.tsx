"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { PIPELINE_STAGES } from "@/data/pipelineStages";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MonoLabel } from "./atoms/MonoLabel";
import { StatusDot } from "./atoms/StatusDot";
import { GlowBadge } from "./atoms/GlowBadge";
import { SITE_CONTENT } from "@/data/siteContent";
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
  MousePointerClick,
  RotateCw,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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

export function InteractivePipeline() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wheelSvgRef = useRef<SVGSVGElement>(null);
  const textInnerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Open modal
  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setActiveIndex(0);
  }, []);

  // Close modal
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Keyboard navigation & Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setActiveIndex((prev) => (prev + 1) % PIPELINE_STAGES.length);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setActiveIndex((prev) => (prev - 1 + PIPELINE_STAGES.length) % PIPELINE_STAGES.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  // Handle scroll wheel events inside modal to rotate lifecycle
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!isOpen) return;
    if (e.deltaY > 20) {
      setActiveIndex((prev) => (prev + 1) % PIPELINE_STAGES.length);
    } else if (e.deltaY < -20) {
      setActiveIndex((prev) => (prev - 1 + PIPELINE_STAGES.length) % PIPELINE_STAGES.length);
    }
  }, [isOpen]);

  // Rotate SVG wheel when activeIndex changes
  useEffect(() => {
    if (!wheelSvgRef.current) return;
    const targetRotation = -activeIndex * (360 / PIPELINE_STAGES.length);

    gsap.to(wheelSvgRef.current, {
      rotate: targetRotation,
      duration: prefersReducedMotion ? 0 : 0.6,
      ease: "power2.out",
    });

    if (textInnerRef.current) {
      gsap.fromTo(
        textInnerRef.current,
        { opacity: 0.2, y: -8 },
        { opacity: 1, y: 0, duration: 0.25, ease: "power1.out" }
      );
    }
  }, [activeIndex, prefersReducedMotion]);

  const activeStage = PIPELINE_STAGES[activeIndex];
  const ActiveIcon = STAGE_ICONS[activeIndex] || ClipboardList;

  return (
    <>
      {/* --- HERO SECTION (NORMAL PAGE SCROLL - DOES NOT OPEN AUTOMATICALLY) --- */}
      <section id="pipeline" className="relative min-h-screen w-full bg-[#030712] text-white flex items-center justify-center px-6 py-20 overflow-hidden">
        {/* Ambient Orbs */}
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-orb orb-3" />

        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Hero Text */}
          <div className="flex flex-col items-start">
            <GlowBadge className="mb-6">{SITE_CONTENT.hero.badge}</GlowBadge>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.02] text-white">
              {SITE_CONTENT.hero.headline}{" "}
              <span className="gradient-accent block">
                {SITE_CONTENT.hero.headlineAccent}
              </span>
            </h1>

            <p className="text-[#94a3b8] text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              {SITE_CONTENT.hero.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleOpen}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#818cf8] text-[#030712] font-mono font-bold text-xs sm:text-sm tracking-wider uppercase hover:scale-105 transition-all shadow-[0_0_30px_rgba(56,189,248,0.5)] cursor-pointer"
              >
                <MousePointerClick className="w-5 h-5 animate-bounce" />
                INITIATE PIPELINE
              </button>
              <span className="text-xs font-mono text-[#64748b]">
                CLICK BUTTON OR CIRCLE TO EXPLORE
              </span>
            </div>
          </div>

          {/* Right Column: Clickable DevOps Wheel Preview */}
          <div className="flex justify-center items-center">
            <div
              onClick={handleOpen}
              className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full flex items-center justify-center cursor-pointer group transition-transform duration-300 hover:scale-105"
            >
              {/* Outer Ring Glow */}
              <div className="absolute inset-0 rounded-full border border-[rgba(56,189,248,0.35)] shadow-[0_0_60px_rgba(56,189,248,0.2),inset_0_0_40px_rgba(56,189,248,0.08)] group-hover:border-[#38bdf8] transition-colors" />

              {/* Floating Relational DevOps Objects */}
              <div className="floating-devops-obj obj-delay-1 -top-4 -left-4 px-3 py-1.5 rounded-2xl bg-[#0f172a]/90 border border-[rgba(56,189,248,0.4)] backdrop-blur-md flex items-center gap-2 text-[11px] font-mono text-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                <GitBranch className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>git-branch: main</span>
              </div>

              <div className="floating-devops-obj obj-delay-2 -top-4 -right-4 px-3 py-1.5 rounded-2xl bg-[#0f172a]/90 border border-[rgba(129,140,248,0.4)] backdrop-blur-md flex items-center gap-2 text-[11px] font-mono text-[#818cf8] shadow-[0_0_15px_rgba(129,140,248,0.3)]">
                <Cloud className="w-3.5 h-3.5 text-[#818cf8]" />
                <span>k8s-pod: active</span>
              </div>

              <div className="floating-devops-obj obj-delay-3 -bottom-4 -right-4 px-3 py-1.5 rounded-2xl bg-[#0f172a]/90 border border-[rgba(34,197,94,0.4)] backdrop-blur-md flex items-center gap-2 text-[11px] font-mono text-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                <Box className="w-3.5 h-3.5 text-[#22c55e]" />
                <span>docker: build:ok</span>
              </div>

              <div className="floating-devops-obj obj-delay-1 -bottom-4 -left-4 px-3 py-1.5 rounded-2xl bg-[#0f172a]/90 border border-[rgba(245,158,11,0.4)] backdrop-blur-md flex items-center gap-2 text-[11px] font-mono text-[#f59e0b] shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                <Lock className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>sec-gate: zero-vuln</span>
              </div>

              {/* Pulsing Badge */}
              <div className="click-prompt-badge absolute top-1/2 left-1/2 z-30 px-5 py-3 rounded-full flex items-center gap-2.5 text-xs font-mono font-bold text-[#38bdf8] uppercase tracking-wider group-hover:scale-110 transition-transform">
                <RotateCw className="w-4 h-4 animate-spin text-[#38bdf8]" />
                <span>CLICK TO OPEN LIFECYCLE</span>
              </div>

              {/* SVG Wheel Graphics */}
              <svg
                viewBox="0 0 600 600"
                className="w-full h-full"
                textRendering="geometricPrecision"
                shapeRendering="geometricPrecision"
              >
                <circle
                  cx="300"
                  cy="300"
                  r="270"
                  fill="none"
                  stroke="rgba(56, 189, 248, 0.4)"
                  strokeWidth="3"
                />
                <circle
                  cx="300"
                  cy="300"
                  r="185"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                />

                {PIPELINE_STAGES.map((stage, idx) => {
                  const angle = idx * (360 / PIPELINE_STAGES.length);
                  return (
                    <g key={stage.id} transform={`rotate(${angle}, 300, 300)`}>
                      <text
                        x="300"
                        y="44"
                        textAnchor="middle"
                        className="stage-label-text"
                      >
                        {stage.id.toUpperCase()}
                      </text>
                      <circle cx="300" cy="62" r="3.5" fill="#64748b" />
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* --- EXPLICIT FULL-SCREEN INTERACTIVE OVERLAY (OPENED ONLY ON CLICK) --- */}
      {isOpen && (
        <div
          onWheel={handleWheel}
          className="fixed inset-0 z-50 bg-[#030712]/96 backdrop-blur-2xl text-white flex flex-col justify-between items-center px-6 py-6 overflow-hidden animate-fadeIn"
        >
          {/* Top Control Header */}
          <div className="w-full max-w-7xl flex items-center justify-between z-30 pt-2">
            <div className="flex items-center gap-3">
              <StatusDot status="healthy" pulse size="md" />
              <MonoLabel className="text-[#38bdf8] text-xs">
                DEVOPS LIFECYCLE SCRUB
              </MonoLabel>
              <span className="text-xs font-mono text-[#64748b] hidden sm:inline">
                (Use Mouse Scroll or Arrow Keys)
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs font-mono font-bold text-[#38bdf8] bg-[#0f172a] px-3.5 py-1.5 rounded-full border border-[rgba(56,189,248,0.3)]">
                STAGE 0{activeIndex + 1} / 08
              </span>
              <button
                onClick={handleClose}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e293b] hover:bg-[#ef4444] text-white font-mono text-xs font-bold transition-colors border border-[rgba(255,255,255,0.1)] cursor-pointer"
              >
                <span>CLOSE PIPELINE</span>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center Wheel & Frameless Text Container */}
          <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center overflow-hidden">
            {/* Top Alignment Pointer */}
            <div className="absolute top-4 z-30 pointer-events-none flex flex-col items-center">
              <div className="w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[14px] border-t-[#38bdf8] drop-shadow-[0_0_15px_rgba(56,189,248,0.9)]" />
              <div className="w-px h-8 bg-gradient-to-b from-[#38bdf8] to-transparent animate-pulse" />
            </div>

            {/* Interactive SVG Wheel */}
            <div className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] md:w-[580px] md:h-[580px] rounded-full flex items-center justify-center">
              {/* Outer Ring Glow */}
              <div className="absolute inset-0 rounded-full border border-[rgba(56,189,248,0.4)] shadow-[0_0_80px_rgba(56,189,248,0.25),inset_0_0_50px_rgba(56,189,248,0.1)]" />

              {/* Floating Relational Objects */}
              <div className="floating-devops-obj obj-delay-1 -top-6 -left-6 px-3 py-2 rounded-2xl bg-[#0f172a]/90 border border-[rgba(56,189,248,0.4)] backdrop-blur-md flex items-center gap-2 text-xs font-mono text-[#38bdf8] shadow-[0_0_20px_rgba(56,189,248,0.3)]">
                <GitBranch className="w-4 h-4 text-[#38bdf8]" />
                <span>git-branch: main</span>
              </div>

              <div className="floating-devops-obj obj-delay-2 -top-6 -right-6 px-3 py-2 rounded-2xl bg-[#0f172a]/90 border border-[rgba(129,140,248,0.4)] backdrop-blur-md flex items-center gap-2 text-xs font-mono text-[#818cf8] shadow-[0_0_20px_rgba(129,140,248,0.3)]">
                <Cloud className="w-4 h-4 text-[#818cf8]" />
                <span>k8s-pod: active</span>
              </div>

              <div className="floating-devops-obj obj-delay-3 -bottom-6 -right-6 px-3 py-2 rounded-2xl bg-[#0f172a]/90 border border-[rgba(34,197,94,0.4)] backdrop-blur-md flex items-center gap-2 text-xs font-mono text-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                <Box className="w-4 h-4 text-[#22c55e]" />
                <span>docker: build:ok</span>
              </div>

              <div className="floating-devops-obj obj-delay-1 -bottom-6 -left-6 px-3 py-2 rounded-2xl bg-[#0f172a]/90 border border-[rgba(245,158,11,0.4)] backdrop-blur-md flex items-center gap-2 text-xs font-mono text-[#f59e0b] shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                <Lock className="w-4 h-4 text-[#f59e0b]" />
                <span>sec-gate: zero-vuln</span>
              </div>

              <svg
                ref={wheelSvgRef}
                viewBox="0 0 600 600"
                className="w-full h-full transform-gpu will-change-transform"
                textRendering="geometricPrecision"
                shapeRendering="geometricPrecision"
              >
                <defs>
                  <linearGradient
                    id="modalRingGlow"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
                    <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity="0.85" />
                  </linearGradient>

                  <filter id="modalGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                <circle
                  cx="300"
                  cy="300"
                  r="270"
                  fill="none"
                  stroke="url(#modalRingGlow)"
                  strokeWidth="3.5"
                />
                <circle
                  cx="300"
                  cy="300"
                  r="185"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                />

                {PIPELINE_STAGES.map((stage, idx) => {
                  const angle = idx * (360 / PIPELINE_STAGES.length);
                  const isActive = idx === activeIndex;

                  return (
                    <g
                      key={stage.id}
                      transform={`rotate(${angle}, 300, 300)`}
                      onClick={() => setActiveIndex(idx)}
                      className="cursor-pointer"
                    >
                      <text
                        x="300"
                        y="44"
                        textAnchor="middle"
                        className={`stage-label-text ${isActive ? "active" : ""}`}
                      >
                        {stage.id.toUpperCase()}
                      </text>
                      <circle
                        cx="300"
                        cy="62"
                        r={isActive ? 6.5 : 3.5}
                        fill={isActive ? "#38bdf8" : "#64748b"}
                        filter={isActive ? "url(#modalGlowFilter)" : undefined}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Pure Frameless Text Floating in Center of Ring */}
            <div className="absolute z-20 pointer-events-none flex flex-col items-center justify-center text-center max-w-[280px] sm:max-w-[340px] px-4">
              <div ref={textInnerRef} className="flex flex-col items-center">
                {/* Dynamic Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[rgba(56,189,248,0.12)] border border-[rgba(56,189,248,0.35)] flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(56,189,248,0.3)]">
                  <ActiveIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[#38bdf8]" />
                </div>

                <MonoLabel className="text-[#38bdf8] mb-1 tracking-widest">
                  {activeStage.badge}
                </MonoLabel>

                {/* Stage Heading */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-2 drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]">
                  {activeStage.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed mb-4 max-w-xs">
                  {activeStage.description}
                </p>

                {/* Telemetry Metrics */}
                <div className="flex items-center justify-center gap-4 text-left border-t border-[rgba(255,255,255,0.1)] pt-3 w-full">
                  {activeStage.metrics.map((m, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[9px] font-mono text-[#64748b] uppercase tracking-wider">
                        {m.label}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#38bdf8]">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stage Controls & Navigation Bar */}
          <div className="w-full max-w-4xl flex flex-col items-center gap-3 z-30 pb-2">
            {/* Stage Quick Selection Pills */}
            <div className="flex flex-wrap justify-center items-center gap-2">
              {PIPELINE_STAGES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono transition-all cursor-pointer ${
                    idx === activeIndex
                      ? "bg-[#38bdf8] text-[#030712] font-bold shadow-[0_0_15px_rgba(56,189,248,0.6)]"
                      : "bg-[#0f172a] text-[#94a3b8] hover:text-white border border-[rgba(255,255,255,0.06)]"
                  }`}
                >
                  0{idx + 1} {s.id.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Prev / Next Arrow Controls */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setActiveIndex((prev) => (prev - 1 + PIPELINE_STAGES.length) % PIPELINE_STAGES.length)}
                className="flex items-center gap-1 px-4 py-2 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] border border-[rgba(255,255,255,0.1)] text-xs font-mono text-[#38bdf8] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                PREV STAGE
              </button>

              <span className="text-xs font-mono text-[#64748b]">
                {activeIndex + 1} / {PIPELINE_STAGES.length}
              </span>

              <button
                onClick={() => setActiveIndex((prev) => (prev + 1) % PIPELINE_STAGES.length)}
                className="flex items-center gap-1 px-4 py-2 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] border border-[rgba(255,255,255,0.1)] text-xs font-mono text-[#38bdf8] transition-colors cursor-pointer"
              >
                NEXT STAGE
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

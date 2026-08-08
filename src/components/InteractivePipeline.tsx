"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
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

export function InteractivePipeline() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const wheelBoxRef = useRef<HTMLDivElement>(null);
  const wheelSvgRef = useRef<SVGSVGElement>(null);
  const centerTextRef = useRef<HTMLDivElement>(null);
  const textInnerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      if (typeof window === "undefined") return;

      const isMobile = window.innerWidth < 768;

      // 1. Initial setup
      gsap.set(heroContentRef.current, { x: 0, opacity: 1 });
      gsap.set(wheelBoxRef.current, {
        scale: isMobile ? 0.6 : 0.65,
        x: isMobile ? 0 : "22vw",
        y: isMobile ? "16vh" : "0vh",
        opacity: 1,
      });
      gsap.set(centerTextRef.current, { opacity: 0, y: 30 });

      // 2. Master Scrollytelling Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=3800",
          pin: stickyRef.current,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // --- PHASE 1 -> PHASE 2 & 3: ZOOM & MORPH INTO IMMERSIVE VIEW ---
      // Fade out Hero Text
      tl.to(
        heroContentRef.current,
        {
          x: -140,
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        0
      );

      // Scale & Move Wheel into Immersive Center View
      tl.to(
        wheelBoxRef.current,
        {
          scale: isMobile ? 1.15 : 1.45,
          x: 0,
          y: isMobile ? "22%" : "28%",
          duration: 1.2,
          ease: "power2.inOut",
        },
        0
      );

      // Fade in Floating Center Text (No Box Card)
      tl.to(
        centerTextRef.current,
        {
          opacity: 1,
          y: isMobile ? "18%" : "22%",
          duration: 0.8,
          ease: "power2.out",
        },
        0.5
      );

      // --- PHASE 4: SCROLL THROUGH STAGES (SCRUB ROTATION ANTI-CLOCKWISE) ---
      const totalRotation = -315; // 8 stages * 45deg = 315deg sweep

      tl.to(
        wheelSvgRef.current,
        {
          rotate: totalRotation,
          duration: 4,
          ease: "none",
          onUpdate: function () {
            const progress = this.progress();
            const rawIndex = Math.round(progress * (PIPELINE_STAGES.length - 1));
            const newIndex = Math.min(
              Math.max(rawIndex, 0),
              PIPELINE_STAGES.length - 1
            );

            setActiveIndex((prev) => {
              if (prev !== newIndex) {
                // Micro-interaction crossfade on center text when heading changes
                if (textInnerRef.current) {
                  gsap.fromTo(
                    textInnerRef.current,
                    { opacity: 0.2, y: -6 },
                    { opacity: 1, y: 0, duration: 0.22, ease: "power1.out" }
                  );
                }
                return newIndex;
              }
              return prev;
            });
          },
        },
        1.2
      );

      // --- PHASE 5: FINISH & MOVE OUT ---
      tl.to(
        wheelBoxRef.current,
        {
          x: "85vw",
          opacity: 0,
          scale: 1.2,
          duration: 1,
          ease: "power2.in",
        },
        5.4
      );

      tl.to(
        centerTextRef.current,
        {
          opacity: 0,
          y: -40,
          duration: 0.6,
          ease: "power2.in",
        },
        5.4
      );
    },
    { scope: wrapperRef, dependencies: [prefersReducedMotion] }
  );

  const activeStage = PIPELINE_STAGES[activeIndex];
  const ActiveIcon = STAGE_ICONS[activeIndex] || ClipboardList;

  return (
    <section id="pipeline" ref={wrapperRef} className="relative w-full bg-[#030712] text-white">
      {/* Ambient Background Glowing Orbs */}
      <div className="ambient-orb orb-1" />
      <div className="ambient-orb orb-2" />
      <div className="ambient-orb orb-3" />

      {/* Background Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Sticky Viewport Container */}
      <div
        ref={stickyRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      >
        {/* HERO CONTENT (PHASE 1: START SMALL) */}
        <div
          ref={heroContentRef}
          className="absolute left-6 md:left-16 lg:left-24 max-w-xl z-20 pointer-events-auto pt-16 md:pt-0"
        >
          <GlowBadge className="mb-6">{SITE_CONTENT.hero.badge}</GlowBadge>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.02] text-white">
            {SITE_CONTENT.hero.headline}{" "}
            <span className="gradient-accent block">
              {SITE_CONTENT.hero.headlineAccent}
            </span>
          </h1>

          <p className="text-[#94a3b8] text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
            {SITE_CONTENT.hero.description}
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#60a5fa] text-[#030712] font-mono font-bold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity shadow-[0_0_25px_rgba(56,189,248,0.4)]"
            >
              {SITE_CONTENT.hero.cta}
              <span className="text-base">↓</span>
            </a>
            <span className="text-xs font-mono text-[#64748b]">
              SCROLL TO INITIATE
            </span>
          </div>
        </div>

        {/* TOP TELEMETRY BAR */}
        <div className="absolute top-20 left-6 right-6 z-30 flex justify-between items-center pointer-events-none">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0f172a]/70 border border-[rgba(255,255,255,0.1)] backdrop-blur-md">
            <StatusDot status="healthy" pulse size="md" />
            <MonoLabel className="text-[#38bdf8]">
              DEVOPS LIFECYCLE SCRUB
            </MonoLabel>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0f172a]/70 border border-[rgba(255,255,255,0.1)] backdrop-blur-md">
            <MonoLabel className="text-[#94a3b8]">STAGE 0{activeIndex + 1} / 08</MonoLabel>
          </div>
        </div>

        {/* TOP CENTER ALIGNMENT LASER POINTER */}
        <div className="absolute top-24 z-30 pointer-events-none flex flex-col items-center">
          <div className="w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[14px] border-t-[#38bdf8] drop-shadow-[0_0_15px_rgba(56,189,248,0.9)]" />
          <div className="w-px h-8 bg-gradient-to-b from-[#38bdf8] to-transparent animate-pulse" />
        </div>

        {/* NEON WHEEL BOX */}
        <div
          ref={wheelBoxRef}
          className="relative w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] md:w-[580px] md:h-[580px] rounded-full flex items-center justify-center transform-gpu will-change-transform z-10"
        >
          {/* Outer Ring Glow Effect */}
          <div className="absolute inset-0 rounded-full border border-[rgba(56,189,248,0.25)] shadow-[0_0_80px_rgba(56,189,248,0.15),inset_0_0_50px_rgba(56,189,248,0.08)]" />

          <svg
            ref={wheelSvgRef}
            viewBox="0 0 600 600"
            className="w-full h-full transform-gpu will-change-transform"
            textRendering="geometricPrecision"
            shapeRendering="geometricPrecision"
            role="img"
            aria-label="DevOps lifecycle wheel diagram showing 8 interactive stages"
          >
            <defs>
              <linearGradient
                id="ringGlowGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.85" />
              </linearGradient>

              <filter id="neonGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Outer primary ring */}
            <circle
              cx="300"
              cy="300"
              r="270"
              fill="none"
              stroke="url(#ringGlowGradient)"
              strokeWidth="3.5"
            />
            {/* Inner guideline ring */}
            <circle
              cx="300"
              cy="300"
              r="185"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />

            {/* 8 STAGE NODES & LABELS CURVED AROUND WHEEL */}
            {PIPELINE_STAGES.map((stage, idx) => {
              const angle = idx * (360 / PIPELINE_STAGES.length);
              const isActive = idx === activeIndex;

              return (
                <g key={stage.id} transform={`rotate(${angle}, 300, 300)`}>
                  {/* Stage Text Label */}
                  <text
                    x="300"
                    y="44"
                    textAnchor="middle"
                    className={`stage-label-text ${isActive ? "active" : ""}`}
                  >
                    {stage.id.toUpperCase()}
                  </text>

                  {/* Stage Node Marker */}
                  <circle
                    cx="300"
                    cy="62"
                    r={isActive ? 6.5 : 3.5}
                    fill={isActive ? "#38bdf8" : "#64748b"}
                    filter={isActive ? "url(#neonGlowFilter)" : undefined}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* PURE FLOATING TEXT INSIDE THE CIRCLE (NO CARD BOX / NO BORDER) */}
        <div
          ref={centerTextRef}
          aria-live="polite"
          className="absolute z-20 pointer-events-none flex flex-col items-center justify-center text-center max-w-[280px] sm:max-w-[340px] px-4"
        >
          <div ref={textInnerRef} className="flex flex-col items-center">
            {/* Dynamic Stage Icon */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[rgba(56,189,248,0.12)] border border-[rgba(56,189,248,0.3)] flex items-center justify-center mb-3 shadow-[0_0_25px_rgba(56,189,248,0.3)]">
              <ActiveIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[#38bdf8]" />
            </div>

            {/* Stage Code Badge */}
            <MonoLabel className="text-[#38bdf8] mb-1 tracking-widest">
              {activeStage.badge}
            </MonoLabel>

            {/* Dynamic Heading (Changes as user scrolls down) */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              {activeStage.title}
            </h2>

            {/* Description Text */}
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

          {/* 8-STAGE PROGRESS DOTS */}
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {PIPELINE_STAGES.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-6 bg-[#38bdf8] shadow-[0_0_12px_rgba(56,189,248,0.9)]"
                    : "w-1.5 bg-[#334155]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

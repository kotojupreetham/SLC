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
  const centerCardRef = useRef<HTMLDivElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      if (typeof window === "undefined") return;

      const isMobile = window.innerWidth < 768;

      // 1. Initial positions
      gsap.set(heroContentRef.current, { x: 0, opacity: 1 });
      gsap.set(wheelBoxRef.current, {
        scale: isMobile ? 0.6 : 0.65,
        x: isMobile ? 0 : "20vw",
        y: isMobile ? "18vh" : "0vh",
        opacity: 1,
      });
      gsap.set(centerCardRef.current, { opacity: 0, y: 30, scale: 0.9 });

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
          x: -120,
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        0
      );

      // Scale & Move Wheel into Immersive Center View (Crisp, proportional scale)
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

      // Fade & Slide in Center Glass Card (Independent of wheel scale)
      tl.to(
        centerCardRef.current,
        {
          opacity: 1,
          y: isMobile ? "15%" : "20%",
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.4)",
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
                // Micro-interaction crossfade on center card
                if (cardInnerRef.current) {
                  gsap.fromTo(
                    cardInnerRef.current,
                    { opacity: 0.3, y: -4 },
                    { opacity: 1, y: 0, duration: 0.2, ease: "power1.out" }
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
          x: "80vw",
          opacity: 0,
          scale: 1.2,
          duration: 1,
          ease: "power2.in",
        },
        5.4
      );

      tl.to(
        centerCardRef.current,
        {
          opacity: 0,
          y: -30,
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
    <div ref={wrapperRef} className="relative w-full bg-[#030308] text-white">
      {/* Ambient background glowing orbs */}
      <div className="ambient-orb orb-1" />
      <div className="ambient-orb orb-2" />

      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Sticky Viewport Container */}
      <div
        ref={stickyRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      >
        {/* HERO CONTENT (PHASE 1: START SMALL) */}
        <div
          ref={heroContentRef}
          className="absolute left-6 md:left-16 lg:left-24 max-w-xl z-20 pointer-events-auto"
        >
          <GlowBadge className="mb-6">{SITE_CONTENT.hero.badge}</GlowBadge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.02]">
            {SITE_CONTENT.hero.headline}{" "}
            <span className="bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#818cf8] bg-clip-text text-transparent">
              {SITE_CONTENT.hero.headlineAccent}
            </span>
          </h1>

          <p className="text-[#94a3b8] text-sm sm:text-base leading-relaxed mb-8">
            {SITE_CONTENT.hero.description}
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#38bdf8] text-[#030308] font-mono font-bold text-xs tracking-wider uppercase hover:bg-[#38bdf8]/90 transition-colors shadow-[0_0_20px_rgba(56,189,248,0.3)]"
            >
              {SITE_CONTENT.hero.cta}
              <span className="text-base">↓</span>
            </a>
            <span className="text-xs font-mono text-[#64748b]">
              SCROLL TO START
            </span>
          </div>
        </div>

        {/* TOP TELEMETRY BAR & POINTER (PHASE 3 & 4) */}
        <div className="absolute top-6 left-6 right-6 z-30 flex justify-between items-center pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0f172a]/60 border border-[rgba(255,255,255,0.08)] backdrop-blur-md">
            <StatusDot status="healthy" pulse size="md" />
            <MonoLabel className="text-[#38bdf8]">
              DEV OPS LIFECYCLE SCRUB
            </MonoLabel>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0f172a]/60 border border-[rgba(255,255,255,0.08)] backdrop-blur-md">
            <MonoLabel className="text-[#94a3b8]">STAGE 0{activeIndex + 1} / 08</MonoLabel>
          </div>
        </div>

        {/* TOP CENTER ALIGNMENT POINTER */}
        <div className="absolute top-14 z-30 pointer-events-none flex flex-col items-center">
          <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-[#38bdf8] drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
          <div className="w-px h-6 bg-gradient-to-b from-[#38bdf8] to-transparent animate-pulse" />
        </div>

        {/* NEON WHEEL BOX (PROPORTIONAL SIZING & CRISP VECTOR RENDERING) */}
        <div
          ref={wheelBoxRef}
          className="relative w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] md:w-[580px] md:h-[580px] rounded-full flex items-center justify-center transform-gpu will-change-transform z-10"
        >
          {/* Outer Ring Glow Effect */}
          <div className="absolute inset-0 rounded-full border border-[rgba(56,189,248,0.25)] shadow-[0_0_60px_rgba(56,189,248,0.12),inset_0_0_40px_rgba(56,189,248,0.06)]" />

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
                    r={isActive ? 6 : 3.5}
                    fill={isActive ? "#38bdf8" : "#64748b"}
                    filter={isActive ? "url(#neonGlowFilter)" : undefined}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* CENTER FROSTED GLASS CARD (PLACED OUTSIDE WHEEL FOR PERFECT INDEPENDENT SCALING) */}
        <div
          ref={centerCardRef}
          aria-live="polite"
          className="glass-card-cinematic absolute w-[290px] h-[290px] sm:w-[320px] sm:h-[320px] md:w-[350px] md:h-[350px] rounded-3xl flex flex-col justify-between items-center text-center p-5 sm:p-6 md:p-7 z-20 pointer-events-auto"
        >
          <div ref={cardInnerRef} className="w-full flex flex-col items-center">
            {/* Dynamic Icon */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[rgba(56,189,248,0.12)] border border-[rgba(56,189,248,0.3)] flex items-center justify-center mb-2.5 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
              <ActiveIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[#38bdf8]" />
            </div>

            {/* Stage Badge & Title */}
            <MonoLabel className="text-[#38bdf8] mb-1">
              {activeStage.badge}
            </MonoLabel>

            <h2 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight mb-1.5">
              {activeStage.title}
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed mb-3 line-clamp-2">
              {activeStage.description}
            </p>

            {/* Live Metric Badges */}
            <div className="w-full grid grid-cols-2 gap-2 pt-2.5 border-t border-[rgba(255,255,255,0.08)]">
              {activeStage.metrics.map((m, i) => (
                <div
                  key={i}
                  className="flex flex-col text-left px-2 py-1 rounded-lg bg-[#030308]/60 border border-[rgba(255,255,255,0.05)]"
                >
                  <span className="text-[9px] font-mono text-[#64748b] uppercase truncate">
                    {m.label}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#38bdf8] truncate">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 8-STAGE PAGINATION DOTS */}
          <div className="flex items-center justify-center gap-1.5 pt-1.5">
            {PIPELINE_STAGES.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-6 bg-[#38bdf8] shadow-[0_0_10px_rgba(56,189,248,0.8)]"
                    : "w-1.5 bg-[#334155]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

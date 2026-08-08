"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  ChevronDown,
  MousePointerClick,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STAGE_ICONS = [
  ClipboardList,
  Code2,
  Box,
  ShieldCheck,
  Rocket,
  CloudUpload,
  Settings,
  BarChart3,
];

const WEDGE_COLORS = [
  { main: "#0284c7", glow: "rgba(2, 132, 199, 0.4)", text: "#7dd3fc" },
  { main: "#2563eb", glow: "rgba(37, 99, 235, 0.4)", text: "#93c5fd" },
  { main: "#4f46e5", glow: "rgba(79, 70, 229, 0.4)", text: "#a5b4fc" },
  { main: "#7c3aed", glow: "rgba(124, 58, 237, 0.4)", text: "#c4b5fd" },
  { main: "#db2777", glow: "rgba(219, 39, 119, 0.4)", text: "#fbcfe8" },
  { main: "#059669", glow: "rgba(5, 150, 105, 0.4)", text: "#6ee7b7" },
  { main: "#d97706", glow: "rgba(217, 119, 6, 0.4)", text: "#fde68a" },
  { main: "#0891b2", glow: "rgba(8, 145, 178, 0.4)", text: "#67e8f9" },
];

const WEDGE_PATH =
  "M 485.7 182.6 A 560 560 0 0 1 914.3 182.6 L 853.1 330.5 A 400 400 0 0 0 546.9 330.5 Z";

export function InteractivePipeline() {
  const [isActivated, setIsActivated] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const wheelSvgRef = useRef<SVGSVGElement>(null);
  const centerTextRef = useRef<HTMLDivElement>(null);
  const textInnerRef = useRef<HTMLDivElement>(null);
  const telemetryBarRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  const prefersReducedMotion = useReducedMotion();

  // --- INITIAL POSITIONING (runs once on mount) ---
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.innerWidth < 768;

    // Position wheel small on the right, centered vertically
    gsap.set(wheelRef.current, {
      xPercent: -50,
      yPercent: -50,
      scale: isMobile ? 0.24 : 0.3,
      x: isMobile ? 0 : 280,
      y: isMobile ? 140 : 0,
    });
    gsap.set(centerTextRef.current, { opacity: 0, y: 20 });
    gsap.set(telemetryBarRef.current, { opacity: 0, y: -20 });
    gsap.set(laserRef.current, { opacity: 0 });
  }, []);

  // --- CLEANUP ---
  useEffect(() => {
    return () => {
      if (stRef.current) stRef.current.kill();
    };
  }, []);

  // --- HANDLE CLICK TO ACTIVATE ---
  const handleActivate = useCallback(() => {
    if (isActivated) return;

    // Scroll to section top first
    if (wrapperRef.current) {
      wrapperRef.current.scrollIntoView({ behavior: "smooth" });
    }

    // Small delay to let scroll settle, then activate
    setTimeout(() => {
      setIsActivated(true);
    }, 350);
  }, [isActivated]);

  // --- ACTIVATION EFFECT: Expand wheel + create ScrollTrigger ---
  useEffect(() => {
    if (!isActivated) return;
    if (typeof window === "undefined") return;
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;

    // Lock scroll during expansion
    document.body.style.overflow = "hidden";

    // Phase 1: Fade out hero text
    gsap.to(heroContentRef.current, {
      opacity: 0,
      x: -120,
      duration: 0.8,
      ease: "power2.inOut",
    });

    // Phase 2: Expand wheel from small-right to giant-bottom-center
    gsap.to(wheelRef.current, {
      scale: 1,
      x: 0,
      y: isMobile ? 380 : 480,
      duration: 1.3,
      ease: "power3.inOut",
    });

    // Phase 3: Fade in telemetry bar + laser + center text (staggered)
    gsap.to(telemetryBarRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay: 0.8,
      ease: "power2.out",
    });

    gsap.to(laserRef.current, {
      opacity: 1,
      duration: 0.4,
      delay: 1.0,
    });

    gsap.to(centerTextRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: 1.1,
      ease: "power2.out",
    });

    // Phase 4: After expansion completes, create ScrollTrigger
    const activationTimer = setTimeout(() => {
      // Unlock scroll
      document.body.style.overflow = "";

      const totalStages = PIPELINE_STAGES.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=4800",
          pin: stickyRef.current,
          scrub: 0.8,
          snap: {
            snapTo: 1 / (totalStages + 1), // +1 for the shrink-back phase
            duration: { min: 0.2, max: 0.45 },
            delay: 0.08,
            ease: "power2.inOut",
          },
        },
      });

      // Phase 4a: Rotation through 8 stages (timeline 0 → 4)
      tl.to(
        wheelSvgRef.current,
        {
          rotate: -(totalStages - 1) * 45,
          duration: 4,
          ease: "none",
          onUpdate: function () {
            const progress = this.progress();
            const rawIdx = Math.round(progress * (totalStages - 1));
            const idx = Math.min(Math.max(rawIdx, 0), totalStages - 1);

            setActiveIndex((prev) => {
              if (prev !== idx && textInnerRef.current) {
                gsap.fromTo(
                  textInnerRef.current,
                  { opacity: 0.15, y: -10, scale: 0.97 },
                  {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                  }
                );
                return idx;
              }
              return prev;
            });
          },
        },
        0
      );

      // Phase 4b: Shrink back to small version (timeline 4.5 → 5.5)
      tl.to(
        centerTextRef.current,
        { opacity: 0, y: -20, duration: 0.5, ease: "power2.in" },
        4.3
      );

      tl.to(
        telemetryBarRef.current,
        { opacity: 0, y: -20, duration: 0.4, ease: "power2.in" },
        4.3
      );

      tl.to(
        laserRef.current,
        { opacity: 0, duration: 0.3, ease: "power2.in" },
        4.3
      );

      tl.to(
        wheelRef.current,
        {
          scale: isMobile ? 0.24 : 0.3,
          x: isMobile ? 0 : 280,
          y: isMobile ? 140 : 0,
          duration: 1,
          ease: "power3.inOut",
        },
        4.5
      );

      // Phase 4c: Fade hero text back in
      tl.to(
        heroContentRef.current,
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
        5.0
      );

      // Store for cleanup
      if (tl.scrollTrigger) {
        stRef.current = tl.scrollTrigger;
      }

      ScrollTrigger.refresh();
    }, 1500);

    return () => clearTimeout(activationTimer);
  }, [isActivated, prefersReducedMotion]);

  const activeStage = PIPELINE_STAGES[activeIndex];
  const ActiveIcon = STAGE_ICONS[activeIndex] || ClipboardList;
  const activeColor = WEDGE_COLORS[activeIndex] || WEDGE_COLORS[0];

  return (
    <section
      id="pipeline"
      ref={wrapperRef}
      className="relative w-full bg-[#030712] text-white"
    >
      {/* Ambient Orbs */}
      <div className="ambient-orb orb-1" />
      <div className="ambient-orb orb-2" />
      <div className="ambient-orb orb-3" />

      {/* Sticky Viewport (Acts as the Window / Mask) */}
      <div
        ref={stickyRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      >
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        {/* ═══ HERO CONTENT (LEFT SIDE) ═══ */}
        <div
          ref={heroContentRef}
          className="absolute left-6 md:left-16 lg:left-24 max-w-xl z-20 pt-16 md:pt-0"
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

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleActivate}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#818cf8] text-[#030712] font-mono font-bold text-xs tracking-wider uppercase hover:scale-105 transition-all shadow-[0_0_30px_rgba(56,189,248,0.5)] cursor-pointer"
            >
              <MousePointerClick className="w-4 h-4 animate-bounce" />
              EXPLORE PIPELINES
            </button>
            <a
              href="#services"
              className="text-xs font-mono text-[#64748b] hover:text-[#94a3b8] transition-colors underline underline-offset-4"
            >
              or scroll to services ↓
            </a>
          </div>
        </div>

        {/* ═══ TELEMETRY BAR (VISIBLE DURING ROTATION) ═══ */}
        <div
          ref={telemetryBarRef}
          className="absolute top-20 left-6 right-6 z-30 flex justify-between items-center pointer-events-none"
        >
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0f172a]/80 border border-[rgba(255,255,255,0.1)] backdrop-blur-md">
            <StatusDot status="healthy" pulse size="md" />
            <MonoLabel className="text-[#38bdf8]">
              ENGINEERING CONTROL CONSOLE // LIFECYCLE DIAL
            </MonoLabel>
          </div>
          <span className="text-xs font-mono font-bold text-[#38bdf8] bg-[#0f172a]/90 px-4 py-2 rounded-full border border-[rgba(56,189,248,0.3)] shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            STAGE 0{activeIndex + 1} / 08
          </span>
        </div>

        {/* ═══ LASER POINTER (VISIBLE DURING ROTATION) ═══ */}
        <div
          ref={laserRef}
          className="absolute top-28 z-30 pointer-events-none flex flex-col items-center"
        >
          <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[16px] border-t-[#38bdf8] drop-shadow-[0_0_20px_rgba(56,189,248,0.95)]" />
          <div className="w-px h-6 bg-gradient-to-b from-[#38bdf8] to-transparent animate-pulse" />
        </div>

        {/* ═══ FIXED CENTER INFORMATION (DOES NOT ROTATE) ═══ */}
        <div
          ref={centerTextRef}
          className="absolute z-30 text-center flex flex-col items-center max-w-2xl pointer-events-none px-6"
        >
          <div ref={textInnerRef} className="flex flex-col items-center">
            {/* Dynamic Stage Icon */}
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-[#0f172a]/90 border flex items-center justify-center mb-4 backdrop-blur-xl transition-all duration-300"
              style={{
                boxShadow: `0 0 40px ${activeColor.glow}, inset 0 0 20px ${activeColor.glow}`,
                borderColor: activeColor.main,
              }}
            >
              <ActiveIcon
                className="w-8 h-8 sm:w-10 sm:h-10 transition-colors"
                style={{ color: activeColor.text }}
              />
            </div>

            <MonoLabel
              className="mb-2 tracking-widest text-xs font-bold"
              style={{ color: activeColor.text }}
            >
              {activeStage.badge}
            </MonoLabel>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-3 drop-shadow-[0_0_35px_rgba(255,255,255,0.3)]">
              {activeStage.title}
            </h2>

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

          <div className="flex items-center gap-2 mt-6 text-[11px] font-mono text-[#64748b] animate-bounce">
            <span>SCROLL DOWN TO ROTATE MECHANICAL DIAL</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#38bdf8]" />
          </div>
        </div>

        {/* ═══ GIANT WHEEL (STARTS SMALL ON RIGHT, EXPANDS TO BOTTOM) ═══ */}
        <div
          ref={wheelRef}
          onClick={handleActivate}
          className="absolute left-1/2 top-1/2 w-[1100px] h-[1100px] sm:w-[1300px] sm:h-[1300px] md:w-[1450px] md:h-[1450px] z-10 cursor-pointer"
          style={{ transformOrigin: "center center" }}
        >
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full border-2 border-[rgba(56,189,248,0.25)] shadow-[0_0_120px_rgba(56,189,248,0.15),inset_0_0_80px_rgba(56,189,248,0.08)] pointer-events-none" />

          {/* Rotating SVG Lifecycle Dial */}
          <svg
            ref={wheelSvgRef}
            viewBox="0 0 1400 1400"
            className="w-full h-full transform-gpu will-change-transform"
            textRendering="geometricPrecision"
            shapeRendering="geometricPrecision"
            role="img"
            aria-label="DevOps mechanical lifecycle rotary dial with 8 stages"
          >
            <defs>
              <linearGradient
                id="dialGlow"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.9" />
              </linearGradient>

              <filter
                id="wedgeShadow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite
                  in="SourceGraphic"
                  in2="blur"
                  operator="over"
                />
              </filter>
            </defs>

            {/* Outer bezel ring */}
            <circle
              cx="700"
              cy="700"
              r="660"
              fill="none"
              stroke="url(#dialGlow)"
              strokeWidth="3"
            />
            {/* Inner dashed guide ring */}
            <circle
              cx="700"
              cy="700"
              r="380"
              fill="none"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="2"
              strokeDasharray="8 8"
            />

            {/* 8 SEGMENTED CHEVRON WEDGES */}
            {PIPELINE_STAGES.map((stage, idx) => {
              const angle = idx * 45;
              const isActive = idx === activeIndex;
              const color = WEDGE_COLORS[idx];

              return (
                <g key={stage.id} transform={`rotate(${angle}, 700, 700)`}>
                  {/* Colored Wedge */}
                  <path
                    d={WEDGE_PATH}
                    fill={isActive ? color.main : "rgba(15, 23, 42, 0.85)"}
                    fillOpacity={isActive ? 0.95 : 0.65}
                    stroke={
                      isActive ? "#ffffff" : "rgba(255, 255, 255, 0.12)"
                    }
                    strokeWidth={isActive ? "3.5" : "1.5"}
                    filter={isActive ? "url(#wedgeShadow)" : undefined}
                    className="transition-all duration-300"
                  />

                  {/* Bold Stage Label */}
                  <text
                    x="700"
                    y="240"
                    textAnchor="middle"
                    fill={isActive ? "#ffffff" : color.text}
                    fontFamily="var(--font-mono)"
                    fontWeight="900"
                    fontSize={isActive ? "28" : "24"}
                    letterSpacing="4"
                    className="select-none uppercase"
                    style={{
                      textShadow: isActive
                        ? "0 2px 20px rgba(0,0,0,0.9)"
                        : "0 2px 10px rgba(0,0,0,0.8)",
                    }}
                  >
                    {stage.id.toUpperCase()}
                  </text>

                  {/* Stage Marker Dot */}
                  <circle
                    cx="700"
                    cy="280"
                    r={isActive ? 8 : 4.5}
                    fill={isActive ? "#ffffff" : color.text}
                    fillOpacity={isActive ? 1 : 0.5}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}

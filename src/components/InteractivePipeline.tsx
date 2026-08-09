"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PIPELINE_STAGES } from "@/data/pipelineStages";
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
  Layers,
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
  const [hasCompletedRotation, setHasCompletedRotation] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const wheelSvgRef = useRef<SVGSVGElement>(null);
  const centerTextRef = useRef<HTMLDivElement>(null);
  const textInnerRef = useRef<HTMLDivElement>(null);
  const telemetryBarRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);
  const originalOverflowRef = useRef<string>("");

  // Detect mobile screen width
  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // --- INITIAL POSITIONING (desktop only) ---
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      gsap.set(wheelRef.current, {
        xPercent: -50,
        yPercent: -50,
        scale: 0.3,
        x: 280,
        y: 0,
      });
      gsap.set(centerTextRef.current, { opacity: 0, y: 30 });
      gsap.set(telemetryBarRef.current, { opacity: 0, y: -20 });
      gsap.set(laserRef.current, { opacity: 0 });
    }, wrapperRef);

    return () => ctx.revert();
  }, [isMobileScreen]);

  // --- HANDLE CLICK TO ACTIVATE ---
  const handleActivate = useCallback(() => {
    if (isMobileScreen) return; // Skip activation on mobile
    setHasCompletedRotation(false);
    setIsActivated(true);

    if (wrapperRef.current) {
      wrapperRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isMobileScreen]);

  // --- ACTIVATION EFFECT: Expand wheel + create ScrollTrigger (desktop only) ---
  useEffect(() => {
    if (isMobileScreen || !isActivated || hasCompletedRotation) return;
    if (typeof window === "undefined") return;

    originalOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let activationTimer: NodeJS.Timeout;

    const ctx = gsap.context(() => {
      // Phase 1: Fade out hero text
      gsap.to(heroContentRef.current, {
        opacity: 0,
        x: -120,
        duration: 0.8,
        ease: "power2.inOut",
      });

      // Phase 2: Expand wheel upwards to eliminate top gap and position active wedge directly under laser
      gsap.to(wheelRef.current, {
        scale: 1,
        x: 0,
        y: 260,
        duration: 1.3,
        ease: "power3.inOut",
      });

      // Phase 3: Fade in telemetry bar + laser + center text
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

      // Phase 4: Create ScrollTrigger after expansion completes
      activationTimer = setTimeout(() => {
        document.body.style.overflow = originalOverflowRef.current;

        const totalStages = PIPELINE_STAGES.length;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "+=4800",
            pin: stickyRef.current,
            scrub: 0.8,
            once: true,
            onLeave: () => {
              setHasCompletedRotation(true);
              setIsActivated(false);
            },
            snap: {
              snapTo: 1 / (totalStages + 1),
              duration: { min: 0.2, max: 0.45 },
              delay: 0.08,
              ease: "power2.inOut",
            },
          },
        });

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
            scale: 0.3,
            x: 280,
            y: 0,
            duration: 1,
            ease: "power3.inOut",
          },
          4.5
        );

        tl.to(
          heroContentRef.current,
          { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
          5.0
        );

        ScrollTrigger.refresh();
      }, 1500);
    }, wrapperRef);

    return () => {
      clearTimeout(activationTimer);
      document.body.style.overflow = originalOverflowRef.current;
      ctx.revert();
    };
  }, [isActivated, hasCompletedRotation, isMobileScreen]);

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

      {/* Main Interactive View (Desktop & Pinned Wheel / Mobile Clean Viewer) */}
      <div
        ref={stickyRef}
        className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-16 md:py-0"
      >
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        {/* ═══ HERO CONTENT ═══ */}
        <div
          ref={heroContentRef}
          className="relative md:absolute left-6 md:left-16 lg:left-24 max-w-xl z-20 px-4 md:px-0"
        >
          <GlowBadge className="mb-6">{SITE_CONTENT.hero.badge}</GlowBadge>

          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.02] text-white">
            {SITE_CONTENT.hero.headline}{" "}
            <span className="gradient-accent block">
              {SITE_CONTENT.hero.headlineAccent}
            </span>
          </h1>

          <p className="text-[#94a3b8] text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
            {SITE_CONTENT.hero.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-10 md:mb-0">
            {!isMobileScreen ? (
              <button
                onClick={handleActivate}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#818cf8] text-[#030712] font-mono font-bold text-xs tracking-wider uppercase hover:scale-105 transition-all shadow-[0_0_30px_rgba(56,189,248,0.5)] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#38bdf8] focus-visible:outline-none"
              >
                <MousePointerClick className="w-4 h-4 animate-bounce" />
                EXPLORE PIPELINES
              </button>
            ) : (
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0f172a] border border-[#38bdf8]/40 text-[#38bdf8] font-mono font-bold text-xs tracking-wider uppercase"
              >
                <Layers className="w-4 h-4" />
                VIEW CAPABILITIES ↓
              </a>
            )}
            <a
              href="#services"
              className="text-xs font-mono text-[#64748b] hover:text-[#94a3b8] transition-colors underline underline-offset-4"
            >
              or scroll to services ↓
            </a>
          </div>

          {/* ═══ MOBILE CLEAN STAGE STACK (No circle animation on mobile) ═══ */}
          {isMobileScreen && (
            <div className="mt-8 border-t border-[rgba(255,255,255,0.1)] pt-6 flex flex-col gap-3">
              <MonoLabel className="text-[#38bdf8] mb-1">
                DEVOPS LIFECYCLE STAGES
              </MonoLabel>
              <div className="grid grid-cols-2 gap-2">
                {PIPELINE_STAGES.map((s, idx) => {
                  const Icon = STAGE_ICONS[idx] || ClipboardList;
                  const c = WEDGE_COLORS[idx];
                  return (
                    <div
                      key={s.id}
                      className="p-3 rounded-xl bg-[#0f172a]/80 border border-[rgba(255,255,255,0.08)] flex items-center gap-2.5"
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" style={{ color: c.text }} />
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-mono font-bold text-white truncate">
                          0{idx + 1} {s.title}
                        </span>
                        <span className="text-[9px] font-mono text-[#64748b] truncate">
                          {s.badge}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ═══ DESKTOP ONLY: TELEMETRY BAR ═══ */}
        {!isMobileScreen && (
          <div
            ref={telemetryBarRef}
            className="absolute top-16 left-6 right-6 z-30 flex justify-between items-center pointer-events-none"
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
        )}

        {/* ═══ DESKTOP ONLY: LASER POINTER ═══ */}
        {!isMobileScreen && (
          <div
            ref={laserRef}
            className="absolute top-20 z-30 pointer-events-none flex flex-col items-center"
          >
            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[16px] border-t-[#38bdf8] drop-shadow-[0_0_20px_rgba(56,189,248,0.95)]" />
            <div className="w-px h-6 bg-gradient-to-b from-[#38bdf8] to-transparent animate-pulse" />
          </div>
        )}

        {/* ═══ DESKTOP ONLY: FIXED CENTER INFORMATION ═══ */}
        {!isMobileScreen && (
          <div
            ref={centerTextRef}
            className="absolute top-[52%] md:top-[54%] z-30 text-center flex flex-col items-center max-w-xl pointer-events-none px-6 -translate-y-1/2"
          >
            <div ref={textInnerRef} className="flex flex-col items-center">
              {/* Dynamic Stage Icon */}
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0f172a]/90 border flex items-center justify-center mb-2.5 backdrop-blur-xl transition-all duration-300"
                style={{
                  boxShadow: `0 0 25px ${activeColor.glow}, inset 0 0 12px ${activeColor.glow}`,
                  borderColor: activeColor.main,
                }}
              >
                <ActiveIcon
                  className="w-6 h-6 sm:w-7 sm:h-7 transition-colors"
                  style={{ color: activeColor.text }}
                />
              </div>

              <MonoLabel
                className="mb-1 tracking-widest text-[10px] sm:text-[11px] font-bold"
                style={{ color: activeColor.text }}
              >
                {activeStage.badge}
              </MonoLabel>

              <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-2 drop-shadow-[0_0_35px_rgba(255,255,255,0.3)]">
                {activeStage.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed mb-3.5 max-w-md">
                {activeStage.description}
              </p>

              {/* Telemetry Metrics */}
              <div className="flex items-center justify-center gap-6 sm:gap-10 border-t border-[rgba(255,255,255,0.12)] pt-3 w-full max-w-sm">
                {activeStage.metrics.map((m, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span className="text-[9px] font-mono text-[#64748b] uppercase tracking-wider mb-0.5">
                      {m.label}
                    </span>
                    <span
                      className="text-xs sm:text-sm font-mono font-extrabold"
                      style={{ color: activeColor.text }}
                    >
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3 text-[10px] font-mono text-[#64748b] animate-bounce">
              <span>SCROLL DOWN TO ROTATE MECHANICAL DIAL</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#38bdf8]" />
            </div>
          </div>
        )}

        {/* ═══ DESKTOP ONLY: GIANT WHEEL ═══ */}
        {!isMobileScreen && (
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
        )}
      </div>
    </section>
  );
}

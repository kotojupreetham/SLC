"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PIPELINE_STAGES } from "@/data/pipelineStages";
import {
  ClipboardList,
  Code2,
  Box,
  ShieldCheck,
  Rocket,
  CloudUpload,
  Settings,
  BarChart3,
  X,
  Target,
  Users,
  TrendingUp,
  GitBranch,
  FileCheck,
  Shield,
  Zap,
  Lock,
  Layers,
  CheckCircle2,
  Sliders,
  Globe,
  RefreshCw,
  Network,
  Activity,
  Eye,
  RotateCcw,
  ArrowRight,
  ChevronDown,
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
  { main: "#0284c7", glow: "rgba(2, 132, 199, 0.55)", text: "#7dd3fc" },
  { main: "#2563eb", glow: "rgba(37, 99, 235, 0.55)", text: "#93c5fd" },
  { main: "#4f46e5", glow: "rgba(79, 70, 229, 0.55)", text: "#a5b4fc" },
  { main: "#7c3aed", glow: "rgba(124, 58, 237, 0.55)", text: "#c4b5fd" },
  { main: "#db2777", glow: "rgba(219, 39, 119, 0.55)", text: "#fbcfe8" },
  { main: "#059669", glow: "rgba(5, 150, 105, 0.55)", text: "#6ee7b7" },
  { main: "#d97706", glow: "rgba(217, 119, 6, 0.55)", text: "#fde68a" },
  { main: "#0891b2", glow: "rgba(8, 145, 178, 0.55)", text: "#67e8f9" },
];

// Helper to render stage pillar icons dynamically
function PillarIcon({ iconName, className }: { iconName: string; className?: string }) {
  switch (iconName) {
    case "target":
      return <Target className={className} />;
    case "clipboard":
      return <ClipboardList className={className} />;
    case "users":
      return <Users className={className} />;
    case "trending-up":
      return <TrendingUp className={className} />;
    case "git-branch":
      return <GitBranch className={className} />;
    case "file-check":
      return <FileCheck className={className} />;
    case "shield":
      return <Shield className={className} />;
    case "box":
      return <Box className={className} />;
    case "zap":
      return <Zap className={className} />;
    case "lock":
      return <Lock className={className} />;
    case "layers":
      return <Layers className={className} />;
    case "check-circle":
      return <CheckCircle2 className={className} />;
    case "activity":
      return <Activity className={className} />;
    case "sliders":
      return <Sliders className={className} />;
    case "rotate-ccw":
      return <RotateCcw className={className} />;
    case "globe":
      return <Globe className={className} />;
    case "refresh-cw":
      return <RefreshCw className={className} />;
    case "network":
      return <Network className={className} />;
    case "eye":
      return <Eye className={className} />;
    default:
      return <CheckCircle2 className={className} />;
  }
}

// Exact 45-degree wedge centered at 12 o'clock (-22.5° to +22.5° from top vertical).
// Outer Radius = 620, Inner Radius = 440 (thickness = 180px, inner clear zone = 880px diameter).
const WEDGE_PATH =
  "M 462.7 127.2 A 620 620 0 0 1 937.3 127.2 L 868.4 293.5 A 440 440 0 0 0 531.6 293.5 Z";

interface PipelineExplorerProps {
  onClose: () => void;
}

export function PipelineExplorer({ onClose }: PipelineExplorerProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const wheelSvgRef = useRef<SVGSVGElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const infoInnerRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const exitBtnRef = useRef<HTMLButtonElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const hintScrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const rotationTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const hintTweenRef = useRef<gsap.core.Tween | null>(null);
  const activeIndexRef = useRef(0);
  const originalOverflowRef = useRef("");
  const isExitingRef = useRef(false);
  const hasScrollSetupRef = useRef(false);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const clearScrollInteraction = useCallback(() => {
    scrollTriggerRef.current?.kill();
    scrollTriggerRef.current = null;
    hintScrollTriggerRef.current?.kill();
    hintScrollTriggerRef.current = null;
    rotationTimelineRef.current?.kill();
    rotationTimelineRef.current = null;
    hintTweenRef.current?.kill();
    hintTweenRef.current = null;
    hasScrollSetupRef.current = false;
  }, []);

  // --- EXIT / SHRINK-BACK ANIMATION ---
  const handleExit = useCallback(() => {
    if (isExitingRef.current) return;
    isExitingRef.current = true;

    clearScrollInteraction();

    const exitTl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = originalOverflowRef.current;
        onCloseRef.current();
      },
    });

    exitTl
      .to(infoRef.current, { opacity: 0, y: 30, scale: 0.9, duration: 0.35, ease: "power2.in" }, 0)
      .to(scrollHintRef.current, { opacity: 0, duration: 0.2 }, 0)
      .to(exitBtnRef.current, { opacity: 0, duration: 0.2 }, 0)
      .to(
        wheelRef.current,
        { scale: 0.28, x: "24vw", opacity: 0, duration: 0.8, ease: "power3.inOut" },
        0.05
      )
      .to(overlayRef.current, { opacity: 0, duration: 0.4, ease: "power2.in" }, 0.35);
  }, [clearScrollInteraction]);

  // All direct stage inputs resolve to the same normalized ScrollTrigger progress.
  const goToStage = useCallback((idx: number) => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || !scrollTriggerRef.current) return;

    const targetIdx = Math.max(0, Math.min(idx, PIPELINE_STAGES.length - 1));
    const progress = targetIdx / (PIPELINE_STAGES.length - 1);
    const scrollRange = scrollContainer.scrollHeight - scrollContainer.clientHeight;
    const targetScroll = scrollRange * progress;

    gsap.killTweensOf(scrollContainer);
    gsap.to(scrollContainer, {
      scrollTop: targetScroll,
      duration: 0.55,
      ease: "power2.out",
      overwrite: true,
    });
  }, []);

  // --- SCROLL-DRIVEN ANTI-CLOCKWISE ROTATION ---
  const setupScrollRotation = useCallback(() => {
    if (hasScrollSetupRef.current || isExitingRef.current) return;
    hasScrollSetupRef.current = true;

    const totalStages = PIPELINE_STAGES.length;
    const rotationTl = gsap.timeline({ paused: true });
    rotationTimelineRef.current = rotationTl;

    // Rotate anti-clockwise through all 8 stages: Stage 0 at 0°, Stage 1 at -45°, ..., Stage 7 at -315°
    rotationTl.to(wheelSvgRef.current, {
      rotate: -(totalStages - 1) * 45,
      duration: totalStages - 1,
      ease: "none",
      onUpdate: function () {
        const progress = this.progress();
        const rawIdx = Math.round(progress * (totalStages - 1));
        const idx = Math.min(Math.max(rawIdx, 0), totalStages - 1);

        setActiveIndex((prev) => {
          if (prev === idx || !infoInnerRef.current) return prev;
          gsap.fromTo(
            infoInnerRef.current,
            { y: 15, opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
              overwrite: true,
            }
          );
          return idx;
        });
      },
    });

    // The hint owns a separate ScrollTrigger, so it must be tracked and cleaned up too.
    if (scrollHintRef.current) {
      const hintTween = gsap.to(scrollHintRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        paused: true,
      });
      hintTweenRef.current = hintTween;
      hintScrollTriggerRef.current = ScrollTrigger.create({
        trigger: triggerRef.current,
        scroller: scrollContainerRef.current,
        start: "top top",
        end: "+=120",
        animation: hintTween,
        scrub: true,
      });
    }

    const trigger = ScrollTrigger.create({
      trigger: triggerRef.current,
      scroller: scrollContainerRef.current,
      start: "top top",
      end: "bottom bottom",
      animation: rotationTl,
      scrub: 0.6,
      snap: {
        snapTo: 1 / (totalStages - 1),
        duration: { min: 0.2, max: 0.4 },
        delay: 0.05,
        ease: "power2.inOut",
      },
    });

    scrollTriggerRef.current = trigger;
  }, []);

  // --- ENTRY / GROWING ANIMATION + SETUP ---
  useEffect(() => {
    if (typeof window === "undefined") return;

    originalOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    isExitingRef.current = false;
    hasScrollSetupRef.current = false;
    setActiveIndex(0);
    activeIndexRef.current = 0;

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }

    const ctx = gsap.context(() => {
      gsap.set(overlayRef.current, { opacity: 0 });
      // The preview lives to the right of the hero. Starting from that position
      // lets the overlay feel like a camera moving into the same lifecycle.
      gsap.set(wheelRef.current, { scale: 0.28, x: "24vw", opacity: 0 });
      gsap.set(infoRef.current, { opacity: 0, y: 30, scale: 0.95 });
      gsap.set(scrollHintRef.current, { opacity: 0, y: 15 });
      gsap.set(exitBtnRef.current, { opacity: 0 });

      const entryTl = gsap.timeline({
        onComplete: () => setupScrollRotation(),
      });

      entryTl
        .to(overlayRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        })
        .to(
          wheelRef.current,
          { scale: 1, x: 0, opacity: 1, duration: 1.15, ease: "power3.out" },
          0.1
        )
        .to(
          infoRef.current,
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" },
          0.55
        )
        .to(
          scrollHintRef.current,
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          0.75
        )
        .to(
          exitBtnRef.current,
          { opacity: 1, duration: 0.4, ease: "power2.out" },
          0.8
        );
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleExit();
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goToStage(activeIndexRef.current + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goToStage(activeIndexRef.current - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearScrollInteraction();
      ctx.revert();
      document.body.style.overflow = originalOverflowRef.current;
    };
  }, [clearScrollInteraction, goToStage, handleExit, setupScrollRotation]);

  const activeStage = PIPELINE_STAGES[activeIndex];
  const ActiveIcon = STAGE_ICONS[activeIndex] || ClipboardList;
  const activeColor = WEDGE_COLORS[activeIndex] || WEDGE_COLORS[0];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-[#030712] select-none overflow-hidden"
      style={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Interactive DevOps Pipeline Lifecycle Explorer"
    >
      {/* A minimal floating exit keeps the immersive view free of navigation chrome. */}
      <button
        ref={exitBtnRef}
        onClick={handleExit}
        className="absolute right-4 top-4 z-40 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-[#030712]/50 text-[#94a3b8] backdrop-blur-md transition-all hover:border-[#38bdf8]/70 hover:bg-[#38bdf8]/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] sm:right-6 sm:top-6"
        aria-label="Exit Explorer"
      >
        <X className="h-4 w-4" />
      </button>

      {/* ═══ SCROLL WRAPPER FOR GSAP ═══ */}
      <div ref={scrollContainerRef} className="h-full w-full overflow-y-auto">
        <div ref={triggerRef} style={{ height: "550vh" }}>
          <div className="pipeline-explorer-scene h-screen w-full sticky top-0 overflow-hidden relative flex items-center justify-center">
            {/* Ambient Radial Aura */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(56,189,248,0.08)_0%,transparent_75%)] pointer-events-none" />

            {/* ═══ TOP ACTIVE STAGE POINTER / LASER ═══ */}
            <div className="absolute top-[8%] sm:top-[10%] left-1/2 -translate-x-1/2 z-40 pointer-events-none flex flex-col items-center">
              <div
                className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] transition-colors duration-300 drop-shadow-[0_0_12px_rgba(56,189,248,0.9)]"
                style={{ borderTopColor: activeColor.main }}
              />
              <div
                className="w-0.5 h-4 bg-gradient-to-b from-current to-transparent opacity-80 animate-pulse"
                style={{ color: activeColor.main }}
              />
            </div>

            {/* ═══ FULL CANOPY DOME / WHEEL ═══ */}
            <div
              className="pipeline-explorer-wheel absolute left-1/2 top-1/2 lg:top-full -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
            >
              {/* This inner layer scales with GSAP; its parent keeps the wheel centered. */}
              <div ref={wheelRef} className="absolute inset-0">
                {/* Outer halo glow */}
                <div
                  className="absolute inset-0 rounded-full border border-transparent pointer-events-none transition-all duration-700"
                  style={{
                    boxShadow: `0 0 100px ${activeColor.glow}, inset 0 0 70px rgba(56,189,248,0.06)`,
                  }}
                />

                {/* Rotating SVG Wheel */}
                <svg
                  ref={wheelSvgRef}
                  viewBox="0 0 1400 1400"
                  className="w-full h-full transform-gpu will-change-transform"
                  textRendering="geometricPrecision"
                  shapeRendering="geometricPrecision"
                  role="img"
                  aria-label="DevOps lifecycle dome wheel"
                >
                <defs>
                  <linearGradient
                    id="domeRimGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity="0.9" />
                  </linearGradient>

                  <filter
                    id="domeWedgeGlow"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Outer Canopy Border Ring (r = 620) */}
                <circle
                  cx="700"
                  cy="700"
                  r="620"
                  fill="none"
                  stroke="url(#domeRimGradient)"
                  strokeWidth="2.5"
                />

                {/* Inner Guide Ring (r = 440) */}
                <circle
                  cx="700"
                  cy="700"
                  r="440"
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                />

                {/* 8 CHEVRON WEDGES ALONG THE CANOPY */}
                {PIPELINE_STAGES.map((stage, idx) => {
                  const angle = idx * 45;
                  const isActive = idx === activeIndex;
                  const color = WEDGE_COLORS[idx];
                  const StageIcon = STAGE_ICONS[idx] || ClipboardList;

                  return (
                    <g
                      key={stage.id}
                      transform={`rotate(${angle}, 700, 700)`}
                      onClick={() => goToStage(idx)}
                      className="cursor-pointer"
                    >
                      {/* Wedge Surface */}
                      <path
                        d={WEDGE_PATH}
                        fill={isActive ? color.main : "rgba(15, 23, 42, 0.78)"}
                        fillOpacity={isActive ? 0.95 : 0.4}
                        stroke={
                          isActive ? "#ffffff" : "rgba(255, 255, 255, 0.14)"
                        }
                        strokeWidth={isActive ? "3.5" : "1.2"}
                        filter={isActive ? "url(#domeWedgeGlow)" : undefined}
                        style={{
                          transition:
                            "fill 0.4s ease, fill-opacity 0.4s ease, stroke 0.4s ease",
                        }}
                      />

                      {/* Icon Pill in Wedge */}
                      <rect
                        x="642"
                        y="172"
                        width="116"
                        height="44"
                        rx="14"
                        ry="14"
                        fill={isActive ? "rgba(15,23,42,0.92)" : "rgba(15,23,42,0.65)"}
                        stroke={isActive ? color.main : "rgba(255,255,255,0.12)"}
                        strokeWidth={isActive ? "2" : "1"}
                      />

                      {/* Icon inside pill */}
                      <foreignObject
                        x="650"
                        y="179"
                        width="30"
                        height="30"
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <StageIcon
                            style={{
                              width: "20px",
                              height: "20px",
                              color: isActive ? "#ffffff" : color.text,
                            }}
                          />
                        </div>
                      </foreignObject>

                      {/* Stage Name inside pill */}
                      <text
                        x="716"
                        y="200"
                        textAnchor="middle"
                        fill={isActive ? "#ffffff" : color.text}
                        fontFamily="var(--font-mono)"
                        fontWeight="900"
                        fontSize={isActive ? "17" : "15"}
                        letterSpacing="2"
                        className="select-none uppercase"
                      >
                        {stage.id.toUpperCase()}
                      </text>

                      {/* Stage marker dot */}
                      <circle
                        cx="700"
                        cy="248"
                        r={isActive ? 6 : 3.5}
                        fill={isActive ? "#ffffff" : color.text}
                        fillOpacity={isActive ? 1 : 0.45}
                        style={{ transition: "r 0.4s ease, fill-opacity 0.4s ease" }}
                      />
                    </g>
                  );
                })}
                </svg>
              </div>
            </div>

            {/* ═══ CENTER CONTENT (Inside Inner Circle Clearance Zone) ═══ */}
            <div
              className="pipeline-explorer-card absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto"
            >
              {/* Keep centering on the outer element; GSAP only animates this inner layer. */}
              <div ref={infoRef} className="w-full">
                <div
                  ref={infoInnerRef}
                  aria-live="polite"
                  className="flex flex-col items-center text-center px-4 py-5 sm:px-7 sm:py-6 transition-all duration-300"
                >
                {/* 1. Stage Counter Pill */}
                <div
                  className="px-4 py-1.5 rounded-full border bg-[#030712]/80 backdrop-blur-md mb-2.5 flex items-center gap-2 transition-all duration-300"
                  style={{
                    borderColor: `${activeColor.main}50`,
                    boxShadow: `0 0 15px ${activeColor.glow}`,
                  }}
                >
                  <ActiveIcon className="w-3.5 h-3.5" style={{ color: activeColor.text }} />
                  <span className="text-[11px] font-mono font-bold tracking-widest" style={{ color: activeColor.text }}>
                    {`0${activeIndex + 1} / 08 // ${activeStage.id.toUpperCase()}`}
                  </span>
                </div>

                {/* 2. Bold Stage Title */}
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1.5 drop-shadow-[0_0_25px_rgba(255,255,255,0.25)]">
                  {activeStage.title}
                </h2>

                {/* 3. Description */}
                <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed mb-4 max-w-[420px]">
                  {activeStage.description}
                </p>

                {/* 4. 4 Pillar Feature Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full mb-5">
                  {activeStage.pillars?.map((pillar, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center p-1.5 transition-transform duration-200 hover:scale-105">
                      <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-full text-[#38bdf8] bg-[#38bdf8]/10 ring-1 ring-[#38bdf8]/30">
                        <PillarIcon iconName={pillar.icon} className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-medium text-[#e2e8f0] text-center leading-tight">
                        {pillar.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 5. Primary Action Button */}
                <button
                  onClick={handleExit}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#38bdf8] text-white font-mono font-bold text-xs tracking-wider shadow-[0_0_25px_rgba(56,189,248,0.45)] hover:scale-105 active:scale-95 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#38bdf8] focus-visible:outline-none"
                >
                  <span>RETURN TO PIPELINE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                </div>
              </div>
            </div>

            {/* ═══ BOTTOM SCROLL HINT ═══ */}
            <div
              ref={scrollHintRef}
              className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[10px] font-mono text-[#64748b] z-30 pointer-events-none"
            >
              <div className="flex items-center gap-1 text-[#94a3b8] text-[9px] uppercase tracking-wider">
                <span>SCROLL OR USE ARROW KEYS TO ROTATE</span>
                <ChevronDown className="w-3 h-3 text-[#38bdf8] animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

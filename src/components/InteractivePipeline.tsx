"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { PIPELINE_STAGES } from "@/data/pipelineStages";
import { MonoLabel } from "./atoms/MonoLabel";
import { GlowBadge } from "./atoms/GlowBadge";
import { SITE_CONTENT } from "@/data/siteContent";
import { PipelineExplorer } from "./PipelineExplorer";
import { useMagneticPointer } from "@/hooks/useMagneticPointer";
import { isReducedMotion } from "@/lib/gsapHelpers";
import {
  ClipboardList,
  Code2,
  Box,
  ShieldCheck,
  Rocket,
  CloudUpload,
  Settings,
  BarChart3,
  MousePointerClick,
  Layers,
  Sparkles,
  ArrowDown,
} from "lucide-react";

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

// Inner radius 320, outer radius 560 with exact 45-degree wedge bounds
const PREVIEW_WEDGE_PATH =
  "M 485.7 182.6 A 560 560 0 0 1 914.3 182.6 L 822.5 404.4 A 320 320 0 0 0 577.5 404.4 Z";

interface PipelineDialProps {
  activeIndex: number;
  className?: string;
  compact?: boolean;
  onActivate?: () => void;
  onHoverStage?: (index: number | null) => void;
}

function PipelineDial({
  activeIndex,
  className = "",
  compact = false,
  onActivate,
  onHoverStage,
}: PipelineDialProps) {
  const rawId = useId().replace(/:/g, "");
  const gradientId = `preview-dial-glow-${rawId}`;
  const filterId = `preview-wedge-glow-${rawId}`;
  const activeStage = PIPELINE_STAGES[activeIndex];
  const ActiveStageIcon = STAGE_ICONS[activeIndex] || ClipboardList;
  const activeColor = WEDGE_COLORS[activeIndex] || WEDGE_COLORS[0];
  const isInteractive = Boolean(onActivate);

  return (
    <div
      onClick={onActivate}
      data-cursor={isInteractive ? "interactive" : undefined}
      className={`relative rounded-full select-none ${
        isInteractive
          ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] focus-visible:ring-offset-4 focus-visible:ring-offset-[#030712]"
          : "pointer-events-none"
      } ${className}`}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={
        isInteractive
          ? "Click to explore the DevOps pipeline lifecycle"
          : undefined
      }
      aria-hidden={isInteractive ? undefined : true}
      onKeyDown={(event) => {
        if (!onActivate || (event.key !== "Enter" && event.key !== " ")) return;
        event.preventDefault();
        onActivate();
      }}
    >
      {/* Outer halo glow ring — with dual purple/cyan ambient glow */}
      <div
        className="absolute inset-0 rounded-full border border-[rgba(129,140,248,0.3)] pointer-events-none transition-all duration-700"
        style={{
          boxShadow: `0 0 80px ${activeColor.glow}, 0 0 40px rgba(168,85,247,0.2), inset 0 0 50px rgba(56,189,248,0.1)`,
        }}
      />

      {/* Continuous lifecycle dial (64s rotation) */}
      <svg
        viewBox="0 0 1400 1400"
        className="w-full h-full transform-gpu will-change-transform dial-rotate-ccw"
        textRendering="geometricPrecision"
        shapeRendering="geometricPrecision"
        role="img"
        aria-label="DevOps continuous lifecycle wheel"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.9" />
          </linearGradient>

          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer rim with neon gradient */}
        <circle
          cx="700"
          cy="700"
          r="660"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="3"
        />

        {/* Inner guide dashed circle */}
        <circle
          cx="700"
          cy="700"
          r="320"
          fill="none"
          stroke="rgba(129,140,248,0.2)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />

        {/* 8 Rotating wedges */}
        {PIPELINE_STAGES.map((stage, idx) => {
          const angle = idx * 45;
          const color = WEDGE_COLORS[idx];
          const isHighlighted = idx === activeIndex;

          return (
            <g
              key={stage.id}
              transform={`rotate(${angle}, 700, 700)`}
              onMouseEnter={() => onHoverStage?.(idx)}
              onMouseLeave={() => onHoverStage?.(null)}
              className="cursor-pointer"
            >
              <path
                d={PREVIEW_WEDGE_PATH}
                fill={isHighlighted ? color.main : "rgba(19, 27, 46, 0.85)"}
                fillOpacity={isHighlighted ? 0.95 : 0.65}
                stroke={isHighlighted ? "#ffffff" : "rgba(129, 140, 248, 0.25)"}
                strokeWidth={isHighlighted ? "3.5" : "1.5"}
                filter={isHighlighted ? `url(#${filterId})` : undefined}
                style={{
                  transition: "fill 0.4s ease, fill-opacity 0.4s ease, stroke 0.4s ease",
                }}
              />

              <text
                x="700"
                y="275"
                textAnchor="middle"
                fill={isHighlighted ? "#ffffff" : color.text}
                fontFamily="var(--font-mono)"
                fontWeight="900"
                fontSize={compact ? (isHighlighted ? "64" : "54") : isHighlighted ? "46" : "38"}
                letterSpacing={compact ? "2" : "3"}
                className="select-none uppercase"
                style={{
                  transition: "fill 0.4s ease, font-size 0.4s ease",
                  textShadow: isHighlighted
                    ? "0 0 20px rgba(255,255,255,0.8), 0 2px 10px rgba(0,0,0,0.9)"
                    : "0 2px 10px rgba(0,0,0,0.8)",
                }}
              >
                {stage.id.toUpperCase()}
              </text>

              <circle
                cx="700"
                cy="325"
                r={isHighlighted ? 7 : 4.5}
                fill={isHighlighted ? "#ffffff" : color.text}
                fillOpacity={isHighlighted ? 1 : 0.6}
                style={{ transition: "r 0.4s ease, fill-opacity 0.4s ease" }}
              />
            </g>
          );
        })}
      </svg>

      {/* Center status core */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`flex flex-col items-center text-center rounded-full bg-[#0f172a]/95 backdrop-blur-2xl border transition-all duration-500 shadow-2xl ${
            compact ? "p-3" : "p-4 sm:p-5"
          }`}
          style={{
            borderColor: `${activeColor.main}70`,
            boxShadow: `0 0 35px ${activeColor.glow}, 0 0 20px rgba(168,85,247,0.2), inset 0 0 20px rgba(0,0,0,0.7)`,
          }}
        >
          <div
            className={`rounded-xl flex items-center justify-center transition-all duration-500 ${
              compact ? "w-8 h-8 mb-1" : "w-10 h-10 mb-1.5"
            }`}
            style={{
              backgroundColor: `${activeColor.main}25`,
              boxShadow: `0 0 16px ${activeColor.glow}`,
            }}
          >
            <ActiveStageIcon
              className={compact ? "w-4 h-4" : "w-5 h-5"}
              style={{ color: activeColor.text }}
            />
          </div>
          <span
            className={`font-mono font-bold tracking-wider uppercase transition-colors duration-500 ${
              compact ? "text-[8.5px]" : "text-[11px]"
            }`}
            style={{ color: activeColor.text }}
          >
            {`0${activeIndex + 1} // ${activeStage.id.toUpperCase()}`}
          </span>
          {!compact && (
            <span className="text-[9px] font-mono text-[#818cf8] tracking-wider uppercase flex items-center gap-1 mt-0.5">
              <Sparkles className="w-2.5 h-2.5 text-[#38bdf8] animate-pulse" />
              CLICK TO EXPLORE
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function InteractivePipeline() {
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const heroSectionRef = useRef<HTMLElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const wheelAnimRef = useRef<HTMLDivElement>(null);
  const arrowCueRef = useRef<HTMLAnchorElement>(null);

  const ctaBtnRef = useMagneticPointer<HTMLButtonElement>({ maxDisplacement: 4, strength: 0.2 });

  // Auto-cycle stages when not hovered
  useEffect(() => {
    if (hoveredIndex !== null) return;
    const interval = setInterval(() => {
      setActivePreviewIndex((prev) => (prev + 1) % PIPELINE_STAGES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [hoveredIndex]);

  // Master Hero Entrance Animation
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const reduced = isReducedMotion();

      if (reduced) {
        gsap.set([badgeRef.current, headlineRef.current, descRef.current, ctaGroupRef.current, wheelAnimRef.current], {
          opacity: 1,
        });
        return;
      }

      // Initial States
      gsap.set(badgeRef.current, { y: 16, opacity: 0 });
      gsap.set(headlineRef.current, { y: 20, opacity: 0 });
      gsap.set(descRef.current, { y: 16, opacity: 0 });
      gsap.set(ctaGroupRef.current, { y: 14, opacity: 0 });
      gsap.set(wheelAnimRef.current, { scale: 0.94, opacity: 0 });

      // Sequenced Timeline
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      heroTl
        .to(badgeRef.current, { y: 0, opacity: 1, duration: 0.45 })
        .to(headlineRef.current, { y: 0, opacity: 1, duration: 0.65 }, "-=0.25")
        .to(descRef.current, { y: 0, opacity: 1, duration: 0.5 }, "-=0.35")
        .to(ctaGroupRef.current, { y: 0, opacity: 1, duration: 0.45 }, "-=0.3")
        .to(
          wheelAnimRef.current,
          { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" },
          0.1
        );

      // Continuous down arrow yoyo bob
      if (arrowCueRef.current) {
        const arrow = arrowCueRef.current.querySelector(".arrow-icon");
        if (arrow) {
          gsap.to(arrow, {
            y: 4,
            duration: 0.6,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        }
      }
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  const displayIndex = hoveredIndex !== null ? hoveredIndex : activePreviewIndex;

  return (
    <>
      <section
        ref={heroSectionRef}
        id="pipeline"
        className="relative w-full overflow-x-clip bg-[#030712] text-white chapter-signal"
      >
        {/* Ambient Glow Orbs — with dominant Purple Glow */}
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-orb orb-3" />
        <div className="ambient-orb orb-purple" />

        {/* Hero Section Container */}
        <div className="relative min-h-[90vh] lg:min-h-screen w-full flex flex-col justify-center overflow-hidden pt-28 pb-16 lg:py-0">
          {/* Subtle Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

          {/* ═══ HERO CONTENT ═══ */}
          <div
            ref={cardContainerRef}
            className="relative z-20 w-full max-w-2xl px-6 sm:px-10 lg:absolute lg:left-12 lg:px-0 xl:left-20"
          >
            {/* Badge */}
            <div ref={badgeRef} className="mb-6">
              <GlowBadge>
                {SITE_CONTENT.hero.badge}
              </GlowBadge>
            </div>

            {/* Headline with Two-Tone Accent Hierarchy */}
            <h1
              ref={headlineRef}
              className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05] text-white"
            >
              {SITE_CONTENT.hero.headline}{" "}
              <span className="gradient-accent block">
                {SITE_CONTENT.hero.headlineAccent}
              </span>
            </h1>

            {/* Description */}
            <p
              ref={descRef}
              className="text-[#94a3b8] text-sm sm:text-base leading-relaxed mb-8 max-w-xl"
            >
              {SITE_CONTENT.hero.description}
            </p>

            {/* CTA Actions */}
            <div
              ref={ctaGroupRef}
              className="flex flex-wrap items-center gap-4 mb-8 lg:mb-0"
            >
              <button
                ref={ctaBtnRef}
                onClick={() => setIsExplorerOpen(true)}
                data-cursor="cta"
                className="hidden md:inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#818cf8] text-[#030712] font-mono font-bold text-xs tracking-wider uppercase shadow-[0_0_30px_rgba(56,189,248,0.5),0_0_20px_rgba(168,85,247,0.3)] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#38bdf8] focus-visible:outline-none group hover:opacity-95 hover:scale-[1.02] transition-all"
              >
                <MousePointerClick className="w-4 h-4 transition-transform group-hover:scale-110" />
                EXPLORE PIPELINES
              </button>

              <button
                onClick={() => setIsExplorerOpen(true)}
                data-cursor="cta"
                className="inline-flex md:hidden items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#818cf8] text-[#030712] font-mono font-bold text-xs tracking-wider uppercase shadow-[0_0_24px_rgba(56,189,248,0.35)] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#38bdf8] focus-visible:outline-none"
              >
                <MousePointerClick className="w-4 h-4" />
                EXPLORE LIFECYCLE
              </button>

              <a
                href="#services"
                data-cursor="interactive"
                className="inline-flex md:hidden items-center gap-2 px-5 py-3 rounded-xl bg-[#0f172a] border border-[#38bdf8]/40 text-[#38bdf8] font-mono font-bold text-xs tracking-wider uppercase hover:bg-[#38bdf8]/10 transition-colors"
              >
                <Layers className="w-4 h-4" />
                VIEW CAPABILITIES
              </a>

              <a
                ref={arrowCueRef}
                href="#services"
                data-cursor="interactive"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#64748b] hover:text-[#38bdf8] transition-colors underline underline-offset-4"
              >
                <span>or scroll to services</span>
                <ArrowDown className="w-3 h-3 arrow-icon transition-colors" />
              </a>
            </div>

            {/* ═══ MOBILE: Synchronized Stage Grid ═══ */}
            <div className="mt-6 flex flex-col items-center gap-5 md:hidden">
              <PipelineDial
                activeIndex={displayIndex}
                compact
                className="h-[13rem] w-[13rem]"
              />

              <div className="w-full border-t border-[rgba(255,255,255,0.1)] pt-5 flex flex-col gap-3">
                <MonoLabel className="text-[#38bdf8] mb-1">
                  DEVOPS LIFECYCLE STAGES
                </MonoLabel>
                <div className="grid grid-cols-2 gap-2">
                  {PIPELINE_STAGES.map((s, idx) => {
                    const Icon = STAGE_ICONS[idx] || ClipboardList;
                    const c = WEDGE_COLORS[idx];
                    const isActive = idx === displayIndex;

                    return (
                      <div
                        key={s.id}
                        onClick={() => setHoveredIndex(idx)}
                        className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all duration-300 cursor-pointer ${
                          isActive
                            ? "bg-[#0f172a] border-[#38bdf8]/60 shadow-[0_0_15px_rgba(56,189,248,0.25)]"
                            : "bg-[#0f172a]/60 border-[rgba(255,255,255,0.08)] hover:border-[#38bdf8]/30"
                        }`}
                      >
                        <Icon
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: isActive ? "#38bdf8" : c.text }}
                        />
                        <div className="flex flex-col min-w-0">
                          <span
                            className={`text-[10px] font-mono font-bold truncate ${
                              isActive ? "text-white" : "text-[#cbd5e1]"
                            }`}
                          >
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
            </div>
          </div>

          {/* ═══ TABLET & DESKTOP: Interactive Continuous Lifecycle Wheel ═══ */}
          <div
            className="hidden md:block mt-10 h-[min(52vw,390px)] w-[min(52vw,390px)] self-center z-10 lg:absolute lg:right-6 lg:top-1/2 lg:mt-0 lg:h-[390px] lg:w-[390px] lg:-translate-y-1/2 xl:right-16 xl:h-[460px] xl:w-[460px]"
          >
            <div ref={wheelAnimRef} className="w-full h-full">
              <PipelineDial
                activeIndex={displayIndex}
                onActivate={() => setIsExplorerOpen(true)}
                onHoverStage={(idx) => setHoveredIndex(idx)}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FULLSCREEN EXPLORER OVERLAY ═══ */}
      {isExplorerOpen && (
        <PipelineExplorer onClose={() => setIsExplorerOpen(false)} />
      )}
    </>
  );
}

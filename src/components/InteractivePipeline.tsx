"use client";

import React, { useEffect, useId, useState } from "react";
import { PIPELINE_STAGES } from "@/data/pipelineStages";
import { MonoLabel } from "./atoms/MonoLabel";
import { GlowBadge } from "./atoms/GlowBadge";
import { SITE_CONTENT } from "@/data/siteContent";
import { PipelineExplorer } from "./PipelineExplorer";
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
  { main: "#0284c7", glow: "rgba(2, 132, 199, 0.45)", text: "#7dd3fc" },
  { main: "#2563eb", glow: "rgba(37, 99, 235, 0.45)", text: "#93c5fd" },
  { main: "#4f46e5", glow: "rgba(79, 70, 229, 0.45)", text: "#a5b4fc" },
  { main: "#7c3aed", glow: "rgba(124, 58, 237, 0.45)", text: "#c4b5fd" },
  { main: "#db2777", glow: "rgba(219, 39, 119, 0.45)", text: "#fbcfe8" },
  { main: "#059669", glow: "rgba(5, 150, 105, 0.45)", text: "#6ee7b7" },
  { main: "#d97706", glow: "rgba(217, 119, 6, 0.45)", text: "#fde68a" },
  { main: "#0891b2", glow: "rgba(8, 145, 178, 0.45)", text: "#67e8f9" },
];

// Inner radius 320, outer radius 560 with exact 45-degree wedge bounds
const PREVIEW_WEDGE_PATH =
  "M 485.7 182.6 A 560 560 0 0 1 914.3 182.6 L 822.5 404.4 A 320 320 0 0 0 577.5 404.4 Z";

interface PipelineDialProps {
  activeIndex: number;
  className?: string;
  compact?: boolean;
  onActivate?: () => void;
}

function PipelineDial({
  activeIndex,
  className = "",
  compact = false,
  onActivate,
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
      className={`relative rounded-full group select-none ${
        isInteractive
          ? "cursor-pointer transition-transform duration-500 hover:scale-[1.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] focus-visible:ring-offset-4 focus-visible:ring-offset-[#030712]"
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
      {/* Outer halo glow ring */}
      <div
        className="absolute inset-0 rounded-full border border-[rgba(56,189,248,0.25)] pointer-events-none transition-all duration-700 group-hover:border-[rgba(56,189,248,0.5)]"
        style={{
          boxShadow: `0 0 70px ${activeColor.glow}, inset 0 0 40px rgba(56,189,248,0.08)`,
        }}
      />

      {/* Existing continuous lifecycle dial, scaled rather than replaced at smaller breakpoints. */}
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
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.85" />
          </linearGradient>

          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer rim */}
        <circle
          cx="700"
          cy="700"
          r="660"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="2.5"
        />

        {/* Inner guide dashed circle */}
        <circle
          cx="700"
          cy="700"
          r="320"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />

        {/* 8 Rotating wedges */}
        {PIPELINE_STAGES.map((stage, idx) => {
          const angle = idx * 45;
          const color = WEDGE_COLORS[idx];
          const isHighlighted = idx === activeIndex;

          return (
            <g key={stage.id} transform={`rotate(${angle}, 700, 700)`}>
              <path
                d={PREVIEW_WEDGE_PATH}
                fill={isHighlighted ? color.main : "rgba(15, 23, 42, 0.75)"}
                fillOpacity={isHighlighted ? 0.95 : 0.45}
                stroke={isHighlighted ? "#ffffff" : "rgba(255, 255, 255, 0.12)"}
                strokeWidth={isHighlighted ? "3.5" : "1.2"}
                filter={isHighlighted ? `url(#${filterId})` : undefined}
                style={{
                  transition:
                    "fill 0.6s ease, fill-opacity 0.6s ease, stroke 0.6s ease",
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
                  transition: "fill 0.6s ease, font-size 0.6s ease",
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
                r={isHighlighted ? 7 : 4}
                fill={isHighlighted ? "#ffffff" : color.text}
                fillOpacity={isHighlighted ? 1 : 0.4}
                style={{ transition: "r 0.6s ease, fill-opacity 0.6s ease" }}
              />
            </g>
          );
        })}
      </svg>

      {/* Center status core remains upright while the dial rotates around it */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`flex flex-col items-center text-center rounded-full bg-[#0f172a]/85 backdrop-blur-xl border transition-all duration-500 shadow-2xl ${
            compact ? "p-3" : "p-4 sm:p-5"
          }`}
          style={{
            borderColor: `${activeColor.main}60`,
            boxShadow: `0 0 30px ${activeColor.glow}, inset 0 0 20px rgba(0,0,0,0.6)`,
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
            <span className="text-[9px] font-mono text-[#64748b] tracking-wider uppercase flex items-center gap-1 mt-0.5">
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

  // Smooth rotation timer that highlights the stage rotating to the top
  useEffect(() => {
    // 64 seconds total rotation divided across 8 stages = 8s per stage
    const interval = setInterval(() => {
      setActivePreviewIndex((prev) => (prev + 1) % PIPELINE_STAGES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section
        id="pipeline"
        className="relative w-full overflow-x-clip bg-[#030712] text-white"
      >
        {/* Ambient Glow Orbs */}
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-orb orb-3" />

        {/* Hero Section Container */}
        <div className="relative min-h-[90vh] lg:min-h-screen w-full flex flex-col justify-center overflow-hidden pt-28 pb-16 lg:py-0">
          {/* Subtle Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

          {/* ═══ HERO CONTENT ═══ */}
          <div className="relative z-20 w-full max-w-2xl px-6 sm:px-10 lg:absolute lg:left-12 lg:px-0 xl:left-20">
            <GlowBadge className="mb-6">
              {SITE_CONTENT.hero.badge}
            </GlowBadge>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05] text-white">
              {SITE_CONTENT.hero.headline}{" "}
              <span className="gradient-accent block">
                {SITE_CONTENT.hero.headlineAccent}
              </span>
            </h1>

            <p className="text-[#94a3b8] text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
              {SITE_CONTENT.hero.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8 lg:mb-0">
              <button
                onClick={() => setIsExplorerOpen(true)}
                className="hidden md:inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#818cf8] text-[#030712] font-mono font-bold text-xs tracking-wider uppercase hover:scale-[1.03] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(56,189,248,0.5)] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#38bdf8] focus-visible:outline-none group"
              >
                <MousePointerClick className="w-4 h-4 animate-bounce group-hover:scale-110" />
                EXPLORE PIPELINES
              </button>

              <button
                onClick={() => setIsExplorerOpen(true)}
                className="inline-flex md:hidden items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#818cf8] text-[#030712] font-mono font-bold text-xs tracking-wider uppercase hover:scale-[1.03] active:scale-[0.98] transition-all shadow-[0_0_24px_rgba(56,189,248,0.35)] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#38bdf8] focus-visible:outline-none"
              >
                <MousePointerClick className="w-4 h-4" />
                EXPLORE LIFECYCLE
              </button>

              <a
                href="#services"
                className="inline-flex md:hidden items-center gap-2 px-5 py-3 rounded-xl bg-[#0f172a] border border-[#38bdf8]/40 text-[#38bdf8] font-mono font-bold text-xs tracking-wider uppercase hover:bg-[#38bdf8]/10 transition-colors"
              >
                <Layers className="w-4 h-4" />
                VIEW CAPABILITIES
              </a>

              <a
                href="#services"
                className="inline-flex items-center gap-1 text-xs font-mono text-[#64748b] hover:text-[#94a3b8] transition-colors underline underline-offset-4"
              >
                <span>or scroll to services</span>
                <ArrowDown className="w-3 h-3" />
              </a>
            </div>

            {/* ═══ MOBILE: Synchronized Stage Grid ═══ */}
            <div className="mt-6 flex flex-col items-center gap-5 md:hidden">
              <PipelineDial
                activeIndex={activePreviewIndex}
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
                    const isActive = idx === activePreviewIndex;

                    return (
                      <div
                        key={s.id}
                        className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all duration-300 ${
                          isActive
                            ? "bg-[#0f172a] border-[#38bdf8]/60 shadow-[0_0_15px_rgba(56,189,248,0.25)]"
                            : "bg-[#0f172a]/60 border-[rgba(255,255,255,0.08)]"
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
          <PipelineDial
            activeIndex={activePreviewIndex}
            onActivate={() => setIsExplorerOpen(true)}
            className="hidden md:block mt-10 h-[min(52vw,390px)] w-[min(52vw,390px)] self-center z-10 lg:absolute lg:right-6 lg:top-1/2 lg:mt-0 lg:h-[390px] lg:w-[390px] lg:-translate-y-1/2 xl:right-16 xl:h-[460px] xl:w-[460px]"
          />
        </div>
      </section>

      {/* ═══ FULLSCREEN EXPLORER OVERLAY ═══ */}
      {isExplorerOpen && (
        <PipelineExplorer onClose={() => setIsExplorerOpen(false)} />
      )}
    </>
  );
}

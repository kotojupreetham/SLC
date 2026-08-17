# SRE Interactive Circle: Architecture, Mechanics & Engineering Methodology

This document provides a comprehensive breakdown of the **Smarter Release Engineering (SRE) Continuous Lifecycle Circle**, covering its engineering methodology, mathematical SVG geometry, dual-state architecture, animation mechanics, and the complete source code.

---

## Table of Contents
1. [Methodology & Engineering Philosophy](#1-methodology--engineering-philosophy)
   - The 8 DevOps Lifecycle Stages
   - Why the Circle Continuous Loop Matters
   - The Philosophy of "Shift-Left" & Automated Governance
2. [Mechanical & Architectural System Overview](#2-mechanical--architectural-system-overview)
   - State 1: The Hero Rotary Dial (`InteractivePipeline.tsx`)
   - State 2: The Fullscreen Canopy Dome Explorer (`PipelineExplorer.tsx`)
3. [Mathematical SVG Geometry & Zero-Overlap Mechanics](#3-mathematical-svg-geometry--zero-overlap-mechanics)
   - Coordinate Space & Trigonometric Derivations
   - Wedge Path Equations ($45^\circ$ Segments)
   - Inner Clear Zone & Collision Prevention
4. [Animation & Interaction Mechanics](#4-animation--interaction-mechanics)
   - CSS Continuous Counter-Clockwise Rotation
   - GSAP ScrollTrigger Scrubbing & Snapping
   - Keyboard Navigation & Direct Stage Selection
   - Fluid Responsive Breakpoint Scaling
5. [Complete Source Code](#5-complete-source-code)
   - A. `src/data/pipelineStages.ts`
   - B. `src/components/InteractivePipeline.tsx`
   - C. `src/components/PipelineExplorer.tsx`

---

## 1. Methodology & Engineering Philosophy

### The 8 DevOps Lifecycle Stages
In modern release engineering, software delivery is not a linear waterfall but an **infinite, continuous feedback loop**. The circle visualizes the 8 continuous stages of delivery:

```
      [01 PLAN] ───► [02 CODE] ───► [03 BUILD] ───► [04 TEST]
         ▲                                              │
         │                                              ▼
    [08 MONITOR] ◄── [07 OPERATE] ◄── [06 DEPLOY] ◄── [05 RELEASE]
```

1. **01 // PLAN (Architecture)**: Define SLIs/SLOs, system topologies, and availability targets ($99.99\%$).
2. **02 // CODE (Development)**: Immutable feature branches, automated static linting, SAST, and peer reviews.
3. **03 // BUILD (Compilation)**: Hermetic, reproducible containerized artifacts with image signing (Cosign) and layer caching.
4. **04 // TEST (Verification)**: Automated integration, DAST vulnerability scanning, and performance stress gates.
5. **05 // RELEASE (Governance)**: Automated policy engine, canary promotion rules, and compliance sign-offs.
6. **06 // DEPLOY (Execution)**: Progressive traffic shifting (Blue-Green / Canary) with automated rollback triggers ($<2\text{s}$).
7. **07 // OPERATE (Infrastructure)**: Self-healing Kubernetes clusters, auto-scaling, and infrastructure drift remediation.
8. **08 // MONITOR (Observability)**: Full-stack distributed tracing, log aggregation, and real-time anomaly detection feeding telemetry back into **Plan**.

### Why the Circle Rotates Counter-Clockwise (CCW)
The counter-clockwise rotation mechanics represent **continuous feedback**: telemetry and production insights from `OPERATE` and `MONITOR` directly inform and refine future `PLAN` and `CODE` cycles, preventing architectural decay.

---

## 2. Mechanical & Architectural System Overview

The circle operates under a **Dual-State Interaction Architecture**:

```
┌────────────────────────────────────────────────────────┐
│ STATE 1: Hero Rotary Dial (InteractivePipeline.tsx)    │
│  - Ambient background floating orbs                    │
│  - Continuous 64s CSS rotation                         │
│  - Synchronized center status core                     │
│  - Click to Expand Trigger                             │
└──────────────────────────┬─────────────────────────────┘
                           │ (Click or "Explore Pipelines")
                           ▼
┌────────────────────────────────────────────────────────┐
│ STATE 2: Fullscreen Canopy Explorer (PipelineExplorer) │
│  - GSAP scaling growth entry animation                 │
│  - Scroll-driven GSAP scrub (550vh track)              │
│  - Top active-stage laser indicator                    │
│  - Protected glass center card with 4 pillar details   │
│  - Direct wedge click + Arrow key navigation           │
└────────────────────────────────────────────────────────┘
```

---

## 3. Mathematical SVG Geometry & Zero-Overlap Mechanics

Both circles render inside a standard normalized SVG coordinate space: **$1400 \times 1400$**, with the origin center at **$(cx=700, cy=700)$**.

### Trigonometric Derivation for $45^\circ$ Wedges
Because there are 8 stages, each wedge spans exactly $45^\circ$ ($360^\circ / 8 = 45^\circ$). To center the active wedge at 12 o'clock ($0^\circ$), the wedge bounds extend from **$-22.5^\circ$** to **$+22.5^\circ$**:

$$\sin(22.5^\circ) \approx 0.38268343236, \quad \cos(22.5^\circ) \approx 0.92387953251$$

#### For the Canopy Dome Explorer (`PipelineExplorer.tsx`):
- **Outer Radius ($R_{\text{outer}}$)**: $620\text{px}$
- **Inner Radius ($R_{\text{inner}}$)**: $440\text{px}$
- **Wedge Radial Thickness**: $620 - 440 = 180\text{px}$

$$\begin{aligned}
x_1 &= 700 - 620 \times \sin(22.5^\circ) = 700 - 237.26 = \mathbf{462.7} \\
y_1 &= 700 - 620 \times \cos(22.5^\circ) = 700 - 572.81 = \mathbf{127.2} \\
x_2 &= 700 + 620 \times \sin(22.5^\circ) = 700 + 237.26 = \mathbf{937.3} \\
y_2 &= 700 - 620 \times \cos(22.5^\circ) = 700 - 572.81 = \mathbf{127.2} \\
x_3 &= 700 + 440 \times \sin(22.5^\circ) = 700 + 168.38 = \mathbf{868.4} \\
y_3 &= 700 - 440 \times \cos(22.5^\circ) = 700 - 406.51 = \mathbf{293.5} \\
x_4 &= 700 - 440 \times \sin(22.5^\circ) = 700 - 168.38 = \mathbf{531.6} \\
y_4 &= 700 - 440 \times \cos(22.5^\circ) = 700 - 406.51 = \mathbf{293.5}
\end{aligned}$$

**Generated SVG Path (`WEDGE_PATH`)**:
```svg
M 462.7 127.2 A 620 620 0 0 1 937.3 127.2 L 868.4 293.5 A 440 440 0 0 0 531.6 293.5 Z
```
This guarantees **zero overlapping pixels** between adjacent wedges and zero visual artifacting.

### Inner Clear Zone Collision Mechanics
The inner radius of $440\text{px}$ in SVG space creates an **$880\text{px}$ diameter clear zone** inside the dome. By centering both the wheel and the stage card at `top: 50%`, `left: 50%`, `-translate-x-1/2 -translate-y-1/2`, the center card (width: $480\text{px}$, height: $360\text{px}$) sits completely inside the inner circle, leaving $>80\text{px}$ of buffer margin on all sides.

---

## 4. Animation & Interaction Mechanics

### CSS Continuous Dial Rotation
In the hero view, CSS handles GPU-accelerated continuous rotation:
```css
@keyframes dialRotateCcw {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

.dial-rotate-ccw {
  animation: dialRotateCcw 64s linear infinite;
  transform-origin: center center;
}
```

### GSAP ScrollTrigger Scrubbing
In the fullscreen explorer, GSAP pins the screen and rotates the SVG canopy based on scroll progress:
```typescript
rotationTl.to(wheelSvgRef.current, {
  rotate: -(totalStages - 1) * 45, // Rotates from 0° down to -315°
  duration: totalStages - 1,
  ease: "none",
  onUpdate: function () {
    const progress = this.progress();
    const rawIdx = Math.round(progress * (totalStages - 1));
    const idx = Math.min(Math.max(rawIdx, 0), totalStages - 1);
    setActiveIndex(idx);
  },
});
```

---

## 5. Complete Source Code

### A. `src/data/pipelineStages.ts`
```typescript
import { PipelineStage } from "@/types/pipeline";

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "plan",
    badge: "01 // ARCHITECTURE",
    title: "Plan",
    subtitle: "Mapping System Topologies",
    description: "Define goals, strategies and roadmap for successful and reliable releases.",
    metrics: [
      { label: "Target Availability", value: "99.99%" },
      { label: "RTO / RPO", value: "< 5 mins" }
    ],
    pillars: [
      { label: "Define Strategy", icon: "target" },
      { label: "Set Clear Goals", icon: "clipboard" },
      { label: "Align Teams", icon: "users" },
      { label: "Plan for Success", icon: "trending-up" }
    ]
  },
  {
    id: "code",
    badge: "02 // DEVELOPMENT",
    title: "Code",
    subtitle: "Immutable Feature Branches",
    description: "Enforcing static analysis, automated linting, and peer reviews on every merge request.",
    metrics: [
      { label: "Branch Coverage", value: "> 92%" },
      { label: "Static Checks", value: "Strict" }
    ],
    pillars: [
      { label: "Feature Branches", icon: "git-branch" },
      { label: "Strict Linting", icon: "file-check" },
      { label: "Security Scans", icon: "shield" },
      { label: "Peer Reviews", icon: "users" }
    ]
  },
  {
    id: "build",
    badge: "03 // COMPILATION",
    title: "Build",
    subtitle: "Containerized Artifacts",
    description: "Creating hermetic, reproducible runtime environments with cryptographic integrity.",
    metrics: [
      { label: "Build Time", value: "1.2 mins" },
      { label: "Image Size", value: "42MB" }
    ],
    pillars: [
      { label: "Hermetic Builds", icon: "box" },
      { label: "Fast Compiles", icon: "zap" },
      { label: "Image Signing", icon: "lock" },
      { label: "Layer Caching", icon: "layers" }
    ]
  },
  {
    id: "test",
    badge: "04 // VERIFICATION",
    title: "Test",
    subtitle: "Shift-Left Testing",
    description: "Executing integration suites, dynamic vulnerability scans, and performance stress runs.",
    metrics: [
      { label: "Security Gate", value: "Zero High/Critical" },
      { label: "Test Suite", value: "1,420 Passed" }
    ],
    pillars: [
      { label: "Automated QA", icon: "check-circle" },
      { label: "SAST & DAST", icon: "shield" },
      { label: "Stress Testing", icon: "activity" },
      { label: "Quality Gates", icon: "sliders" }
    ]
  },
  {
    id: "release",
    badge: "05 // GOVERNANCE",
    title: "Release",
    subtitle: "Approval Policy Engine",
    description: "Automated canary promotion and security sign-offs before live traffic routing.",
    metrics: [
      { label: "Policy Checks", value: "Passed" },
      { label: "Sign-off", value: "Automated" }
    ],
    pillars: [
      { label: "Canary Rules", icon: "sliders" },
      { label: "Policy Engine", icon: "file-check" },
      { label: "Auto Sign-Off", icon: "check-circle" },
      { label: "Traffic Shift", icon: "git-branch" }
    ]
  },
  {
    id: "deploy",
    badge: "06 // EXECUTION",
    title: "Deploy",
    subtitle: "Progressive Traffic Shifting",
    description: "Executing Blue-Green / Canary rollouts with real-time automated rollback safety.",
    metrics: [
      { label: "Downtime", value: "0.00ms" },
      { label: "Rollback Time", value: "< 2 secs" }
    ],
    pillars: [
      { label: "Zero Downtime", icon: "zap" },
      { label: "Fast Rollback", icon: "rotate-ccw" },
      { label: "Multi-Region", icon: "globe" },
      { label: "Blue-Green Safe", icon: "layers" }
    ]
  },
  {
    id: "operate",
    badge: "07 // INFRASTRUCTURE",
    title: "Operate",
    subtitle: "Self-Healing Clusters",
    description: "Managing auto-scaling groups, mesh routing, and automated infrastructure drift correction.",
    metrics: [
      { label: "Cluster Nodes", value: "256 Active" },
      { label: "Auto-Scale Latency", value: "< 15 secs" }
    ],
    pillars: [
      { label: "Self-Healing", icon: "refresh-cw" },
      { label: "Auto-Scaling", icon: "trending-up" },
      { label: "Drift Correct", icon: "sliders" },
      { label: "Mesh Routing", icon: "network" }
    ]
  },
  {
    id: "monitor",
    badge: "08 // OBSERVABILITY",
    title: "Monitor",
    subtitle: "Continuous Improvement Loop",
    description: "Aggregating distributed tracing, log metrics, and anomaly detection to inform future builds.",
    metrics: [
      { label: "Telemetry Ingestion", value: "4.2 GB/sec" },
      { label: "MTTD / MTTR", value: "< 1 min" }
    ],
    pillars: [
      { label: "Distributed Trace", icon: "activity" },
      { label: "Anomaly Detect", icon: "eye" },
      { label: "MTTD < 1 Min", icon: "zap" },
      { label: "Live Telemetry", icon: "trending-up" }
    ]
  }
];
```

---

### B. `src/components/InteractivePipeline.tsx`
```tsx
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

      {/* Rotating Lifecycle SVG Dial */}
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

      {/* Center status core remains upright while dial rotates */}
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

  // Rotate highlight stage every 8 seconds (64s total / 8 stages)
  useEffect(() => {
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

        <div className="relative min-h-[90vh] lg:min-h-screen w-full flex flex-col justify-center overflow-hidden pt-28 pb-16 lg:py-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

          {/* ═══ HERO TEXT ═══ */}
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

              <a
                href="#services"
                className="inline-flex md:hidden items-center gap-2 px-6 py-3 rounded-xl bg-[#0f172a] border border-[#38bdf8]/40 text-[#38bdf8] font-mono font-bold text-xs tracking-wider uppercase hover:bg-[#38bdf8]/10 transition-colors"
              >
                <Layers className="w-4 h-4" />
                VIEW CAPABILITIES ↓
              </a>

              <a
                href="#services"
                className="inline-flex items-center gap-1 text-xs font-mono text-[#64748b] hover:text-[#94a3b8] transition-colors underline underline-offset-4"
              >
                <span>or scroll to services</span>
                <ArrowDown className="w-3 h-3" />
              </a>
            </div>

            {/* ═══ MOBILE: Compact Dial + 2-Col Grid ═══ */}
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

          {/* ═══ DESKTOP: Rotary Preview Dial ═══ */}
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
```

---

### C. `src/components/PipelineExplorer.tsx`
```tsx
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

function PillarIcon({ iconName, className }: { iconName: string; className?: string }) {
  switch (iconName) {
    case "target": return <Target className={className} />;
    case "clipboard": return <ClipboardList className={className} />;
    case "users": return <Users className={className} />;
    case "trending-up": return <TrendingUp className={className} />;
    case "git-branch": return <GitBranch className={className} />;
    case "file-check": return <FileCheck className={className} />;
    case "shield": return <Shield className={className} />;
    case "box": return <Box className={className} />;
    case "zap": return <Zap className={className} />;
    case "lock": return <Lock className={className} />;
    case "layers": return <Layers className={className} />;
    case "check-circle": return <CheckCircle2 className={className} />;
    case "activity": return <Activity className={className} />;
    case "sliders": return <Sliders className={className} />;
    case "rotate-ccw": return <RotateCcw className={className} />;
    case "globe": return <Globe className={className} />;
    case "refresh-cw": return <RefreshCw className={className} />;
    case "network": return <Network className={className} />;
    case "eye": return <Eye className={className} />;
    default: return <CheckCircle2 className={className} />;
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
  const topNavRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const wheelSvgRef = useRef<SVGSVGElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const infoInnerRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const exitBtnRef = useRef<HTMLButtonElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const originalOverflowRef = useRef("");
  const isExitingRef = useRef(false);

  // --- EXIT / SHRINK-BACK ANIMATION ---
  const handleExit = useCallback(() => {
    if (isExitingRef.current) return;
    isExitingRef.current = true;

    scrollTriggerRef.current?.kill();
    scrollTriggerRef.current = null;

    const exitTl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = originalOverflowRef.current;
        onClose();
      },
    });

    exitTl
      .to(topNavRef.current, { opacity: 0, y: -20, duration: 0.3, ease: "power2.in" }, 0)
      .to(infoRef.current, { opacity: 0, y: 30, scale: 0.9, duration: 0.35, ease: "power2.in" }, 0)
      .to(scrollHintRef.current, { opacity: 0, duration: 0.2 }, 0)
      .to(exitBtnRef.current, { opacity: 0, duration: 0.2 }, 0)
      .to(
        wheelRef.current,
        { scale: 0.25, opacity: 0, duration: 0.7, ease: "power3.inOut" },
        0.05
      )
      .to(overlayRef.current, { opacity: 0, duration: 0.4, ease: "power2.in" }, 0.35);
  }, [onClose]);

  // Rotate to specific stage index
  const goToStage = useCallback((idx: number) => {
    if (!scrollContainerRef.current) return;
    const targetIdx = Math.max(0, Math.min(idx, PIPELINE_STAGES.length - 1));
    const totalHeight = scrollContainerRef.current.scrollHeight - scrollContainerRef.current.clientHeight;
    const targetScroll = (targetIdx / (PIPELINE_STAGES.length - 1)) * totalHeight;
    scrollContainerRef.current.scrollTo({ top: targetScroll, behavior: "smooth" });
  }, []);

  // --- SCROLL-DRIVEN ANTI-CLOCKWISE ROTATION ---
  const setupScrollRotation = useCallback(() => {
    const totalStages = PIPELINE_STAGES.length;
    const rotationTl = gsap.timeline({ paused: true });

    // Rotate anti-clockwise: Stage 0 at 0°, Stage 1 at -45°, ..., Stage 7 at -315°
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

    // Fade out scroll hint once scrolling begins
    if (scrollHintRef.current) {
      gsap.to(scrollHintRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        scrollTrigger: {
          trigger: triggerRef.current,
          scroller: scrollContainerRef.current,
          start: "top top",
          end: "+=120",
          scrub: true,
        },
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
      onLeave: () => {
        gsap.delayedCall(0.5, () => handleExit());
      },
    });

    scrollTriggerRef.current = trigger;
  }, [handleExit]);

  // --- ENTRY / GROWING ANIMATION + SETUP ---
  useEffect(() => {
    if (typeof window === "undefined") return;

    originalOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    isExitingRef.current = false;
    setActiveIndex(0);

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }

    const ctx = gsap.context(() => {
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(topNavRef.current, { opacity: 0, y: -25 });
      gsap.set(wheelRef.current, { scale: 0.28, opacity: 0 });
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
          topNavRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          0.1
        )
        .to(
          wheelRef.current,
          { scale: 1, opacity: 1, duration: 1.0, ease: "power3.out" },
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
        goToStage(activeIndex + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goToStage(activeIndex - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      scrollTriggerRef.current?.kill();
      scrollTriggerRef.current = null;
      ctx.revert();
      document.body.style.overflow = originalOverflowRef.current;
    };
  }, [handleExit, setupScrollRotation, goToStage, activeIndex]);

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
      {/* ═══ TOP NAVBAR ═══ */}
      <div
        ref={topNavRef}
        className="absolute top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between pointer-events-auto backdrop-blur-md bg-[#030712]/70 border-b border-[rgba(255,255,255,0.08)]"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#38bdf8] via-[#60a5fa] to-[#818cf8] flex items-center justify-center font-mono font-black text-xs text-[#030712] shadow-[0_0_20px_rgba(56,189,248,0.6)]">
            SRE
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white">
              Smarter Release Engineering
            </span>
            <span className="text-[9px] font-mono text-[#64748b] uppercase tracking-wider">
              PIPELINE LIFECYCLE EXPLORER
            </span>
          </div>
        </div>

        {/* Center Stage Quick Selector */}
        <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-[#090d16] border border-[rgba(255,255,255,0.08)]">
          {PIPELINE_STAGES.map((stg, sIdx) => {
            const isCurr = sIdx === activeIndex;
            return (
              <button
                key={stg.id}
                onClick={() => goToStage(sIdx)}
                className={`px-3 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  isCurr
                    ? "bg-[#38bdf8] text-[#030712] font-black shadow-[0_0_12px_rgba(56,189,248,0.5)]"
                    : "text-[#94a3b8] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {`0${sIdx + 1} ${stg.id}`}
              </button>
            );
          })}
        </div>

        {/* Right CTA and Exit button */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={handleExit}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#2563eb] to-[#38bdf8] text-white font-mono font-bold text-xs tracking-wider shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:scale-105 transition-all"
          >
            Contact Us <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <button
            ref={exitBtnRef}
            onClick={handleExit}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] text-[#94a3b8] hover:text-white hover:border-[#38bdf8] hover:bg-[rgba(56,189,248,0.15)] transition-all font-mono text-xs tracking-wider uppercase cursor-pointer focus-visible:ring-2 focus-visible:ring-[#38bdf8] focus-visible:outline-none"
            aria-label="Exit Explorer"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>
      </div>

      {/* ═══ SCROLL WRAPPER FOR GSAP ═══ */}
      <div ref={scrollContainerRef} className="h-full w-full overflow-y-auto">
        <div ref={triggerRef} style={{ height: "550vh" }}>
          <div className="h-screen w-full sticky top-0 overflow-hidden relative flex items-center justify-center">
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
              ref={wheelRef}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
              style={{
                width: "clamp(840px, 92vmin, 1180px)",
                height: "clamp(840px, 92vmin, 1180px)",
              }}
            >
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

            {/* ═══ CENTER CONTENT (Inside Inner Circle Clearance Zone) ═══ */}
            <div
              ref={infoRef}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto w-[90vw] max-w-[480px]"
            >
              <div
                ref={infoInnerRef}
                className="flex flex-col items-center text-center p-6 sm:p-7 rounded-3xl bg-[#0f172a]/92 backdrop-blur-2xl border border-[rgba(255,255,255,0.12)] shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-all duration-300"
                style={{
                  borderColor: `${activeColor.main}50`,
                  boxShadow: `0 0 40px ${activeColor.glow}, 0 20px 50px rgba(0,0,0,0.7)`,
                }}
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
                    <div
                      key={idx}
                      className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#090d16]/80 border border-[rgba(255,255,255,0.08)] backdrop-blur-md shadow-sm transition-all duration-200 hover:scale-105 hover:border-[#38bdf8]/40"
                    >
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-1 text-[#38bdf8] bg-[#38bdf8]/15 border border-[#38bdf8]/30">
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
                  <span>Explore This Stage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
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
```

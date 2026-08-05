"use client";

import React, { useRef, useCallback, useState } from "react";
import { GlowBadge } from "./atoms/GlowBadge";
import { SITE_CONTENT } from "@/data/siteContent";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full flex flex-col justify-center items-center text-center px-6 overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Mouse-reactive radial light */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(56,189,248,0.06), transparent 60%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl">
        <GlowBadge className="mb-8">{SITE_CONTENT.hero.badge}</GlowBadge>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-[0.95]">
          {SITE_CONTENT.hero.headline}
          <br />
          <span className="bg-gradient-to-r from-[#38bdf8] to-[#818cf8] bg-clip-text text-transparent">
            {SITE_CONTENT.hero.headlineAccent}
          </span>
        </h1>

        <p className="text-[#94a3b8] text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          {SITE_CONTENT.hero.description}
        </p>

        <a
          href="#pipeline"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#38bdf8] text-[#090d16] font-mono font-bold text-sm tracking-wider uppercase hover:bg-[#38bdf8]/90 transition-colors"
        >
          {SITE_CONTENT.hero.cta}
          <span className="text-lg">↓</span>
        </a>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2 text-[#64748b]">
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll to explore</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#38bdf8]/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
}

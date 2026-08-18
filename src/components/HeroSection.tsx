"use client";

import React, { useRef, useCallback, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlowBadge } from "./atoms/GlowBadge";
import { SITE_CONTENT } from "@/data/siteContent";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !heroRef.current) return;

    const prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduce) {
      // Ensure target section is visible for reduced-motion users
      const services = document.getElementById('services');
      if (services) {
        services.style.opacity = '1';
        services.style.transform = 'none';
      }
      return;
    }

    let connectTl: gsap.core.Timeline | null = null;

    try {
      const services = document.getElementById('services');
      if (services && heroRef.current) {
        connectTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'bottom top+=40',
            end: 'bottom top',
            scrub: 0.6,
          }
        });

        // fade/raise hero content slightly while pulling the services section in
        connectTl.to(contentRef.current, { y: -60, opacity: 0.18, scale: 0.98, ease: 'none' }, 0)
          .fromTo(services, { y: 30, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0);
      }
    } catch (e) {
      // noop
    }

    return () => {
      try {
        connectTl?.kill();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      } catch (e) {
        // noop
      }
    };
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
      <div ref={contentRef} className="relative z-10 max-w-4xl">
        <div className="hero-glass-card glass-panel-hover p-8 rounded-3xl">
        <div className="space-y-6">
          <GlowBadge className="mb-2">{SITE_CONTENT.hero.badge}</GlowBadge>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-2 leading-[0.95]">
            {SITE_CONTENT.hero.headline}
            <br />
            <span className="bg-gradient-to-r from-[#38bdf8] to-[#818cf8] bg-clip-text text-transparent">
              {SITE_CONTENT.hero.headlineAccent}
            </span>
          </h1>

          <p className="text-[#94a3b8] text-base md:text-lg max-w-2xl mx-auto mb-6 leading-relaxed">
            {SITE_CONTENT.hero.description}
          </p>

          <div className="flex items-center justify-center gap-4">
            <a
              href="#pipeline"
              className="pipeline-explore-button inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#38bdf8] text-[#090d16] font-mono font-bold text-sm tracking-wider uppercase hover:bg-[#38bdf8]/90 transition-colors"
            >
              {SITE_CONTENT.hero.cta}
              <span className="text-lg">↓</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-transparent border border-[rgba(255,255,255,0.06)] text-[#94a3b8] font-mono text-sm hover:text-white hover:border-[#a855f7]/40 transition-all"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
        </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2 text-[#64748b]">
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll to explore</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#38bdf8]/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
}

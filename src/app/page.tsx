"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "@/components/Header";
import { InteractivePipeline } from "@/components/InteractivePipeline";
import { EngineeringDashboard } from "@/components/EngineeringDashboard";
import { TechEcosystem } from "@/components/TechEcosystem";
import { DeploymentStories } from "@/components/DeploymentStories";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { ControlRoom } from "@/components/ControlRoom";
import { ContactNode } from "@/components/ContactNode";
import { SITE_CONTENT } from "@/data/siteContent";
import { StatusDot } from "@/components/atoms/StatusDot";
import { MonoLabel } from "@/components/atoms/MonoLabel";
import { ArrowUp, Terminal, Mail } from "lucide-react";
import { isReducedMotion } from "@/lib/gsapHelpers";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [utcTime, setUtcTime] = useState<string>("");
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(
        now.toISOString().replace("T", " ").substring(0, 19) + " UTC"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Section-level ScrollTrigger smooth entrance sequence
  useEffect(() => {
    if (typeof window === "undefined" || !mainRef.current) return;

    const ctx = gsap.context(() => {
      if (isReducedMotion()) return;

      const sections = mainRef.current?.querySelectorAll(".smooth-section-reveal");
      if (!sections) return;

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0.15, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main ref={mainRef} id="main-content" className="min-h-screen text-white selection:bg-[#38bdf8] selection:text-[#030712]">
      {/* Sticky Header Navbar */}
      <Header />
      {/* Header spacer to prevent content overlap with fixed header */}
      <div aria-hidden className="h-20 lg:h-24" />

      {/* Hero + Interactive Rotating Pipeline Dial */}
      <InteractivePipeline />

      {/* Neon Circuit Divider */}
      <div className="neon-divider my-2" />

      {/* Services Console — Trust */}
      <div id="services" className="smooth-section-reveal">
        <EngineeringDashboard />
      </div>

      {/* Neon Circuit Divider */}
      <div className="neon-divider my-2" />

      {/* Technology Matrix — Confidence */}
      <div id="matrix" className="smooth-section-reveal">
        <TechEcosystem />
      </div>

      {/* Neon Circuit Divider */}
      <div className="neon-divider my-2" />

      {/* Case Studies — Proof */}
      <div id="stories" className="smooth-section-reveal">
        <DeploymentStories />
      </div>

      {/* Neon Circuit Divider */}
      <div className="neon-divider my-2" />

      {/* Process — Methodology */}
      <div className="smooth-section-reveal">
        <ProcessTimeline />
      </div>

      {/* Neon Circuit Divider */}
      <div className="neon-divider my-2" />

      {/* Control Room — Telemetry Dashboard */}
      <div id="telemetry" className="smooth-section-reveal">
        <ControlRoom />
      </div>

      {/* Neon Circuit Divider */}
      <div className="neon-divider my-2" />

      {/* Contact Terminal */}
      <div id="contact" className="smooth-section-reveal">
        <ContactNode />
      </div>

      {/* Upgraded SRE Terminal Footer with Neon Glassmorphism */}
      <footer className="py-14 border-t border-[rgba(129,140,248,0.18)] bg-[#030712]/95 backdrop-blur-2xl shadow-[0_-10px_30px_rgba(0,0,0,0.5),0_0_30px_rgba(129,140,248,0.05)]">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          {/* Top Bar: Brand, Status, Social & Back to Top */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#38bdf8] via-[#60a5fa] to-[#818cf8] flex items-center justify-center font-mono font-black text-xs text-[#030712] shadow-[0_0_18px_rgba(56,189,248,0.5)]">
                SRE
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white tracking-wider">
                  SMARTER RELEASE ENGINEERING
                </span>
                <MonoLabel className="text-[10px] text-[#64748b]">
                  ENTERPRISE DELIVERY PLATFORMS
                </MonoLabel>
              </div>
            </div>

            {/* Social & Contact Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/kotojupreetham"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="interactive"
                aria-label="GitHub Repository"
                className="p-2.5 rounded-xl bg-[#090d16] border border-[rgba(255,255,255,0.08)] text-[#94a3b8] hover:text-[#38bdf8] hover:border-[#38bdf8]/40 hover:bg-[#38bdf8]/10 hover:shadow-[0_0_15px_rgba(56,189,248,0.25)] transition-all cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/kotojupreetham"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="interactive"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-xl bg-[#090d16] border border-[rgba(255,255,255,0.08)] text-[#94a3b8] hover:text-[#38bdf8] hover:border-[#38bdf8]/40 hover:bg-[#38bdf8]/10 hover:shadow-[0_0_15px_rgba(56,189,248,0.25)] transition-all cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="mailto:contact@sre.engineering"
                data-cursor="interactive"
                aria-label="Direct Email"
                className="p-2.5 rounded-xl bg-[#090d16] border border-[rgba(255,255,255,0.08)] text-[#94a3b8] hover:text-[#38bdf8] hover:border-[#38bdf8]/40 hover:bg-[#38bdf8]/10 hover:shadow-[0_0_15px_rgba(56,189,248,0.25)] transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" />
              </a>
              <button
                onClick={handleBackToTop}
                data-cursor="interactive"
                aria-label="Back to top"
                className="p-2.5 rounded-xl bg-[#090d16] border border-[rgba(255,255,255,0.08)] text-[#94a3b8] hover:text-[#38bdf8] hover:border-[#38bdf8]/40 hover:bg-[#38bdf8]/10 hover:shadow-[0_0_15px_rgba(56,189,248,0.25)] transition-all group cursor-pointer"
              >
                <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Bottom Telemetry Status Line */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#64748b]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#090d16] border border-[rgba(129,140,248,0.2)] shadow-[0_0_10px_rgba(129,140,248,0.08)]">
                <StatusDot status="healthy" pulse size="sm" />
                <span className="text-[#22c55e] font-semibold">SYS STATUS: 100% OPERATIONAL</span>
              </div>
              {utcTime && (
                <span className="hidden md:inline-flex items-center gap-1.5 text-[#94a3b8]">
                  <Terminal className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>{utcTime}</span>
                </span>
              )}
            </div>

            <p className="text-[#475569] tracking-wider text-center sm:text-right">
              © {new Date().getFullYear()} {SITE_CONTENT.footer.copyright}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

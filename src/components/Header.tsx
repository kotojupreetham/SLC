"use client";

import React, { useState } from "react";
import { StatusDot } from "./atoms/StatusDot";
import { MonoLabel } from "./atoms/MonoLabel";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { name: "Pipeline", href: "#pipeline", id: "pipeline" },
  { name: "Capabilities", href: "#services", id: "services" },
  { name: "Tech Matrix", href: "#matrix", id: "matrix" },
  { name: "Case Studies", href: "#stories", id: "stories" },
  { name: "Telemetry", href: "#telemetry", id: "telemetry" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("pipeline");
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll spy to highlight current active section
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = NAV_LINKS.map((l) => l.id);
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Accessible Skip Link for Keyboard Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#38bdf8] focus:text-[#030712] focus:font-mono focus:font-bold focus:rounded-lg focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:px-6 sm:py-4 transition-all duration-300 ${
          isScrolled ? "py-2 sm:py-3" : "py-3 sm:py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl bg-[#0f172a]/80 border border-[rgba(255,255,255,0.1)] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.03)_inset] transition-all duration-300">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] rounded-xl p-1 -m-1"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#38bdf8] via-[#60a5fa] to-[#818cf8] flex items-center justify-center font-mono font-black text-xs text-[#030712] shadow-[0_0_18px_rgba(56,189,248,0.5)] group-hover:scale-105 transition-all duration-200">
              SRE
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                RELEASE ENGINEERING
                <StatusDot status="healthy" pulse size="sm" />
              </span>
              <MonoLabel className="text-[9px] text-[#64748b] tracking-wider">
                SYS v2.4 OPERATIONAL
              </MonoLabel>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1 rounded-xl bg-[#030712]/50 border border-[rgba(255,255,255,0.05)]"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#38bdf8] ${
                    isActive
                      ? "text-[#38bdf8] font-bold bg-[#38bdf8]/10 shadow-[0_0_12px_rgba(56,189,248,0.15)]"
                      : "text-[#94a3b8] hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#38bdf8] rounded-full shadow-[0_0_8px_#38bdf8]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#818cf8] text-[#030712] font-mono font-bold text-xs tracking-wider uppercase hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_24px_rgba(56,189,248,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d16]"
            >
              <span>INITIATE PIPELINE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden text-[#94a3b8] hover:text-white p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] rounded-xl bg-[#090d16]/70 border border-[rgba(255,255,255,0.08)] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 mx-auto max-w-7xl p-5 sm:p-6 rounded-2xl bg-[#0f172a]/95 border border-[rgba(255,255,255,0.12)] backdrop-blur-2xl flex flex-col gap-2 shadow-[0_16px_40px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-top-2 duration-200">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors ${
                    isActive
                      ? "text-[#38bdf8] font-bold bg-[#38bdf8]/10 border border-[#38bdf8]/30"
                      : "text-[#cbd5e1] hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#60a5fa] text-[#030712] font-mono font-bold text-xs uppercase shadow-[0_0_20px_rgba(56,189,248,0.3)] tracking-wider"
            >
              <span>INITIATE PIPELINE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </header>
    </>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { StatusDot } from "./atoms/StatusDot";
import { MonoLabel } from "./atoms/MonoLabel";
import { Menu, X, ArrowRight, Sparkles, Sun, Moon } from "lucide-react";
import { useMagneticPointer } from "@/hooks/useMagneticPointer";
import { isReducedMotion } from "@/lib/gsapHelpers";

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
  const [isDarkMode, setIsDarkMode] = useState(true);

  const ctaRef = useMagneticPointer<HTMLAnchorElement>({ maxDisplacement: 4, strength: 0.2 });
  const themeToggleRef = useRef<HTMLButtonElement>(null);
  const themeIconRef = useRef<HTMLSpanElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Initialize theme from localStorage / system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem("sre-theme");
    const isLight = storedTheme === "light";
    setIsDarkMode(!isLight);

    if (isLight) {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, []);

  // Theme Toggle Handler with smooth icon rotation
  const handleToggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    localStorage.setItem("sre-theme", nextDark ? "dark" : "light");

    if (nextDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }

    if (themeIconRef.current && !isReducedMotion()) {
      gsap.fromTo(
        themeIconRef.current,
        { rotate: 0, scale: 0.8 },
        { rotate: 180, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
  };

  // Scroll spy to highlight current active section
  useEffect(() => {
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

  // Keyboard accessibility and focus management for mobile menu
  useEffect(() => {
    // Track the element that had focus before opening so we can restore it
    let previousActive: Element | null = null;

    if (!mobileMenuOpen) return;

    previousActive = document.activeElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Prevent background scroll while menu is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus first link in mobile menu for keyboard users
    if (mobileMenuRef.current) {
      const firstLink = mobileMenuRef.current.querySelector('a');
      (firstLink as HTMLElement | null)?.focus();
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // Restore scroll behavior
      document.body.style.overflow = originalOverflow;
      // Restore previously focused element
      if (previousActive && (previousActive as HTMLElement).focus) {
        try { (previousActive as HTMLElement).focus(); } catch { /* noop */ }
      }
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#38bdf8] focus:text-[#030712] focus:font-mono focus:font-bold focus:rounded-lg focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:px-6 sm:py-4 transition-all duration-300 ${
          isScrolled ? "py-2 sm:py-2.5" : "py-3 sm:py-4"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl bg-[#0f172a]/90 border backdrop-blur-2xl transition-all duration-300 ${
            isScrolled
              ? "border-[rgba(56,189,248,0.3)] shadow-[0_12px_36px_rgba(0,0,0,0.65),0_0_20px_rgba(56,189,248,0.08)]"
              : "border-[rgba(255,255,255,0.1)] shadow-[0_8px_32px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.03)_inset]"
          }`}
        >
          {/* Brand Logo */}
          <a
            href="#"
            data-cursor="interactive"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] rounded-xl p-1 -m-1"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#38bdf8] via-[#60a5fa] to-[#818cf8] flex items-center justify-center font-mono font-black text-xs text-[#030712] shadow-[0_0_18px_rgba(56,189,248,0.5)] group-hover:scale-105 transition-all duration-200">
              SRE
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-white flex items-center gap-2 group-hover:text-[#38bdf8] transition-colors duration-200">
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
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#030712]/70 border border-[rgba(255,255,255,0.08)]"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  data-cursor="interactive"
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#38bdf8] ${
                    isActive
                      ? "text-[#38bdf8] font-bold bg-[#38bdf8]/15 border border-[#38bdf8]/40 shadow-[0_0_14px_rgba(56,189,248,0.2)]"
                      : "text-[#94a3b8] hover:text-white hover:bg-white/[0.06] border border-transparent"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* CTA & Theme Toggle */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              ref={themeToggleRef}
              id="theme-toggle"
              onClick={handleToggleTheme}
              data-cursor="interactive"
              aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
              className="p-2.5 rounded-xl bg-[#090d16] border border-[rgba(255,255,255,0.1)] text-[#94a3b8] hover:text-[#38bdf8] hover:border-[#38bdf8]/40 hover:bg-[#38bdf8]/10 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#38bdf8] focus-visible:outline-none"
            >
              <span ref={themeIconRef} className="inline-block">
                {isDarkMode ? <Sun className="w-4 h-4 text-[#f59e0b]" /> : <Moon className="w-4 h-4 text-[#818cf8]" />}
              </span>
            </button>

            {/* Initiate Pipeline CTA */}
            <a
              ref={ctaRef}
              href="#contact"
              data-cursor="cta"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#818cf8] text-[#030712] font-mono font-bold text-xs tracking-wider uppercase hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_24px_rgba(56,189,248,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d16]"
            >
              <span>INITIATE PIPELINE</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Mobile Actions: Theme Toggle + Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={handleToggleTheme}
              aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
              className="p-2 text-[#94a3b8] hover:text-white rounded-xl bg-[#090d16]/70 border border-[rgba(255,255,255,0.08)] cursor-pointer"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-[#f59e0b]" /> : <Moon className="w-4 h-4 text-[#818cf8]" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
              className="text-[#94a3b8] hover:text-white p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] rounded-xl bg-[#090d16]/70 border border-[rgba(255,255,255,0.08)] cursor-pointer transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            className="lg:hidden mt-2 mx-auto max-w-7xl p-5 sm:p-6 rounded-2xl bg-[#0f172a]/95 border border-[rgba(56,189,248,0.3)] backdrop-blur-2xl flex flex-col gap-2 shadow-[0_16px_40px_rgba(0,0,0,0.65)] animate-in fade-in slide-in-from-top-2 duration-200"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors ${
                    isActive
                      ? "text-[#38bdf8] font-bold bg-[#38bdf8]/15 border border-[#38bdf8]/40"
                      : "text-[#cbd5e1] hover:text-white hover:bg-white/[0.05]"
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
              className="mt-3 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#818cf8] text-[#030712] font-mono font-bold text-xs uppercase shadow-[0_0_20px_rgba(56,189,248,0.3)] tracking-wider active:scale-[0.98] transition-transform"
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

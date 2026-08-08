"use client";

import React, { useState } from "react";
import { StatusDot } from "./atoms/StatusDot";
import { MonoLabel } from "./atoms/MonoLabel";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Pipeline", href: "#pipeline" },
    { name: "Capabilities", href: "#services" },
    { name: "Tech Matrix", href: "#matrix" },
    { name: "Case Studies", href: "#stories" },
    { name: "Telemetry", href: "#telemetry" },
  ];

  return (
    <>
      {/* Accessible Skip Link for Keyboard Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#38bdf8] focus:text-[#030712] focus:font-mono focus:font-bold focus:rounded-lg focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5 rounded-2xl bg-[#0f172a]/70 border border-[rgba(255,255,255,0.1)] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#38bdf8] to-[#818cf8] flex items-center justify-center font-mono font-black text-xs text-[#030712] shadow-[0_0_15px_rgba(56,189,248,0.5)] group-hover:scale-105 transition-transform">
              SRE
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                RELEASE ENGINEERING
                <StatusDot status="healthy" pulse size="sm" />
              </span>
              <MonoLabel className="text-[9px] text-[#64748b]">SYS v2.4 OPERATIONAL</MonoLabel>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-mono font-medium text-[#94a3b8] hover:text-[#38bdf8] transition-colors tracking-wider uppercase focus-visible:outline-none focus-visible:text-[#38bdf8]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#60a5fa] text-[#030712] font-mono font-bold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(56,189,248,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]"
            >
              INITIATE PIPELINE
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden text-[#94a3b8] hover:text-white p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] rounded"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 mx-auto max-w-7xl p-6 rounded-2xl bg-[#0f172a]/95 border border-[rgba(255,255,255,0.1)] backdrop-blur-2xl flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono text-[#cbd5e1] hover:text-[#38bdf8] py-2 border-b border-[rgba(255,255,255,0.05)] uppercase"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center py-3 rounded-xl bg-[#38bdf8] text-[#030712] font-mono font-bold text-xs uppercase"
            >
              INITIATE PIPELINE
            </a>
          </div>
        )}
      </header>
    </>
  );
}

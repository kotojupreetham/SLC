"use client";

import React from "react";
import { StatusDot } from "./StatusDot";
import { MonoLabel } from "./MonoLabel";
import { ScrollReveal } from "../interaction/ScrollReveal";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`mb-16 text-center max-w-3xl mx-auto ${className}`}>
      <ScrollReveal direction="up">
        {/* Pill Badge with Ambient Glow */}
        <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-[#0f172a]/80 border border-[rgba(129,140,248,0.25)] shadow-[0_0_20px_rgba(129,140,248,0.12),0_0_10px_rgba(56,189,248,0.08)] backdrop-blur-md">
          <StatusDot status="accent" pulse />
          <MonoLabel className="text-[#38bdf8] font-semibold text-xs tracking-wider">{label}</MonoLabel>
        </div>

        {/* Gradient Title */}
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          {title}
        </h2>

        {/* Subtitle / Description */}
        {description && (
          <p className="text-[#94a3b8] text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </ScrollReveal>
    </div>
  );
}

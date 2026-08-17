import React from "react";
import { StatusDot } from "./StatusDot";
import { MonoLabel } from "./MonoLabel";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-12 md:mb-16">
      <div className="inline-flex items-center gap-2 mb-3">
        <StatusDot status="accent" pulse />
        <MonoLabel className="text-[#38bdf8]">{label}</MonoLabel>
      </div>
      <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-[#94a3b8] mt-3 max-w-2xl text-sm md:text-base leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

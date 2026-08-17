import React from "react";
import { cn } from "@/lib/cn";
import { StatusDot } from "./StatusDot";

interface GlowBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function GlowBadge({ children, className }: GlowBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full",
        "border border-[rgba(56,189,248,0.25)] bg-[#0f172a]/80 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.1)]",
        "text-xs font-mono text-[#38bdf8] tracking-wider uppercase",
        className
      )}
    >
      <StatusDot status="accent" pulse />
      {children}
    </div>
  );
}

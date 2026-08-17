import React from "react";
import { cn } from "@/lib/cn";

interface StatusDotProps {
  status: "healthy" | "warning" | "critical" | "accent";
  pulse?: boolean;
  size?: "sm" | "md" | "lg";
}

const statusColors = {
  healthy: "bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.7)]",
  warning: "bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.7)]",
  critical: "bg-[#ef4444] shadow-[0_0_8px_rgba(239,68,68,0.7)]",
  accent: "bg-[#38bdf8] shadow-[0_0_8px_rgba(56,189,248,0.7)]",
};

export function StatusDot({ status, pulse = false, size = "sm" }: StatusDotProps) {
  const sizeClasses = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-2.5 h-2.5",
  };

  return (
    <span
      className={cn(
        "inline-block rounded-full transition-all duration-300",
        sizeClasses[size] || sizeClasses.sm,
        statusColors[status],
        pulse && "animate-pulse"
      )}
    />
  );
}

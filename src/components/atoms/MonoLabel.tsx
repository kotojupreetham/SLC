import React from "react";
import { cn } from "@/lib/cn";

interface MonoLabelProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function MonoLabel({ children, className, style }: MonoLabelProps) {
  return (
    <span
      style={style}
      className={cn(
        "text-[10px] font-mono font-medium tracking-widest uppercase text-[#94a3b8]",
        className
      )}
    >
      {children}
    </span>
  );
}

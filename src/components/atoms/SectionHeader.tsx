import React from "react";
import { StatusDot } from "./StatusDot";
import { MonoLabel } from "./MonoLabel";
import { ScrollReveal } from "@/components/interaction/ScrollReveal";
import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <ScrollReveal
      direction="up"
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center mx-auto max-w-3xl",
        className
      )}
    >
      <div
        className={cn(
          "inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[rgba(56,189,248,0.06)] border border-[rgba(56,189,248,0.18)] backdrop-blur-sm",
          align === "center" && "justify-center"
        )}
      >
        <StatusDot status="accent" pulse />
        <MonoLabel className="text-[#38bdf8] font-semibold">{label}</MonoLabel>
      </div>
      <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-[#94a3b8] mt-3 text-sm md:text-base leading-relaxed",
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
          )}
        >
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}

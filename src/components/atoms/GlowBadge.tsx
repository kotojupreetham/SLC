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
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full",
        "border border-[rgba(255,255,255,0.08)] bg-[#0f172a]",
        "text-xs font-mono text-[#38bdf8] tracking-wider uppercase",
        className
      )}
    >
      <StatusDot status="accent" />
      {children}
    </div>
  );
}

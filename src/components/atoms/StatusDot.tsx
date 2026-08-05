import { cn } from "@/lib/cn";

interface StatusDotProps {
  status: "healthy" | "warning" | "critical" | "accent";
  pulse?: boolean;
  size?: "sm" | "md";
}

const statusColors = {
  healthy: "bg-[#22c55e]",
  warning: "bg-[#f59e0b]",
  critical: "bg-[#ef4444]",
  accent: "bg-[#38bdf8]",
};

export function StatusDot({ status, pulse = false, size = "sm" }: StatusDotProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full",
        size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2",
        statusColors[status],
        pulse && "animate-pulse"
      )}
    />
  );
}

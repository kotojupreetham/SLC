import { cn } from "@/lib/cn";

interface MonoLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function MonoLabel({ children, className }: MonoLabelProps) {
  return (
    <span
      className={cn(
        "text-[10px] font-mono font-medium tracking-widest uppercase text-[#94a3b8]",
        className
      )}
    >
      {children}
    </span>
  );
}

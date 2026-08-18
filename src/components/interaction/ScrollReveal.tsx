"use client";

import React from "react";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  staggerIndex?: number;
  delay?: number; // In milliseconds
  direction?: "up" | "down" | "left" | "right" | "none";
  as?: React.ElementType;
  threshold?: number;
}

export function ScrollReveal({
  children,
  className,
  staggerIndex = 0,
  delay = 0,
  direction = "up",
  as: Component = "div",
  threshold = 0.15,
}: ScrollRevealProps) {
  const [ref, isInView] = useInViewOnce<HTMLElement>({ threshold });
  const prefersReducedMotion = useReducedMotion();

  const getDirectionTransform = () => {
    if (isInView || prefersReducedMotion) return "translate-x-0 translate-y-0";
    switch (direction) {
      case "up":
        return "translate-y-6";
      case "down":
        return "-translate-y-6";
      case "left":
        return "translate-x-6";
      case "right":
        return "-translate-x-6";
      case "none":
        return "translate-x-0 translate-y-0";
    }
  };

  const calculatedDelayMs = delay > 0 ? delay : staggerIndex * 60;

  // If the user prefers reduced motion, render content without transitions for accessibility
  if (prefersReducedMotion) {
    return (
      <Component ref={ref} className={cn(className)}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      ref={ref}
      style={{
        transitionDuration: "550ms",
        transitionDelay: `${calculatedDelayMs}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={cn(
        "transition-all will-change-[opacity,transform]",
        isInView ? "opacity-100" : "opacity-0",
        getDirectionTransform(),
        className
      )}
    >
      {children}
    </Component>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Only enable on desktop with fine pointer and when reduced motion is not preferred
    if (prefersReducedMotion || typeof window === "undefined") return;

    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let isHoveringInteractive = false;
    let isHoveringCTA = false;
    let isClicking = false;
    let rafId: number | null = null;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (target) {
        const ctaEl = target.closest('[data-cursor="cta"]');
        const interactiveEl = target.closest(
          'a, button, [role="button"], input, textarea, select, [data-cursor="interactive"]'
        );

        isHoveringCTA = !!ctaEl;
        isHoveringInteractive = !!interactiveEl && !ctaEl;
      }
    };

    const onMouseDown = () => {
      isClicking = true;
    };

    const onMouseUp = () => {
      isClicking = false;
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (dot && ring) {
        dot.style.opacity = "0";
        ring.style.opacity = "0";
      }
    };

    // Track when keyboard navigation is active to keep custom cursor hidden during keyboard interactions
    let keyboardNavTimeout: number | null = null;
    const onKeyDown = () => {
      // Hide custom cursor on keyboard navigation
      isVisible = false;
      if (dot && ring) {
        dot.style.opacity = "0";
        ring.style.opacity = "0";
      }

      // Keep it hidden for a short period so users can navigate with keyboard without distraction
      if (keyboardNavTimeout) window.clearTimeout(keyboardNavTimeout);
      keyboardNavTimeout = window.setTimeout(() => {
        keyboardNavTimeout = null;
      }, 1500);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        // Pause visuals when tab is hidden
        isVisible = false;
        if (dot && ring) {
          dot.style.opacity = "0";
          ring.style.opacity = "0";
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("keydown", onKeyDown, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Smooth animation loop using requestAnimationFrame
    const animate = () => {
      // Lerp ring towards mouse position (slightly faster follow for smoother feel)
      const ringLerp = 0.22;
      ringX += (mouseX - ringX) * ringLerp;
      ringY += (mouseY - ringY) * ringLerp;

      if (dot && ring) {
        // If keyboard navigation was recently used, keep hidden
        if (keyboardNavTimeout) {
          dot.style.opacity = "0";
          ring.style.opacity = "0";
        } else {
          dot.style.opacity = isVisible ? "1" : dot.style.opacity || "0";
          ring.style.opacity = isVisible ? "1" : ring.style.opacity || "0";
        }

        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${isClicking ? 0.78 : 1})`;

        let ringScale = 1;
        if (isClicking) {
          ringScale = 0.9;
        } else if (isHoveringCTA) {
          // Slightly reduce CTA scale to be less dominating
          ringScale = 1.3;
        } else if (isHoveringInteractive) {
          ringScale = 1.12;
        }

        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;

        if (isHoveringCTA) {
          ring.style.borderColor = "rgba(56, 189, 248, 0.72)";
          ring.style.backgroundColor = "rgba(56, 189, 248, 0.06)";
        } else if (isHoveringInteractive) {
          ring.style.borderColor = "rgba(56, 189, 248, 0.42)";
          ring.style.backgroundColor = "rgba(56, 189, 248, 0.02)";
        } else {
          ring.style.borderColor = "rgba(56, 189, 248, 0.20)";
          ring.style.backgroundColor = "transparent";
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (keyboardNavTimeout) window.clearTimeout(keyboardNavTimeout);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block"
    >
      {/* Outer soft ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-[rgba(56,189,248,0.25)] pointer-events-none opacity-0 transition-[border-color,background-color] duration-200 will-change-transform"
        style={{
          boxShadow: "0 0 8px rgba(56, 189, 248, 0.12)",
        }}
      />
      {/* Inner precise dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#38bdf8] pointer-events-none opacity-0 transition-transform duration-100 will-change-transform"
        style={{
          boxShadow: "0 0 8px #38bdf8",
        }}
      />
    </div>
  );
}

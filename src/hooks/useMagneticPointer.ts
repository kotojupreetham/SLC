"use client";

import { useEffect, useRef, RefObject } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface UseMagneticPointerOptions {
  maxDisplacement?: number; // Default: 5px
  strength?: number; // Default: 0.25
}

export function useMagneticPointer<T extends HTMLElement = HTMLButtonElement>(
  options: UseMagneticPointerOptions = {}
): RefObject<T | null> {
  const { maxDisplacement = 5, strength = 0.25 } = options;
  const ref = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") return;

    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;

    const element = ref.current;
    if (!element) return;

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const updatePosition = () => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;

      element.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        rafId = requestAnimationFrame(updatePosition);
      } else {
        element.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
        rafId = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      // Clamp displacement
      targetX = Math.max(-maxDisplacement, Math.min(maxDisplacement, deltaX));
      targetY = Math.max(-maxDisplacement, Math.min(maxDisplacement, deltaY));

      if (!rafId) {
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    const resetPosition = () => {
      targetX = 0;
      targetY = 0;
      if (!rafId) {
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    element.addEventListener("mousemove", handleMouseMove, { passive: true });
    element.addEventListener("mouseleave", resetPosition);
    element.addEventListener("blur", resetPosition);
    window.addEventListener("keydown", resetPosition, { passive: true });

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", resetPosition);
      element.removeEventListener("blur", resetPosition);
      window.removeEventListener("keydown", resetPosition);
      if (rafId) cancelAnimationFrame(rafId);
      element.style.transform = "";
    };
  }, [maxDisplacement, strength, prefersReducedMotion]);

  return ref;
}

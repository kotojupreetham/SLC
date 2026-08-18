"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

// Register plugins safely in client environment
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip);
}

/**
 * Checks if user prefers reduced motion
 */
export function isReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export interface RevealOptions {
  y?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  trigger?: Element | string | null;
  once?: boolean;
}

/**
 * Standard scroll-triggered reveal animation (fade + rise)
 * Strictly respects prefers-reduced-motion by bypassing spatial translation
 */
export function revealOnScroll(
  elements: gsap.DOMTarget,
  options: RevealOptions = {}
): gsap.core.Tween | gsap.core.Timeline | null {
  if (typeof window === "undefined") return null;

  const {
    y = 30,
    opacity = 0,
    duration = 0.8,
    delay = 0,
    stagger = 0.1,
    ease = "power2.out",
    start = "top 85%",
    trigger,
    once = true,
  } = options;

  const reduced = isReducedMotion();

  if (reduced) {
    return gsap.from(elements, {
      opacity: 0,
      duration: 0.15,
      delay,
      stagger: 0.02,
      ease: "none",
      scrollTrigger: {
        trigger: trigger || (elements as gsap.DOMTarget),
        start,
        once,
      },
    });
  }

  return gsap.from(elements, {
    y,
    opacity,
    duration,
    delay,
    stagger,
    ease,
    scrollTrigger: {
      trigger: trigger || (elements as gsap.DOMTarget),
      start,
      once,
      toggleActions: once ? "play none none none" : "play reverse play reverse",
    },
  });
}

export interface CountUpOptions {
  duration?: number;
  ease?: string;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  trigger?: Element | string | null;
  start?: string;
}

/**
 * Numeric count-up tween for statistics tiles
 */
export function countUp(
  targetEl: HTMLElement | null,
  endValue: number,
  options: CountUpOptions = {}
): gsap.core.Tween | null {
  if (!targetEl || typeof window === "undefined") return null;

  const {
    duration = 0.7,
    ease = "power1.out",
    decimals = 0,
    prefix = "",
    suffix = "",
    trigger,
    start = "top 80%",
  } = options;

  const reduced = isReducedMotion();

  if (reduced) {
    targetEl.textContent = `${prefix}${endValue.toFixed(decimals)}${suffix}`;
    return null;
  }

  const state = { val: 0 };

  const tween = gsap.to(state, {
    val: endValue,
    duration,
    ease,
    scrollTrigger: trigger
      ? {
          trigger,
          start,
          once: true,
        }
      : undefined,
    onUpdate: () => {
      if (targetEl) {
        targetEl.textContent = `${prefix}${state.val.toFixed(decimals)}${suffix}`;
      }
    },
  });

  return tween;
}

/**
 * Typewriter effect for terminal code strings
 */
export function typewriter(
  targetEl: HTMLElement | null,
  text: string,
  options: { duration?: number; trigger?: Element | string | null; start?: string } = {}
): gsap.core.Tween | null {
  if (!targetEl || typeof window === "undefined") return null;

  const { duration = 0.5, trigger, start = "top 80%" } = options;

  if (isReducedMotion()) {
    targetEl.textContent = text;
    return null;
  }

  const obj = { length: 0 };

  return gsap.to(obj, {
    length: text.length,
    duration,
    ease: "none",
    scrollTrigger: trigger
      ? {
          trigger,
          start,
          once: true,
        }
      : undefined,
    onUpdate: () => {
      targetEl.textContent = text.slice(0, Math.ceil(obj.length));
    },
  });
}

/**
 * Button hover bounce micro-interaction
 */
export function bindButtonBounce(
  element: HTMLElement | null,
  options: { enterScale?: number; leaveScale?: number; duration?: number } = {}
): () => void {
  if (!element || isReducedMotion()) return () => {};

  const { enterScale = 1.05, leaveScale = 1, duration = 0.2 } = options;

  const handleMouseEnter = () => {
    gsap.to(element, {
      scale: enterScale,
      duration,
      ease: "power1.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      scale: leaveScale,
      duration,
      ease: "power1.in",
      overwrite: "auto",
    });
  };

  const handleMouseDown = () => {
    gsap.to(element, {
      scale: 0.96,
      duration: 0.1,
      ease: "power1.out",
      overwrite: "auto",
    });
  };

  const handleMouseUp = () => {
    gsap.to(element, {
      scale: enterScale,
      duration: 0.15,
      ease: "power1.out",
      overwrite: "auto",
    });
  };

  element.addEventListener("mouseenter", handleMouseEnter);
  element.addEventListener("mouseleave", handleMouseLeave);
  element.addEventListener("mousedown", handleMouseDown);
  element.addEventListener("mouseup", handleMouseUp);

  return () => {
    element.removeEventListener("mouseenter", handleMouseEnter);
    element.removeEventListener("mouseleave", handleMouseLeave);
    element.removeEventListener("mousedown", handleMouseDown);
    element.removeEventListener("mouseup", handleMouseUp);
  };
}

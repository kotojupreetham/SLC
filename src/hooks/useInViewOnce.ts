"use client";

import { useState, useEffect, useRef, RefObject } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface UseInViewOnceOptions {
  threshold?: number | number[];
  rootMargin?: string;
}

export function useInViewOnce<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOnceOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.15, rootMargin = "0px 0px -40px 0px" } = options;
  const ref = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isInView, setIsInView] = useState<boolean>(false);

  useEffect(() => {
    // If user prefers reduced motion or window is unavailable, immediately reveal
    if (prefersReducedMotion) {
      setIsInView(true);
      return;
    }

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    // Check if already in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, prefersReducedMotion]);

  return [ref, isInView];
}

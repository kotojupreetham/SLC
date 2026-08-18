"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TelemetryParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  colorDark: string;
  colorLight: string;
  originalAlpha: number;
  alpha: number;
}

export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, rx: 0, ry: 0, active: false });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: TelemetryParticle[] = [];
    const particleCount = Math.min(
      45,
      Math.floor((window.innerWidth * window.innerHeight) / 32000)
    );

    // Color maps for Dark and Light themes
    const colorPairs = [
      { dark: "rgba(56, 189, 248, ", light: "rgba(37, 99, 235, " }, // Cyan / Blue
      { dark: "rgba(129, 140, 248, ", light: "rgba(124, 58, 237, " }, // Indigo / Violet
      { dark: "rgba(34, 197, 94, ", light: "rgba(22, 163, 74, " }, // Emerald / Green
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 1.8 + 1.2;
        const alpha = Math.random() * 0.35 + 0.15;
        const pair = colorPairs[Math.floor(Math.random() * colorPairs.length)];
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius,
          colorDark: pair.dark,
          colorLight: pair.light,
          originalAlpha: alpha,
          alpha,
        });
      }
    };

    const drawParticles = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isLightMode = document.documentElement.classList.contains("light");

      // Draw background base matching theme
      ctx.fillStyle = isLightMode ? "#f7f8fa" : "#030712";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw faint engineering grid
      ctx.strokeStyle = isLightMode ? "rgba(0, 0, 0, 0.025)" : "rgba(255, 255, 255, 0.012)";
      ctx.lineWidth = 1;
      const gridSize = 80;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Smooth mouse follow interpolation
      const mouse = mouseRef.current;
      mouse.rx += (mouse.x - mouse.rx) * 0.08;
      mouse.ry += (mouse.y - mouse.ry) * 0.08;

      // Draw soft ambient spotlight around cursor
      if (mouse.active) {
        const gradient = ctx.createRadialGradient(
          mouse.rx,
          mouse.ry,
          0,
          mouse.rx,
          mouse.ry,
          400
        );
        if (isLightMode) {
          gradient.addColorStop(0, "rgba(37, 99, 235, 0.035)");
          gradient.addColorStop(0.5, "rgba(124, 58, 237, 0.015)");
          gradient.addColorStop(1, "rgba(247, 248, 250, 0)");
        } else {
          gradient.addColorStop(0, "rgba(56, 189, 248, 0.04)");
          gradient.addColorStop(0.5, "rgba(129, 140, 248, 0.015)");
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        }
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Update and render particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce at boundaries
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Gentle cursor repulsion
        if (mouse.active) {
          const dx = p.x - mouse.rx;
          const dy = p.y - mouse.ry;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 180;

          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            p.x += (dx / dist) * force * 0.7;
            p.y += (dy / dist) * force * 0.7;
            p.alpha = Math.min(0.9, p.originalAlpha + force * 0.4);
          } else {
            p.alpha = p.originalAlpha;
          }
        }

        // Draw particle dot
        const particleColorPrefix = isLightMode ? p.colorLight : p.colorDark;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${particleColorPrefix}${p.alpha})`;
        ctx.fill();

        // Draw connecting constellation lines
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha =
              (1 - dist / 110) * 0.12 * Math.min(p.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isLightMode
              ? `rgba(37, 99, 235, ${lineAlpha})`
              : `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });
    };

    const animate = () => {
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none transition-colors duration-300"
    />
  );
}

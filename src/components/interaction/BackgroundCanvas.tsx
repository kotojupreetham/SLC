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
    let time = 0;
    const particleCount = Math.min(
      52,
      Math.floor((window.innerWidth * window.innerHeight) / 28000)
    );

    // Color maps: Cyan, Purple/Violet, Indigo, Emerald
    const colorPairs = [
      { dark: "rgba(56, 189, 248, ", light: "rgba(37, 99, 235, " }, // Cyan / Blue
      { dark: "rgba(168, 85, 247, ", light: "rgba(147, 51, 234, " }, // Purple / Violet (Signature)
      { dark: "rgba(129, 140, 248, ", light: "rgba(124, 58, 237, " }, // Indigo
      { dark: "rgba(34, 197, 94, ", light: "rgba(22, 163, 74, " }, // Emerald
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 2.0 + 1.2;
        const alpha = Math.random() * 0.4 + 0.2;
        const pair = colorPairs[Math.floor(Math.random() * colorPairs.length)];
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
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
      time += 0.008;

      const isLightMode = document.documentElement.classList.contains("light");

      // Draw background base matching theme
      ctx.fillStyle = isLightMode ? "#f7f8fa" : "#030712";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ★ AMBIENT BREATHING PURPLE & CYAN GLOW FIELDS (Atmospheric Depth)
      if (!isLightMode) {
        // Top-right purple ambient field (pulsing)
        const purplePulse = 0.055 + Math.sin(time) * 0.015;
        const purpleX = canvas.width * 0.75 + Math.sin(time * 0.5) * 40;
        const purpleY = canvas.height * 0.25 + Math.cos(time * 0.5) * 30;
        const purpleGlow = ctx.createRadialGradient(
          purpleX,
          purpleY,
          0,
          purpleX,
          purpleY,
          Math.min(canvas.width, 750)
        );
        purpleGlow.addColorStop(0, `rgba(168, 85, 247, ${purplePulse})`);
        purpleGlow.addColorStop(0.5, `rgba(129, 140, 248, ${purplePulse * 0.4})`);
        purpleGlow.addColorStop(1, "rgba(3, 7, 18, 0)");
        ctx.fillStyle = purpleGlow;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Bottom-left cyan ambient field
        const cyanPulse = 0.045 + Math.cos(time * 0.7) * 0.012;
        const cyanX = canvas.width * 0.2 + Math.cos(time * 0.4) * 30;
        const cyanY = canvas.height * 0.75 + Math.sin(time * 0.4) * 30;
        const cyanGlow = ctx.createRadialGradient(
          cyanX,
          cyanY,
          0,
          cyanX,
          cyanY,
          Math.min(canvas.width, 650)
        );
        cyanGlow.addColorStop(0, `rgba(56, 189, 248, ${cyanPulse})`);
        cyanGlow.addColorStop(0.6, `rgba(59, 130, 246, ${cyanPulse * 0.3})`);
        cyanGlow.addColorStop(1, "rgba(3, 7, 18, 0)");
        ctx.fillStyle = cyanGlow;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw faint engineering grid
      ctx.strokeStyle = isLightMode ? "rgba(0, 0, 0, 0.025)" : "rgba(255, 255, 255, 0.015)";
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

      // Subtle intersection dots at grid crossings
      if (!isLightMode) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.035)";
        for (let x = 0; x < canvas.width; x += gridSize) {
          for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.arc(x, y, 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Smooth mouse follow interpolation
      const mouse = mouseRef.current;
      mouse.rx += (mouse.x - mouse.rx) * 0.08;
      mouse.ry += (mouse.y - mouse.ry) * 0.08;

      // Draw dual-tone cursor spotlight gradient
      if (mouse.active) {
        const gradient = ctx.createRadialGradient(
          mouse.rx,
          mouse.ry,
          0,
          mouse.rx,
          mouse.ry,
          480
        );
        if (isLightMode) {
          gradient.addColorStop(0, "rgba(37, 99, 235, 0.04)");
          gradient.addColorStop(0.5, "rgba(124, 58, 237, 0.015)");
          gradient.addColorStop(1, "rgba(247, 248, 250, 0)");
        } else {
          gradient.addColorStop(0, "rgba(56, 189, 248, 0.055)");
          gradient.addColorStop(0.4, "rgba(168, 85, 247, 0.03)");
          gradient.addColorStop(0.7, "rgba(129, 140, 248, 0.012)");
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
          const maxDist = 200;

          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            p.x += (dx / dist) * force * 0.8;
            p.y += (dy / dist) * force * 0.8;
            p.alpha = Math.min(0.95, p.originalAlpha + force * 0.45);
          } else {
            p.alpha = p.originalAlpha;
          }
        }

        // Draw particle dot with subtle glow
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

          if (dist < 120) {
            const lineAlpha =
              (1 - dist / 120) * 0.18 * Math.min(p.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isLightMode
              ? `rgba(37, 99, 235, ${lineAlpha})`
              : `rgba(129, 140, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.9;
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

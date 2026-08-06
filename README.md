# ⚡ Smarter Release Engineering (SRE)

[![Next.js](https://img.shields.io/badge/Next.js-15.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-green?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)
[![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](LICENSE)

> An immersive, continuous interactive deployment pipeline experience built for **Smarter Release Engineering (SRE)**. Built with Next.js 15 App Router, GSAP ScrollTrigger, Tailwind CSS v4, and React 19.

---

## 🎯 Overview

**Smarter Release Engineering (SRE)** is a modern digital showcase engineered as a **live software delivery pipeline**. As users scroll, they experience an interactive, 8-stage DevOps lifecycle wheel that rotates continuously to present real-time telemetry, service capabilities, tech stack matrices, control room operational metrics, and interactive contact node engagement.

---

## ✨ Features

- 🌀 **Interactive DevOps Cycle**: GSAP ScrollTrigger 360° scrub animation pinning a continuous 8-stage DevOps wheel (`Plan`, `Code`, `Build`, `Test`, `Release`, `Deploy`, `Operate`, `Monitor`).
- 💡 **Mouse-Reactive Hero Spotlight**: Dynamic radial gradient spotlight tracking cursor coordinates against an infrastructure grid.
- 🎛️ **Engineering Control Console**: Interactive service module selection displaying detailed telemetry, operational benchmarks, and integrated tech tags.
- 🧩 **Interactive Tech Matrix**: 9 cloud-native tools across Orchestration, CI/CD, Observability, IaC, and Security with real-time inspector feedback.
- 📊 **Telemetry Control Room**: Real-time operational intelligence dashboard with dynamic animated progress bars and system status indicators.
- 💻 **Terminal Contact Node**: Unix terminal-styled contact form with macOS window controls, accessibility labels, and live transmission states.
- ♿ **Motion Accessibility**: Built-in support for `prefers-reduced-motion` to ensure an accessible experience for all users.
- ⚡ **Zero-CLS Font Loading**: Configured with Next.js `next/font` for Inter and JetBrains Mono.

---

## 🛠️ Technology Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router, Turbopack) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) (`@theme inline` CSS configuration) |
| **Animations** | [GSAP](https://greensock.com/gsap/) & `@gsap/react` (ScrollTrigger) |
| **Icons & UI** | [Lucide React](https://lucide.dev/), `clsx`, `tailwind-merge` |

---

## 📂 Repository Structure

```
src/
├── app/
│   ├── globals.css         # Design system tokens (@theme inline) & CSS animations
│   ├── layout.tsx          # Font optimization (Inter & JetBrains Mono) & metadata
│   └── page.tsx            # Master composited continuous scroll journey
├── components/
│   ├── atoms/              # Reusable primitives (StatusDot, MonoLabel, SectionHeader, GlowBadge)
│   ├── ContactNode.tsx     # Terminal-style contact form
│   ├── ControlRoom.tsx     # Telemetry dashboard
│   ├── DeploymentStories.tsx # Case studies
│   ├── EngineeringDashboard.tsx # Service capabilities console
│   ├── HeroSection.tsx     # Mouse-reactive hero
│   ├── InteractivePipeline.tsx # GSAP scroll-driven wheel centerpiece
│   ├── ProcessTimeline.tsx # Methodology steps
│   └── TechEcosystem.tsx   # Interactive tech stack matrix
├── data/                   # Structured content models & telemetry metrics
├── hooks/                  # Custom React hooks (useReducedMotion)
├── lib/                    # Helper utilities (clsx + tailwind-merge)
└── types/                  # TypeScript interface definitions
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18.17 or higher
- **npm** or **pnpm** / **yarn**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kotojupreetham/SLC.git
   cd SLC
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Production Build

To build the project for production:

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

---

## 🌐 Deployment Guide

### Deploying to Vercel (Recommended)

1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and click **New Project**.
3. Import your GitHub repository (`kotojupreetham/SLC`).
4. Keep standard Next.js build settings and click **Deploy**.
5. Your live URL will be generated automatically!

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.

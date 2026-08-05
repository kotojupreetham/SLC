# Smarter Release Engineering (SRE) — Enterprise Software Delivery Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)

> **An interactive, live deployment pipeline experience designed to showcase high-reliability release engineering, GitOps automation, zero-downtime deployments, and real-time telemetry control.**

---

## 🌟 Overview & Core Philosophy

**Smarter Release Engineering (SRE)** is an enterprise digital product that acts as a continuous delivery engine. Rather than a static marketing site, the application functions as a interactive deployment console—guiding developers, site reliability engineers, and engineering managers through the end-to-end software lifecycle.

### Key Highlights
- **Interactive DevOps Wheel**: 360° GSAP ScrollTrigger-driven 8-stage lifecycle wheel (Plan → Code → Build → Test → Release → Deploy → Operate → Monitor).
- **Engineering Control Console**: Real-time telemetry inspector for 6 specialized release engineering modules.
- **Technology Matrix**: Interactive ecosystem map showing 9 cloud-native tools across pipeline stages.
- **System Telemetry Control Room**: Live operational dashboard with animated metric indicators and cluster status monitor.
- **Unix Terminal Contact Node**: Interactive terminal-styled engagement node with secure transmission state.

---

## 🏗️ Tech Stack & Architecture

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) | High-performance React framework with SSR and Turbopack |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Strictly-typed end-to-end models and component props |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | `@theme` CSS token system with custom dark mode colors |
| **Animations** | [GSAP](https://greensock.com/) + `@gsap/react` | Scroll-scrubbed lifecycle wheel & hardware-accelerated transforms |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, consistent developer-focused system iconography |

---

## 📁 Project Structure

```
C:\PROJECT\SRE-WEBSITE\SRC
├── app/
│   ├── globals.css         # Tailwind v4 @theme design tokens & custom animations
│   ├── layout.tsx          # Font optimization (Inter & JetBrains Mono) & SEO metadata
│   └── page.tsx            # Master composited continuous scroll journey
├── components/
│   ├── atoms/              # Atomic primitives (StatusDot, MonoLabel, SectionHeader, GlowBadge)
│   ├── ContactNode.tsx     # Unix terminal-styled contact form
│   ├── ControlRoom.tsx     # Live system telemetry dashboard
│   ├── DeploymentStories.tsx # Production case studies
│   ├── EngineeringDashboard.tsx # Interactive service capabilities console
│   ├── HeroSection.tsx     # Mouse-reactive radial spotlight hero
│   ├── InteractivePipeline.tsx # GSAP pinned scroll lifecycle wheel
│   ├── ProcessTimeline.tsx # Reliability delivery methodology
│   └── TechEcosystem.tsx   # Interactive cloud architecture matrix
├── data/                   # Telemetry & pipeline data modules
│   ├── caseStudies.ts
│   ├── controlRoomMetrics.ts
│   ├── pipelineStages.ts
│   ├── processSteps.ts
│   ├── services.ts
│   ├── siteContent.ts
│   └── techNodes.ts
├── hooks/
│   └── useReducedMotion.ts # Motion accessibility media listener
├── lib/
│   └── cn.ts               # Class merging utility
└── types/
    └── pipeline.ts         # TypeScript schema definitions
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or 20+
- npm 9+ or pnpm / yarn

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kotojupreetham/SLC.git
   cd SLC
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

Verify type checking, linting, and build optimization:

```bash
npm run build
npm run start
```

---

## 🌐 Hosting & Deployment Guide

> **Q: Can this project run directly on GitHub, or do we need a separate host?**

### The Answer:
- **GitHub** stores the **source code** and manages version control.
- To **run/host the live website**, you use a cloud hosting platform connected to your GitHub repository.

### Recommended Hosting Options:

1. **[Vercel](https://vercel.com/) (Recommended — Free & 1-Click Setup)**
   - Vercel is created by the maintainers of Next.js.
   - Simply log in to Vercel with GitHub, select your `SLC` repository, and click **Deploy**.
   - Every time you push to the `main` branch, Vercel will automatically build and deploy your site with a free SSL domain (e.g. `https://slc.vercel.app`).

2. **[Netlify](https://netlify.com/) / [Cloudflare Pages](https://pages.cloudflare.com/)**
   - Connect your GitHub repo `kotojupreetham/SLC`.
   - Build command: `npm run build`
   - Output directory: `.next`

3. **GitHub Pages (Static Export)**
   - If you prefer GitHub Pages, add `output: 'export'` in `next.config.ts`.
   - Vercel is strongly recommended for seamless Next.js App Router support without limitations.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.

Developed with ❤️ by [Kotoju Preetham](https://github.com/kotojupreetham).

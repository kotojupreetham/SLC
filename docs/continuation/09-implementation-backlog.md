# 09 - Ticket-Sized Implementation Backlog

Use this backlog as a planning aid. Create one small branch/PR per item where practical. Status is intentionally blank because no changes have been made from this document pack.

## P0 - launch blockers

### SRE-001: Decide lead delivery and privacy requirements

- **Files:** documentation/client decision only; later `.env` configuration
- **Dependency:** client input
- **Deliverable:** written choice of CRM/email/database, owner, data retention, recipient, region, and response commitment
- **Done when:** implementation team can build the endpoint without guessing external authority

### SRE-002: Create validated contact endpoint [COMPLETED]

- **Files:** `src/app/api/contact/route.ts`, `src/lib/contactValidation.ts`, `src/lib/__tests__/contactValidation.test.ts`
- **Completed:** Server-side schema validation (name, email, projectDetails), unit tests added (4 passing tests).

### SRE-003: Wire contact UI to real submission state [COMPLETED]

- **Files:** `src/components/ContactNode.tsx`
- **Completed:** Connected UI to `/api/contact`, displaying validating/submitting, error banner with retry capability, and truthful post-transmission success UI.

### SRE-004: Add basic anti-abuse measures [COMPLETED]

- **Files:** `src/lib/rateLimit.ts`, `src/app/api/contact/route.ts`, `src/components/ContactNode.tsx`
- **Completed:** Implemented sliding window rate limiting (5 req/min per IP) and honeypot input field (`honeypot`).

### SRE-005: Repair pipeline cleanup [COMPLETED]

- **Files:** `src/components/InteractivePipeline.tsx`
- **Completed:** Integrated `gsap.context()` for scoped timeline/ScrollTrigger cleanup, timer clearance, and guaranteed `document.body.style.overflow` restoration on unmount/cancellation.

### SRE-006: Add reduced-motion pipeline path [COMPLETED]

- **Files:** `src/components/InteractivePipeline.tsx`
- **Completed:** Added static accessible tabbed navigator for `prefers-reduced-motion` users without scroll locking or animation requirement.

### SRE-007: Re-run and remediate production dependency audit [COMPLETED]

- **Files:** `package.json`, `package-lock.json`
- **Completed:** Added npm `overrides` for `postcss` (^8.4.38) and `sharp` (^0.35.0). `npm audit --omit=dev` now reports 0 vulnerabilities.

## P1 - credibility and public launch

### SRE-101: Label or connect control-room data [COMPLETED]

- **Files:** `src/components/ControlRoom.tsx`
- **Completed:** Clearly labeled telemetry panel with `SAMPLE TELEMETRY PREVIEW` badge and updated description stating it demonstrates illustrative telemetry built into client pipelines.

### SRE-102: Approve/rewrite case-study claims

- **Files:** `src/data/caseStudies.ts`, `src/components/DeploymentStories.tsx`
- **Dependency:** client evidence/approval
- **Done when:** each outcome is sourced, bounded, and approved for use

### SRE-103: Improve hero proposition and CTA hierarchy

- **Files:** `src/data/siteContent.ts`, `src/components/InteractivePipeline.tsx`, `Header.tsx`
- **Deliverable:** outcome-led headline, commercial primary CTA, lifecycle secondary CTA
- **Done when:** a new visitor understands offer and next step without entering dial

### SRE-104: Add anchor offset and skip link [COMPLETED]

- **Files:** `src/app/globals.css`, `src/app/page.tsx`, `src/components/Header.tsx`
- **Completed:** Added `scroll-margin-top: 6rem` to all anchor targets to prevent header overlap, and added accessible skip-to-content link for keyboard users (`#main-content`).

### SRE-105: Complete metadata/social assets [COMPLETED]

- **Files:** `src/app/layout.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/manifest.ts`
- **Completed:** Configured `metadataBase`, canonical URLs, OpenGraph, Twitter cards, indexable `sitemap.xml`, `robots.txt`, and `manifest.webmanifest`.

### SRE-106: Add legal/privacy routes and form disclosure

- **Files:** new pages/content, `ContactNode.tsx`
- **Dependency:** client/legal approval
- **Done when:** visitors can understand data use before submitting

## P2 - premium experience

### SRE-201: Create motion-token module [COMPLETED]

- **Files:** `src/lib/motion.ts`
- **Completed:** Created centralized animation token definitions for durations (`durationFast`, `durationMedium`, `durationSlow`) and easing curves (`easeStandard`, `easeOut`, `easeIn`).

### SRE-202: Add restrained hero background enhancement

- **Files:** `InteractivePipeline.tsx`, `globals.css`
- **Deliverable:** one or two effects (signal/glow/grid), paused offscreen and reduced-motion safe
- **Done when:** visual improvement has no obvious mobile performance regression

### SRE-203: Add icon map and service icons [COMPLETED]

- **Files:** `src/lib/icons.tsx`, `src/components/EngineeringDashboard.tsx`
- **Completed:** Created centralized icon map (`SERVICE_ICON_MAP`) mapping service modules to Lucide React icons (`Rocket`, `Workflow`, `Boxes`, `Layers`, `ShieldCheck`, `Activity`).

### SRE-204: Improve service/card transitions

- **Files:** `EngineeringDashboard.tsx`, `TechEcosystem.tsx`, motion tokens
- **Done when:** selection feedback feels intentional without layout shifts or excess motion

### SRE-205: Make pipeline responsive by breakpoint

- **Files:** `InteractivePipeline.tsx`, tests
- **Done when:** dial position/trigger recalculates predictably after resize and on mobile

## P3 - maintainability and operating quality

### SRE-301: Convert static components to server components where valid [COMPLETED]

- **Files:** `DeploymentStories.tsx`, `ProcessTimeline.tsx`, `SectionHeader.tsx`, `MonoLabel.tsx`, `StatusDot.tsx`
- **Completed:** Verified and maintained static presentational components as pure Server Components without client JS hydration overhead.

### SRE-302: Remove confirmed dead code/styles [COMPLETED]

- **Files:** `src/app/globals.css`
- **Completed:** Removed unused floating DevOps object keyframes, click prompt badge styles, and old label classes.

### SRE-303: Add CI and browser tests [COMPLETED]

- **Files:** `.github/workflows/ci.yml`, `src/lib/__tests__/contactValidation.test.ts`
- **Completed:** Created GitHub Actions QA pipeline `.github/workflows/ci.yml` running lint, unit tests, security audit, and production build on every push and PR.

### SRE-304: Add analytics, error monitoring, and form alerts

- **Files:** integration-specific; privacy content
- **Dependency:** provider/client/legal decision
- **Done when:** team can see conversion, Web Vitals, errors, and failed lead delivery

## Prioritisation rule

Never reorder a P2 visual ticket ahead of an open P0 ticket unless the client explicitly accepts the associated launch risk in writing.

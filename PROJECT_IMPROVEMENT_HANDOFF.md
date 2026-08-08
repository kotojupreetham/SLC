# SRE Website: Improvement Handoff and Continuation Guide

> **For the next developer or AI agent:** Read this file before editing the project. It records the product intent, current architecture, known issues, recommended changes, affected files, and verification criteria. Do not assume that a visual feature is complete merely because the production build succeeds.

## 1. Project snapshot

**Project:** Smarter Release Engineering (SRE) marketing/lead-generation website  
**Repository root:** `C:\Project\sre-website`  
**Current stack:** Next.js 15 App Router, React 19, TypeScript (strict), Tailwind CSS v4, GSAP/ScrollTrigger, Lucide React.  
**Current product state:** polished visual prototype; **not yet ready for public lead generation**.

### Product intent

The site should position SRE as a premium engineering consultancy that helps organisations improve release reliability, CI/CD, platform engineering, DevSecOps, and observability. It should feel technically sophisticated, but it must remain credible, fast, accessible, and easy to contact.

### Current architecture

```text
src/app/
  layout.tsx                Global fonts and metadata
  page.tsx                  Single-page composition
  globals.css               Design tokens and global visual effects
src/components/
  InteractivePipeline.tsx   GSAP lifecycle dial and hero (highest risk)
  ContactNode.tsx           Terminal-styled contact form (currently fake)
  Header.tsx                Fixed navigation
  EngineeringDashboard.tsx  Selectable service modules
  TechEcosystem.tsx         Selectable technology matrix
  ControlRoom.tsx           Static telemetry presentation
  DeploymentStories.tsx     Static case studies
  ProcessTimeline.tsx       Static methodology
  atoms/                    Small shared visual components
src/data/                   Typed static content
src/hooks/useReducedMotion.ts
```

### Current build status

- `npm.cmd run lint` passes.
- `npm.cmd run build` passes.
- Home page is statically generated.
- Build report at last review: homepage 65.5 kB page JavaScript, 168 kB first-load JavaScript.
- `npm audit --omit=dev` reported **three high-severity dependency findings** through the installed Next.js dependency path (Next.js / PostCSS / Sharp). Re-run audit before changing versions because advisory data changes over time.

## 2. Rules for future work

1. **Do not implement visual polish before the critical launch fixes are completed.** A beautiful site that drops leads or traps scrolling is not launch-ready.
2. **Preserve the dark control-room design direction.** The lifecycle dial is the signature visual; refine it rather than replacing it unless the client requests a new identity.
3. **Never describe mock metrics as live.** All telemetry and case-study outcomes need evidence or clear labels such as "Illustrative example".
4. **Use honest confirmation messages.** Do not display "transmission received" until data has actually been delivered and saved.
5. **Every new motion effect must support `prefers-reduced-motion`, keyboard navigation, and mobile performance.**
6. **Do not run destructive Git commands.** Preserve any user changes already present in the working tree.
7. After code changes, run `npm.cmd run lint` and `npm.cmd run build`. Add or update tests when a flow changes.

## 3. Priority 0: launch blockers

Complete these before public traffic or any paid campaign.

### P0-1 — Build a real contact/lead flow

**Status:** Not implemented.  
**Affected file:** `src/components/ContactNode.tsx`  
**Current issue:** The form only calls `setSubmitted(true)`. It does not send, store, or email the data.

#### Required changes

- Add a server-side submission endpoint. Prefer one of:
  - Next.js Server Action in a dedicated `src/app/actions/contact.ts` module, or
  - `src/app/api/contact/route.ts` route handler.
- Validate inputs on the server using a schema validator (for example, Zod):
  - name: required, sensible maximum length
  - email: required, valid email, sensible maximum length
  - project details: required, sensible maximum length
- Integrate a real delivery destination selected by the client:
  - CRM (HubSpot, Airtable, etc.), or
  - transactional email provider, and/or
  - authenticated database.
- Add anti-abuse controls: honeypot field, server-side rate limit, and CAPTCHA/bot detection if abuse becomes likely.
- Add client states: idle, validating, submitting, success, and retryable failure.
- Add a privacy-consent checkbox/link if form details are retained or sent to third parties.
- Change the success copy to be factual. Only promise "within 24 hours" if an owner and operating process support that promise.

#### Acceptance checks

- A valid submission reaches the configured CRM/email destination exactly once.
- Invalid/malicious input is rejected server-side.
- Network failure shows an error and retains input so the user can retry.
- Submit button cannot duplicate-submit while processing.
- No form data or provider secret is exposed in browser JavaScript.

### P0-2 — Repair the reduced-motion experience

**Affected files:**

- `src/components/InteractivePipeline.tsx`
- `src/hooks/useReducedMotion.ts`
- `src/app/globals.css`

**Current issue:** `handleActivate` sets `isActivated` to true, but the animation effect immediately returns when `prefersReducedMotion` is true. The main "Explore Pipelines" CTA therefore appears not to work for reduced-motion users.

#### Required changes

- Define a non-motion path. Recommended design:
  - Render eight clickable/keyboard-accessible stage tabs or stepper controls.
  - Present the same stage title, description, and metrics without scroll pinning or rotation.
  - Use instant or very short opacity changes only.
- Keep the content visible and useful before and after activation.
- Ensure the reduced-motion path works whether the visitor enters by hero CTA, header anchor, or direct URL anchor.

#### Acceptance checks

- With browser/OS reduced motion enabled, the CTA opens usable pipeline content.
- All eight stages can be navigated with Tab, Shift+Tab, Enter, and Space.
- No automatic scroll lock, scrub animation, or continuous pulse is required to understand the content.

### P0-3 — Eliminate scroll-lock and GSAP cleanup hazards

**Affected file:** `src/components/InteractivePipeline.tsx`

**Current issue:** The component sets `document.body.style.overflow = "hidden"` during activation. Its effect cleanup clears a timer but does not always restore the previous `overflow` value. If the component unmounts or the animation is interrupted before the timer completes, the page can remain unscrollable.

#### Required changes

- Store the original body overflow value before changing it.
- Restore it in every cleanup path, including component unmount and effect re-run.
- Store and cancel the activation timer used by `handleActivate`; do not leave timers running after unmount.
- Use `gsap.context()` or `useGSAP()` to scope all tweens/timelines and revert them during cleanup.
- Kill/revert the complete GSAP timeline, not only its `ScrollTrigger` reference.
- Consider avoiding hard scroll lock entirely; temporary pointer disabling or a short non-blocking transition is usually safer.

#### Acceptance checks

- Navigate away during expansion; scrolling remains available on the next page.
- Toggle reduced-motion or resize during activation; scrolling still works.
- Activate multiple times and return to the top; no duplicate triggers or competing tweens remain.
- React Strict Mode does not create duplicate GSAP effects in development.

### P0-4 — Fix known dependency security findings

**Affected files:** `package.json`, `package-lock.json`  
**Current issue:** The latest audit at review time reported three high-severity findings related to the current Next.js dependency path.

#### Required changes

- Run `npm.cmd audit --omit=dev` again.
- Review the exact advisories and Next.js release notes before upgrading.
- Upgrade Next.js (and lockfile) on a dedicated branch; use the smallest safe version change if possible.
- Run lint, build, and visual/browser smoke tests after upgrade.
- Add a CI dependency-audit job or Dependabot/Renovate configuration.

#### Acceptance checks

- Audit returns no unresolved high or critical production vulnerability, or any exception is documented with a mitigation and expiry date.
- The full site builds and interactions remain correct after upgrading.

## 4. Priority 1: credibility, conversion, and launch fundamentals

### P1-1 — Make all public claims defensible

**Affected files:**

- `src/data/controlRoomMetrics.ts`
- `src/data/caseStudies.ts`
- `src/data/services.ts`
- `src/components/ControlRoom.tsx`
- `src/components/ContactNode.tsx`

#### Current concerns

- The dashboard calls static values "real-time operational intelligence".
- The contact card labels its flow "secure transmission" without an implementation.
- Case-study metrics and client categories need client approval/evidence.

#### Required changes

- Decide whether the control room is demo data or live data:
  - If demo: visibly label it "Illustrative delivery telemetry" or "Sample operating dashboard".
  - If live: define a secure data source, refresh strategy, access controls, and failure state.
- Require an approved source/owner for every case study and metric.
- Only cite compliance standards or security practices that SRE can support.
- Replace generic claims with specific, defensible outcomes where possible.

### P1-2 — Improve first-screen conversion clarity

**Affected files:**

- `src/components/InteractivePipeline.tsx`
- `src/data/siteContent.ts`
- `src/components/Header.tsx`

#### Recommended copy direction

- Main outcome-focused headline: "Ship faster without creating release risk." (Use only as a starting draft.)
- Supporting line: "SRE designs the delivery systems, guardrails, and observability that make reliable releases repeatable."
- Primary CTA: "Book a delivery assessment" or "Start a release reliability assessment".
- Secondary CTA: "Explore the lifecycle".

#### Required UX changes

- Make commercial value clearer than the visual experience in the first ten seconds.
- Add a concise proof strip below the CTA (for example: GitOps, progressive delivery, observability) only if accurate.
- Ensure direct navigation to `#services` and `#contact` does not land content under the fixed header. Add CSS `scroll-margin-top` to anchor targets.

### P1-3 — Add website publishing fundamentals

**Likely new/affected files:**

- `src/app/layout.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/app/opengraph-image.tsx` or static public social image
- `public/` assets
- client-approved privacy/terms content or routes

#### Required changes

- Add canonical site URL, Open Graph URL, site name, social sharing image, and metadata base.
- Add `robots.ts` and `sitemap.ts`.
- Replace default Next.js/Vercel public SVG placeholders with branded assets or remove them.
- Add a real favicon/app icon set.
- Add privacy policy, terms, company identity/contact details, and cookie/analytics consent where legally applicable.
- Add an accessible skip-to-content link.

## 5. Priority 2: premium visual and interaction upgrades

These ideas are optional enhancements. Implement only after P0 and P1 are complete, and only when they support clarity or perceived quality.

### P2-1 — Background animation system

**Primary files:** `src/app/globals.css`, `src/components/InteractivePipeline.tsx`  
**Goal:** make the site feel alive without making it feel noisy or slow.

#### Recommended upgrades

| Enhancement | What it should do | Implementation note |
|---|---|---|
| Infrastructure grid | Keep the existing grid, with slight low-opacity gradient drift | Animate transform/opacity only; never continuously animate multiple expensive properties |
| Ambient glows | Use 2 subtle radial glows per key scene | Reduce blur and disable movement on mobile/reduced motion |
| Data particle field | 12-20 sparse particles/connection lines in hero only | Prefer one canvas/SVG layer; pause when offscreen |
| Deployment signal | A thin line travels when a card or stage is selected | Trigger on interaction, not on an endless loop |
| Grain texture | Very low-opacity visual texture | Use a compact static/repeating asset at 2-4% opacity |

#### Guardrails

- Do not add dozens of absolutely positioned DOM nodes that continuously animate.
- Do not put large moving blurred objects behind every section.
- Pause canvas/GSAP work when the page is hidden or the component is off-screen.
- Test on a mid-range Android device, not only a desktop computer.

### P2-2 — Transition and micro-interaction system

**Affected files:** most interactive components; possibly create `src/lib/motion.ts` for shared timing constants.

#### Motion tokens

| Use case | Duration | Guidance |
|---|---:|---|
| Hover/focus feedback | 160-220 ms | subtle opacity, border, or 1-2 px translate only |
| Panel selection | 300-450 ms | crossfade/small translate; preserve content readability |
| Major scene transition | 700-1,000 ms | reserve for the lifecycle dial entry only |
| Scroll scrub | direct | use only for the signature dial; offer skip and reduced-motion alternative |

#### Recommended improvements

- Add an active header-navigation indicator using `IntersectionObserver`.
- Add an accent-line transition from selected service/technology card to the detail panel.
- Crossfade metric values and supporting text rather than scaling all panels.
- Add a clearly visible selected state for all cards, with more than color as the indicator.
- Add short stage-number transitions on the pipeline dial.
- Do not use animation merely to fill empty space.

### P2-3 — Icon system

**Affected files:** `src/components/EngineeringDashboard.tsx`, `src/components/TechEcosystem.tsx`, possibly data files to store the icon key.

Lucide React is already installed. Use one simple outlined icon per service/category; do not turn every label into an icon.

| Area | Suitable Lucide icons | Where to use |
|---|---|---|
| Release engineering | `Rocket`, `GitBranch`, `Repeat2` | service cards and lifecycle labels |
| Platform/infrastructure | `Boxes`, `CloudCog`, `Network` | platform engineering modules |
| Security | `ShieldCheck`, `KeyRound`, `ScanSearch` | DevSecOps proof points |
| Observability | `Activity`, `ChartNoAxesCombined`, `Radar` | control room and metrics |
| Engagement | `CalendarCheck`, `MessageSquare`, `ArrowRight` | contact conversion path |

Implementation choice: create an `iconMap` in a dedicated file such as `src/lib/icons.tsx`, then map stable service IDs to icons. Do not store React components in JSON/CMS data.

### P2-4 — Hero and pipeline improvements

**Affected file:** `src/components/InteractivePipeline.tsx`

- Keep the lifecycle dial, but shorten the 4,800 px scroll commitment or allow visitors to skip it.
- Add explicit `Previous stage`, `Next stage`, and `Skip lifecycle` controls.
- Make the wheel itself keyboard-accessible or remove its click handler and rely on the real CTA button.
- Use `ScrollTrigger.matchMedia()` or a resize-aware strategy for mobile/desktop positioning instead of calculating `window.innerWidth` only at activation.
- Treat the dial as a consulting explanation: each stage should show **Input**, **Control**, and **Result**, not only decorative metrics.
- Use `aria-live="polite"` sparingly for changing stage text only if it does not become noisy for screen-reader users.

### P2-5 — Services, matrix, case studies, and proof

**Affected files:** `EngineeringDashboard.tsx`, `TechEcosystem.tsx`, `DeploymentStories.tsx`, their `src/data/*` sources.

- Add a concise "Best for" line to each service module.
- Group services around client outcomes: ship faster, reduce risk, scale platforms, improve visibility.
- Turn technology nodes into small architecture stories: problem, role, outcome.
- Expand case studies with context, duration, intervention, result, attribution/anonymization rationale, and approved evidence.
- Add diagrams, scorecards, or before/after charts only with verified information.
- A real testimonial with name, role, company, and permission is more valuable than a generic testimonial carousel.

## 6. Performance and maintainability improvements

### Client component boundaries

**Current observation:** Most sections are client components, even when they display static content.

#### Recommended changes

- Keep these client-side: `InteractivePipeline`, contact form behavior, selected-service state, selected-technology state, animated metrics.
- Convert static/presentational components to server components where no browser state is required: `DeploymentStories`, `ProcessTimeline`, `SectionHeader`, `MonoLabel`, `StatusDot`, and possibly portions of the control room.
- Avoid pulling GSAP into unrelated client bundles.

### Code cleanup

**Known candidate:** `src/components/HeroSection.tsx` appears unused because `page.tsx` uses `InteractivePipeline` as the hero.  
**Known candidate:** `src/app/globals.css` contains styles for removed floating DevOps objects and other unused classes.

#### Required changes

- Confirm references with `rg` before deleting any files/classes.
- Remove unused components and CSS once confirmed.
- Keep design tokens centralized in `globals.css`; avoid reintroducing unstructured hex-color duplication in every component.
- Consider a `src/lib/motion.ts` for shared animation durations/easings and a `src/lib/icons.tsx` for the icon map.

### Quality automation to add

**Likely new files:** `.github/workflows/ci.yml`, test configuration, Playwright config/tests.

- CI steps: install, lint, type check, production build, dependency audit, and tests.
- Unit tests for form validation and static data contracts.
- Browser smoke tests for:
  - desktop hero CTA and skip path
  - reduced-motion pipeline path
  - keyboard navigation
  - mobile navigation menu
  - valid and failed contact submissions
- Lighthouse/Core Web Vitals checks or a performance budget.
- Error monitoring and form-delivery alerts after launch.

## 7. Suggested implementation order

Work in small, independently testable changes.

1. **Branch and safety review:** check `git status`, read this file, confirm the chosen lead destination and whether metrics are demo or live.
2. **Form workflow:** build server validation + delivery + visible success/failure states; test it end-to-end.
3. **Pipeline reliability:** repair cleanup, remove scroll traps, and build the reduced-motion fallback.
4. **Truth and publishing:** correct claims, approve case studies, add privacy/legal/SEO/social assets.
5. **Quality gates:** add CI and browser tests for all critical flows.
6. **Conversion refinement:** improve hero proposition, CTA hierarchy, proof, and contact alternatives.
7. **Premium polish:** introduce background, transitions, icons, and responsive pipeline improvements one feature at a time.
8. **Measure and iterate:** use analytics, web-vitals data, and form reports to decide which enhancements earn their cost.

## 8. Commands for a future agent

PowerShell uses an execution policy that can block `npm`. Use `npm.cmd` in this project.

```powershell
# Inspect the current worktree first
git status --short

# Verify code quality
npm.cmd run lint
npm.cmd run build

# Check current production dependency advisories (may require internet access)
npm.cmd audit --omit=dev

# Find use of a component/class before removal
rg -n "HeroSection|floating-devops-obj|click-prompt-badge" src
```

## 9. Completion checklist

### Public-launch readiness

- [ ] Working server-side contact submission and delivery confirmed
- [ ] Server-side validation, rate limiting, and error state implemented
- [ ] Privacy disclosure/consent and legal content approved
- [ ] Reduced-motion experience works without animation
- [ ] No GSAP/scroll lock state can trap the user
- [ ] Keyboard and mobile paths tested
- [ ] All claims and case-study metrics approved/verified
- [ ] Security audit has no unaddressed high/critical production issue
- [ ] Metadata, social image, sitemap, robots, favicon, canonical URL added
- [ ] Lint and production build pass

### Premium-experience readiness

- [ ] Motion tokens documented and used consistently
- [ ] Each animation has a product/communication purpose
- [ ] Background motion pauses off-screen and respects reduced motion
- [ ] Icons follow one consistent size/stroke/color system
- [ ] Interactive pipeline is optional, keyboard-accessible, and responsive
- [ ] Client bundle impact and mobile performance are measured
- [ ] Browser regression tests cover main conversion and accessibility paths

## 10. Existing client roadmap document

The more presentation-ready document is available at:

`outputs/SRE_Website_Production_and_Premium_Experience_Roadmap.docx`

Use this Markdown file as the technical continuation source of truth. Use the Word document when presenting the plan to a client or stakeholder.

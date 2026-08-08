# 06 - Performance, Rendering, and Architecture Plan

## Current baseline

The site builds successfully and is statically generated. That is a good starting point. The primary performance risk is not server data fetching; it is client-side animation and the fact that much of the one-page experience is client-rendered.

## Objectives

- Preserve the premium visual identity.
- Ship the least client JavaScript needed for each interaction.
- Make the initial page understandable and usable before heavy motion completes.
- Keep animations smooth on ordinary laptops and mid-range mobile devices.
- Measure real user performance after launch instead of relying only on local impressions.

## Client/server component review

### Keep as client components

These need browser state, events, or animations:

- `InteractivePipeline.tsx`
- `ContactNode.tsx`
- `EngineeringDashboard.tsx` (unless selection is redesigned as pure links/details)
- `TechEcosystem.tsx` (unless selection is redesigned as pure links/details)
- animated portion of `ControlRoom.tsx`
- `Header.tsx` mobile-menu behavior

### Candidate server components

These are currently presentational and should not need hydration:

- `DeploymentStories.tsx`
- `ProcessTimeline.tsx`
- `SectionHeader.tsx`
- `MonoLabel.tsx`
- `StatusDot.tsx`
- static page/layout portions

Do not convert simply for style purity. Inspect component imports/props and confirm the client boundary remains correct. The aim is to keep GSAP and stateful logic from pulling unrelated content into the browser bundle.

## Animation performance plan

### Pipeline dial

- Scope GSAP work with `useGSAP`/`gsap.context` for correct cleanup.
- Maintain one primary timeline, not a growing collection of unmanaged tweens.
- Change React stage state only at stage boundaries, not every progress tick.
- Use `transform` and `opacity` wherever possible.
- Limit expensive SVG filter effects and large blurred layers on mobile.
- Rebuild/recalculate responsive triggers on meaningful breakpoints.
- Pause/disable nonessential motion for reduced-motion preferences and when off-screen.

### Background effects

- Use CSS/SVG/canvas layers sparingly.
- Avoid continuous layout-affecting properties such as `top`, `left`, `width`, `height`, or heavy animated `filter` values.
- Prefer one composed layer over many independently animated DOM elements.
- Use a `prefers-reduced-motion` fallback that is visually complete.

## Rendering and route recommendations

### Current site

The home page is static and should stay static as long as content is local/static. Static delivery is appropriate for a marketing site.

### Future dynamic content

If CMS content, customer stories, or live telemetry are introduced:

- fetch directly in Server Components where practical;
- avoid calling a Route Handler from a Server Component only to call another backend;
- cache content intentionally;
- use separate dynamic routes or isolated dynamic components where necessary;
- define stale/failure behavior before attaching a live data source.

### Images and fonts

- Current project has no meaningful marketing imagery. When imagery is introduced, use `next/image` for content images and provide accurate `sizes`, width/height, and alt text.
- Use `priority` only for true above-the-fold LCP images.
- Keep `next/font` for self-hosted optimized font delivery. Do not describe any font strategy as "zero CLS" without measuring the final experience.

## Performance budget to adopt

Initial targets; tune after measuring client audience and assets.

| Metric | Target | Response if exceeded |
|---|---|---|
| LCP | Good at 75th percentile field data | reduce hero work/assets; prioritise LCP content |
| INP | Good at 75th percentile field data | reduce handler work; limit animation/state updates |
| CLS | Good at 75th percentile field data | reserve asset space; audit font/image/layout shifts |
| Initial client JS | no unexplained increase from current baseline | inspect client boundaries and dependency additions |
| Main-thread long tasks | minimal on hero entry | defer/lazy-load noncritical motion/integrations |
| Mobile FPS during interaction | visually smooth on tested device | simplify dial and blur/filter work |

Use field data for decisions after launch. Lighthouse is helpful as a diagnostic but does not replace real-user measures.

## Bundle analysis workflow

Before adding a large package, or if the initial bundle grows materially:

1. Record the existing `next build` route sizes.
2. Add the change in a focused branch.
3. Build and compare route sizes.
4. Use the Next.js bundle-analysis path appropriate to the active version/bundler.
5. Identify whether the package is only required after an interaction; dynamically import it if that preserves UX.
6. Reject dependencies that duplicate a small utility or add more than their value justifies.

## Code-health cleanup candidates

Confirm with `rg` before removal.

- `src/components/HeroSection.tsx` appears unused because `InteractivePipeline` is the live hero.
- `src/app/globals.css` contains old styles for floating DevOps objects and old prompt/label classes that may no longer be used.
- Repeated color/timing values should become design/motion tokens only if doing so improves consistency; do not create abstraction for a one-off use.

## Monitoring after launch

- Capture Core Web Vitals using an approved analytics setup or Next.js reporting hook.
- Add client error monitoring only after confirming privacy and source-map policies.
- Alert on contact endpoint errors and provider delivery failures.
- Review form conversion, CTA engagement, and mobile performance monthly during the first quarter.

## Sources

- Next.js production checklist: https://nextjs.org/docs/app/guides/production-checklist
- Next.js analytics guidance: https://nextjs.org/docs/app/guides/analytics
- Next.js package bundling guidance: https://nextjs.org/docs/pages/guides/package-bundling
- Core Web Vitals background: https://web.dev/articles/defining-core-web-vitals-thresholds

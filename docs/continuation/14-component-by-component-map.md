# 14 - Component-by-Component Improvement Map

## `src/app/page.tsx`

### Current role

Composes the fixed header, pipeline hero, services, matrix, stories, process, control room, contact, and footer into one static page.

### Improvements

- Add a skip-to-content target near the start of main content.
- Give all anchorable sections a shared class or wrapper that applies `scroll-margin-top` for the fixed header.
- Consider semantic landmarks/labels if a screen-reader landmark audit finds ambiguity.
- Keep static sections server-rendered as components are refactored.
- When legal pages/resources are added, add footer navigation links rather than burying them in the form only.

### Do not do

- Do not turn the full page into a client component just to manage a small interaction.
- Do not add a global scroll listener here for visual navigation.

## `src/app/layout.tsx`

### Current role

Loads Inter and JetBrains Mono with `next/font`, sets dark mode, and defines basic metadata.

### Improvements

- Add `metadataBase` once the real domain is known.
- Expand Open Graph and Twitter/social metadata.
- Add approved icons/manifest references via file conventions.
- Add site name, canonical URL, and organisation details only when verified.
- Consider a global error UI route separately; do not hide failures behind empty screens.

### Do not do

- Do not set a guessed canonical domain or marketing claim.
- Do not add analytics scripts without consent/legal decision and performance review.

## `src/app/globals.css`

### Current role

Defines Tailwind import, dark palette variables, base styles, custom scrollbar, ambient orbs, old floating object styles, glass treatment, gradients, and global reduced-motion overrides.

### Improvements

- Remove confirmed unused classes after checking references.
- Add `scroll-margin-top` helper for anchored sections.
- Add an explicit visible focus token/rule that remains clear on all dark backgrounds.
- Add design tokens for shared borders, surface levels, muted text, and motion durations if the codebase starts repeating them.
- Refine reduced-motion CSS so it supports the JavaScript alternate experience instead of masking a broken interaction.
- Keep background effects scoped to sections rather than global if performance testing finds large paint cost.

### Visual ideas that fit this file

- static grain overlay variable;
- gentle grid gradient layer;
- restrained reusable selected-state glow;
- shared focus-visible ring;
- shared low-motion transition class.

## `src/components/Header.tsx`

### Current role

Fixed navigation, branding, CTA, and mobile menu.

### Improvements

- Use an active-section indicator powered by `IntersectionObserver`.
- Close mobile menu on Escape and restore focus to trigger.
- Consider whether menu overlay needs focus trapping; if it behaves as a modal, use an accessible dialog pattern. If not, keep it a simple disclosed nav panel.
- Give brand link a direct `href="#pipeline"` or `href="/"` based on desired behavior rather than a bare `#`.
- Ensure header does not falsely imply a live service/system status.
- Add a skip link outside/above the repeated navigation region.

## `src/components/InteractivePipeline.tsx`

### Current role

Owns hero content and the GSAP lifecycle dial.

### Improvements by impact

1. Repair body-overflow and timer cleanup.
2. Scope GSAP with `useGSAP` or `gsap.context`.
3. Build reduced-motion static stage navigator.
4. Add real previous/next/skip controls.
5. Refactor stage selection into one reusable state transition function.
6. Use breakpoint-aware trigger creation/rebuild.
7. Reduce dial scroll distance if testing shows visitors abandon it.
8. Ensure a keyboard-visible control, rather than clickable wheel container, owns activation.
9. Add only restrained decorative improvements after reliability is proven.

### Premium feature candidates

- selected-stage signal line;
- stage-specific accent tint on content panel;
- one short entry animation, not multiple delay chains;
- tiny stage progress rail under stage title;
- Input / Control / Result explanation cards.

## `src/components/EngineeringDashboard.tsx`

### Current role

Lets visitor select one of six service modules and view metrics/tags.

### Improvements

- Add icon map keyed to stable service ID.
- Add "Best for" and "Typical outcome" data fields.
- Make selected service explicit for assistive technology (`aria-pressed` or tab semantics if appropriate).
- Crossfade detail content using simple opacity/translate; do not animate layout height excessively.
- Add link/CTA per service only after relevant landing pages or contact prefill paths exist.
- Confirm every numerical claim can be supported or rewrite as qualitative capability.

## `src/components/TechEcosystem.tsx`

### Current role

Displays a selectable grid of technology nodes and inspector panel.

### Improvements

- Add category icons and a small legend.
- Add `problem`, `role`, `outcome` data rather than only a role paragraph.
- Mark selected node semantically; ensure keyboard navigation is deliberate.
- Add a visual connection line only if it does not complicate responsive layout.
- Avoid external product logos unless client has correct trademark/brand-use approval.

## `src/components/ControlRoom.tsx`

### Current role

Presents hardcoded health/metric cards with animated progress bars.

### Improvements

- Choose and label sample vs. live data honestly.
- If sample, use wording such as "Typical delivery signals we help teams monitor." 
- Do not animate bars solely on mount if repeated entering/leaving causes unnecessary work.
- If live data is introduced, create loading/error/freshness states and a data contract; never hard-code silent fallback as live.
- Add a timestamp/"sample data" label only when it is accurate.

## `src/components/DeploymentStories.tsx`

### Current role

Renders two static case-study cards.

### Improvements

- Add fields for client context, project duration, scope, proof source, and approval status in internal content workflow.
- Consider a "before / after" metric pair with a clear period.
- Add one approved testimonial quote per story only when authentic.
- Add a simple architecture or flow diagram, not stock photo, if source material exists.
- Never use anonymous high-precision claims without context.

## `src/components/ProcessTimeline.tsx`

### Current role

Renders six simple methodology cards.

### Improvements

- Use a connector line only on desktop if it improves sequence clarity.
- Add client participation at each stage: "Your team provides / SRE provides / resulting artifact." 
- Consider turning steps into an engagement timeline with estimated ranges only if client has a real delivery model.

## `src/components/ContactNode.tsx`

### Current role

Shows a terminal-styled form and a local fake success state.

### Improvements

- See `02-contact-and-conversion.md` for full design.
- Make it a functional, honest lead path before any extra visual treatment.
- Add loading/error states with live but concise status messaging.
- Set field `autoComplete` attributes where appropriate (`name`, `email`, `organization` if split).
- Do not collect sensitive infrastructure details at first contact.

## `src/components/atoms/*`

### Current role

Shared small visual primitives: labels, status dot, section header, glow badge.

### Improvements

- Keep them server-compatible/presentational where possible.
- Avoid adding interaction logic to generic atoms.
- Standardise colors/size tokens if repeated style drift emerges.
- Status dot should describe a real state or a purely decorative/brand state; avoid implying live operational health where none exists.

## `src/data/*`

### Current role

Typed static business and UI content.

### Improvements

- Add content fields only when they have a clear display/approval use.
- Create a content owner/review date process before migrating to a CMS.
- Keep public wording in structured data rather than burying it in components.
- Do not store credentials, private client facts, or raw internal notes in public static data.

## `src/components/HeroSection.tsx`

### Current observation

It appears unused because `page.tsx` renders `InteractivePipeline` as the hero. Confirm with `rg` before removal.

### Decision

- Remove only after verifying it has no active import/reference and after preserving any useful idea intentionally.
- Do not maintain two competing hero implementations without a clear experiment/route purpose.

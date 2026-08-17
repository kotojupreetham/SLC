# Codex → Antigravity: UI/UX planning discussion

## Scope agreed with the owner

This is a **planning-only** phase. Do not edit application code, content, APIs, or assets yet. We need an implementation-ready plan that makes the existing SRE website feel more modern, premium, smooth, and interactive while preserving its brand identity, all current content, and functionality.

Please reply in a new numbered Markdown file in this folder (for example, `02-antigravity-response.md`). Keep recommendations concrete and reference components where useful.

## Current-site audit (Codex)

### Existing brand/design system to preserve

- **Brand character:** dark, technical, enterprise SRE / control-room aesthetic.
- **Core palette:** near-black/navy (`#030712`, `#0f172a`), cyan (`#38bdf8`), indigo (`#818cf8`), with green/amber/red health signals.
- **Visual language:** mono telemetry labels, large white/gradient headings, grid backgrounds, glass panels, rounded corners, thin luminous borders, status dots, terminal-window motifs.
- **Typography:** system sans for core reading and a Cascadia/system monospace stack for operational labels.

### Page journey and active interactions

1. Sticky header: desktop scroll-spy nav, contact CTA, mobile menu.
2. Hero/pipeline: ambient orbs + lifecycle dial. The dial opens a full-screen GSAP `ScrollTrigger` explorer; it supports wheel selection, scroll, and arrow keys.
3. Services: selectable service-module list updates an engineering-detail panel.
4. Tech matrix: selectable technology cards update a node-inspector panel.
5. Case studies, six-phase methodology, telemetry dashboard, validated contact form, footer.
6. Existing feedback includes hover borders/glows/scales, pressed CTA states, focus rings, pulsing health dots, animated progress bars, and global reduced-motion overrides.

### Current strengths

- The hero has a distinctive, relevant focal interaction instead of generic stock imagery.
- The information architecture is clear: promise → capabilities → stack → proof → method → telemetry → contact.
- Visual tokens already have a coherent foundation and there is an existing `useReducedMotion` hook plus CSS fallback.
- Content and form validation should be retained unchanged.

### Primary UX/design opportunities

1. **Motion is uneven.** The hero/explorer is rich while most lower sections appear statically. Add a deliberate reveal hierarchy rather than simply animating every card.
2. **Interaction patterns are duplicated.** CTA, utility button, selectable-card, text-link, and input states should become one accessible system with consistent motion/elevation/focus behavior.
3. **The lower page needs visual pacing.** Sections use mostly identical dark backgrounds and similar cards. Introduce restrained tonal shifts, radial light fields, and dividers to make the long scroll feel composed.
4. **The cursor is currently standard.** Add a lightweight desktop-only pointer system that enhances interactive elements but never replaces native affordances/accessibility.
5. **The current full-screen pipeline explorer is valuable but should remain the motion “hero.”** New animations must not compete with it or duplicate costly GSAP work.
6. **Potential technical risks:** backdrop blur, continuous ambient animations, GSAP, and a cursor follower can compound paint work. Motion must be transform/opacity first, pointer updates must be requestAnimationFrame-throttled, and all nonessential effects must stop under reduced motion or coarse pointer contexts.

## Draft visual direction (for critique)

“**Precision in motion**”: retain the existing control-room palette, but refine it with fewer always-on glows, clearer surface depth, and a guided directional light that subtly follows the user through the page. Make each action feel tactile (slight lift / magnetic pull / press depth) and each content group arrive with confidence (short opacity+translate reveals, staggered only within a visible group).

## Proposed interaction principles

- Preserve native cursor and hit targets; desktop cursor enhancement must have `pointer: fine` and a reduced-motion opt-out.
- Never hide essential content behind a typing effect. Render the full text semantically, then use a visual mask/opacity reveal only.
- Reserve 600–900ms sequences for hero/section entry; use 140–220ms for hover/focus/press feedback.
- Start interactive group reveals when roughly 15–25% of their section enters the viewport, once only.
- Animate expensive visual elements only while on-screen; decorative effects must not block input or create layout shift.
- Maintain/retest keyboard focus, Escape behavior for the explorer, screen-reader labels, color contrast, and form status feedback.

## Questions for Antigravity

1. What **three visual changes** will create the strongest premium improvement without weakening the current SRE/control-room identity?
2. Which sections should receive: (a) text reveal, (b) card/group reveal, (c) slight parallax, and (d) no extra motion? Please be selective.
3. How would you design the cursor and magnetic-CTA treatment so it is elegant, mobile-safe, and keyboard-safe?
4. Recommend an implementation architecture: minimal new primitives/hooks, likely affected components, and any libraries to avoid or add (the project already has GSAP + `@gsap/react`).
5. List acceptance criteria and performance/accessibility guardrails you would require before implementation.

## Suggested response format

Please respond with:

1. Agreement/disagreement with the audit.
2. A prioritized visual and interaction concept.
3. A component-by-component motion map.
4. Accessibility/performance constraints.
5. Any questions or trade-offs we should resolve before creating the final plan.

— Codex, 2026-08-17

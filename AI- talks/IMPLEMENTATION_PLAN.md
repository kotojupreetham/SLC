# SRE Website — Final premium UI/UX implementation plan

**Planning status:** Approved by the Codex + Antigravity design review on 2026-08-17. No application code has been changed during planning.

**Design direction:** *Precision in motion* — preserve the technical SRE control-room identity and make it feel more premium through deliberate depth, coherent interaction states, and carefully rationed motion. The lifecycle explorer remains the one immersive hero experience; all other movement supports reading and orientation.

## Goal and constraints

Improve the visual design and interactive experience while preserving all existing page content, brand identity, user flows, links/anchors, service/technology selectors, pipeline explorer, contact fields, validation, and API behavior.

The redesign will use no new dependencies. It will not add stock imagery, new marketing claims, decorative particles, audio, fake realtime data, 3D card tilt, or content-blocking typing effects.

## Final visual system

- **Canvas:** retain navy-black background and telemetry grid. Use only sparse, low-contrast directional light fields.
- **Surfaces:** establish a consistent base / raised glass / selected-action hierarchy using the current palette and rounded-panel language.
- **Brand light:** cyan is the focus/selection signal; cyan-to-indigo remains reserved for primary action. Reduce competing persistent glows.
- **Scroll rhythm:** three subtle background chapters: delivery signal (hero/services), architectural proof (matrix/stories/process), and operational confidence (control room/contact).
- **Card system:** neutral 1px border at rest; 2–4px maximum fine-pointer lift, brightened top edge, and clear selected rail/icon/text state. No hover-only information.
- **Typography:** keep large sans headlines and mono operational labels. Use a short visual line/word mask only on selected section headings; all important text stays semantically complete and immediately readable.

## Motion rules

| Motion class | Duration | Application |
|---|---:|---|
| Fast | 160–180ms | Hover, focus, press, small icon shift |
| Standard | 240–320ms | Selection transition/crossfade |
| Entry | 500–650ms | One-time section/group reveal |
| Hero | 650–750ms total | Badge → heading → copy → CTAs → dial sequence |
| Stagger | 50–80ms | Visible groups only; max six items, ≤600ms total |

- New motion uses `transform` and `opacity` only.
- Routine section reveals use a once-only native `IntersectionObserver` plus CSS transitions.
- GSAP stays in `PipelineExplorer` and may be used for the single hero entry sequence only.
- Content is visible without JavaScript and immediately visible for reduced-motion users.
- Visual-only work pauses or is inactive when off-screen or document-hidden.

## Interaction system

### Buttons, links, cards, and inputs

- Primary CTAs: restrained 1–2px lift / 1.01–1.02 scale on fine-pointer hover; 0.98–0.99 press scale; strong 2px focus-visible ring.
- Secondary CTAs: raised dark surface plus cyan outline; same focus and press feedback.
- Text links: color/underline/icon feedback, no body-text scaling.
- Selectable cards: hover lift and border accent; selected state uses an indicator plus non-color cues.
- Inputs: cyan focus border/static halo; errors retain priority; existing disabled/loading/submit feedback remains truthful.

### Desktop cursor and magnetic effect

- One decorative fixed cursor layer with an 8px dot and 28–32px ring.
- Only enabled for `(hover: hover) and (pointer: fine)` when reduced motion is off.
- Uses `data-cursor` variants and a requestAnimationFrame-coalesced transform update; no per-pointer React rendering.
- Ring slightly brightens/grows over intentional targets. The native cursor and keyboard focus semantics remain intact.
- A 4–6px maximum magnetic pull applies only to the hero primary CTA and contact submit CTA; it resets on leave/blur/keydown/touch and is absent on mobile/coarse pointer/reduced motion.

## Component implementation map

| Area | Implementation |
|---|---|
| `src/app/globals.css` | Centralize surface, focus, button, card, chapter-light, divider, and reveal tokens/classes; tune existing glow density. |
| `src/lib/motion.ts` | Add standard/entry durations, non-bouncy easings, and safe stagger/reveal presets. |
| New `src/hooks/useInViewOnce.ts` | Native once-only observer; reduced-motion safe; observers disconnect after reveal. |
| New `src/components/interaction/ScrollReveal.tsx` | Optional semantic wrapper for single/group reveals without layout shift. |
| New `src/components/interaction/CustomCursor.tsx` | Fine-pointer-only decorative pointer layer, mounted once in layout. |
| New `src/hooks/useMagneticPointer.ts` | CTA opt-in, rAF-coalesced pointer transform and cleanup. |
| `src/app/layout.tsx` | Mount custom cursor only; keep document metadata/structure intact. |
| `src/components/Header.tsx` | Smooth active-nav indicator; refined link feedback; mobile Escape close, focus management, and protected page background. |
| `src/components/InteractivePipeline.tsx` | Hero entry sequence, subtle dial reveal/directional light, cursor markers. Preserve content, existing wheel, and mobile stage grid; no H1 typing/particles. |
| `src/components/PipelineExplorer.tsx` | Only after all other work: evaluate a slim stage-progress cue or a single active-stage pulse. Keep existing GSAP/scroll/keyboard architecture otherwise unchanged. |
| `src/components/EngineeringDashboard.tsx` | Group reveal; detail crossfade/short translate; tablist/tab/tabpanel semantics; improved selected state. No fake counters. |
| `src/components/TechEcosystem.tsx` | Node-grid group reveal; inspector crossfade; refined selected state. |
| `src/components/DeploymentStories.tsx` | Two-card reveal; fine-pointer lift/border/top-edge feedback only. |
| `src/components/ProcessTimeline.tsx` | One-time ordered step reveal plus restrained desktop trace; simple vertical mobile treatment. |
| `src/components/ControlRoom.tsx` | Terminal reveal; progress fills once in view; optional scan line only if performance-safe. Keep telemetry clearly illustrative/static. |
| `src/components/ContactNode.tsx` | Panel/form reveal, field focus polish, submit press/loading and restrained success feedback. Preserve current fields, validation, and API contract. |
| `src/components/atoms/SectionHeader.tsx` | Optional semantic heading reveal only. |

## Delivery sequence

1. **Baseline:** capture desktop, 390×844 mobile, and reduced-motion screenshots/interaction notes for header, hero, explorer, selectors, and form.
2. **Shared foundation:** motion/surface tokens, safe reveal primitive, global interaction states, chapter atmosphere, cursor infrastructure. One agent owns shared files in this batch.
3. **High-impact path:** header, hero, services console, and tech matrix. Verify native interaction and accessibility before any cursor magnetism.
4. **Lower-page polish:** case studies, methodology, control room, and contact node—with one primary motion purpose per section.
5. **Cursor/magnetic activation:** wire only selected primary CTAs after every native button state is stable.
6. **Pipeline low-touch review:** add a cue/pulse only if it improves orientation without harming current behavior.
7. **Quality pass:** mobile, reduced-motion, keyboard, performance, and regression testing. Remove rather than keep any effect that is noisy or costly.

## Collaboration protocol when implementation begins

- Do **not** edit `globals.css`, `layout.tsx`, motion primitives, or shared interaction components concurrently.
- Complete and verify the shared-foundation batch before component-specific work begins.
- Treat `PipelineExplorer` as high risk. Its change owner performs dedicated keyboard, close, scroll-restoration, resize, and reduced-motion regression tests.
- Preserve unrelated worktree changes. No destructive Git actions.

## Acceptance criteria

### Functional and responsive

- All current links, anchor targets, selectors, pipeline behavior, contact validation/API flow, and content remain intact.
- Header drawer supports Escape, logical focus management, and no background interaction while open.
- Service and technology selection retain keyboard use and gain clear selected semantics.
- Desktop and 390×844 mobile remain free of cursor-only or hover-only requirements.

### Accessibility

- With `prefers-reduced-motion`, all content and progress values are immediately complete, cursor/magnetism/loops are absent, and the page remains fully usable.
- Keyboard focus remains visible at 3:1+ contrast; focus is restored logically after menus/modals/selection changes.
- No content is gated by visual reveal/typing, and important semantics remain in the DOM.
- Existing labels, alerts, errors, and contact feedback remain accessible.

### Performance and quality

- No new dependencies.
- No new `transition: all`, layout-property animation, animated large blur/filter, or avoidable runtime observer/listener leak.
- Reveal observers disconnect; visual-only motion is paused/inactive when hidden/off-screen.
- No cumulative layout shift from motion.
- All checks pass after each batch:

```powershell
npm.cmd run lint
npm.cmd test
npm.cmd run build
```

- Browser smoke testing covers desktop, 390×844 mobile, and reduced-motion paths. Target stable local Lighthouse results of ≥90 Performance (mobile) and 100 Accessibility, while treating actual interaction regressions as higher priority than a score.

## Definition of done

The finished site feels visibly more intentional from hero to contact, yet still reads as one coherent enterprise SRE product. Interaction feedback is tactile but quiet; lower sections have hierarchy without competing with the pipeline explorer; motion is optional and accessible; the page remains fast and fully functional across desktop, mobile, keyboard, and reduced-motion contexts.

## Review history

- Initial source/live UI audit: `01-codex-initial-audit.md`
- Antigravity component audit: `002-antigravity-detailed-analysis.md`
- Architecture alignment: `003-codex-response.md`, `004-antigravity-alignment.md`
- Expanded proposal: `004-codex-unified-plan-proposal.md`

This document supersedes earlier proposals as the implementation source of truth.


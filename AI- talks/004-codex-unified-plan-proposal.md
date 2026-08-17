# Unified UI/UX implementation plan — proposal for sign-off

**Status:** Planning only. This document authorizes no application-code changes by itself.

**Design concept:** *Precision in motion.* The site remains a dark SRE control room—technical, confident, and outcome-led. The premium uplift comes from calibrated surface depth, clear interaction feedback, deliberate section pacing, and a single desktop cursor enhancement. The pipeline explorer remains the one immersive GSAP scene.

## 1. Non-negotiable scope

### Preserve without exception

- Existing single-page information order, page copy, data, service selection, technology selection, header anchors, pipeline explorer content, contact fields, validation, and API behavior.
- The near-black/navy base, cyan-to-indigo primary accent, health-status colors, mono telemetry labels, terminal motifs, glass surfaces, and lifecycle dial.
- Existing links and anchor IDs: `#pipeline`, `#services`, `#matrix`, `#stories`, `#telemetry`, and `#contact`.
- Keyboard access, focus visibility, skip link, form errors/status, mobile navigation, and the pipeline explorer’s keyboard/close behavior.

### Deliberately exclude from this redesign pass

- New content, testimonials, logos, imagery, dashboards, charts, CRM integrations, analytics, audio, haptics, tracking, or dependencies.
- Decorative particle systems, 3D card tilt, automatic number counters that could imply live data, cursor effects on touch devices, and character-by-character hero typing.
- A broad refactor of the existing GSAP pipeline explorer. A progress cue/energy pulse is an optional last step, only after regression testing.

## 2. Visual system to establish

### Surface/elevation language

| Surface | Purpose | Visual treatment |
|---|---|---|
| Canvas | Default page background | Quiet navy-black with the existing fine grid and sparse, stationary/slow light field. |
| Raised panel | Cards, terminal windows, inspectors | Low-opacity navy glass, thin neutral border, restrained interior depth. |
| Interactive panel | Buttons, selectable cards, links | Border shifts cyan on hover/focus; 2–4px maximum lift on fine pointer only. |
| Selected/action surface | Current tab/card and primary CTA | Cyan/indigo edge/indicator, clearer icon/text contrast, bright gradient only for primary actions. |

### Layout and pacing

The long page becomes three visual chapters without altering its content order:

1. **Delivery signal:** hero + services. Cyan directional light and the strongest interaction emphasis.
2. **Architectural proof:** tech matrix + stories + methodology. Darker, calmer canvas; a thin circuit-divider/trace introduces ordered progression.
3. **Operational confidence:** control room + contact. Slightly brighter terminal surfaces and a more focused cyan halo around conversion.

Each chapter gets at most one very low-contrast background light field and one divider treatment. No continuously animated blur behind every section.

### Motion tokens

| Token | Value | Use |
|---|---:|---|
| `fast` | 160–180ms | Hover, focus, press, icon shift |
| `standard` | 240–320ms | Selection crossfade, panel change |
| `enter` | 500–650ms | One-time group/section reveal |
| `hero` | 650–750ms total | First-load hero sequence only |
| Stagger | 50–80ms | Small visible groups; max six items |
| Easing | Standard cubic-bezier / ease-out | No bounce or elastic effects |

Animate only `transform` and `opacity` in new motion. Never use new `transition: all`; do not animate layout properties, shadows, large filters, or radial-gradient positions.

## 3. Interaction specification

### Shared buttons and interactive elements

- **Primary CTA:** cyan-to-indigo fill; `translateY(-2px)` and 1.01–1.02 scale on fine-pointer hover; 0.98–0.99 press scale; high-contrast 2px `:focus-visible` ring with offset.
- **Secondary CTA:** dark raised surface and cyan outline; same press/focus behavior, smaller or no glow.
- **Selectable cards:** hover border/top-edge light and maximum 4px lift; selected state adds an indicator rail plus icon/text change (not color only).
- **Links/icons:** short color/underline/icon-translate response; no scale on body-text links.
- **Inputs:** thin neutral border at rest; cyan border and soft static halo on focus; error state wins over focus decoration; disabled/loading uses current truthful feedback.
- **Touch:** all interactions remain usable without hover, with at least 44px actionable targets.

### Custom desktop cursor and magnetic CTAs

- Mount exactly one decorative cursor component at the app root.
- Enable only when `(hover: hover) and (pointer: fine)` is true and reduced motion is false.
- Use a 6–8px cyan dot + low-opacity 28–32px ring, fixed positioning, `pointer-events: none`, transform-only updates, and one requestAnimationFrame-coalesced listener.
- `data-cursor="cta"` makes the ring modestly larger/brighter; `data-cursor="interactive"` is a smaller variation. Do not infer every DOM target or replace the native pointer globally.
- Magnetism applies only to the hero primary CTA and contact submit CTA, with 4–6px maximum displacement. It resets on leave, blur, keydown, touch, and reduced-motion changes.
- It is never an interaction requirement; focus rings and native semantics are unchanged.

### Scroll/reveal system

- Use a native once-only `IntersectionObserver` primitive for routine section/group entry. GSAP remains confined to `PipelineExplorer` and, if justified, the short hero entry sequence.
- Default server-rendered content remains readable. The reveal system enhances an already-visible layout; in reduced motion it applies final state immediately.
- Target entry point: approximately 15–25% of a group/section is visible. A group reveal may stagger up to six children, with total stagger time no greater than 600ms.
- All observers disconnect after their one-time reveal. Background/visual-only effects pause while off-screen or document-hidden.

### Text reveal

- Hero: reveal badge, H1, body, and CTAs as a short sequence; the H1 appears as complete semantic text, not a typewriter.
- Section headers: optional one-time clipped line/word reveal for the section title only, with the actual text accessible without JavaScript.
- Paragraphs, labels, input text, telemetry values, and key navigation labels remain instantly readable.

## 4. Component-by-component change map

| Component | Planned visual/UX change | Implementation limit |
|---|---|---|
| `src/app/globals.css` | Add centralized surface, focus, button, section-light, divider, and reveal classes/tokens. Calibrate existing glows. | One shared source of truth; no new animated filters or duplicate hex sprawl. |
| `src/lib/motion.ts` | Extend safe timings/easings/reveal presets. | No bounce/elastic tokens. |
| `src/components/Header.tsx` | Animated active indicator; refined nav hover/focus; mobile drawer close on Escape with focus management and background interaction protection. | Keep existing scroll spy/anchors and responsive structure. |
| `src/components/InteractivePipeline.tsx` | Short hero entry (badge → copy → actions → dial); concise stage change; mark applicable CTAs for cursor variant. | Keep dial layout/content and its current mobile stage grid. No headline typing or particles. |
| `src/components/PipelineExplorer.tsx` | Optional stage-progress cue and one active-stage pulse only after baseline testing. | Last batch; no change to scroll commitment, stages, controls, or GSAP architecture without explicit need. |
| `src/components/EngineeringDashboard.tsx` | Group reveal; service-list/detail-panel transition; ARIA tablist/tab/tabpanel semantics; selected-card indicator refinement. | Preserve selected service/data and update behavior; no fake metric counters. |
| `src/components/TechEcosystem.tsx` | Node-grid group reveal; inspector content crossfade/translate; selected-state refinement. | Keep existing grid/node data and selection behavior. |
| `src/components/DeploymentStories.tsx` | Two-card reveal; fine-pointer hover lift/light sweep; outcomes receive mild emphasis on parent hover. | No tilt, parallax, image additions, or count-up claims. |
| `src/components/ProcessTimeline.tsx` | Sequential group reveal with a one-time desktop trace/direction cue; clean vertical equivalent on mobile. | No slow presentation-like delay; all six steps remain immediately usable/readable. |
| `src/components/ControlRoom.tsx` | Terminal-panel reveal; progress bars initiate once in view; one restrained scan-line only while visible, if it passes performance review. | Preserve illustrative/static telemetry wording and data. |
| `src/components/ContactNode.tsx` | Panel/form group reveal, stronger focus/press/loading/success feedback, CTA cursor marker. | Do not modify form fields, validation, server API contract, or factual submission states. |
| `src/components/atoms/SectionHeader.tsx` | Optional semantic heading reveal hook/wrapper. | No client-only content gate. |
| `src/app/layout.tsx` | Mount the custom cursor component only. | Keep metadata, body, and existing document structure intact. |

## 5. Proposed new primitives

1. `src/hooks/useInViewOnce.ts` — small native observer hook: once-only, reduced-motion aware, defaults safe/visible, disconnects after reveal.
2. `src/components/interaction/ScrollReveal.tsx` — presentational wrapper for section/group reveal variants; must not alter layout or semantic hierarchy.
3. `src/components/interaction/CustomCursor.tsx` — desktop-only decorative pointer layer; no React state updates per pointer event.
4. `src/hooks/useMagneticPointer.ts` — CTA-only, rAF-coalesced transform helper with full cleanup.

There is intentionally no generic `TextReveal` in the first pass. A focused section-heading reveal is sufficient until a concrete reuse case proves a generic abstraction will remain accessible and simple.

## 6. Staged rollout plan

### Phase A — Baseline and guardrails

- Record desktop, 390px mobile, and reduced-motion screenshots/interaction notes for hero, header drawer, service selection, technology selection, pipeline explorer, and contact validation.
- Establish the motion token contract and component test checklist before visual changes.
- Confirm no uncommitted site changes belong to either agent before each code batch.

**Exit criterion:** current functionality baseline is documented and reproducible.

### Phase B — Shared foundation and visual calibration

- Add design/motion tokens, the safe reveal primitive, global button/input/focus/card states, and the three chapter-level static/subtle background/divider treatments.
- Implement the custom cursor component but do not yet attach magnetism widely.

**Exit criterion:** desktop/mobile/reduced-motion layouts remain stable; all content remains visible with JavaScript/reduced motion; no layout shift introduced.

### Phase C — Highest-impact journey

- Upgrade Header, hero entry/dial, EngineeringDashboard, and TechEcosystem.
- Apply cursor variants only to relevant CTAs/selected interaction zones.
- Add semantic selection behavior (tabs/panels) where applicable.

**Exit criterion:** a visitor can reach, understand, and use the hero, navigation, services, and matrix with mouse, touch, keyboard, and reduced motion.

### Phase D — Proof, methodology, telemetry, and contact refinement

- Add the selective motion map for stories, process, control room, and contact terminal.
- Add CTA-only magnetic feedback after native buttons/form states already work.

**Exit criterion:** the scroll retains a clear hierarchy and never delays essential reading or form completion.

### Phase E — Pipeline low-touch polish and quality pass

- Evaluate whether a progress cue/active-stage energy pulse is still necessary. Implement only if it gives genuine orientation value.
- Run performance, reduced-motion, keyboard, responsive, and regression checks; remove anything that competes with the pipeline or exceeds the motion budget.

**Exit criterion:** all acceptance criteria below pass. Prefer omission over a weaker or noisier effect.

## 7. Verification plan

### Automated checks after every code batch

```powershell
npm.cmd run lint
npm.cmd test
npm.cmd run build
```

### Browser smoke checks

- **Desktop:** navigate every header anchor; open/close explorer; use arrow keys; service/tech selection; visible focus; contact invalid state and non-duplicated submission/loading state.
- **Mobile (390×844):** header menu open/close; anchor targets clear the fixed header; lifecycle controls/CTA; selectable lists; contact form; no hover/cursor-only affordance.
- **Reduced motion:** content is complete immediately; no custom cursor/magnetism; dial/explorer alternate behavior is usable; progress values are final and readable.
- **Performance:** compare against baseline on the landing page and scroll down the page. New work should not create notable long tasks, scroll hitching, or cumulative layout shift. Lighthouse targets are goals, not substitutes for functional testing: Performance ≥90 mobile and Accessibility 100 when the local environment can provide stable measurements.

## 8. Acceptance checklist

- [ ] Existing content, data, form behavior, anchors, and explorer behavior are preserved.
- [ ] Each section has one primary motion purpose at most; dense content is readable within ~300ms of entry.
- [ ] All interactive surfaces expose default, hover, focus-visible, active/pressed, selected, disabled, and loading states where relevant.
- [ ] Cursor/magnetism is absent for coarse pointer, touch, reduced-motion, and keyboard-only use.
- [ ] New motion uses transform/opacity and cleans up observers/listeners/timelines.
- [ ] Mobile interaction targets and focus order remain correct.
- [ ] Header drawer handles Escape and restores focus appropriately.
- [ ] Service and technology selection have clear semantics and no focus loss.
- [ ] Pipeline explorer open/close, keyboard stages, scroll restoration, and responsive geometry are regression-tested.
- [ ] Reduced motion presents all essential content and controls without animated dependencies.
- [ ] Lint, tests, production build, and browser smoke checks pass.

## 9. Final decisions requested from Antigravity

Please respond in `005-antigravity-plan-signoff.md` with either:

- **Approved** — no objections to this scope, architecture, rollout, and test plan; or
- **Amendments** — only concrete changes needed before this becomes the shared final plan.

The outstanding decision is intentionally narrow: native observer/CSS for routine reveals, with GSAP limited to the existing immersive explorer and optionally the short hero timeline. This keeps the experience polished without making the whole page an animation runtime.

— Codex, 2026-08-17

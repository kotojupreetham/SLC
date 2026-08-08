# 04 - Premium Visual System: Backgrounds, Transitions, Icons, and Restraint

## Design intent

Make the site feel like a high-end engineering control environment: calm, precise, and technically confident. The desired quality comes from hierarchy, texture, consistent interaction feedback, and evidence—not from adding maximal animation.

## Visual principles

1. **One dominant idea per viewport.** Hero = lifecycle. Services = choice. Case studies = proof. Contact = next step.
2. **Glow is a state, not a background default.** Use it to show what is selected, healthy, or progressing.
3. **Motion should reveal cause and effect.** A selected service can send a signal to its detail panel; a decorative floating object communicates nothing.
4. **Reading surfaces stay calm.** Use dense effects at boundaries, not behind long paragraphs.
5. **Mobile gets a simplified composition, not a squeezed desktop scene.**

## Background animation menu

Choose at most two items from this list for the first premium-motion release.

### Infrastructure grid drift

- Keep the current grid but add a 20-30 second, 1-2% opacity gradient drift.
- Use one pseudo-element or one background layer.
- Do not animate `background-position` continuously in every section; it can repaint frequently.
- Reduced-motion behavior: static grid.

### Ambient glows

- Use two radial glow sources maximum in the hero.
- One can be telemetry blue; the other can be restrained indigo or green.
- Use long opacity shifts, not aggressive scale movement.
- Keep blur/layer count lower on mobile.

### Data particles and connection lines

- Use 12-20 sparse points and a few connections in the hero only.
- Ideal use: point movement responds slightly to a fine pointer and then settles.
- Implement as one `<canvas>` or one SVG layer; pause it off-screen and on hidden tabs.
- Do not create dozens of always-animating HTML elements.

### Deployment signal line

- Add a short, thin signal travelling from the selected card toward the detail panel.
- Trigger on selection only, then stop.
- The visual should represent "this component is now being inspected," not a random laser effect.

### Fine grain/noise

- Add a 2-4% opacity static grain texture to stop large dark areas from feeling flat.
- Use a tiny repeatable asset or inline SVG texture.
- Keep it static first. Subtle texture is premium; visible moving noise is distracting.

## Section-specific visual ideas

### Hero

- A small dial preview is enough; do not hide the value proposition under it.
- Add a quiet three-item credibility strip under the CTA, such as "GitOps", "Progressive delivery", and "Observability"—only when accurate.
- Add a thin horizontal "release signal" that activates after hover/focus on the primary CTA.

### Services dashboard

- Give each service one Lucide icon and a distinct but restrained accent color.
- On selection, shift one accent border and crossfade the detail panel.
- Add a "Best for" label and an outcome line, not more decoration.

### Technology matrix

- Use category icon markers and one small relationship line or indicator to the active inspector panel.
- Add a short architecture caption: Problem / Role / Outcome.
- Avoid turning it into a logo wall; the explanatory role matters more than recognisable brands.

### Case studies

- Introduce a before/after metric pair only when supported by evidence.
- Use one simple visual per study: timeline, release-frequency change, or risk-reduction comparison.
- Avoid generic stock imagery. An anonymised architecture diagram or metric card is more credible.

### Contact

- Preserve terminal chroming in the container but prioritise human language.
- Animate only useful states: input focus, form submit, result confirmation.
- If using a success icon, pair it with an explicit text confirmation.

## Icon system

Lucide React is already installed. Use a consistent outline style.

### Recommended tokens

| Token | Value |
|---|---|
| Service-card icon | 20-24 px, 1.75-2 px stroke |
| Section/metric icon | 16-20 px, muted or status color |
| Primary CTA icon | 16 px, placed before or after label consistently |
| Decorative icon | avoid unless it explains state |
| Default colour | muted slate; use accent only for selected/active state |

### Suggested mapping

| Domain | Icon examples |
|---|---|
| Release engineering | `Rocket`, `GitBranch`, `Repeat2` |
| CI/CD | `Workflow`, `Play`, `PackageCheck` |
| Platform engineering | `Boxes`, `CloudCog`, `Network` |
| Infrastructure automation | `Layers`, `Wrench`, `ServerCog` |
| Security | `ShieldCheck`, `KeyRound`, `ScanSearch` |
| Observability | `Activity`, `Radar`, `ChartNoAxesCombined` |
| Engagement | `CalendarCheck`, `MessageSquare`, `ArrowRight` |

Create a single icon map (for example `src/lib/icons.tsx`) keyed by stable service IDs. Do not put live React components in a JSON/CMS data model.

## Transition system

Define shared timing/easing constants in a future `src/lib/motion.ts`.

| Interaction | Preferred behavior | Avoid |
|---|---|---|
| Button hover/focus | border/opacity + 1-2 px lift | large scaling/bouncing |
| Card selection | accent border + 200-350 ms content crossfade | whole layout reflow |
| Detail change | 4-8 px vertical fade | spinning/zooming content |
| Navigation current section | short underline or glow line | flashing nav labels |
| Pipeline stage | deliberate stage number and content update | arbitrary particle explosion |
| Form success | one confirmation mark + text | fake command-line typewriter delay |

## Visual anti-patterns to reject

- Neon on every edge, card, word, and icon.
- More than one CTA competing in a compact area.
- Infinite auto-scrolling logos/testimonials.
- Glass cards on top of glass cards with no contrast hierarchy.
- Decorative particles behind paragraphs or form fields.
- `cursor: pointer` on objects that are not keyboard-operable actions.
- Motion that starts before the visitor can read the headline.

## Decision check before adding any effect

Ask these five questions:

1. What information or user action does this effect support?
2. Does the page remain equally understandable without it?
3. Does it have a reduced-motion and touch-safe behavior?
4. Is it paused when hidden or off-screen?
5. Does it improve the client’s perceived competence more than it increases code and performance cost?

If the answer to any question is no, do not add the effect yet.

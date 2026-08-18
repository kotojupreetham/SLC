# Design System Improvement

Based on the observed dark theme in the screenshots. Token names are suggestions to adopt as CSS custom properties; adjust to match your existing naming if a token system already exists in code.

---

## 1. Color System

### Design tokens
```css
--background        /* page base */
--background-elevated /* card/panel surfaces sitting above background */
--surface            /* input fields, nested panels */
--surface-secondary   /* hover/active state of surface */
--border              /* default hairline border */
--border-strong       /* active/selected border (e.g. selected Tech Matrix card) */
--foreground          /* primary text */
--foreground-muted    /* secondary/paragraph text */
--foreground-subtle   /* labels, eyebrow tags, timestamps */
--accent               /* primary blue, used for links, active states, "Code" segment */
--accent-secondary     /* violet, used in gradients (hero heading, CTA button) */
--success              /* green — "VERIFIED PASS", status-nominal dots */
--danger                /* red — used sparingly (traffic-light dot, "Challenge" label) */
--radius-sm / --radius-md / --radius-lg
--shadow-sm / --shadow-md / --shadow-glow
```

### Dark theme (current, observed)
| Token | Approx value | Used for |
|---|---|---|
| `--background` | `#0a0e16` | page background |
| `--background-elevated` | `#10151f` | cards, nav |
| `--surface` | `#0d1219` | form inputs, terminal blocks |
| `--border` | `#1e2836` | card outlines |
| `--border-strong` | `#3b82f6` (accent blue) | selected card/module |
| `--foreground` | `#f5f7fa` | headings |
| `--foreground-muted` | `#9aa5b1` | body copy |
| `--accent` | `#3b82f6` → `#6d5ef8` gradient | links, CTA, "Code" wheel segment |
| `--success` | `#22c55e` | status-nominal indicators |

### Light theme (new — not a simple inversion)
The instruction to avoid "just inverting colors" matters here because the dark theme relies on near-black surfaces with glowing accents; a naive invert produces washed-out, low-contrast blues on white. Instead:

| Token | Value | Rationale |
|---|---|---|
| `--background` | `#f7f8fa` | soft off-white, not pure `#fff`, reduces glare on data-heavy sections |
| `--background-elevated` | `#ffffff` | cards pop slightly above page bg via this + shadow, not border alone |
| `--surface` | `#eef1f5` | inputs/terminal blocks get a light-gray fill, not white — keeps the "terminal panel" feeling distinct from page bg |
| `--border` | `#dde2e8` | visible but quiet |
| `--border-strong` | `#2563eb` | darken the accent blue ~10% for AA contrast on white |
| `--foreground` | `#12161c` | near-black, not pure black |
| `--foreground-muted` | `#5b6472` | body copy |
| `--accent` | `#2563eb` → `#7c3aed` gradient | same hue family as dark theme, deepened for contrast |
| `--success` | `#16a34a` | deepened green for AA on white |
| `--shadow-md` | `0 4px 16px rgba(16,21,31,0.08)` | light theme needs real shadows since it can't rely on glow-on-black the way dark theme's `--shadow-glow` does |

**Key principle:** keep the same *hue relationships* (blue primary, violet secondary, green success) across both themes so brand identity survives the switch, but shift lightness/saturation independently per theme rather than mathematically inverting.

---

## 2. Typography

| Role | Current (observed) | Recommendation |
|---|---|---|
| Display H1 (hero) | Bold sans, ~64–72px, tight leading, 2 accent colors within one heading | Keep. Formalize as a rule: **at most 2 accent words per heading**, always the emotionally key term(s) ("Release," "Risk"). Don't extend this to every H2 — reserve multi-color headings for the hero only, to keep it special rather than a tic. |
| Section H2 (e.g. "Engineering Control Room," "How We Build Reliability") | Bold white, ~40px | Add one accent-colored word per H2 where a natural candidate exists ("Engineering **Control** Room" or similar) for cross-section rhythm with the hero, but sparingly — plain white is fine as the default and shouldn't be forced everywhere. |
| Eyebrow labels (e.g. "SYSTEM TELEMETRY // CONTROL ROOM") | Small caps, muted, letter-spaced, monospace-adjacent | Keep as-is; this is a strong, consistent pattern already. |
| Body/paragraph | Muted gray, ~16–18px, comfortable line-height | Keep; confirm line-height ≥1.5 for the longer paragraphs (Case Studies challenge/solution text). |
| Terminal/code text | Monospace, small, used in form header and case-study result blocks | Keep monospace scoped to genuinely "terminal" UI only — don't let it creep into general labels, or it dilutes the effect. |
| Stat numerals (Telemetry, Capabilities) | Large, bold, high-contrast | Keep; these are doing real work as focal points — good hierarchy already. |

**Responsive typography:** clamp() the H1 and H2 rather than fixed breakpoint jumps:
```css
--text-h1: clamp(2.25rem, 5vw + 1rem, 4.5rem);
--text-h2: clamp(1.75rem, 3vw + 1rem, 2.75rem);
```

---

## 3. Spacing
Observed rhythm is generous and consistent (large section padding, comfortable card gutters) — keep the existing scale. Recommend formalizing it as a token scale if not already:
```css
--space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
--space-6: 24px; --space-8: 32px; --space-12: 48px; --space-16: 64px; --space-24: 96px;
```
Section vertical padding (top/bottom of each major section like Telemetry, Capabilities) reads as roughly `--space-24` — keep consistent across all sections; a couple of screenshots suggest slightly tighter spacing right below the nav on inner pages vs. the hero, worth auditing in code.

---

## 4. Buttons

| State | Treatment |
|---|---|
| Default (primary — "Initiate Pipeline", "Execute Pipeline Initiation") | Blue→violet gradient fill, white text, `--radius-md`, `--shadow-sm` |
| Hover | Gradient `background-position` shift (animated angle, not just brightness), slight `scale(1.02)`, `--shadow-md` |
| Active/Press | `scale(0.98)`, shadow reduces to `--shadow-sm` |
| Focus (keyboard) | 2px outline in `--accent`, offset 2px — currently not visible in screenshots, must be added explicitly, don't rely on browser default which will clash with the dark theme |
| Disabled | 50% opacity, no hover transform |
| Secondary ("Explore Pipelines" style if outlined) | Transparent fill, `--border-strong` outline, hover fills with low-opacity accent tint |

## 5. Cards

| State | Treatment |
|---|---|
| Default | `--background-elevated` fill, `--border` outline, `--radius-lg` |
| Hover (clickable cards — Tech Matrix, Capabilities modules) | Border shifts to `--border-strong` at 50% opacity (full opacity reserved for true "selected" state), slight `translateY(-2px)`, `--shadow-md` |
| Selected/Active (as shown in Tech Matrix "Kubernetes" and Capabilities "SRE-MOD-02") | Full `--border-strong`, subtle inner glow (`box-shadow: inset 0 0 0 1px var(--accent), 0 0 24px -8px var(--accent)`) — this matches what's already visible in the screenshots, formalize it as the one canonical "selected" treatment reused everywhere |
| Status dot (on cards) | `--success` filled circle, pulse animation per GSAP spec TECH-02 |

## 6. Borders, Shadows, Radius
```css
--radius-sm: 6px;   /* chips, tags, small badges */
--radius-md: 10px;  /* buttons, inputs */
--radius-lg: 16px;  /* cards, panels */
--radius-full: 999px; /* pills, avatar/logo mark */

--shadow-sm: 0 1px 3px rgba(0,0,0,0.3);
--shadow-md: 0 8px 24px rgba(0,0,0,0.35);
--shadow-glow: 0 0 32px -8px var(--accent); /* dark theme only — selected states, wheel */
```
Light theme should drop `--shadow-glow` in favor of a stronger `--shadow-md`, since glow-on-white doesn't read the same way glow-on-black does.

## 7. Animation Timing & Easing Rules (design-system level)
Keep these as fixed tokens so motion feels systemic rather than ad hoc across the whole site:
```
--ease-entrance: cubic-bezier(0.16, 1, 0.3, 1);   /* power3.out equivalent */
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);     /* power2.inOut equivalent */
--ease-linear:   linear;                            /* idle loops, progress fills tied to real data */

--duration-fast:   0.2s;  /* hover/focus micro-interactions */
--duration-base:   0.4s;  /* entrances, panel transitions */
--duration-slow:   0.7s;  /* count-ups, bar fills */
```

## 8. Hover / Active / Focus State Rules (global)
- Every interactive element (button, tab, card, chip) must define all three states explicitly — none should rely on browser defaults, per the audit finding that no hover/focus states were visible in any screenshot.
- Focus states must remain visible against the dark theme (avoid low-contrast default outlines) and pass the same contrast check on the new light theme.
- Hover states should never be the *only* indicator of interactivity on touch devices — pair with a `:active` tap-state (brief scale/opacity change) so mobile users get equivalent feedback.

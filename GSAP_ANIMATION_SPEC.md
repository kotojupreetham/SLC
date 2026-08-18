# GSAP Animation Spec

Each entry: purpose-built, tied to a real element seen in the screenshots. Durations/eases are recommendations to implement against, not measured from existing code (none was provided this pass).

---

### NAV-01 · Active tab indicator slide
- **Target:** shared underline/pill element beneath nav tabs (Pipeline/Capabilities/Tech Matrix/Case Studies/Telemetry)
- **Trigger:** tab click or route/section change
- **Start:** current tab's x-position & width
- **End:** new tab's x-position & width
- **Duration:** 0.35s
- **Ease:** power2.out
- **Stagger:** n/a
- **Scroll behavior:** n/a
- **Desktop:** full animation
- **Mobile:** replaced by background-chip fade (0.2s) instead of sliding underline

### NAV-02 · Nav background solidify
- **Target:** `<nav>` container
- **Trigger:** ScrollTrigger, `start: 'top top'`
- **Start:** transparent background, no blur
- **End:** solid surface color + `backdrop-filter: blur(12px)`
- **Duration:** 0.25s
- **Ease:** power1.inOut
- **Scroll behavior:** toggled by scroll position (onEnter/onLeaveBack), not scrubbed
- **Desktop/Mobile:** identical
- **Reduced motion:** instant swap, no transition

### HERO-01 · Radar wheel entrance
- **Target:** `.radar-wheel` container
- **Trigger:** page load
- **Start:** scale 0.92, rotate -8deg, opacity 0
- **End:** scale 1, rotate 0deg, opacity 1
- **Duration:** 0.9s
- **Ease:** power3.out
- **Stagger:** starts 0.1s after headline timeline begins
- **Desktop/Mobile:** same, mobile may reduce initial scale delta to 0.96 for subtlety at small size

### HERO-02 · Radar wheel idle rotation
- **Target:** outer ring group of `.radar-wheel`
- **Trigger:** on HERO-01 complete
- **Start:** rotate 0
- **End:** rotate 360
- **Duration:** ~90s
- **Ease:** none (linear)
- **Repeat:** -1 (infinite)
- **Desktop:** enabled
- **Mobile:** enabled but consider halving speed variance for battery/perf
- **Reduced motion:** disabled entirely (wheel stays static after entrance)

### HERO-03 · Radar wheel scroll-scrub
- **Target:** outer ring group of `.radar-wheel`
- **Trigger:** ScrollTrigger tied to hero section scroll
- **Start:** rotation at scroll-enter value
- **End:** +30deg additional rotation across hero scroll distance
- **Scroll behavior:** `scrub: true`
- **Desktop:** enabled
- **Mobile:** disabled (keep only HERO-02 idle spin)
- **Reduced motion:** disabled

### HERO-04 · Radar segment hover
- **Target:** individual segment path (e.g. `.segment-code`, `.segment-plan`)
- **Trigger:** pointerenter / pointerleave (via Observer or native listeners)
- **Start:** scale 1, base fill opacity
- **End:** scale 1.05, full fill opacity, center label crossfades to segment name
- **Duration:** 0.2s in / 0.25s out
- **Ease:** power1.out
- **Desktop:** enabled
- **Mobile:** replaced with tap-to-select (no hover state)

### HERO-05 · Headline line reveal
- **Target:** each `<span>` line inside H1 ("Ship Faster Without" / "Creating Release" / "Risk.")
- **Trigger:** page load, first in sequence
- **Start:** clip-path inset(100% 0 0 0) or yPercent 100, opacity 0
- **End:** clip-path inset(0), yPercent 0, opacity 1
- **Duration:** 0.6s per line
- **Ease:** power3.out
- **Stagger:** 0.08s between lines
- **Mobile:** identical, shorter travel distance

### HERO-06 · CTA entrance
- **Target:** "Explore Pipelines" button + "or scroll to services" link
- **Trigger:** on HERO-05 complete
- **Start:** y 12, opacity 0
- **End:** y 0, opacity 1
- **Duration:** 0.4s
- **Ease:** power2.out
- **Stagger:** 0.06s

### HERO-07 · Scroll-cue bob
- **Target:** down-arrow next to "or scroll to services"
- **Trigger:** on load, loops continuously
- **Start:** y 0
- **End:** y 4
- **Duration:** 0.6s
- **Ease:** sine.inOut
- **Repeat:** -1, yoyo true
- **Reduced motion:** disabled

### CAP-01 · Module list entrance
- **Target:** each `.module-row` in Capabilities left list
- **Trigger:** ScrollTrigger, `start: 'top 80%'`, once
- **Start:** y 20, opacity 0
- **End:** y 0, opacity 1
- **Duration:** 0.45s
- **Ease:** power2.out
- **Stagger:** 0.06s

### CAP-02 · Module select (Flip)
- **Target:** selected module icon → detail panel icon slot
- **Trigger:** click on module row
- **Mechanism:** GSAP Flip.getState before swap, Flip.from after DOM update
- **Duration:** 0.4s
- **Ease:** power2.inOut
- **Secondary:** detail-panel body content crossfade 0.25s, offset 0.1s after Flip starts

### CAP-03 · Stat tile count-up
- **Target:** "Avg Build Time" (1.4 min), "Cache Hit Rate" (98.5%)
- **Trigger:** on detail panel becoming active (first view or module switch)
- **Start:** 0
- **End:** target value
- **Duration:** 0.7s
- **Ease:** power1.out
- **Note:** run once per activation, not on every re-render

### CAP-04 · Tech chip stagger
- **Target:** integrated-technology chips (GitHub Actions, ArgoCD, Tekton, Dagger)
- **Trigger:** on detail panel change
- **Start:** y 8, opacity 0
- **End:** y 0, opacity 1
- **Duration:** 0.3s
- **Ease:** power1.out
- **Stagger:** 0.05s

### TECH-01 · Grid card entrance
- **Target:** each tech card in Tech Matrix 3x3 grid
- **Trigger:** ScrollTrigger, `start: 'top 80%'`, once
- **Start:** y 24, opacity 0
- **End:** y 0, opacity 1
- **Duration:** 0.45s
- **Ease:** power2.out
- **Stagger:** 0.05s

### TECH-02 · Status dot pulse
- **Target:** small colored status dot on each card + Node Inspector
- **Trigger:** continuous after TECH-01 completes
- **Start:** scale 1
- **End:** scale 1.15 → back to 1
- **Duration:** 1.6s
- **Ease:** sine.inOut
- **Repeat:** -1
- **Stagger:** `gsap.utils.random(0, 1.2)` per dot so they don't pulse in unison
- **Reduced motion:** disabled, dot stays static

### TECH-03 · Card → Inspector Flip
- **Target:** selected card's icon/category tag → Node Inspector header
- **Trigger:** card click
- **Mechanism:** Flip, same pattern as CAP-02 for cross-site consistency
- **Duration:** 0.4s
- **Ease:** power2.inOut

### TECH-04 · Cursor-follow card glow
- **Target:** radial gradient pseudo-element inside each card
- **Trigger:** `pointermove` within card bounds
- **Mechanism:** CSS custom properties (`--mx`, `--my`) updated directly, not GSAP tween, for performance
- **Desktop:** enabled
- **Mobile:** disabled (no pointer)

### CASE-01 · Methodology connector line draw
- **Target:** SVG/line element above the 01–06 step grid
- **Trigger:** ScrollTrigger across the methodology section
- **Start:** stroke-dashoffset = full path length
- **End:** stroke-dashoffset = 0
- **Scroll behavior:** scrub: true
- **Desktop:** horizontal line
- **Mobile:** vertical line, left-aligned, same technique rotated

### CASE-02 · Step card light-up
- **Target:** each numbered step card (01 Discovery ... 06 Continuous Improvement)
- **Trigger:** tied to CASE-01 scrub progress passing that card's position
- **Start:** muted border/number color
- **End:** accent border/number color
- **Scroll behavior:** scrub, matched to line progress

### CASE-03 · Terminal block type-on
- **Target:** command line text in case-study result blocks (e.g. `argo-canary-rollout.yaml`)
- **Trigger:** ScrollTrigger, `start: 'top 80%'`, once
- **Duration:** 0.4s
- **Ease:** none (linear reveal via steps or width clip)
- **Note:** one of the few places literal type-on fits — it's an actual terminal UI

### CASE-04 · Progress bar fill
- **Target:** green progress bar under each terminal block
- **Trigger:** on CASE-03 complete
- **Start:** width 0%
- **End:** target width (e.g. 95%, 100%)
- **Duration:** 0.6s
- **Ease:** power2.out

### CASE-05 · Challenge/Solution stagger
- **Target:** "[ Challenge ]" box then "[ Architectural Solution ]" box
- **Trigger:** ScrollTrigger, `start: 'top 85%'`, once
- **Start:** y 16, opacity 0
- **End:** y 0, opacity 1
- **Duration:** 0.4s each
- **Stagger:** 0.15s (Challenge first, Solution second — preserves narrative order)

### TELE-01 · Stat tile count-up
- **Target:** Deploy Queue (3), Active Incidents (0), Success Rate (99.98%), Avg Latency (42ms)
- **Trigger:** ScrollTrigger, `start: 'top 75%'`, once
- **Duration:** 0.7s
- **Ease:** power1.out
- **Stagger:** 0.08s across the 5 tiles

### TELE-02 · Horizontal metric bar fill
- **Target:** Build Duration, Test Coverage, Deploy Cadence bars
- **Trigger:** ScrollTrigger, `start: 'top 75%'`, once
- **Start:** width 0%
- **End:** target % (86%, 95%, 100%)
- **Duration:** 0.6s each
- **Stagger:** 0.1s, top to bottom
- **Ease:** power2.out

### TELE-03 · "Sample Telemetry Preview" badge shimmer
- **Target:** badge element
- **Trigger:** continuous, after TELE-01/02 complete
- **Mechanism:** gradient sheen translateX across badge
- **Duration:** 1.2s sweep
- **Repeat:** -1, `repeatDelay: 3`
- **Reduced motion:** disabled

### FORM-01 · Input focus glow
- **Target:** each `<input>`/`<textarea>` in the engagement form
- **Trigger:** focus / blur
- **Start:** default border/label color
- **End:** accent border + label color, low-opacity box-shadow
- **Duration:** 0.2s
- **Ease:** power1.out

### FORM-02 · Submit button hover/press
- **Target:** "Execute Pipeline Initiation" button
- **Trigger:** hover / mousedown
- **Hover:** background-position shift, icon nudges x+3
- **Press:** scale 0.98
- **Duration:** 0.2s hover, 0.1s press
- **Ease:** power1.out

### FORM-03 · Submit confirmation
- **Target:** traffic-light dots + button label + window border
- **Trigger:** successful form submit
- **Sequence:** dots flash green in sequence (0.1s stagger) → button label crossfade to confirmation text (0.25s) → window border glow pulse (0.4s, once)
- **Reduced motion:** dots/border skip animation, label swap remains (needed for feedback, not purely decorative)

---

## Global Reduced-Motion Rule
For every entry above marked with a Reduced Motion behavior, and for any not explicitly noted: when `prefers-reduced-motion: reduce` is set, replace scrub/parallax/idle-loop animations with instant state changes, and shorten all entrance durations to ≤0.15s crossfades. Count-ups and progress bars should jump directly to final values rather than animate.

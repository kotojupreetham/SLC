# 03 - Pipeline Motion, GSAP Reliability, and Accessibility

## Why this section matters

The pipeline dial is the visual signature of the site. It is also the component most likely to cause a bad experience through motion sensitivity, scroll traps, resize defects, poor mobile performance, or a mouse-only path. Treat it as a product feature with tests, not as isolated visual code.

## Current component

**File:** `src/components/InteractivePipeline.tsx`

Current behavior:

- Shows a small dial in the hero.
- CTA/wheel click scrolls to the section and activates a GSAP expansion.
- Temporarily locks `document.body` scrolling.
- Creates a pinned `ScrollTrigger` sequence with about 4,800 pixels of scroll distance.
- Rotates the wheel through eight stages and changes content state.
- Shrinks the dial at the end and restores hero content.

## Required reliability changes

### 1. Scope and clean up all GSAP work

Use `useGSAP` from `@gsap/react` or `gsap.context()` scoped to the component root. GSAP documents `context().revert()` as the way to clean up animations and ScrollTriggers created in a React scope.

Implementation intent:

- create a context for initial positioning/timelines;
- create/revert the scroll trigger within that scope;
- retain timer IDs in refs;
- clear timers in cleanup;
- restore the pre-existing body overflow value in cleanup;
- avoid mutating global document state when a local layout alternative is possible.

### 2. Separate state from animation

The active stage should be meaningful independent of the dial rotation.

- Keep `activeIndex` as the content state.
- Add an explicit function such as `selectStage(index)` that works for click, keyboard, and reduced motion.
- Let GSAP call `selectStage` while scrolling, rather than making the animation the only mechanism that changes content.
- Avoid creating a new tween on every pixel-level update. Change content only when the nearest stage index actually changes.

### 3. Handle responsive modes deliberately

The current `window.innerWidth` checks happen at particular times and can become stale after resize/rotation.

- Use `ScrollTrigger.matchMedia()` or an equivalent responsive setup.
- Define separate mobile and desktop layout values.
- Recalculate/end/rebuild triggers on breakpoint changes.
- Use `visualViewport` or resize testing to check browser chrome changes on mobile.
- Do not assume a 1,450px SVG will be readable or inexpensive on all devices.

### 4. Avoid scroll traps

- Do not lock body scrolling unless there is no alternative.
- If a short lock is retained, restore exact prior inline style in all cleanup paths.
- Never start a locked transition without a keyboard-visible escape/skip action.
- Check browser Back, hash navigation, and route remount behavior.

## Reduced-motion design: a first-class alternate mode

`prefers-reduced-motion` means people want non-essential motion reduced or replaced. It does not mean the feature itself may disappear.

### Recommended alternate interface

Render a static stepper at the same location as the dial:

```text
01 Plan     02 Code     03 Build     04 Test
05 Release  06 Deploy   07 Operate  08 Monitor

[Selected stage content: title, description, metric 1, metric 2]
```

Implementation guidance:

- Use real `<button>` controls inside a labelled list/tabpanel pattern, or simple buttons with clear selected state.
- Buttons must show focus, selection, and stage number without colour alone.
- Select the stage immediately or with a 100-150 ms opacity fade only.
- Do not pin scroll, rotate, scale the full viewport, or animate bouncing indicators in this mode.
- Offer a visible link to services/contact so visitors do not have to explore all stages.

## Keyboard and screen-reader behavior

### Baseline requirements

- Every action available by pointer must have an equally discoverable keyboard path.
- A clickable `div` is not enough for the dial. Prefer a real button for the CTA and real buttons for stage selection.
- Use `aria-current`, `aria-pressed`, or tabs/tabpanel semantics only when they match the actual behavior.
- Do not overuse `aria-live`; announce stage content only if it changes as the result of a deliberate user action.
- Focus should stay on the selected button when stage text changes. Do not forcibly move focus into the text panel.
- If a user activates "Skip lifecycle," take them to the next meaningful section and preserve logical focus.

### Focus styles

- Existing focus rings are a good start. Ensure they are not hidden behind glass, blur, or clipping containers.
- Use `:focus-visible`, not only hover styles.
- Test on dark background, high zoom, and high-contrast modes.

## Motion language

Use a small timing system instead of ad hoc values:

| Purpose | Duration | Example |
|---|---:|---|
| hover/focus acknowledgement | 160-220 ms | border/glow opacity shift |
| card/detail transition | 300-450 ms | crossfade and 4-8 px translate |
| lifecycle entrance | 700-1,000 ms | one intentional hero scene change |
| stage readout change | 180-280 ms | text opacity/translate only |

Avoid: perpetual bounce on important instructions, large scale/pan movement on every scroll, multi-second delayed interactions, and multiple competing pulsing elements.

## Manual QA cases

- [ ] Enable OS reduced motion before loading the page; activate pipeline CTA.
- [ ] Use only Tab, Shift+Tab, Enter, Space, and Escape where applicable.
- [ ] Resize desktop browser from 1440 px to 375 px while the dial is active.
- [ ] Rotate a phone from portrait to landscape if testing on real hardware.
- [ ] Click CTA repeatedly; ensure only one trigger/timeline is active.
- [ ] Navigate away/back during expansion; ensure page scroll works.
- [ ] Start at `/#pipeline` directly; ensure content is visible and not hidden by fixed navigation.
- [ ] Test with CPU throttling and a mid-range mobile profile.

## Useful sources

- GSAP cleanup guidance: https://gsap.com/docs/v3/GSAP/gsap.context%28%29/
- Reduced-motion behavior: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion
- Keyboard-accessible controls: https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/

# 08 - Testing, QA, and Release Gates

## Purpose

Visual polish is easy to regress. This project needs automated and manual checks that protect the actual business journey: understand offer -> explore proof -> contact SRE.

## Minimum automated quality gates

Run on every pull request and before production deployment:

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd audit --omit=dev
```

Add scripts incrementally for:

- Type checking if not fully enforced by build in the selected workflow.
- Unit tests for form schemas and helper logic.
- Browser smoke tests with Playwright or an approved equivalent.
- Optional bundle-size/performance regression reports.

## Recommended CI sequence

```text
checkout
install from lockfile
lint
type check
unit tests
production build
dependency audit
browser smoke tests against production build
upload useful test artifacts on failure
```

Never deploy based only on a local development server. Test the production build (`next build` then `next start`) or a production-equivalent preview.

## Browser smoke test scenarios

### Homepage and navigation

- Homepage renders without browser console errors.
- Main heading and primary CTA are visible.
- Header links navigate to the intended sections.
- Fixed header does not obscure anchor target headings.
- Mobile menu opens, exposes links, closes after a selection, and preserves keyboard behavior.

### Pipeline

- Primary CTA activates the normal-motion journey without creating a duplicate trigger.
- Skip action reaches services or a chosen next section.
- Each stage can be selected through the accessible controls.
- Reduced-motion path works without pinned scroll/large movement.
- Resize during/after activation does not leave content invisible or scroll locked.

### Forms

- Empty submit displays errors.
- Invalid email displays an error.
- Valid submission calls the server endpoint exactly once.
- Server validation failure renders a useful response.
- Provider/network failure preserves input and offers retry.
- Success state appears only after a successful mocked/real provider response.

### Content and metadata

- No default Next/Vercel placeholder assets appear publicly.
- Title and description are present.
- Open Graph image route/static asset returns successfully.
- `robots.txt` and sitemap are generated after added.
- 404 route remains styled and accessible.

## Manual accessibility QA

Run this before every important release. Use both Chrome and one alternative browser when possible.

### Keyboard-only pass

1. Start with mouse out of reach.
2. Use Tab to traverse the page.
3. Confirm every link, button, field, and visible interactive card can be reached.
4. Confirm focus is clearly visible against dark/glass surfaces.
5. Use Enter/Space to operate controls.
6. Confirm focus never becomes trapped in the menu, pipeline, or a temporary animation.
7. Confirm tab order follows reading order.

### Reduced-motion pass

1. Enable the operating-system/browser reduce-motion preference.
2. Reload the page.
3. Use primary CTA, lifecycle stages, services, and form.
4. Confirm content is not missing and no major scale/pan/scroll-scrub remains.
5. Confirm user-triggered changes are short/faded or instant, not vestibular movement.

### Mobile pass

Test at least:

- narrow phone viewport (roughly 360-390 px);
- common iPhone-sized viewport;
- tablet/landscape or a medium breakpoint;
- a physical mid-range Android device if available.

Check: no horizontal scrolling, usable buttons, readable labels, safe fixed header, dial does not cover copy, and form fields do not cause zoom/overlap.

### Visual integrity pass

- Check high contrast between text and background.
- Check selected state does not depend only on colour.
- Check glow/blur does not obscure focus outlines.
- Check text at browser zoom 200%.
- Check browser Back after navigation/activation.

## Suggested release checklist

### Before merge

- [ ] Scope is narrow and documented.
- [ ] No unrelated source files were rewritten.
- [ ] Lint/build/tests pass.
- [ ] New user-facing copy is approved or clearly marked draft.
- [ ] Screenshots/recording verify visual changes on desktop and mobile.

### Before staging signoff

- [ ] Form delivery reaches test destination.
- [ ] Reduced-motion and keyboard passes complete.
- [ ] Client verifies claims/case studies.
- [ ] Dependency audit result reviewed.
- [ ] Analytics/error monitoring behavior is understood.

### Before production

- [ ] Production domain and canonical URL correct.
- [ ] `robots` settings appropriate for production (not staging).
- [ ] Privacy/terms published if applicable.
- [ ] Form notification recipient monitored.
- [ ] Rollback owner and method known.
- [ ] Post-launch monitoring window scheduled.

## W3C references

- Accessibility fundamentals: https://www.w3.org/WAI/fundamentals/accessibility-principles/
- Visible keyboard focus: https://www.w3.org/WAI/WCAG22/Understanding/focus-visible
- Preliminary keyboard test steps: https://www.w3.org/WAI/test-evaluate/preliminary/

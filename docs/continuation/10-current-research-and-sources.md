# 10 - Current Research and Official Sources

## Research date and scope

This file records external guidance checked on **8 August 2026**. Framework versions, advisories, platform capabilities, and legal requirements change; a future developer should re-check time-sensitive topics before implementation.

## 1. Next.js production guidance

**Source:** https://nextjs.org/docs/app/guides/production-checklist

Key relevance to this project:

- Server Components reduce browser JavaScript; use Client Components only where interaction requires them.
- Forms should use server-side handling and validation.
- Production checklist calls out accessible error UI, metadata/SEO, CSP considerations, environment variable discipline, Core Web Vitals, and bundle analysis.
- The website should be tested with a production build, not only development mode.

Application here:

- keep GSAP/form selectors in client components;
- keep static case studies/process/UI primitives server-rendered where valid;
- build real server-side contact handling;
- add metadata/robots/sitemap/social assets;
- measure bundle impact before adding visual libraries.

## 2. GSAP React cleanup

**Source:** https://gsap.com/docs/v3/GSAP/gsap.context%28%29/

Key relevance:

- `gsap.context()` collects animations and ScrollTriggers created inside its callback.
- `context.revert()` provides an intentional cleanup mechanism.
- GSAP documents its React-oriented `useGSAP()` hook as handling setup/cleanup patterns.

Application here:

- refactor `InteractivePipeline.tsx` to scope/revert timelines;
- clear custom timers and restore document-level styles in cleanup;
- avoid keeping only a partial ScrollTrigger reference when a whole animation context exists.

## 3. Reduced motion

**Source:** https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion

Key relevance:

- Users can signal that nonessential movement should be minimised or replaced.
- Scaling and large panning can be especially problematic.

Application here:

- the pipeline must have an equivalent static stepper/tab path;
- global CSS reduction is helpful but not sufficient when JavaScript hides/requires content behind an animation;
- no large dial expansion, pinned scroll, or bouncing instructions in the reduced-motion path.

## 4. Keyboard access and focus

**Sources:**

- https://www.w3.org/WAI/fundamentals/accessibility-principles/
- https://www.w3.org/WAI/WCAG22/Understanding/focus-visible
- https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/

Key relevance:

- Functionality available by mouse should also be available by keyboard.
- Keyboard focus must be visible and should follow a meaningful order.
- Rich controls need predictable focus and selection behavior.

Application here:

- use real buttons/links for the lifecycle actions;
- retain obvious focus rings against glass/dark surfaces;
- ensure mobile menu, services, technology cards, lifecycle stages, and form actions work with keyboard;
- never leave focus trapped by animation/scroll control.

## 5. Web performance measurement

**Sources:**

- https://nextjs.org/docs/app/guides/analytics
- https://web.dev/articles/defining-core-web-vitals-thresholds
- https://nextjs.org/docs/pages/guides/package-bundling

Key relevance:

- Core Web Vitals focus on LCP, INP, and CLS.
- Field data is needed to understand real visitor experience.
- Bundle analysis helps find client modules/dependencies that inflate JavaScript.

Application here:

- measure real user performance after launch;
- test animation smoothness on lower-power devices;
- carefully assess libraries added for background effects, scheduling, analytics, or visual polish;
- lazy-load only when doing so does not degrade first interaction.

## 6. Input validation and content security policy

**Sources:**

- https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html
- https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html

Key relevance:

- All input from browsers is untrusted and must be validated server-side.
- Validation does not replace contextual output encoding.
- CSP is best deployed with a clear resource inventory; report-only mode can help tune policy before enforcement.

Application here:

- formalise form schema and safe provider email rendering;
- keep client text out of unsafe HTML;
- identify legitimate third-party script/connect/frame needs before applying CSP;
- avoid overly permissive wildcard/unsafe rules as a default.

## Research limitations

- This research does not replace legal advice for privacy/cookies/terms.
- It does not choose a CRM, email, analytics, or hosting provider; those choices require client authority.
- Vulnerability findings should be refreshed at implementation time using a real audit and release notes.
- Browser/device compatibility must be validated against the client’s real audience and supported-browser policy.

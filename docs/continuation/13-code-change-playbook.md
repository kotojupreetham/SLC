# 13 - Code Change Playbook (When Editing Begins)

## Purpose

This is a practical engineering playbook for implementing the documented improvements safely. It does not change the code itself.

## Before touching code

```powershell
git status --short
rg --files -g '!node_modules' -g '!*.lock'
npm.cmd run lint
npm.cmd run build
```

Review the current source first. The project may have changed since this documentation was written.

## Pattern: server-side contact form

### File plan

```text
src/app/actions/contact.ts              Server Action option
or
src/app/api/contact/route.ts            Route Handler option

src/lib/contact-schema.ts               Shared validation schema (server-safe)
src/lib/contact-delivery.ts             CRM/email provider adapter (server-only)
src/components/ContactNode.tsx          Client UI integration
tests/contact*.test.ts                  Validation/delivery tests
```

### Design principles

- Keep provider-specific code behind a small server-only adapter.
- Keep client response payloads minimal and generic.
- Do not import a secret-bearing module in a client component.
- Distinguish field errors (safe to show) from system errors (generic to user, detailed in protected logs).
- Ensure fields have names, labels, autocomplete where appropriate, and errors associated to inputs.

## Pattern: robust GSAP component

### File plan

```text
src/components/InteractivePipeline.tsx
src/components/PipelineStageNavigator.tsx   Optional static/reduced-motion control
src/lib/motion.ts                            Optional shared durations/easings
```

### Implementation principles

- Register plugins in a safe client context.
- Scope every tween/timeline/ScrollTrigger to component root via `useGSAP` or `gsap.context`.
- Revert context during cleanup.
- Store timeout IDs and clear them.
- Store previous global styles before changing them and restore them in cleanup.
- Create static stage data UI that can select a stage without GSAP.
- Use one source of truth for stage index.
- Separate desktop/mobile trigger setup with match-media style logic.

## Pattern: metadata and SEO routes

### File plan

```text
src/app/layout.tsx
src/app/robots.ts
src/app/sitemap.ts
src/app/manifest.ts
src/app/opengraph-image.tsx   or approved static image asset
src/app/icon.png             or file-based icon asset set
```

### Implementation principles

- Do not hard-code a fake production domain.
- Use environment/config only when the hosting/domain setup is agreed.
- Keep staging indexed only if explicitly desired; usually preview/staging should not be indexed.
- Test metadata output on a deployed preview.

## Pattern: icon system

### File plan

```text
src/lib/icons.tsx
src/data/services.ts
src/components/EngineeringDashboard.tsx
```

### Implementation principles

- Data stores stable string key, not executable component.
- Icon map converts key to Lucide component.
- Missing icon key gets safe fallback.
- Use consistent sizing and stroke rules.
- Icons supplement visible text; they never replace accessible labels.

## Pattern: active section navigation

### File plan

```text
src/components/Header.tsx
src/hooks/useActiveSection.ts     Optional
src/app/globals.css
```

### Implementation principles

- Use `IntersectionObserver` instead of a continuous scroll listener.
- Do not change URL/hash repeatedly while merely scrolling unless deliberate and tested.
- Apply `scroll-margin-top` to anchored sections to account for fixed header.
- Ensure selection is not only a colour change.

## Verification after any code change

1. Read changed files and type errors carefully.
2. Run lint.
3. Run production build.
4. Run affected unit/browser tests.
5. Start production build for manual QA where possible.
6. Test normal motion, reduced motion, keyboard, mobile viewport, and error path if the change affects them.
7. Update the relevant continuation file with a dated implementation note and residual risks.

## Useful update-note template

```md
### 2026-MM-DD - [Short implementation title]

- Implemented:
- Files changed:
- Verification run:
- Known limitation / follow-up:
- Client decision still required:
```

## Avoidable mistakes

- Changing Next.js version and major motion architecture in the same untested PR.
- Building CRM integration before client chooses data owner/recipient.
- Adding analytics before deciding consent/region requirements.
- Disabling all animation globally without providing a complete reduced-motion interface.
- Replacing native buttons with role-based custom controls where a button would do.
- Importing a large animation/visual package without checking bundle impact.
- Calling a Route Handler from a Server Component when direct server data access would be simpler.

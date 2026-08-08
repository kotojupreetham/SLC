# 00 - Current State and Engineering Context

## Project facts

- **Repository:** `C:\Project\sre-website`
- **Framework:** Next.js 15 App Router
- **Language:** TypeScript with `strict: true`
- **UI:** React 19, Tailwind CSS v4, Lucide React
- **Motion:** GSAP 3, ScrollTrigger, `@gsap/react` installed
- **Primary product:** single-page, premium lead-generation website for Smarter Release Engineering
- **Main audience:** engineering leaders who need more reliable release delivery, CI/CD, platform engineering, DevSecOps, and observability

## Last verified build condition

At the last review:

- `npm.cmd run lint` passed.
- `npm.cmd run build` passed.
- Homepage was statically generated.
- Last build report showed 65.5 kB page JavaScript and 168 kB first-load JavaScript for `/`.
- `npm.cmd audit --omit=dev` reported three high-severity production dependency findings in the installed Next.js dependency path. Always re-run the audit before acting; vulnerability data is time-sensitive.

## Key files and ownership

| File | Responsibility | Risk / note |
|---|---|---|
| `src/app/page.tsx` | Composes the one-page site | Mostly stable; defines section anchors |
| `src/app/layout.tsx` | Fonts and metadata | Needs production metadata expansion |
| `src/app/globals.css` | Global theme and ambient effects | Contains probable dead styles from earlier iterations |
| `src/components/InteractivePipeline.tsx` | Hero, lifecycle dial, GSAP scene | Highest functional, accessibility, and performance risk |
| `src/components/ContactNode.tsx` | Contact form | Does not send data; launch blocker |
| `src/components/Header.tsx` | Fixed navigation | Needs anchor-offset and active-section refinement |
| `src/components/EngineeringDashboard.tsx` | Interactive services | Good visual base; needs outcome framing |
| `src/components/TechEcosystem.tsx` | Interactive technology matrix | Good visual base; needs deeper architecture narrative |
| `src/components/ControlRoom.tsx` | Static metric display | Must not be presented as live unless connected to real data |
| `src/components/DeploymentStories.tsx` | Case studies | Claims require approval and evidence |
| `src/data/*.ts` | Typed static content | Move to owned content workflow when client starts updating copy |
| `src/hooks/useReducedMotion.ts` | Detects motion preference | Works as detection; consuming logic needs a usable fallback |

## Known defects and risks

### Contact data is lost

`ContactNode.tsx` only validates a few client fields and changes React state to success. It does not call an API, Server Action, CRM, email provider, or database. Visitors are told their payload was received even though nothing is transmitted.

### Reduced-motion CTA fails

`InteractivePipeline.tsx` sets activation state from the CTA, but exits its activation effect when reduced motion is preferred. This leaves no equivalent content transition or usable alternate interface.

### Scroll can remain locked

The pipeline temporarily sets `document.body.style.overflow = "hidden"`. Cleanup only clears a timer and does not guarantee restoration when unmounting, re-running an effect, or interrupting the animation.

### The dial is an unusually expensive interaction

It uses a large SVG wheel, pinned scroll, shadow/filter effects, background blurs, and state updates during animation. It needs low-end device testing and a short/optional route through the content.

### Credibility gap

The site describes real-time telemetry and secure transmission but currently renders hardcoded values and has no transmission implementation. Case-study figures are visually strong but need client approval and evidence before public use.

### Launch delivery gaps

No test suite, CI workflow, monitoring configuration, sitemap, robots file, social image, legal/privacy content, or visible content governance process was found. README claims MIT license but no license file was found at last review.

## Non-negotiable development rules

1. Check `git status --short` before editing. Preserve user work.
2. Use `npm.cmd`, not `npm`, in PowerShell on this machine because the execution policy may block `npm.ps1`.
3. Keep server-only credentials out of any variable named `NEXT_PUBLIC_*`.
4. Validate untrusted form data on the server; client validation is UX only.
5. Use real `<button>` and `<a>` elements for all discoverable actions whenever possible.
6. Treat reduced motion as an alternate user journey, not merely "animation off".
7. Run lint and build after every meaningful change. Add automated tests before declaring a critical flow complete.

## Design stance

The dark, precision-engineering style is worth preserving. Quality will come from restraint:

- one primary visual story in a viewport;
- calm reading surfaces around interactive pieces;
- one accent color at a time for selected status;
- motion that explains a process or acknowledges action;
- verified evidence over exaggerated dashboard theatre.

## Do not do these things

- Do not add a carousel because a section feels empty.
- Do not add floating animated objects on every section.
- Do not convert static data into an apparent live dashboard without a real data source.
- Do not use a fake terminal interaction as the only contact experience.
- Do not force visitors through the lifecycle animation before showing services or contact options.
- Do not dismiss accessibility feedback because the visual experience is intended for technical users.

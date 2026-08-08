# 01 - Launch Foundation: What Must Work Before Public Promotion

## Objective

Turn the current visual prototype into a trustworthy public website. This phase is about functional integrity, evidence, and user trust; it is not a visual redesign.

## Release gate A: must be complete before a campaign or public launch

### 1. Real contact delivery

- Create a server-side endpoint or Server Action.
- Apply schema validation and length limits on the server.
- Deliver the lead to a client-owned destination: CRM, monitored inbox, database, or a combination.
- Implement success, loading, validation-error, network-error, and retry states.
- Confirm a real submission end-to-end from production or staging.

**Owner to decide before implementation:** the CRM/email destination, notification recipients, retention period, and response-time promise.

### 2. Reduced-motion and keyboard completion

- The hero CTA must open equivalent pipeline content when reduce-motion is enabled.
- The lifecycle must be skippable.
- Selected stage controls must work by keyboard.
- The fixed navigation and mobile menu must show clear focus and preserve a logical tab sequence.
- No animation can trap or hijack scrolling.

### 3. Claims and content approval

- Mark sample telemetry as illustrative, or wire it to real data with an availability/failure state.
- Approve every case-study metric, customer category, and technology claim.
- Remove or revise "secure transmission" until a secure workflow exists.
- Remove or revise response-time promises until someone owns the service level.

### 4. Security and deployment hygiene

- Re-run dependency audit and remediate high/critical production issues.
- Use environment variables only on the server for form/CRM credentials.
- Define host/platform, production domain, and deployment approvals.
- Add a basic Content Security Policy in report-only mode first; make it enforced only after testing integrations.

### 5. Publishing essentials

- Metadata title, description, canonical URL, social sharing image, and favicons.
- `robots.ts` / `sitemap.ts` for the final public domain.
- Privacy policy and required business/terms content reviewed by the client.
- Analytics and error monitoring with consent requirements understood.

## Suggested small implementation sequence

Do not merge all of this in one change. Use a small, reviewable series.

1. **Form design decision:** document CRM/provider, retention, privacy text, alert recipient, and throttle policy.
2. **Form endpoint:** add schema, server action/route handler, error response contract, and integration tests.
3. **Contact UI:** wire submission, loading, success/failure states, consent link, and accessibility copy.
4. **Pipeline reliability:** repair cleanup and create the reduced-motion/static stage navigator.
5. **Content truth pass:** add labels, remove unsupported wording, and obtain client approvals.
6. **Metadata/legal pass:** create publishing assets and routes.
7. **CI/test pass:** add regression tests and release commands.
8. **Staging signoff:** test real form delivery and all principal user journeys.

## Minimum staging acceptance scenarios

| Scenario | Expected result |
|---|---|
| Valid contact submission | Data reaches destination once; user sees truthful confirmation |
| Invalid email or empty details | Helpful inline error; no server delivery |
| Network/API failure | Input remains; user gets a retry action; no fake success |
| Keyboard-only journey | Header, sections, selections, form, and submit work without mouse |
| Reduced-motion journey | CTA shows useful pipeline summary; no major movement/scroll pin |
| Small mobile viewport | Hero and contact are readable; menu works; no overlapping dial content |
| Interrupted animation | Scroll remains available after back navigation, route change, or resize |
| Social share | Correct title, description, image, and URL appear in a preview tool |

## Client decisions that should not be guessed

- What lead-management system should own form submissions?
- Which regions/markets will receive the site and what privacy law applies?
- Are the existing case-study results approved for public use?
- Is the control room intended as a demo, a sample, or a real client-specific dashboard?
- Is calendar scheduling preferable to a form, or should both options be present?
- What is the actual response-time commitment?
- Who receives error alerts if the lead endpoint fails?

## Definition of launch-ready

The site is launch-ready when visitors can understand the offer and submit a lead without relying on animation; every submission is processed; all key interactions work with keyboard/reduced motion/mobile; public promises are defensible; and automated checks protect the production build.

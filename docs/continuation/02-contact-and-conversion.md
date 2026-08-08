# 02 - Contact, Lead Capture, and Conversion Design

## Product goal

The contact section should turn interest into a trustworthy next step. The technical terminal shell can remain part of the brand, but it must never make the interaction unclear, intimidating, or fake.

## Current issue

`src/components/ContactNode.tsx` currently performs only local client-side state changes. It does not send data anywhere. This must be treated as a missing feature, not as a cosmetic improvement.

## Recommended form model

### Fields

Keep the initial request low-friction:

1. Name / organisation — required
2. Work email — required
3. What are you trying to improve? — required, multi-line
4. Optional: company size, delivery challenge, or preferred contact method
5. Privacy consent / link — required when legal basis or provider requires it
6. Hidden honeypot field — never label it or include it in user-facing flow

Avoid requiring detailed infrastructure topology, production credentials, source code, or sensitive incident information on a marketing form.

## UX behavior

### Idle state

- Heading: "Start a release reliability assessment"
- Supporting copy: state what happens after submission in one plain sentence.
- Keep terminal styling in the container, not in the task wording.
- Use a real `Submit` button. The visual label can be technical, but it must remain understandable.

### Client-side validation

- Validate empty fields and clearly malformed email format before sending.
- Put an error message next to or immediately after the relevant field.
- Use `aria-describedby` to associate errors with their input.
- Move focus to the first invalid field after submission.

### Submitting state

- Disable the submit button to prevent duplicate sends.
- Use a text status such as "Sending request..."; do not rely on a spinner alone.
- Preserve the entered text if a request fails.

### Success state

Only show after the provider/CRM confirms receipt.

Suggested truthful wording:

> Thanks — your request has been sent to the SRE team. We will review it and reply through the email address you provided.

If a response target is real and staffed, add it precisely: "We usually reply within one business day." Do not claim a 24-hour response by default.

### Failure state

Suggested wording:

> We could not send your request just now. Your details are still in this form. Please try again, or email us at [approved address].

Provide an error reference only if it can help support investigate without exposing provider internals.

## Server-side design options

### Option A: Server Action

Good for a simple Next.js-owned form with no need for a public JSON API.

- Create a separate server-only action module, for example `src/app/actions/contact.ts`.
- Validate `FormData` with Zod (or approved equivalent).
- Call the CRM/email/database from the server.
- Return an intentionally small result object: `{ ok: true }` or `{ ok: false, fieldErrors, formError }`.

### Option B: Route Handler

Good when an API contract, webhook integration, or multiple clients are required.

- Create `src/app/api/contact/route.ts`.
- Accept JSON or form data, validate it, and return clear status codes.
- Apply rate limiting based on IP/session proxy data according to hosting platform guidance.
- Never expose internal provider error messages to the browser.

## Security controls

- Validate all values on the server, even if the client validates too.
- Set length limits to prevent log, email, or provider abuse.
- Use rate limiting and an abuse strategy appropriate to actual traffic.
- Add honeypot and consider CAPTCHA only if spam warrants its UX cost.
- Send emails as plain text or safely escaped HTML; never render user message content as raw HTML.
- Keep provider keys in server-only environment variables.
- Log only the minimum useful diagnostic data; avoid saving full message content in general-purpose error logs.
- Define retention/deletion handling with the client before storage begins.

## Conversion additions worth considering

### A. Book a short assessment

Offer a calendar link beside the form for visitors who are ready to talk. Do not embed a large third-party scheduler above the form if it hurts initial page performance.

### B. Low-friction diagnostic

Offer an optional downloadable "Release Reliability Checklist" after a successful form submission. This gives a real next step and can improve perceived value.

### C. Decision-path CTAs

Use two CTA paths where appropriate:

- "Talk to an SRE architect" — human consultation
- "Explore delivery capabilities" — information journey

Avoid multiple competing primary buttons in the same visual group.

### D. Trust cues

Use only approved and specific proof:

- response expectation, if real;
- privacy statement;
- relevant certifications, only if held;
- client logos/testimonial proof, only with permission;
- an explicit "No production credentials required" reassurance, if helpful.

## Metrics to track after launch

Track events with privacy/legal approval:

- hero primary CTA click
- lifecycle skip / complete
- service selection
- contact section view
- form start
- validation error
- submit attempt
- successful delivery
- delivery failure
- calendar-link click

Use the data to find friction. Do not optimise by adding intrusive popups before understanding where users exit.

## Acceptance checklist

- [ ] Provider/CRM destination is client-owned and documented.
- [ ] Submission is validated server-side.
- [ ] Submission is rate-limited and protected from basic bot abuse.
- [ ] Success only appears after confirmed delivery.
- [ ] Failure retains the visitor's input and provides a practical recovery route.
- [ ] Keyboard/screen-reader error behavior is tested.
- [ ] Privacy copy and retention policy are approved.
- [ ] End-to-end staging test reaches a real monitored recipient.

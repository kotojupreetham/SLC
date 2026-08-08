# 07 - Security, Privacy, and Operational Trust

## Scope

The current static marketing site has a relatively small attack surface. Adding a contact workflow, analytics, CRM integration, scheduling tools, or live telemetry will expand that surface. Add security controls as each capability is introduced instead of retrofitting them after launch.

## Current security observations

- No server contact endpoint or secret-bearing integration is currently present.
- Form data is not sent anywhere, which prevents exposure but also means the business function is missing.
- `.gitignore` excludes `.env*`, which is correct. Future contributors must keep credentials server-only.
- A dependency audit reported high-severity production concerns through the installed Next.js dependency path at last review. This needs a versioned, tested remediation.

## Contact endpoint security checklist

### Input handling

- Treat every browser field as untrusted.
- Validate type, format, requiredness, and maximum length server-side.
- Use allow-list validation where a constrained set of values is expected.
- Encode any user text for its output context; validation alone does not prevent XSS if text is later rendered.
- Do not send unescaped form content into HTML email templates.

### Abuse prevention

- Add a minimum rate limit tied to trustworthy request attributes for the hosting platform.
- Add a honeypot field first; consider CAPTCHA only after assessing spam volume and regional usability.
- Avoid detailed validation errors that help attackers test infrastructure.
- Return generic internal errors to users and keep diagnostic details in protected logs.

### Secrets and data flow

- Keep provider API keys in non-public environment variables.
- Do not expose API keys, CRM IDs with privileged access, or private webhooks in client bundles.
- Document each destination: what data goes there, why, which region, who can access it, and how long it is retained.
- Keep marketing data separate from production-client operational data.

## Security headers plan

Introduce headers carefully, test preview/staging, then enforce.

### Content Security Policy (CSP)

Start with `Content-Security-Policy-Report-Only` when third-party integrations are added. Observe what must be allowed, then move to an enforced policy.

Topics to define:

- `default-src`
- `script-src`
- `style-src`
- `img-src`
- `connect-src`
- `frame-src` (only if calendar/video/embedded tools require it)
- `frame-ancestors`
- `form-action`
- report endpoint, if an approved reporting system exists

Do not copy a permissive `unsafe-inline` / wildcard policy without understanding why each exception exists. GSAP itself should not require arbitrary third-party script sources when bundled through the app.

### Other headers to assess with hosting platform

- HTTPS enforcement / HSTS
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy`
- `Permissions-Policy` for features the site does not use
- clickjacking protection through CSP `frame-ancestors`

Avoid adding obsolete or conflicting headers blindly; confirm platform defaults and integration needs.

## Dependency management

### Immediate process

1. Run `npm.cmd audit --omit=dev`.
2. Record package, severity, advisory URL, exploit conditions, fixed version, and owner.
3. Upgrade in a dedicated change.
4. Run lint/build/tests and manually test the hero/pipeline after updating Next.js.
5. Re-run audit; document any temporary accepted risk with a review date.

### Ongoing process

- Enable automated update PRs or scheduled review.
- Keep `package-lock.json` committed and reviewed with dependency upgrades.
- Do not use `npm audit fix --force` as a substitute for understanding a major-version change.
- Monitor framework release notes for security updates.

## Privacy and legal preparation

This is not legal advice. Client/legal owner must decide the final policy.

Document before collecting leads:

- legal entity operating the website;
- contact email/address;
- data collected and purpose;
- lead destination providers/subprocessors;
- retention period and deletion request path;
- legal basis/consent requirements by visitor region;
- cookies/analytics/error-monitoring use;
- international transfer implications;
- response owner for privacy requests.

UI implications:

- Link to privacy notice at the form.
- Use a consent checkbox when required by the chosen legal basis/tooling.
- Do not pre-check optional marketing consent.
- Add analytics/cookie consent where required; do not load nonessential tracking before valid consent if applicable.

## Incident/operational ownership

Before public launch, write down:

- who receives failed form alerts;
- who can rotate provider keys;
- who approves customer claims;
- who can publish/rollback the site;
- how a bad public claim or broken form is corrected urgently;
- escalation contact for hosting/domain outages.

## Sources

- OWASP input validation: https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html
- OWASP CSP guidance: https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html
- Next.js production/security guidance: https://nextjs.org/docs/app/guides/production-checklist

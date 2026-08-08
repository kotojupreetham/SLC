# 05 - Content, Proof, SEO, and Public Credibility

## Core position

The site should sell outcomes, not only engineering aesthetics. A technical buyer needs to answer five questions quickly:

1. What problems does SRE solve?
2. Is SRE credible for a company like mine?
3. How does the approach work?
4. What evidence supports the claims?
5. What is the safest next step?

## Copy hierarchy for the current one-page site

### Hero

**Job:** state outcome and audience.

Suggested structure:

- Eyebrow: `Smarter Release Engineering`
- Headline: outcome-led, concise, non-generic
- Supporting copy: what SRE actually designs/implements
- Primary CTA: talk/book assessment
- Secondary CTA: explore lifecycle
- Proof strip: only verified capabilities

Draft direction, to be client-approved:

> Ship faster without creating release risk.

> SRE designs the delivery systems, guardrails, and observability that make reliable software releases repeatable.

Avoid claims such as "zero downtime" or "guaranteed reliability" unless contractual scope and technical evidence support them.

### Services

Each service needs the same answer pattern:

```text
What it is
Best for
What SRE changes
What the client gains
Core technologies/frameworks
```

Example information pattern:

> Release Engineering
> Best for teams with long deployment windows, manual release gates, or unstable rollout procedures.
> SRE designs progressive delivery patterns, automation, and rollback controls.
> Outcome: more frequent releases with a lower and more visible risk profile.

### Pipeline

The eight stages should teach a framework, not merely display labels.

For every stage add:

- **Input:** what enters the stage
- **Control:** policy/automation/guardrail applied
- **Result:** the measurable state that should exit the stage

This makes the dial useful in a sales conversation and more credible to an engineering leader.

### Case studies

Use this client-approval template:

```text
Client context
Challenge
Baseline / constraints
What SRE changed
Duration and scope
Measured outcome
Client-approved attribution or anonymisation rationale
```

Do not publish a metric unless its source, period, and definition are known. For example, "deployment time reduced by 80%" is incomplete unless it identifies the before/after measurement and relevant scope.

### Control room

Choose one of two honest paths:

**Path A: sample dashboard**

- Rename heading: "Example operating dashboard" or "Illustrative delivery telemetry".
- Explain that metrics are an example of what SRE helps teams observe.
- Keep it static and fast.

**Path B: live demo data**

- Define a secure data source and service ownership.
- Disclose refresh time and sample/demo status.
- Create loading, empty, unauthorized, and failure states.
- Do not make live client production data public by accident.

## Proof assets to add gradually

Prioritise strong evidence over quantity.

1. One approved customer quote with real name, role, company, and permission.
2. Two approved case studies with clear before/after context.
3. One anonymised architecture diagram or delivery maturity model.
4. A simple engagement process/timeline.
5. Approved partner, technology, or certification badges only when valid.
6. A downloadable diagnostic/checklist only after form delivery and privacy handling are ready.

Avoid:

- anonymous generic testimonials;
- made-up client logo walls;
- unsupported security/compliance logos;
- benchmarks without a source;
- stock photos used in place of actual proof.

## SEO and metadata implementation plan

### Existing state

`src/app/layout.tsx` defines basic title, description, and Open Graph title/description. It does not yet establish a production URL, full social metadata, a custom social image, sitemap, robots policy, or a manifest.

### Recommended files to add when the final domain is known

| File | Purpose |
|---|---|
| `src/app/robots.ts` | Allow/block crawler paths and point to sitemap |
| `src/app/sitemap.ts` | Generate canonical indexable URLs |
| `src/app/manifest.ts` | Web app name, theme colors, and icons |
| `src/app/opengraph-image.tsx` | Generate a branded social image, or use approved static asset |
| `src/app/icon.png` / icon assets | Browser and device brand identity |
| `src/app/privacy/page.tsx` | Privacy policy content, if approved |
| `src/app/terms/page.tsx` | Terms/content legal route, if required |

### Metadata checklist

- [ ] `metadataBase` matches final canonical domain.
- [ ] Homepage title includes brand + meaningful service outcome.
- [ ] Description is human-written and reflects actual offer.
- [ ] Open Graph title, description, URL, type, and image are complete.
- [ ] Twitter/X card metadata is configured if relevant to client channels.
- [ ] `robots.ts` does not accidentally index staging/previews.
- [ ] `sitemap.ts` contains only public canonical pages.
- [ ] Favicon and manifest use real SRE assets.
- [ ] Add organisation/person structured data only after facts are verified.

## Social image direction

Do not simply screenshot the website. Create a high-contrast, minimal 1200 x 630 brand image:

- dark navy background;
- simplified lifecycle arc or signal line;
- brand name;
- short outcome-led headline;
- no small paragraph text;
- no unverified certifications or metrics.

## Content governance model

For each public claim, store:

- owner;
- source/evidence;
- approval date;
- expiry/review date;
- public wording;
- restrictions (e.g., anonymous, regional, customer approval required).

This can begin as a Markdown/CSV sheet and later move to a CMS. The important part is ownership, not tooling.

## Source references

- Next.js production checklist: https://nextjs.org/docs/app/guides/production-checklist
- Next.js Metadata API: https://nextjs.org/docs/15/app/api-reference/functions/generate-metadata
- Next.js manifest file convention: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest

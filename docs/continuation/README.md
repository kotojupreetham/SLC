# SRE Website Continuation Pack

This folder is the detailed, split handoff for future work on the SRE website. It exists so a future developer, AI agent, or collaborator can resume without re-auditing the entire codebase.

## How to use this pack

1. Read `00-current-state.md` for project facts and the non-negotiable rules.
2. Complete the files in numeric order through the launch foundation work.
3. Use the visual and performance files only after the functional work is complete.
4. Before every pull request or deployment, use `08-testing-and-release-qa.md`.
5. Record implementation decisions or completed items by appending short dated notes to the relevant file. Do not silently delete unresolved risks.

## Work order

| Order | File | Purpose |
|---:|---|---|
| 0 | `00-current-state.md` | Architecture, facts, constraints, and known defects |
| 1 | `01-launch-foundation.md` | Public-launch blockers and sequencing |
| 2 | `02-contact-and-conversion.md` | Real lead capture, CRM delivery, copy, and conversion |
| 3 | `03-pipeline-motion-accessibility.md` | GSAP reliability, reduced motion, keyboard behavior |
| 4 | `04-premium-visual-system.md` | Background animation, transitions, icons, visual direction |
| 5 | `05-content-proof-and-seo.md` | Credibility, case studies, metadata, and publishing assets |
| 6 | `06-performance-and-architecture.md` | Bundle, rendering, responsive behavior, code health |
| 7 | `07-security-and-privacy.md` | Dependency, form, headers, and data-handling controls |
| 8 | `08-testing-and-release-qa.md` | Tests, release gates, and manual acceptance checklist |
| 9 | `09-implementation-backlog.md` | Small ticket-sized backlog with dependencies and outcomes |
| 10 | `10-current-research-and-sources.md` | Official sources and research notes verified in August 2026 |
| - | `NEXT_AGENT_PROMPT.txt` | Copy/paste kickoff prompt for another AI/developer |

## Important boundaries

- The current website is a premium marketing/consultancy experience, not an operational SRE dashboard.
- Preserve the dark control-room identity and signature lifecycle dial unless the client asks for a brand reset.
- Do not represent static demo content as live telemetry.
- Do not promise secure submission, response times, certifications, customer results, or compliance outcomes without evidence and operating support.
- Do not add nonessential animation that harms performance, mobile use, keyboard operation, or reduced-motion access.

## Existing companion documents

- `PROJECT_IMPROVEMENT_HANDOFF.md` at the repository root is the original high-level handoff.
- `outputs/SRE_Website_Production_and_Premium_Experience_Roadmap.docx` is the presentation-ready client roadmap.

This split pack is the more detailed technical source of truth.

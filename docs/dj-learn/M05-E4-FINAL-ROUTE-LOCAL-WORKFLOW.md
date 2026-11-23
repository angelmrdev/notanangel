# M05-E4 — Final-route local authoring (first finished lesson)

## Purpose

Author **on the real Learn to DJ URLs**, in the working monorepo, while keeping the existing complete-bilingual-publication protection **unchanged in production**. No fake Spanish translation, published manifest status, or release-gate bypass in production.

## Files

- `apps/web/lib/learn/repository.ts`: development-only projection of complete English draft modules into the existing route views. This is explicitly limited to `NODE_ENV === "development"`. Normal production reads only `published` manifest entries and validates full ready EN+ES content.
- `apps/web/app/(en)/learn-to-dj/[module]/page.tsx` and `[lesson]/page.tsx`: mark local development routes `noindex` in metadata.
- `apps/web/components/learn/lesson-visuals.tsx` + `.module.css`: four original accessible, responsive visuals for the DJ introduction.
- `apps/web/components/learn/educational-components.tsx`: register visuals with the existing MDX renderer.
- `apps/web/content/learn/en/lessons/dj-01-001.mdx`: integrate graphics without deleting editorial paragraphs, tables, exercises, FAQs or references.

## Local URLs

- `/learn-to-dj/` (the real course index)
- `/learn-to-dj/dj-basics/` (the real module hub)
- `/learn-to-dj/dj-basics/what-is-a-dj/` (the first fully designed lesson)

The other five English module-01 lessons appear in navigation as **existing content**, not as visually completed lessons. Spanish routes remain unavailable until localized; do not invent or enable Spanish placeholders. Module 02 existing English content may also be browsed in `next dev` if complete.

## Safety and release

- Leave `apps/web/config/dj-learn-curriculum.json` at `draft`.
- Do not mark any lesson `ready` in this patch.
- Do not expose a dev server publicly; it is not access-controlled.
- A later commit containing this code while the manifest remains `draft` does **not** publish these modules in production.
- Production behavior and static export are unchanged by the development-only projection.
- Launch only after original EN/ES material passes editorial, technical and accessibility checks. The final manifest edit will be a separate explicit publishing operation.

## Verification

1. Extract at monorepo root **after M05-E3 and the M05-E2 runtime fix**. All listed paths are repo-relative.
2. `pnpm --filter @naa/web typecheck`
3. `pnpm --filter @naa/web lint`
4. `pnpm --filter @naa/web learn:validate` (expected 0 published bilingual modules)
5. `pnpm --filter @naa/web build` (production should exclude draft modules)
6. `pnpm --filter @naa/web dev`, then view the final URLs above.
7. Check the five diagrams in first lesson, keyboard focus, mobile width, FAQ/reference section, and no article text lost.

## Visual work done for DJ-01-001

- Workflow of five DJ skills, represented as semantic list cards.
- Two independent decks and audience/master versus private/cue paths.
- Four DJ role cards.
- Four-stage illustrative energy curve for a small party.
- Exercise readiness checklist.

These are **original CSS/HTML teaching diagrams**, not licensed photos. Their explanatory labels are English-only until localization. The remaining visual briefs for DJ-01-001 will be triaged during page review; this is the first substantive full-page layout pass, not the final cross-browser design QA.

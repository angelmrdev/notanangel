# M05-E2 — Learn to DJ: educational design pilot

Status: implementation patch, **not published**. Based on `notanangel-monorepo-20261119-004913.zip` plus M05-E1 preview patch.

## Files updated

- `apps/web/components/learn/educational-components.tsx` — adds `PhraseGrid`, `SignalChain`, `LessonCheckpoint` to the existing MDX components registry.
- `apps/web/components/learn/educational-components.module.css` — accessible responsive HTML/CSS diagrams, no raster illustrations.
- `apps/web/components/learn/learn.module.css` — scoped editorial typography, accessible links, long tables, blocks and mobile/print layout.
- `apps/web/content/learn/en/lessons/dj-01-006.mdx` — setup lesson visual, concept and check-before-cue panel; still `draft`.
- `apps/web/content/learn/en/lessons/dj-02-003.mdx` — 32-bar grouped timeline, central concept and exercises checkpoint; still `draft`.

## Install

1. Apply the M05-E1 patch first if not already merged.
2. Extract this ZIP into **the root of the monorepo**. The six paths above are repo-relative.
3. Keep `config/dj-learn-curriculum.json` unchanged; do **not** enable module publication.
4. Run your normal package-manager install if dependencies are absent, then `pnpm --filter @naa/web typecheck`, `pnpm --filter @naa/web lint`, `pnpm --filter @naa/web learn:validate`, `pnpm --filter @naa/web build` as applicable.
5. Run the web app with `pnpm --filter @naa/web dev`. Visit:
   - `http://localhost:3000/__learn-preview/en/dj-01-006/`
   - `http://localhost:3000/__learn-preview/en/dj-02-003/`

## QA checklist

- [ ] Preview works in **development only**, returns 404 on production.
- [ ] Full teaching body, FAQs, references and exercises remain visible.
- [ ] The setup diagram has a separate CUE/PHONES destination.
- [ ] Phrase grid shows four blocks of eight bars and marks 1, 9, 17, 25.
- [ ] On small screens diagrams stack and no long table widens the page.
- [ ] Focus rings are visible using keyboard navigation.
- [ ] High-contrast text and sensible reading sizes on real mobile.
- [ ] No `draft` entries appear in public curriculum or sitemap.
- [ ] No duplicated lesson H1; heading hierarchy remains logical.
- [ ] EN/ES localization work is **not** included in this pilot.

## Design decisions

Use site tokens for brand color (`--color-yellow`, `--color-pink`, `--color-cyan`) and a dark editorial reading surface.
Show diagrams as semantic HTML/CSS with accessible text descriptions, preserving the full academic text.
Keep interactive and rich visual components optional for future lessons.
Do not introduce client-side JavaScript or npm dependencies for these educational figures.
Make components reusable for later Spanish lessons by accepting textual labels in future revisions; current figures are English-only pilots.

## Scope and caveats

This is a **visual/layout pilot**, not the completed editorial QA or full 15-lesson conversion.
Original HTML/MDX content is preserved apart from removing a non-public editorial QA note at the end of the setup pilot.
The patch is validated structurally and against the source ZIPs. A full Next.js build and rendered screenshot inspection were not performed here.

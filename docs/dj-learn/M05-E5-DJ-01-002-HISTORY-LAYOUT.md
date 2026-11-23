# M05-E5 — DJ-01-002: Historical narrative layout

## Baseline

Use after M05-E4 (final-route local authoring), M05-E3 (all English MDX), M05-E2 (lesson components), and the runtime correction. The three files in this incremental patch are based on the **exact M05-E4 component registry** and **exact M05-E3 DJ-01-002 body**; they do not change routing, the curriculum manifest, status or bilingual release logic.

## Included files

- `apps/web/components/learn/history-visuals.tsx` — 7 original educational visual components, semantic HTML, no external images or JavaScript interactivity.
- `apps/web/components/learn/history-visuals.module.css` — responsive POP CHAOS-inspired styling, accessible tables and print fallbacks.
- `apps/web/components/learn/educational-components.tsx` — register the seven components with the existing MDX mapping. **Replaces the registry from M05-E4; do not apply over later changes to this same file without comparing diffs.**
- `apps/web/content/learn/en/lessons/dj-01-002.mdx` — complete original lesson with visual insertions; stays `draft`.
- This implementation note.

## Correspondence to original editorial brief

| ID | Component | Placement and approach |
| --- | --- | --- |
| dj-01-002-v01 | `DJHistoryTimeline` | Chronology with five distinct cultural/technical strands; historical text table remains as text |
| dj-01-002-v02 | `RadioStudioReconstruction` | Generic original radio studio schematic; **not a purported archival photograph** |
| dj-01-002-v03 | `ClubMixEvolution` | Fictional separate records versus overlapping mix and energy arc |
| dj-01-002-v04 | `BreakExtensionDiagram` | A → B → A simplified break extension; no sampled music |
| dj-01-002-v05 | `DJCultureGeography` | Cultural geography **index** replacing the recommended photo gallery; not a physical map |
| dj-01-002-v06 | `EquipmentGenerations` | Vinyl, CD/media players, laptop-controller, standalone: functional flow, no proprietary photos |
| dj-01-002-v07 | `HistoricalListeningWorksheet` | Accessible reusable HTML worksheet intended for printing or copying |

No commercial album art, third-party photos, screenshots or musical audio are included. Dates and biographies are taken from the existing researched lesson; **verify its cited sources during release QA**.

## Installation

Extract the ZIP **at the monorepo root**. The article's final local URL in `next dev` is:

`http://localhost:3000/learn-to-dj/dj-basics/history-of-djing/`

## Validation (run in your repository)

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --filter @naa/web build
pnpm --filter @naa/web dev
```

Then check: all seven visuals render; no failed MDX compilation; chronology table and references remain; phone widths 360px and 390px do not overflow; the worksheet scrolls horizontally in narrow screens; no visually implied single origin of DJ culture; the article is omitted in production while still draft.

This patch was structurally inspected and ZIP integrity checked but not built with the user's installed dependencies or opened in the user's browser.

## Next

DJ-01-003 (types of DJs), with role cards, setting comparison and an educational selection workflow. The final visual polish sweep will take place after modules 01 and 02 are integrated.

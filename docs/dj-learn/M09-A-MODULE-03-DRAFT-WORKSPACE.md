# M09-A — Module 03 bilingual draft workspace

## Scope

- Adds `dj-module-03` as `draft` in the **existing** Learn curriculum manifest, after the two `published` modules.
- Creates English and Spanish module landing-page MDX (`status: draft`).
- Creates EN/ES article MDX for all eight curriculum IDs (`status: draft`).
- **DJ-03-001** is a developed editorial first pass in both languages, with comparisons, practical exercises and hardware-safety cautions.
- **DJ-03-002 to DJ-03-008** are short substantive editorial foundations, **not final lessons**. They are intentionally excluded from publication and will be expanded and illustrated one by one. Do not publish Module 03 based on this patch.
- Does not change Modules 01/02 or any blog and infrastructure files.

## Curriculum

| ID | EN | ES |
|---|---|---|
| DJ-03-001 | DJ Controllers vs CDJs vs Turntables | Controladoras DJ, CDJ y platos: diferencias |
| DJ-03-002 | How a DJ Mixer Works | Cómo funciona una mesa de mezclas DJ |
| DJ-03-003 | Jog Wheels, Pitch Faders and Deck Controls | Jog wheels, pitch faders y controles de reproducción |
| DJ-03-004 | DJ Mixer EQ, Gain, Filters and Crossfaders | EQ, ganancia, filtros y crossfader en una mesa DJ |
| DJ-03-005 | How DJ Headphone Cueing Works | Cómo funciona la preescucha con auriculares DJ |
| DJ-03-006 | DJ Speakers, Monitors and PA Systems | Altavoces DJ, monitores de cabina y sistemas PA |
| DJ-03-007 | DJ Audio Interfaces and Cable Connections | Interfaces de audio y conexiones para DJs |
| DJ-03-008 | How to Connect and Troubleshoot DJ Equipment | Cómo conectar y solucionar problemas en un equipo DJ |

## Required checks

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --dir apps/web exec node scripts/audit-learn-prepublish.mjs
pnpm --dir apps/web exec node scripts/audit-learn-seo.mjs
pnpm --filter @naa/web build
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
pnpm --dir apps/web exec node scripts/audit-learn-public-pages.mjs
```

Expected state: 3 registered modules, **2 published bilingual modules**; 34 MDX for existing modules plus 18 draft MDX for Module 03. Public release still exports only the previously published 34 content pages.

## Editorial progression

1. Enrich DJ-03-001 with final original React/CSS visual diagrams and precise references.
2. Develop DJ-03-002 through DJ-03-008 completely in both languages, adding visuals and exercises as appropriate.
3. Run a strict parity/source/content audit and draft-only export regression before any publication status change.
4. Never set Module 03 to `published` or its MDX to `ready` until the whole bilingual module is complete and explicitly approved.

## Preview

Draft module routes are **not public** by design. The current published-only final routes do not display Module 03 while it remains draft. A dedicated draft preview route may be added in a subsequent incremental patch after reviewing the current preview architecture.

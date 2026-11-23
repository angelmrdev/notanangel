# M05-E6 — DJ-01-003 full educational layout

Base: monorepo 2026-11-19, followed by M05-E1/E2/E3/E4/E5. Install those earlier patches before applying this one. Install from the **monorepo root**, allowing replacement of the components registry.

## Included
- Seven original responsive, semantic HTML/CSS educational figures from original source briefs V01–V07.
- All original headings, teaching text, tables, scenarios, exercises, FAQs and references preserved; no new external photos or audio.
- Components registered with existing MDX renderer (server-renderable; no new dependencies).
- The final-route article remains `status: draft`; no publish manifest, scripts, sitemaps, or production routes modified.

## Placement map
1. Hero role portraits: before quick-comparison table (V07).
2. Four-dimensional classification taxonomy: after quick-comparison table (V01).
3. Resident-versus-guest comparison: after residency discussion (V02).
4. Open-format tempo-and-energy example: after the open-format section (V03).
5. Wedding cue-sheet demonstration: after wedding example table (V04).
6. Blending/scratching/beat-juggling comparisons: after turntablism section (V05).
7. Path chooser: after the beginner-path discussion (V06).

## Checks on your Windows machine
```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --filter @naa/web build
pnpm --filter @naa/web dev
```

Open: `http://localhost:3000/learn-to-dj/dj-basics/types-of-djs/`.

Inspect full-width desktop, 390px mobile, table horizontal scrolling, keyboard focus, no duplicate H1, and server output for runtime warnings.

## Important
All DJ examples and open-format track sequence are fictional. Energy numbers are subjective teaching markers. The wedding cue sheet is not a universal event schedule. Roles overlap. There is no claim that types or identities are official certifications.

**QA status:** files and ZIP structurally verified; the local Next.js typecheck, lint, build, and browser rendering still require execution on the user's machine.

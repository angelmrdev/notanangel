# M05-E13 — Song Structure / complete first-pass layout

**Article:** DJ-02-004 — Understanding Song Structure. **Final local URL:** `http://localhost:3000/learn-to-dj/music-theory/song-structure/`

**Apply after:** M05-E12. Unzip into the repository root. This patch updates the educational registry, adds two visual component files, and enhances the article MDX. It does **not** update a publication manifest, change `draft`, modify routes or add packages.

## Eight original article figures

1. `SongFormOverview` — two fictional pop/dance arrangement timelines.
2. `ChorusHookRefrainDiagram` — three functions rather than treating them as synonyms.
3. `BreakdownBuildDropDiagram` — texture, anticipation and structural release.
4. `GenreArrangementGallery` — explicitly non-prescriptive pop/house/techno/hip-hop arrangement comparison.
5. `EditVersionComparison` — different radio/extended form and cue-point implications.
6. `SongBarMap128` — accurate fictional 128 BPM, 4/4, 112-bar/3:30 structure map; timestamp values derived from 1.875 seconds per bar.
7. `MixTransitionStructure` — instrumental overlap vs vocal clash.
8. `SongStructureWorksheet` — print-friendly blank song analysis table.

The text-only section map and 128 BPM table remain part of the article: visual figures supplement the explanation, not replace it. All original H2 headings, exercises, FAQs and external source URLs remain. Editorial-only verification notes at the end have been removed from the public-facing MDX; originals remain in the editorial source.

## Local validation

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --filter @naa/web build
pnpm --filter @naa/web dev
```

**Browser checks:** open the final local URL, confirm all eight figures render once, verify the 128 BPM map ends at 3:30, inspect at 375px width, check table horizontal scrolling and print behavior, ensure visible references, and confirm the module is not released to production by this patch.

**Limits:** Package structure, figure count and article heading preservation are checked during packaging. Next.js build and browser screenshot QA require the installed local environment. These are first-pass layouts; final visual QA and EN/ES localization remain scheduled.

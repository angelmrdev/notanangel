# M05-E11 — Beats, Bars and Time Signatures — Full Layout

## Scope and baseline

Source MDX: M05-E3 `dj-02-002.mdx`; registry: M05-E10 after the full M01 visual integration. **Apply after M05-E10.**

This patch includes 8 original CSS/React teaching visuals, grouped into seven insertion positions in the lesson. All original prose, exercises, references, FAQs, headings and frontmatter are retained byte-for-byte after removing the component insertions. Status remains `draft`, and the manifest, routing and public publication rules are unchanged.

Final English local route: `/learn-to-dj/music-theory/beats-bars-time-signatures/` (verify your manifest slug if it changed).

## Visuals

| Brief | Component | Purpose |
| --- | --- | --- |
| V01 | `FourFourMeasureMap` | Four 4/4 measures with 16 beats and highlighted downbeats |
| V02 | `MeterComparison` | 4/4, 3/4, 2/4, 6/8; compound 6/8 grouped 3 + 3 |
| V03 | `EightBarCountingStrip` | 8 bars = 32 beats in 4/4 |
| V04 | `RhythmicSubdivisions` | Quarter, eighth, sixteenth-note counts |
| V05 | `BarDurationComparison` | 120 vs 128 BPM 8-bar duration calculation |
| V06 | `BarBeatgridDiagnostic` | Beat / bar markers versus waveform peaks |
| V07 | `CountingPracticeWorksheet` | Print-friendly practice worksheet |
| V08 | `BeatLoopVsBarLoop` | Four beats vs four bars, at 120 BPM |

All diagrams use invented musical examples and CSS; no copyrighted sound, screenshot or photo required. No new dependencies or client components.

## Technical checks

```bash
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --filter @naa/web build
pnpm --filter @naa/web dev
```

QA: At 120 BPM, 4/4, eight bars = 16 seconds; at 128 BPM, 15 seconds. A 4-beat loop is one 4/4 bar; a 4-bar loop is sixteen beats. The upper 6 in 6/8 counts *eighth-note units*, not automatically six beats in the usual compound-meter perception. Test page at 360 / 768 / 1440 px; check narrative reads sensibly, arrows/highlights are not the only explanation, and all headings and source references render. Check module is accessible at final URL in development and draft status remains in place.

This patch is verified at archive/file level, **not** a full Next.js runtime or browser screenshot validation. The user plans the final visual QA after both modules have been laid out.

# M05-E12 — DJ-02-003 Phrase Counting Full Layout

Incremental patch built **on top of M05-E11**. Unpack at the monorepo root, preserving the directory layout. The files updated are the current educational component registry, a new visual component module and scoped stylesheet, and the existing English MDX lesson.

## Included visual resources

1. `PhraseHierarchy` — four quarter notes per 4/4 bar, eight-bar teaching block and fictional sixteen-bar section.
2. `PhraseBlockTimeline` — 8/16/32 bar hierarchy, 32-bar timeline and a hypothetical structural change at bar 17.
3. `PhraseCountingWorksheet` — 32-bar printable counting/observation worksheet.
4. `ArrangementLayerChanges` — independent hypothetical percussion, bass, synth, vocal and FX layer changes.
5. `PhraseAlignmentComparison` — comparison of aligned and four-bars-late 16-bar DJ transitions.
6. `PhraseGridDiagnostic` — original schematic waveform and grid mismatch example.
7. `PhrasePracticeLog` — blank printable results table for the lesson's exercises.

The pre-existing `PhraseGrid` and `LessonCheckpoint` components remain in the article. Explanations, examples, exercises, FAQs and sources are preserved; the internal `Editorial production notes` section is omitted from the public-facing MDX.

## Target URL (development mode, with the previously applied local-final-URL patch)

`http://localhost:3000/learn-to-dj/music-theory/counting-musical-phrases/`

## Checks to run locally

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --filter @naa/web build
pnpm --filter @naa/web dev
```

Check that the entire lesson renders (including references), seven figures render once each, layout is usable at 375px, printed worksheet is readable, and the dev-only visibility mechanism does not affect production. This patch does not change manifest, publication status or sitemaps.

## Scope

Static React / CSS figures with text and accessible labels; no third-party screenshots, recordings, new libraries or interactive audio. Source Markdown remains unchanged for eventual EN/ES editorial localization. Build and browser QA have not been run in this environment.

# M05-E10 — Rhythm, Pulse, Tempo and BPM: full lesson layout

## Scope
- Complete educational visual pass for **DJ-02-001** at the final EN route `/learn-to-dj/music-theory/what-is-bpm/` (confirm the slug in your curriculum manifest if it has changed).
- Install after **M05-E9**, because the components registry is based on its latest version; otherwise prior lesson component registrations may be overwritten.
- The MDX article is sourced exactly from M05-E3. Every original paragraph, table, heading, FAQ, reference and exercise has been preserved, with eight original visual components inserted.
- Keeps the lesson `draft`. Does not modify manifest, published statuses, routes, sitemap or EN/ES source files.

## Eight visual briefs now addressed
1. `TempoPulseComparison` — 60/120/180 BPM in a four-second reference window.
2. `PulseAndRhythmLayers` — common pulse and distinct percussion layers.
3. `HalfDoubleTempo` — two levels of counting the same underlying passage.
4. `BPMCalculator` — client-side interactive arithmetic calculator, no audio capture or external API.
5. `BeatgridAlignmentExamples` — stylized correct, offset and half-time beatgrids.
6. `BeatBarPhraseHierarchy` — 4/4 example of grouping beats into bars.
7. `TempoPracticeWorksheet` — print-friendly activity template.
8. `SameTempoDifferentGrooves` — textual/visual substitute for an original licensed sound comparison. **No playable audio provided.** A suitable original/cleared audio clip should be added if required for the final educational brief.

## QA commands
```
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --filter @naa/web build
pnpm --filter @naa/web dev
```

## QA notes
- Compare the interactive calculator for 120 BPM at 15 s: 0.500 s per beat, 30 beats, 2 s per four beats.
- Check mobile layout at widths 360 / 390 / 768 / 1440 px; focus visibility on calculator fields; tables remain horizontally scrollable.
- Check original lesson headings, internal links, references and learning exercises survived.
- Check the lesson is accessible from its final route **locally** under your prior dev-only publication override and does not get exposed in production before bilingual publication is enabled.
- CSS diagrams have accessible surrounding text, but user visual and full Next.js QA is still pending.
- Some design diagrams are intentional simplifications and labeled as such.

## Scope limits
This patch does not finalize Spanish localization, perform final screenshot QA, or make changes to the public publishing workflow. No proprietary images or music audio is used.

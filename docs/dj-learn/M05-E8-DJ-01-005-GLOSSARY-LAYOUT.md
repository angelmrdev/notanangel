# M05-E8 — DJ-01-005 Glossary layout

## Scope

- Uses the **final lesson path** `/learn-to-dj/dj-basics/dj-terminology/` in local development.
- Reuses the existing MDX registry; adds seven original semantic and responsive visual components.
- Preserves all original definition headings, meaning/example/study-next blocks, exercise sections, index and citations.
- `status: draft` remains unchanged. No production manifest or sitemap changes.

## Visuals implemented

1. `GlossaryEssentialConcepts`: starting vocabulary across time, playback and audio.
2. `GlossaryCueMeanings`: distinguishes headphone cue, cue point and transport cue.
3. `GlossaryRhythmMap`: four 4/4 bars as an illustrative rhythmic grouping.
4. `GlossaryDeckControls`: generic playback controls.
5. `GlossaryAudioRouting`: mixer paths for program/master versus private monitoring.
6. `GlossaryMixingContrasts`: blend, cut, bass swap, harmonic mix.
7. `GlossaryLibraryFlow`: source → metadata → analyze → prepare → perform.

## QA

- Check the heading anchors on the real site: the topic links rely on heading-generated IDs. If these are unavailable, add a heading ID plugin or replace nav with an existing TOC component; never ship dead links.
- Check the Glossary title does not duplicate the page-level H1.
- Ensure the 89 terms remain readable and do not collapse into accordions by default; references should be crawlable.
- Inspect tables on narrow screens and contrast in both themes.
- Run `pnpm --filter @naa/web typecheck`, `pnpm --filter @naa/web lint`, `pnpm --filter @naa/web learn:validate`, and `pnpm --filter @naa/web build`.
- No external libraries, remote images, or audio assets are added.

## Caveat

Not yet run through the user's local Next.js toolchain. This is a self-contained patch aligned with the M05-E7 registry. It is a complete structural/visual pass; detailed visual QA remains scheduled after M01+M02.

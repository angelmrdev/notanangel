# M05-E14 — Downbeats, Accents and Transients | First-pass lesson layout

**Article:** DJ-02-005 · **Final local URL:** `http://localhost:3000/learn-to-dj/music-theory/downbeats-and-accents/`

Apply this patch **after M05-E13**, extracting it into the monorepo root and overwriting the component registry. It adds no dependencies and leaves all publication status fields and manifests unchanged.

## Eight original visual learning components

1. `DownbeatAccentTransientOverview`: two invented bars, downbeat vs accented snare vs smaller transient attacks.
2. `MetricalAccentHierarchy`: four-beat structural hierarchy versus performed emphasis.
3. `BackbeatPatternDiagram`: example kick, snare, hi-hat pattern.
4. `SyncopationAccentShift`: compare on-beat versus offbeat emphasis.
5. `AudioTransientVsBeatGrid`: fake waveform peaks versus metrical beat markers.
6. `BeatgridDownbeatDiagnostic`: shifted grid, incorrect bar-one label and correctly aligned case.
7. `GrooveDownbeatListeningCards`: three fictional listening contexts with different clues.
8. `DownbeatPracticeWorksheet`: printable exercise grid for BPM, bar-one location and listening evidence.

## Checks

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --filter @naa/web build
pnpm --filter @naa/web dev
```

**QA:** Check table overflow and beat-grid readability at mobile width; confirm eight figures render, all body text and original references remain, and site navigation still uses real final URLs in development. Verify built-in Screen Reader / keyboard accessibility where possible. The figures are original and do not embed commercial audio or waveforms.

**Implementation scope:** Static accessible CSS/React figures, no animations or audio. No production publication action. The patch was structurally validated but not built or browser-rendered in the user's environment.

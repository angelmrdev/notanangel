# M05-E15 — Musical Keys and Scales Explained

Final dev URL: `http://localhost:3000/learn-to-dj/music-theory/musical-keys-and-scales/`

Apply AFTER M05-E14 cumulative validation hotfix. Overwrite component registry. All content remains draft; publication manifests unchanged.

## Nine original lesson components

1. `MusicTheoryConceptLadder`
2. `ChromaticKeyboard`
3. `MajorScaleSteps`
4. `MajorMinorNoteCollections`
5. `RelativeParallelKeyMap`
6. `CircleOfFifthsIntro`
7. `MajorMinorChordTriads`
8. `TrackKeyDetectionFlow`
9. `KeyAnalysisWorksheet`

The circle of fifths is introduced only as musical theory; Camelot notation is reserved for DJ-02-007. The piano components use one-octave layouts, note names and text descriptions for accessibility. All patterns and examples are original.

## Run checks

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
pnpm --filter @naa/web dev
```

Preview in development and inspect figure labels at mobile breakpoints. No additional packages.

# M05-E17 · Musical Energy and Dynamics

Apply after M05-E16 and cumulative M05-E14 validation hotfix.

Final dev route: `/learn-to-dj/music-theory/musical-energy-and-dynamics/` (uses frontmatter slug).

Nine original JSX + CSS visual resources: V01 contrasting tracks, V02 mood/activation axes, V03 level-versus-density comparison, V04 exact time-aligned 3-minute subjective multi-series diagram, V05 tension / release, V06 four set curves, V07 accessible five-track library table, V08 three next-track choices, V09 print-friendly listening worksheet.

No proprietary imagery, licensed recordings, dependencies or manifest/state changes. Numeric energy examples are subjectively constructed, never actual analytics. Worksheet is print-friendly HTML, not a downloadable PDF.

## Required local QA

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
pnpm --filter @naa/web dev
```

Check mobile scrolling for the 3-minute chart and table; compare V04 boundaries against the article; inspect print preview, and verify accessibility labels. The published route may not be exported yet because the lesson is a draft.

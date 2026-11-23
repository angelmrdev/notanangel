# M05-E18 — Understanding Groove and Swing

Apply after M05-E17, including the M05-E14 cumulative hotfix.

Final dev route: `/learn-to-dj/music-theory/groove-and-swing/`.

Ten original figures V01–V10: identical BPM straight vs swung pulse; subdivision counting; precise 1:1, 3:2, 2:1 ratio table; straight/triplet/shuffle; exaggerated microtiming; sixteen-position drum+bass step grid; two-deck tempo/phase/groove differences; fictional library preparation card; a diagnostic checklist; and a print-friendly listening worksheet.

The 120 BPM example uses 500 ms beats, straight offbeats at 250 ms, ratio 3:2 at 300 ms and 2:1 at 333.3 ms. All examples and instrument grids are fictional. No third-party images, copyrighted audio or dependencies. No publication manifest changes.

Run from monorepo root:

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
pnpm --filter @naa/web dev
```

Check `/learn-to-dj/music-theory/groove-and-swing/` at mobile and desktop sizes; check the worksheet via print preview, keyboard navigation, and accessible text equivalents. This patch was statically inspected but not executed in the user's local Next.js environment. First-pass layouts now cover 15/15 M01+M02 lessons, pending QA and ES localization.

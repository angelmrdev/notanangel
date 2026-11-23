# M05-E16 — The Camelot Wheel Explained

Final development route: `/learn-to-dj/music-theory/camelot-wheel/`.

Apply AFTER M05-E15. This patch only changes the educational component registry and DJ-02-007 MDX and adds original Camelot figures/styles. Existing draft and publication manifest remain unchanged.

## Eight components

1. `CamelotWheelExplorer`
2. `CamelotCodeDecoder`
3. `CamelotQuickReference`
4. `CamelotFourMoves`
5. `HarmonicOverlapTimeline`
6. `DJKeyNotationComparison`
7. `KeyLockTempoDiagram`
8. `CamelotPracticeWorksheet`

The first figure is an interactive, keyboard-operable 24-code wheel. There is also a server-authored original full Markdown table in the article, plus a quick reference display. No third-party logo or audio. Compatibility always described as a test suggestion, not a rule.

## Checks

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
pnpm --filter @naa/web dev
```

QA in browser: keyboard tab navigation in wheel, 8A → 7A/9A/8B, 12A wraps to 1A, mobile labels, and print worksheet.

# M05-E14 — consolidated Learn lint + MDX correction

This patch is based on the actual source files from the most recent incremental patches, not an older monorepo snapshot.

## Fixes

- `dj-types-visuals.tsx`: remove unused callback index in wedding cue sheet.
- `downbeat-visuals.tsx`: remove unused index and escape JSX apostrophe.
- `first-setup-visuals.tsx`: escape JSX apostrophe.
- `phrase-counting-visuals.tsx`: escape JSX apostrophe.
- `dj-02-005.mdx`: include the corrected Markdown-format Serato link (supersedes earlier link-only ZIP).
- `scripts/validate-learn-mdx.mjs`: standalone validation compiling every Learn MDX file, including `draft` lessons omitted during static export. No changes to public routes, manifest, Next config, or publication state.

## Installation

Extract into repository root after M05-E14, overwriting the five source files. You do not need to apply the earlier Serato-link fix separately.

PowerShell from the repo root:

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
```

If the development server is running, stop it and restart with `pnpm --filter @naa/web dev` after the checks. Check the page `/learn-to-dj/music-theory/downbeats-and-accents/` again. **Do not** apply the previous M05-E14 full-layout ZIP again afterward: it would restore the bad link and JSX lint error.

## Verification limits

The patch was checked against the exact archived source files and ZIP integrity. TypeScript/ESLint/MDX/Next execution in the user's installed dependency environment must still be confirmed. The new script checks MDX parsing, **not** React component runtime prop validation or visual appearance. Keep the final release QA separate.

# M10-E — How DJ Software Analyzes Tracks / Cómo analiza canciones el software DJ

Incremental patch **after M10-D**. Replaces only DJ-04-004 EN/ES, adds 8 bilingual diagrams (16 exports), CSS and cumulative educational-components registry. Keeps both article statuses `draft`; no manifest or public route changes.

## Validation in repository root

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
pnpm --dir apps/web exec node scripts/audit-learn-public-pages.mjs
```

Run export checks **only if the build succeeds**. Note that the registry is cumulative as of M10-D; merge carefully if it has independently changed.

### Editorial scope
BPM vs half/double tempo, beatgrid offsets and drift, key uncertainty, waveforms, metadata/database, checkpoints, worksheet and review. Manual beatgrid editing is reserved for Module 05.

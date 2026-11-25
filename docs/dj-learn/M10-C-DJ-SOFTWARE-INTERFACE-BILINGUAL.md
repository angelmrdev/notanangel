# M10-C — Software DJ interface / Interfaz de software DJ

Incremental patch after M10-B. Updates lesson DJ-04-002 in EN/ES, adds nine bilingual visual component families, extends the cumulative educational component registry and adds scoped CSS. The module and both lessons remain `draft` and are not published.

## Installation
Extract this archive at the monorepo root, preserving its directory paths. Do not use a previous version of `educational-components.tsx` if you have separately changed that file: merge the new import and registry entries into your current version.

## Validation
```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
```
Only if the build succeeds:
```powershell
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
pnpm --dir apps/web exec node scripts/audit-learn-public-pages.mjs
```
The public release should still contain modules 01 and 02 only. The current lesson discusses waveform reading and interface navigation, not manual beatgrid repair, which belongs to Module 05.

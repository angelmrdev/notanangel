# M09-D — DJ-03-003 Bilingual Deck Controls

Incremental patch, install after M09-C.

## Changes
- Full editorial English and Spanish versions of DJ-03-003 (8 illustrated sections + troubleshooting table, exercises, answers, references).
- Eight original responsive educational diagrams, bilingual via a single implementation with thin EN/ES wrappers.
- Updated cumulative educational component registry, preserving all imports and components from M09-C.
- All document frontmatter retains `status: draft`; module 03 curriculum remains `draft` and is not part of published Learn routes or sitemaps.

## Validation (from repo root)
```
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
pnpm --dir apps/web exec node scripts/audit-learn-public-pages.mjs
```

## Editorial boundaries
General operating descriptions only. Model/software-specific functions should be checked against manufacturer manuals. Manual beatmatching is reserved for Module 06; detailed EQ/crossfader operation for DJ-03-004.

## Integration caution
The cumulative registry file is based on M09-C. If other work has modified `educational-components.tsx` since M09-C, merge the new import and 16 new export entries rather than overwriting other changes.

# M12-B — DJ-05-001 Music sources (EN/ES)

Incremental patch applied after M12-A. Includes two expanded MDX files (original editorial text preserved), one TSX figure family, its CSS module, and the accumulated MDX component registry based on M10-H.

Eight bilingual figures: sources, access vs file, versions, provenance and quality, file-to-library chain, usage permissions, acquisition workflow, five-track worksheet.

All module 05 content remains `draft`, and the manifest is deliberately NOT changed. Modules 01–04 publication is unchanged.

## Local validation (run in repository root)

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --dir apps/web exec node scripts/audit-learn-module05-draft.mjs
pnpm --filter @naa/web build
```

After a successful build:

```powershell
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
pnpm --dir apps/web exec node scripts/audit-learn-public-pages.mjs
```

Expected: 5 modules registered, 4 published; Module 05 excluded from public URLs and sitemaps. If you modified `educational-components.tsx` independently after M10-H, merge the new import and mapping entries instead of replacing newer edits.

Note: figure-specific statements about platform rights, integrations and licences are educational, not claims of current service compatibility; verify provider terms before performances.

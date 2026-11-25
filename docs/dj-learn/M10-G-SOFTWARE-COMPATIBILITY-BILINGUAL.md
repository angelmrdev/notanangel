# M10-G — DJ-04-006 DJ Software Compatibility (EN / ES)

Incremental on top of M10-F; extract at the monorepo root. All content stays `draft`.

Files: 2 full lesson MDX, 2 TSX/CSS visuals, accumulated `educational-components.tsx` registry, and this README.

The eight visual families are: CompatibilityLayerMap, OsDriverSupportChecklist, ControllerIntegrationMatrix, AudioSourceFormatMatrix, LicenseFeatureDependencies, LibraryTransferReality, UpdateRiskDecisionTree, CompatibilityTestWorksheet.

Validate in monorepo:
```
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
pnpm --dir apps/web exec node scripts/audit-learn-public-pages.mjs
```

Do not overwrite custom modifications to the shared registry: merge the import and 16 component registrations if it has evolved beyond M10-F. The module's published status and public sitemap routes are unchanged.

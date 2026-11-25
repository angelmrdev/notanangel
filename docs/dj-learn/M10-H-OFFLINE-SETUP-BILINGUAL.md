# M10-H — DJ-04-007 Offline DJ Setup (EN / ES)

Apply after M10-G at monorepo root. Incremental patch: two complete bilingual MDX lesson files, new TSX/CSS visuals, accumulated educational-components registry and this documentation. All module 04 material stays `draft`.

Visual families: OfflineReadinessLayers, OfflineLocalVsStreaming, OfflineExportTopology, OfflinePowerAndStorage, OfflineDryRunSequence, OfflineFailureFallbacks, OfflineGoNoGoMatrix, OfflineRehearsalWorksheet.

Important: streaming offline use is not promised. Verify current vendor and service support. No public sitemap or manifest changes.

Commands:
```
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
pnpm --dir apps/web exec node scripts/audit-learn-public-pages.mjs
```

Only run export audits after a successful build. Merge the registry if local custom edits were made after M10-G.

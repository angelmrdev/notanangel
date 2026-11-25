# M10-D — DJ-04-003 · DJ Audio Settings and Latency (EN/ES)

Incremental patch **after M10-C**. It overwrites only DJ-04-003 in EN/ES, adds one self-contained bilingual TSX/CSS family (8 diagrams, 16 locale exports) and updates the cumulative educational-components registry.

No curriculum, blog, sitemap, module-publication or deployment file changes. Both lessons remain `status: draft`; Module 04 is still draft.

## Checks

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
# Only if build passes:
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
pnpm --dir apps/web exec node scripts/audit-learn-public-pages.mjs
```

Important: the cumulative registry is based on M10-C. If other work changed `educational-components.tsx`, merge its two additions manually (new import and component registry entries), retaining those other changes.

The theoretical calculation `buffer samples / sample rate * 1000` is one audio buffer's duration, not total output or round-trip latency. Driver support and hardware channel assignment vary by device.

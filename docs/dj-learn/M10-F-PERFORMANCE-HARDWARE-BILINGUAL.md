# M10-F · Performance modes & hardware integration (DJ-04-005)

Incremental patch to install **after M10-E** at the monorepo root. The six files are the two full bilingual MDX drafts, two visualization files, the accumulated MDX components registry (built from M10-E), and this document.

Both localized lessons stay `draft`; curriculum and publication settings are unchanged. The module 04 remains unpublished, as do all its lessons.

## Validation in the real monorepo

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
# Only after successful build:
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
pnpm --dir apps/web exec node scripts/audit-learn-public-pages.mjs
```

The registry is based on M10-E; merge changes if anyone has independently edited `educational-components.tsx` since then.

# M12-F — DJ-05-005 playlists, crates and smart playlists

Incremental over M12-E. Six files: two localized MDX lessons, two visual component files, cumulative educational-components registry, this guide. No manifest, sitemap, publishing-state or other module changes. Preserve custom edits made after M12-E to the cumulative registry when merging.

Both documents remain status: draft. Validate from monorepo root:

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --dir apps/web exec node scripts/audit-learn-module05-draft.mjs
pnpm --filter @naa/web build
```

Only if build succeeds:

```powershell
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
pnpm --dir apps/web exec node scripts/audit-learn-public-pages.mjs
```

The 4 published modules remain unaffected; module 05 is still draft. No software-brand-specific feature is claimed universal.

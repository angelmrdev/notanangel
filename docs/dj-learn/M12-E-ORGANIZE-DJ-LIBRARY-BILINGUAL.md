# M12-E — DJ-05-004 / Music library organization

Incremental patch over M12-D. Changes only the two MDX lessons, component registry and new TSX/CSS visualization pair. Both locales stay `draft`, module 05 remains `draft`, and publication state for modules 01–04 is unchanged.

## Validation

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --dir apps/web exec node scripts/audit-learn-module05-draft.mjs
pnpm --filter @naa/web build
```

After successful build:

```powershell
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
pnpm --dir apps/web exec node scripts/audit-learn-public-pages.mjs
```

Do not include any file outside this ZIP. If the component registry has new independent edits, merge the two new registry additions instead of replacing it.

# M12-G — How to Set and Fix Beatgrids

Incremental patch applied after M12-F. Adds bilingual lesson DJ-05-006, eight educational diagrams per locale, shared responsive stylesheet and component registry entries.

## Publication safety

No publication statuses or manifest entries changed. Both lesson MDX files remain `draft`, and module 05 remains `draft`; modules 01–04 remain unchanged.

## Local validation (repo root)

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --dir apps/web exec node scripts/audit-learn-module05-draft.mjs
pnpm --filter @naa/web build
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
pnpm --dir apps/web exec node scripts/audit-learn-public-pages.mjs
```

Run last two only after a successful build. The TSX parser and MDX structural checks performed for packaging do not replace a full Next.js build in your environment.

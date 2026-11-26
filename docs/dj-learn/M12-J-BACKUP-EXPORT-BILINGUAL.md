# M12-J · Back up and export a DJ library (EN/ES)

Apply after M12-I at the monorepo root. Contains only DJ-05-009 bilingual MDX, eight bilingual React figures, their CSS, and the cumulative educational-component registry. All content remains `status: draft`. No curriculum, module state, sitemap, routing, SEO, or blog change is included.

**Distinction:** performance USB export is not a full music-and-database backup. The worksheet includes an actual restore test in a separate environment.

Validation (PowerShell from monorepo root):

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --dir apps/web exec node scripts/audit-learn-module05-draft.mjs
pnpm --filter @naa/web build
```

Only after a successful build:

```powershell
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
pnpm --dir apps/web exec node scripts/audit-learn-public-pages.mjs
```

The registry is cumulative from M12-I; merge its new imports/entries if local changes have been made subsequently.

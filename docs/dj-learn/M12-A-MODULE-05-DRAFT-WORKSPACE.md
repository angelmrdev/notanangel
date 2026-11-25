# M12-A — Module 05 draft foundation

This ZIP is incremental over M11-R (modules 01–04 published). It adds one draft module, nine bilingual lesson pairs and two draft landing pages. **Only lesson DJ-05-001 has a developed editorial draft; DJ-05-002 through 009 are placeholders for upcoming increments.**

The M11-R release gate is updated to accept extra draft modules without treating them as published. The new M12-A draft guard verifies all 20 files and confirms four published modules.

## Before pushing

Run from repository root:

```powershell
pnpm --dir apps/web exec node scripts/audit-learn-module05-draft.mjs
pnpm --dir apps/web exec node scripts/audit-learn-m03-m04-release.mjs
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
```

Only after a successful build:

```powershell
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
pnpm --dir apps/web exec node scripts/audit-learn-public-pages.mjs
```

Expect: **5 registered / 4 published modules**, **88/88 MDX compilations** (68 previously + 20 added), **70 publicly exported Learn pages**, including both course landing pages. Module 05 must not occur in the public navigation or sitemap.

The patch does not perform git commit, push or deploy.

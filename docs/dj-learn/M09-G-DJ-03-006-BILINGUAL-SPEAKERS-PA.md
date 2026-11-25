# M09-G — DJ-03-006 bilingual speakers and PA lesson

Install after M09-F. This package replaces the brief EN/ES DJ-03-006 drafts with complete matching lessons, adds eight bilingual server-rendered diagram families, and extends the cumulative MDX component registry. It does not change module manifests or publication status.

Validation on your monorepo:
```
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
pnpm --dir apps/web exec node scripts/audit-learn-public-pages.mjs
```

**Release invariants:** Module 03 remains draft and excluded from public sitemaps; modules 01/02 continue with 34 exported content pages. Hardware diagrams are educational conceptual models, not instructions for venue rigging or electrical wiring. Do not connect amplified outputs to line inputs, bypass protective earth, or assemble suspended speaker systems without qualified personnel.

The cumulative registry is based on M09-F. If you edited it independently, merge this patch's import and registry entries instead of replacing other modifications.

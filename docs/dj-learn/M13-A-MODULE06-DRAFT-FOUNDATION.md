# M13-A — Module 06, Beatmatching Fundamentals (draft foundation)

## Apply
Extract at the monorepo root after M12-K. The patch adds the 7 bilingual lesson stubs, two module hub MDX pages and a complete first editorial lesson (DJ-06-001, EN/ES). It registers module 06 as `draft`. Other lessons explicitly remain editorial stubs, not complete articles.

## Public deployment isolation
Modules 01–05 remain published; module 06 is registered but not published. The published-route/sitemap builder must continue filtering by `status === 'published'`. A source audit checks this; `--export` additionally checks sitemap and HTML absence after a successful build.

## Recommended checks (run from monorepo root)

```powershell
pnpm --dir apps/web exec node scripts/audit-learn-module06-draft.mjs
pnpm --dir apps/web exec node scripts/audit-learn-m03-m04-release.mjs
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
```

Only if the build passes:

```powershell
pnpm --dir apps/web exec node scripts/audit-learn-module06-draft.mjs --export
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
pnpm --dir apps/web exec node scripts/audit-learn-public-pages.mjs
```

Expected: 6 registered modules, 5 published; 104 compiled MDX (88 ready + 16 draft); 90 public Learn routes (88 content pages + two indices); 0 module 06 public routes. Note that `104` counts all MDX docs, whereas the public export remains 90 pages. No commit/push is performed.

## Next increment
M13-B adds original EN/ES educational diagrams to DJ-06-001. Then finish DJ-06-002 through DJ-06-007 one at a time and audit the module before any publication flip.

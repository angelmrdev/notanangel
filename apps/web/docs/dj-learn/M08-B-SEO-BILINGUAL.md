# M08-B — Bilingual SEO prepublication

Incremental patch on top of **M08-A** and **M07-L15**. No publication flags changed.

## Scope
- Centralized canonical / hreflang (`en`, `es`, `x-default`) and OpenGraph metadata for the 4 dynamic routes.
- Semantic JSON-LD: `Course` for module pages; `LearningResource` for lessons; `BreadcrumbList` for both.
- Homepage alternates with `x-default`.
- Additional read-only check: `node scripts/audit-learn-seo.mjs` from `apps/web`.
- The sitemap generator is **not modified**; it already reads the published module/lesson catalog, and emits reciprocal EN/ES alternates. No duplicate blog logic.

## Validation
```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --dir apps/web exec node scripts/audit-learn-prepublish.mjs
pnpm --dir apps/web exec node scripts/audit-learn-seo.mjs
pnpm --filter @naa/web build
```

Expected while draft: no live Learn module URLs in the production sitemap (except Learn index), and no live lesson routes. After M08-C release gates and build, verify 2 modules and 15 lessons per locale in route manifest and `public/sitemaps/{en,es}/learn-to-dj.xml`. The **full visual QA is deferred** as agreed, but a limited functional and crawler-readiness smoke test is still needed.

## Cautions
- This package was inspected against reconstructed patches, not your latest local monorepo. Do not overwrite unrelated files; compare before merging if you have manual edits.
- The `x-default` choice intentionally points to the English page (English default site root).
- No fabricated ratings, duration, author, certification, or publisher URLs added to JSON-LD.
- JSON-LD is escaped before injection; URLs use the canonical production host.

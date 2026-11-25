# M10-I — DJ-04 bilingual full audit (draft)

## Scope and result

Source was reconstructed by applying M10-A through M10-H in order, on the earlier validated Learn baseline containing M09-J and M09-H.1 fixes. This is a **source-level** audit, not an execution of Next.js against the user's own Windows monorepo.

- Curriculum: 4 registered modules; 01 and 02 `published`, 03 and 04 `draft`.
- DJ-04 has 7 lessons in EN + 7 lessons in ES (14 MDX lessons), plus 2 `draft` module landing MDX files.
- Localized visual insertions: 114 (57 English / 57 Spanish; lesson 002 contains 9 per locale; all others 8 per locale).
- Seven component families, 14 TSX/CSS files. No missing CSS class references.
- All referenced visual symbols are exported and present in the MDX registry.
- EN/ES lesson order, section counts, diagram order, slugs, metadata and statuses pass.
- 16 internal Learn MDX links point to known module/lesson routes, including links to still-draft module 03.
- Draft module URLs are absent from the generated Learn sitemaps in the source snapshot.
- All seven TSX files parsed with TypeScript 5.8.3: zero parse errors.
- Source audit: **0 errors / 0 warnings**.

## Changes

This patch adds only `apps/web/scripts/audit-learn-module04.mjs` and this documentation. No article content, CSS, component registry, curriculum, blog, or publication status is changed because no concrete source defect was found.

## Important publication dependency

DJ-04-001, DJ-04-002 and DJ-04-003 link to lessons of the draft DJ Equipment module (03). That is appropriate for the current draft-only authoring stage. For any future DJ-04 publication, publish DJ-03 first, or replace links so no published article points to an unpublished route.

## Run (from monorepo root)

```powershell
pnpm --dir apps/web exec node scripts/audit-learn-module04.mjs
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --dir apps/web exec node scripts/audit-learn-module03.mjs
pnpm --filter @naa/web build
# Only after successful build:
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
pnpm --dir apps/web exec node scripts/audit-learn-public-pages.mjs
```

Expected new audit result:

```text
M10-I module 04 audit: 7 EN lessons, 7 ES lessons, 114 localized diagrams, 16 internal Learn links, 7 visual families; 0 errors, 0 warnings
```

The static parser and structural audit cannot prove a full TypeScript typecheck, real MDX render, production build, color contrast in browser, or the quality of each Spanish translation. Keep those as separate gates. The first launch should still contain only modules 01 and 02.

# M05-E1 — Local draft preview patch (current monorepo 2026-11-19)

## Baseline
This patch is based on `notanangel-monorepo-20261119-004913.zip`, **not** the preceding November 18 export.
The November 19 repo adds `scripts/learn-publication-catalog.mjs`, `scripts/test-learn-release.mjs` and `docs/dj-learn/M06-B-PUBLICATION-QA.md`, and modifies `apps/web/package.json`, `scripts/validate-learn-publication.mjs` and `scripts/generate-sitemaps.mjs`.
None of those files is overwritten.

## Included
- Development-only `/__learn-preview/{en|es}/{lesson-id}/` route, dynamically rendered; 404 if `NODE_ENV` is anything other than `development`; `noindex, nofollow, nocache` metadata.
- Two prior English **draft** MDX pilot lessons, retaining the present MDX contract; no automated content conversion.
- This integration guide.

## How to use
1. Extract this ZIP into the **monorepo root**. All paths are relative to that root.
2. Start the existing web dev server, e.g. `pnpm --dir apps/web dev` from root (with existing dependencies installed).
3. Open `http://localhost:3000/__learn-preview/en/dj-01-006/` and `http://localhost:3000/__learn-preview/en/dj-02-003/`.
4. Edit the MDX under `apps/web/content/learn/en/lessons`. Preview changes locally.
5. Check mobile rendering, headings, reference links, tables, accessibility, and the educational components before converting the remaining lessons.

## Safety/release policy
- **Do not** change module statuses from `draft` to `published` until complete, approved EN and ES modules and every lesson exist with `status: ready`.
- The preview is intentionally **inaccessible outside `NODE_ENV=development`** even if a preview URL is guessed. `robots: noindex` is supplementary, not the access control.
- The URL is not added to manifests, sitemaps, or SEO alternate links; the dynamic route has no static params.
- The route uses the current repository, types and existing MDX components; it does not fork the publication model.
- Some pilot lesson references may still require editorial QA. Their `draft` status is intentional.
- If an EN-only pilot exists, `/__learn-preview/es/...` responds 404 until the Spanish MDX is written.

## Validation performed and not performed
- Verified ZIP path integrity and all new files; checked route against the actual exported repository APIs.
- Not run: Next.js runtime render / lint / typecheck / full build, as the provided archive does not include installed dependencies.
- Run your existing `learn:validate` and `learn:test-release` commands after extraction; they should remain unaffected by this route.

## Next milestone
Review the two pilot lesson pages in the actual design, then extract reusable components (responsive tables, section TOC, figures and exercises) and localize these two lessons before scaling to all 15.

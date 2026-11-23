# M08-C — Controlled bilingual Learn publication

Apply after M08-A and M08-B. This patch intentionally **activates** publication gates for both registered Learn modules. It does not push, commit, or deploy anything. **Do not deploy to Hostinger until export verification is green.**

## Changes
- `config/dj-learn-curriculum.json`: both modules `draft` → `published`.
- All 34 Learn MDX frontmatters (2 modules x 2 languages, 15 lessons x 2 languages): `draft` → `ready`. Bodies, titles, slugs and order stay unchanged.
- `scripts/verify-learn-release-export.mjs`: read-only post-build checker, checks 34 HTML export pages, canonicals, EN/ES alternate tags, JSON-LD, and sitemap entries and their pairings.

## Run from repo root (PowerShell)
```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --dir apps/web exec node scripts/audit-learn-prepublish.mjs
pnpm --dir apps/web exec node scripts/audit-learn-seo.mjs
pnpm --filter @naa/web build
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
```

Expected: 2 published bilingual modules; 34 exported module/lesson HTML pages; 17 corresponding pages per locale (2 module + 15 lesson); 2 Learn sitemaps with 18 URLs each counting the Learn index page.

## Deployment coordination
- Only commit when all checks are green. In a shared repo with pending blog/infra changes, stage **only** Learn files and check `git diff --cached --stat` before committing.
- `next.config.ts` has static export (`output: 'export'`, `trailingSlash: true`); production files should be in `apps/web/out/`.
- Publish and run GSC/GA/Monetag separately in the infrastructure chat, as planned.
- Visual QA deliberately deferred; functional/SEO smoke tests are not deferred.

## Environment qualification
This patch was constructed from the latest available reconstructed Learn patches, not from the user's current Windows working tree. Verify merges and run commands on the actual tree, which may have newer blog and infrastructure changes. The file generator does not rewrite non-Learn code.

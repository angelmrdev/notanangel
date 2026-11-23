# M09-F — DJ-03-005 bilingual lesson

Scope: headphone cue/PFL, cue/master blend, split cue, safe levels, standalone/controller routing, diagnostic exercise. Eight server-rendered React figures share an EN/ES implementation. Full articles replace M09-A short drafts.

**Install after M09-E** by extracting into monorepo root. The cumulative `educational-components.tsx` is based on M09-E. Keep the module and lessons in `draft`.

Validation:
```
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
pnpm --dir apps/web exec node scripts/audit-learn-public-pages.mjs
```

The release expectation is still 2 published modules and 34 published content pages. Do not include Module 03 in public sitemaps.

Visual QA is deferred; all audio routes are conceptual and manufacturer-dependent. No commercial waveform/audio has been embedded.

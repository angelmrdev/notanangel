# M12-C — Audio formats and sound quality EN/ES

Apply on top of M12-B. Only modifies both DJ-05-002 MDX documents, adds eight bilingual visuals and CSS, and extends the accumulated educational-components registry.

The module remains `draft`, and publication statuses, sitemaps and curriculum are deliberately unchanged. No existing content or public modules are modified. Do not deploy until full repository checks pass.

Checks: `pnpm --filter @naa/web typecheck`, `lint`, `learn:validate`, `pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs`, `pnpm --dir apps/web exec node scripts/audit-learn-module05-draft.mjs`, `pnpm --filter @naa/web build`, then both export audits.

# M12-I — Track tagging by energy and genre (EN/ES)

Apply after M12-H at monorepo root. This incremental patch only updates DJ-05-008 in both languages, adds eight bilingual visual families and CSS, and updates the accumulated MDX component registry. Both lessons stay `status: draft`; no manifest, routing, SEO, blog or sitemaps are changed.

Validate on your repository: `pnpm --filter @naa/web typecheck`, `pnpm --filter @naa/web lint`, `pnpm --filter @naa/web learn:validate`, `pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs`, `pnpm --dir apps/web exec node scripts/audit-learn-module05-draft.mjs`, then `pnpm --filter @naa/web build`. Only run export audits after a successful build.

The component registry is based on M12-H; merge its newly added import and entries if you have edited that file in the meantime.

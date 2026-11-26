# M12-H — Hot Cues and Loops (EN/ES)

Incremental patch to apply after M12-G at monorepo root.

- DJ-05-007: complete bilingual lesson with 8 educational diagrams per locale.
- 8 paired React diagram families + scoped CSS and accumulated MDX component registry.
- Both MDX documents remain `status: draft`; no publication manifest, sitemap, blog or route changes.
- Verify on your monorepo: `pnpm --filter @naa/web typecheck`, `lint`, `learn:validate`, `pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs`, `pnpm --filter @naa/web build`, and export audits after a successful build.

Note: This incremental registry is based on M12-G. If your registry was edited after that patch, merge the new import and registry entries rather than overwriting unrelated changes.

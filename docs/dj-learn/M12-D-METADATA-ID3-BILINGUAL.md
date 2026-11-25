# M12-D — Music Metadata and ID3 Tags (DJ-05-003)

Incremental ZIP for apps/web. Apply after M12-C.

- EN and ES full articles; retain frontmatter IDs, slugs and `status: draft`.
- 8 visual families, each has EN and ES wrappers; 16 MDX component insertions.
- `educational-components.tsx` is the accumulated component registry based on M12-C; merge if independently edited.
- Does not modify curriculum/publication statuses, sitemap generator or public route files.
- File tags are not interchangeable with DJ database records; backup tests emphasized.

Commands from repository root:

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --dir apps/web exec node scripts/audit-learn-module05-draft.mjs
pnpm --filter @naa/web build
# Only after successful build:
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
pnpm --dir apps/web exec node scripts/audit-learn-public-pages.mjs
```

Expected 5 registered modules, 4 published, module 05 excluded. No TypeScript/full build assertion unless those commands pass in the target repository.

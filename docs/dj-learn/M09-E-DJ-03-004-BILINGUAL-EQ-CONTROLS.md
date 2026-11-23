# M09-E — DJ-03-004 bilingual lesson

Scope: EN/ES complete editorial article and eight original bilingual React figures. Depends on M09-D. Module 03 and both lesson MDX stay `draft` and do not enter production navigation or sitemaps. No curriculum or manifest modification.

## Changes
- Two full bilingual MDX lesson versions with corresponding sections, tables, safety warnings, practice exercises, FAQ and manufacturer documentation references.
- Eight original diagrams and exercises in one TSX file with `lang` wrappers and responsive CSS.
- Add sixteen exports/imports to the accumulated `learnMdxComponents` registry.

## Verify
```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
pnpm --dir apps/web exec node scripts/audit-learn-public-pages.mjs
```

The live monorepo may have additional changes beyond M09-D; if so merge the new registry import/entries instead of overwriting a newer registry. Do not mark DJ-03-004 as `ready` or module 03 as `published`.

# M10-B — DJ-04-001 bilingual educational visuals

Incremental patch applied AFTER M10-A and M09-I/M09-J.

Adds eight educational figures per locale (16 registered MDX components) to the two DJ-04-001 lesson files, with shared TSX and responsive CSS. All frontmatter remains `draft`. No curriculum, sitemap, routing or published lessons are changed.

Figures: SoftwareFunctionMap; PlaybackAudioPath; LibraryFileDatabase; ImportAnalyzePrepare; LocalStreamingAvailability; ControllerSoftwareBoundary; MasterCueRouting; SoftwareSoundcheckWorksheet.

Validation from monorepo root:

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
# Only if build succeeds:
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
pnpm --dir apps/web exec node scripts/audit-learn-public-pages.mjs
```

Expected publication: 4 registered modules, 2 published, module 04 draft (no new public routes). Registry is based on latest provided M09-I snapshot; merge any later custom changes to educational-components.tsx before overwrite.

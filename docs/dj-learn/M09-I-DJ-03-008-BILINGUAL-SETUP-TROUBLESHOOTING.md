# M09-I — DJ-03-008: DJ setup and troubleshooting (EN/ES)

Incremental patch to apply **after M09-H.1** (and M09-H). Contains six files: two complete bilingual MDX drafts, a shared React visualization file, responsive CSS, cumulative component registry, and this document. Does not change curriculum statuses, public routing, blog, sitemaps, or prior modules.

Visuals: SetupTopology, PowerSequence, SoundcheckStages, NoSoundDecisionTree, HumNoiseIsolation, DistortionChain, CueRoutingFaults, TroubleshootingWorksheet (each En and Es).

Validation (from monorepo root):

```
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
pnpm --dir apps/web exec node scripts/audit-learn-public-pages.mjs
```

Build first; export auditors read the `out` directory. Registered: 3 modules; publicly published: 2 modules. Module 03 remains draft in both languages and should be excluded from generated pages and sitemaps.

If you have edited `educational-components.tsx` since M09-H, merge the new import and registrations rather than overwriting parallel work. Do not accidentally restore an old `module03-speaker-visuals.tsx` or old export verifier: M09-H.1 fixes those.

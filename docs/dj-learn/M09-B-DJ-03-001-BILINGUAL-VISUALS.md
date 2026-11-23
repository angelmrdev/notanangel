# M09-B — DJ-03-001 visual layout · bilingual draft

## Scope

- **DJ-03-001** in English and Spanish: 8 original educational figures placed into the complete existing lesson body. Every word of the M09-A original is preserved.
- 16 zero-prop MDX wrappers (8 components × EN/ES) around shared React/CSS visual logic.
- Registers these components in the existing MDX component registry; the rest of the curriculum is unchanged.
- No dependencies or external imagery; semantic captions, responsive layouts and printable worksheet.
- All affected lesson frontmatter remains `status: "draft"`. The module stays `draft` in the manifest.
- Existing modules 01/02 and blog/infrastructure are unchanged.

## Included files

1. `apps/web/components/learn/module03-hardware-visuals.tsx`
2. `apps/web/components/learn/module03-hardware-visuals.module.css`
3. `apps/web/components/learn/educational-components.tsx`
4. `apps/web/content/learn/en/lessons/dj-03-001.mdx`
5. `apps/web/content/learn/es/lessons/dj-03-001.mdx`
6. This document.

## Deployment boundary

**Important:** apply after M09-A and M07-L15. The registry is based on the cumulative registry available at the end of M07-L15; if your live registry changed since then, merge only the new import and 16 keys rather than replacing the whole file. A patch against another state may overwrite additional new component registrations.

## Local validation

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --dir apps/web exec node scripts/audit-learn-prepublish.mjs
pnpm --dir apps/web exec node scripts/audit-learn-seo.mjs
pnpm --filter @naa/web build
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
pnpm --dir apps/web exec node scripts/audit-learn-public-pages.mjs
```

Expected: 3 modules registered, **2 published**; 52 MDX documents compiled (34 published content + 18 draft M03 content); public export stays at 34 existing published module and lesson pages. 

## Preview and quality checks

The final Module 03 URL is intentionally **not publicly routable** while draft. The preview infrastructure currently has known routes for M01/M02 only; do not rely on a 200 response for Module 03 drafts without implementing an explicit protected preview. Review the diagrams visually after restoring a preview route, then complete M03-L02 onward.

## Visual design

1. HardwareFunctionsMap — separate the four core functions.
2. HardwareSignalPaths — four typical architectures, explicit source/playback/mixer positions.
3. ControllerAnatomy — two decks plus center mixer conceptual UI.
4. PlayerVsMixerRoles — player functions vs mixer channel.
5. VinylPhonoStage — cartridge and phono preamp routing.
6. VinylVsDVS — conventional vinyl vs timecode control.
7. HardwareFailurePoints — pre-gig risks and checks.
8. HardwareTraceWorksheet — printable two-system signal tracing exercise.

These diagrams make model-dependent claims explicitly conditional. They avoid brand-specific hardware illustrations.

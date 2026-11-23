# M09-C · DJ-03-002 · How a DJ Mixer Works / Cómo funciona una mesa DJ

## Scope

This incremental patch assumes M09-A and M09-B have already been applied. It replaces the brief EN/ES draft for DJ-03-002 with a complete bilingual lesson. It adds 8 shared bilingual teaching diagrams (16 MDX wrapper names), a responsive CSS module, and the updated MDX component registry.

### Contents

- `apps/web/content/learn/en/lessons/dj-03-002.mdx` — in-depth English lesson.
- `apps/web/content/learn/es/lessons/dj-03-002.mdx` — complete Spanish counterpart.
- `apps/web/components/learn/module03-mixer-visuals.tsx` — eight shared bilingual diagrams.
- `apps/web/components/learn/module03-mixer-visuals.module.css` — accessible responsive and print-friendly styles.
- `apps/web/components/learn/educational-components.tsx` — accumulated component registry from M09-B plus the 16 new EN/ES wrappers.
- `docs/dj-learn/M09-C-DJ-03-002-BILINGUAL-MIXER.md` — these notes.

### Diagram sequence

1. Mixer overview (four routing jobs)
2. Conceptual channel signal path (plus separate cue branch)
3. Schematic channel-strip anatomy
4. Cue, master and booth routes
5. Channel faders and crossfader assignments
6. Gain-stage meters / clipping warning
7. Inputs-and-outputs comparison table
8. Step-by-step troubleshooting exercise

The lesson preserves the distinctions between input gain, channel faders, master, booth and headphone cue; it avoids presenting any particular brand's hardware routing as universal. A separate lesson DJ-03-004 covers advanced control technique.

## Status and release safety

Both lesson files are `draft`, and module DJ-03 must remain `draft` in the curriculum. The ZIP DOES NOT contain or change `config/dj-learn-curriculum.json` or any publication status for the first two modules. It does not touch the blog, global SEO, deployment, monetization, or sitemap code.

## Local validation (PowerShell, from monorepo root)

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

Check previews / final development URLs according to the current draft-preview mechanism:

- `/learn-to-dj/dj-equipment/how-dj-mixers-work/`
- `/es/curso-dj/equipo-dj/como-funciona-una-mesa-dj/`

**Important:** If the local repository's registry has evolved beyond M09-B, merge only the new import and 16 registry entries instead of overwriting your newer file. No full local Next.js or lint validation has been performed against the user's current working tree. TypeScript/TSX transpilation and static cross-reference validation were performed on the patch files.

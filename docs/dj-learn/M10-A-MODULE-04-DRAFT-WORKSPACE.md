# M10-A — Module 04 bilingual draft foundation

## Scope

- Registers `dj-module-04` as `draft` **after** modules 01/02 (`published`) and module 03 (`draft`).
- Creates module landing content in EN and ES and all seven paired lesson MDX files, all `status: draft`.
- `dj-04-001` is a complete **editorial first pass** (text, exercises and pedagogical comparisons) in both languages. Original React diagrams and visual polish are planned for M10-B.
- `dj-04-002` to `dj-04-007` are **substantive editorial foundations, not completed lessons**, and must be extended one at a time in EN/ES.
- No changes to published modules, component registry, site navigation, blog, routes, sitemaps, SEO or shared application code.

## Curriculum

| ID | EN | ES |
|---|---|---|
| `dj-04-001` | How DJ Software Works | Cómo funciona el software DJ |
| `dj-04-002` | Understanding DJ Software Decks and Waveforms | Decks y formas de onda en el software DJ |
| `dj-04-003` | DJ Audio Settings and Latency Explained | Configuración de audio y latencia en software DJ |
| `dj-04-004` | How DJ Software Analyzes Tracks | Cómo analiza canciones el software DJ |
| `dj-04-005` | DJ Performance Modes and Hardware Integration | Modos de actuación e integración con hardware DJ |
| `dj-04-006` | DJ Software Compatibility Explained | Compatibilidad del software DJ: qué comprobar |
| `dj-04-007` | How to Prepare an Offline DJ Setup | Cómo preparar un equipo DJ para trabajar sin internet |

## Deployment safety

The existing published-only routing and sitemap machinery should ignore module 04 entirely. Validate that `learn:validate` reports **4 registered / 2 published bilingual modules**. Published content is still the original 34 lesson/module MDX pages (36 including two course indexes); draft MDX count becomes 32 (18 for module 03, 16 for module 04). Total MDX files should be 66 when the full workspace has all patches.

Run in the monorepo root:

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --dir apps/web exec node scripts/audit-learn-prepublish.mjs
pnpm --dir apps/web exec node scripts/audit-learn-seo.mjs
pnpm --filter @naa/web build
# Only when build succeeds:
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
pnpm --dir apps/web exec node scripts/audit-learn-public-pages.mjs
```

Check that module 04 does **not** appear in public routes or Learn sitemaps. The verifier hotfix from M09-H.1 must already be installed so that draft modules are excluded from public verification.

## Editorial progression

1. M10-B: visuals and improvement of DJ-04-001 in both languages.
2. Develop lessons 04.002–04.007 in EN/ES with original illustrations, examples and assessments.
3. Run a whole-module bilingual parity and draft export audit before changing any publication status.

## Editorial sources and caution

No brand- or version-specific claims are made. Software integration, audio routing and streaming availability vary by version, device, account and territory. All feature descriptions must be checked against vendor documentation when specific products are added.

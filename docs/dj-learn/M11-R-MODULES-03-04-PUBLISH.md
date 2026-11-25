# M11-R — Activación bilingüe de DJ Equipment y DJ Software

## Alcance
- `config/dj-learn-curriculum.json`: los módulos 03 y 04 pasan a `published`.
- 34 documentos MDX EN/ES (2 portadas de módulo por idioma + 15 lecciones por idioma) pasan de `draft` a `ready`; contenido y slugs no cambian.
- Los auditores M09-J y M10-I dejan de asumir `draft` y comprueban visibilidad correcta en el sitemap.
- Nuevo script de solo lectura `apps/web/scripts/audit-learn-m03-m04-release.mjs` comprueba 4 módulos, 68 páginas de contenido, 70 rutas incluyendo índices, estados, metadatos y enlaces internos.

## MUY IMPORTANTE
Este parche es para un monorepo donde ya se instalaron M09-I, M09-H.1, M09-J y M10-A a M10-I. No sustituye los gráficos, artículos o correcciones anteriores. No incluye un commit ni realiza push o deploy. No altera archivos del Blog.

## Ejecución desde la raíz del monorepo (PowerShell)
```powershell
pnpm --dir apps/web exec node scripts/audit-learn-m03-m04-release.mjs
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --dir apps/web exec node scripts/audit-learn-prepublish.mjs
pnpm --dir apps/web exec node scripts/audit-learn-seo.mjs
pnpm --filter @naa/web build
# Repetir las auditorías después del build para validar sitemaps recién generados:
pnpm --dir apps/web exec node scripts/audit-learn-module03.mjs
pnpm --dir apps/web exec node scripts/audit-learn-module04.mjs
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
pnpm --dir apps/web exec node scripts/audit-learn-public-pages.mjs
```

## Valores esperados
- `learn:validate`: 4 registered / 4 published bilingual modules.
- `validate-learn-mdx`: **68/68 MDX** (34 páginas de módulo y lecciones por idioma). Los dos índices de curso son rutas React, no MDX.
- `verify-learn-release-export`: EN 34, ES 34, total 68.
- `audit-learn-public-pages`: 70/70 HTML incluyendo los dos índices de curso.
- Ambos auditorías de módulo: 0 errores después del build, con los módulos 03 y 04 presentes en los sitemaps.

Si falla el build, no interpretes el contenido de `out/` ni el resultado del verificador de exportación: puede contener archivos de una compilación anterior.

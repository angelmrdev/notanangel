# M08-D — Smoke check de publicación local

Este parche **no publica ni cambia contenido**. Incorpora una auditoría de solo lectura que se ejecuta sobre la carpeta `apps/web/out/` después del build estático.

## Comandos (desde la raíz del monorepo)

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

## Cobertura

- Confirma que se exportan las **34 páginas de contenido** más **dos páginas índice** (36 en total).
- Comprueba el HTML exportado: título, description, H1, ausencia de `noindex` y JSON-LD en módulos y lecciones.
- Extrae enlaces `<a href>` internos del área Learn EN/ES y verifica que el destino esté entre las rutas publicadas.
- Avisa si la página índice de cada idioma no enlaza a sus dos módulos.
- Mantiene las comprobaciones `canonical`, `hreflang` y sitemap en el auditor anterior `verify-learn-release-export.mjs`.

Un warning **no bloquea el comando**; conviene revisarlo antes del commit. Los errores sí producen código de salida 1. No prueba interacciones, responsive ni navegación por JS: eso se revisará en el QA posterior.

## Limitaciones y cierre

No usar `git add .` ni `git add -A` si hay cambios de blog o infraestructura. Antes del commit consultar `git status --short` y `git diff --name-only`; añadir solo las rutas de Learn y scripts relevantes, revisando los cambios compartidos como `sitemaps` antes de incluirlos.

M08-D queda **pendiente de ejecución contra el monorepo local del usuario**. Tras salida sin errores podemos preparar el manifiesto del commit específico (M08-E).

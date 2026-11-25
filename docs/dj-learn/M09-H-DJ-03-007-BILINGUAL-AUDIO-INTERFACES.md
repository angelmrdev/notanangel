# M09-H — DJ-03-007 · Interfaces de audio y conexiones DJ

Parche incremental para instalar sobre M09-G. Registro completo acumulado desde el último parche. Archivos: registry, TSX, CSS, EN MDX, ES MDX y esta nota.

**Protección de publicación:** `status: draft` en ambos MDX. No modifica `learn-curriculum`, manifiesto, rutas ni sitemaps; módulos 01/02 siguen publicados y el 03 permanece excluido.

Temario: función de las interfaces, ADC/DAC, cables y niveles, señales balanceadas, PHONO/MIC/LINE/potencia, routing MASTER/CUE, drivers, latencia y buffers, diagnóstico y ejercicios.

**Instalación:** extrae el ZIP en la raíz, tras M09-G.

**Validación (PowerShell):**
```
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
pnpm --dir apps/web exec node scripts/audit-learn-public-pages.mjs
```

**Nota:** Las rutas internas a DJ-03-005/006 son referencias a lecciones aún en `draft`; no se publican mientras el módulo 03 siga oculto. Durante el QA editorial del módulo, confirmar sus slugs definitivos. La compilación total debe realizarse en el repositorio real.

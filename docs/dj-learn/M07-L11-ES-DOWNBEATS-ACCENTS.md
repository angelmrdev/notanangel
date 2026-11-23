# M07-L11 — Downbeats, acentos y transitorios (ES)

- Lección: `DJ-02-005`.
- Idioma: español; conserva `status: draft`.
- URL local prevista: `/es/curso-dj/teoria-musical/downbeats-y-acentos/`.
- Parche incremental: instalar después de M07-L10, en la raíz del monorepo.
- No sobrescribe la versión inglesa ni actualiza el manifiesto.

## Archivos

1. `apps/web/content/learn/es/lessons/dj-02-005.mdx`: traducción íntegra con 15 secciones de enseñanza, 7 ejercicios, 11 FAQ, 8 referencias, ejemplos de patrones y 8 figuras.
2. `apps/web/components/learn/downbeat-visuals-es.tsx`: ocho variantes españolas; reutilizan `downbeat-visuals.module.css` ya incluido en M05-E14.
3. `apps/web/components/learn/educational-components.tsx`: registro acumulado M07-L10 más las ocho variantes nuevas.

## Validación en el monorepo

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
pnpm --filter @naa/web dev
```

La validación estructural del paquete se ha realizado al generar el ZIP. La compilación real y el renderizado deben verificarse en el entorno del proyecto.

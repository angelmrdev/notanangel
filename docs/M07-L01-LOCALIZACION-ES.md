# M07-L01 — Localización editorial ES (primer lote)

## Entregado

- Traducción editorial completa de `dj-01-001` con idéntica estructura: **48 encabezados H2/H3, 3 tablas, 5 fuentes y cuatro figuras**.
- Cuatro figuras localizadas al castellano en `lesson-visuals-es.tsx` para evitar que los diagramas del artículo ES aparezcan en inglés. La versión EN no se modifica.
- Registro `educational-components.tsx` extendido partiendo del último M05-E18 (conserva los componentes de todas las lecciones).
- `repository.ts` amplía **solo en `development`** la vista previa de módulos borrador en castellano aunque sus lecciones se vayan localizando por fases. La puerta de publicación en producción sigue exigiendo un módulo bilingüe completo con `ready`.
- Páginas ES de módulo y lección: `robots.noindex` en desarrollo. En producción mantienen la indexación habitual una vez publicados.

## URL local

`http://localhost:3000/es/curso-dj/fundamentos-dj/que-es-un-dj/`

**ATENCIÓN**: el slug del módulo de la URL depende del manifiesto `config/dj-learn-curriculum.json`. Compruébalo antes de abrir; el slug de esta lección es `que-es-un-dj`.

## Instalación

Extraer el ZIP en la raíz del monorepo tras M05-E18 y el hotfix M05-E14. Sobrescribir los archivos indicados.

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
pnpm --filter @naa/web dev
```

No modificar `config/dj-learn-curriculum.json`, ni poner los contenidos en `ready` por ahora. Los 14 artículos pendientes no se sustituyen por placeholders ni resúmenes.

## Plan de lotes restantes

- M07-L02–L06: DJ Basics (`dj-01-002` a `dj-01-006`), incluidos gráficos ES.
- M07-L07–L15: Music Theory (`dj-02-001` a `dj-02-009`), incluidos diagramas, tablas, calculadoras, ejercicios y fichas.
- Último paso: validación conjunta de 15 pares EN/ES, comprobación de etiquetas y publicación bilingüe por módulo.

## Control de alcance

Este archivo no es un paquete de 15 lecciones: **incluye 1/15**. Los siguientes 14 archivos aún requieren traducción editorial y localización de sus figuras. No se ha realizado QA visual exhaustivo (planificado después del lanzamiento).

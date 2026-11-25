# M09-J · Auditoría integral — Módulo 03 (EN/ES, draft)

Fecha: 2026-11-25. Basado en la reconstrucción incremental de M09-A hasta M09-I, incluido M09-H.1.

## Alcance y conclusiones

- 8/8 lecciones EN y 8/8 lecciones ES: frontmatter completo, IDs, orden, slugs, descripciones y estados `draft` coherentes con el manifiesto.
- 2/2 páginas de módulo EN/ES, ambas en `draft`.
- 64 gráficos didácticos, cada uno con versión EN y ES (128 inserciones de diagramas en las lecciones).
- 8 familias de componentes TSX con 16 exportaciones localizadas cada una. Todas sus variantes importadas y registradas.
- 22 enlaces internos relativos entre lecciones del módulo, con destinos y locales correctos.
- Correspondencia EN/ES de orden de lecciones, número de encabezados H2 y secuencia de diagramas.
- Sintaxis de los 8 módulos TSX analizada con el parser de TypeScript 5.8.3: 0 errores de parseo (no equivale a typecheck del proyecto).
- **Incidencia corregida:** faltaba `.matrix` en `module03-hardware-visuals.module.css`, utilizado en `HardwareFailurePoints`. No afectaba a compilación, pero sí podía dejar sin contenedor visual el cuadro comparativo.
- Estados de publicación conservados; módulo 03 sigue excluido de la primera publicación.

## Parche

- `apps/web/components/learn/module03-hardware-visuals.module.css` — añade el estilo de contenedor `.matrix`.
- `apps/web/scripts/audit-learn-module03.mjs` — auditoría de fuentes de solo lectura, sin nuevas dependencias, para repetir los controles anteriores (excepto el parseo TSX, cubierto por `typecheck`).

El script falla con código de salida 1 cuando detecta problemas de esquema, enlace, estructura bilingüe, CSS, registro o filtración al sitemap. Genera una advertencia cuando no existen sitemaps generados todavía. No cambia contenido ni estados.

## Validación local recomendada (PowerShell, raíz del monorepo)

```powershell
pnpm --dir apps/web exec node scripts/audit-learn-module03.mjs
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --dir apps/web exec node scripts/audit-learn-prepublish.mjs
pnpm --dir apps/web exec node scripts/audit-learn-seo.mjs
pnpm --filter @naa/web build
```

Solo si el build termina correctamente:

```powershell
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
pnpm --dir apps/web exec node scripts/audit-learn-public-pages.mjs
```

### Resultado esperado

- `M09-J module 03 audit: 8 EN lessons, 8 ES lessons, 128 localized diagrams, 22 relative links, 8 visual component families; 0 errors, 0 warnings`.
- Módulo registrado: 3. Módulos publicados: 2.
- 52/52 MDX compilados (34 anteriores + 18 nuevos).
- 34 páginas de lecciones/módulos exportadas de Learn EN/ES, más sus dos portadas públicas.
- 0 URLs del módulo 03 en sitemaps y rutas públicas.

## Límites y próximos pasos

No se ha ejecutado un `next build` real en el entorno Windows del usuario, ni un QA de diseño en navegador, ni se han verificado sitios externos vinculados. No cambies a `ready` ni a `published` los archivos de módulo 03; el primer despliegue conjunto con Blog se prepara en otro flujo.

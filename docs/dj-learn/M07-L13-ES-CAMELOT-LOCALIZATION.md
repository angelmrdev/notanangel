# M07-L13 — Localización ES: DJ-02-007 La rueda de Camelot

Parche incremental para aplicar en la raíz del monorepo tras M07-L12. No modifica los archivos ingleses, estilos CSS, currículo ni estado de publicación.

## Archivos

- `apps/web/content/learn/es/lessons/dj-02-007.mdx`: traducción del artículo (objetivos, tabla de 24 claves, cuatro movimientos, cuatro ejemplos, siete ejercicios, 13 FAQ, referencias, navegación y ocho figuras).
- `apps/web/components/learn/camelot-visuals-es.tsx`: ocho componentes, rueda interactiva de 24 claves y controles localizados, accesibilidad y ficha de práctica.
- `apps/web/components/learn/educational-components.tsx`: registro acumulativo extendido.
- Se reutiliza el CSS original `camelot-visuals.module.css` de M05-E16.

## Verificación en tu entorno

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
pnpm --filter @naa/web dev
```

URL en desarrollo: `http://localhost:3000/es/curso-dj/teoria-musical/rueda-de-camelot/`

En la creación del ZIP se comprobaron 12 correspondencias con 24 tonalidades, componentes registrados, estructura de capítulos, ausencia de URLs angulares MDX, sintaxis TSX con TypeScript transpileModule e integridad ZIP. No se ejecutó el build Next.js completo por no disponer del monorepo actualizado con node_modules.

# M07-L08 · Localización ES · DJ-02-002

- 8 componentes visuales españoles (`*Es`) registrados en `educational-components.tsx`.
- El CSS original `beats-bars-visuals.module.css` se reutiliza; no se modifica.
- Archivo MDX español completo, conservando 13 secciones, tablas, ejercicios, FAQ y 7 referencias.
- El inglés, el manifiesto y el estado draft no se modifican.
- Instalar después de M07-L07.

## Comprobación

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
```

URL prevista: /es/curso-dj/teoria-musical/pulsos-compases-indicaciones-compas/

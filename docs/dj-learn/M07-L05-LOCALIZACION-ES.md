# M07-L05 · Terminología esencial del DJ — Localización completa

Parche incremental sobre **M07-L04**. No altera el MDX EN ni el manifiesto de publicación.

## Archivos
- `apps/web/content/learn/es/lessons/dj-01-005.mdx` — 89 entradas completas, definiciones, ejemplos, referencias a otras lecciones, 14 comparativas, cuatro escenarios, cuatro ejercicios, diez FAQ, índice A–Z y nueve fuentes.
- `apps/web/components/learn/glossary-visuals-es.tsx` — siete componentes localizados, manteniendo el CSS original.
- `apps/web/components/learn/educational-components.tsx` — registro acumulativo desde M07-L04.

**URL en desarrollo:** `/es/curso-dj/fundamentos-dj/terminologia-esencial-dj/`.

**Validación:** `pnpm --filter @naa/web typecheck`, `pnpm --filter @naa/web lint`, `pnpm --filter @naa/web learn:validate`, `pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs`, `pnpm --filter @naa/web build`.

La denominación de los 89 términos y los identificadores `DJ-xx-xxx` se mantienen según el original para ayudar a usar manuales y preparar enlaces internos. No se ha cambiado `status: draft`.

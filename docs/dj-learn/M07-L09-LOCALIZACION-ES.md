# M07-L09 — Localización ES de DJ-02-003

**Lección:** Cómo contar frases musicales al pinchar.

Instalar después de M07-L08. El parche incorpora el MDX español completo y siete variantes españolas de los gráficos de fraseo. Reutiliza `phrase-counting-visuals.module.css`, conservando todas las versiones inglesas. No modifica manifiestos ni estados de publicación.

## Validaciones

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
```

**URL de desarrollo prevista:** `/es/curso-dj/teoria-musical/contar-frases-musicales/`. Comprobar que coincide con el manifiesto de slugs antes de publicar.

La prueba final de TSX/MDX en el monorepo del usuario queda pendiente. No publicar hasta validar el contenido bilingüe.

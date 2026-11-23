# M07-L06 — Localización de la lección 6 (ES)

- Artículo: `apps/web/content/learn/es/lessons/dj-01-006.mdx`.
- Visuales españoles: `apps/web/components/learn/first-setup-visuals-es.tsx` (10 componentes; CSS compartido con la versión EN).
- Registro: `apps/web/components/learn/educational-components.tsx` actualizado a partir de M07-L05.
- El manifiesto de publicación y el MDX inglés quedan intactos. `status: draft`.
- Comprueba los slugs de esta entrega con el currículo del repositorio antes de la publicación. Los identificadores de otras lecciones son referencias editoriales, no enlaces automáticos.

## Validaciones en el monorepo

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
pnpm --filter @naa/web dev
```

Ruta local prevista: `/es/curso-dj/fundamentos-dj/configurar-primer-equipo-dj/` (confirmar slug en manifiesto).

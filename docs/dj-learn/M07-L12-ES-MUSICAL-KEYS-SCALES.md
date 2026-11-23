# M07-L12 — Localización ES de DJ-02-006

- MDX completo localizado al español: 17 secciones numeradas, 8 ejercicios, 14 preguntas frecuentes y 8 referencias.
- 9 diagramas reutilizando los estilos de `keys-scales-visuals.module.css`, con etiquetas, descripciones y fichas en español.
- Registro MDX ampliado a partir del parche M07-L11; no toca los componentes en inglés.
- Sin cambios de publicación: `status: draft`.
- Instalación: descomprimir en la raíz del monorepo después de M07-L11 y su hotfix.
- Ruta de desarrollo: `/es/curso-dj/teoria-musical/tonalidades-y-escalas-musicales/`. Confirmar que coincida con el slug del manifiesto.
- Validación local: `pnpm --filter @naa/web typecheck`, `lint`, `learn:validate`, `pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs`, `build` y prueba en navegador.

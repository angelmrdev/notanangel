# M07-L10 — Localización ES de DJ-02-004

Instalar sobre M07-L09. Parche incremental: no modifica inglés, estilos CSS, currículo ni estados de publicación.

- `content/learn/es/lessons/dj-02-004.mdx`: artículo español, 19 apartados didácticos, 6 ejercicios, 12 preguntas frecuentes, 9 referencias, 8 visualizaciones y un ejemplo original a 128 BPM de 112 compases.
- `components/learn/song-structure-visuals-es.tsx`: ocho figuras totalmente localizadas; reutilizan `song-structure-visuals.module.css`.
- `components/learn/educational-components.tsx`: registro acumulado M07-L09 + ocho nuevas variantes ES.

Ruta local prevista: `/es/curso-dj/teoria-musical/estructura-de-una-cancion/`.

Validación local:

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
pnpm --filter @naa/web dev
```

El paquete no incluye `node_modules`; las pruebas completas de Next.js y MDX deben ejecutarse en el monorepo real. La revisión visual exhaustiva queda para después de publicar los módulos bilingües, como se acordó.

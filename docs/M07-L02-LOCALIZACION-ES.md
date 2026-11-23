# M07-L02 — Historia del DJing (ES)

Parche incremental posterior a M07-L01. Instalar sobre el repositorio después de haber aplicado M05-E18, el hotfix de validación y M07-L01.

## Archivos
- `apps/web/content/learn/es/lessons/dj-01-002.mdx`: traducción española integral de los apartados, cronología, tablas, mitos, preguntas, ejercicio y 19 referencias; mantiene `status: draft`.
- `apps/web/components/learn/history-visuals-es.tsx`: siete diagramas históricos con rótulos, descripciones, textos alternativos y ficha traducidos. Reutiliza el CSS original `history-visuals.module.css`.
- `apps/web/components/learn/educational-components.tsx`: añade el registro de siete componentes `*Es` sobre la versión acumulativa de M07-L01.

Ruta local: `/es/curso-dj/fundamentos-dj/historia-del-djing/`. En modo desarrollo usa la previsualización de las rutas finales provista por M07-L01. No activa publicación.

## Verificación en el repositorio
```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
pnpm --filter @naa/web dev
```

Revisar visualmente la ruta local y enlaces de referencias. Los 19 enlaces conservan sus URL y el artículo mantiene las advertencias históricas del inglés.

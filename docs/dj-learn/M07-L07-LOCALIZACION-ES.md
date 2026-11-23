# M07-L07 — Ritmo, pulso, tempo y BPM

- Traducción editorial al español de DJ-02-001, manteniendo 13 bloques numerados, 9 preguntas frecuentes, tablas, ejercicios y 6 fuentes.
- Ocho componentes visuales localizados: siete figuras estáticas y la calculadora interactiva.
- Reutiliza `rhythm-bpm-visuals.module.css`; se conserva íntegra la versión inglesa.
- Estado `draft` y manifiesto de publicación sin cambios.
- URL prevista en desarrollo: `/es/curso-dj/teoria-musical/que-es-bpm/`; verificar el slug del módulo en el registro local.

## Validación local

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
pnpm --filter @naa/web dev
```

Revisar la ruta en desarrollo y el funcionamiento de la calculadora. La validación de producción no garantiza renderizado de contenido en estado `draft`.

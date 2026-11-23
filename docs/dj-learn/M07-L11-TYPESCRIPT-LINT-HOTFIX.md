# M07-L11 — Correctivo TypeScript y lint

- `rhythm-bpm-visuals-es.tsx`: las tres filas de percusión ahora acceden a las claves reales `kick`, `palma`, `charles`; se conservan `data-tone=kick/clap/hat` para los estilos y se muestran etiquetas en castellano.
- `energy-visuals.tsx`: elimina el tipo `Point` no utilizado.

No modifica contenidos MDX, manifiestos, estados de publicación ni versiones inglesas de las lecciones.

Comprobar: `pnpm --filter @naa/web typecheck`, `pnpm --filter @naa/web lint`, `pnpm --filter @naa/web build`.

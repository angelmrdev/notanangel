# Not an Angel — Monorepo

M01-A: base técnica de la plataforma editorial. El contenido editorial existente permanece en `docs/` sin modificaciones.

## Requisitos
- Node.js 22 (o versión compatible con Next.js 16)
- pnpm 10

## Arranque
```powershell
pnpm install
pnpm dev
```
Abrir http://localhost:3000/en o http://localhost:3000/es.

## Validación
```powershell
pnpm typecheck
pnpm lint
pnpm build
```

La aplicación utiliza `output: 'export'` como punto de partida. La salida estática se genera en `apps/web/out` después de `pnpm build`. El despliegue real en Hostinger se validará en M01-D. No hay backend ni credenciales en este incremento.

## Alcance
- Web mínima bilingüe y layout responsive.
- Sin MDX, Supabase, R2, Studio ni publicidad todavía.
- La arquitectura editorial de Learn DJ se conserva en `docs/dj-learn/`.

## Próximos pasos
M01-B: rutas, layout, diseño y navegación. M01-C: motor MDX. M01-D: build y despliegue.

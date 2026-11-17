# M01-A — Bootstrap técnico

**Estado:** Entrega inicial; pendiente de validación local.

## Incluye
- Workspace pnpm + Turborepo.
- Aplicación Next.js 16 con TypeScript, ESLint y App Router.
- Exportación estática (`output: export`) y páginas de entrada `/`, `/en/`, `/es/`.
- Estilos provisionales inspirados en la identidad POP; no constituyen el design system final.
- Scripts `dev`, `build`, `lint`, `typecheck`.

## No incluye
- MDX ni taxonomía Learn DJ / Journal.
- Conexiones a GitHub, Hostinger, Supabase o R2.
- SEO definitivo, analítica ni publicidad.

## Validación
1. `pnpm install`
2. `pnpm dev` y visitar `http://localhost:3000/en/` y `/es/`.
3. Detener el servidor con Ctrl+C.
4. `pnpm typecheck`, `pnpm lint`, `pnpm build`.
5. Comprobar `apps/web/out`.

## Nota de integración
Descomprimir el ZIP en la raíz del directorio `notanangel`, sin crear una carpeta `notanangel` adicional. Los documentos existentes en `docs/` se mantienen intactos.

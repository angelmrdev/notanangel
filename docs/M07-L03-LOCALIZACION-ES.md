# M07-L03 — Tipos de DJs (ES)

Parche incremental de localización para `dj-01-003`, posterior a M07-L02.

## Contenido

- `apps/web/content/learn/es/lessons/dj-01-003.mdx`: traducción editorial completa, sin omitir comparativas, casos, ejercicios, FAQ, conclusiones ni ocho referencias. Conserva `id: dj-01-003`, `moduleId: dj-module-01`, `order: 3` y `status: draft`.
- `apps/web/components/learn/dj-types-visuals-es.tsx`: siete diagramas independientes con rótulos, leyendas, tablas, descripciones accesibles y textos auxiliares en español. Reutiliza `dj-types-visuals.module.css` del parche original; no lo sobrescribe.
- `apps/web/components/learn/educational-components.tsx`: registro acumulativo de M07-L02 más los siete nuevos componentes `*Es`.

URL de desarrollo: `/es/curso-dj/fundamentos-dj/tipos-de-djs/`.

**Importante**: El ZIP presupone instalados M05-E18, el hotfix de validación y M07-L01 y L02. No marca el módulo como publicado ni modifica el inglés.

## Validación local

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --filter @naa/web build
pnpm --filter @naa/web dev
```

Revisar después la URL indicada. Las pruebas TypeScript, ESLint, MDX y navegador deben realizarse en el repositorio real; las comprobaciones del paquete únicamente verifican estructura, integridad y correspondencia de componentes.

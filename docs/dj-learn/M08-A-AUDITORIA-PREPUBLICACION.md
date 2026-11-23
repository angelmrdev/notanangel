# M08-A · Auditoría técnica de prepublicación (Learn to DJ)

## Objetivo

Comprobar las referencias internas del currículo **sin cambiar** los estados `draft`, `ready` o `published`, sin modificar contenido y sin tocar el blog/infraestructura. Instalar este parche encima del monorepo con M07-L15 y los hotfixes previos.

## Qué hemos comprobado

Auditoría preliminar reconstruida a partir de la copia `notanangel-monorepo-20261119-004913.zip` más los parches de Learn M05 y M07, incluido el hotfix M07-L11:

- 2 módulos registrados; 15 lecciones por idioma en total (6 + 9).
- 34 documentos MDX esperados: 30 lecciones + 4 páginas de módulo, todos presentes.
- 0 errores de IDs, `locale`, `moduleId`, `order`, slugs, rutas duplicadas o nombres de componentes MDX no registrados.
- 0 enlaces Markdown internos a rutas Learn desconocidas detectados.
- 0 URL en formato `<https://...>` detectadas.
- 34/34 documentos siguen en `status: draft`; ambos módulos también están en `draft`.
- Resultado del auditor: `errors: 0`, `warnings: 0` sobre la reconstrucción. Esto **no equivale** a un build real del monorepo local.

## Archivo entregado

`apps/web/scripts/audit-learn-prepublish.mjs` es un script **de solo lectura** y sin dependencias externas adicionales. Verifica el registro de componentes MDX; la presencia e identidad de los documentos EN/ES; estados válidos; número de orden y módulo; slugs; rutas únicas; enlaces Markdown internos; y marcadores editoriales en mayúsculas. Devuelve código de salida 1 ante errores.

## Ejecutar desde la raíz del monorepo

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --dir apps/web exec node scripts/audit-learn-prepublish.mjs
pnpm --filter @naa/web build
```

**No activar la publicación todavía.** La comprobación MDX existente valida la sintaxis sin renderizar todos los componentes. El build con módulos en borrador tampoco garantiza las 30 rutas públicas. Esas son pruebas de la siguiente fase: prueba controlada con `ready` + `published` y SSG real, sin desplegar aún.

## Qué no cubre esta auditoría

- Inspección visual/responsive (pospuesta por decisión editorial).
- Comprobación real de enlaces externos HTTP, atribuciones o contenido factual.
- Validación de hashes/anchors generados por Markdown.
- Errores React durante el render, `typecheck`/ESLint, ni `next build` de tu estado local. Ejecuta los comandos anteriores.
- Validación SEO de canonical/hreflang/Schema.org: M08-B.
- Verificación de archivos nuevos o modificaciones del blog/infraestructura en otros chats.

## Siguiente paso

Cuando las seis pruebas pasen en la carpeta real, avanzaremos a M08-B (SEO y rutas alternas) y luego a M08-C/D (activación editorial controlada y build de 30 lecciones + 4 páginas de módulo). El commit final será de archivos de Learn y solo una vez confirmado el build SSG.

# M05-E — Auditoría del motor real y primer piloto MDX (2026-11-18)

## Alcance y procedencia

Inspección del archivo aportado `notanangel-monorepo-20261118-190057(1).zip`, cuyo contenido se ha extraído en un directorio temporal. No se ha modificado el repositorio original del usuario ni se ha ejecutado la instalación de dependencias o la compilación del proyecto.

## Hallazgos confirmados

1. **Motor de publicación implementado.** `apps/web/lib/learn/repository.ts` carga exclusivamente `apps/web/content/learn/{en,es}/modules|lessons/*.mdx`, valida el frontmatter con Zod y usa `dj-learn-curriculum.json` para identificar módulos y el orden.
2. **Gate bilingüe funcional a nivel de fuentes.** Solo los módulos del manifiesto con `status: published` se exponen; exige un hub EN, un hub ES y todas las lecciones `status: ready`, en su orden e identificador correctos. Las rutas solo incluyen elementos publicados.
3. **En el ZIP inspeccionado ambos módulos siguen en `draft`.** El manifiesto contiene las lecciones 6 + 9 y no hay `apps/web/content/learn/` con MDX; por tanto, la portada del curso muestra el estado vacío y no existen lecciones publicadas.
4. **Plantillas disponibles.** `LearnIndex`, `LearnModulePage`, `LearnLessonPage` implementan portada, módulos, breadcrumbs, índice lateral y navegación anterior/siguiente. `compileMDX` y `remark-gfm` renderizan el cuerpo. Los componentes existentes son `KeyConcept`, `PracticeExercise`, `DJTip`, `LessonChecklist`, `LearnFigure`.
5. **Rutas confirmadas.** Inglés `/learn-to-dj/{module}/{lesson}/`; español `/es/curso-dj/{module}/{lesson}/`; módulos `dj-basics` / `fundamentos-dj` y `music-theory` / `teoria-musical`. No introducir `/en/` en rutas públicas.
6. **Publicación y sitemap.** El script `generate-sitemaps.mjs` incluye solo los módulos `published` y sus lecciones listas, con alternates bilingües. El validador `validate-learn-publication.mjs` solo comprueba fuentes de módulos publicados; no valida exhaustivamente briefs, accesibilidad, enlaces ni calidad editorial de borradores.
7. **15 lecciones EN recuperadas.** `content/dj-learn/en/lessons/` contiene exactamente 15 `.md` (6 M01, 9 M02). No hay directorio de lecciones ES, ni páginas editoriales de módulo, ni MDX de publicación.
8. **Discrepancias reales de frontmatter.** Los tres primeros artículos usan `module_id: dj-module-01`, `seo_description` y omiten H1. Los posteriores usan `module_id: dj-01` / `dj-02`, `meta_description` y suelen incluir H1; ninguno cumple directamente el contrato MDX (`moduleId`, `description`, `order`, `status: ready|draft`). Debe normalizarse la copia de publicación y preservarse la fuente editorial.
9. **122 anotaciones MEDIA-BRIEF detectadas en los 15 documentos.** Son instrucciones internas, no assets renderizables. No deben pasar a MDX público, y el sistema no debe tratar un `brief` como imagen resuelta.
10. **No hay modo de previsualización para borradores.** El router usa `getPublishedLearnModules`; una lección `draft` no puede verse por la ruta pública ni debe activarse su módulo prematuramente. Crear una vista de staging estrictamente local, sin rutas exportadas ni indexación, antes de la maquetación visual.
11. **CSS de lectura incompleto para contenidos extensos.** `learn.module.css` define H2/H3, columna lectura y sidebar, pero no ofrece estilos dedicados a tablas densas, listas de ejercicios, glosarios, referencias, TOC local por artículo ni bloques de fórmulas; serán importantes para estas lecciones.
12. **Componente LearnFigure seguro en origen.** Exige una URL pública local y ALT no vacío. Debe mantenerse ese límite y añadirse gestión de dimensiones reales/licencias al proceso editorial.

## Piloto incluido en este ZIP

- `apps/web/content/learn/en/lessons/dj-01-006.mdx`
- `apps/web/content/learn/en/lessons/dj-02-003.mdx`

Son **copias manualmente estructuradas de borrador**, con frontmatter del repositorio y la prosa del `.md` original; los comentarios editoriales/medios y el H1 interno se han excluido para no mostrar dos títulos, mientras las imágenes siguen **pendientes**, NO insertadas. No se han inventado URLs a ilustraciones. Se ha convertido una referencia `.md` relativa en texto para no producir un enlace roto. Estos pilotos sirven para validar el contrato documental, **no son la maquetación gráfica final** ni están aprobados para publicación.

## Plan de integración recomendado (sin modificar el gate)

1. **M05-E1 — Previsualización privada de borradores + QA de render.** Implementar una vista de dev/staging con lectura de archivos `draft`, bloqueada por `NODE_ENV` en producción, con `noindex` y sin generación estática pública. Integrar un lector MDX de prueba y corregir errores reales de compilación.
2. **M05-E2 — Dos pilotos visuales.** Maquetar `dj-01-006` (paso a paso, diagramas, checklists) y `dj-02-003` (tablas, líneas temporales, ejercicios). Construir progresivamente estilos/componentes reutilizables POP CHAOS sin duplicar el motor.
3. **M05-E3 — Auditoría editorial de 15/15.** Revisar hechos, bibliografía, referencias relativas, dependencias de lecciones futuras, repeticiones y estado de cada uno de los 122 briefs. Priorizar los recursos realmente imprescindibles de M01/M02.
4. **M05-E4 — Adaptar las 15 EN a MDX.** Mantener los `.md` originales como fuente y crear MDX derivados con `status: draft`. Incorporar gráficos originales aprobados, no placeholders falsos.
5. **M05-E5 — Localizar ES.** Revisar y aprobar los `.md` editoriales en español; crear las 15 variantes MDX ES; preparar dos hubs editoriales bilingües; validar terminología y slugs.
6. **M05-E6 — Lanzamiento modular.** Marcar `ready` solo tras QA editorial/visual/accesibilidad; comprobar EN+ES, todas las referencias y assets; publicar desde el manifiesto **primero M01 y luego M02 si ambos pasan sus respectivos gates**, o juntos si se desea. Ejecutar `pnpm --dir apps/web learn:validate`, `pnpm typecheck`, `pnpm lint`, `pnpm build` y pruebas en staging. No comprometer las rutas `__empty__` como páginas indexables.

## Qué no hace este parche

- No modifica archivos del motor, CSS o manifiesto.
- No marca ninguna lección ni módulo como `ready`/`published`.
- No inventa ES, imágenes ni permisos de licencia.
- No presume resultados de `pnpm build`, `lint`, `typecheck` o pruebas visuales que no han sido ejecutadas.

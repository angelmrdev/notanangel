# M05-D — Guía maestra de maquetación Learn to DJ

## Fuente y destino
- **Fuente editorial inmutable:** `content/dj-learn/{locale}/lessons/{id}.md` (y los módulos editoriales). No se importa en la web.
- **Fuente de publicación:** `apps/web/content/learn/{locale}/lessons/{id}.mdx` y `modules/{id}.mdx`.
- Los MDX son **adaptaciones manuales**, no transformaciones automáticas. Conservar contenido, sentido, jerarquía, referencias y briefs revisados; sustituir briefs visuales por recursos reales cuando existan.
- No se publica contenido hasta tener **un módulo entero en EN y ES**, incluidas sus portadas MDX, todas las lecciones, enlaces y recursos.

## Metadatos de publicación
**Módulo** (`modules/dj-module-01.mdx`):
```yaml
---
id: dj-module-01
locale: en
title: DJ Basics
description: An introduction to DJing.
status: ready
---
```
**Lección** (`lessons/dj-01-001.mdx`):
```yaml
---
id: dj-01-001
locale: en
moduleId: dj-module-01
order: 1
slug: what-is-a-dj
title: What Is a DJ?
description: Learn what DJs do and how they work.
status: ready
---
```
En español, mantener `id`, `moduleId` y `order`; localizar `title`, `description`, `slug`, y usar `locale: es`. Los valores de arriba son **ejemplos técnicos**, no textos finales.

## Componentes educativos disponibles
En MDX se pueden utilizar sin importaciones manuales:
```mdx
<KeyConcept title="Core idea">Explain the principle.</KeyConcept>
<DJTip title="Pro tip">Give practical advice.</DJTip>
<PracticeExercise title="Try it">Describe a repeatable exercise.</PracticeExercise>
<LessonChecklist title="Check yourself">
- [ ] I can explain the concept.
- [ ] I have practiced the exercise.
</LessonChecklist>
<LearnFigure src="/images/learn/dj-01-001/example.webp" alt="Two aligned waveforms" caption="Example of phrase alignment" width={1200} height={750} />
```
Los recursos visuales se alojan en `apps/web/public/images/learn/...`; cada imagen requiere `alt` descriptivo y dimensiones reales. Los componentes no realizan evaluaciones ni guardan progreso.

## URLs y publicación
EN: `/learn-to-dj/{module-slug}/{lesson-slug}/`.
ES: `/es/curso-dj/{module-slug}/{lesson-slug}/`.
El registro `apps/web/config/dj-learn-curriculum.json` determina el orden, IDs y estado de cada módulo. **Solo** cambiar `status` a `published` después de crear y revisar todos sus MDX en ambos idiomas.

## Checklist por módulo
1. Adaptar página de módulo y todas las lecciones EN/ES, sin alterar los `.md` editoriales.
2. Comprobar contenido, enlaces internos, referencias, ortografía y traducciones.
3. Verificar imágenes, permisos de uso, textos alternativos, tamaño y visualización móvil.
4. Confirmar slugs únicos por módulo/idioma y el orden `1..N`.
5. Ejecutar `pnpm --dir apps/web learn:validate` y `pnpm build` tras marcar el módulo como publicado.
6. Revisar rutas EN/ES, canonicals, `hreflang`, navegación, y XML de ambos sitemaps.
7. No enlazar ni indexar rutas internas `__empty__` generadas solo para exportar rutas vacías.

## SEO
El generador de sitemaps incluye las landings del curso y **solo módulos publicados**, con lecciones validadas y pares EN/ES. Las landings son accesibles aun sin módulos. No incluir borradores en XML.

## Límites de M05-D
No se incluyen MDX editoriales definitivos, imágenes reales, vídeo, tests interactivos ni progreso de usuario. Esos elementos se incorporan cuando se maqueten las lecciones.

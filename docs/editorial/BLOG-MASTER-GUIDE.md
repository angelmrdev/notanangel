# NOT AN ANGEL — Blog MDX: guía maestra editorial y técnica

**Versión:** 1.0 · **Base inspeccionada:** monorepo 2026-11-18 + parches M04-A, M04-B, M04-C y M04-C.1.  
**Objetivo:** contrato de trabajo para generar, revisar y publicar artículos en inglés y español sin modificar el motor en cada publicación.

## 1. Principios

- Fuente de verdad: archivos `.mdx` en Git, compilados por Next.js (exportación estática).
- Idiomas: `en` y `es`. La versión inglesa vive en `/blog/`; la española en `/es/blog/`.
- Cada traducción es un archivo independiente; ambas comparten el mismo `id` editorial.
- Artículos, categorías y etiquetas comparten el espacio de URLs `/blog/{slug}/` o `/es/blog/{slug}/`. **No existen** `/category/` ni `/tag/`.
- No crear artículos ficticios ni enlazar a páginas aún inexistentes. No publicar borradores.
- La edición de MDX no publica por sí sola: se necesita un build y despliegue de la versión nueva.

## 2. Directorios y nombres

Desde la raíz del monorepo:

```text
apps/web/
  content/blog/
    en/
      how-to-beatmatch.mdx
    es/
      como-cuadrar-beats.mdx
  public/images/blog/
    beatmatching/
      cover.webp
      waveforms.webp
  lib/blog/
    types.ts
    repository.ts
    taxonomies.ts
    views.ts
    seo.ts
  components/blog/
    mdx-components.tsx
  scripts/
    validate-blog.mjs
    generate-sitemaps.mjs
```

**Convención editorial recomendada:** un archivo por artículo e idioma; nombre de archivo descriptivo y parecido al slug. El nombre de archivo no define la URL: la define `slug`. El lector actual busca archivos `.mdx` **directamente** en `content/blog/en/` y `content/blog/es/`; **no busca subcarpetas**. Las imágenes pueden organizarse en subcarpetas dentro de `public/images/blog/`.

## 3. Frontmatter admitido por el motor

| Campo | Tipo | Obligatorio | Comportamiento |
|---|---|---|---|
| `id` | texto | Sí | Identificador estable compartido por traducciones |
| `locale` | `en` / `es` | Sí | Debe coincidir con la carpeta |
| `slug` | texto | Sí | Solo minúsculas, números y guiones; único en idioma |
| `title` | texto | Sí | Título editorial |
| `description` | texto | Sí | Resumen / descripción SEO |
| `status` | `draft` / `scheduled` / `published` | Sí | Solo `published` puede salir en la web |
| `publishedAt` | `YYYY-MM-DD` | Sí salvo `draft` | Debe ser hoy o fecha anterior para mostrarse |
| `updatedAt` | `YYYY-MM-DD` | No | Fecha de actualización |
| `category` | ID de categoría | Sí | Solo una categoría principal |
| `tags` | lista de IDs | No | Por defecto `[]` |
| `featured` | booleano | No | Metadato disponible; comprobar uso visual antes de prometer destacados |
| `cover.src` | ruta desde `/` | No | Imagen pública de portada |
| `cover.alt` | texto | Si existe `cover` | Texto alternativo |
| `cover.width`, `cover.height` | enteros positivos | No | Dimensiones opcionales |
| `seo.index` | booleano | No | `false` excluye del sitemap de artículos |
| `seo.canonical` | texto | No | Canonical alternativo; el generador actual excluye del sitemap si se indica |
| `related` | lista de IDs | No | Prioriza esos artículos relacionados del mismo idioma |

**Importante:** el esquema del repositorio es estricto: campos no reconocidos pueden provocar fallo. No inventar `excerpt`, `author`, `readingTime`, `keywords`, `image`, `publishAt`, `translations` ni objetos adicionales sin ampliar antes el motor.

## 4. Plantilla inglesa

Guardar como `apps/web/content/blog/en/how-to-beatmatch.mdx`:

```mdx
---
id: beatmatching-guide
locale: en
slug: how-to-beatmatch
title: "How to Beatmatch: A Practical DJ Guide"
description: "Learn the fundamentals of matching tempo and beats between tracks."
status: draft
publishedAt: "2026-11-18"
updatedAt: "2026-11-18"
category: dj-culture
tags:
  - rekordbox
featured: false
cover:
  src: /images/blog/beatmatching/cover.webp
  alt: "DJ software showing two aligned track waveforms"
  width: 1200
  height: 750
seo:
  index: true
related: []
---

Introductory paragraph that answers the reader's intent.

## What is beatmatching?

Explain the concept clearly.

## How to practise

1. Choose two tracks.
2. Listen to the beat.
3. Adjust and refine.

<InfoCallout title="DJ tip">
Practise listening before relying on visual waveforms.
</InfoCallout>

<EditorialImage
  src="/images/blog/beatmatching/waveforms.webp"
  alt="Two waveforms aligned on a DJ software timeline"
  caption="Example of beat alignment."
  width={1200}
  height={750}
/>

## Next steps

Conclude with useful advice.
```

**Es una plantilla de ejemplo, no una entrada lista para publicar.** El archivo de imagen debe existir antes de pasar a `published`.

## 5. Plantilla española

Guardar como `apps/web/content/blog/es/como-cuadrar-beats.mdx`:

```mdx
---
id: beatmatching-guide
locale: es
slug: como-cuadrar-beats
title: "Cómo cuadrar beats: guía práctica para DJ"
description: "Aprende a sincronizar el tempo y los golpes de dos canciones."
status: draft
publishedAt: "2026-11-18"
category: dj-culture
tags:
  - rekordbox
seo:
  index: true
---

Introducción al tema.

## Qué es el beatmatching

Explicación clara y práctica.
```

El `id` debe coincidir con la entrada inglesa, pero **no** el slug, título ni contenido. Si una traducción no está publicada, no debe anunciarse como alternativa disponible.

## 6. Taxonomías actualmente definidas

| Tipo | ID en MDX | URL EN | URL ES |
|---|---|---|---|
| Categoría | `dj-culture` | `/blog/dj-culture/` | `/es/blog/cultura-dj/` |
| Categoría | `reviews` | `/blog/reviews/` | `/es/blog/resenas/` |
| Etiqueta | `rekordbox` | `/blog/rekordbox/` | `/es/blog/rekordbox/` |

La fuente de taxonomías del render es `apps/web/lib/blog/taxonomies.ts`. **Deuda técnica antes del lanzamiento:** `scripts/validate-blog.mjs` y `scripts/generate-sitemaps.mjs` mantienen listas paralelas. Añadir un término exige sincronizar los tres archivos hasta que unifiquemos el catálogo. El equipo editorial debe solicitar nuevos términos, no inventarlos en el frontmatter.

**Regla de colisiones:** una categoría, etiqueta o artículo no puede usar un slug ya ocupado por otro recurso en el mismo idioma. El repositorio comprueba las colisiones; el script de validación CLI actual no cubre todas las colisiones con términos. Evitar reutilizaciones.

## 7. Markdown y componentes MDX

Admitido: encabezados `##`/`###`, párrafos, enlaces, listas, negrita, citas, bloques de código y tablas mediante `remark-gfm`.

Componentes definidos en `components/blog/mdx-components.tsx`:

```mdx
<InfoCallout title="Remember">
Helpful note.
</InfoCallout>

<EditorialImage
  src="/images/blog/example.webp"
  alt="Meaningful description"
  caption="Optional caption"
  width={1200}
  height={750}
/>
```

Las imágenes Markdown `![Descripción](/images/blog/example.webp)` se convierten también en `next/image` con dimensiones predeterminadas 1200 × 750. Para controlar dimensiones y pie, usar `EditorialImage`. No utilizar imágenes remotas sin revisar la configuración de `next/image` y la exportación estática.

## 8. Flujo editorial recomendado

1. Elegir intención de búsqueda, tema, idioma, categoría y slug disponible.
2. Crear MDX en la carpeta del idioma correspondiente con `status: draft`.
3. Preparar imágenes optimizadas dentro de `apps/web/public/images/blog/` y completar `alt` descriptivo.
4. Revisar estructura, enlaces, ortografía, exactitud y metadatos. Usar IDs existentes de taxonomías.
5. Crear la traducción con el **mismo** `id` y slug localizado; puede permanecer en `draft`.
6. Al aprobar, cambiar a `status: published`, establecer `publishedAt` y revisar `seo.index`.
7. Ejecutar desde la raíz: `pnpm --filter @naa/web blog:validate`, `pnpm build`, `pnpm typecheck`, `pnpm lint`.
8. Inspeccionar las rutas exportadas y `apps/web/out/sitemaps/en/blog.xml` o `es/blog.xml`.
9. Commit, push y despliegue. Comprobar en producción página, canonical, enlaces y sitemap.

**Estados reales:** `draft` y `scheduled` no se renderizan. `published` se muestra únicamente si `publishedAt <= fecha UTC del build`. Para publicar en una fecha futura se requiere cambiar a `published` y ejecutar un build cuando corresponda. No hay un programador de publicación automático.

## 9. SEO y sitemaps

- Índice: `/sitemap.xml`.
- Sitemaps del Blog: `/sitemaps/en/blog.xml` y `/sitemaps/es/blog.xml`.
- Las entradas `published` con fecha válida e `seo.index` distinto de `false` se incluyen, salvo canonical alternativo.
- El sitemap también recoge el índice del Blog y taxonomías activas con contenido publicado.
- Las traducciones se vinculan mediante `id` cuando ambas están publicadas e indexables.
- Se genera JSON-LD `BlogPosting` y `BreadcrumbList` para artículos.
- La fecha y los sitemaps se evalúan durante el build: publicar o modificar archivos requiere un nuevo despliegue.

**Limitación a resolver:** el script del sitemap puede incluir URLs de taxonomía con contenido publicado aunque esos artículos tengan `seo.index: false`; revisaremos consistencia antes de lanzamiento. El campo `seo.canonical` debe usarse solo tras comprobar su efecto real en metadata y sitemap.

## 10. Checklist de aceptación de cada artículo

- [ ] Archivo en carpeta correcta, sin subcarpetas de MDX.
- [ ] `id` coherente entre traducciones; slug único por idioma.
- [ ] Frontmatter válido, categoría y etiquetas existentes.
- [ ] Sin contenido provisional ni enlaces rotos.
- [ ] Imágenes reales, optimizadas y con alt.
- [ ] Título y descripción únicos; encabezados semánticos.
- [ ] Estado y fecha correctos; `seo.index` intencionado.
- [ ] Validación, build, typecheck y lint correctos.
- [ ] URL, canonical, hreflang y sitemap verificados tras despliegue.

## 11. Trabajo paralelo y puntos pendientes del motor

**Editorial (otro chat):** briefs, investigación, redacción EN/ES, imágenes, MDX en estado draft y revisión.

**Desarrollo (este chat):** reparar cualquier fallo del build, unificar taxonomías/validadores/sitemaps, prueba con pareja real EN/ES, QA visual, páginas legales y privacidad, Hostinger, GSC y Analytics, y luego motor Learn to DJ.

**Antes de lanzar:** comprobar que M04-C.1 ha corregido el error TypeScript, probar al menos un artículo por idioma, verificar las rutas y sitemaps exportados, completar información legal real y consentimiento de analítica si aplica. Este documento describe el motor implementado, no certifica que el sitio haya superado QA de producción.

## 12. Instrucción para otro chat editorial

> Trabajamos en el Blog de Not an Angel (Next.js + MDX + Git), bilingüe EN/ES. Sigue estrictamente `docs/editorial/BLOG-MASTER-GUIDE.md`. Entrega artículos como archivos `.mdx` independientes para `apps/web/content/blog/en/` y `apps/web/content/blog/es/`, con el mismo `id` y slugs localizados. Usa únicamente los campos y taxonomías definidos en la guía; no inventes componentes MDX ni URLs. Mantén `status: draft` hasta aprobación. Si un artículo necesita una nueva categoría, etiqueta o componente, propón el cambio por separado sin introducirlo unilateralmente. Redacta artículos publicables, sin promesas de contenido futuro ni referencias ficticias. Incluye las imágenes necesarias como propuesta de assets y sus rutas, pero no asumas que ya existen.

# DJ Learn — Markdown Editorial Contract

> **ID:** DL-003.B · **Version:** 1.0 · **Status:** Approved authoring workflow · **Date:** 2026-11-17
> **Scope:** English source prose, Spanish localization and media planning. This is not the final Next.js/MDX implementation contract.

## Decision

Write **complete educational pages in plain `.md` files**, one file per lesson, with YAML frontmatter, standard Markdown headings, tables, links, lists and editorial-only HTML comment annotations. English is canonical. Spanish is localized from the approved English revision. Convert approved Markdown to MDX only after the branding, design system and monorepo contracts are provided. Markdown is the editorial source of truth; MDX is the publishing derivative.

## Layout

```text
content/dj-learn/en/lessons/dj-01-001.md
content/dj-learn/es/lessons/dj-01-001.md
content/dj-learn/en/modules/dj-module-01.md
content/dj-learn/es/modules/dj-module-01.md
content/dj-learn/en/index.md
content/dj-learn/es/index.md
```

Documentation stays at `docs/dj-learn/`. Module ordering, stable IDs and prerequisite relationships are defined by `MASTER-CURRICULUM-REGISTRY.md`; the code-side registry will be derived later.

## Frontmatter (provisional editorial keys)

- `id`: stable lesson identifier, same in both locales
- `locale`: `en` or `es`
- `title`: reader-facing H1 working title (do not repeat as an H1 in the body unless the future renderer requires it)
- `seo_title`, `seo_description`: natural language working metadata
- `slug`: proposed localized URL segment (subject to collision checks)
- `module_id`: stable ID
- `status`: `draft`, `review`, `approved`, `localized`, `ready`
- `source_revision`: English revision identifier used for the locale; `null` until assigned
- `visual_status`: `planned`, `briefed`, `ready`, `integrated`

Final field names may change in the MDX import mapping, not the educational text.

## Writing requirements

Write the article, **not an outline**. Answer its core question early; provide definitions, reasoning, practical examples, limitations, mistakes, and useful exercises where relevant. Use meaningful H2/H3 headings; avoid fixed word-count targets, stuffing and repetitive boilerplate. Include source references when making specific technical, historical, licensing or safety claims. Use links to other planned lessons by **stable lesson ID in notes** if the URL is not yet frozen.

## Media annotations

Insert in the Markdown as an HTML comment at the precise editorial insertion point:

```md
<!-- MEDIA-BRIEF
id: dj-01-001-v01
kind: original-diagram
priority: required
placement: directly after the section explaining the DJ signal chain
purpose: Show the flow from music sources to mixer to master audio output.
content: two playback sources, mixer, headphones cue path, master output, speakers
alt_en: Diagram of two music sources feeding a DJ mixer with cue monitoring and speaker output.
alt_es: Diagrama de dos fuentes musicales conectadas a un mezclador DJ, con preescucha y salida a altavoces.
seo_filename: dj-signal-chain-diagram.svg
rights: original illustration
localization: translate in-image labels
status: planned
END MEDIA-BRIEF -->
```

Visual briefs are internal and **must be stripped or transformed before MDX compilation**. Do not invent screenshots, imply a first-hand equipment test, or add a decorative image without a learning purpose. Mark `required` only if the visual is essential for comprehension. A visual may have separate ES labels or alt text.

## Editorial to publishing handoff

1. Draft and review the complete EN `.md` document.
2. Approve the English revision.
3. Localize as a separate ES `.md`; record the source revision.
4. Resolve factual review and required media.
5. Once tech contracts arrive, implement a deterministic Markdown → MDX mapping, resolving internal links and replacing approved media briefs with real assets/components.
6. Check that MDX text is faithful to the approved Markdown. QA both languages, accessibility, SEO metadata and required media before the single public launch.

## Boundary

No branding, CSS, React component naming, Next.js route implementation or MDX compiler assumptions are required to author editorial Markdown. Avoid JSX or MDX custom tags in source `.md` files.

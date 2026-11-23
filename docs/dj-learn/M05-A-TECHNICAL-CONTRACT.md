# Not an Angel — Learn to DJ · M05-A technical contract

**Status:** Approved architecture; first incremental contract patch. **Date:** 2026-11-18.

## Source hierarchy and publication

- `docs/dj-learn/MASTER-CURRICULUM-REGISTRY.md` remains the editorial reference for the full 13-module, 105-candidate-lesson curriculum, identity, sequence and learning objectives. Its older `/en/` URLs and all-at-once launch language are superseded **for implementation** by this approved contract and `PUBLICATION-STRATEGY.md`.
- `content/dj-learn/{en,es}/lessons/dj-XX-YYY.md` remains the *authoring source of truth*. English is authored and reviewed first; Spanish is localized and reviewed independently.
- `apps/web/config/dj-learn-curriculum.json` is the machine-readable **initial release manifest**, currently only modules 01 and 02. Other modules are not deleted from the editorial registry; they will be added as development proceeds.
- Publication is **progressive by complete, reviewed bilingual modules**. A module cannot be public unless every planned lesson, both locale module hubs, and the course hub have passed QA, required media are integrated, and internal links resolve.
- Draft source files must never automatically create public routes or sitemap entries. M05-A creates **no public pages**.

## Routes

| Page | EN | ES |
| --- | --- | --- |
| Course | `/learn-to-dj/` | `/es/curso-dj/` |
| Module 01 | `/learn-to-dj/dj-basics/` | `/es/curso-dj/fundamentos-dj/` |
| Module 02 | `/learn-to-dj/music-theory/` | `/es/curso-dj/teoria-musical/` |
| Lesson | `/learn-to-dj/{module-slug}/{lesson-slug}/` | `/es/curso-dj/{module-slug-es}/{lesson-slug-es}/` |

The lesson's stable `id` links translations, not the localized slug. Modules and lessons use unique slugs within each locale/module; collisions are build errors. No `/en/` prefix. Existing public routes take precedence if collisions arise.

## Editorial frontmatter (keep existing keys)

```yaml
---
id: dj-01-001
locale: en
module_id: dj-module-01
title: "What Is a DJ?"
seo_title: "What Is a DJ? A Beginner's Guide"
seo_description: "An accurate summary for search results."
slug: what-is-a-dj
status: draft
source_revision: null
visual_status: briefed
---
```

Authoring `status` varies in existing files: early lessons use `draft`, later lessons use `editorial-draft`. The legacy `module_id: dj-01` / `dj-02` and `meta_description` are also present. M05-B must normalize these variants into the canonical publishing schema without rewriting approved editorial prose. Final readiness requires an explicit approved mapping, not a blind status conversion. The original authoring contract lists `draft`, `review`, `approved`, `localized`, `ready`. `visual_status`: `planned`, `briefed`, `ready`, `integrated`. These editorial states are **not** equivalent to the module release state (`draft` or `published`) in the manifest.

## Deterministic publishing transformation (M05-B)

1. Read Markdown frontmatter and body, validate metadata and identity against the manifest.
2. Strip `EDITORIAL-BRIEF` comments from public output; process `MEDIA-BRIEF` blocks as internal asset requirements, **never** expose them as public copy.
3. Reject a release when required media are unresolved. Insert approved assets at their exact placement with localized alt text. No invented asset URLs.
4. Resolve lesson links by stable ID to the published locale's canonical URL; reject unresolved required links, or keep unpublished related lessons unlinked.
5. Render the approved Markdown as MDX-compatible content with a controlled component set; avoid arbitrary JSX in source `.md`.
6. Produce public pages only for `published` modules and their reviewed bilingual lessons. Build and validate static export for Hostinger.

M05-A intentionally **does not implement** this transformer. It establishes the schema and an initial source validator. No automatic Markdown → MDX publication is claimed yet.

## Publication gate (M05-B / M05-D)

A module may be set to `published` only after both languages' module hubs exist, all planned lesson files exist and have `status: ready`, `visual_status: integrated`, translated slugs and SEO, required media are resolved, accessibility reviewed, and all generated pages pass QA. An additional content-asset and link check will be implemented in M05-B/D. The M05-A validator accepts both current and legacy module ID formats and checks source presence and simple frontmatter consistency; it is **not** a substitute for full editorial QA.

## Sitemaps and SEO (M05-D)

Retain `/sitemap.xml` as sitemap index; publish only released lessons/modules in `/sitemaps/en/learn-to-dj.xml` and `/sitemaps/es/learn-to-dj.xml`. Include reciprocal `hreflang` only for released locale pairs; canonical URLs are language-specific. Drafts must not be exposed as pages or sitemaps.

## Development sequence

- **M05-A:** this document, initial manifest and read-only source validator.
- **M05-B:** repository/loader, release gate, deterministic transformation, validated static routes.
- **M05-C:** POP CHAOS course/module/lesson pages, TOC, navigation, educational components.
- **M05-D:** SEO, XML sitemaps, QA and editorial handoff guide.

## Local check

From repo root: `node apps/web/scripts/validate-dj-learn.mjs` does **not** work because it expects `apps/web` as working directory. Run `pnpm --dir apps/web dj-learn:validate` after adding the package script in M05-B, or for M05-A run `cd apps/web; node scripts/validate-dj-learn.mjs`.

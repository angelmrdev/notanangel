# Not an Angel — M01 Technical Foundation

**Status:** Proposed for review  
**Date:** 2026-11-17  
**Scope:** Initial editorial MVP: Learn DJ + Journal  
**Related:** FOUNDATION-002-architecture-roadmap.md

## 1. Objective

Prepare a maintainable monorepo for a bilingual EN/ES editorial platform. Editorial planning and writing happen separately; this work defines the technical framework that accepts validated MDX. Do not implement the music catalog, download infrastructure, R2, Supabase, or local Studio in M01.

## 2. Approved baseline

- Hostinger Business is the hosting target; verify the exact product capabilities before committing to server runtime.
- Next.js 16, App Router, TypeScript, pnpm, Turborepo.
- Git/MDX is the source of truth for public editorial content.
- EN and ES versions can be published independently.
- Google Search Console and GA4; Monetag with appropriate consent management.
- No public accounts for the MVP.
- Static-first output is a proposed implementation choice, subject to compatibility checks; no server APIs or request-time rendering are assumed in M01.

## 3. Suggested repository structure

```text
not-an-angel/
├── apps/
│   └── web/
│       ├── app/
│       ├── components/
│       ├── public/
│       └── next.config.ts
├── packages/
│   ├── content/          # MDX parsing, schemas, references, manifests
│   ├── ui/               # Shared design primitives
│   ├── seo/              # Metadata, hreflang, sitemap helpers
│   └── config/           # Shared TS/ESLint configuration
├── content/
│   ├── en/
│   │   ├── learn/
│   │   ├── journal/
│   │   └── pages/
│   └── es/
│       ├── learn/
│       ├── journal/
│       └── pages/
├── docs/
│   ├── foundation/
│   ├── architecture/
│   └── editorial/
├── scripts/
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## 4. Build boundaries

1. `packages/content` reads local content files at build time, validates frontmatter and internal references, and emits a typed manifest. No runtime database dependency.
2. `apps/web` renders public pages from the manifest using reusable layouts. Drafts and unpublished locales are excluded from static route generation and sitemap.
3. `packages/seo` provides metadata, canonical URLs, alternate locales only where published, and XML sitemaps.
4. `packages/ui` defines reusable presentational primitives; rich MDX components are registered through a strict allowlist.
5. `packages/config` owns shared lint and TypeScript rules.

## 5. Routing and localization contract (initial)

- Public locale prefixes `/en/` and `/es/`.
- Localized route segments for top-level editorial areas, e.g. `/en/learn/` and `/es/aprender/`; exact public route dictionary to be documented in M04.
- Stable `contentId` pairs translations. A missing translation is not an error and must not generate an invalid hreflang alternate.
- Slugs must be unique within the effective route namespace and locale.
- A published URL change requires an explicit redirect mapping; in a static deployment, redirects must be supported by hosting rules or generated redirect pages. Do not assume Next.js server redirects work with static export.

## 6. Draft MDX content interface (to formalize in M03)

```yaml
contentId: learn-beatmatching-001
locale: es
type: lesson
slug: como-hacer-beatmatching
title: Cómo hacer beatmatching
description: Aprende a sincronizar dos canciones.
status: draft
updatedAt: 2026-11-17
```

- `contentId`, `locale`, `type`, `slug`, `title`, `description`, `status` are required.
- `type` initially supports `lesson`, `article`, and `page`; future types are explicitly versioned.
- Taxonomy/course fields are supplied by the editorial architecture and should not be invented in the technical repository.
- Media, instructional components and cross-references will have documented validation contracts in M03.

## 7. Hostinger deployment decision gate

Confirm the specific Hostinger Business environment, deployment method, custom-domain configuration, build resource limits, and static hosting behavior. Static export requires verifying compatibility with the chosen MDX pipeline, dynamic routes generated at build time, sitemap generation, and hosting rewrite/redirect handling. Dynamic endpoints for downloads will be deferred or hosted separately when needed.

## 8. Initial quality gates

- `pnpm install` reproducible from lockfile.
- `pnpm lint`, `pnpm typecheck`, and `pnpm build` pass.
- EN and ES sample editorial pages build as static HTML.
- Draft content is not emitted as a public route.
- Missing EN/ES translation does not block publishing its counterpart.
- Canonical, locale alternate links and sitemap are validated.
- Broken content references and duplicate slugs fail the build with clear messages.
- Responsive shell, keyboard navigation and accessible headings verified.

## 9. Incremental delivery plan

**M01-A:** Workspace scaffold, package boundaries, build scripts, docs.  
**M01-B:** Next.js static app shell, locale routing, placeholder published pages.  
**M01-C:** Typed MDX reader and validation with minimal sample content.  
**M01-D:** Build/CI checks and Hostinger deployment proof.  

The complete editorial schema and page designs are subsequent M02–M05 work. Avoid inventing course structures while the editorial thread is defining them.

## 10. Explicitly deferred

Supabase schema and RLS, normalized track catalog, releases and sets, R2 buckets, signed downloads, checkout, local Studio, live analytics dashboards, dynamic APIs and music-specific administration.

## 11. Open decisions

- Exact Hostinger hosting product and supported deployment workflow.
- Existing repository state: new scaffold versus incremental patch.
- Design tokens and logo assets to be used in M02.
- Final editorial frontmatter and module taxonomy from the parallel editorial work.

**Next action:** Review M01 scope and confirm repository state; then produce an incremental ZIP patch for M01-A rather than isolated shell commands.

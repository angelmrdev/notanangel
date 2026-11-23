# M05-B — Learn to DJ MDX publishing contract

## Source separation (approved)

- Editorial Markdown in repository-level `content/dj-learn/` is **never read or published** by the web engine.
- Web-ready MDX belongs to `apps/web/content/learn/{en,es}/modules/` and `apps/web/content/learn/{en,es}/lessons/`.
- Editorial adaptation (text, media, JSX components, accessibility) happens **manually in the other editorial workflow**. There is **no automatic Markdown-to-MDX conversion**.
- Manifest: `apps/web/config/dj-learn-curriculum.json`. Add later modules here. Module `status: draft` means no public module or lesson routes.
- Release policy: **complete bilingual modules only**. Switch `status` to `published` only when both locale module hubs and every lesson are ready.

## File naming

`content/learn/en/modules/dj-module-01.mdx` and `content/learn/es/modules/dj-module-01.mdx`

`content/learn/en/lessons/dj-01-001.mdx` and `content/learn/es/lessons/dj-01-001.mdx`

File names are stable IDs, **not** slugs. Slugs are localized in frontmatter.

## Module MDX frontmatter

```yaml
---
id: dj-module-01
locale: en
title: DJ Basics
description: Core foundations of DJing.
status: ready
---
```

## Lesson MDX frontmatter

```yaml
---
id: dj-01-001
locale: en
moduleId: dj-module-01
slug: what-is-a-dj
order: 1
title: What Is a DJ?
description: An introduction to the DJ's role.
status: ready
---
```

Use `status: draft` while adapting content; `status: ready` only after editorial, translation, accessibility, assets and link QA. Module release still requires `status: published` in the manifest.

## Public URLs

`/learn-to-dj/dj-basics/what-is-a-dj/` and `/es/curso-dj/fundamentos-dj/{localized-lesson-slug}/`. No `/en/` prefix. Module slugs live in the manifest; lesson slugs in MDX.

## Release checks

`pnpm --dir apps/web learn:validate` validates the release manifest and **published** modules. Draft module MDX is not required; the editorial workflow can proceed independently. This check is added to the web build script in M05-B.

M05-B implements the typed repository and release gate, **not** public pages, MDX rendering, rich component library, image checks, link resolution, or sitemap inclusion. These are M05-C/D responsibilities. Do not claim a module is production-ready solely because this structural validation passes.

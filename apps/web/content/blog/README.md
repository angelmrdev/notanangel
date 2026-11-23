# Blog content

Create `.mdx` files in `en/` and `es/`. Keep the same `id` for translations, but choose independent localized slugs. No example articles are shipped as published content.

```mdx
---
id: my-first-article
locale: en
slug: my-first-article
title: "My first article"
description: "A useful summary for search and previews."
status: draft
publishedAt: "2026-11-18"
category: dj-culture
tags:
  - rekordbox
seo:
  index: true
---

Your article content here.
```

Use taxonomy **IDs** in frontmatter, not their translated slugs. Define terms in `lib/blog/taxonomies.ts`. All article and taxonomy slugs share the same URL namespace in each locale. The repository rejects collisions. Scheduled posts are not served automatically; changing status to published and rebuilding is required. This M04-A patch supplies the validated content repository, not MDX rendering or public routes (M04-B).

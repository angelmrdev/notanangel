# M04-A — Blog Core

## Decisions
- Blog root: `/blog/` (EN), `/es/blog/` (ES).
- One shared URL namespace per locale: posts, categories and tags use `/blog/<slug>/`.
- Taxonomy term IDs and post IDs remain stable across translations. Localized slugs are independent.
- `.mdx` source in `apps/web/content/blog/{en,es}`. No fake published content.
- Strict frontmatter validation via Zod and gray-matter. Collision checks across posts and taxonomies.
- Published content requires status `published` and a nonfuture `publishedAt`. `scheduled` is stored but needs a later rebuild and status transition.
- No public Blog routes yet: these belong to M04-B.
- M04-C connects blog discovery to the sitemap generator; taxonomy pages only indexed with sufficient real content.

## Install
From monorepo root: `pnpm --filter @naa/web add gray-matter zod` then `pnpm --filter @naa/web add server-only`. The lockfile must be committed with the new dependencies. Run `pnpm build`, `pnpm typecheck`, `pnpm lint`.

## Next phase
Build index, shared dynamic segment and `generateStaticParams`, render MDX with controlled components, page metadata and translated taxonomy templates. Ensure taxonomy and article routes never collide.

# M03-A — Editorial home and app-like mobile navigation

## Scope

- Rebuild EN `/` and ES `/es/` homepage with CSS-only POP CHAOS artwork.
- Replace mobile hamburger with persistent bottom tab navigation (Home, Blog, Learn, About).
- Preserve desktop header and locale switcher, real logo and favicon.
- No new image assets, external dependencies, CMS or fake article content.

## Important temporary navigation contract

Blog, Learn and About mobile/desktop destinations **currently point to sections of the home page**, not nonexistent pages. The Home tab is visually active on the current MVP pages. When M03/M04 introduce actual routes, update the tab destinations and derive active state from the pathname (e.g. `usePathname`) instead of hardcoding it. This is a deliberate MVP interim state.

## Accessibility

Bottom tabs are normal links with accessible text, visible focus, min-height 49px, four evenly sized targets and safe-area inset. Main content receives extra bottom padding on small screens. The interface uses CSS-only decoration marked aria-hidden. Reduced-motion styles are inherited from `styles/base.css`.

## Validation

Stop `pnpm dev` first if running. Remove `apps/web/.next` when stale route types appear. Run `pnpm build`, `pnpm typecheck`, `pnpm lint`. Verify exported `apps/web/out/index.html` and `apps/web/out/es/index.html`. Check mobile at 360, 390 and 430 px; verify that the bottom bar does not obscure content and that locale links work.

## Next

M03-B About and Contact pages, then M03-C legal pages and technical SEO; M04 Blog MDX engine.

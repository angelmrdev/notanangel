# M02-B — Site layout and navigation

## Scope
- POP CHAOS editorial header, mobile menu, bilingual language selector and footer.
- EN root `/` and ES `/es/` have a shared layout with separate `html lang`.
- Editorial-first home with in-page anchors for Blog, Learn to DJ and About. **These are not published routes or live content.**
- No fictional brand imagery or placeholder external links.

## Integration
This patch assumes M02-A is already installed. **Delete legacy routes before building:** `apps/web/app/layout.tsx`, `apps/web/app/page.tsx`, `apps/web/app/[locale]/page.tsx`. Remove the now-empty `[locale]` folder. They conflict with route-group root layouts and `/`.

## QA
Run `pnpm typecheck`, `pnpm lint`, `pnpm build`; confirm `apps/web/out/index.html` and `apps/web/out/es/index.html` exist. Test desktop/mobile navigation, keyboard focus, language links and anchor scrolling. No new dependencies.

## Next
M02-C: integrate approved logo/brand assets, favicon and OG. Then build general pages and the Blog/MDX engine.

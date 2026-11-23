# M03-A.1 — Visual refinement

Baseline: M03-A patch + M02-C brand logo. CSS-only incremental update; no route or component behavior changes.

## Changes
- Hero desktop min-height 680 → 610px, reduced internal spacing and heading scale.
- Editorial section padding 104/112 → 76/84px.
- Blog cards min-height 340 → 290px, reduced lead spacing.
- Learn graphic min-height 400 → 330px, vinyl 350 → 310px.
- About compacted, symbol reduced and shifted inward.
- Logo in header slightly larger.
- Mobile section/card spacing tuned.

## SEO and asset inventory
- `apps/web/public/brand/logo-primary.webp` is a real raster image. Ensure the BrandLogo component exposes meaningful accessible text (or a descriptive link name), and do not keyword-stuff alt text.
- `apps/web/app/favicon.ico` is a real icon, not an editorial SEO image.
- Hero NO RULES panel, ring, star, blog cards, vinyl and decorative shapes are HTML/CSS, not indexed image files. Keep decorative shapes aria-hidden.
- Future editorial images should have descriptive filenames, contextual alt text, responsive sizes and relevant nearby copy. Do not convert decorative CSS to raster solely for SEO.

## Validation
`pnpm build`, `pnpm typecheck`, `pnpm lint`; inspect EN/ES at 390px, 768px and 1440px.

## Notes
This patch is based on the most recent shared M03-A ZIP; it has not been executed against the user's current working tree. Review the diff before deployment.

# M02-A — Design Foundation

Status: implementation patch, pending local validation.

## Source of truth

`docs/DESIGN-SYSTEM.md` (POP CHAOS Editorial v0.1). This increment implements the exact palette and base layout constraints. No brand assets are supplied in the exported monorepo; none are fabricated.

## Added

- `apps/web/styles/tokens.css`: brand and semantic variables, spacing, radii, container widths.
- `base.css`: resets, focus visibility, reduced motion.
- `typography.css`: display, page headings and metadata helpers.
- `utilities.css`: container, reading width, layout helpers.
- `legacy.css`: temporary support for existing M01 homepage classes.
- `components/ui/container.tsx` and `button.tsx` with CSS module.
- `app/globals.css`: imports the layers above.

## Not included

No navigation rewrite, fonts from external providers, artwork, favicon or editorial components. These belong to later increments. Existing page routing is unchanged.

## Audit findings in source ZIP

- `apps/web/public/` contains no brand assets in the exported snapshot.
- Legacy `apps/web/app/page.tsx` (language chooser) and `apps/web/app/[locale]/page.tsx` remain alongside newer route groups. They should be cleaned up in a separate routing patch after confirming the actual working tree; this patch deliberately does not delete files.
- The export includes `apps/web/tsconfig.tsbuildinfo`, a generated file already covered by `.gitignore`. The export script should additionally exclude it.

## Validation

From repository root: `pnpm typecheck`, `pnpm lint`, `pnpm build`. Review the EN/ES home pages locally before pushing.

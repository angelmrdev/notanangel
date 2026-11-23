# M05-E9 — DJ-01-006 Full Layout

## Scope
This is an incremental patch for the **final public route in local development** `/learn-to-dj/dj-basics/first-dj-setup/`.

- Preserves the complete English MDX article from the previously validated M05-E2 runtime fix, including all headings, steps, tables, checklists, FAQs and references.
- Adds the ten visual briefs (DJ-01-006-V01 to V10) as ten original, accessible React/CSS learning diagrams. The components are server-rendered and contain no JavaScript client interactivity.
- Registers new components in the current registry from M05-E8; **apply E8 first** to avoid losing registrations.
- Retains `status: draft`, unchanged curriculum ID and unchanged manifest. No publication or indexation change.
- Uses product-neutral UI drawings rather than claiming to depict actual latest rekordbox or Serato screenshots.
- Printable checklist is a print-friendly HTML/CSS resource; no PDF is included.

## Files in this ZIP
- `apps/web/components/learn/educational-components.tsx` — registry addition, preserving E8 components.
- `apps/web/components/learn/first-setup-visuals.tsx` — 10 original visual components.
- `apps/web/components/learn/first-setup-visuals.module.css` — responsive and print styles.
- `apps/web/content/learn/en/lessons/dj-01-006.mdx` — same original content + 10 component tags.
- `docs/dj-learn/M05-E9-FIRST-SETUP-LAYOUT.md` — this document.

## Verify locally
From repository root:

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --filter @naa/web build
pnpm --filter @naa/web dev
```

Open `http://localhost:3000/learn-to-dj/dj-basics/first-dj-setup/`.
Confirm the 10 diagrams, test phone and desktop viewport sizes, and ensure tables/checklists are readable. Check that modules are still not included in the production sitemap before planned publishing.

## Source / verification boundaries
The figures express generic audio paths and established beginner checks. Device-specific electrical, driver and output compatibility must be confirmed with manufacturer instructions. These are educational design drawings, not wiring certificates. The ZIP's textual preservation and its path/component registration are checked; a full Next.js build and screenshot QA have not been executed in this environment.

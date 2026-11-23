# M05-E3 — M01 and M02 English MDX batch and bilingual module hubs

## Changes
- 13 new EN MDX lesson drafts converted from the approved *working* editorial source files.
- Reuses the two existing M05-E2 pilots `dj-01-006.mdx` and `dj-02-003.mdx` (not overwritten).
- 4 new module landing drafts: two modules in EN and ES.
- All new MDX marked `status: draft`; no publication gates changed.
- Removes private `EDITORIAL-BRIEF`, `MEDIA-BRIEF`, `EDITORIAL-QA` and other HTML comments from rendered content.
- Omits duplicated H1s because the page template owns the H1.
- Adds reusable `KeyConcept`, `DJTip`, `SignalChain`, or `PhraseGrid` introductions for relevant lessons.

## Editorial limitations to resolve BEFORE publication
1. **EN lesson MDX content remains a draft.** External citations, technical accuracy, accessibility and link routing still require review.
2. **ES lesson MDX files are not included.** The bilingual release gate therefore remains closed.
3. The MDX versions do **not** yet contain the 122 planned illustrations; their briefs remain in editorial source files.
4. Every lesson must be checked against the correct public slug and module navigation.
5. Original editorial source `.md` files are left untouched. If a published release checks `status: ready` and `visual_status: integrated` on editorial sources, those must be changed separately after real QA.
6. No manifest modification, no sitemap changes, no SEO activation.

## Integration
Apply M05-E1, M05-E2 and their runtime fixes first. Extract this patch to the monorepo root.
Run: `pnpm --filter @naa/web typecheck`, `pnpm --filter @naa/web lint`, `pnpm --filter @naa/web learn:validate`, `pnpm --filter @naa/web build` (with your existing scripts as appropriate).

## Phase publication readiness
- M01: 6/6 EN MDX drafts, 0/6 ES MDX lessons, two draft module hubs.
- M02: 9/9 EN MDX drafts, 0/9 ES MDX lessons, two draft module hubs.
- **Publish only after** each complete bilingual module passes required technical/editorial QA and publication validations. A final aesthetic polish can follow, but correctness, legibility, keyboard access and release safety cannot be deferred.

## Preview limitation
The included preview-route update enumerates all 15 lesson IDs for development-only browsing, while maintaining `notFound()` for production and a `noindex` metadata policy. Test that static export does not expose draft bodies before deploying.

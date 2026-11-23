# DJ Learn — Production and Publication Strategy

Status: proposed editorial operating decision, November 2026.

## Core decisions

- English (`en`) is the canonical **editorial source**, authored as Markdown.
- Spanish (`es`) is a properly reviewed localization, not an automated unchecked mirror.
- Produce English drafts sequentially by module and add visual briefs while drafting.
- Once Modules 01 and 02 are drafted in English, conduct their joint editorial review, prepare module landing pages, and validate the Markdown-to-MDX conversion and site presentation in staging.
- **Public release is phased by complete, reviewed bilingual modules**. First release target: M01 and M02 together, with both EN and ES lessons, module hubs and course hub accurately showing available content. Later release complete modules or coherent multi-module batches.
- Never put unfinished lessons, empty module pages, staging pages or unreviewed content into public XML sitemaps. Keep staging access blocked, with appropriate `noindex` if public access cannot be avoided.
- Provide reciprocal `hreflang` only for versions actually published; use self-canonicals for each language where appropriate.
- The full 13-module course remains the completion goal, not a requirement for the first public release.
- Initial SEO is editorial fundamentals (clear intent, titles, meta descriptions, meaningful headings, internal links and accessibility). After publication, optimize using observed Google Search Console query and URL data.

## Status terminology

`planned` → `en-draft` → `en-reviewed` → `es-draft` → `es-reviewed` → `visual-ready` → `staging-qa` → `published`.

Track stages per lesson, not merely as one module-wide flag. A module becomes launchable only when every planned lesson, its hub and locale pair have passed QA.

## First integration checkpoint

1. M01: six English lesson drafts; editorial review and module landing pending.
2. M02: nine English lesson drafts targeted; M02 landing pending.
3. Finalize MDX schemas and visual components against the real monorepo contracts.
4. Localize the fifteen approved lesson texts and both module landing pages.
5. Test 30 lesson locale pages plus the two language-specific module hubs and course pages in staging.
6. Launch M01 + M02 once all pages, references, graphics and interlinking are ready.

Editorial notes: source Markdown remains agnostic to visual implementation. Maintain internal asset briefs until the approved visual is placed in the published page.

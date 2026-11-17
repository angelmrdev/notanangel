# Not an Angel — Foundation 002

**Status:** Architecture baseline / roadmap revised — pending detailed content contracts  
**Updated:** 2026-11-17  
**Purpose:** Source of truth for the platform architecture, publishing workflow, and phased implementation.

## 1. Product direction

Not an Angel is a bilingual (English and Spanish) DJ-oriented editorial and music platform, rooted in the artist's open-format, pop, disco, dance and electronic identity. It is not primarily a local DJ booking portfolio. The platform will establish its organic acquisition and editorial/affiliate foundation before prioritizing the artist's own releases and downloadable content.

**Brand architecture:** Not an Angel is the parent brand; editorial sub-identities such as **The DJ Lab** may be used within it, without creating separate businesses or domains.

## 2. Verticals

1. **Learn DJ:** Structured learning paths, modules, lessons, examples and embedded video.
2. **Journal / Blog:** Supporting articles, culture, discovery, evergreen commercial content and editorial SEO.
3. **Resources:** Software/hardware guides, comparisons, recommendations and affiliate-oriented editorial content.
4. **DJ Tools:** Own interactive utilities and a directory of recommended third-party tools.
5. **Music:** Artist edits, remixes, mashups, originals and other releases.
6. **DJ Sets:** Artist sessions, embedded video, tracklists and related media; can be a Music category with a dedicated landing page.
7. **Downloads / Shop:** Free downloads and potential future digital/physical products.
8. **About:** Artist, project, booking, support and contact.

The navigation and taxonomy must avoid unnecessary duplication: DJ Sets may be a prominent sub-section of Music rather than a separate data model.

## 3. Revised roadmap

### Phase 1 — Public editorial MVP (launch priority)

- Bilingual EN/ES site, localized routes and independent publication per locale.
- Responsive home, navigation, branding/design system and foundational pages.
- **Learn DJ fully operational**: course/module/lesson architecture, published lesson pages, internal navigation and structured MDX source.
- **Journal fully operational**: index, categories/tags as needed, article pages, related content and structured MDX source.
- SEO foundations: canonical URLs, hreflang, XML sitemaps for actually published URLs, robots, structured data where appropriate, metadata, Open Graph, internal links, redirect strategy and Search Console verification.
- Google Analytics 4, Google Search Console, Monetag, affiliate link support, privacy/consent handling as applicable.
- Publish a substantive initial editorial set, validate production deployment and submit sitemaps to GSC. Indexing is requested/monitored, not guaranteed by submission.
- Do not expose empty vertical landing pages as indexable placeholders.

### Phase 2 — Resources and DJ Tools

- Editorial guides/reviews/comparisons using MDX; affiliate relationships and disclosures.
- Recommended Tools directory, initially possible as Git-managed structured data.
- Own DJ utilities, each with an indexable explanatory landing page when appropriate.
- Individual resources or simple tools may ship during Phase 1 if they strengthen the editorial MVP without delaying it.

### Phase 3 — Artist music and DJ sets

- Start with **localized, statically generated release/set pages** driven by MDX or Git-managed structured metadata.
- Embedded YouTube/SoundCloud media, artwork, tracklists, links and cross-references.
- Introduce a normalized reusable tracks/artists catalog in Supabase **only when cross-release reuse, import, searching or editing workflows justify it**.
- Do not require a database merely to render static release pages.

### Phase 4 — Downloads and Shop

- Cloudflare R2 for public media and private downloadable objects.
- Product/variant/asset metadata, optional Supabase integration, download API, signed temporary links, basic anti-abuse controls and operational events.
- Optional monetized intermediate download page using Monetag in a policy-compliant, clearly labeled manner; no forced ad clicks.
- Paid checkout and merchandise deferred until a real offer exists.

## 4. Technical baseline

| Concern | Decision |
|---|---|
| Public app | Next.js 16, TypeScript |
| Hosting | **Hostinger Business**, subject to validation of the exact Next.js runtime/deployment capabilities required |
| Repo | GitHub, pnpm; Turborepo only if multi-app/packages warrant it |
| Editorial source of truth | MDX + Git, with validated frontmatter and structured curriculum manifests |
| Local admin | Optional local Studio; can be introduced incrementally, not a launch blocker if Git editing suffices |
| Database | Supabase PostgreSQL, deferred for features that need relational state |
| Object storage | Cloudflare R2, integrated when media/download needs arise |
| Analytics | Google Analytics 4 + Google Search Console |
| Ads | Monetag from launch, respecting consent and ad policies |
| Monetization | Ads + affiliate links first; sales later |
| Public user accounts | None in MVP |
| Languages | EN/ES with independently publishable locale versions |

**Hosting note:** Do not assume Hostinger Business supports every Next.js server feature. Verify Node runtime, deployment process, image handling, scheduled jobs and caching behavior. Prefer static generation for editorial pages, with server features added only as needed.

## 5. Editorial architecture and publication

- Content lives in `content/en/` and `content/es/`, with vertical-specific subfolders.
- Stable shared `contentId` across locales; locale-specific title, slug, body and metadata.
- Structured course/module manifests determine lesson order and navigation, not filename sorting.
- Drafts are excluded from public builds and sitemaps. A locale can publish independently when ready.
- Git provides history and rollback. Publish through a deliberate commit/push/build flow, with preview and validation.
- Local Studio can eventually edit MDX and orchestrate commits; it is not publicly hosted.
- Changing a published slug creates a permanent redirect from the old route when possible.
- Avoid publishing a translation fallback at the missing locale URL as though it were translated content.

### Proposed content tree (illustrative)

```text
content/
  en/
    learn/
    journal/
    resources/
    pages/
  es/
    learn/
    journal/
    resources/
    pages/
  manifests/
    curriculum/
    navigation/
```

### Editorial metadata contract (to finalize)

- `contentId`, `locale`, `slug`, `title`, `description`, `status`, `publishedAt`, `updatedAt`.
- Optional `category`, `tags`, `author`, `cover`, `relatedContent`, `relatedTools`, `affiliateDisclosure`.
- Learn-specific `courseId`, `moduleId`, `lessonOrder`, `level`, `prerequisites` as appropriate.
- SEO metadata may override defaults, with validation for published pages.

## 6. SEO and measurement

- Publish a complete, coherent editorial MVP rather than waiting for every future vertical.
- Localized canonical and hreflang handling; include only existing published language variants.
- Sitemap includes only canonical, indexable published URLs.
- GA4 event plan: lesson navigation, relevant tool interactions, affiliate outbound clicks, YouTube clicks and (later) download intent/link issuance.
- GSC is the source for real search query, impressions, click and indexing data; editorial optimization can be prioritized after collecting actual data.
- Affiliate disclosures and ad labeling are part of the template system.
- GA4 and ad scripts are gated/configured according to applicable privacy requirements.

## 7. Deferred relational design (not discarded)

The previous conceptual model for `artists`, `tracks`, `track_artists`, `releases`, localized revisions, `release_tracklist`, `release_sources`, `products`, `assets`, `download_events`, and tools remains a **future option**, not an MVP database migration requirement.

When needed:
- Normalize tracks and artists for reuse across releases and DJ sets.
- Maintain publication/version isolation, independent locale publication, unique localized slugs and redirect history.
- Separate products from files and release metadata.
- Protect Supabase with RLS and keep privileged credentials server-side.
- Keep R2 private for download objects and use short-lived signed URLs.

**Important:** Do not implement all these tables just because they were designed conceptually.

## 8. MVP definition of done

- Site is live on the intended domain and Hostinger environment.
- EN and ES route systems function; missing translations are handled explicitly.
- Learn DJ and Journal have functional indexes, detail templates, real initial content, navigation and internal linking.
- SEO technical checks pass, published URLs appear in sitemap, GSC property verified and sitemap submitted.
- GA4 and Monetag integrations are tested, with required consent controls and disclosures.
- No empty indexable placeholders, broken internal links, public draft leakage or publicly exposed admin credentials.
- Release/music/download functionality is **not** required to declare editorial MVP complete.

## 9. Pending decisions before implementation

1. Confirm exact Hostinger deployment capabilities and choose static/hybrid rendering accordingly.
2. Finalize Learn DJ course/module/lesson source-of-truth and MDX schemas.
3. Finalize Journal categories, content types, related-content logic and editorial templates.
4. Decide initial number and topics of publish-ready lessons/articles (quality and coverage over arbitrary counts).
5. Finalize localized route names, URL strategy and redirects.
6. Confirm consent-management approach and Monetag placements.
7. Define initial affiliate-link model and disclosures.
8. Decide whether the local Studio is needed for Phase 1 or whether Git editing is sufficient initially.

## 10. Change log

- **2026-11-17:** Reprioritized roadmap to editorial-first MVP. Learn DJ + Journal are launch-critical; Music/DJ Sets and Downloads/Shop are deferred. Releases can initially be static localized pages; normalized music database is optional until justified. Hostinger replaces Vercel. GA4 and GSC are confirmed.

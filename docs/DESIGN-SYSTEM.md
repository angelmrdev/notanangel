# Not An Angel — POP CHAOS Editorial

**Design system v0.1 · 17 Nov 2026 · Visual concept, not approved implementation**

## 1. Intent

Treat Not An Angel as a music and learning **platform**, not a continuously animated nightclub poster. The artist identity is loud; the interface is orderly. Preserve the creative freedom of each release cover. The website visually connects them through tokens, spacing, typography, shared components and predictable interaction.

## 2. Source assets

The six user-supplied graphics in `assets/` are optimized WebP previews, not replacements for their original masters. Includes primary neon graffiti logo, Britney/Rihanna artwork, Evanescence artwork, visualizer art, SoundCloud banner, and visual-brand board. Source branding palette transcribed from board: `#FF2D9E`, `#FFE600`, `#00E5FF`, `#0B0B0B`, `#FFFFFF`.

## 3. Core tokens

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Brand | `--color-pink` | `#FF2D9E` | Primary CTAs, active elements, brand energy |
| Highlight | `--color-yellow` | `#FFE600` | Featured drops, promotional callouts |
| Information | `--color-cyan` | `#00E5FF` | Informational highlights, links |
| Canvas | `--color-bg` | `#0B0B0B` | Global page background |
| Primary text | `--color-text` | `#F7F7F7` | Main type |
| Cards | `--color-surface` | `#141414` | Modules and cards |
| Raised | `--color-surface-raised` | `#1C1C1C` | Dialogs, highlighted surfaces |
| Hover | `--color-surface-hover` | `#242424` | Hover states |
| Borders | `--color-border` | `#353535` | Subtle dividers |
| Secondary text | `--color-muted` | `#A7A7A7` | Metadata and supporting copy |

Additional suggestions: spacing unit 4px; scale 4/8/12/16/24/32/48/64/80; radius 6/12/20; container max 1240px; body copy 16–18px and line-height 1.65–1.8 on long reads. Desktop 12-column grid, tablet 8, mobile 4 (not required to expose to authors).

## 4. Typography

- Display: ultra-bold, condensed/expressive, uppercase for short statements only. Preview uses **Impact**, **not** an approved licensed webfont. Confirm font and licenses before implementation; possible candidate category: Anton/Druk-style.
- UI/editorial: neutral sans. Prototype falls back to Arial/system; evaluate Inter or a similar readable font during implementation.
- Script/handwriting is **decorative only**: never for accessibility-critical interface labels or reading text.
- Functional scale: display 56–120, H1 40–64, H2 28–40, H3 20–28, body 16–18, metadata 12–14 px. Responsive using `clamp()`.

## 5. Components (proposed API names, not implemented yet)

### Foundation
`Container`, `Section`, `Stack`, `Inline`, `Divider`, `PageHeading`, `Eyebrow`, `DisplayHeading`, `Text`, `Icon`.

### Navigation
`SiteHeader`, `DesktopNav`, `MobileNav`, `Breadcrumbs`, `LanguageSwitch`, `SiteFooter`, `SectionTabs`.

### Interactions
`Button` (`primary`,`highlight`,`outline`,`ghost`), `TextLink`, `Badge` (`edit`,`featured`,`free`,`level`), `TextField`, `Select`, `FilterTabs`, `Notice`, `Dialog`, `Toast`, `EmptyState`, `Skeleton`.

### Music
`ReleaseCard`, `ReleaseGrid`, `ReleaseHero`, `Artwork`, `PlayControl`, `ReleaseMetadata`, `TrackList`, `PlatformLinks`, `DownloadAssetCard`, `DownloadOptions`.

### Editorial
`ArticleCard`, `ArticleHeader`, `ReadingLayout`, `TableOfContents`, `Prose`, `InfoCallout`, `TipCallout`, `ExerciseBlock`, `MediaPlaceholder`, `RelatedArticles`, `DifficultyBadge`, `ReadingTime`.

### Branding / marketing
`BrandHero`, `GraphicSticker`, `FeaturedDrop`, `PromoStrip`, `SocialLinks`. Graphics should be layered in *isolated* decorative zones, never behind main reading copy.

## 6. Behavioral rules

- Pink for primary actions; cyan for information/links; yellow for featured/promotional contexts. Don't use all accents as competing buttons.
- Aim for one primary CTA per content section; allow alternatives as neutral/outline.
- Both ES/EN labels need enough flexible space; do not hard-code width around English copy.
- Covers can vary aesthetically from release to release. Maintain shared content hierarchy, art aspect ratio, metadata and CTAs.
- Never automatically play music. Prototype's play controls are demo-only.
- Keyboard access, visible focus, sensible target sizes and `prefers-reduced-motion` are baseline requirements.
- Reduce texture and motion for lessons, forms and download flows. Avoid background video under instructional text.
- Dark-first MVP; a light theme is **not** approved in this version.
- File downloads, rights notices, monetization units and real player requirements remain dependent on product architecture; don't assume working APIs from the prototype.

## 7. Initial asset rules

- Main complex logo: hero and promotional contexts only.
- Small navigation uses simplified text wordmark until a real vector compact logo is finalized.
- Don't auto-trace/export existing imagery as vector art or pretend source artwork is an SVG.
- Release imagery: preserve original source masters; deliver optimized responsive derivatives later.
- Decorative halo, sparkle, spray, smiley: optional, used sparingly. Prefer actual approved brand art, not approximated emoji, for final production assets.

## 8. Suggested content templates

1. `HomePage`: brand hero, featured drop, latest releases, learning highlights, download section.
2. `MusicIndex`: category filters, release grid, search, optional featuring blocks.
3. `ReleasePage`: art, title, credits, player/external listen links, release notes, downloads, related drops.
4. `LearnIndex`: beginner pathways, content collections, level tags, featured tutorials.
5. `ArticlePage`: title/metadata, table of contents, MDX prose, callouts, examples, references, related lessons.
6. `DownloadPage`: eligibility / licensing notes, formats, external storage handoff, troubleshooting state.
7. `AboutPage`: artist bio, imagery, music/social links, professional contact.

## 9. Review gates before monorepo integration

- [ ] Confirm brand palette vs accessibility needs; check contrast on actual text/background pairings.
- [ ] Approve typography (fonts and licensing) and compact logo treatment.
- [ ] Approve navigation IA and mobile menu style.
- [ ] Confirm final asset files, responsive art crops and decorative motifs.
- [ ] Approve component inventory and naming; compare against monorepo code conventions.
- [ ] Define release/play/download functional states with actual product contracts.
- [ ] Approve article layout and MD/MDX mapping before creating editorial components.
- [ ] Verify mobile touch patterns and reduced-motion behavior.

## 10. Prototype status

`index.html` is a responsive, dependency-free standalone visual showcase. It is deliberately **not** a production React library, and does not change a repository. Release filters, a simple mobile menu, a modal and feedback are demo-functional. All play/download/subscription behaviors are placeholders clearly signaled to the viewer.

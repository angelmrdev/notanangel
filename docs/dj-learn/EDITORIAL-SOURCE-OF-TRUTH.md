# Not an Angel — DJ Learn | Editorial Source of Truth

> **Document ID:** DL-003 · **Status:** Working baseline for approval · **Version:** 0.2 · **Date:** 2026-11-17  
> **Target repo path:** `docs/dj-learn/EDITORIAL-SOURCE-OF-TRUTH.md`  
> **Scope:** DJ Learn only; excludes Releases, Resources and Blog implementation.

## 1. Product decisions (approved in planning)

- **Product:** a comprehensive, free DJ course, no login required; educational and useful as standalone articles.
- **Structure:** four parts, thirteen modules, and **105 candidate lessons** at this baseline; counts can change only through documented curriculum review.
- **Launch policy:** build iteratively in private, **publish the complete course in English and Spanish together** after editorial and QA checks; not a public drip release.
- **Source language:** English is the authoritative editorial source. Spanish is an independently reviewed localization, not an automatic mirror.
- **Content:** original prose in MDX, with diagrams/screenshots/photos/video ideas **specified during the writing stage** and created/inserted in a later production stage.
- **SEO:** launch with good technical hygiene and reader-first content; defer large-scale keyword/cluster optimization until real GSC performance is available. No need to validate 105 keyword volumes before authoring.
- **Video:** optional. A lesson must stand on its own without first-party video; recommended third-party tutorials may be included as supplementary resources, with review and attribution.
- **Monetization:** this document does not create affiliate catalog or commercial review sections; educational integrity first.

## 2. Working URLs and page model

- EN hub: `/en/learn-to-dj/` (label: *Learn to DJ*).
- ES hub: `/es/curso-dj/` (label: *Curso de DJ gratis*).
- Page kinds: **course hub** (1/locale), **module hub** (13/locale), **lesson** (105/locale before audit).
- Total **238 proposed educational URLs** (119 per locale). This is a planning count, not generated pages.
- Under each locale hub, module hubs and lesson pages use **flat sibling slugs**: `/en/learn-to-dj/{slug}/` and `/es/curso-dj/{slug}/`.
- Slugs must be unique across all modules and lessons for each locale; do not encode lesson order in URLs.
- Every page uses a stable content ID, canonical per language, mutual `hreflang` once both versions are available, breadcrumbs and contextual links.
- **Important:** ES lesson slugs and final translated titles are **not yet frozen**. Do not generate arbitrary machine-translated slugs. Module ES slugs below are proposals only.

## 3. Editorial-first workflow (updated decision)

1. **Approve curriculum registry** — stable lesson IDs, module placement, titles, provisional EN slugs; check overlaps and missing essential concepts.
2. **Create English editorial brief per lesson** — audience, learning objectives, scope boundaries, outline, prerequisites, key terms, examples, sources, and proposed internal links.
3. **Write the complete English MDX article** — useful SEO-friendly headings, clear definitions, practical steps, original examples, exercise, FAQ *when warranted*, and references. The article should be complete and intelligible even before illustrations exist.
4. **Embed visual production annotations while writing** — identify required / recommended media and the precise insertion point. Include learning purpose, alt-text draft, visual composition/data, file naming suggestion, rights/source requirements, localization needs and priority. These annotations are *production notes*, not public-facing copy.
5. **Editorial + technical review** — accuracy, completeness, originality, internal consistency, readability, sound structure, spelling, links, factual claims, and technical SEO basics. Review/adjust media briefs with text.
6. **Localize into Spanish** — natural terminology and examples, Spanish SEO title/H1/meta/slug, preserve intent and pedagogical parity. Track source revision used for translation.
7. **Produce and integrate media** — diagrams, tables, photos, licensed screenshots, and supplemental videos, guided by the notes in each article; optimize dimensions, alt text, loading behavior and rights. Any missing *required* media blocks launch readiness.
8. **Final cross-language QA** — all lessons and hubs linked, localization parity, images, accessibility, performance, technical SEO, no placeholders or broken media.
9. **Single public launch** — publish the complete course; then use GSC to prioritize future cluster rewrites and enhancements.

### Principle: visuals are planned as part of authorship

Never leave `ADD IMAGE HERE` as an ambiguous placeholder. An annotation must explain **why** a visual is needed and what it will teach. Diagrams should add information; screenshots may age with software versions and need a refresh plan. Visual annotation metadata is stripped from public content, while the intended media is subsequently inserted as an actual MDX component.

## 4. Suggested MDX authoring contract (not implemented)

Suggested source layout (subject to monorepo inspection):

```text
content/dj-learn/
  curriculum.ts                 # canonical structure/order/IDs/slugs
  en/index.mdx                  # English course landing
  en/modules/{module-id}.mdx    # English module landings
  en/lessons/{lesson-id}.mdx    # English lesson articles
  es/index.mdx
  es/modules/{module-id}.mdx
  es/lessons/{lesson-id}.mdx
  _editorial/                   # draft-only media briefs / QA; never routed publicly
```

**Recommended per-lesson fields** (exact schema to approve in the MDX foundation phase):

```yaml
id: dj-002-003
locale: en
title: How to Count Musical Phrases
summary: A concise, original explanation of the lesson's promise.
seoTitle: How to Count Musical Phrases When DJing
seoDescription: A useful description, written for readers, not keyword stuffing.
level: beginner
estimatedMinutes: null  # fill after article is drafted; never invent
status: draft
sourceRevision: null     # required for Spanish translation metadata
mediaStatus: planned     # planned | briefed | ready | integrated
```

Store module ordering, globally unique slugs, lesson relationships and canonical identifiers centrally, not repeated by hand inside prose. The exact MDX compiler, Next.js route implementation and validation tooling are **not decided** here.

### Recommended media annotation (authoring-only, to be formalized)

```md
<!-- MEDIA-BRIEF
id: dj-002-003-visual-01
placement: after "How 8-, 16- and 32-bar phrases work"
type: timeline-diagram
priority: required
purpose: Show bar group boundaries and phrase changes in a 4/4 arrangement.
content: 32 labelled bars; emphasize 8/16/32-bar divisions; no copyrighted lyrics or audio.
alt_en: Diagram showing how 32 bars form musical phrase groups in 4/4.
alt_es: Diagrama de agrupaciones de frases musicales de 32 compases en 4/4.
source_rights: Original in-house graphic
localization: labels must be translated, structure shared
suggested_asset: /media/dj-learn/dj-002-003/phrase-groups.svg
status: planned
-->
```

A later pipeline may move these briefs to sidecar YAML/JSON rather than HTML comments, depending on how the chosen MDX compiler treats comments. **Do not rely on raw HTML comments being accepted by MDX** until tooling is selected; the above is an editorial syntax *illustration*, not ready-to-compile MDX.

## 5. Article quality gate

- Correct learning objective, prerequisites, progression and non-duplicative coverage.
- Complete self-contained article; readable headings and concise, direct explanations.
- Relevant examples, practice or worked application whenever appropriate.
- Claims checked with sound primary references where they matter; attribution/rights checked.
- All media requirements specified during writing, with alt-text and localization briefs.
- Honest media status: no fake images, screenshots, measurements or hands-on testing.
- SEO basics: descriptive H1/title/meta, semantic headings, unique URL, contextual links, no keyword stuffing.
- Accessibility: meaningful captions, image alt text, clear tables and usable content without video.
- ES localization preserves correctness, not just literal English phrasing.
- No draft notes, missing required media or stub pages can reach public release.

## 5A. DL-003.A registry companion (2026-11-17)

The companion file **`docs/dj-learn/MASTER-CURRICULUM-REGISTRY.md`** contains 105 individual teaching outcomes, scope boundaries, module outcomes and prerequisite guidance. **It is the authoritative editorial curriculum contract for drafting**; the tables below remain the original title/slug inventory. Any future curriculum amendment must update the registry first, then propagate changes to MDX and localization.

## 6. Curriculum registry — v0.1 candidate titles

These are the **105 titles and EN slugs from prior curriculum planning**, preserved here as a single canonical draft. Provisional module ES slugs are listed but **lesson ES translations/slugs remain editorial tasks**. Module/lesson IDs are designed as stable identifiers, independent of URL.

### Module 01 — DJ Basics

- Part: **Foundations**
- ID: `dj-module-01`
- EN hub: `/en/learn-to-dj/dj-basics/`
- ES hub (proposed): `/es/curso-dj/fundamentos-dj/`
- Lessons: **6**

| Stable lesson ID | English working title | English slug |
|---|---|---|
| `dj-01-001` | What Is a DJ? | `what-is-a-dj` |
| `dj-01-002` | The History of DJing | `history-of-djing` |
| `dj-01-003` | Different Types of DJs | `types-of-djs` |
| `dj-01-004` | How DJ Equipment Works | `how-dj-equipment-works` |
| `dj-01-005` | Essential DJ Terminology | `dj-terminology` |
| `dj-01-006` | How to Set Up Your First DJ System | `first-dj-setup` |

### Module 02 — Music Theory for DJs

- Part: **Foundations**
- ID: `dj-module-02`
- EN hub: `/en/learn-to-dj/music-theory/`
- ES hub (proposed): `/es/curso-dj/teoria-musical/`
- Lessons: **9**

| Stable lesson ID | English working title | English slug |
|---|---|---|
| `dj-02-001` | What Is BPM in Music? | `what-is-bpm` |
| `dj-02-002` | Beats, Bars & Time Signatures | `beats-bars-time-signatures` |
| `dj-02-003` | How to Count Musical Phrases | `counting-musical-phrases` |
| `dj-02-004` | Understanding Song Structure | `song-structure` |
| `dj-02-005` | Downbeats, Accents & Transients | `downbeats-and-accents` |
| `dj-02-006` | Musical Keys & Scales Explained | `musical-keys-and-scales` |
| `dj-02-007` | The Camelot Wheel Explained | `camelot-wheel` |
| `dj-02-008` | Musical Energy & Dynamics | `musical-energy` |
| `dj-02-009` | Understanding Groove & Swing | `groove-and-swing` |

### Module 03 — DJ Equipment

- Part: **Foundations**
- ID: `dj-module-03`
- EN hub: `/en/learn-to-dj/dj-equipment/`
- ES hub (proposed): `/es/curso-dj/equipo-dj/`
- Lessons: **8**

| Stable lesson ID | English working title | English slug |
|---|---|---|
| `dj-03-001` | DJ Controllers vs CDJs vs Turntables | `dj-controllers-vs-cdjs-vs-turntables` |
| `dj-03-002` | How a DJ Mixer Works | `how-dj-mixers-work` |
| `dj-03-003` | Jog Wheels, Pitch Faders and Deck Controls | `dj-controller-controls` |
| `dj-03-004` | DJ Mixer EQ, Gain, Filters and Crossfaders | `dj-mixer-controls` |
| `dj-03-005` | How DJ Headphone Cueing Works | `dj-headphone-cueing` |
| `dj-03-006` | DJ Speakers, Monitors and PA Systems | `dj-speakers-and-monitors` |
| `dj-03-007` | DJ Audio Interfaces and Cable Connections | `dj-audio-connections` |
| `dj-03-008` | How to Connect and Troubleshoot DJ Equipment | `dj-setup-troubleshooting` |

### Module 04 — DJ Software

- Part: **Foundations**
- ID: `dj-module-04`
- EN hub: `/en/learn-to-dj/dj-software/`
- ES hub (proposed): `/es/curso-dj/software-dj/`
- Lessons: **7**

| Stable lesson ID | English working title | English slug |
|---|---|---|
| `dj-04-001` | How DJ Software Works | `how-dj-software-works` |
| `dj-04-002` | Understanding DJ Software Decks and Waveforms | `dj-software-interface` |
| `dj-04-003` | DJ Audio Settings and Latency Explained | `dj-audio-settings-latency` |
| `dj-04-004` | How DJ Software Analyzes Tracks | `dj-track-analysis` |
| `dj-04-005` | DJ Performance Modes and Hardware Integration | `dj-performance-modes` |
| `dj-04-006` | DJ Software Compatibility Explained | `dj-software-compatibility` |
| `dj-04-007` | How to Prepare an Offline DJ Setup | `offline-dj-setup` |

### Module 05 — Music Library & Preparation

- Part: **Foundations**
- ID: `dj-module-05`
- EN hub: `/en/learn-to-dj/music-library/`
- ES hub (proposed): `/es/curso-dj/biblioteca-musical/`
- Lessons: **9**

| Stable lesson ID | English working title | English slug |
|---|---|---|
| `dj-05-001` | Where DJs Get Their Music | `where-djs-get-music` |
| `dj-05-002` | Audio Formats and Sound Quality for DJs | `dj-audio-formats-quality` |
| `dj-05-003` | Music Metadata and ID3 Tags Explained | `music-metadata-id3-tags` |
| `dj-05-004` | How to Organize Your DJ Music Library | `organize-dj-music-library` |
| `dj-05-005` | DJ Playlists, Crates and Smart Playlists | `dj-playlists-and-crates` |
| `dj-05-006` | How to Set and Fix Beatgrids | `how-to-fix-beatgrids` |
| `dj-05-007` | How to Prepare Hot Cues and Loops | `prepare-hot-cues-and-loops` |
| `dj-05-008` | How to Tag DJ Tracks by Energy and Genre | `dj-track-tagging` |
| `dj-05-009` | How to Back Up and Export Your DJ Library | `backup-dj-music-library` |

### Module 06 — Beatmatching Fundamentals

- Part: **Mixing**
- ID: `dj-module-06`
- EN hub: `/en/learn-to-dj/beatmatching/`
- ES hub (proposed): `/es/curso-dj/beatmatching/`
- Lessons: **7**

| Stable lesson ID | English working title | English slug |
|---|---|---|
| `dj-06-001` | Tempo, Pitch and Playback Speed Explained | `tempo-pitch-playback-speed` |
| `dj-06-002` | How to Beatmatch by Ear | `how-to-beatmatch-by-ear` |
| `dj-06-003` | How BPM Sync and Beat Sync Work | `bpm-sync-vs-beat-sync` |
| `dj-06-004` | How to Align Beats, Bars and Phrases | `align-beats-and-phrases` |
| `dj-06-005` | How to Cue a Track in DJ Headphones | `how-to-cue-dj-tracks` |
| `dj-06-006` | How to Fix Beatmatching Drift | `fix-beatmatching-drift` |
| `dj-06-007` | How to Mix Two Songs for Beginners | `how-to-mix-two-songs` |

### Module 07 — Essential Mixing Techniques

- Part: **Mixing**
- ID: `dj-module-07`
- EN hub: `/en/learn-to-dj/mixing-techniques/`
- ES hub (proposed): `/es/curso-dj/tecnicas-de-mezcla/`
- Lessons: **9**

| Stable lesson ID | English working title | English slug |
|---|---|---|
| `dj-07-001` | How to Find Mix-In and Mix-Out Points | `mix-in-mix-out-points` |
| `dj-07-002` | How to Use Channel Faders and the Crossfader | `dj-fader-techniques` |
| `dj-07-003` | How to Mix with EQ | `eq-mixing-techniques` |
| `dj-07-004` | How to Perform a Bass Swap | `bass-swap-transition` |
| `dj-07-005` | How to Mix Song Intros and Outros | `intro-outro-mixing` |
| `dj-07-006` | How to Mix in Phrase | `phrase-mixing` |
| `dj-07-007` | How to Avoid Vocal Clashes While Mixing | `avoid-vocal-clashes` |
| `dj-07-008` | How to Transition Between Different Song Structures | `song-structure-transitions` |
| `dj-07-009` | How to DJ Without Looking at Waveforms | `mix-without-waveforms` |

### Module 08 — Advanced Mixing Techniques

- Part: **Mixing**
- ID: `dj-module-08`
- EN hub: `/en/learn-to-dj/advanced-mixing/`
- ES hub (proposed): `/es/curso-dj/mezcla-avanzada/`
- Lessons: **10**

| Stable lesson ID | English working title | English slug |
|---|---|---|
| `dj-08-001` | How to Mix Harmonically | `harmonic-mixing-techniques` |
| `dj-08-002` | How to Mix Songs with Different BPMs | `mix-songs-different-bpm` |
| `dj-08-003` | Creative DJ Loop Transitions | `loop-transitions` |
| `dj-08-004` | Hot Cue Mixing and Cue Juggling | `hot-cue-mixing` |
| `dj-08-005` | How to Use DJ Effects in Transitions | `dj-effects-transitions` |
| `dj-08-006` | How to Perform a Drop Swap | `drop-swap-transition` |
| `dj-08-007` | How to Layer Multiple Tracks | `layering-dj-tracks` |
| `dj-08-008` | How to Mix with Stems Live | `live-stem-mixing` |
| `dj-08-009` | Three- and Four-Deck DJ Mixing | `three-four-deck-mixing` |
| `dj-08-010` | How to Recover from DJ Mixing Mistakes | `recover-from-dj-mistakes` |

### Module 09 — Open Format DJing

- Part: **Creativity**
- ID: `dj-module-09`
- EN hub: `/en/learn-to-dj/open-format-djing/`
- ES hub (proposed): `/es/curso-dj/dj-open-format/`
- Lessons: **7**

| Stable lesson ID | English working title | English slug |
|---|---|---|
| `dj-09-001` | What Is Open Format DJing? | `what-is-open-format-djing` |
| `dj-09-002` | How to Transition Between Different Music Genres | `mix-different-genres` |
| `dj-09-003` | How to DJ with Pop, Dance, Hip-Hop and Latin Music | `mixing-pop-dance-hip-hop-latin` |
| `dj-09-004` | How to Quick Mix Songs | `quick-mixing` |
| `dj-09-005` | Wordplay and Acapella DJ Transitions | `wordplay-acapella-transitions` |
| `dj-09-006` | How to Mix Familiar Hits for Different Audiences | `mixing-popular-songs` |
| `dj-09-007` | How to Build an Open Format DJ Set | `open-format-dj-set` |

### Module 10 — DJ Set Planning & Performance

- Part: **Creativity**
- ID: `dj-module-10`
- EN hub: `/en/learn-to-dj/dj-set-planning/`
- ES hub (proposed): `/es/curso-dj/planificacion-sesiones-dj/`
- Lessons: **8**

| Stable lesson ID | English working title | English slug |
|---|---|---|
| `dj-10-001` | How to Plan a DJ Set | `how-to-plan-a-dj-set` |
| `dj-10-002` | Musical Storytelling for DJs | `dj-musical-storytelling` |
| `dj-10-003` | How to Build Energy in a DJ Set | `dj-set-energy-flow` |
| `dj-10-004` | Opening vs Peak-Time vs Closing DJ Sets | `types-of-dj-sets` |
| `dj-10-005` | How Many Songs Do You Need for a DJ Set? | `songs-per-dj-set` |
| `dj-10-006` | How to Read a Crowd as a DJ | `how-to-read-a-dj-crowd` |
| `dj-10-007` | How to Prepare Backup Tracks and Alternative Setlists | `dj-backup-setlists` |
| `dj-10-008` | How to Practice and Evaluate Your DJ Sets | `dj-practice-routine` |

### Module 11 — DJ Edits, Mashups & Production

- Part: **Creativity**
- ID: `dj-module-11`
- EN hub: `/en/learn-to-dj/dj-edits-mashups/`
- ES hub (proposed): `/es/curso-dj/edits-mashups-dj/`
- Lessons: **9**

| Stable lesson ID | English working title | English slug |
|---|---|---|
| `dj-11-001` | DJ Edits vs Remixes vs Mashups Explained | `dj-edits-remixes-mashups` |
| `dj-11-002` | What Are Audio Stems? | `what-are-audio-stems` |
| `dj-11-003` | How to Work with Acapellas and Instrumentals | `acapellas-instrumentals` |
| `dj-11-004` | How to Arrange Music for DJ Sets | `arrange-music-for-djing` |
| `dj-11-005` | How to Make Intro and Outro DJ Edits | `intro-outro-dj-edits` |
| `dj-11-006` | How to Create Vocal Breaks and Build-Ups | `vocal-breaks-build-ups` |
| `dj-11-007` | How to Make a DJ Mashup | `how-to-make-a-dj-mashup` |
| `dj-11-008` | Audio Levels, Mixing and Export for DJ Edits | `dj-edit-audio-export` |
| `dj-11-009` | DJ Edit and Mashup Production Workflows | `dj-edit-workflow` |

### Module 12 — Recording, Streaming & Publishing

- Part: **Beyond the Decks**
- ID: `dj-module-12`
- EN hub: `/en/learn-to-dj/recording-streaming/`
- ES hub (proposed): `/es/curso-dj/grabacion-streaming-dj/`
- Lessons: **7**

| Stable lesson ID | English working title | English slug |
|---|---|---|
| `dj-12-001` | How to Record a DJ Set | `how-to-record-a-dj-set` |
| `dj-12-002` | DJ Recording Audio Routing and Quality | `dj-recording-audio-routing` |
| `dj-12-003` | How to Create a DJ Mix Tracklist | `dj-mix-tracklists` |
| `dj-12-004` | How to Create DJ Videos and Visualizers | `dj-videos-visualizers` |
| `dj-12-005` | How to Live Stream a DJ Set | `live-stream-dj-sets` |
| `dj-12-006` | DJ Copyright and Music Licensing Explained | `dj-music-copyright` |
| `dj-12-007` | Where and How to Publish DJ Mixes | `publish-dj-mixes` |

### Module 13 — Professional DJing

- Part: **Beyond the Decks**
- ID: `dj-module-13`
- EN hub: `/en/learn-to-dj/professional-djing/`
- ES hub (proposed): `/es/curso-dj/dj-profesional/`
- Lessons: **9**

| Stable lesson ID | English working title | English slug |
|---|---|---|
| `dj-13-001` | How to Prepare for Your First DJ Gig | `first-dj-gig` |
| `dj-13-002` | DJ Booth Etiquette and Changeovers | `dj-booth-etiquette` |
| `dj-13-003` | DJ Soundcheck and Gain Staging | `dj-soundcheck-gain-staging` |
| `dj-13-004` | Working with Promoters and Venues | `working-with-dj-promoters` |
| `dj-13-005` | Using Microphones and Show Cues as a DJ | `dj-microphones-show-cues` |
| `dj-13-006` | How to Handle DJ Equipment Failures | `dj-technical-problems` |
| `dj-13-007` | Hearing Protection for DJs | `hearing-protection-for-djs` |
| `dj-13-008` | How to Build a DJ Portfolio | `dj-portfolio-branding` |
| `dj-13-009` | DJ Pricing, Contracts and Professional Practice | `dj-pricing-contracts` |

## 7. Curriculum review items before registry freeze

The **105 units remain candidates**, not a mandated article count. Resolve these in the editorial registry step, without a lengthy prelaunch keyword-research dependency:

- Decide whether to introduce a dedicated *How to Become a DJ* article or cover the topic in the course hub/introduction.
- Ensure fundamentals cover critical listening/ear training, gain/headroom/clipping and safe audio levels; split only when it improves learning clarity.
- Keep musical theory and its practical mixing applications distinct (Camelot/harmonic mixing, phrasing/phrase mixing, library hot cues/live hot-cue techniques).
- Clarify differentiation between equipment headphone cueing (03) and preparing a cue track in practice (06).
- Check overlaps of general software functions (04) and library preparation (05).
- Consider whether professional topics like contracts/riders need independent lessons or coherent in-article sections.
- Avoid outdated version-specific screenshots in core evergreen articles; plan dated revisions for examples.
- Confirm whether the module hub and lesson slug namespaces collide within a locale.

## 8. Definition of done for DL-003 (registry, before coding)

- Final module/lesson inventory with stable IDs and sequencing.
- One-line learning objective, prerequisite(s) and scope boundaries per lesson.
- Final EN title and provisional EN slug per lesson, plus localization task for ES.
- Distinct module hub introduction/objective; list of lesson relationships.
- Written policies for MDX authoring, asset briefs, states, versioning and bilingual review.
- Approval of this documentation in Git as baseline before starting implementation.

## 9. Out of scope and future phases

- Releases/music catalog, Resources product catalog and affiliate programs, Blog.
- Mandatory video tutorials; optional recommendations can be added later.
- Student accounts, progress tracking, quizzes/certificates.
- Large-scale SEO keyword volumes / competitor audits before launch.
- Building the Next.js route layer or MDX tooling until the repo and implementation plan are reviewed.

## 10. Change log

- **2026-11-17 — v0.2:** added companion DL-003.A curriculum registry with individual outcomes and overlap policy.
- **2026-11-17 — v0.1:** consolidated planning; prioritized **full English MDX article writing plus specific media briefs**, followed by localization and visual production; adopted GSC-led SEO iteration after full launch; captured 13 modules and 105 proposed lessons.

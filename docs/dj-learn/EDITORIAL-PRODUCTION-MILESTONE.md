# DJ Learn — Editorial / MDX integration milestone

Status: agreed planning milestone (2026-11-18)

## Principle

Write in full English Markdown first, with SEO editorial metadata and detailed in-place media briefs. This text is the editorial source. UI and page components will be applied in a later MD-to-MDX integration stage against the actual monorepo technical contracts.

## Sequencing

1. Complete EN drafts of all six Module 01 lessons (already drafted; not final-approved).
2. Develop EN drafts of Module 02 (nine lessons), one reviewable Markdown delivery at a time.
3. After Module 02 drafting, conduct **combined editorial QA on Modules 01 and 02**: terminology, overlap, depth, source verification, media requirements, links and consistency.
4. With the monorepo architecture and POP CHAOS editorial design system ready, **integrate and visually QA Modules 01 and 02 on a private/staging build**. Resolve contracts, create needed reusable MDX visuals/components, navigation and EN routing. Localize ES and QA the same templates at this stage or before final launch.
5. Continue developing Modules 03–13 using the validated editorial and visual system; run periodic QA and integration passes.
6. **Public launch remains a single complete release**: all 13 modules and course/modules/lessons in EN and ES, no empty lesson links, required media produced, technical and content QA passed.

## Distinguish editing, staging, publication

- **Drafted:** English source MD exists, still requires review.
- **Editorially approved:** EN copy has passed factual, linguistic, structural and reference review.
- **Integrated in staging:** renders correctly as MDX privately, with components, visuals and navigation.
- **Localized:** ES version approved and linked to EN revision.
- **Publicly published:** intentionally released and indexable after course-wide launch QA.

A staging preview is **not** a public release. Preview pages should be access-restricted where possible; do not depend solely on `noindex` for confidentiality. If exposed publicly for testing, ensure appropriate indexing controls and avoid accidental canonical conflicts.

## Content and visual rules

- Full narrative, examples, exercises, FAQs, sources, SEO fields and in-place `MEDIA-BRIEF` notes in the Markdown.
- Asset briefs state educational purpose, placement, format, alt text, rights and EN/ES requirements.
- When the component contracts arrive, map editorial fields to schemas rather than rewriting approved prose.
- Use lesson IDs for internal relationships; resolve to final URLs through the content registry during implementation.
- No fabricated SEO volumes or arbitrary keyword repetition. Post-launch GSC is the primary source for iterative cluster optimization.

## Module 02 production inventory

- DJ-02-001 — Rhythm, Pulse, Tempo and BPM (current draft)
- DJ-02-002 — Beats, Bars and Time Signatures
- DJ-02-003 — How to Count Musical Phrases
- DJ-02-004 — Understanding Song Structure
- DJ-02-005 — Downbeats, Accents and Transients
- DJ-02-006 — Musical Keys and Scales Explained
- DJ-02-007 — The Camelot Wheel Explained
- DJ-02-008 — Musical Energy and Dynamics
- DJ-02-009 — Understanding Groove and Swing

After all nine English drafts, revisit whether Module 02 needs changes in lesson segmentation based on actual content overlaps, not speculative search volume.

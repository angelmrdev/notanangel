# DL-003.A — Master Curriculum Registry

> **Project:** Not an Angel · DJ Learn  
> **Version:** 0.2 candidate for editorial approval · **Date:** 2026-11-17  
> **Repo path:** `docs/dj-learn/MASTER-CURRICULUM-REGISTRY.md`  
> **Status:** Editorial specification, **not** a generated `curriculum.ts` or final article copy.

## Purpose and constraints

- This registry is the **source of truth for lesson identity, sequence, scope and learning outcomes** until a validated implementation supersedes it.
- Scope: 4 parts, 13 modules, 105 candidate lessons. IDs, titles and EN slugs come from the prior source-of-truth baseline.
- A lesson is a standalone educational article **and** a step in the course. Its purpose must remain distinct from nearby lessons.
- EN article text is authored first in MDX with **specific, non-public visual production briefs** written during drafting. ES is independently localized.
- The whole course, including both localizations and required visuals, is released publicly **together** after QA.
- Keyword-volume research is **not a precondition** for authoring; technical SEO is handled at launch and editorial improvements use GSC after launch.
- Each lesson's prerequisite is a **recommended reading dependency**, not an account-based access gate.
- The **objective** is an editorial contract, not final copy. The **scope** describes what must be covered and what belongs elsewhere.

## Shared editorial requirements

1. Course hub provides course-wide purpose, audience, prerequisites, module roadmap and independent entry points.
2. Module hubs require their own introduction, outcomes, ordered lesson list and section context, not just a taxonomy page.
3. Lesson article must provide a direct answer/definition, teachable explanation, application/example, exercise or self-check where meaningful, summary, references when appropriate, and next/related lessons.
4. During EN writing, create media briefs at the exact insertion point (type, why, composition, data, alt draft, rights, localizable labels, priority). Media is produced/integrated later.
5. Do not state unverified prices, platform policies, compatibility or safety thresholds. Review time-sensitive claims against primary sources during authorship.
6. One stable lesson ID across languages. Final ES title/slug is an editorial localization deliverable, not fabricated here.

## Dependencies and scope rules

The recommendations below are **module-level default reading foundations**, not proof that each lesson requires everything listed. The actual article brief can narrow them.

| Module | Suggested foundations |
|---|---|
| 01 — DJ Basics | None |
| 02 — Music Theory for DJs | dj-01-001 |
| 03 — DJ Equipment | dj-01-004 |
| 04 — DJ Software | dj-01-004 |
| 05 — Music Library & Preparation | dj-01-001 |
| 06 — Beatmatching Fundamentals | dj-02-001, dj-02-002 |
| 07 — Essential Mixing Techniques | dj-06-007 |
| 08 — Advanced Mixing Techniques | dj-07-006 |
| 09 — Open Format DJing | dj-07-006 |
| 10 — DJ Set Planning & Performance | dj-07-006 |
| 11 — DJ Edits, Mashups & Production | dj-05-002, dj-07-006 |
| 12 — Recording, Streaming & Publishing | dj-06-007 |
| 13 — Professional DJing | dj-03-008, dj-10-001 |

**Anti-duplication boundaries:** music theory → counting/recognition; beatmatching → aligning/timing; mixing → applying techniques; library preparation → placing cues/loops; advanced mixing → performance manipulation; equipment → monitoring/routing; hands-on cueing → operational procedure. Editorial cross-links replace repeated full explanations.

## Module and lesson contracts

### Module 01 — DJ Basics

- **Part:** Foundations
- **Module ID:** `dj-module-01`
- **EN hub:** `/en/learn-to-dj/dj-basics/`
- **ES hub (provisional):** `/es/curso-dj/fundamentos-dj/`
- **Module outcome:** Understand the DJ role and assemble an entry-level setup.

| ID | EN title · proposed slug | Required learning outcome and scope boundary |
|---|---|---|
| `dj-01-001` | **What Is a DJ?** · `what-is-a-dj` | Explain a DJ’s role in selecting, sequencing and presenting recorded music. **Boundary:** Distinguish DJing from full music production. |
| `dj-01-002` | **The History of DJing** · `history-of-djing` | Identify major milestones and techniques in DJ culture. **Boundary:** Keep this historical overview separate from equipment instruction. |
| `dj-01-003` | **Different Types of DJs** · `types-of-djs` | Compare club, mobile, open-format, radio and turntablist roles. **Boundary:** Do not turn this into career pricing advice. |
| `dj-01-004` | **How DJ Equipment Works** · `how-dj-equipment-works` | Trace the playback-to-mixer-to-audience signal chain at a conceptual level. **Boundary:** Defer detailed controls to Module 03. |
| `dj-01-005` | **Essential DJ Terminology** · `dj-terminology` | Interpret common DJ vocabulary used throughout the course. **Boundary:** Do not duplicate full tutorials for each term. |
| `dj-01-006` | **How to Set Up Your First DJ System** · `first-dj-setup` | Assemble a minimal safe home setup and verify sound/cue output. **Boundary:** Cover choice and wiring only at introductory depth. |

### Module 02 — Music Theory for DJs

- **Part:** Foundations
- **Module ID:** `dj-module-02`
- **EN hub:** `/en/learn-to-dj/music-theory/`
- **ES hub (provisional):** `/es/curso-dj/teoria-musical/`
- **Module outcome:** Understand and hear the musical structures that make DJ mixing possible.

| ID | EN title · proposed slug | Required learning outcome and scope boundary |
|---|---|---|
| `dj-02-001` | **What Is BPM in Music?** · `what-is-bpm` | Determine tempo in BPM and relate it to perceived speed. **Boundary:** Defer tempo adjustments to Module 06. |
| `dj-02-002` | **Beats, Bars & Time Signatures** · `beats-bars-time-signatures` | Count beats and measures in common time signatures. **Boundary:** Treat phrase-level mixing as a separate application. |
| `dj-02-003` | **How to Count Musical Phrases** · `counting-musical-phrases` | Recognize and count common phrase groupings by listening. **Boundary:** Defer live phrase transitions to Module 07. **Review:** Include ear-training drills and a clear original 8/16/32-bar diagram brief. |
| `dj-02-004` | **Understanding Song Structure** · `song-structure` | Identify intros, verses, choruses, breaks and outros in arrangements. **Boundary:** Distinguish structure from transition choices. |
| `dj-02-005` | **Downbeats, Accents & Transients** · `downbeats-and-accents` | Recognize downbeats, accents and transient attacks by ear. **Boundary:** Include focused listening drills rather than mixing techniques. |
| `dj-02-006` | **Musical Keys & Scales Explained** · `musical-keys-and-scales` | Explain pitch, tonal center, keys and basic scales. **Boundary:** Do not teach advanced harmony beyond DJ needs. |
| `dj-02-007` | **The Camelot Wheel Explained** · `camelot-wheel` | Read Camelot notation and understand compatible-key heuristics and limitations. **Boundary:** Applied transitions belong in Module 08. |
| `dj-02-008` | **Musical Energy & Dynamics** · `musical-energy` | Recognize changes in energy, dynamics and tension. **Boundary:** Set planning and crowd responses belong in Module 10. |
| `dj-02-009` | **Understanding Groove & Swing** · `groove-and-swing` | Distinguish groove, swing and syncopation and count rhythms that are not rigidly straight. **Boundary:** Avoid genre-specific recipe lists. |

### Module 03 — DJ Equipment

- **Part:** Foundations
- **Module ID:** `dj-module-03`
- **EN hub:** `/en/learn-to-dj/dj-equipment/`
- **ES hub (provisional):** `/es/curso-dj/equipo-dj/`
- **Module outcome:** Operate and connect DJ hardware safely and accurately.

| ID | EN title · proposed slug | Required learning outcome and scope boundary |
|---|---|---|
| `dj-03-001` | **DJ Controllers vs CDJs vs Turntables** · `dj-controllers-vs-cdjs-vs-turntables` | Compare controller, media-player and turntable workflows and practical trade-offs. **Boundary:** Leave commercial purchase rankings to Resources. |
| `dj-03-002` | **How a DJ Mixer Works** · `how-dj-mixers-work` | Identify mixer signal flow, channels and routing. **Boundary:** Defer individual control operations to lesson 03.04. |
| `dj-03-003` | **Jog Wheels, Pitch Faders and Deck Controls** · `dj-controller-controls` | Explain jog, pitch, play, cue and transport functions and their effects. **Boundary:** Avoid teaching full beatmatching here. |
| `dj-03-004` | **DJ Mixer EQ, Gain, Filters and Crossfaders** · `dj-mixer-controls` | Set gain, EQ, filter and fader controls safely and identify their function. **Boundary:** Transition technique belongs in Module 07. **Review:** Explicitly address headroom, clipping and safe signal levels. |
| `dj-03-005` | **How DJ Headphone Cueing Works** · `dj-headphone-cueing` | Explain cue/master monitoring and headphone routing. **Boundary:** The live sequence for cueing a second track belongs in Module 06. |
| `dj-03-006` | **DJ Speakers, Monitors and PA Systems** · `dj-speakers-and-monitors` | Differentiate booth monitors, active speakers and PA systems. **Boundary:** Avoid consumer product comparisons. |
| `dj-03-007` | **DJ Audio Interfaces and Cable Connections** · `dj-audio-connections` | Identify common analog/digital audio connections, balanced cables and interfaces. **Boundary:** Reinforce signal levels/headroom. **Review:** Include balanced/unbalanced cable examples, not brand-specific shopping. |
| `dj-03-008` | **How to Connect and Troubleshoot DJ Equipment** · `dj-setup-troubleshooting` | Connect a basic setup, diagnose silence/hum/misrouting and follow a safe startup/shutdown order. **Boundary:** Deeper live failures in Module 13. |

### Module 04 — DJ Software

- **Part:** Foundations
- **Module ID:** `dj-module-04`
- **EN hub:** `/en/learn-to-dj/dj-software/`
- **ES hub (provisional):** `/es/curso-dj/software-dj/`
- **Module outcome:** Use generic DJ software concepts and prepare resilient playback.

| ID | EN title · proposed slug | Required learning outcome and scope boundary |
|---|---|---|
| `dj-04-001` | **How DJ Software Works** · `how-dj-software-works` | Describe the functions of DJ software and offline/streaming workflows. **Boundary:** Avoid brand reviews. |
| `dj-04-002` | **Understanding DJ Software Decks and Waveforms** · `dj-software-interface` | Navigate decks, waveforms, browser and library views. **Boundary:** Detailed beatgrid correction is in Module 05. |
| `dj-04-003` | **DJ Audio Settings and Latency Explained** · `dj-audio-settings-latency` | Configure audio outputs, buffer size, latency and cue routing. **Boundary:** Hardware cabling belongs in Module 03. |
| `dj-04-004` | **How DJ Software Analyzes Tracks** · `dj-track-analysis` | Interpret BPM, key and beatgrid analysis output and its limitations. **Boundary:** Manual correction belongs in Module 05. |
| `dj-04-005` | **DJ Performance Modes and Hardware Integration** · `dj-performance-modes` | Explain performance versus preparation modes and controller mappings. **Boundary:** Do not provide version-specific brand walkthroughs. |
| `dj-04-006` | **DJ Software Compatibility Explained** · `dj-software-compatibility` | Evaluate operating-system, hardware, library and export compatibility conceptually. **Boundary:** No price-led recommendations. |
| `dj-04-007` | **How to Prepare an Offline DJ Setup** · `offline-dj-setup` | Prepare a resilient local setup, test files and device access without internet. **Boundary:** Backups in Module 05. |

### Module 05 — Music Library & Preparation

- **Part:** Foundations
- **Module ID:** `dj-module-05`
- **EN hub:** `/en/learn-to-dj/music-library/`
- **ES hub (provisional):** `/es/curso-dj/biblioteca-musical/`
- **Module outcome:** Acquire, organize and prepare a dependable DJ music library.

| ID | EN title · proposed slug | Required learning outcome and scope boundary |
|---|---|---|
| `dj-05-001` | **Where DJs Get Their Music** · `where-djs-get-music` | Explain legitimate music acquisition options and usage limitations. **Boundary:** Full rights/publishing treatment is in Module 12. |
| `dj-05-002` | **Audio Formats and Sound Quality for DJs** · `dj-audio-formats-quality` | Choose suitable formats/bit rates and recognize transcoding pitfalls. **Boundary:** Recording export settings belong in Module 12. **Review:** Address lossy vs lossless and avoid claims that bitrate alone proves quality. |
| `dj-05-003` | **Music Metadata and ID3 Tags Explained** · `music-metadata-id3-tags` | Use tags, artist/title metadata and consistent naming. **Boundary:** Library taxonomy in lesson 05.04. |
| `dj-05-004` | **How to Organize Your DJ Music Library** · `organize-dj-music-library` | Design a maintainable folder/database structure for a DJ library. **Boundary:** Playlist selection in lesson 05.05. |
| `dj-05-005` | **DJ Playlists, Crates and Smart Playlists** · `dj-playlists-and-crates` | Build crates, playlists and smart filters for retrieval. **Boundary:** Avoid advanced set programming from Module 10. |
| `dj-05-006` | **How to Set and Fix Beatgrids** · `how-to-fix-beatgrids` | Inspect, repair and validate beatgrids, including tracks with tempo changes. **Boundary:** Distinguish grid correction from beatmatching. |
| `dj-05-007` | **How to Prepare Hot Cues and Loops** · `prepare-hot-cues-and-loops` | Place memory/hot cues and saved loops to prepare tracks. **Boundary:** Creative manipulation belongs in Module 08. |
| `dj-05-008` | **How to Tag DJ Tracks by Energy and Genre** · `dj-track-tagging` | Apply consistent genre, energy, mood and context tags. **Boundary:** Energy flow strategy belongs in Module 10. |
| `dj-05-009` | **How to Back Up and Export Your DJ Library** · `backup-dj-music-library` | Export and back up library databases, audio and metadata and test restoration. **Boundary:** Offline setup specifics belong in Module 04. |

### Module 06 — Beatmatching Fundamentals

- **Part:** Mixing
- **Module ID:** `dj-module-06`
- **EN hub:** `/en/learn-to-dj/beatmatching/`
- **ES hub (provisional):** `/es/curso-dj/beatmatching/`
- **Module outcome:** Match tempo and align two tracks by ear or with informed use of sync.

| ID | EN title · proposed slug | Required learning outcome and scope boundary |
|---|---|---|
| `dj-06-001` | **Tempo, Pitch and Playback Speed Explained** · `tempo-pitch-playback-speed` | Explain how tempo faders affect speed and potentially pitch, including key lock. **Boundary:** BPM definition remains in Module 02. |
| `dj-06-002` | **How to Beatmatch by Ear** · `how-to-beatmatch-by-ear` | Match two steady rhythms by listening and adjusting tempo. **Boundary:** Do not rely on visual waveform alignment. **Review:** Include progressively harder listening-only exercises. |
| `dj-06-003` | **How BPM Sync and Beat Sync Work** · `bpm-sync-vs-beat-sync` | Explain BPM sync versus beat sync and when each can fail. **Boundary:** Separate from manual beatmatching drills. |
| `dj-06-004` | **How to Align Beats, Bars and Phrases** · `align-beats-and-phrases` | Align beats and phrase starts in playback and identify drift. **Boundary:** Phrase-based transitions belong in Module 07. |
| `dj-06-005` | **How to Cue a Track in DJ Headphones** · `how-to-cue-dj-tracks` | Prepare and launch an incoming track using headphones and cue controls. **Boundary:** Monitoring circuitry belongs in Module 03. |
| `dj-06-006` | **How to Fix Beatmatching Drift** · `fix-beatmatching-drift` | Diagnose drift, incorrect grids and mismatched beat positions and recover calmly. **Boundary:** Advanced performance recovery in Module 08. |
| `dj-06-007` | **How to Mix Two Songs for Beginners** · `how-to-mix-two-songs` | Perform a complete beginner two-track transition with cueing, matched tempo, phrasing and levels. **Boundary:** Link deeper EQ choices to Module 07. |

### Module 07 — Essential Mixing Techniques

- **Part:** Mixing
- **Module ID:** `dj-module-07`
- **EN hub:** `/en/learn-to-dj/mixing-techniques/`
- **ES hub (provisional):** `/es/curso-dj/tecnicas-de-mezcla/`
- **Module outcome:** Execute controlled, musically coherent two-track transitions.

| ID | EN title · proposed slug | Required learning outcome and scope boundary |
|---|---|---|
| `dj-07-001` | **How to Find Mix-In and Mix-Out Points** · `mix-in-mix-out-points` | Choose musical entry and exit points based on arrangement. **Boundary:** Formal arrangement recognition is in Module 02. |
| `dj-07-002` | **How to Use Channel Faders and the Crossfader** · `dj-fader-techniques` | Perform blends and cuts using channel and crossfaders. **Boundary:** Control anatomy belongs in Module 03. |
| `dj-07-003` | **How to Mix with EQ** · `eq-mixing-techniques` | Use EQ to manage overlapping frequencies and avoid masking. **Boundary:** Signal-path theory stays in Module 03. |
| `dj-07-004` | **How to Perform a Bass Swap** · `bass-swap-transition` | Execute a measured low-frequency exchange without bass buildup. **Boundary:** Broader EQ blending in lesson 07.03. |
| `dj-07-005` | **How to Mix Song Intros and Outros** · `intro-outro-mixing` | Blend usable intros and outros while honoring phrase length. **Boundary:** Avoid building custom edits from Module 11. |
| `dj-07-006` | **How to Mix in Phrase** · `phrase-mixing` | Time the entrance and exit of tracks to musical phrase boundaries. **Boundary:** Counting theory belongs in Module 02. |
| `dj-07-007` | **How to Avoid Vocal Clashes While Mixing** · `avoid-vocal-clashes` | Identify and prevent incompatible simultaneous vocal sections. **Boundary:** Creative vocal layering in Module 09. |
| `dj-07-008` | **How to Transition Between Different Song Structures** · `song-structure-transitions` | Handle tracks with asymmetric sections, breaks and nonmatching arrangements. **Boundary:** Structure definitions in Module 02. |
| `dj-07-009` | **How to DJ Without Looking at Waveforms** · `mix-without-waveforms` | Mix by ear using audio cues while deliberately limiting waveform reliance. **Boundary:** Foundational beatmatching in Module 06. |

### Module 08 — Advanced Mixing Techniques

- **Part:** Mixing
- **Module ID:** `dj-module-08`
- **EN hub:** `/en/learn-to-dj/advanced-mixing/`
- **ES hub (provisional):** `/es/curso-dj/mezcla-avanzada/`
- **Module outcome:** Extend mixing through harmony, loops, effects, stems and multiple decks.

| ID | EN title · proposed slug | Required learning outcome and scope boundary |
|---|---|---|
| `dj-08-001` | **How to Mix Harmonically** · `harmonic-mixing-techniques` | Plan and perform harmonic transitions with compatible keys and thoughtful exceptions. **Boundary:** Camelot fundamentals in Module 02. **Review:** Do not duplicate Camelot notation explanation from dj-02-007. |
| `dj-08-002` | **How to Mix Songs with Different BPMs** · `mix-songs-different-bpm` | Transition across unequal BPM values using ramps, breaks, cuts and tempo changes. **Boundary:** Open-format context in Module 09. |
| `dj-08-003` | **Creative DJ Loop Transitions** · `loop-transitions` | Build transitions using measured loops and controlled release. **Boundary:** Saved-loop preparation in Module 05. |
| `dj-08-004` | **Hot Cue Mixing and Cue Juggling** · `hot-cue-mixing` | Use hot cues for live recombination and simple cue juggling. **Boundary:** Cue placement preparation in Module 05. |
| `dj-08-005` | **How to Use DJ Effects in Transitions** · `dj-effects-transitions` | Apply effects with correct timing and levels and avoid overuse. **Boundary:** Effects hardware controls in Module 03. |
| `dj-08-006` | **How to Perform a Drop Swap** · `drop-swap-transition` | Exchange musical drops cleanly while preserving energy and timing. **Boundary:** Avoid claiming universal one-size-fits-all formulas. |
| `dj-08-007` | **How to Layer Multiple Tracks** · `layering-dj-tracks` | Blend multiple concurrent elements with attention to arrangement, gain and masking. **Boundary:** Multi-deck routing in 08.09. |
| `dj-08-008` | **How to Mix with Stems Live** · `live-stem-mixing` | Use isolated vocals/instruments in live transitions and account for separation artifacts. **Boundary:** Offline stem editing in Module 11. |
| `dj-08-009` | **Three- and Four-Deck DJ Mixing** · `three-four-deck-mixing` | Manage additional decks, monitoring and routing for complex layered mixes. **Boundary:** Beginner two-deck workflow in Module 06. |
| `dj-08-010` | **How to Recover from DJ Mixing Mistakes** · `recover-from-dj-mistakes` | Recover from mis-cues, wrong tempo, clipping or a dropped track during performance. **Boundary:** Hardware failure procedures in Module 13. |

### Module 09 — Open Format DJing

- **Part:** Creativity
- **Module ID:** `dj-module-09`
- **EN hub:** `/en/learn-to-dj/open-format-djing/`
- **ES hub (provisional):** `/es/curso-dj/dj-open-format/`
- **Module outcome:** Adapt DJ transitions and selection across genres and audiences.

| ID | EN title · proposed slug | Required learning outcome and scope boundary |
|---|---|---|
| `dj-09-001` | **What Is Open Format DJing?** · `what-is-open-format-djing` | Define open-format DJing and its audience-led goals. **Boundary:** Distinguish it from general mixing technique. |
| `dj-09-002` | **How to Transition Between Different Music Genres** · `mix-different-genres` | Choose genre-change techniques based on rhythm, tempo, phrasing and expectations. **Boundary:** Generic BPM-change mechanics in Module 08. |
| `dj-09-003` | **How to DJ with Pop, Dance, Hip-Hop and Latin Music** · `mixing-pop-dance-hip-hop-latin` | Compare structural and rhythmic mixing considerations across pop, dance, hip-hop and Latin styles without stereotyping genres.. **Boundary:** Keep this lesson focused on its title and link to adjacent lessons rather than repeating them. |
| `dj-09-004` | **How to Quick Mix Songs** · `quick-mixing` | Use short blends, cuts and quick changes without sacrificing musical intent. **Boundary:** General fader mechanics in Module 07. |
| `dj-09-005` | **Wordplay and Acapella DJ Transitions** · `wordplay-acapella-transitions` | Design intelligible wordplay and vocal/acapella transitions with legal source considerations. **Boundary:** Production editing in Module 11. |
| `dj-09-006` | **How to Mix Familiar Hits for Different Audiences** · `mixing-popular-songs` | Balance familiar hits, surprise, context and crowd response. **Boundary:** Broader crowd reading in Module 10. |
| `dj-09-007` | **How to Build an Open Format DJ Set** · `open-format-dj-set` | Sequence a varied multi-genre set with coherent energy and fallback paths. **Boundary:** General set planning in Module 10. |

### Module 10 — DJ Set Planning & Performance

- **Part:** Creativity
- **Module ID:** `dj-module-10`
- **EN hub:** `/en/learn-to-dj/dj-set-planning/`
- **ES hub (provisional):** `/es/curso-dj/planificacion-sesiones-dj/`
- **Module outcome:** Design, perform and review musical sets with a deliberate arc.

| ID | EN title · proposed slug | Required learning outcome and scope boundary |
|---|---|---|
| `dj-10-001` | **How to Plan a DJ Set** · `how-to-plan-a-dj-set` | Create a coherent set plan from length, venue, audience and available library. **Boundary:** Not a fixed compulsory playlist. |
| `dj-10-002` | **Musical Storytelling for DJs** · `dj-musical-storytelling` | Build narrative arcs and contrasts across a set. **Boundary:** Musical energy definitions in Module 02. |
| `dj-10-003` | **How to Build Energy in a DJ Set** · `dj-set-energy-flow` | Design energy curves, peaks and recoveries based on songs and context. **Boundary:** Avoid algorithmic formulas presented as rules. |
| `dj-10-004` | **Opening vs Peak-Time vs Closing DJ Sets** · `types-of-dj-sets` | Distinguish goals of opening, peak-time and closing slots and plan accordingly. **Boundary:** Live venue negotiation in Module 13. |
| `dj-10-005` | **How Many Songs Do You Need for a DJ Set?** · `songs-per-dj-set` | Estimate track count for 30/60/120 minutes using realistic play lengths and overlap. **Boundary:** Give assumptions explicitly. |
| `dj-10-006` | **How to Read a Crowd as a DJ** · `how-to-read-a-dj-crowd` | Observe and respond to audience behavior without overgeneralizing or using manipulative tactics. **Boundary:** Open-format technique in Module 09. |
| `dj-10-007` | **How to Prepare Backup Tracks and Alternative Setlists** · `dj-backup-setlists` | Prepare branching paths, backup tracks and contingency crates. **Boundary:** File/database backups in Module 05. |
| `dj-10-008` | **How to Practice and Evaluate Your DJ Sets** · `dj-practice-routine` | Build a repeatable practice cycle and critique recordings using specific criteria. **Boundary:** Technical recording in Module 12. |

### Module 11 — DJ Edits, Mashups & Production

- **Part:** Creativity
- **Module ID:** `dj-module-11`
- **EN hub:** `/en/learn-to-dj/dj-edits-mashups/`
- **ES hub (provisional):** `/es/curso-dj/edits-mashups-dj/`
- **Module outcome:** Create DJ-focused edits and mashups with sound production fundamentals.

| ID | EN title · proposed slug | Required learning outcome and scope boundary |
|---|---|---|
| `dj-11-001` | **DJ Edits vs Remixes vs Mashups Explained** · `dj-edits-remixes-mashups` | Distinguish DJ edits, remixes, mashups and bootlegs by creative method and rights. **Boundary:** Formal legal treatment in Module 12. |
| `dj-11-002` | **What Are Audio Stems?** · `what-are-audio-stems` | Explain stem types, separation methods, artifacts and ethical constraints. **Boundary:** Live stem performance in Module 08. |
| `dj-11-003` | **How to Work with Acapellas and Instrumentals** · `acapellas-instrumentals` | Prepare and synchronize vocals and backing tracks while spotting phase/key/timing conflicts. **Boundary:** Vocal mixing live in Module 07. |
| `dj-11-004` | **How to Arrange Music for DJ Sets** · `arrange-music-for-djing` | Restructure song sections to suit mixing and performance without overcomplicating production. **Boundary:** Live set planning in Module 10. |
| `dj-11-005` | **How to Make Intro and Outro DJ Edits** · `intro-outro-dj-edits` | Create functional intro/outro edits with clean counts and musical continuity. **Boundary:** Blending preexisting intros in Module 07. |
| `dj-11-006` | **How to Create Vocal Breaks and Build-Ups** · `vocal-breaks-build-ups` | Build deliberate vocal breaks and risers with consistent timing and levels. **Boundary:** Do not require advanced sound-design skills. |
| `dj-11-007` | **How to Make a DJ Mashup** · `how-to-make-a-dj-mashup` | Plan, align and render a simple two-song mashup using original or authorized source materials. **Boundary:** Explain rights caveats. |
| `dj-11-008` | **Audio Levels, Mixing and Export for DJ Edits** · `dj-edit-audio-export` | Set gain/headroom, avoid clipping, and export DJ-ready files with appropriate settings. **Boundary:** Live soundcheck in Module 13. |
| `dj-11-009` | **DJ Edit and Mashup Production Workflows** · `dj-edit-workflow` | Compare track-level preparation, stems and arrangement workflows from idea to quality check. **Boundary:** Avoid a product comparison article. |

### Module 12 — Recording, Streaming & Publishing

- **Part:** Beyond the Decks
- **Module ID:** `dj-module-12`
- **EN hub:** `/en/learn-to-dj/recording-streaming/`
- **ES hub (provisional):** `/es/curso-dj/grabacion-streaming-dj/`
- **Module outcome:** Capture and share performances with appropriate technical and rights awareness.

| ID | EN title · proposed slug | Required learning outcome and scope boundary |
|---|---|---|
| `dj-12-001` | **How to Record a DJ Set** · `how-to-record-a-dj-set` | Record a complete performance with a reliable capture method and check the result. **Boundary:** Setup routing details in 12.02. |
| `dj-12-002` | **DJ Recording Audio Routing and Quality** · `dj-recording-audio-routing` | Configure routing, sample rate, level and monitoring for recordings. **Boundary:** Live booth soundcheck in Module 13. |
| `dj-12-003` | **How to Create a DJ Mix Tracklist** · `dj-mix-tracklists` | Create accurate tracklists and timestamps while acknowledging identification and rights considerations. **Boundary:** Do not copy lyrics. |
| `dj-12-004` | **How to Create DJ Videos and Visualizers** · `dj-videos-visualizers` | Plan DJ video framing, sync, visuals and exports while respecting audio/video rights. **Boundary:** No mandatory original video production. |
| `dj-12-005` | **How to Live Stream a DJ Set** · `live-stream-dj-sets` | Configure a resilient stream workflow with audio, basic video, monitoring and backup. **Boundary:** Platform licensing varies. |
| `dj-12-006` | **DJ Copyright and Music Licensing Explained** · `dj-music-copyright` | Explain composition/master rights, public performance, sync and platform licensing at a high level with jurisdiction caveats.. **Boundary:** Keep this lesson focused on its title and link to adjacent lessons rather than repeating them. **Review:** High-review item: jurisdiction and platform rules change; use dated primary references. |
| `dj-12-007` | **Where and How to Publish DJ Mixes** · `publish-dj-mixes` | Compare distribution destinations and prepare compliant metadata/permissions. **Boundary:** Do not imply universal upload authorization. |

### Module 13 — Professional DJing

- **Part:** Beyond the Decks
- **Module ID:** `dj-module-13`
- **EN hub:** `/en/learn-to-dj/professional-djing/`
- **ES hub (provisional):** `/es/curso-dj/dj-profesional/`
- **Module outcome:** Prepare for professional events with sound, safety and operational practices.

| ID | EN title · proposed slug | Required learning outcome and scope boundary |
|---|---|---|
| `dj-13-001` | **How to Prepare for Your First DJ Gig** · `first-dj-gig` | Prepare a gig checklist, backups and venue questions and rehearse an opening handoff. **Boundary:** Contracts in 13.09. |
| `dj-13-002` | **DJ Booth Etiquette and Changeovers** · `dj-booth-etiquette` | Perform respectful booth handovers, cable/device changeovers and shared-equipment etiquette. **Boundary:** Diagnostics in 13.06. |
| `dj-13-003` | **DJ Soundcheck and Gain Staging** · `dj-soundcheck-gain-staging` | Run a safe soundcheck, set gain structure and recognize clipping/headroom concerns. **Boundary:** Recording settings in Module 12. |
| `dj-13-004` | **Working with Promoters and Venues** · `working-with-dj-promoters` | Communicate clearly with promoters, performers and venue staff, including needs and timelines. **Boundary:** Financial terms in 13.09. |
| `dj-13-005` | **Using Microphones and Show Cues as a DJ** · `dj-microphones-show-cues` | Operate microphones and time audio cues for hosts/performers, with feedback precautions. **Boundary:** General mic technique, not vocal production. |
| `dj-13-006` | **How to Handle DJ Equipment Failures** · `dj-technical-problems` | Apply a staged troubleshooting plan for live playback/audio failures without unsafe electrical intervention. **Boundary:** Home setup faults in Module 03. |
| `dj-13-007` | **Hearing Protection for DJs** · `hearing-protection-for-djs` | Apply evidence-based volume exposure and hearing protection practices. **Boundary:** No unsupported medical promises. **Review:** High-review item: use authoritative hearing-health sources and avoid medical guarantees. |
| `dj-13-008` | **How to Build a DJ Portfolio** · `dj-portfolio-branding` | Assemble a concise DJ portfolio with bio, audio/video samples and contact details. **Boundary:** Separate promotion from pedagogy. |
| `dj-13-009` | **DJ Pricing, Contracts and Professional Practice** · `dj-pricing-contracts` | Identify pricing variables, written terms, cancellation clauses and technical rider basics. **Boundary:** Flag jurisdiction-specific legal/tax advice. **Review:** Keep contract/rider content introductory; legal and tax details depend on country. |

## Scope audit and proposed decisions before freeze

| Item | Proposed resolution | Status |
|---|---|---|
| 105 vs 106 count | Source list contains exactly **105** lessons; do not claim 106. | Confirmed |
| How to Become a DJ | Cover an actionable overview in the course hub and lesson `dj-01-001` initially; add a separate URL only if content demands it after launch. | Proposed |
| Ear training | Integrated into modules 02, 06 and 07 with explicit listening exercises. | Proposed |
| Clipping/headroom/signal levels | Integrated in `dj-03-004`, `dj-11-008` and `dj-13-003`; avoid overlapping depth. | Proposed |
| Harmonic theory vs application | `dj-02-007` teaches notation; `dj-08-001` teaches transition decisions. | Proposed |
| Hot cues in library vs live | `dj-05-007` prepares; `dj-08-004` performs. | Proposed |
| Cue monitoring vs cue operation | `dj-03-005` explains signal routing; `dj-06-005` demonstrates track launch. | Proposed |
| Legal and platform information | `dj-12-006` and `dj-12-007` need dated authoritative references and careful scope. | Proposed |
| Professional rider and contracts | Introductory rider/contract treatment in `dj-13-009`; separate advanced article only if needed. | Proposed |
| URL collisions | Current **EN** hub/lesson slug inventory has no duplicates; ES uniqueness to validate after localization. | Pending automated validation in implementation |
| Visual completeness | Every lesson receives a media-needs assessment during EN drafting; only truly essential visuals block launch. | Approved workflow |

## Freeze checklist (DL-003.A)

- [x] Inventory parsed and count reconciled: 13 modules / 105 lessons.
- [x] Stable IDs, English titles and proposed slugs consolidated.
- [x] One specific learning outcome plus coverage boundary recorded for every lesson.
- [x] Module-level reading foundations and 13 outcomes documented.
- [x] Duplicate-content decisions and gaps flagged.
- [ ] Editorial approval of outcome/scope decisions.
- [ ] Final ES module and lesson titles/slugs when localized.
- [ ] Technical schema and MDX loader validated against the actual monorepo (DL-003.B).

## Handoff to DL-003.B

Define the actual canonical registry format, schema validation, MDX authoring package and asset-brief syntax after inspecting the project's source tree. **Do not** mechanically fill MDX files with the short outcomes in this register; they are editorial contracts, not publishable copy. EN authoring comes first, then ES localization and finally media production/integration based on previously written briefs.

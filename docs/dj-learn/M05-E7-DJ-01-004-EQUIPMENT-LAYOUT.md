# M05-E7 — DJ-01-004: How DJ Equipment Works

## Application order

Install on top of the original 2026-11-19 monorepo and patches **M05-E1 through M05-E6**. Extract the archive at the monorepo root, overwriting the existing educational-components registry. Do not merge it into `apps/web` directly.

## Included

- `equipment-visuals.tsx` and `equipment-visuals.module.css`: nine original responsive diagrams, implemented as semantic HTML/CSS (no third-party dependencies, no copyrighted product drawings).
- `educational-components.tsx`: registers all nine visuals alongside previously built components.
- `dj-01-004.mdx`: retains the complete English draft article, replacing the initial generic diagram with an equipment-specific signal-flow view and inserting eight additional diagrams at their relevant sections.
- This integration note.

### Diagram register (source brief mapping)

| Component | Learning objective |
| --- | --- |
| EquipmentSignalFlow | Two source paths, public master and private cue (V01) |
| DeckControlMap | Deck functions and why controllers differ from players (V02) |
| MixerChannelAnatomy | Roles of channel controls, not a universal signal order (V03) |
| MonitoringRoutes | MASTER/CUE/BOOTH outputs (V04) |
| EquipmentSetupComparison | Laptop, standalone, digital media, vinyl configuration (V05) |
| AudioConnectorPlate | RCA, TRS, TS, XLR, USB, phono/line (V06) |
| SpeakerSignalRoute | Active/passive loudspeaker signal requirements (supplemental) |
| HeadroomAndClipping | Headroom and overload (V07) |
| AudioTroubleshootingFlow | Step-by-step audio troubleshooting (V09) |

**Unimplemented source brief V08:** the two-track transition timeline remains described in the article. It can be realized in an upcoming reusable performance timeline component, preferably shared with Module 02. This is an explicit scope gap; do not mark V08 complete.

## Safety and validity

- Signal diagrams are conceptual, **not wiring specifications**; consult manuals for exact routing.
- Channel chain diagrams deliberately do not assert a fixed hardware processing order.
- Input wiring and amplifier output safety are called out in the text and diagrams.
- The article remains **draft**, and no production publication flags, manifests, sitemaps or backend changes are included.
- The current local final-URL developer access remains handled by M05-E4.

## Verify in local monorepo

```powershell
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --filter @naa/web build
pnpm --filter @naa/web dev
```

Open `http://localhost:3000/learn-to-dj/dj-basics/how-dj-equipment-works/` in local development. Check charts on desktop and 390px mobile; verify there is exactly one H1, the MDX compiles, all 9 components render, and keyboard text alternatives make sense. Check that production still excludes drafts.

**QA status:** ZIP contents and component wiring inspected; a complete Next.js build and browser visual QA require the user's local environment.

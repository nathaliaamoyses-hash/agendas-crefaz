# AGENTS.md — Inter @ Salesforce Connections 2026

## Current extension and approval gates

The root app is being extended into the Dreamforce / San Francisco companion.
Use `docs/WORKPLAN.md` for the six approved planning adjustments and phase boundaries.
**Phases 1–6 are complete. Final editorial content and agenda migration remain pending. Release requires a separate decision.**
Deployment requires a separate release decision. The temporary `agendas/df26/`
app remains a content reference.

The app now has hash routes in `src/routing/routes.js`, a shared `AppShell`, and
its original agenda in `src/pages/AgendaPage.jsx`. Home, SF landing, Sunday, and all six SF guides are implemented with structured draft content.
Trip metadata/new shell copy lives in `src/data/trip.js`; new local content
contracts live in `src/data/content/`. Landing copy lives in `src/data/guide.js`. `npm test` runs Node regression checks.
Today uses local SF dates and reference-based plans in `src/data/content/dayPlans.js`.
Its selection survives navigation; reload returns to the current/default trip day.
Sunday has three detail routes with reusable Route/RouteStop, PlaceCard, and
SharedPlanCard components. Keep `docs/CONTENT-AUTHORING.md` and
`docs/content-examples.json` aligned with card schemas as the remaining phases evolve.
SF guide sections live in `src/data/sfGuides.js`. Places, activities, and neighborhoods
have data-derived detail routes. `scripts/export-content-examples.mjs` refreshes
the authoring examples from source records. Keep source IDs stable during editing. Optional weather uses `src/data/services.js` and a local timestamped cache; Today remains fully local. The PWA manifest now uses the trip identity.
The original Connections dataset, calendar conversion, favorites keys, and
hosting configuration remain intact pending deliberate migration.

The Connections-specific reference below applies to the preserved agenda;
it is not the schema or timezone for new San Francisco content.

## Scope

These project instructions apply to Codex and other coding agents working anywhere in this repository. Adapted from the existing `CLAUDE.md`; keep shared project guidance consistent between the two files.

Mobile-first progressive web app for the Inter account team at Salesforce Connections 2026 in Chicago. Displays a filterable event agenda, supports offline browsing, and surfaces WhatsApp contact links and calendar export.

## Repository Scope

The root app is the Connections 2026 agenda described below. `agendas/df26/` is a separate Dreamforce app with its own package, source, and Vite configuration. Run commands from the app you are changing. The event schema, branding, and layout below describe the root app; inspect the corresponding DF26 files before applying them there.

## Stack

- React 18 + Vite 5
- Tailwind CSS v3 (PostCSS + Autoprefixer)
- Local hash routing; event detail remains a state-controlled bottom-sheet modal
- No backend — core content is static JS. Optional NWS weather observations are fetched on Home with a timestamped local cache and unavailable fallback.

## Commands

```bash
npm run dev      # dev server → http://localhost:5173/
npm run build    # production build → dist/
npm run preview  # serve dist/ locally
```

## Project Layout

```
src/
  config.js          ← brand copy, contacts, colors — edit here, never in components
  data/
    events.js        ← all event objects (the only file the account team edits)
  components/
    Header.jsx       ← 5-row header: logos, title, instructions, contacts, hero image
    FilterBar.jsx    ← horizontal tab bar (All / Sessions / 1:1s / Get Togethers / My Schedule)
    EventCard.jsx    ← card in the event list
    EventDetail.jsx  ← bottom-sheet modal; wires Google Calendar + Outlook deep-links
    AppShell.jsx     ← shared navigation and device-connectivity banner; PwaStatus footer
    WhatsAppButton.jsx ← fixed floating button, bottom-right
    Toast.jsx        ← transient offline-tap feedback
  hooks/
    useFavorites.js  ← localStorage-backed Set; key "cnx-favorites"
    useOnlineStatus.js ← shared navigator.onLine hint, refreshed by online/offline/pageshow
  utils/
    date.js          ← formatEventDate() — always use this, never new Date(isoString)
  assets/            ← drop logo SVGs and hero image here
```

## Editing Events — src/data/events.js

This is the only file the account team needs to touch. Every object in the `events` array must include all fields; set inapplicable optional fields to `null` (never omit them).

### Schema

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | Unique, e.g. `"evt-001"` |
| `eventCategory` | `"suggested"` \| `"also"` \| `"oneOnOne"` \| `"social"` | Controls badge color and filter tab |
| `title` | string | |
| `date` | string | `"YYYY-MM-DD"` |
| `startTime` | string | `"HH:MM"` 24-hour |
| `endTime` | string | `"HH:MM"` 24-hour |
| `room` | string\|null | |
| `area` | string\|null | |
| `type` | string\|null | e.g. `"Keynote"`, `"Breakout"` |
| `topic` | string\|null | Track/topic |
| `summary` | string\|null | Basic HTML allowed: `<b>`, `<i>`, `<a href="...">`. No `<script>` or `<style>`. |
| `participants` | string\|null | `oneOnOne` only; `null` for all other categories |
| `registrationRequired` | boolean | |
| `transitionWarning` | string\|null | Short travel-time note shown in detail modal |
| `mapsUrl` | string\|null | `null` for McCormick Place main venue; deep-link URL for off-site |
| `url` | string\|null | Salesforce Connections session page URL |

### Category colors

Tokens live in `categoryColors` in `src/config.js` — edit there, not in components.
Labels must use dark text (`#032D60`); accent colors fail WCAG AA on their own tints.

| Category | Card label | Accent (border) | Tint (bg) |
|----------|-----------|-----------------|-----------|
| `suggested` | *(none)* | none | `#ffffff` |
| `also` | Alternative session | `#19a7b3` teal | `#f0fbfc` |
| `oneOnOne` | Confirmed 1:1 | `#ff9200` amber | `#fff8ec` |
| `social` | Get together | `#8a4fd3` purple | `#f7f2fd` |

## Editing Config — src/config.js

All user-visible copy and contact info lives here. Never hardcode these values in components.

| Export | Purpose |
|--------|---------|
| `agendaTitle` | App title in header row 2 |
| `clientName` | Client short name |
| `instructions` | Instructional text in header row 3 (plain string, no HTML) |
| `whatsappNumber` | Floating WA button destination — international format, no `+`, no spaces |
| `teamContacts` | Array of `{ name, phone }` — header row 4 contact links |
| `heroImage` | Import the asset and set here, or leave `null` for placeholder |
| `colors` | Brand color tokens mirrored as CSS custom properties in `index.css` |

## Key Invariants

**Timezone-safe dates**: Never call `new Date(event.date)` directly. ISO date strings parse as UTC midnight and render as the previous day in Chicago (CDT, UTC−5) and São Paulo (BRT, UTC−3). Always use `formatEventDate(event.date)` from `src/utils/date.js`.

**Null safety**: Every optional event field can be `null` at runtime. Always null-check before rendering — `{event.room && <span>{event.room}</span>}`. No exceptions.

**Online/offline**: `useOnlineStatus` reads `navigator.onLine` as a device connectivity hint, including on reload; it does not establish server reachability. New SF external actions remain clickable with contextual guidance. Core content and Today need no requests. Weather handles actual request failure, timeout, cache expiration, and storage failure independently.

**No values in components**: Agenda copy, contacts, and colors come from `src/config.js`. Companion copy and records live in `src/data/`; service copy/configuration lives in `src/data/services.js`. Keep editorial values in those sources.

## Logos and Hero Image

Logo assets are already imported in `src/components/Header.jsx`. Update those assets or imports when replacing logos, and preserve meaningful alt text. Import the hero image in `src/config.js` and assign it to `heroImage`; `Header.jsx` renders it automatically.

## Validation

Run `npm run build` after code or configuration changes. `npm test` runs Node regression checks. No lint script is configured. For UI changes, check the affected flow in the browser, including mobile layout and relevant offline behavior.

## Deployment

The app builds to `dist/`. The current `vite.config.js` uses `base: '/'`, with PWA `start_url` and `scope` also set to `/`. Preserve this alignment when changing hosting paths.

Both deployment workflows trigger on pushes to `main` and use Node.js 22 with `npm ci` and `npm run build`:

- `.github/workflows/deploy.yml` builds the root app and publishes `dist/` to GitHub Pages.
- `.github/workflows/deploy-df26.yml` builds `agendas/df26/` and publishes its `dist/` to `gh-pages-df26`.

Inspect the relevant workflow before changing deployment behavior.

## Branch

All development goes on `claude/inspiring-volta-u820u`. Do not push directly to `main`.

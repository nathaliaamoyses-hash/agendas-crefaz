# Dreamforce / San Francisco — content-phase handoff

Prepared September 7, 2026. This document transfers the completed application work into the next content phase. It does not authorize importing, publishing, or deploying content by itself.

## Objective for the next phase

Populate the existing companion with final content for both **At Dreamforce** (sessions, meetings, and conference social events) and **In San Francisco** (the city guide and shared plans). Work inside the existing application. Preserve its visual identity, navigation, reusable cards, and offline behavior.

**The user has an `events.js` file and a sessions Markdown file with a different structure. The next agent must read both files, understand the Markdown structure, and produce an application-compatible `events.js` from the session content in that Markdown. Do not ask the user to manually reformat the sessions into the application schema.**

The source files have not yet been supplied or identified for this conversion. The repository contains existing root and temporary-app `events.js` files, but these must not be assumed to be the user's intended new input. No sessions Markdown file was identified in the repository filename inventory. Obtain the exact paths or attachments at the start of the content phase.

## Workspace and source of truth

- Repository: `/Users/teco/Documents/Codex/agendas`.
- Current branch: `claude/inspiring-volta-u820u`.
- Extend the **root Connections application**, which is now the companion. `agendas/df26/` is the temporary Dreamforce reference application, not the implementation target.
- Many completed changes are still uncommitted, including untracked source and documentation files. Inspect the working tree before editing; preserve this work. A fresh clone of the remote alone will not contain the completed extension unless it has subsequently been committed and pushed.
- Read `AGENTS.md`, `docs/WORKPLAN.md`, and `docs/CONTENT-AUTHORING.md` before changes. `docs/content-examples.json` contains actual source examples, not final editorial content.
- Original product handoff: `/Users/teco/.codex/attachments/e98927b4-00c7-420e-92c8-f33c9931840c/pasted-text.txt`. This attachment path may need to be supplied again when moving machines.
- The user requires approval before each planned work stage. Agree on the content stages and stop at their boundaries. Commit, push, deployment, domain changes, and retirement of the temporary app require a separate decision. Ignore the old `events.js` comment telling editors to push to main.

## What has been completed

All six approved implementation phases are complete locally: foundation, Home/domain split, Today, Sunday, the SF guide, and integration/verification. A subsequent approved refinement added the early-arrival fallback.

The application uses React 18, Vite 5, Tailwind 3, local hash routing, static JS content, localStorage preferences/favorites, and vite-plugin-pwa. There is no backend, CMS, new state library, or second design system.

Home shows the trip hero, compact weather, two strong entry points, and Today. The application hierarchy is:

```text
Home
├── At Dreamforce — existing agenda/session experience
├── In San Francisco
│   ├── Sunday — Classic SF / Giants at Oracle Park / Do Both + shared dinner
│   ├── Eat & Drink
│   ├── Only in San Francisco
│   ├── Explore — routes, landmarks, neighborhoods
│   ├── Monday
│   ├── Friday
│   └── Practical SF
└── Today — references and date-matched agenda entries, not duplicate content
```

Primary URLs are `#/`, `#/dreamforce`, and `#/sf`. SF guides use `#/sf/sunday`, `/eat-drink`, `/only-in-sf`, `/explore`, `/monday`, `/friday`, and `/practical` under the same `#/sf` prefix. Sunday has `/classic`, `/giants`, and `/both` detail paths. Place, activity, and neighborhood detail paths are generated from stable IDs.

AppShell provides navigation, route focus, the connection hint, and PWA readiness/install guidance. Existing agenda filters, stars, local favorites, event dialogs, and calendar links are preserved. Event cards support keyboard opening; dialogs trap focus and restore it on closing.

Sunday has a ten-stop Classic route and six-stop Do Both route using common stop records. Giants and dinner reuse their source records across Sunday and Today. A Sunday choice saved on the device is explicitly **not an RSVP** and does not notify anyone.

The guide currently has 31 Places, 10 Activities, six Neighborhoods, seven PracticalTips, two Sunday Routes, and five SharedPlans. Most editorial details are drafts. The cards already support structured content and optional local images.

## Today and offline behavior to preserve

Trip dates are September 12–19, 2026; the venue timezone is `America/Los_Angeles`. Today uses the device clock and `Intl` locally, refreshing at SF midnight and on resume. It never depends on the weather request or a backend.

| Day | Current composition |
| --- | --- |
| Before September 13, including Saturday 12 | Default unscheduled card: **“Arrived early? Check our tips for San Francisco.”** Links to the existing SF landing page. No arrival activity is planned. |
| Sunday 13 | Sunday guide, Giants option, shared dinner |
| Monday 14 | Monday guide |
| Tuesday 15 | Date-matched Dreamforce sessions + Tuesday evening plan |
| Wednesday 16 | Date-matched Dreamforce sessions + Dreamfest |
| Thursday 17 | Date-matched Dreamforce sessions + dinner |
| Friday 18 | Friday guide |
| Saturday 19 | Ordinary empty-day fallback until departure content is configured |

Before the trip the default selection is September 12, showing the early-arrival card. The date selector still previews later days; do not let the early-arrival fallback override a deliberately selected Sunday. After the trip the final day is selected as a week review. Manual selection survives navigation; reload restores the automatic default.

Today resolves references from `src/data/content/dayPlans.js` and selects agenda entries by their actual date. June events are not relabeled as September. Unknown `00:00–00:00` catalog schedules and draft events are excluded from Today. This filtering does **not** make unknown schedules safe in the main agenda; see migration requirements below.

Core content, route instructions, and imported local images ship in the cached PWA. External maps, reservations, calendars, and weather remain supplemental online services. The optional weather card fetches NWS observations from SFO airport, labels the source and observation time, and handles cached/unavailable states. Do not replace live weather with authored values. Keep essential addresses and directions as readable local text, not only external links.

## Workstream A — Sessions / At Dreamforce

### Required inputs and source handling

1. Read the user's intended `events.js` completely, alongside the root application's schema and consumers.
2. Read the **entire** sessions `.md`; inspect headings, tables, lists, links, repeated sessions, editorial labels, and schedule notes. Adapt the extraction to this actual document, not an assumed Markdown template.
3. Treat the Markdown as the requested session-content source. Use the supplied JS to understand schema, existing IDs, and possible metadata. If the two conflict, record the conflict and resolve it with the user; do not silently let old JS overwrite newer Markdown content.
4. Record the exact input paths/versions and build a conversion ledger. For each source session, keep its heading or line reference, proposed event ID, mapped fields, unresolved facts, and disposition (included, held pending, merged duplicate, or intentionally excluded).
5. Separate session facts from editorial recommendations. Distinguish confirmed meetings, alternatives, and public sessions only when the source or user supports that distinction. Ask about material missing classifications in one consolidated review.

### Target event contract

Deliver JavaScript using the existing named export: `export const events = [ ... ]`. The integration target is **root** `src/data/events.js`. Keep field names compatible with the existing components.

| Target field | Mapping rule |
| --- | --- |
| `id` | Stable, unique event identity. Preserve a matching genuine session ID where appropriate; use new Dreamforce IDs for new sessions. Do not recycle a Connections ID for an unrelated event. |
| `eventCategory` | `suggested` for the primary/recommended session list; `also` for explicit alternatives; `oneOnOne` for confirmed 1:1 meetings; `social` for social events. Do not infer confirmed status from a vague heading. |
| `title` | Source session title, preserving meaningful wording and punctuation. |
| `date` | Verified local date, `YYYY-MM-DD`. Resolve year/day/date ambiguity; do not fabricate a day. |
| `startTime`, `endTime` | Verified SF wall-clock times, `HH:MM` in 24-hour form. Convert explicit AM/PM correctly. Derive an end only from an explicit start plus duration, documenting that derivation. Never assume a standard session length. |
| `room`, `area` | Room and building/campus context from the source; null when absent. Do not carry Chicago venues forward. |
| `type`, `topic` | Session format and topic/track when supplied; null otherwise. |
| `summary` | Source description adapted faithfully for display. Preserve substantive details. Escape raw text before using the legacy HTML rendering path; do not inject arbitrary Markdown HTML. |
| `participants` | Existing convention is 1:1 participants. Public-session speakers can be preserved in the summary when no dedicated field exists; do not silently discard them. Propose a schema change only if needed and approved. |
| `registrationRequired` | Boolean backed by source evidence or an explicitly approved default. Absence of a registration note is not proof that registration is unnecessary; track unresolved cases. |
| `transitionWarning` | Explicit travel/transition advice, or a reviewed editorial note; null otherwise. |
| `mapsUrl` | Verified HTTPS venue/access-point link when appropriate; null otherwise. |
| `url` | Source session/registration page as applicable; null when unavailable. Do not fabricate catalog URLs. |
| `spotifyUrl` | Only a supplied relevant playlist link; normally null. |

Include nullable fields explicitly. The limited-HTML legacy summary is rendered with `dangerouslySetInnerHTML`; prefer escaped text and narrowly controlled formatting/HTTPS links. New SF fields remain plain text.

Do not silently drop incomplete sessions. Preserve them in the conversion ledger and a clearly separated pending-content artifact. The main agenda currently sorts `startTime` as a string and builds calendar URLs from both times. Simply inserting null times, setting `status: 'draft'`, or using midnight placeholders does not safely support unscheduled entries there. If incomplete sessions must appear in the app, propose the smallest explicit unscheduled-session treatment for approval before integration.

### Migration work that must accompany the content

The At Dreamforce page **still displays the 19 June Connections events and Connections branding**. The new shell is Dreamforce/SF, but final agenda migration has not happened.

The calendar conversion in `src/components/EventDetail.jsx` explicitly adds five hours for June Chicago events. **Replacing `events.js` alone is insufficient.** Migrate calendar generation to the confirmed SF event timezone and test Google/Outlook output independently of the device timezone. Handle an event ending on another date if the source contains one; the current schema/conversion assumes a same-date end. Do not silently create an inverted calendar interval.

Review `src/config.js`, the agenda hero/alt text, event-schema comments, and user-facing conference copy during this migration. Preserve verified contacts unless the user supplies changes. Update stale Chicago/Connections assumptions deliberately, without modifying the temporary app.

Favorites use `cnx-favorites`. Avoid ID collisions that could star unrelated new sessions. Do not clear user storage silently; discuss a key migration only if necessary. Existing tests encode June dates and counts; preserve their behavioral coverage with suitable fixtures and add assertions for the imported content instead of deleting tests to make the build green.

Ensure Today consumes the same new event records. Check conference evenings for accidental duplication between agenda social events and SharedPlans: choose an explicit source/reference arrangement if the same event appears in both. The current de-duplication recognizes typed IDs, not two separately authored records describing the same real-world event.

### Sessions deliverables

- Reviewable converted `events.js`, ready for the root application once blockers are resolved.
- Mapping ledger with every source session accounted for; input count, output count, duplicates, exclusions, and pending items.
- A short list of unresolved date/time/category/registration conflicts.
- Approved timezone/branding/schema compatibility changes needed for integration, with verification results.

## Workstream B — In San Francisco guide

Use **CONTENT-AUTHORING.md** and **content-examples.json** as the detailed field contracts. They are supplied alongside this handoff. Author by stable record ID so one edit updates route stops, cards, details, neighborhoods, and Today. Do not create independent copies of the same restaurant or shared dinner for each page.

| Content area | Primary sources | Content still needed |
| --- | --- | --- |
| Restaurants, bars, shops, landmarks | `src/data/content/places.js` | Final descriptions, why go, what to order/look for, best for, neighborhood, where it fits, verified addresses/branches, hours, useful prices, official/reservation links, photos and alt text |
| Sunday Classic / Do Both | `src/data/content/sundayRoutes.js` | Route sequence review, stop guidance/durations, cable-car boarding and transfers, exact bridge viewpoint, optional stops, total duration, departure/arrival targets, verified full route map |
| Giants | `src/data/content/activities.js` + related Place/SharedPlans | Confirmed game/date/opponent/start, tickets, meetup, transport, entry guidance, food/views, relationship to dinner |
| Monday and Friday outings | `src/data/content/activities.js` | Final recommendations, optionality, duration, transport, detailed information blocks, booking links and confirmed event availability |
| Shared dinners, meetup, conference evenings | `src/data/content/sharedPlans.js` | Venue references, dates/times, meeting points, instructions and confirmed arrangements |
| Neighborhoods | `src/data/content/neighborhoods.js` | Concise context, why visit, and useful existing related IDs |
| Practical SF | `src/data/content/practicalTips.js` | Useful offline guidance for layers, walking/transit, ferries, airport travel and maps; official links supplement local text |
| Guide framing and composition | `src/data/guide.js`, `sfGuides.js`, `sunday.js` | Final page summaries/headings, section order and source references, only where content review requires changes |

Specific unresolved picks include Lori’s Diner, Super Duper and Boudin branches; final cocktail/view bars; route access points; Giants arrangements; dinner venues; and Friday event availability. Flower Piano and Fort Mason Night Market remain unconfirmed possibilities, not verified September 18 events.

Write concise, scannable English matching the current interface unless the user requests another language. Aim for useful host-curated advice and specific reasons to visit, without generic travel copy or unsupported superlatives. Separate optional ideas from group commitments. Use only fields relevant to the entity; null means unknown or unused, and arrays remain arrays.

Use authoritative current sources for changing facts such as hours, prices, transit, events and venue policies. Record source URL and verification date in an editorial ledger rather than inventing unsupported runtime schema fields. Private bookings, group plans, preferences and meeting points require host confirmation; public research cannot establish those facts.

Keep `status: 'draft'` while substantive facts/arrangements remain unresolved; mark `ready` after review. Activity/SharedPlan confirmed schedules appear only for ready records. Do not mark every record ready just because a paragraph has been written. Supply usable, authorized local image files with alt text; integration must import them through Vite for offline caching.

### Guide deliverables

- Reviewed replacement content keyed to the existing IDs and field names, then integrated into the existing source files after approval.
- Source/verification ledger and unresolved host decisions.
- Local images with a record-to-image mapping and alt text.
- Updated guide references/DayPlans only where necessary, preserving shared identity and the early-arrival behavior.

## Suggested approval stages

1. **Intake and mapping:** read both session inputs, inventory SF content, produce the mapping/issue ledger and agree on batches. Do not replace runtime content yet.
2. **Sessions conversion:** prepare the complete proposed `events.js` and pending-session list for review.
3. **Agenda integration:** after approval, install the converted data with the necessary SF calendar/branding compatibility changes and verify the agenda/Today.
4. **SF content batches:** agree on each batch before starting, for example Sunday/shared plans, dining/shops, then Monday/Friday/neighborhoods/practical guidance. Research/write, review, and integrate using existing schemas.
5. **Final content verification:** review the complete experience, remaining drafts, assets, references, date behavior and offline build. Release remains a separate decision.

These are proposed stages, not approval already granted. The current user request is to prepare this handoff; no session conversion or final guide-writing pass was performed in this turn.

## Verification and completion criteria

Last completed baseline: 32 Node tests passed; production build passed with Vite 5.4.21 and 12 precache entries (742.23 KiB after the early-arrival adjustment). No lint command exists. Prior browser checks covered 55 reachable pages at 320px, navigation, modal keyboard behavior, favorites and Today. Cached Home, SF pages and the original agenda reloaded with the preview server stopped. Device-wide airplane mode was not simulated; weather failure/cache cases were tested automatically.

After content integration:

- Account for every Markdown session and validate unique IDs, categories, real dates/times, links and required/null fields. Review simultaneous sessions as possible alternatives rather than automatically treating them as errors or duplicates.
- Verify title/description fidelity, filter counts, favorites, event details, registration warnings, and Google/Outlook calendar dates/times in SF and on a differently configured device timezone.
- Confirm Today shows actual September sessions, the intended evening plans without accidental duplication, the pre-Sunday early-arrival card, and the preserved date selector/fallback behavior.
- Resolve all content references and verify shared routes/places/plans update consistently. Inspect mobile cards with real prose and images, not just short placeholders.
- Regenerate examples with `node scripts/export-content-examples.mjs`; keep the authoring guide aligned with any approved schema change.
- Run `npm test`, `npm run build`, and `git diff --check`; run lint only if a lint command has since been added. Keep meaningful regression coverage when retiring June-specific fixtures.
- Verify the new build and images are precached and that cached core content remains usable without the origin. Identify any remaining draft or unverified data explicitly.
- Report the final content counts, changed files, pending decisions, tests and browser checks. Do not claim release readiness while unresolved schedules or draft arrangements remain.

The local production preview runs at `http://127.0.0.1:4173/#/`. It was restarted by the user and running at the end of the previous implementation task; verify its current state. It serves `dist/`, so rebuild after changes. The task sandbox may prevent starting the port; if so the user can run `cd /Users/teco/Documents/Codex/agendas && npm run preview -- --host 127.0.0.1 --port 4173`. A cached old page can remain visible; verify that the browser has loaded the new build.

## Starter instruction for the next task

> Continue the existing Dreamforce / San Francisco companion in `/Users/teco/Documents/Codex/agendas`. Read this handoff and the repository instructions first. We are entering the content phase, with two streams: Sessions for At Dreamforce, and the In San Francisco guide. I will provide the intended `events.js` and the sessions Markdown. Read both completely; convert the Markdown content into the root application's event schema and produce a complete reviewable `events.js`, accounting for every session and flagging unknowns instead of inventing them. Treat the calendar timezone and remaining Connections branding as explicit migration work. Use the existing shared content schemas for SF. First confirm the input files and present the mapping, unresolved decisions, and proposed content stages. Ask for approval before each stage; do not deploy or rebuild the application from scratch.

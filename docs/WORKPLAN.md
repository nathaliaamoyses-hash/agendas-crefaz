# Dreamforce / San Francisco companion — agreed workplan

## Approval gates

The user requires explicit approval before each phase. Phases 1–6 are complete. Final editorial content, agenda migration, and release remain separate.
After completing an approved phase, report its results and stop. Do not begin the
next phase until the user approves it. The product brief's general instructions
to implement do not override these gates. Deployment is a separate decision.

## Foundation and product boundary

Extend the root Connections React/Vite PWA into the final Dreamforce companion.
Preserve its agenda behavior. `agendas/df26/` is a temporary content reference,
not the app to extend. Do not create a separate application or a general
multi-agenda platform. The product handoff defines the content and experience;
this workplan records the agreed implementation boundaries.

## Six accepted adjustments

1. Use the root Connections implementation. Adapt its branding, content, and
   calendar timezone deliberately; do not relabel existing June events as September.
2. Core pages, Today, route instructions, plans, and essential images must work
   locally after the first successful online load and completed PWA caching.
   Today uses `America/Los_Angeles`, refreshes on resume/date change, and never
   depends on a network request. Weather/maps degrade gracefully.
3. Define minimal trip configuration and content references before wiring Home
   and Today. Home remains the first visual milestone.
4. Run existing lint/tests where present. Originally neither was configured.
   Add focused regression checks, production-build verification, and browser checks.
5. Clearly distinguish drafts, unknown schedules, and tentative arrangements.
   The temporary Dreamforce catalog's midnight times are not real schedules.
6. Finish and verify locally first. Deployment, domain changes, and retirement
   of the temporary app require a separate release decision.

## Phases

| Phase | Scope | Approval |
| --- | --- | --- |
| 1 — Foundation | Confirm baseline; hash routes; shared shell; trip configuration; minimal content schemas; preserve agenda behavior | Complete; verified |
| 2 — Home and domains | Home hierarchy, At Dreamforce/SF entry points, SF landing, compact weather presentation | Complete; verified |
| 3 — Today | Reference-based day plans, SF current date, date selector, outside-trip fallback, refresh on resume/midnight | Complete; verified |
| 4 — Sunday | Three choices, common dinner, Classic/Do Both routes, Giants; reuse places and route stops | Complete; verified |
| 5 — SF guide | Eat & Drink, Only in SF, Explore/neighborhoods, Monday, Friday, Practical SF, cross-links | Complete; verified |
| 6 — Integration and verification | Weather/maps fallbacks, PWA caching, accessibility, responsive refinement, regression/build/browser verification | Complete; verified |

Mobile behavior, accessibility, and offline support apply throughout. Phase 6
provides complete integration verification rather than the first check of them.

## Phase 1 architecture

- `src/App.jsx` owns routing plus agenda filter/favorites state.
- `src/pages/AgendaPage.jsx` contains the existing agenda orchestration, with
  the original components, events, external links, and calendar conversion intact.
- `src/routing/routes.js` defines `#/`, `#/dreamforce`, and `#/sf`. Unknown
  fragments get a recoverable not-found view. Static hosting needs no rewrites.
- `src/components/AppShell.jsx` supplies navigation, page titles, one main
  landmark, skip navigation, route-change focus, and scroll-to-top behavior.
- `src/pages/FoundationPage.jsx` is an explicit route scaffold, not the final
  Home or SF landing design. Those belong to Phase 2.
- `src/data/trip.js` holds September 12–19 trip metadata and new shell copy.
  It does not alter the Connections schedule or calendar conversion.
- `src/data/content/schema.js` describes local content using JSDoc. Places can
  be reused by routes, guides, and shared plans; route stops hold only contextual
  duration/guidance. Day plans reference entities and do not duplicate their copy.
- `src/data/content/index.js` starts with empty collections. No unverified venues,
  schedules, or editorial copy are presented as confirmed content.
- `src/utils/content.js` resolves typed IDs to their original records.
- `dateInTimeZone()` in `src/utils/date.js` computes a venue day locally using
  `Intl`, as groundwork for Phase 3. It is not Today aggregation yet.
- `src/utils/agenda.js` holds the existing filter/group functions for direct
  regression testing. `npm test` uses Node's built-in runner; no new dependency.

## Deliberately preserved until subsequent approved integration

Connections branding, its June 2–4 events, calendar's Chicago offset, favorites
key `cnx-favorites`, the PWA manifest identity, domains, and deployment workflows
remain unchanged in Phase 1. The At Dreamforce route temporarily displays that
reference agenda. Final Dreamforce data and branding must be migrated deliberately;
never infer real session times from the temporary catalog.

Both apps' deployment workflows still publish on `main`. Do not publish this
scaffold as a completed companion. Resolve the final domain and legacy CNAME
conflicts before release.

## Content and service rules

- New editorial content is structured plain text with `draft`/`ready` status.
  Unknown optional values are null. Legacy event summaries retain their existing
  behavior until a deliberate migration; external HTML would require sanitization.
- RSVP is at most a device-local preference unless a shared collection service
  is separately selected. A local preference does not notify the host.
- Weather is optional external information, with unavailable/cached timestamps.
- Route instructions, addresses, and meeting guidance stay available offline;
  maps and external directions supplement them.
- Venue hours, transportation schedules, game details, and policies require
  editorial verification before publication. Missing details are not invented.
- No new CMS, backend, state library, or parallel design system is planned.

## Verification record

Phase 1 currently has seven passing Node regression checks covering agenda
filters, chronological grouping, hash route resolution, SF midnight and winter
offset behavior, device-independent date labels, and content references.
The locked dependencies are installed. The production build passes with Vite
5.4.21 and generates an 11-entry PWA precache (525.08 KiB). A forced npm audit
upgrade was reverted to the original lockfile after it introduced an incompatible
Vite 8 / React-plugin pairing; Phase 1 source edits were retained.
The user started the production preview on 127.0.0.1:4173. Browser verification
passed for Home/SF/agenda navigation and browser Back, retained filters, all
category counts, favorite persistence across tab reopening, empty favorites,
event details, calendar URL times, body scroll locking/cleanup, and keyboard
skip navigation. At 390px the document width is 390px and all images load.
No warning/error console entries were captured. The test favorite was removed.
With the preview server stopped by the user, reloads of Home, At Dreamforce,
and SF all succeeded from cache. All 19 agenda cards and all three images
loaded; filters, event details, and favorites persisted through reloads. The test
favorite was removed afterward. This verifies cached operation without the
origin server; it does not simulate OS offline events or test live-service
fallbacks (those remain part of Phase 6 integration). Phase 1 is complete.
Phase 2 was subsequently authorized and completed; see its record below.


## Phase 2 implementation and verification

Home now presents the trip hero, compact weather status, two destination cards,
and a clearly empty Today section. `HomePage` and `SanFranciscoPage` replace the
Phase 1 scaffolds; `FoundationPage` is now only the unknown-route fallback.
`DestinationCard`, `GuideCard`, and `WeatherSummary` extend the existing styles.
Landing copy and section definitions live in `src/data/guide.js`.

The SF landing highlights Sunday, then Eat & Drink, Only in SF, Explore, Monday,
Friday, and Practical SF. Seven child routes render explicit guide placeholders.
Their navigation keeps In San Francisco active and provides a return link.
These are navigation destinations, not implementations of Phase 4/5 content.

The existing Dreamforce reference app supplied a waterfront JPEG, copied into
root assets without modifying the reference app. The image is displayed as a
waterfront crop using CSS. Vite's precache glob now includes jpg/jpeg/webp; the
built service worker was checked for the hashed waterfront image explicitly.

Weather currently renders an unavailable state with no invented temperature.
The presentation accepts a timestamped reading for later live/cached integration.
Today is an empty display slot; no day aggregation or date switching was added.
The original Connections data, components, calendar logic, and saved-item key
remain intact inside At Dreamforce. No dependencies or deployments were changed.

Verification:
- Eight Node regression tests passed, including destination/reference routing.
- Production build passed: 12 precache entries, approximately 665.67 KiB.
- Browser checked Home/SF navigation, all seven guide destinations, return links,
  active parent navigation, and keyboard skip navigation.
- Existing agenda still displays all 19 events and the 1:1 filter returns two.
- No horizontal page overflow at 320px, 375px, 390px, or 1280px; desktop content
  is bounded to 1024px. At 375x667, Today begins around y=640; at 320x740, y=697.
- Waterfront image loaded; no browser warnings/errors were captured.
- Prior Phase 1 server-unavailable reload checks remain documented above. Phase 2
  checked generated precache coverage for the new image; no claim of simulated
  OS network-offline events or live-weather behavior is made.

The preview remains available on 127.0.0.1:4173. Phase 3 was subsequently approved.


## Phase 3 implementation and verification

`TodaySection` replaces Home's empty slot. It composes the selected trip day from
`src/data/content/dayPlans.js` references, existing SF guide summaries, shared
plans/activities, and exact-date matches in the original agenda source.
`src/utils/today.js` performs composition without copying editorial content.
Guide references extend the content contract using the existing guide record
shape. `src/data/today.js` owns presentation copy. No new routes or dependencies.

The configured mapping is:
- September 12/19: empty until arrival/departure references are configured, with
  a useful link to the SF guide.
- September 13: Sunday guide, draft Giants option, draft shared dinner.
- September 14/18: original Monday/Friday guide records.
- September 15–17: matching scheduled agenda records plus draft Tuesday evening,
  Dreamfest, and Thursday dinner respectively.

All new activity/shared-plan details are marked draft with null schedules. No
venues, times, tickets, or reservations are presented as confirmed. The current
June agenda cannot appear as September sessions, and unknown 00:00–00:00 catalog
entries are excluded. Conference days show a clear pending-agenda message until
actual dated records exist. New Sunday and SF detail pages remain Phase 4/5 work.

`useVenueDate` and the testable `startDateClock` use the local device clock with
`America/Los_Angeles`, a minute-aligned refresh, and focus/pageshow/visibility
listeners. An active page rolls at SF midnight; a suspended page refreshes on
resume. Neither dates nor composition use a network request. Day selection is
held in App like the existing agenda filter, survives navigation, and remains
fixed until changed; Back to today restores automatic selection during the trip.
A full reload restores the automatic default. Before the trip the first day is
shown as Trip preview; afterward the last day is shown as Your week in review.

Verification:
- All 14 Node tests pass. New coverage includes eight-day selection, before/after
  fallbacks, identity-based references, draft schedules, exact-date aggregation,
  duplicate/missing references, optional arrival/notices, SF midnight, winter
  offset, tab resume, clock changes, and timer/listener cleanup.
- Production build passes: 12 PWA precache entries, approximately 674.59 KiB.
  Generated service worker includes the new JS/CSS bundles containing Today and
  all local day data. This phase introduced no runtime data requests.
- Browser verified all eight selector choices, Sunday guide navigation and Back
  with retained selection, 19 original agenda events, and the two-item 1:1 filter.
- No horizontal overflow at 320px, 375px, or 1280px. Date control is 44px tall.
  At 375x667 the section heading still starts around y=640. Desktop content is
  bounded to 1024px; single cards fill the available content width.
- No browser warnings/errors captured. No lint script exists; git diff --check
  passes. No dependency, legacy event data, calendar, deployment, or domain changes.
- Date/resume checks use an injected local clock without network access. New
  precache coverage was inspected; the server-unavailable browser reload test
  from Phase 1 was not repeated and OS offline mode was not simulated here.

Phase 3 is complete. The preview is left on Sunday's trip preview. Phase 4 needs
explicit approval before implementing the Sunday choices, routes, or dinner page.


## Phase 4 implementation and verification

Sunday now has a three-choice landing page at `#/sf/sunday`, and detail routes
`#/sf/sunday/classic`, `#/sf/sunday/giants`, and `#/sf/sunday/both`. Child pages
retain In San Francisco navigation and link back to Sunday. The existing shell,
hash router, companion palette, and Today composition are reused.

`Route` and `RouteStop` render a ten-stop Classic route and six-stop Do Both
route, sharing the exact same common stop records. Eleven Place records supply
copy and optional image/venue metadata. Optional waterfront/extra-time stops
remain distinguishable from required route stops. Nearby food expands into
reused PlaceCards. Do Both has a prominent departure/arrival callout and a link
to the Giants plan. The route outline is local text; external map links supplement
it. Full route maps remain null until the route/transport details are verified.

`ActivityView` presents the Giants venue, schedule/arrival pending states, meetup,
and structured transport/entry/weather/food/view blocks. `SharedPlanCard` renders
the same Sunday dinner record on the landing and detail views, also consumed by
Today. Today now links to Giants and Sunday for the corresponding source plans.
New sources are split into places.js, sundayRoutes.js, activities.js, sharedPlans.js;
the index reexports them so existing Today imports remain valid.

No opponent, game start, meeting point, departure target, dinner time, or venue
has been newly confirmed. The product brief's route sequence and approximate
4–5 hour Classic estimate are explicitly drafts. Descriptions are concise
placeholders. Optional images are supported with local asset references but no
unverified or external photos were added. Maps use name-based HTTPS destinations;
the unchosen cable-car boarding point and bridge viewpoint have no invented pin.

`SundayPreference` offers Classic, Giants, Both, and Dinner only. It saves to
`dreamforce-sf-2026:sunday-preference`, separate from agenda favorites, with a
clear on-device/not-an-RSVP explanation. Storage failure keeps the current visit
usable and produces an honest message. Clearing removes the stored preference.

The user additionally requested content schemas for every card. Added
`docs/CONTENT-AUTHORING.md` with required/nullable fields, field purposes, source
locations, photo/link/time conventions, and the remaining editorial inputs.
`docs/content-examples.json` provides copyable current examples. Phase 5 types
are explicitly provisional. User-facing copies are in this task's outputs folder.
Keep these documents current as subsequent approved phases add card fields.

Verification:
- 20 Node tests pass: existing agenda/Today checks plus Sunday routes and content
  resolution, shared stop identity, optional extensions, shared dinner/activity
  identity, map-link structure, and local preference behavior/storage failure.
  The authoring examples were also checked against the current source records.
- Production build passes: 12 PWA precache entries, approximately 702.60 KiB.
  New pages and local content are included in the main JS bundle; no new runtime
  data fetches or dependencies were introduced.
- Browser checks: all three choices; ten/six route stops; nearby-food and optional
  extension disclosures; Do Both → Giants; shared meetup/dinner pending states;
  Today → Giants; local preference persistence through reload and clearing.
- At 320/375px, checked pages have no horizontal overflow and route Directions
  actions are at least 44px tall. At 1280px the three choice cards align in a row.
- Original agenda still shows 19 events; the 1:1 filter returns two. Filter reset
  afterward; test Sunday preference was cleared. No browser warnings/errors.
- No lint script exists. git diff --check passes. PWA precache coverage remains
  in the generated build; OS offline simulation/server-stop checks were not
  repeated this phase. Full external-service integration remains Phase 6.

Phase 4 is complete. The browser is left on Sunday. No commits, push, deployment,
or Phase 5 content implementation was performed. Ask for Phase 5 approval next.


## Phase 5 implementation and verification

The six remaining SF guide routes now render native content pages:
`#/sf/eat-drink`, `#/sf/only-in-sf`, `#/sf/explore`, `#/sf/monday`,
`#/sf/friday`, and `#/sf/practical`. `SfGuidePage` replaces the retired guide
placeholder. `src/data/sfGuides.js` defines page framing and ordered sections of
references. Section-jump buttons move focus/scroll without changing the hash.

Eat & Drink uses institutions, quick/local, if-you-have-time, and drinks groups.
Only in SF includes all five shops from the brief. Explore links to the existing
Sunday routes, four landmark cards, and six neighborhoods. Monday has four
optional outings; Friday has five possibilities. Practical SF provides local
short guidance, expandable details, and supplemental official service links.

The content registry now has 31 shared Places, 10 Activities (including Giants),
six Neighborhoods, and seven PracticalTips. New fields include Place.whereItFits;
Activity.durationLabel, whyGo, optional, neighborhoodId, and directionsUrl;
Neighborhood.whyGo; PracticalTip.externalLabel, infoBlocks, and related.
All new optional values remain null where unconfirmed. Names/shortlists and
suggested day structure come from the product brief; no final editorial research
pass, photos, restaurant reservations, branch selections, or event schedules
have been invented. Cocktail/view-bar picks and unchosen chain branches have no
fabricated pins. Flower Piano and Fort Mason remain unconfirmed Friday options.

`PlaceCard`, `ActivityView`, `Route`, shared primitives, and Today are reused.
New `ActivityCard`, `PracticalTipCard`, `ReferenceCard`, and `RelatedContent`
provide presentation without copying entity text. `ContentDetailPage` renders
place/activity/neighborhood records; routes are generated from stable source IDs.
Sunday keeps its existing dedicated URLs. Places link to neighborhoods, which
link to related source entries. Guide return links are derived from composition;
duplicate guide references are suppressed. Buena Vista and Napa wine-shop
appearances reuse the same Place records across contexts.

Practical links were checked against official SFMTA, Golden Gate Ferry, SFO,
SFPD, and National Weather Service sources on September 7. Live fares, times,
forecasts, and pickup locations are not embedded. Details/source links are in
CONTENT-AUTHORING.md. External links are supplemental; all core new records
ship inside the cached application bundle.

The authoring reference and JSON examples now cover implemented Phase 5 shapes,
including shops, outings, neighborhoods, practical tips, reference cards, and
page-section composition. `node scripts/export-content-examples.mjs` refreshes
examples from source. User-facing copies in the task outputs folder are updated.

Verification:
- All 26 Node tests pass, including guide/reference resolution, unique detail
  paths, shared place identity, neighborhood connections, optional/draft outing
  behavior, unknown map locations, practical links, and prior Sunday/Today/agenda
  regression checks. The examples match the current sources.
- Production build passes with 12 PWA precache entries, approximately 735.80 KiB.
  No new dependency, backend, runtime content fetch, manifest change, or deployment.
- Browser checked dining groups and section focus/hash behavior; dining → North
  Beach → City Lights → Only in SF; Monday → Sausalito; Friday → Flower Piano;
  Explore routes/landmarks/neighborhoods; Practical SF disclosures/service links.
- All six guides have no horizontal overflow at 320px. Additional 375px mobile
  and 1280px desktop checks passed; detail pages retain one H1 and SF navigation.
- Today → Monday displays four activity cards. Original agenda still shows 19
  events and the two-item 1:1 filter. The filter was reset after verification.
- No lint command is configured. git diff --check passes. Browser console checked.
  New source content is precached; the earlier origin-unavailable reload test was
  not repeated here and OS offline/service integration remains Phase 6.

Phase 5 is complete. Phase 6 requires explicit approval. Final editorial content,
photos, confirmed schedules, live weather/fallback integration, and release
preparation remain outstanding. No commit, push, or deployment was performed.


## Phase 6 implementation and verification

Integration is complete within the approved scope. Home now fetches optional NWS
KSFO observations with explicit airport attribution and San Francisco observation
time. Weather validation, eight-second timeout, cancellation, safe local storage,
90-minute freshness labeling, and 24-hour expiration are separate from core content.
Today and all local guides still require no network request. SF external actions
remain available with connection guidance; no map SDK or backend was introduced.

AppShell provides the shared device-connectivity banner. PwaStatus reports service
worker readiness and offers the existing dismissible installation tip on all pages.
The manifest and HTML metadata now use the companion identity. Root hosting paths,
icons, deployment workflows, and the temporary reference app remain unchanged.

Agenda cards are keyboard-operable buttons with independent pressed-state favorite
controls. The event dialog traps focus, closes with Escape, makes background content
inert, restores the opener, and fits small screens. Filters expose pressed state;
page/group headings and status feedback have improved semantics. Existing agenda
records, filters, favorites storage, external destinations, and Chicago calendar
conversion are preserved. They are not final Dreamforce data.

Verification:
- All 32 Node tests pass, including six weather tests for invalid observations,
  cache freshness/expiration, corrupt or denied storage, HTTP/network failures,
  timeout including a hanging response body, and cancellation. Prior agenda,
  Today/date/resume, Sunday, references, and preference regressions pass.
- Production build passes with Vite 5.4.21: 12 precache entries, 742.10 KiB.
  No lint command is configured; git diff --check passes. No dependency changes.
- Live weather was observed in the production preview with source and timestamp.
- Browser audit followed 55 reachable internal pages at 320px: each has one H1,
  no horizontal overflow, and no detected broken loaded images. Home also checked
  at 375x667, with Today beginning around y=662 after the timestamped weather card.
- Keyboard Enter opens an event; Shift+Tab/Tab wrap within the dialog; Escape
  restores focus and clears inert/scroll lock. Favorite toggling stays independent
  of opening details; the test favorite was removed. The 1:1 filter returns two;
  All returns 19. Original June 2 calendar links still convert 09:00 to 14:00 UTC.
- The user stopped the preview; lsof confirmed no listener on port 4173. Home,
  Classic/Do Both, Practical SF, numerous place/activity/neighborhood details, and
  the original agenda reloaded from cache. All three agenda images loaded. Today
  composed Sunday's guide, Giants, and shared dinner while the origin was absent.
  Agenda details opened from cache and fit the 320x740 viewport. Browser error/warn
  log was empty. This tests origin unavailability, not OS airplane mode; actual
  weather failures/cache expiry were exercised by automated tests.
- Updated CONTENT-AUTHORING.md documents weather and service copy alongside every
  implemented content-card contract. Source examples remain generated from records.

All six implementation phases are complete. Remaining work is final editorial
copy/photos, verified venue and route logistics, confirmed schedules/arrangements,
and deliberate migration of Connections records/branding/calendar timezone to the
final Dreamforce agenda. Hosting/domain/release decisions are still pending. No
commit, push, deployment, or retirement of the temporary app was performed.


## Approved refinement — early-arrival fallback

The user approved replacing Saturday September 12’s empty message with
“Arrived early? Check our tips for San Francisco.” It links to the existing SF
landing page. The pre-trip automatic selection also uses this card. Sunday
September 13 and later day plans, manual previews, and the departure fallback
keep their existing behavior. Copy, destination, and cutoff live in
`earlyArrivalCard` in `src/data/today.js`; no activity or duplicated guide content
was added. The card is local and included in the PWA bundle.

Verification: all 32 existing tests, production build, and diff whitespace checks
pass. Browser confirmed the pre-trip/Saturday card links to In San Francisco,
Sunday still shows its guide/Giants/dinner, and September 19 retains its ordinary
empty state. No browser warnings/errors were captured. The updated build has
12 precache entries (742.23 KiB). Preview is running and left on September 12.

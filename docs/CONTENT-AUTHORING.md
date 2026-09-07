# Dreamforce / San Francisco — content authoring reference

Version: Phase 6, September 7, 2026. This reference covers the implemented companion cards, shared records, and weather presentation. Editorial content remains draft. All six implementation phases are complete; final Dreamforce agenda migration and release require separate work.

## How to use this guide

You can supply content as JSON using `content-examples.json`, or as a document grouped by the same record IDs and field names. You do not need to edit React components. The examples contain current drafts, not verified travel advice or confirmed arrangements.

Keep an existing record's `id` unchanged when replacing its copy. One place record supplies every appearance of that place: route stops, nearby food cards, and future guide cards. One shared-plan record supplies dinner on Sunday, route pages, Giants, and Today. Do not write independent versions for each appearance.

Use `null` for an unknown or unused optional value and `[]` for an empty collection. Do not use "TBD", an empty URL, or `00:00` as a substitute for an unknown time. Components hide optional facts or display a deliberate pending state for essential timing/location fields.

All new text is plain text. Do not send HTML or Markdown expecting rich formatting inside cards. External links must use `https://`. Photos should be supplied as local files plus alt text; integration uses a Vite asset import so the image can be cached for offline use. A remote image URL alone is not sufficient for the offline requirement.

`status: "draft"` displays a pending label. Use `"ready"` only after the content and arrangements have been reviewed. For activities and shared plans, confirmed schedule times are shown only when the record is ready. A route's times are suggestions and can appear with a draft label; they are not bookings.

## Where content lives

Paths are relative to the root repository, `/Users/teco/Documents/Codex/agendas`.

| Source file | What you author |
| --- | --- |
| `src/data/services.js` | Weather service configuration, cached/offline labels, installation guidance |
| `src/data/trip.js` | Trip identity, dates, timezone, navigation, PWA name/description |
| `src/data/guide.js` | Home destination cards and SF guide summaries |
| `src/data/sunday.js` | Sunday choice links, CTA labels, page headings, and interface labels |
| `src/data/content/places.js` | Place, restaurant, bar, shop, and landmark records |
| `src/data/content/sundayRoutes.js` | Shared Sunday stops, route order, route-specific timing and guidance |
| `src/data/content/activities.js` | Giants and activity details |
| `src/data/content/sharedPlans.js` | Dinner, meetups, and shared evening plans |
| `src/data/content/dayPlans.js` | Date-to-content references used by Today |
| `src/data/sfGuides.js` | Six SF guide pages: section headings, order, and references |
| `src/data/content/neighborhoods.js` | Shared neighborhood context and related entries |
| `src/data/content/practicalTips.js` | Practical guidance, expandable details, and official links |
| `src/data/content/index.js` | Source registry; notices remain an empty collection |
| `src/data/content/schema.js` | Technical JSDoc contract |
| `src/data/events.js` | Preserved agenda records; final Dreamforce migration is separate |

## Common entity fields

These fields apply to Place, Route, Activity, SharedPlan, Neighborhood, PracticalTip, and Notice. Landing cards retain their original smaller shape.

| Field | Required value? | Shape and purpose |
| --- | --- | --- |
| `id` | Yes | Unique stable ID within an entity kind; e.g. `buena-vista`. Do not change when revising copy. |
| `slug` | Yes | Stable readable identifier, usually identical to ID. It does not automatically create a page. |
| `name` | Yes | Display title. Aim for 2–7 words. |
| `status` | Yes | `draft` or `ready`. |
| `shortDescription` | Nullable | One or two concise sentences, generally 15–40 words. Shared by cards and detail views. |
| `image` | Nullable | `{ "src": "<local asset reference>", "alt": "<description of the photo>" }`. Omit decorative wording such as “image of.” |

Length suggestions are editorial guidance, not enforced limits. Optional fields stay in the record with a null value. Collections stay present as arrays.

## 1. Home destination card

Source: `destinations` in `src/data/guide.js`. Used by `DestinationCard`.

| Field | Required? | Use |
| --- | --- | --- |
| `id`, `path` | Yes | Keep existing domain identity and route. |
| `title` | Yes | At Dreamforce / In San Francisco. |
| `description` | Yes | Short list or sentence describing this domain. |
| `action` | Yes | CTA text, ideally 2–4 words. |
| `tone` | Yes | `conference` or `city`; keep the current domain distinction. |
| `label` | Yes | Small overline, such as conference dates. |

Filled example:

```json
{"id":"sanFrancisco","path":"/sf","title":"In San Francisco","description":"Explore · Food · Local institutions · Free-time ideas","action":"Explore San Francisco","tone":"city","label":"BEYOND THE CONFERENCE"}
```

## 2. SF guide summary card

Source: `sfSections` in `src/data/guide.js`. Used by `GuideCard` and Today.

Required: `id`, `path`, `title`, `description`, `status`, `group`, `number`.
Optional: `dateLabel` (omit for undated cards, preserving this existing schema).
`group` is one of `featured`, `guide`, `freeTime`, `practical`. `number` is a display string such as `"05"`.

```json
{"id":"monday","path":"/sf/monday","title":"Monday ideas","description":"If you have some free time before Dreamforce.","status":"draft","group":"freeTime","number":"05","dateLabel":"SEPTEMBER 14"}
```

## 3. Sunday decision card

Source: `sunday.choices` in `src/data/sunday.js`. This card points to a Route or Activity. Its name, description, image, status, and best-for text come from that entity; do not repeat them here.

Required: `id`, `number`, `path`, `content`, `action`, `tone`.
`content` is `{ "kind": "route" | "activity", "id": "existing-record-id" }`.
`tone` is `city` or `conference`.

```json
{"id":"both","number":"03","path":"/sf/sunday/both","content":{"kind":"route","id":"sunday-both"},"action":"See the shorter route","tone":"city"}
```

The preference selector also derives the option names from these entities. Its selection is local to the device, not an RSVP and not shared with a host.

## 4. Place / venue / shop card

Source: `places.js`. Used by `PlaceCard`, route stops, nearby-food disclosure, meeting and dinner venues.

Include all common fields, plus:

| Field | Required value? | Use |
| --- | --- | --- |
| `category` | Yes | `restaurant`, `bar`, `shop`, `landmark`, or `meetingPoint`. |
| `neighborhoodId` | Nullable | ID of a neighborhood record; its name is displayed when resolved. |
| `address` | Nullable | Verified address or exact access point, saved as readable offline text. |
| `directionsUrl` | Nullable | HTTPS map/directions URL for the specific place. Unknown access points should remain null. |
| `externalUrl` | Nullable | Official venue website. |
| `reservationUrl` | Nullable | Reservation page. Do not use for unrelated links. |
| `hours` | Nullable | Concise, verified opening hours, including relevant day exceptions. |
| `priceIndication` | Nullable | Brief editorial price guide, if relevant. |
| `whyGo` | Nullable | One sentence explaining the recommendation. |
| `whatToOrder` | Nullable | Restaurant/bar suggestion. |
| `whatToLookFor` | Nullable | Shop/cultural venue suggestion. |
| `bestFor` | Nullable | Audience or situation, e.g. a short break or small-group meal. |
| `whereItFits` | Nullable | When to fit this place into the day, or which outing to pair it with. |

Use only relevant facts. A landmark generally does not need order, reservation, or price fields. A shop generally uses `whatToLookFor`, not `whatToOrder`.

Place and neighborhood links open local detail pages generated from their IDs. The same Place record appears in dining, shops, routes, and activity venues. `whyGo` can explain what makes a shop distinctive; `whatToLookFor` covers the specific items to seek.

The JSON companion includes the complete current Buena Vista draft with all fields. Replace its description and optional metadata once verified; every linked route appearance will use the update.

## 5. RouteStop card

Source: `sundayStops` in `sundayRoutes.js`. A stop references a Place. Images, descriptions, venue facts, and directions belong to the Place, not the stop.

| Field | Required value? | Use |
| --- | --- | --- |
| `placeId` | Yes | Existing Place ID. Must be unique within this route's sequence. |
| `durationMinutes` | Nullable | Suggested time at this stop, as a number. |
| `guidance` | Nullable | Route-specific instruction, generally one sentence. |
| `flag` | Nullable | `optional`, `skipIfLate`, or `recommended`. |
| `foodNearbyIds` | Array | Existing Place IDs, revealed as reusable cards under “Food nearby.” |

```json
{"placeId":"lombard-street","durationMinutes":null,"guidance":null,"flag":null,"foodNearbyIds":["buena-vista"]}
```

Classic and Do Both reuse the same shared stop records. Update `sundayStops` once. A different route-specific instruction can use an override of that shared record without duplicating the Place content.

## 6. Route overview and detail

Source: `routes` in `sundayRoutes.js`. Used by the Sunday decision card and `Route` view.

Common entity fields plus:

| Field | Required value? | Use |
| --- | --- | --- |
| `stops` | Yes, array | Ordered RouteStop records; reference the shared Sunday stop objects in JS. |
| `bestFor` | Nullable | Brief audience description. |
| `suggestedStartTime` | Nullable | Suggested local time, `HH:MM`. |
| `durationMinutes` | Nullable | Numeric total estimate. |
| `durationLabel` | Nullable | Human-readable range such as “Allow approximately 4–5 hours.” Overrides numeric duration in the route view. |
| `directionsUrl` | Nullable | Verified route-map link; null until the full mixed walking/transit route is ready. |
| `runningLateGuidance` | Nullable | What to shorten or skip. |
| `departureTime` | Nullable | Suggested departure toward Oracle Park, `HH:MM`. |
| `departureGuidance` | Nullable | Transport/departure explanation. Set this to enable the prominent departure callout. |
| `arrivalTime` | Nullable | Target arrival, `HH:MM`. |
| `milestones` | Array | `{ "label": string, "time": "HH:MM" or null, "guidance": string or null }`. |
| `optionalExtensionPlaceIds` | Array | Places shown separately under the extra-time disclosure. These are not required route stops. |
| `related` | Array | Typed content references to other plans; Do Both links to Giants. |

Routes have a locally rendered sequence, which is usable without external maps. Route links/maps supplement the saved instructions. Adding new choice pages requires route composition changes, but replacing existing record fields does not require component changes.

## 7. Activity card and detail — Giants, Monday, Friday

Source: `activities.js`. Used by Today, Sunday’s Giants card, Monday/Friday `ActivityCard`, and `ActivityView`. Both card and detail read the same record.

Common fields plus:

| Field | Required value? | Use |
| --- | --- | --- |
| `date` | Nullable | Planned calendar date `YYYY-MM-DD`, even while time is unknown. |
| `schedule` | Nullable | Confirmed Schedule object (see below). |
| `placeId` | Nullable | Venue Place ID. |
| `durationMinutes` | Nullable | Numeric duration estimate. |
| `durationLabel` | Nullable | Readable range such as “Allow 1–2 hours”; takes precedence over numeric duration. |
| `whyGo` | Nullable | One concise reason to choose this outing. |
| `optional` | Yes, boolean | Marks an activity as explicitly optional; enabled for the bike ride. |
| `neighborhoodId` | Nullable | Neighborhood context. The card falls back to its venue’s neighborhood. |
| `directionsUrl` | Nullable | Activity-specific directions. Cards fall back to the venue’s directions. |
| `bestFor` | Nullable | Brief audience description. |
| `related` | Array | Typed references rendered as linked summaries below the activity details. |
| `meetingPlanId` | Nullable | SharedPlan containing group meeting time/place/instructions. |
| `afterPlanId` | Nullable | SharedPlan displayed after the activity, currently Sunday dinner. |
| `arrivalTime` | Nullable | Suggested local arrival `HH:MM`, separate from game start. |
| `externalUrl` | Nullable | Official activity/event page. |
| `infoBlocks` | Array | `{ "id": string, "title": string, "text": string or null }`. |

Current information-block IDs: `transport`, `entry`, `weather`, `food`, `view`. You can replace titles and text or add/remove blocks without component changes. A null block's text displays “Guidance to follow.” The Sunday view uses game-specific timing labels. Other activity details use “Suggested day,” “Start time,” and “Plan your time.” A planned date does not confirm a ticketed event; retain draft status and explicit caveats until verified. Unknown times stay null.

The brief's opponent, game time, suggested arrival, and dinner time have not been independently confirmed. Do not mark them confirmed merely by copying them into a draft. The current source leaves schedules null.

## 8. Shared dinner / meeting / evening card

Source: `sharedPlans.js`. Used by Today and `SharedPlanCard`.

Common fields plus:

| Field | Required value? | Use |
| --- | --- | --- |
| `schedule` | Nullable | Confirmed Schedule; time is shown only for a ready plan. |
| `subject` | Nullable | Typed content reference. For the currently implemented venue card, use `{ "kind": "place", "id": "venue-id" }`. Other subject kinds are reserved. |
| `meetingPlaceId` | Nullable | Exact meeting-place record. May differ from the dinner venue. |
| `instructions` | Nullable | Meeting/arrival guidance in plain text. |

When meeting-place and venue differ, include the exact meeting instructions here. Do not hide essential offline directions solely in a map link. Sunday's dinner record is `sunday-dinner`; the Giants meetup record is `giants-meetup`.

## Schedule object

```json
{"date":"2026-09-13","startTime":"20:30","endTime":null,"endDate":null,"timeZone":"America/Los_Angeles"}
```

This illustrates format only; it is not a confirmed dinner time. Required inside a non-null Schedule: `date`, `startTime`, `timeZone`. `endTime` and `endDate` are nullable; use `endDate` for an event crossing midnight. Essential full date/meeting guidance should remain in source instructions; the current compact shared-plan card displays the start time on its containing day's page, not a full calendar export. Schedule-based calendar export is not implemented for new SF content.

## 9. Today card / DayPlan

There is no separate Today editorial record. It displays an existing source entity's title/name, summary, draft status, and a link where a destination exists. Confirmed times come from the source.

A DayPlan requires `date` and four reference arrays: `primary`, `secondary`, `evening`, `notices`.

```json
{"date":"2026-09-13","primary":[{"kind":"guide","id":"sunday"}],"secondary":[{"kind":"activity","id":"sunday-giants"}],"evening":[{"kind":"sharedPlan","id":"sunday-dinner"}],"notices":[]}
```

Agenda items are also selected automatically by exact date and sorted by time. The current June records are not September data. Missing references are skipped; tests verify that configured references resolve. September 12 has no scheduled plans. Before Sunday, September 13, its empty-day fallback displays “Arrived early? Check our tips for San Francisco.” and links to the shared SF landing page. The pre-trip default selects September 12, so the same card appears before the trip; selecting Sunday or another upcoming day still previews its actual content. The card’s `title`, `path`, and exclusive `beforeDate` live in `earlyArrivalCard` in `src/data/today.js`. It contains no duplicated recommendations or invented arrival event. September 19 retains the ordinary empty-day fallback; departure content can be added through source references.

## 10. Existing agenda event card

The existing agenda shape is preserved. Do not convert SF venues into agenda events. The JSON companion includes one complete existing event as a shape example, not final Dreamforce content.

Required values: `id`, `eventCategory` (`suggested`, `also`, `oneOnOne`, `social`), `title`, `date` (`YYYY-MM-DD`), `startTime`, `endTime` (`HH:MM`), `registrationRequired` (boolean).

Nullable fields: `room`, `area`, `type`, `topic`, `summary`, `participants`, `transitionWarning`, `mapsUrl`, `url`, `spotifyUrl`.

Unlike new SF text, the legacy `summary` supports its existing limited HTML behavior. Preserve the existing event contract until migration. The legacy calendar conversion currently uses Chicago time; simply replacing dates with September does not complete the Dreamforce migration.

## 11. Neighborhood card and detail

Source: `neighborhoods.js`. Common entity fields, plus nullable `whyGo` and required `related: ContentReference[]`.

`shortDescription` is one sentence of neighborhood context. `whyGo` can add a concise reason to spend time there. Supply 3–4 related places, activities, or guides using existing IDs. Related entries use linked summary cards, so their titles, images, descriptions, and status stay at their source.

A Place's `neighborhoodId` produces a link to this neighborhood page. The neighborhood’s `related` entries provide the return connections. Changing one record's name or description updates every appearance.

Example reference list for North Beach:

```json
[{"kind":"place","id":"city-lights"},{"kind":"place","id":"original-joes"},{"kind":"guide","id":"explore"}]
```

## 12. Practical-tip card

Source: `practicalTips.js`. Common entity fields plus:

| Field | Required value? | Use |
| --- | --- | --- |
| `category` | Yes | Editorial grouping such as weather, transport, safety, airport, maps. Page ordering is separate. |
| `externalUrl` | Nullable | Official/helpful HTTPS source. |
| `externalLabel` | Nullable | Specific link text, such as “Official ferry schedules.” Falls back to “Official information.” |
| `infoBlocks` | Array | `{ "id": string, "title": string, "text": string or null }`. Displayed under a native expandable details control. |
| `related` | Array | Existing content references, displayed as local links where destinations exist. |

Keep the tip’s essential guidance in `shortDescription` or `infoBlocks`, so it is available offline. The external page remains supplemental. Do not insert live fares or schedules unless they are editorially verified and dated.

## 13. Linked summary card

`ReferenceCard` needs only a typed reference: `{ "kind": "place", "id": "city-lights" }`, plus the app’s content registry. It derives name/title, description, image, draft label, and destination from that source. No separate editorial copy is stored on the summary card.

Local place, activity, and neighborhood paths are generated from stable IDs. Sunday activities/routes retain their existing dedicated paths. Guides use their configured paths. New unknown references are not rendered as working links.

## 14. SF guide page composition

Source: `sfGuidePages` in `src/data/sfGuides.js`. This is section composition, not repeated venue copy. The page’s title/description/status still come from `sfSections` in `guide.js`.

Page fields: `eyebrow` (string), `framing` (string or null), `sections` (array). Use null for framing when the guide summary already says it.
Each section requires:

| Field | Shape |
| --- | --- |
| `id` | Stable unique string within this page. |
| `title` | Visible section heading. |
| `description` | String or null, for context specific to the section. |
| `presentation` | `cards` or `links`. Links presentation requires referenced records with HTTPS `externalUrl`. |
| `entries` | Ordered array of typed content references. |

Example: add an existing Place to the correct dining section by inserting `{ "kind": "place", "id": "venue-id" }`. Do not paste another copy of the Place. Monday/Friday sections use activity references; Explore also references Sunday routes and neighborhoods.

Dining groups are institutions, quick/local, if-you-have-time, and drinks. The same Buena Vista ID is intentionally referenced in both quick/local and drinks. Shop records use the same Place model. Neighborhood and activity detail pages derive “Find this in the guides” links from these references.

## 15. Compact weather card and offline service copy

Weather is automatic service data, not a placeholder that the content-writing pass should replace. Home uses the latest available NWS observation from SFO airport (KSFO), explicitly labeled as an airport observation rather than a downtown forecast. Source: [NWS API documentation](https://www.weather.gov/documentation/services-web-api).

The normalized local reading has these fields:

| Field | Shape | Meaning |
| --- | --- | --- |
| `stationId` | String, currently `KSFO` | Must match the configured station. |
| `temperatureC` | Finite number | Celsius temperature; rounded only for display. |
| `condition` | Nonempty plain string, up to 200 characters | Observed condition; missing provider text uses a neutral fallback. |
| `observedAt` | ISO timestamp with timezone | Provider observation time, displayed in San Francisco time. |

Do not author a temperature, forecast, or observation timestamp as editorial copy. `weatherCopy` in `guide.js` supplies the heading and unavailable label. `weatherService` in `services.js` supplies station, endpoint, labels, and cache timing; `serviceCopy` supplies “Observed,” “Last saved observation,” connectivity and installation messages. Changing stations requires changing the endpoint, ID, and location label together.

On Home, requests are attempted on mount and approximately every 30 minutes while visible, with an eight-second timeout. Resume and reconnect trigger appropriate refresh checks. A saved observation appears immediately when available. Readings older than 90 minutes are labeled saved; readings older than 24 hours are hidden in favor of the unavailable state. Invalid responses and denied storage do not block the app.

Core pages, local images, route descriptions, and Today are packaged in the PWA. The footer confirms when a service worker is ready. The device connectivity banner is a hint, not a guarantee that a particular service is reachable. External Maps/Directions, booking links, and weather still depend on those services; local place details remain available. No shared RSVP service was added.

## Notices — reserved operational content

The Notice contract remains available to Today but there is no dedicated notice-detail page. Common fields plus `date: string or null`, `related: ContentReference[]`, `severity: "info" or "important"`. Today currently displays the source title, description, and status. Dedicated severity treatment/operational warnings belong to later integration if configured.

## Official reference links

Link destinations checked September 7, 2026. These supplement local guidance; their live information is not copied into the application:

- [SFMTA getting around](https://www.sfmta.com/getting-around)
- [Cable-car payment information](https://www.sfmta.com/fares/cable-car-single-ride)
- [Golden Gate Ferry schedules](https://www.goldengate.org/ferry/schedules-maps/)
- [SFO ground transportation](https://www.flysfo.com/passengers/ground-transportation)
- [SFPD Park Smart](https://www.sanfranciscopolice.org/stay-safe/crime-prevention/park-smart)
- [National Weather Service San Francisco forecast](https://forecast.weather.gov/MapClick.php?lat=37.79280&lon=-122.41450)

## Refreshing the examples

From the repository root, run `node scripts/export-content-examples.mjs` after updating source records. This refreshes the copyable JSON examples. The application does not load this example file at runtime. The live content remains in `src/data/`.

## SF guide content still needed

- Final restaurant/shop descriptions, why-go and ordering/look-for notes, hours, prices where useful, images/alt text, verified reservation/website links.
- Exact branches for Lori’s Diner, Super Duper, and Boudin; the host’s final cocktail-bar and view-bar choices. These have no invented map pins.
- Neighborhood reasons to visit and any refinements to related entries.
- Monday ferry times, transport/rental logistics, durations, and detailed guidance in each information block.
- Friday event dates, availability/tickets, durations, and exact locations. Flower Piano and Fort Mason Night Market remain possibilities, not confirmed September 18 events.
- Remaining practical detail blocks: walking/ride-hailing/Muni guidance and cable-car route/queue notes.

## Sunday content still needed

- Final place descriptions, relevant photos with alt text, addresses/access points, neighborhood IDs, food suggestions, and verified links.
- Cable-car boarding point/line and route transfer guidance; exact Golden Gate viewpoint.
- Route start, per-stop and total duration review, milestones, full route maps, and the departure/arrival targets for Do Both.
- Confirmed Giants opponent/date/start, tickets, meeting time and exact point, transport, entry/bag guidance, food/view recommendations.
- Dinner venue, schedule, meeting instructions, and reservation link if applicable.

A content delivery should identify the record ID, replacement fields, and anything still unverified. That is enough to replace the placeholders without rewriting the cards.

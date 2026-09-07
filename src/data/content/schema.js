/**
 * Local companion content contract. No network loading or editorial HTML required.
 * Use null for unknown metadata; never turn an unknown schedule into midnight.
 * Existing agenda events retain their legacy shape until the Dreamforce data migration.
 *
 * @typedef {'draft' | 'ready'} ContentStatus
 * @typedef {'guide' | 'agendaEvent' | 'place' | 'activity' | 'route' | 'neighborhood' | 'sharedPlan' | 'practicalTip' | 'notice'} ContentKind
 * @typedef {{ kind: ContentKind, id: string }} ContentReference
 * @typedef {{ id: string, title: string, description: string, path: string, status: ContentStatus }} Guide
 * Guide records use the existing landing-page shape in data/guide.js.
 * @typedef {{ src: string, alt: string }} ContentImage
 * @typedef {{ date: string, startTime: string, endTime: string|null, endDate: string|null, timeZone: string }} Schedule
 *
 * @typedef {Object} ContentEntry
 * @property {string} id Stable identity, independent of editable titles.
 * @property {string} slug
 * @property {string} name
 * @property {ContentStatus} status Draft entries are not confirmed arrangements.
 * @property {string|null} shortDescription Plain text.
 * @property {ContentImage|null} image Use a local Vite asset import for src.
 *
 * @typedef {ContentEntry & {
 *   category: 'restaurant'|'bar'|'shop'|'landmark'|'meetingPoint',
 *   neighborhoodId: string|null, address: string|null, directionsUrl: string|null,
 *   externalUrl: string|null, reservationUrl: string|null, hours: string|null, priceIndication: string|null,
 *   whyGo: string|null, whatToOrder: string|null, whatToLookFor: string|null,
 *   bestFor: string|null, whereItFits: string|null
 * }} Place
 *
 * @typedef {ContentEntry & {
 *   schedule: Schedule|null, placeId: string|null, durationMinutes: number|null,
 *   bestFor: string|null, related: ContentReference[],
 *   date: string|null, meetingPlanId: string|null, afterPlanId: string|null,
 *   arrivalTime: string|null, externalUrl: string|null, infoBlocks: InfoBlock[],
 *   durationLabel: string|null, whyGo: string|null, optional: boolean,
 *   neighborhoodId: string|null, directionsUrl: string|null
 * }} Activity
 *
 * @typedef {{ id: string, title: string, text: string|null }} InfoBlock
 * @typedef {{ label: string, time: string|null, guidance: string|null }} RouteMilestone
 *
 * @typedef {{
 *   placeId: string, durationMinutes: number|null, guidance: string|null,
 *   flag: 'optional'|'skipIfLate'|'recommended'|null, foodNearbyIds: string[]
 * }} RouteStop
 *
 * @typedef {ContentEntry & {
 *   stops: RouteStop[], suggestedStartTime: string|null,
 *   durationMinutes: number|null, durationLabel: string|null, bestFor: string|null,
 *   runningLateGuidance: string|null, directionsUrl: string|null,
 *   departureTime: string|null, departureGuidance: string|null, arrivalTime: string|null,
 *   milestones: RouteMilestone[], optionalExtensionPlaceIds: string[], related: ContentReference[]
 * }} Route
 *
 * @typedef {ContentEntry & { whyGo: string|null, related: ContentReference[] }} Neighborhood
 * @typedef {ContentEntry & {
 *   schedule: Schedule|null, subject: ContentReference|null,
 *   meetingPlaceId: string|null, instructions: string|null
 * }} SharedPlan
 * @typedef {ContentEntry & { category: string, externalUrl: string|null, externalLabel: string|null, infoBlocks: InfoBlock[], related: ContentReference[] }} PracticalTip
 * @typedef {ContentEntry & {
 *   date: string|null, related: ContentReference[], severity: 'info'|'important'
 * }} Notice
 *
 * @typedef {{
 *   date: string, primary: ContentReference[], secondary: ContentReference[],
 *   evening: ContentReference[], notices: ContentReference[]
 * }} DayPlan
 * References assign content to a trip day, not a confirmed time. Draft entries
 * remain tentative; null schedules must never render as midnight.
 */

export {}

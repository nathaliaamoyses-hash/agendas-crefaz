import test from 'node:test'
import assert from 'node:assert/strict'
import { events } from '../src/data/events.js'
import { trip } from '../src/data/trip.js'
import { createContentSources } from '../src/data/content/index.js'
import { applyFilter, groupByDate } from '../src/utils/agenda.js'
import { dateInTimeZone, formatEventDate } from '../src/utils/date.js'
import { resolveContent } from '../src/utils/content.js'
import { getRoute, pathFromHash, routeHref } from '../src/routing/routes.js'
import { destinations, sfSections } from '../src/data/guide.js'

test('category filters and saved-event filtering retain their behavior', () => {
  const fixture = ['suggested', 'also', 'oneOnOne', 'social'].map(eventCategory => ({ id: eventCategory, eventCategory }));
  const favorites = new Set(['also', 'social', 'deleted']);
  assert.equal(applyFilter(fixture, 'all', favorites).length, 4);
  assert.deepEqual(applyFilter(fixture, 'sessions', favorites).map(e => e.id), ['suggested', 'also']);
  assert.deepEqual(applyFilter(fixture, 'oneOnOne', favorites).map(e => e.id), ['oneOnOne']);
  assert.deepEqual(applyFilter(fixture, 'social', favorites).map(e => e.id), ['social']);
  assert.deepEqual(applyFilter(fixture, 'mySchedule', favorites).map(e => e.id), ['also', 'social']);
  assert.equal(applyFilter(fixture, 'mySchedule', new Set()).length, 0);
})

test('date groups sort out-of-order data without mutating the original agenda', () => {
  const original = structuredClone(events)
  const groups = groupByDate(events)
  assert.deepEqual(groups.map(group => group.date), ['2026-09-15', '2026-09-16', '2026-09-17'])
  assert.deepEqual(groups[0].events.map(event => event.startTime), ['08:30', '10:00', '12:30', '14:00', '14:30', '16:00'])
  for (const group of groups) {
    const times = group.events.map(event => event.startTime)
    assert.deepEqual(times, [...times].sort())
  }
  assert.deepEqual(events, original)
})

test('root links and bookmarked fragments resolve; unknown pages remain unknown', () => {
  assert.equal(getRoute(pathFromHash('')).id, 'home')
  assert.equal(getRoute(pathFromHash('#/')).id, 'home')
  assert.equal(getRoute(pathFromHash('#/dreamforce/')).id, 'dreamforce')
  assert.equal(getRoute(pathFromHash('#/sf')).id, 'sanFrancisco')
  assert.equal(getRoute(pathFromHash('#/missing')), null)
  assert.equal(getRoute(pathFromHash('#unexpected')), null)
  assert.equal(routeHref('/sf'), '#/sf')
})

test('venue date rolls over at SF midnight, not UTC midnight', () => {
  assert.equal(dateInTimeZone(new Date('2026-09-13T06:59:59Z'), trip.timeZone), '2026-09-12')
  assert.equal(dateInTimeZone(new Date('2026-09-13T07:00:00Z'), trip.timeZone), '2026-09-13')
})

test('landing cards resolve to distinct destinations and SF pages retain their parent navigation', () => {
  const cards = [...destinations, ...sfSections]
  assert.equal(new Set(cards.map(card => card.path)).size, cards.length)
  for (const card of cards) {
    const route = getRoute(pathFromHash(routeHref(card.path)))
    assert.equal(route?.id, card.id, `Unreachable card: ${card.title}`)
  }
  for (const section of sfSections) {
    assert.equal(getRoute(section.path).parentId, 'sanFrancisco')
  }
})

test('venue date follows winter offset without a hardcoded September offset', () => {
  assert.equal(dateInTimeZone(new Date('2026-12-01T07:30:00Z'), trip.timeZone), '2026-11-30')
  assert.equal(dateInTimeZone(new Date('2026-12-01T08:00:00Z'), trip.timeZone), '2026-12-01')
})

test('date display preserves a date-only event across attendee device timezones', () => {
  const initialZone = process.env.TZ
  try {
    for (const zone of ['America/Sao_Paulo', 'America/Chicago', 'Asia/Tokyo', 'UTC']) {
      process.env.TZ = zone
      assert.equal(formatEventDate('2026-06-03'), 'Wednesday, June 3')
    }
  } finally {
    if (initialZone === undefined) delete process.env.TZ
    else process.env.TZ = initialZone
  }
})

test('references resolve original entities without copying agenda data or colliding across kinds', () => {
  const sources = createContentSources(events)
  assert.equal(resolveContent({ kind: 'agendaEvent', id: events[0].id }, sources), events[0])
  const place = { id: events[0].id, name: 'Fixture place', status: 'draft' }
  const withPlace = { ...sources, place: [place] }
  assert.equal(resolveContent({ kind: 'place', id: place.id }, withPlace), place)
  assert.equal(resolveContent({ kind: 'place', id: 'missing' }, withPlace), null)
  assert.equal(resolveContent({ kind: 'unknown', id: place.id }, withPlace), null)
  assert.equal(resolveContent({ kind: '__proto__', id: place.id }, withPlace), null)
  assert.equal(resolveContent(null, sources), null)
})

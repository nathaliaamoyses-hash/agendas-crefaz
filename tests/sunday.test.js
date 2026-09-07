import test from 'node:test'
import assert from 'node:assert/strict'
import { sunday } from '../src/data/sunday.js'
import { createContentSources, dayPlans } from '../src/data/content/index.js'
import { routes, sundayStops } from '../src/data/content/sundayRoutes.js'
import { contentPath, resolveContent } from '../src/utils/content.js'
import { composeDay } from '../src/utils/today.js'
import { trip } from '../src/data/trip.js'
import { getRoute } from '../src/routing/routes.js'
import { readPreference, savePreference } from '../src/utils/preference.js'

const sources = createContentSources()

test('Sunday choices resolve to real child pages and source content', () => {
  assert.deepEqual(sunday.choices.map(choice => choice.id), ['classic', 'giants', 'both'])
  for (const choice of sunday.choices) {
    assert.ok(resolveContent(choice.content, sources))
    assert.equal(getRoute(choice.path).sundayChoiceId, choice.id)
    assert.equal(getRoute(choice.path).parentId, 'sanFrancisco')
    assert.equal(contentPath(choice.content), choice.path)
  }
  assert.equal(contentPath({kind: 'sharedPlan', id: sunday.dinnerId}), '/sf/sunday')
})

test('full and shortened routes share stop records and resolve all places, food, and extensions', () => {
  const [classic, both] = routes
  assert.equal(classic.stops.length, 10)
  assert.equal(both.stops.length, 6)
  assert.equal(classic.stops.at(-1), sundayStops.bridge)
  assert.equal(both.stops.at(-1), sundayStops.oracle)
  for (const stop of both.stops.slice(0, -1)) assert.ok(classic.stops.includes(stop), 'Shared stops must be reused by identity')
  assert.ok(!both.stops.includes(sundayStops.crissy), 'Extensions must not silently become required stops')
  for (const route of routes) {
    assert.equal(new Set(route.stops.map(stop => stop.placeId)).size, route.stops.length)
    for (const id of [...route.stops.flatMap(stop => [stop.placeId, ...stop.foodNearbyIds]), ...route.optionalExtensionPlaceIds]) {
      assert.ok(sources.place.find(place => place.id === id), `Unresolved place ${id}`)
    }
  }
})

test('Giants, Today, and Sunday reuse the same activity and dinner records', () => {
  const activity = sources.activity.find(entry => entry.id === 'sunday-giants')
  const dinner = sources.sharedPlan.find(entry => entry.id === sunday.dinnerId)
  assert.equal(activity.afterPlanId, dinner.id)
  assert.ok(sources.sharedPlan.find(entry => entry.id === activity.meetingPlanId))
  assert.ok(sources.place.find(entry => entry.id === activity.placeId))
  const today = composeDay(sunday.date, dayPlans, sources, trip)
  assert.equal(today.secondary[0].content, activity)
  assert.equal(today.evening[0].content, dinner)
  assert.equal(activity.schedule, null)
  assert.equal(activity.arrivalTime, null)
  assert.equal(dinner.schedule, null)
})

test('draft places do not invent addresses; configured map links are encoded HTTPS destinations', () => {
  for (const place of sources.place) {
    assert.equal(place.status, 'draft')
    assert.equal(place.address, null)
    if (place.directionsUrl) {
      const url = new URL(place.directionsUrl)
      assert.equal(url.protocol, 'https:')
      assert.equal(url.hostname, 'www.google.com')
      assert.ok(url.searchParams.get('destination').endsWith('San Francisco'))
    }
  }
  assert.equal(sources.place.find(place => place.id === 'cable-car').directionsUrl, null)
  assert.equal(sources.place.find(place => place.id === 'golden-gate-viewpoint').directionsUrl, null)
})

test('device preference restores allowed choices, rejects stale values, clears, and handles denied storage', () => {
  const data = new Map()
  const storage = { getItem: key => data.get(key), setItem: (key, value) => data.set(key, value), removeItem: key => data.delete(key) }
  const key = `${trip.id}:sunday-preference`
  const allowed = ['classic', 'giants', 'both', 'dinner-only']
  assert.equal(readPreference(storage, key, allowed), null)
  assert.equal(savePreference(storage, key, 'both'), true)
  assert.equal(readPreference(storage, key, allowed), 'both')
  data.set(key, 'stale-choice')
  assert.equal(readPreference(storage, key, allowed), null)
  assert.equal(savePreference(storage, key, null), true)
  assert.equal(data.has(key), false)
  const denied = { getItem() { throw new Error('denied') }, setItem() { throw new Error('denied') } }
  assert.equal(readPreference(denied, key, allowed), null)
  assert.equal(savePreference(denied, key, 'both'), false)
  assert.equal(readPreference(null, key, allowed), null)
})

test('authoring examples match the implemented source records', async () => {
  const { readFile } = await import('node:fs/promises')
  const examples = JSON.parse(await readFile(new URL('../docs/content-examples.json', import.meta.url), 'utf8'))
  assert.deepEqual(examples.placeCard, sources.place.find(place => place.id === 'buena-vista'))
  assert.deepEqual(examples.routeCard, routes[1])
  assert.deepEqual(examples.activityCard, sources.activity[0])
  assert.deepEqual(examples.sharedPlanCard, sources.sharedPlan.find(plan => plan.id === sunday.dinnerId))
  assert.deepEqual(examples.sundayChoiceCard, sunday.choices[2])
  assert.deepEqual(examples.dayPlan, dayPlans.find(plan => plan.date === sunday.date))
})

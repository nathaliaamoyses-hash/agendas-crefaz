import test from 'node:test'
import assert from 'node:assert/strict'
import { createTrackAgenda } from '../src/utils/tracks.js'
import { events } from '../src/data/clients/banco-inter/events.js'
import { client } from '../src/data/clients/banco-inter/config.js'
import { client as acerto } from '../src/data/clients/acerto/config.js'
import { client as mercantil } from '../src/data/clients/banco-mercantil/config.js'
import { brazilSessions } from '../src/data/brazil.js'
import { createContentSources, dayPlans } from '../src/data/content/index.js'
import { composeDay } from '../src/utils/today.js'
import { trip } from '../src/data/trip.js'
const agenda = createTrackAgenda(events, client.tracks)

test('Inter preserves two complete tracks and requires an explicit valid choice', () => {
  assert.equal(events.length,40)
  assert.equal(new Set(events.map(e=>e.id)).size,40)
  assert.deepEqual(agenda.forTrack(null),[])
  assert.deepEqual(agenda.forTrack('corrupt'),[])
  assert.equal(agenda.validTrack('old-track'),null)
  for(const track of client.tracks) {
    const selected=agenda.forTrack(track.id)
    assert.equal(selected.length,20)
    assert.ok(selected.every(e=>e.topic===track.label))
    assert.deepEqual(selected.map(e=>Object.keys(e).sort()),Array(20).fill(Object.keys(events[0]).sort()))
    const sources=createContentSources(selected)
    let total=0
    for(const date of ['2026-09-15','2026-09-16','2026-09-17']) {
      const day=composeDay(date,dayPlans,sources,trip)
      total+=day.agenda.length
      assert.ok(day.agenda.every(e=>e.content.topic===track.label))
      assert.equal(day.evening.length,1)
    }
    assert.equal(total,20)
  }
})

test('shared sessions save once and retain each selected track’s transition warning', () => {
  const business=events.find(e=>e.id==='tue-conversational-messaging-use-cases-from-ta')
  const operations=events.find(e=>e.id==='tue-conversational-messaging-use-cases-from-tb')
  assert.equal(business.transitionWarning,null)
  assert.ok(operations.transitionWarning)
  const saved=agenda.toggle(new Set(),operations.id)
  assert.equal(saved.size,1)
  assert.ok(saved.has(agenda.favoriteId(business.id)))
  assert.deepEqual(agenda.saved(saved,'business'),[business])
  assert.deepEqual(agenda.saved(saved,'operations'),[operations])
  assert.equal(agenda.toggle(saved,business.id).size,0)
  assert.equal(agenda.normalizeFavorites(new Set([business.id,operations.id])).size,1)
  assert.deepEqual(agenda.saved(new Set([operations.id]),'operations'),[operations])
})

test('My Schedule keeps other-track choices and distinct repeat occurrences', () => {
  const ids=new Set(events.map(e=>e.id))
  assert.equal(agenda.saved(ids,'business').length,32)
  assert.equal(agenda.saved(ids,'operations').length,32)
  const operationsOnly=events.find(e=>e.id==='tue-how-salesforce-built-an-agentic-tb')
  assert.deepEqual(agenda.saved(new Set([operationsOnly.id]),'business'),[operationsOnly])
  const repeated=events.filter(e=>e.title==='From Silos to Scale: U.S. Bank’s Data 360 Transformation')
  assert.equal(agenda.saved(new Set(repeated.map(e=>e.id)),'business').length,2)
  const withBrazil=agenda.toggle(new Set([operationsOnly.id]),brazilSessions[0].id)
  assert.ok(withBrazil.has(brazilSessions[0].id))
  assert.deepEqual(agenda.saved(withBrazil,'business'),[operationsOnly])
})

test('single-track clients preserve event identity, selection and favorite behavior', () => {
  const unfiltered=createTrackAgenda(events)
  assert.equal(unfiltered.forTrack(null),events)
  assert.equal(unfiltered.favoriteId(events[1].id),events[1].id)
  assert.equal(unfiltered.saved(new Set(events.map(e=>e.id))).length,40)
  assert.equal(acerto.tracks,undefined)
  assert.equal(mercantil.tracks,undefined)
  assert.deepEqual(client.teamContacts,mercantil.teamContacts)
  for(const other of [mercantil,acerto]) {
    assert.notEqual(client.favoritesKey,other.favoritesKey)
    assert.notEqual(client.sundayPreferenceKey,other.sundayPreferenceKey)
  }
  assert.match(client.trackPreferenceKey,/banco-inter/)
})

test('Inter client content excludes internal account strategy', () => {
  const text=JSON.stringify(events)
  for(const phrase of ['Motor Melhor Conversa','Inter\'s','Inter is','Adobe/Braze','seat-expansion','commercial session','Phase 2','CX phases','decentralized-org','session above']) assert.ok(!text.includes(phrase),phrase)
  assert.ok(events.some(e=>e.summary.includes('<i>Also runs')))
  assert.ok(events.some(e=>e.registrationRequired))
})

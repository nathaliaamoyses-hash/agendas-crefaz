import test from 'node:test'
import assert from 'node:assert/strict'
import { trip } from '../src/data/trip.js'
import { events } from '../src/data/events.js'
import { sfSections } from '../src/data/guide.js'
import { createContentSources, dayPlans, sharedPlans } from '../src/data/content/index.js'
import { composeDay, selectTripDay, tripDates } from '../src/utils/today.js'
import { resolveContent } from '../src/utils/content.js'
import { startDateClock } from '../src/utils/dateClock.js'

const sources = createContentSources(events)

test('all eight trip days are selectable, with honest before/during/after defaults', () => {
  assert.deepEqual(tripDates(trip), dayPlans.map(plan => plan.date))
  assert.deepEqual(selectTripDay('2026-09-07', null, trip), { date: '2026-09-12', period: 'before', isToday: false })
  assert.deepEqual(selectTripDay('2026-09-16', null, trip), { date: '2026-09-16', period: 'during', isToday: true })
  assert.deepEqual(selectTripDay('2026-09-20', null, trip), { date: '2026-09-19', period: 'after', isToday: false })
  assert.deepEqual(selectTripDay('2026-09-16', '2026-09-13', trip), { date: '2026-09-13', period: 'during', isToday: false })
  assert.equal(selectTripDay('2026-09-16', 'invalid', trip).date, '2026-09-16')
  assert.equal(selectTripDay('2026-09-16', '2026-09-30', trip).date, '2026-09-16')
  // Automatic day follows midnight; a manual selection remains stable until reset.
  assert.equal(selectTripDay('2026-09-17', null, trip).date, '2026-09-17')
  assert.equal(selectTripDay('2026-09-17', '2026-09-13', trip).date, '2026-09-13')
})

test('every configured reference resolves uniquely and drafts have no fabricated schedules', () => {
  for (const plan of dayPlans) {
    const refs = [...plan.primary, ...plan.secondary, ...plan.evening, ...plan.notices]
    assert.equal(new Set(refs.map(ref => `${ref.kind}:${ref.id}`)).size, refs.length)
    for (const ref of refs) assert.ok(resolveContent(ref, sources), `Missing ${ref.kind}:${ref.id}`)
  }
  for (const entry of [...sources.activity, ...sharedPlans]) {
    if (entry.status === 'draft') assert.equal(entry.schedule, null)
    if (entry.schedule) assert.equal(entry.schedule.timeZone, 'America/Los_Angeles')
  }
})

test('trip composition uses the original guide and shared-plan objects on the intended days', () => {
  const sunday = composeDay('2026-09-13', dayPlans, sources, trip)
  assert.equal(sunday.primary[0].content, sfSections.find(guide => guide.id === 'sunday'))
  assert.equal(sunday.secondary[0].content, sources.activity.find(activity=>activity.id==='sunday-giants'))
  assert.equal(sunday.evening[0].content, sharedPlans.find(plan => plan.id === 'sunday-dinner'))
  for (const [date, id] of [['2026-09-14', 'monday'], ['2026-09-18', 'friday']]) {
    assert.equal(composeDay(date, dayPlans, sources, trip).primary[0].content, sfSections.find(guide => guide.id === id))
  }
  for (const [date, id] of [['2026-09-15', 'tuesday-evening'], ['2026-09-16', 'dreamfest'], ['2026-09-17', 'thursday-dinner']]) {
    const day = composeDay(date, dayPlans, sources, trip)
    assert.equal(day.agenda.length, events.filter(event=>event.date===date).length)
    assert.equal(day.agendaPending, false)
    assert.equal(day.evening[0].content.id, id)
  }
  for (const date of ['2026-09-12', '2026-09-19']) {
    const day = composeDay(date, dayPlans, sources, trip)
    assert.equal(day.agendaPending, false)
    assert.ok(['primary', 'secondary', 'evening', 'notices', 'agenda'].every(key => day[key].length === 0))
  }
})

test('matching agenda events sort by real time; missing refs and midnight placeholders do not leak into Today', () => {
  const early = { id: 'early', date: '2026-09-15', startTime: '09:00', endTime: '10:00', title: 'Early' }
  const late = { id: 'late', date: '2026-09-15', startTime: '14:00', endTime: '15:00', title: 'Late' }
  const placeholder = { id: 'unknown', date: '2026-09-15', startTime: '00:00', endTime: '00:00' }
  const fixtureSources = { ...sources, agendaEvent: [late, placeholder, early, { ...early, id: 'draft', status: 'draft' }, ...events.map(event => ({ ...event, date: '2026-06-03' }))] }
  const plans = [{ date: '2026-09-15', primary: [{ kind: 'agendaEvent', id: 'early' }, { kind: 'guide', id: 'missing' }], secondary: [], evening: [{ kind: 'agendaEvent', id: events[0].id }], notices: [] }]
  const result = composeDay('2026-09-15', plans, fixtureSources, trip)
  assert.deepEqual(result.agenda.map(item => item.content), [early, late])
  assert.equal(result.agenda[0].content, early)
  assert.equal(result.agendaPending, false)
  assert.deepEqual(result.primary, [])
  assert.deepEqual(result.evening, [])
  assert.equal(fixtureSources.agendaEvent[0], late, 'source ordering must not change')
  early.title = 'Updated source title'
  assert.equal(composeDay('2026-09-15', plans, fixtureSources, trip).agenda[0].content.title, 'Updated source title')
})

test('configured arrival/departure and notices resolve without special-case page content', () => {
  const arrival = { id: 'arrival', name: 'Arrival', status: 'ready' }
  const notice = { id: 'notice', name: 'Notice', status: 'ready' }
  const custom = [{ date: '2026-09-12', primary: [{ kind: 'sharedPlan', id: 'arrival' }], notices: [{ kind: 'notice', id: 'notice' }] }]
  const result = composeDay('2026-09-12', custom, { ...sources, sharedPlan: [arrival], notice: [notice] }, trip)
  assert.equal(result.primary[0].content, arrival)
  assert.equal(result.notices[0].content, notice)
})

test('clock rolls at SF midnight offline, catches resume and clock changes, and cleans up', () => {
  let instant = new Date('2026-09-13T06:59:59.500Z')
  let nextId = 0
  const timers = new Map()
  const windowTarget = new EventTarget()
  const documentTarget = new EventTarget()
  const seen = []
  const stop = startDateClock(date => seen.push(date), trip.timeZone, {
    now: () => instant,
    setTimer: (callback, delay) => { timers.set(++nextId, { callback, delay }); return nextId },
    clearTimer: id => timers.delete(id), windowTarget, documentTarget,
  })
  assert.equal(seen.at(-1), '2026-09-12')
  assert.equal([...timers.values()][0].delay, 500)
  instant = new Date('2026-09-13T07:00:00Z')
  ;[...timers.values()][0].callback()
  assert.equal(seen.at(-1), '2026-09-13')
  assert.equal(timers.size, 1)
  for (const [target, event, time, date] of [
    [documentTarget, 'visibilitychange', '2026-09-16T10:00:00Z', '2026-09-16'],
    [windowTarget, 'focus', '2026-09-17T10:00:00Z', '2026-09-17'],
    [windowTarget, 'pageshow', '2026-09-15T10:00:00Z', '2026-09-15'],
    [windowTarget, 'focus', '2026-12-01T07:59:59Z', '2026-11-30'],
  ]) {
    instant = new Date(time)
    target.dispatchEvent(new Event(event))
    assert.equal(seen.at(-1), date)
    assert.equal(timers.size, 1)
  }
  instant = new Date('2026-12-01T08:00:00Z')
  ;[...timers.values()][0].callback()
  assert.equal(seen.at(-1), '2026-12-01')
  stop()
  assert.equal(timers.size, 0)
  const count = seen.length
  windowTarget.dispatchEvent(new Event('focus'))
  windowTarget.dispatchEvent(new Event('pageshow'))
  documentTarget.dispatchEvent(new Event('visibilitychange'))
  assert.equal(seen.length, count)
})

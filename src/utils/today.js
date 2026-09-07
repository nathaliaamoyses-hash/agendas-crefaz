import { resolveContent } from './content.js'

// Date-only arithmetic stays in UTC; display and "today" use explicit timezones.
export function tripDates(trip) {
  const [year, month, day] = trip.startDate.split('-').map(Number)
  const cursor = new Date(Date.UTC(year, month - 1, day))
  const dates = []
  while (cursor.toISOString().slice(0, 10) <= trip.endDate) {
    dates.push(cursor.toISOString().slice(0, 10))
    cursor.setUTCDate(cursor.getUTCDate() + 1)
  }
  return dates
}

export function selectTripDay(currentDate, selectedDate, trip) {
  const period = currentDate < trip.startDate ? 'before' : currentDate > trip.endDate ? 'after' : 'during'
  const fallback = period === 'before' ? trip.startDate : period === 'after' ? trip.endDate : currentDate
  const date = tripDates(trip).includes(selectedDate) ? selectedDate : fallback
  return { date, period, isToday: date === currentDate }
}

function isScheduledOn(event, date) {
  // The temporary catalog uses 00:00–00:00 for unknown times. Never present those as scheduled.
  return event.date === date && /^([01]\d|2[0-3]):[0-5]\d$/.test(event.startTime ?? '') &&
    !(event.startTime === '00:00' && event.endTime === '00:00') && event.status !== 'draft'
}

// Return source objects by identity; no editorial text or dates are copied into Today.
export function composeDay(date, plans, sources, trip) {
  const plan = plans.find(item => item.date === date)
  const seen = new Set()
  const wrap = (reference) => {
    const key = `${reference.kind}:${reference.id}`
    const content = resolveContent(reference, sources)
    if (!content || seen.has(key)) return null
    if (reference.kind === 'agendaEvent' && !isScheduledOn(content, date)) return null
    seen.add(key)
    return { reference, content }
  }
  const agenda = (sources.agendaEvent ?? [])
    .filter(event => isScheduledOn(event, date))
    .slice().sort((a, b) => a.startTime.localeCompare(b.startTime))
    .map(event => wrap({ kind: 'agendaEvent', id: event.id }))
    .filter(Boolean)
  const groups = Object.fromEntries(['primary', 'secondary', 'evening', 'notices'].map(key => [
    key, (plan?.[key] ?? []).map(wrap).filter(Boolean),
  ]))
  const conferenceDay = date >= trip.conference.startDate && date <= trip.conference.endDate
  return { ...groups, agenda, agendaPending: conferenceDay && agenda.length === 0 }
}

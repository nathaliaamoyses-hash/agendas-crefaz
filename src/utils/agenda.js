export function applyFilter(allEvents, filter, favorites) {
  switch (filter) {
    case 'sessions':
      return allEvents.filter(
        (e) => e.eventCategory === 'suggested' || e.eventCategory === 'also'
      )
    case 'oneOnOne':
      return allEvents.filter((e) => e.eventCategory === 'oneOnOne')
    case 'social':
      return allEvents.filter((e) => e.eventCategory === 'social')
    case 'mySchedule':
      return allEvents.filter((e) => favorites.has(e.id))
    case 'all':
    default:
      return allEvents
  }
}

export function groupByDate(eventList) {
  const groups = new Map()
  for (const e of eventList) {
    if (!groups.has(e.date)) groups.set(e.date, [])
    groups.get(e.date).push(e)
  }
  const sortedDates = Array.from(groups.keys()).sort()
  return sortedDates.map((date) => ({
    date,
    events: groups.get(date).slice().sort((a, b) => a.startTime.localeCompare(b.startTime)),
  }))
}

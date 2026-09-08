// An occurrence can have multiple track records. Keep source IDs intact and
// use one existing ID for its saved state. Different dates/times stay distinct.
export function createTrackAgenda(events, tracks = []) {
  const enabled = tracks.length > 0
  const validTrack = value => tracks.some(track => track.id === value) ? value : null
  const groups = new Map()
  for (const event of events) {
    const key = enabled ? JSON.stringify([event.url || event.title, event.date, event.startTime, event.endTime, event.room]) : event.id
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(event)
  }
  const byId = new Map()
  for (const group of groups.values()) for (const event of group) byId.set(event.id, group)
  const favoriteId = id => byId.get(id)?.[0].id ?? id
  const normalizeFavorites = favorites => new Set([...favorites].map(favoriteId))
  return {
    enabled, tracks, validTrack, favoriteId, normalizeFavorites,
    forTrack(track) {
      if (!enabled) return events
      const label = tracks.find(item => item.id === track)?.label
      return label ? events.filter(event => event.topic === label) : []
    },
    saved(favorites, track) {
      const normalized = normalizeFavorites(favorites)
      const label = tracks.find(item => item.id === track)?.label
      return [...groups.values()].filter(group => normalized.has(group[0].id))
        .map(group => group.find(event => event.topic === label) ?? group[0])
    },
    toggle(favorites, id) {
      const next = normalizeFavorites(favorites)
      const key = favoriteId(id)
      if (next.has(key)) next.delete(key); else next.add(key)
      return next
    },
  }
}

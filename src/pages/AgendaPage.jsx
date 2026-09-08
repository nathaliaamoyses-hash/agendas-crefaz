import { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header.jsx'
import FilterBar from '../components/FilterBar.jsx'
import EventCard from '../components/EventCard.jsx'
import EventDetail from '../components/EventDetail.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'
import Toast from '../components/Toast.jsx'
import { whatsappNumber } from '../config.js'
import AgendaTrackSelector from '../components/AgendaTrackSelector.jsx'
import { trackCopy } from '../data/tracks.js'
import { conferenceCopy as copy, sessionsForView, trackAgenda } from '../data/conference.js'
import { recordedSessions } from '../data/recordedsessions.js'
import { groupByDate } from '../utils/agenda.js'
import { formatEventDate } from '../utils/date.js'

export default function AgendaPage({ filter, setFilter, favorites, toggleFavorite, track, onTrackChange }) {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [toastVisible, setToastVisible] = useState(false)
  const recorded = filter === 'recorded'
  const groups = useMemo(() => {
    if (!recorded) return groupByDate(sessionsForView(filter, favorites, track)).map(group => ({ label: formatEventDate(group.date), events: group.events }))
    const themes = new Map()
    recordedSessions.forEach(event => { const theme = event.area || 'Sessions'; if (!themes.has(theme)) themes.set(theme, []); themes.get(theme).push(event) })
    return Array.from(themes, ([label, events]) => ({ label, events }))
  }, [filter, favorites, recorded, track])
  useEffect(() => { document.body.style.overflow = selectedEvent ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [selectedEvent])
  useEffect(() => { setSelectedEvent(null) }, [track])
  function switchView(value) { setSelectedEvent(null); setFilter(value) }
  return <>
    <Header />
    <AgendaTrackSelector track={track} onChange={onTrackChange} />
    <FilterBar activeFilter={filter} onFilterChange={switchView} />
    <div className="conference-content">
      {recorded && <p className="recorded-introduction">{copy.recordedIntroduction} <a href={copy.recordedUrl} target="_blank" rel="noreferrer">{copy.recordedService}</a>.</p>}
      {trackAgenda.enabled && filter === 'mySchedule' && <p className="recorded-introduction">{trackCopy.schedule}</p>}
      {groups.length === 0 && <p className="conference-empty">{filter === 'mySchedule' ? copy.emptySchedule : trackAgenda.enabled && !track ? trackCopy.pending : copy.empty}</p>}
      {groups.map(group => <section key={group.label} className="conference-group"><h2>{group.label}</h2>{group.events.map(event => <EventCard key={event.id} event={event} recorded={recorded} isFavorited={favorites.has(trackAgenda.favoriteId(event.id))} onToggleFavorite={toggleFavorite} onSelect={setSelectedEvent} />)}</section>)}
    </div>
    {selectedEvent && <EventDetail event={selectedEvent} recorded={recorded} isFavorited={favorites.has(trackAgenda.favoriteId(selectedEvent.id))} onToggleFavorite={toggleFavorite} onClose={() => setSelectedEvent(null)} />}
    {whatsappNumber && <WhatsAppButton onOfflineTap={() => { setToastVisible(true); setTimeout(() => setToastVisible(false), 3000) }} />}
    <Toast message="Requires internet connection" visible={toastVisible} />
  </>
}

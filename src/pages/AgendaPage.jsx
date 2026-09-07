import { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header.jsx'
import FilterBar from '../components/FilterBar.jsx'
import EventCard from '../components/EventCard.jsx'
import EventDetail from '../components/EventDetail.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'
import Toast from '../components/Toast.jsx'
import { events } from '../data/events.js'
import { applyFilter, groupByDate } from '../utils/agenda.js'
import { formatEventDate } from '../utils/date.js'

export default function AgendaPage({ filter, setFilter, favorites, toggleFavorite }) {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [toastVisible, setToastVisible] = useState(false)

  const filteredEvents = useMemo(
    () => applyFilter(events, filter, favorites),
    [filter, favorites]
  )
  const grouped = useMemo(() => groupByDate(filteredEvents), [filteredEvents])

  useEffect(() => {
    document.body.style.overflow = selectedEvent ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedEvent])

  function showOfflineToast() {
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 3000)
  }

  return (
    <>
      <Header onOfflineTap={showOfflineToast} />
      <FilterBar activeFilter={filter} onFilterChange={setFilter} />

      <div className="px-3 py-4" style={{ background: '#F9FAFB', minHeight: '50vh' }}>
        {filteredEvents.length === 0 ? (
          <p className="text-center text-sm py-12" style={{ color: '#9CA3AF' }}>
            No events to show.
          </p>
        ) : (
          grouped.map((group) => (
            <section key={group.date} className="mb-6">
              <h2
                className="text-sm font-semibold uppercase tracking-wide mb-2 px-1"
                style={{ color: '#032D60' }}
              >
                {formatEventDate(group.date)}
              </h2>
              {group.events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isFavorited={favorites.has(event.id)}
                  onToggleFavorite={toggleFavorite}
                  onSelect={setSelectedEvent}
                />
              ))}
            </section>
          ))
        )}
      </div>

      {selectedEvent && (
        <EventDetail
          event={selectedEvent}
          isFavorited={favorites.has(selectedEvent.id)}
          onToggleFavorite={toggleFavorite}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      <WhatsAppButton onOfflineTap={showOfflineToast} />
      <Toast message="Requires internet connection" visible={toastVisible} />
    </>
  )
}

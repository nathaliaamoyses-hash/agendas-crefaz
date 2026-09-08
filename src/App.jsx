import { useMemo, useState } from 'react'
import { useAgendaTrack } from './hooks/useAgendaTrack.js'
import { trackAgenda } from './data/conference.js'
import AppShell from './components/AppShell.jsx'
import AgendaPage from './pages/AgendaPage.jsx'
import FoundationPage from './pages/FoundationPage.jsx'
import HomePage from './pages/HomePage.jsx'
import SanFranciscoPage from './pages/SanFranciscoPage.jsx'
import SundayPage from './pages/SundayPage.jsx'
import SundayDetailPage from './pages/SundayDetailPage.jsx'
import SfGuidePage from './pages/SfGuidePage.jsx'
import ContentDetailPage from './pages/ContentDetailPage.jsx'
import { sfGuidePages } from './data/sfGuides.js'
import { useFavorites } from './hooks/useFavorites.js'
import { useHashRoute } from './hooks/useHashRoute.js'
import { getRoute } from './routing/routes.js'

export default function App() {
  const path = useHashRoute()
  const route = getRoute(path)
  // Keep this client’s agenda choices when navigating away and back.
  const [filter, setFilter] = useState('all')
  const [selectedTripDate, setSelectedTripDate] = useState(null)
  const [favorites, toggleFavorite] = useFavorites()
  const [track, setTrack] = useAgendaTrack()
  const agendaEvents = useMemo(() => trackAgenda.forTrack(track), [track])

  return (
    <AppShell route={route} path={path}>
      {route?.id === 'dreamforce' ? (
        <AgendaPage
          track={track}
          onTrackChange={setTrack}
          filter={filter}
          setFilter={setFilter}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      ) : route?.id === 'home' ? (
        <HomePage selectedDate={selectedTripDate} onDateChange={setSelectedTripDate} track={track} onTrackChange={setTrack} agendaEvents={agendaEvents} />
      ) : route?.id === 'sanFrancisco' ? (
        <SanFranciscoPage />
      ) : route?.id === 'sunday' ? (
        <SundayPage />
      ) : route?.sundayChoiceId ? (
        <SundayDetailPage choiceId={route.sundayChoiceId} />
      ) : route?.contentRef ? (
        <ContentDetailPage reference={route.contentRef} />
      ) : route && Object.hasOwn(sfGuidePages, route.id) ? (
        <SfGuidePage guideId={route.id} />
      ) : (
        <FoundationPage route={route} />
      )}
    </AppShell>
  )
}

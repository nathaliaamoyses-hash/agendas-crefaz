import AgendaTrackSelector from '../components/AgendaTrackSelector.jsx'
import { trackAgenda } from '../data/conference.js'
import { trip } from '../data/trip.js'
import waterfront from '../assets/sf-waterfront.jpg'
import { destinations, homeCopy, sfCopy } from '../data/guide.js'
import DestinationCard from '../components/DestinationCard.jsx'
import WeatherSummary from '../components/WeatherSummary.jsx'
import TodaySection from '../components/TodaySection.jsx'

export default function HomePage({ selectedDate, onDateChange, track, onTrackChange, agendaEvents }) {
  return (
    <div className="companion-page home-page">
      <header className="week-hero">
        <p className="eyebrow">{homeCopy.eyebrow}</p>
        <h1>{trip.title}</h1>
        <p className="trip-dates">{trip.dateLabel}</p>
        <p className="welcome-copy">{homeCopy.welcome}</p>
      </header>
      <AgendaTrackSelector track={track} onChange={onTrackChange} />
      <div className="sf-waterfront home-waterfront"><img src={waterfront} alt={sfCopy.imageAlt} width="1200" height="630" /></div>
      <WeatherSummary />
      <section className="destination-grid" aria-label={homeCopy.destinationsLabel}>
        {destinations.map(destination => <DestinationCard key={destination.id} destination={destination} />)}
      </section>
      <TodaySection selectedDate={selectedDate} onDateChange={onDateChange} agendaEvents={agendaEvents} awaitingTrack={trackAgenda.enabled && !track} />
    </div>
  )
}

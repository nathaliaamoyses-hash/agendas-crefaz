import { trip } from '../data/trip.js'
import { destinations, homeCopy } from '../data/guide.js'
import DestinationCard from '../components/DestinationCard.jsx'
import WeatherSummary from '../components/WeatherSummary.jsx'
import TodaySection from '../components/TodaySection.jsx'

export default function HomePage({ selectedDate, onDateChange }) {
  return (
    <div className="companion-page home-page">
      <header className="week-hero">
        <p className="eyebrow">{homeCopy.eyebrow}</p>
        <h1>{trip.title}</h1>
        <p className="trip-dates">{trip.dateLabel}</p>
        <p className="welcome-copy">{homeCopy.welcome}</p>
      </header>
      <WeatherSummary />
      <section className="destination-grid" aria-label={homeCopy.destinationsLabel}>
        {destinations.map(destination => <DestinationCard key={destination.id} destination={destination} />)}
      </section>
      <TodaySection selectedDate={selectedDate} onDateChange={onDateChange} />
    </div>
  )
}

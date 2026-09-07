import { weatherCopy } from '../data/guide.js'
import useWeather from '../hooks/useWeather.js'
import { weatherService, serviceCopy } from '../data/services.js'
import { trip } from '../data/trip.js'

export default function WeatherSummary() {
  const { reading, cached } = useWeather()
  const hasReading = reading && Number.isFinite(reading.temperatureC) &&
    typeof reading.condition === 'string' && reading.condition.length > 0 &&
    Number.isFinite(Date.parse(reading.observedAt))
  return (
    <aside className="weather-summary" aria-label={weatherCopy.location}>
      <span className="weather-icon" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M7 18a4 4 0 0 1-.8-7.9A6 6 0 0 1 18 9a4.5 4.5 0 0 1 .5 9H7Z" />
        </svg>
      </span>
      <div>
        <p className="eyebrow">{weatherCopy.location}</p>
        <p className="weather-value">
          {hasReading ? `${Math.round(reading.temperatureC)}°C · ${reading.condition}` : weatherCopy.unavailable}
        </p>
      </div>
      {hasReading && <p className="weather-note">
          <>{weatherService.stationLabel} · {cached ? serviceCopy.weatherSaved : serviceCopy.weatherObserved} <time dateTime={reading.observedAt}>
            {new Intl.DateTimeFormat(trip.locale, { timeZone: trip.timeZone, month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }).format(new Date(reading.observedAt))}
          </time></>
      </p>}
    </aside>
  )
}

import { contentCopy as copy } from '../data/sunday.js'
import PlaceCard from './PlaceCard.jsx'

export default function RouteStop({ stop, number, sources }) {
  const place = sources.place.find(item => item.id === stop.placeId)
  if (!place) return null
  const nearby = stop.foodNearbyIds.map(id => sources.place.find(item => item.id === id)).filter(Boolean)
  return (
    <li className="route-stop">
      <span className="stop-number" aria-hidden="true">{String(number).padStart(2, '0')}</span>
      <div className="stop-content">
        <div className="stop-meta">
          {stop.flag && <span className="stop-flag">{copy.flags[stop.flag]}</span>}
          {stop.durationMinutes != null && <span>{stop.durationMinutes} {copy.minutes}</span>}
        </div>
        <PlaceCard place={place} neighborhoods={sources.neighborhood} />
        {stop.guidance && <p className="stop-guidance">{stop.guidance}</p>}
        {nearby.length > 0 && <details className="food-nearby"><summary>{copy.foodNearby}</summary><div>{nearby.map(item => <PlaceCard key={item.id} place={item} neighborhoods={sources.neighborhood} headingLevel={4} />)}</div></details>}
      </div>
    </li>
  )
}

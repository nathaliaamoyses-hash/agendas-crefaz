import { routeHref } from '../routing/routes.js'

export default function DestinationCard({ destination }) {
  return (
    <a className={`destination-card destination-${destination.tone}`} href={routeHref(destination.path)}>
      <span className="eyebrow">{destination.label}</span>
      <h2>{destination.title}</h2>
      <p>{destination.description}</p>
      <span className="card-action">{destination.action}<span aria-hidden="true">↗</span></span>
    </a>
  )
}

import { contentCopy as copy } from '../data/sunday.js'
import { ContentImage, DraftLabel, ExternalAction, Fact } from './ContentPrimitives.jsx'
import RouteStop from './RouteStop.jsx'
import PlaceCard from './PlaceCard.jsx'
import { contentPath, resolveContent } from '../utils/content.js'
import { routeHref } from '../routing/routes.js'

export default function Route({ route, sources }) {
  const extensions = route.optionalExtensionPlaceIds.map(id => sources.place.find(place => place.id === id)).filter(Boolean)
  return (
    <div className="route-detail">
      <header className="detail-intro">
        <DraftLabel status={route.status} />
        <h1>{route.name}</h1>
        <p className="guide-lede">{route.shortDescription}</p>
        {route.bestFor && <p className="route-best">{route.bestFor}</p>}
        <ContentImage image={route.image} />
      </header>
      <dl className="content-facts">
        <Fact label={copy.start}>{route.suggestedStartTime}</Fact>
        <Fact label={copy.duration}>{route.durationLabel ?? (route.durationMinutes != null ? `${route.durationMinutes} ${copy.minutes}` : null)}</Fact>
      </dl>
      {route.departureGuidance && <aside className="departure-callout">
        <h2>{copy.departure}</h2>
        <dl className="content-facts"><Fact label={copy.departure}>{route.departureTime}</Fact><Fact label={copy.arrival}>{route.arrivalTime}</Fact></dl>
        <p>{route.departureGuidance}</p>
      </aside>}
      {route.milestones.length > 0 && <section className="route-section"><h2>{copy.milestones}</h2><ol className="milestone-list">{route.milestones.map((milestone, index) => <li key={index}><strong>{milestone.time ?? copy.pending} · {milestone.label}</strong>{milestone.guidance && <p>{milestone.guidance}</p>}</li>)}</ol></section>}
      {route.related.length > 0 && <nav className="content-actions" aria-label={copy.relatedPlans}>{route.related.map(reference => {
        const entry = resolveContent(reference, sources)
        const path = entry?.path ?? contentPath(reference)
        return entry && path ? <a className="content-action" key={`${reference.kind}:${reference.id}`} href={routeHref(path)}>{entry.name ?? entry.title}<span aria-hidden="true">→</span></a> : null
      })}</nav>}
      <section className="route-outline" aria-label={copy.routeOutline}>
        <h2>{copy.routeOutline}</h2>
        <ol>{route.stops.map(stop => <li key={stop.placeId}>{sources.place.find(place => place.id === stop.placeId)?.name}</li>)}</ol>
        <ExternalAction href={route.directionsUrl}>{copy.map}</ExternalAction>
        <p className="content-muted">{copy.offlineMaps}</p>
      </section>
      <section className="route-section"><h2>{copy.stops}</h2><ol className="route-stops">{route.stops.map((stop, index) => <RouteStop key={stop.placeId} stop={stop} number={index + 1} sources={sources} />)}</ol></section>
      {extensions.length > 0 && <details className="route-extensions"><summary>{copy.extraTime}</summary><p>{copy.extensionNote}</p><div className="content-card-grid">{extensions.map(place => <PlaceCard key={place.id} place={place} neighborhoods={sources.neighborhood} />)}</div></details>}
      {route.runningLateGuidance && <aside className="running-late"><h2>{copy.runningLate}</h2><p>{route.runningLateGuidance}</p></aside>}
    </div>
  )
}

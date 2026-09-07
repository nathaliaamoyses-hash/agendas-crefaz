import { contentPath } from '../utils/content.js'
import { routeHref } from '../routing/routes.js'
import { sfGuideCopy } from '../data/sfGuides.js'
import { contentCopy as copy } from '../data/sunday.js'
import { ContentImage, DraftLabel, ExternalAction } from './ContentPrimitives.jsx'

export default function PlaceCard({ place, neighborhoods = [], headingLevel = 3, linkToDetails = false }) {
  if (!place) return null
  const Heading = `h${headingLevel}`
  const neighborhood = neighborhoods.find(item => item.id === place.neighborhoodId)
  return (
    <article className="place-card">
      <ContentImage image={place.image} />
      <div className="place-body">
        <DraftLabel status={place.status} />
        <Heading>{linkToDetails ? <a href={routeHref(contentPath({ kind: 'place', id: place.id }))}>{place.name}</a> : place.name}</Heading>
        {neighborhood && <p className="place-neighborhood"><a href={routeHref(contentPath({ kind: 'neighborhood', id: neighborhood.id }))}>{neighborhood.name} <span aria-hidden="true">→</span></a></p>}
        {place.shortDescription && <p>{place.shortDescription}</p>}
        <dl className="place-facts">
          {place.whereItFits && <div><dt>{sfGuideCopy.whereItFits}</dt><dd>{place.whereItFits}</dd></div>}
          {['whyGo', 'whatToOrder', 'whatToLookFor', 'bestFor', 'hours', 'priceIndication'].map(key => place[key] && <div key={key}><dt>{copy[key]}</dt><dd>{place[key]}</dd></div>)}
        </dl>
        {place.address && <p className="place-address">{place.address}</p>}
        <div className="content-actions">
          <ExternalAction href={place.directionsUrl}>{copy.directions}</ExternalAction>
          <ExternalAction href={place.reservationUrl}>{copy.reservation}</ExternalAction>
          <ExternalAction href={place.externalUrl}>{copy.website}</ExternalAction>
        </div>
        {!place.directionsUrl && <p className="content-muted">{copy.directionsPending}</p>}
      </div>
    </article>
  )
}

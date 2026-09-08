import { contentPath } from '../utils/content.js'
import { routeHref } from '../routing/routes.js'
import { contentCopy as copy } from '../data/sunday.js'
import { ContentImage, TextContent, ExternalAction } from './ContentPrimitives.jsx'
export default function PlaceCard({ place, headingLevel = 3, linkToDetails = false }) {
  if (!place) return null
  const Heading = `h${headingLevel}`
  return <article className="place-card"><ContentImage image={place.image} /><div className="place-body">
    <Heading>{linkToDetails ? <a href={routeHref(contentPath({ kind: 'place', id: place.id }))}>{place.name}</a> : place.name}</Heading>
    {place.address && <p className="place-address">{place.directionsUrl ? <ExternalAction href={place.directionsUrl}>{place.address}</ExternalAction> : place.address}</p>}
    {place.shortDescription && <p>{place.shortDescription}</p>}
    <dl className="place-facts">{['whyGo', 'whatToOrder', 'whatToLookFor', 'bestFor'].map(key => place[key] && <div key={key}><dt>{copy[key]}</dt><dd><TextContent text={place[key]} /></dd></div>)}</dl>
  </div></article>
}

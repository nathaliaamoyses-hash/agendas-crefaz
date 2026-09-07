import { contentPath } from '../utils/content.js'
import { routeHref } from '../routing/routes.js'
import { ContentImage, DraftLabel, ExternalAction } from './ContentPrimitives.jsx'
import { sfGuideCopy as copy } from '../data/sfGuides.js'
import { contentCopy } from '../data/sunday.js'

export default function ActivityCard({ activity, sources }) {
  const place = sources.place.find(item => item.id === activity.placeId)
  const neighborhood = sources.neighborhood.find(item => item.id === (activity.neighborhoodId ?? place?.neighborhoodId))
  return <article className="activity-card">
    <ContentImage image={activity.image} />
    <div className="activity-card-body">
      <DraftLabel status={activity.status} />
      {activity.optional && <p className="stop-flag">{copy.optional}</p>}
      <h3><a href={routeHref(contentPath({ kind: 'activity', id: activity.id }))}>{activity.name}</a></h3>
      <p>{activity.shortDescription}</p>
      <dl className="place-facts">
        {activity.whyGo && <div><dt>{copy.whyGo}</dt><dd>{activity.whyGo}</dd></div>}
        {activity.bestFor && <div><dt>{contentCopy.bestFor}</dt><dd>{activity.bestFor}</dd></div>}
        <div><dt>{copy.duration}</dt><dd>{activity.durationLabel ?? (activity.durationMinutes != null ? `${activity.durationMinutes} ${contentCopy.minutes}` : contentCopy.pending)}</dd></div>
      </dl>
      {neighborhood && <a className="content-action" href={routeHref(contentPath({ kind: 'neighborhood', id: neighborhood.id }))}>{neighborhood.name} <span aria-hidden="true">→</span></a>}
      <div className="content-actions"><a className="content-action" href={routeHref(contentPath({ kind: 'activity', id: activity.id }))}>{copy.details}<span aria-hidden="true">→</span></a><ExternalAction href={activity.directionsUrl ?? place?.directionsUrl}>{contentCopy.directions}</ExternalAction></div>
    </div>
  </article>
}

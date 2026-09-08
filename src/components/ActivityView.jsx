import { sfGuideCopy } from '../data/sfGuides.js'
import RelatedContent from './RelatedContent.jsx'
import { contentCopy as copy } from '../data/sunday.js'
import { ContentImage, DraftLabel, ExternalAction, Fact, TextContent } from './ContentPrimitives.jsx'
import { formatEventDate } from '../utils/date.js'
import PlaceCard from './PlaceCard.jsx'
import SharedPlanCard from './SharedPlanCard.jsx'

export default function ActivityView({ activity, sources, variant = 'outing' }) {
  const isGame = variant === 'game'
  const venue = sources.place.find(place => place.id === activity.placeId)
  const meeting = sources.sharedPlan.find(plan => plan.id === activity.meetingPlanId)
  const schedule = activity.status === 'ready' ? activity.schedule : null
  return (
    <div className="activity-detail">
      <header className="detail-intro">
        <DraftLabel status={activity.status} />
        <h1>{activity.name}</h1>
        {activity.optional && <p className="stop-flag">{sfGuideCopy.optional}</p>}
        <p className="guide-lede">{activity.shortDescription}</p>
        {activity.bestFor && <p className="route-best">{activity.bestFor}</p>}
        <ContentImage image={activity.image} />
      </header>
      {activity.whyGo && <section className="route-section"><h2>{sfGuideCopy.whyGo}</h2><p>{activity.whyGo}</p></section>}
      <dl className="content-facts">
        {(schedule?.date ?? activity.date) && <Fact label={isGame ? copy.gameDate : sfGuideCopy.plannedDate}>{formatEventDate(schedule?.date ?? activity.date)}</Fact>}
        {(isGame || schedule) && <Fact label={isGame ? copy.gameTime : sfGuideCopy.start}>{schedule?.startTime}</Fact>}
        {(isGame || activity.arrivalTime) && <Fact label={copy.arrival}>{activity.arrivalTime}</Fact>}
        <Fact label={copy.duration}>{activity.durationLabel ?? (activity.durationMinutes != null ? `${activity.durationMinutes} ${copy.minutes}` : null)}</Fact>
      </dl>
      <ExternalAction href={activity.directionsUrl}>{copy.directions}</ExternalAction>
      <ExternalAction href={activity.externalUrl}>{copy.website}</ExternalAction>
      {venue && <PlaceCard place={venue} neighborhoods={sources.neighborhood} headingLevel={2} />}
      {meeting && <section className="route-section"><h2>{copy.meetingPoint}</h2><SharedPlanCard plan={meeting} sources={sources} meeting /></section>}
      <section className="route-section"><h2>{isGame ? copy.gameDetails : sfGuideCopy.detailsTitle}</h2><div className="content-card-grid">{activity.infoBlocks.map(block => <article className="info-card" key={block.id}><h3>{block.title}</h3><TextContent text={block.text} /></article>)}</div></section>
      <RelatedContent references={activity.related} sources={sources} />
    </div>
  )
}

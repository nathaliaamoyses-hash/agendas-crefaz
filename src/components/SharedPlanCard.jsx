import { contentCopy as copy } from '../data/sunday.js'
import { ContentImage, DraftLabel, Fact } from './ContentPrimitives.jsx'
import PlaceCard from './PlaceCard.jsx'

export default function SharedPlanCard({ plan, sources, meeting = false }) {
  if (!plan) return null
  const placeId = meeting ? plan.meetingPlaceId : plan.subject?.kind === 'place' ? plan.subject.id : plan.meetingPlaceId
  const place = sources.place.find(item => item.id === placeId)
  const meetingPlace = sources.place.find(item => item.id === plan.meetingPlaceId)
  const schedule = plan.status === 'ready' ? plan.schedule : null
  return (
    <article className="shared-plan-card">
      <ContentImage image={plan.image} />
      <DraftLabel status={plan.status} />
      <h3>{plan.name}</h3>
      {plan.shortDescription && <p>{plan.shortDescription}</p>}
      <dl className="content-facts">
        <Fact label={meeting ? copy.meetingTime : copy.planTime}>{schedule?.startTime}</Fact>
        <Fact label={meeting ? copy.meetingPoint : copy.venue}>{place?.name}</Fact>
        {!meeting && meetingPlace && meetingPlace.id !== place?.id && <Fact label={copy.meetingPoint}>{meetingPlace.name}</Fact>}
      </dl>
      {plan.instructions && <p>{plan.instructions}</p>}
      {place && <PlaceCard place={place} neighborhoods={sources.neighborhood} headingLevel={4} />}
    </article>
  )
}

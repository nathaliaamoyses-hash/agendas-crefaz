import { contentCopy as copy } from '../data/sunday.js'
import { ContentImage, Fact, TextContent } from './ContentPrimitives.jsx'
import PlaceCard from './PlaceCard.jsx'
export default function SharedPlanCard({ plan, sources, meeting = false }) {
  if (!plan) return null
  const placeId = meeting ? plan.meetingPlaceId : plan.subject?.kind === 'place' ? plan.subject.id : plan.meetingPlaceId
  const place = sources.place.find(item => item.id === placeId)
  const schedule = plan.status === 'ready' ? plan.schedule : null
  return <article className="shared-plan-card"><ContentImage image={plan.image} /><h3>{plan.name}</h3>
    {plan.shortDescription && <p>{plan.shortDescription}</p>}
    {(schedule || place) && <dl className="content-facts">
      {schedule && <Fact label={meeting ? copy.meetingTime : copy.planTime}>{schedule.startTime}{schedule.endTime ? `–${schedule.endTime}` : ''}</Fact>}
      {place && <Fact label={meeting ? copy.meetingPoint : copy.venue}>{place.name}</Fact>}
    </dl>}
    <TextContent text={plan.instructions} />
    {place && <PlaceCard place={place} headingLevel={4} />}
  </article>
}

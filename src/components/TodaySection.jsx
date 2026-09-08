import { trip } from '../data/trip.js'
import { todayCopy as copy, earlyArrivalCard, eveningFirstDates } from '../data/today.js'
import { events } from '../data/events.js'
import { trackCopy } from '../data/tracks.js'
import { createContentSources, dayPlans } from '../data/content/index.js'
import { formatEventDate } from '../utils/date.js'
import { composeDay, selectTripDay, tripDates } from '../utils/today.js'
import { contentPath } from '../utils/content.js'
import { routeHref } from '../routing/routes.js'
import useVenueDate from '../hooks/useVenueDate.js'

const dates = tripDates(trip)


function TodayItem({ item }) {
  const { reference, content } = item
  const isGuide = reference.kind === 'guide'
  const isAgenda = reference.kind === 'agendaEvent'
  const schedule = isAgenda ? content : content.status === 'ready' ? content.schedule : null
  const path = isGuide ? content.path : isAgenda ? '/dreamforce' : contentPath(reference)
  return (
    <li className="today-card">
      {content.status === 'draft' && <span className="today-status">{isGuide ? copy.guideDraft : copy.draft}</span>}
      <h4>{content.title ?? content.name}</h4>
      {schedule?.startTime && <p className="today-time"><time dateTime={schedule.startTime}>{schedule.startTime}</time>{schedule.endTime && <>–<time dateTime={schedule.endTime}>{schedule.endTime}</time></>}</p>}
      {(content.description ?? content.shortDescription) && <p>{content.description ?? content.shortDescription}</p>}
      {path && <a className="today-link" href={routeHref(path)}>{isAgenda ? copy.viewAgenda : isGuide ? copy.openGuide : copy.viewPlan} <span aria-hidden="true">→</span></a>}
    </li>
  )
}

export default function TodaySection({ selectedDate, onDateChange, agendaEvents = events, awaitingTrack = false }) {
  const currentDate = useVenueDate(trip.timeZone)
  const { date, period, isToday } = selectTripDay(currentDate, selectedDate, trip)
  const day = composeDay(date, dayPlans, createContentSources(agendaEvents), trip)
  const title = period === 'before' ? copy.preview : period === 'after' ? copy.recap : isToday ? copy.today : copy.selected
  const context = period === 'before' ? copy.beforeTrip : period === 'after' ? copy.afterTrip : !isToday ? copy.previewDay : null
  const empty = !day.agendaPending && ['agenda', 'primary', 'secondary', 'evening', 'notices'].every(key => day[key].length === 0)
  const earlyArrival = date < earlyArrivalCard.beforeDate
  const groupEntries = Object.entries(copy.groups)
  const orderedGroups = eveningFirstDates.includes(date)
    ? [...groupEntries.filter(([key]) => key === 'evening'), ...groupEntries.filter(([key]) => key !== 'evening')]
    : groupEntries
  return (
    <section className="today-section" aria-labelledby="today-title">
      <div className="section-heading">
        <h2 id="today-title">{title}</h2>
        <span className="eyebrow">{copy.timezone}</span>
      </div>
      {context && <p className="today-context">{context}</p>}
      <div className="today-controls">
        <label htmlFor="trip-day">{copy.dateLabel}</label>
        <select id="trip-day" value={date} onChange={event => onDateChange(event.target.value)}>
          {dates.map(value => <option key={value} value={value}>{formatEventDate(value)}</option>)}
        </select>
        {period === 'during' && !isToday && <button type="button" onClick={() => onDateChange(null)}>{copy.returnToday}</button>}
      </div>
      <div className="today-plan" aria-live="polite" aria-atomic="true">
        <p className="today-date"><time dateTime={date}>{formatEventDate(date)}</time></p>
        {orderedGroups.map(([key, label]) => (
          (day[key].length > 0 || (key === 'agenda' && day.agendaPending)) && (
            <section className={`today-group today-group-${key}`} key={key} aria-labelledby={`today-${key}`}>
              <h3 id={`today-${key}`}>{label}</h3>
              {key === 'agenda' && day.agendaPending && <p className="today-empty">{awaitingTrack ? trackCopy.pending : copy.agendaPending}</p>}
              {day[key].length > 0 && <ul className="today-cards">{day[key].map(item => <TodayItem key={`${item.reference.kind}:${item.reference.id}`} item={item} />)}</ul>}
            </section>
          )
        ))}
        {empty && <div className="today-empty"><p>{earlyArrival ? earlyArrivalCard.title : copy.empty}</p><a className="today-link" href={routeHref(earlyArrival ? earlyArrivalCard.path : '/sf')}>{copy.explore} <span aria-hidden="true">→</span></a></div>}
      </div>
    </section>
  )
}

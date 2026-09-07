import { sunday, sundayCopy as copy } from '../data/sunday.js'
import { sfCopy } from '../data/guide.js'
import { createContentSources } from '../data/content/index.js'
import { resolveContent } from '../utils/content.js'
import { routeHref } from '../routing/routes.js'
import { formatEventDate } from '../utils/date.js'
import { DraftLabel, ContentImage } from '../components/ContentPrimitives.jsx'
import SharedPlanCard from '../components/SharedPlanCard.jsx'
import SundayPreference from '../components/SundayPreference.jsx'

const sources = createContentSources()
export default function SundayPage() {
  return (
    <div className="companion-page sunday-page">
      <a className="back-link" href={routeHref('/sf')}>← {sfCopy.backLabel}</a>
      <header className="detail-intro">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p className="trip-dates"><time dateTime={sunday.date}>{formatEventDate(sunday.date)}</time></p>
        <p className="guide-lede">{copy.introduction}</p>
      </header>
      <section className="sunday-choices" aria-label={copy.choices}>
        {sunday.choices.map(choice => {
          const content = resolveContent(choice.content, sources)
          return <a className={`sunday-choice sunday-choice-${choice.tone}`} href={routeHref(choice.path)} key={choice.id}>
            <ContentImage image={content.image} />
            <div className="sunday-choice-body">
              <span className="choice-number" aria-hidden="true">{choice.number}</span>
              <DraftLabel status={content.status} />
              <h2>{content.name}</h2>
              <p>{content.shortDescription}</p>
              <p className="choice-best">{content.bestFor}</p>
              {content.durationLabel && <p className="choice-duration">{content.durationLabel}</p>}
              <span className="card-action">{choice.action}<span aria-hidden="true">↗</span></span>
            </div>
          </a>
        })}
      </section>
      <p className="sunday-draft-note">{copy.draft}</p>
      <section className="sunday-dinner"><h2>{copy.dinner}</h2><p>{copy.dinnerIntro}</p><SharedPlanCard plan={sources.sharedPlan.find(plan => plan.id === sunday.dinnerId)} sources={sources} /></section>
      <SundayPreference sources={sources} />
    </div>
  )
}

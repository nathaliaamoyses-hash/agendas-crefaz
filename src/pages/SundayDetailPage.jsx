import { sunday, sundayCopy as copy } from '../data/sunday.js'
import { createContentSources } from '../data/content/index.js'
import { resolveContent } from '../utils/content.js'
import { routeHref } from '../routing/routes.js'
import Route from '../components/Route.jsx'
import ActivityView from '../components/ActivityView.jsx'
import SharedPlanCard from '../components/SharedPlanCard.jsx'

const sources = createContentSources()
export default function SundayDetailPage({ choiceId }) {
  const choice = sunday.choices.find(item => item.id === choiceId)
  const content = resolveContent(choice.content, sources)
  const dinnerId = choice.content.kind === 'activity' ? content.afterPlanId : sunday.dinnerId
  const dinner = sources.sharedPlan.find(plan => plan.id === dinnerId)
  return (
    <div className="companion-page sunday-detail-page">
      <a className="back-link" href={routeHref('/sf/sunday')}>← {copy.back}</a>
      {choice.content.kind === 'route' ? <Route route={content} sources={sources} /> : <ActivityView activity={content} sources={sources} variant="game" />}
      {dinner && <section className="sunday-dinner"><h2>{copy.dinner}</h2><SharedPlanCard plan={dinner} sources={sources} /></section>}
      <a className="back-link" href={routeHref('/sf/sunday')}>← {copy.back}</a>
    </div>
  )
}

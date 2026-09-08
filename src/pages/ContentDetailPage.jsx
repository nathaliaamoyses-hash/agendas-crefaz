import { createContentSources } from '../data/content/index.js'
import { sfCopy } from '../data/guide.js'
import { sfGuideCopy as copy } from '../data/sfGuides.js'
import { resolveContent, guidesForContent } from '../utils/content.js'
import { routeHref } from '../routing/routes.js'
import Roundup from '../components/Roundup.jsx'
import SharedPlanCard from '../components/SharedPlanCard.jsx'
import PlaceCard from '../components/PlaceCard.jsx'
import ActivityView from '../components/ActivityView.jsx'
import RelatedContent from '../components/RelatedContent.jsx'
import { ContentImage, DraftLabel } from '../components/ContentPrimitives.jsx'

const sources = createContentSources()
export default function ContentDetailPage({ reference }) {
  const content = resolveContent(reference, sources)
  const alreadyLinked = content?.related ?? []
  const guideReferences = guidesForContent(reference).filter(guide => !alreadyLinked.some(item => item.kind === guide.kind && item.id === guide.id))
  const neighborhood = reference.kind === 'place' && content.neighborhoodId ? [{ kind: 'neighborhood', id: content.neighborhoodId }] : []
  return <div className="companion-page content-detail-page">
    <a className="back-link" href={routeHref('/sf')}>← {sfCopy.backLabel}</a>
    {reference.kind === 'roundup' ? <Roundup content={content} sources={sources} /> : reference.kind === 'sharedPlan' ? <><h1>{content.name}</h1><SharedPlanCard plan={content} sources={sources} /></> : reference.kind === 'place' ? <PlaceCard place={content} neighborhoods={sources.neighborhood} headingLevel={1} /> : reference.kind === 'activity' ? <ActivityView activity={content} sources={sources} /> : <>
      <header className="detail-intro"><DraftLabel status={content.status} /><h1>{content.name}</h1><p className="guide-lede">{content.shortDescription}</p><ContentImage image={content.image} /></header>
      {content.whyGo && <section className="route-section"><h2>{copy.whyGo}</h2><p>{content.whyGo}</p></section>}
      <RelatedContent references={content.related} sources={sources} title={copy.neighborhood} />
    </>}
    <RelatedContent references={neighborhood} sources={sources} title={copy.neighborhood} />
    <RelatedContent references={guideReferences} sources={sources} title={copy.inGuides} />
  </div>
}

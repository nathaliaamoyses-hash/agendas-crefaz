import { useRef } from 'react'
import { sfGuidePages, sfGuideCopy as copy } from '../data/sfGuides.js'
import { sfCopy, sfSections } from '../data/guide.js'
import { createContentSources } from '../data/content/index.js'
import { resolveContent } from '../utils/content.js'
import { routeHref } from '../routing/routes.js'
import PlaceCard from '../components/PlaceCard.jsx'
import ActivityCard from '../components/ActivityCard.jsx'
import ReferenceCard from '../components/ReferenceCard.jsx'
import PracticalTipCard from '../components/PracticalTipCard.jsx'
import { ExternalAction } from '../components/ContentPrimitives.jsx'

const sources = createContentSources()
export default function SfGuidePage({ guideId }) {
  const page = sfGuidePages[guideId]
  const guide = sfSections.find(section => section.id === guideId)
  const sections = useRef({})
  function jump(id) {
    const section = sections.current[id]
    section?.focus({ preventScroll: true })
    section?.scrollIntoView({ block: 'start' })
  }
  return <div className={`companion-page sf-guide-page sf-guide-${guideId}`}>
    <a className="back-link" href={routeHref('/sf')}>← {sfCopy.backLabel}</a>
    <header className="detail-intro"><p className="eyebrow">{page.eyebrow}</p><h1>{guide.title}</h1>{page.framing && <p className="guide-framing">{page.framing}</p>}<p className="guide-lede">{guide.description}</p></header>
    {guide.status === 'draft' && <p className="guide-draft-banner">{copy.draft}</p>}
    {page.sections.length > 1 && <nav className="guide-jumps" aria-label={copy.jump}>{page.sections.map(section => <button type="button" key={section.id} onClick={() => jump(section.id)}>{section.title}</button>)}</nav>}
    {page.sections.map(section => <section key={section.id} ref={element => { sections.current[section.id] = element }} className="sf-content-section" tabIndex={-1} aria-labelledby={`guide-${guideId}-${section.id}`}>
      <h2 id={`guide-${guideId}-${section.id}`}>{section.title}</h2>
      {section.description && <p className="section-description">{section.description}</p>}
      <div className={section.presentation === 'links' ? 'practical-link-list' : 'content-card-grid'}>{section.entries.map(reference => {
        const content = resolveContent(reference, sources)
        if (!content) return null
        const key = `${reference.kind}:${reference.id}`
        if (section.presentation === 'links') return <ExternalAction key={key} href={content.externalUrl}>{content.externalLabel ?? content.name}</ExternalAction>
        if (reference.kind === 'place' && ['view-bar-pick', 'cocktail-pick'].includes(reference.id)) return <ReferenceCard key={key} reference={reference} sources={sources} />
        if (reference.kind === 'place') return <PlaceCard key={key} place={content} neighborhoods={sources.neighborhood} linkToDetails />
        if (reference.kind === 'activity') return <ActivityCard key={key} activity={content} sources={sources} />
        if (reference.kind === 'practicalTip') return <PracticalTipCard key={key} tip={content} sources={sources} />
        return <ReferenceCard key={key} reference={reference} sources={sources} />
      })}</div>
    </section>)}
    {guideId === 'practical' && <p className="sunday-draft-note">{copy.linkNote}</p>}
  </div>
}

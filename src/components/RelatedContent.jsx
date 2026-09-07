import ReferenceCard from './ReferenceCard.jsx'
import { sfGuideCopy as copy } from '../data/sfGuides.js'
import { resolveContent } from '../utils/content.js'

export default function RelatedContent({ references, sources, title = copy.related }) {
  const valid = references.filter(reference => resolveContent(reference, sources))
  if (!valid.length) return null
  return <section className="route-section"><h2>{title}</h2><div className="content-card-grid">{valid.map(reference => <ReferenceCard key={`${reference.kind}:${reference.id}`} reference={reference} sources={sources} />)}</div></section>
}

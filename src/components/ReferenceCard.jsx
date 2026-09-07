import { contentPath, resolveContent } from '../utils/content.js'
import { routeHref } from '../routing/routes.js'
import { ContentImage, DraftLabel } from './ContentPrimitives.jsx'
import { sfGuideCopy as copy } from '../data/sfGuides.js'

export default function ReferenceCard({ reference, sources, headingLevel = 3 }) {
  const content = resolveContent(reference, sources)
  if (!content) return null
  const path = content.path ?? contentPath(reference)
  const Heading = `h${headingLevel}`
  const Tag = path ? 'a' : 'article'
  return (
    <Tag className="reference-card" {...(path ? { href: routeHref(path) } : {})}>
      <ContentImage image={content.image} />
      <div className="reference-body">
        <DraftLabel status={content.status} />
        <Heading>{content.name ?? content.title}</Heading>
        {(content.shortDescription ?? content.description) && <p>{content.shortDescription ?? content.description}</p>}
        {path && <span className="card-action">{copy.view}<span aria-hidden="true">→</span></span>}
      </div>
    </Tag>
  )
}

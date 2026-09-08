import { ContentImage, DraftLabel, ExternalAction, TextContent } from './ContentPrimitives.jsx'
import { sfGuideCopy as copy } from '../data/sfGuides.js'
import { contentPath } from '../utils/content.js'
import { routeHref } from '../routing/routes.js'

export default function PracticalTipCard({ tip, sources }) {
  return <article className="practical-tip-card">
    <ContentImage image={tip.image} />
    <div className="reference-body">
      <DraftLabel status={tip.status} />
      <h3>{tip.name}</h3>
      <p>{tip.shortDescription}</p>
      {tip.infoBlocks.length > 0 && <details className="practical-details"><summary>{copy.detailsTitle}</summary><dl className="place-facts">{tip.infoBlocks.map(block => <div key={block.id}><dt>{block.title}</dt><dd><TextContent text={block.text} /></dd></div>)}</dl></details>}
      <div className="content-actions"><ExternalAction href={tip.externalUrl}>{tip.externalLabel ?? copy.official}</ExternalAction>
        {tip.related.map(reference => {
          const content = sources[reference.kind]?.find(entry => entry.id === reference.id)
          const path = content?.path ?? contentPath(reference)
          return content && path ? <a className="content-action" key={`${reference.kind}:${reference.id}`} href={routeHref(path)}>{content.name ?? content.title}<span aria-hidden="true">→</span></a> : null
        })}
      </div>
    </div>
  </article>
}

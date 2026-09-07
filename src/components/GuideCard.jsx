import { routeHref } from '../routing/routes.js'

export default function GuideCard({ section }) {
  return (
    <a className="guide-card" href={routeHref(section.path)}>
      <span className="guide-number" aria-hidden="true">{section.number}</span>
      <div>
        {section.dateLabel && <p className="eyebrow">{section.dateLabel}</p>}
        <h3>{section.title}</h3>
        <p className="guide-description">{section.description}</p>
      </div>
      <span className="guide-arrow" aria-hidden="true">↗</span>
    </a>
  )
}

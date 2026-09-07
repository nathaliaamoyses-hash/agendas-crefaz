import { sfCopy, sfSections } from '../data/guide.js'
import { routeHref } from '../routing/routes.js'
import GuideCard from '../components/GuideCard.jsx'
import waterfront from '../assets/sf-waterfront.jpg'

export default function SanFranciscoPage() {
  const sunday = sfSections.find(section => section.id === 'sunday')
  return (
    <div className="companion-page sf-page">
      <header className="sf-intro">
        <p className="eyebrow">{sfCopy.eyebrow}</p>
        <h1>{sfCopy.title}</h1>
        <p>{sfCopy.introduction}</p>
      </header>
      <div className="sf-waterfront"><img src={waterfront} alt={sfCopy.imageAlt} width="1200" height="630" /></div>
      <a className="sunday-feature" href={routeHref(sunday.path)}>
        <div>
          <p className="eyebrow">{sfCopy.sundayLabel}</p>
          <h2>{sfCopy.sundayTitle}</h2>
          <p className="sunday-description">{sfCopy.sundayDescription}</p>
        </div>
        <span className="card-action">{sfCopy.sundayAction}<span aria-hidden="true">↗</span></span>
      </a>
      <section className="guide-section" aria-labelledby="sf-guide-title">
        <h2 id="sf-guide-title">{sfCopy.guideTitle}</h2>
        <div className="guide-grid">
          {sfSections.filter(section => section.group === 'guide').map(section => <GuideCard key={section.id} section={section} />)}
        </div>
      </section>
      <section className="guide-section" aria-labelledby="free-time-title">
        <h2 id="free-time-title">{sfCopy.freeTimeTitle}</h2>
        <div className="free-time-grid">
          {sfSections.filter(section => section.group === 'freeTime').map(section => <GuideCard key={section.id} section={section} />)}
        </div>
      </section>
      <div className="practical-entry">
        {sfSections.filter(section => section.group === 'practical').map(section => <GuideCard key={section.id} section={section} />)}
      </div>
    </div>
  )
}

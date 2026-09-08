import { serviceCopy } from '../data/services.js'
import { useOnlineStatus } from '../hooks/useOnlineStatus.js'
import { contentCopy as copy } from '../data/sunday.js'

export function ContentImage({ image }) {
  return image ? <img className="content-image" src={image.src} alt={image.alt} loading="lazy" /> : null
}

export function DraftLabel({ status }) {
  return status === 'draft' ? <p className="today-status">{copy.draft}</p> : null
}

export function ExternalAction({ href, children }) {
  const online = useOnlineStatus()
  return typeof href === 'string' && href.startsWith('https://')
    ? <a className="content-action" href={href} target="_blank" rel="noreferrer" title={online ? serviceCopy.external : serviceCopy.offlineExternal}>{children}<span aria-hidden="true">↗</span></a>
    : null
}

export function Fact({ label, children }) {
  return <div><dt>{label}</dt><dd>{children || copy.pending}</dd></div>
}

// Editorial fields remain plain strings; preserve paragraphs and render bullet lines semantically.
export function TextContent({ text }) {
  if (!text) return null
  const groups = []
  for (const line of text.split('\n').map(line => line.trim()).filter(Boolean)) {
    if (line.startsWith('## ')) {
      groups.push({ heading: true, bullet: false, lines: [line.slice(3)] })
      continue
    }
    const bullet = /^[•*-]\s+/.test(line)
    const last = groups.at(-1)
    if (bullet && last?.bullet) last.lines.push(line.replace(/^[•*-]\s+/, ''))
    else groups.push({ bullet, lines: [bullet ? line.replace(/^[•*-]\s+/, '') : line] })
  }
  return groups.map((group, i) => group.heading ? <h4 className="editorial-subheading" key={i}>{group.lines[0]}</h4> : group.bullet ? <ul className="editorial-bullets" key={i}>{group.lines.map((line, j) => <li key={j}>{line}</li>)}</ul> : <p key={i}>{group.lines[0]}</p>)
}

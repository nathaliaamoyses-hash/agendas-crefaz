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

import { useEffect, useRef } from 'react'
import { useOnlineStatus } from '../hooks/useOnlineStatus.js'
import { serviceCopy } from '../data/services.js'
import PwaStatus from './PwaStatus.jsx'
import { companionCopy, trip } from '../data/trip.js'
import { routeHref, primaryRoutes } from '../routing/routes.js'

export default function AppShell({ route, path, children }) {
  const isOnline = useOnlineStatus()
  const mainRef = useRef(null)
  const previousPath = useRef(path)

  useEffect(() => {
    document.title = `${route?.label ?? companionCopy.notFoundTitle} · ${trip.title}`
    if (previousPath.current !== path) {
      mainRef.current?.focus({ preventScroll: true })
      window.scrollTo(0, 0)
      previousPath.current = path
    }
  }, [path, route])

  return (
    <div className="companion-shell">
      <a
        className="skip-link"
        href="#page-content"
        onClick={(event) => {
          event.preventDefault()
          mainRef.current?.focus()
        }}
      >
        {companionCopy.skipLink}
      </a>
      <nav aria-label={companionCopy.navigationLabel} className="companion-nav">
        {primaryRoutes.map((item) => (
          <a
            key={item.id}
            href={routeHref(item.path)}
            aria-current={item.id === route?.id ? 'page' : item.id === route?.parentId ? 'location' : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>
      {!isOnline && <p className="connection-banner" role="status">{serviceCopy.offline}</p>}
      <main id="page-content" ref={mainRef} tabIndex={-1}>
        {children}
      </main>
      <PwaStatus />
    </div>
  )
}

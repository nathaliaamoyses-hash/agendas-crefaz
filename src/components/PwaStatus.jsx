import { useEffect, useState } from 'react'
import { serviceCopy as copy } from '../data/services.js'
import InstallHint from './InstallHint.jsx'

export default function PwaStatus() {
  const [ready, setReady] = useState(false)
  const supported = 'serviceWorker' in navigator
  useEffect(() => {
    let active = true
    if (supported) navigator.serviceWorker.ready.then(() => { if (active) setReady(true) }).catch(() => {})
    return () => { active = false }
  }, [supported])
  if (import.meta.env.DEV) return null
  return <footer className="pwa-footer">
    <p role="status" data-offline-ready={ready}>{!supported ? copy.offlineUnavailable : ready ? copy.offlineReady : copy.offlinePreparing}</p>
    <InstallHint />
  </footer>
}

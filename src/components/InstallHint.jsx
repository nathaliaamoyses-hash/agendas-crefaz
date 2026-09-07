import { serviceCopy } from '../data/services.js'
import { useState } from 'react'

const STORAGE_KEY = 'cnx-install-hint-dismissed'

function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    navigator.standalone === true
  )
}

export default function InstallHint() {
  const [dismissed, setDismissed] = useState(() => {
    if (isStandalone()) return true
    try { return localStorage.getItem(STORAGE_KEY) === '1' } catch { return false }
  })

  if (dismissed) return null

  function dismiss() {
    try { localStorage.setItem(STORAGE_KEY, '1') } catch { /* ignore */ }
    setDismissed(true)
  }

  return (
    <div
      className="w-full flex items-start justify-between gap-2 px-4 py-2 text-xs"
      style={{
        background: '#EFF6FF',
        borderBottom: '1px solid #BFDBFE',
        color: '#032D60',
      }}
    >
      <span>
        {serviceCopy.install}
      </span>
      <button
        type="button"
        onClick={dismiss}
        aria-label={serviceCopy.dismissInstall}
        style={{
          flexShrink: 0,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: 18,
          lineHeight: 1,
          color: '#032D60',
          minWidth: 44, minHeight: 44, padding: '0 2px',
        }}
      >
        ×
      </button>
    </div>
  )
}

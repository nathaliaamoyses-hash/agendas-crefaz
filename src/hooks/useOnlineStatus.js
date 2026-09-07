import { useSyncExternalStore } from 'react'

// Connectivity is a device hint, not proof that a particular service is reachable.
// Initialize on offline reload and resync across routes/resume; SF links remain operable.
function subscribe(notify) {
  window.addEventListener('online', notify)
  window.addEventListener('offline', notify)
  window.addEventListener('pageshow', notify)
  return () => {
    window.removeEventListener('online', notify)
    window.removeEventListener('offline', notify)
    window.removeEventListener('pageshow', notify)
  }
}
export function useOnlineStatus() {
  return useSyncExternalStore(subscribe, () => navigator.onLine !== false, () => true)
}

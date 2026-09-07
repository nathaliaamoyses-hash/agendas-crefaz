import { useSyncExternalStore } from 'react'
import { pathFromHash } from '../routing/routes.js'

function subscribe(onChange) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

function getSnapshot() {
  return pathFromHash(window.location.hash)
}

export function useHashRoute() {
  return useSyncExternalStore(subscribe, getSnapshot, () => '/')
}

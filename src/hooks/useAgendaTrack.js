import { useEffect, useState } from 'react'
import { client } from '#client-config'
import { trackAgenda } from '../data/conference.js'

export function useAgendaTrack() {
  const [track, setTrack] = useState(() => {
    if (!trackAgenda.enabled) return null
    try { return trackAgenda.validTrack(localStorage.getItem(client.trackPreferenceKey)) }
    catch { return null }
  })
  useEffect(() => {
    if (!trackAgenda.enabled || !track) return
    try { localStorage.setItem(client.trackPreferenceKey, track) } catch { /* Private browsing may prevent persistence. */ }
  }, [track])
  return [track, value => setTrack(trackAgenda.validTrack(value))]
}

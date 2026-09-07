import { useEffect, useState } from 'react'
import { weatherService as config } from '../data/services.js'
import { readWeather, requestWeather, saveWeather, weatherDisplay, validReading } from '../utils/weather.js'

function storage() { try { return window.localStorage } catch { return null } }
export default function useWeather() {
  const [state, setState] = useState(() => weatherDisplay(readWeather(storage()), false))
  useEffect(() => {
    let reading = readWeather(storage())
    let fromNetwork = false
    let lastAttempt = 0
    let pending = false
    let active = true
    const controller = new AbortController()
    const emit = () => { if (active) setState(weatherDisplay(reading, fromNetwork && navigator.onLine !== false)) }
    async function refresh(force = false) {
      emit()
      if (pending || document.hidden || navigator.onLine === false || (!force && Date.now() - lastAttempt < config.refreshMs)) return
      pending = true
      lastAttempt = Date.now()
      try {
        const latest = await requestWeather({ signal: controller.signal })
        if (!active) return
        if (!validReading(reading) || Date.parse(latest.observedAt) >= Date.parse(reading.observedAt)) {
          reading = latest
          saveWeather(storage(), reading)
          fromNetwork = true
        }
      } catch { fromNetwork = false }
      finally { pending = false; emit() }
    }
    const resume = () => { void refresh() }
    const reconnect = () => { void refresh(true) }
    window.addEventListener('focus', resume)
    window.addEventListener('pageshow', resume)
    window.addEventListener('online', reconnect)
    window.addEventListener('offline', emit)
    document.addEventListener('visibilitychange', resume)
    const timer = setInterval(resume, 60000)
    void refresh()
    return () => {
      active = false
      controller.abort()
      clearInterval(timer)
      window.removeEventListener('focus', resume)
      window.removeEventListener('pageshow', resume)
      window.removeEventListener('online', reconnect)
      window.removeEventListener('offline', emit)
      document.removeEventListener('visibilitychange', resume)
    }
  }, [])
  return state
}

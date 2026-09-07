import { weatherService as config, serviceCopy } from '../data/services.js'

export function validReading(reading, now = Date.now()) {
  return !!reading && reading.stationId === config.stationId &&
    Number.isFinite(reading.temperatureC) && reading.temperatureC >= -90 && reading.temperatureC <= 65 &&
    typeof reading.condition === 'string' && reading.condition.length > 0 && reading.condition.length <= 200 &&
    Number.isFinite(Date.parse(reading.observedAt)) &&
    Date.parse(reading.observedAt) <= now + 5 * 60000 && now - Date.parse(reading.observedAt) <= config.retainMs
}

export function parseObservation(payload, now = Date.now()) {
  const p = payload?.properties
  if (p?.temperature?.unitCode !== 'wmoUnit:degC' || (typeof p.station !== 'string' || !p.station.endsWith(`/stations/${config.stationId}`))) return null
  const reading = {
    stationId: config.stationId, temperatureC: p.temperature.value,
    condition: typeof p.textDescription === 'string' && p.textDescription.trim() ? p.textDescription.trim() : serviceCopy.weatherUnknown,
    observedAt: p.timestamp,
  }
  return validReading(reading, now) ? reading : null
}

export function readWeather(storage, now = Date.now()) {
  try {
    const reading = JSON.parse(storage.getItem(config.cacheKey))
    return validReading(reading, now) ? reading : null
  } catch { return null }
}
export function saveWeather(storage, reading) {
  try { storage.setItem(config.cacheKey, JSON.stringify(reading)) } catch { /* memory fallback */ }
}
export function weatherDisplay(reading, fromNetwork, now = Date.now()) {
  return {
    reading: validReading(reading, now) ? reading : null,
    cached: !fromNetwork || !reading || now - Date.parse(reading.observedAt) > config.freshMs,
  }
}

export async function requestWeather({ fetchImpl = fetch, signal, now = Date.now, timeoutMs = config.timeoutMs } = {}) {
  const controller = new AbortController()
  const abort = () => controller.abort()
  signal?.addEventListener('abort', abort, { once: true })
  if (signal?.aborted) controller.abort()
  let timeout
  try {
    return await Promise.race([
      (async () => {
        const response = await fetchImpl(config.endpoint, { signal: controller.signal, headers: { Accept: 'application/geo+json' }, credentials: 'omit' })
        if (!response.ok) throw new Error('Weather unavailable')
        const reading = parseObservation(await response.json(), now())
        if (!reading || controller.signal.aborted) throw new Error('Invalid weather observation')
        return reading
      })(),
      new Promise((_, reject) => { timeout = setTimeout(() => { controller.abort(); reject(new Error('Weather timeout')) }, timeoutMs) }),
    ])
  } finally {
    clearTimeout(timeout)
    signal?.removeEventListener('abort', abort)
  }
}

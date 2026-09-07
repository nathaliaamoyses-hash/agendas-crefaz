import { dateInTimeZone } from './date.js'

// A minute-aligned timer crosses local midnight without hardcoding a UTC offset.
// Resume events catch suspended tabs and changes to the device clock immediately.
export function startDateClock(onDate, timeZone, {
  now = () => new Date(),
  setTimer = setTimeout,
  clearTimer = clearTimeout,
  windowTarget = window,
  documentTarget = document,
} = {}) {
  let timer
  function refresh() {
    clearTimer(timer)
    const instant = now()
    onDate(dateInTimeZone(instant, timeZone))
    timer = setTimer(refresh, 60000 - (instant.getTime() % 60000))
  }
  windowTarget.addEventListener('focus', refresh)
  windowTarget.addEventListener('pageshow', refresh)
  documentTarget.addEventListener('visibilitychange', refresh)
  refresh()
  return () => {
    clearTimer(timer)
    windowTarget.removeEventListener('focus', refresh)
    windowTarget.removeEventListener('pageshow', refresh)
    documentTarget.removeEventListener('visibilitychange', refresh)
  }
}

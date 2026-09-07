import { useEffect, useState } from 'react'
import { dateInTimeZone } from '../utils/date.js'
import { startDateClock } from '../utils/dateClock.js'

export default function useVenueDate(timeZone) {
  const [date, setDate] = useState(() => dateInTimeZone(new Date(), timeZone))
  useEffect(() => startDateClock(setDate, timeZone), [timeZone])
  return date
}

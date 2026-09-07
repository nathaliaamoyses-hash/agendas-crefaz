// Timezone-safe date formatting.
// ISO date strings ("YYYY-MM-DD") parse as UTC midnight via `new Date(iso)`, which
// renders as the previous day in any timezone west of UTC (e.g. Chicago, São Paulo).
// Always split the string and construct a local Date instead.

export function formatEventDate(isoDate) {
  const [y, m, d] = isoDate.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

// Foundation for Today: compute the venue's calendar date without a network request.
// Do not use the device's local day or toISOString().slice(0, 10), which is UTC.
export function dateInTimeZone(instant, timeZone) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(instant)
  const value = (type) => parts.find((part) => part.type === type).value
  return `${value('year')}-${value('month')}-${value('day')}`
}

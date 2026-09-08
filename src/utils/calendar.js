import { trip } from '../data/trip.js';
export function toUtcComponents(date, time, timeZone = trip.timeZone) {
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  const wall = Date.UTC(year, month - 1, day, hour, minute);
  const formatter = new Intl.DateTimeFormat('en-US', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' });
  let utc = wall;
  for (let i = 0; i < 3; i++) {
    const p = Object.fromEntries(formatter.formatToParts(new Date(utc)).map(part => [part.type, part.value]));
    const represented = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
    const adjustment = wall - represented;
    utc += adjustment;
    if (!adjustment) break;
  }
  const iso = new Date(utc).toISOString().replace('.000Z', 'Z');
  return { iso, compact: iso.replace(/[-:]/g, '') };
}

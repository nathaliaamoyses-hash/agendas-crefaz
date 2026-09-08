import { events } from './events.js';
import { brazilSessions } from './brazil.js';
export const conferenceCopy = {
  views: [
    { value: 'all', label: 'Recommended Sessions' },
    { value: 'brazil', label: 'Brazil Sessions' },
    { value: 'recorded', label: 'Recorded Sessions' },
    { value: 'mySchedule', label: '★ My Schedule' },
  ],
  recordedIntroduction: 'Sessions listed here will be available at',
  recordedService: 'Salesforce+',
  recordedUrl: 'https://www.salesforce.com/plus',
  sessionDetails: 'Session details',
  audience: 'Audience',
  company: 'Company',
  empty: 'No sessions to show.',
  emptySchedule: 'Star a live session to add it to My Schedule.',
};
// Stable source IDs remain intact. Repeated catalog sessions at different times are distinct live choices.
export const liveSessions = [...events, ...brazilSessions];
export function sessionsForView(view, favorites = new Set()) {
  if (view === 'brazil') return brazilSessions;
  if (view === 'mySchedule') return liveSessions.filter(event => favorites.has(event.id));
  return events;
}

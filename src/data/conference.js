import { events } from './events.js';
import { client } from '#client-config';
import { createTrackAgenda } from '../utils/tracks.js';
export const trackAgenda = createTrackAgenda(events, client.tracks);
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
export function sessionsForView(view, favorites = new Set(), track = null) {
  if (view === 'brazil') return brazilSessions;
  if (view === 'mySchedule') return [...trackAgenda.saved(favorites, track), ...brazilSessions.filter(event => favorites.has(event.id))];
  return trackAgenda.forTrack(track);
}

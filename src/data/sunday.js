// UI/navigation composition only. Entity copy is resolved from content IDs.
export const sunday = {
  date: '2026-09-13', dinnerId: 'sunday-dinner',
  choices: [
    { id: 'classic', number: '01', path: '/sf/sunday/classic', content: { kind: 'route', id: 'sunday-classic' }, action: 'See the full route', tone: 'city' },
    { id: 'giants', number: '02', path: '/sf/sunday/giants', content: { kind: 'activity', id: 'sunday-giants' }, action: 'See the Giants plan', tone: 'conference' },
    { id: 'both', number: '03', path: '/sf/sunday/both', content: { kind: 'route', id: 'sunday-both' }, action: 'See the shorter route', tone: 'city' },
  ],
}

export const sundayCopy = {
  eyebrow: 'SUNDAY IN SAN FRANCISCO', title: 'How do you want to spend Sunday?',
  introduction: 'A day for the city, an afternoon at the ballpark, or a little of both. Choose your route; come together for dinner.',
  draft: 'The outline is ready to explore. Times, meeting points, and final details are still being confirmed.',
  back: 'Back to Sunday', dinner: 'Together for dinner', dinnerIntro: 'Whichever option you choose, the shared dinner plan lives here.',
  choices: 'Three ways to spend Sunday',
  preference: 'My Sunday preference', preferenceHelp: 'Optional. Saved on this device only; this is not an RSVP and does not notify your host.',
  dinnerOnly: 'Dinner only', clearPreference: 'Clear preference', preferenceSaved: 'Preference saved on this device.',
  preferenceUnavailable: 'This preference is kept for this visit only; device storage is unavailable.',
  preferenceCleared: 'Preference cleared.',
}

export const contentCopy = {
  draft: 'Details pending', pending: 'To be confirmed', detailsSoon: 'Guidance to follow.',
  directions: 'Directions', directionsPending: 'Exact map location to be confirmed.',
  website: 'Official website', reservation: 'Reservations', map: 'Open route map',
  offlineMaps: 'The stop list stays available offline after caching. External maps and directions need a connection.',
  whyGo: 'Why go', whatToOrder: 'What to order', whatToLookFor: 'What to look for', bestFor: 'Best for',
  hours: 'Hours', priceIndication: 'Price guide', foodNearby: 'Food nearby',
  duration: 'Approximate duration', minutes: 'min', start: 'Suggested start', routeOutline: 'Route at a glance',
  stops: 'Your route, stop by stop', runningLate: 'Running late?',
  flags: { optional: 'Optional', skipIfLate: 'Skip if running late', recommended: 'Recommended' },
  departure: 'Leave for Oracle Park', arrival: 'Target arrival', milestones: 'Timing checkpoints',
  extraTime: 'Only if you’re ahead of schedule', extensionNote: 'These are optional extensions, not part of the shorter route. Keep enough time to reach Oracle Park.',
  meetingTime: 'Meeting time', meetingPoint: 'Meeting point', planTime: 'Time', venue: 'Venue',
  gameTime: 'Game time', gameDate: 'Planned date', gameDetails: 'At the ballpark',
  relatedPlans: 'Continue your day',
  guideDetails: 'View plan', dinnerDetails: 'See the dinner plan',
}

// Shared stop records contain route context only; place copy/photos live in places.js.
const stop = (placeId, guidance = null, flag = null, foodNearbyIds = []) => ({
  placeId, guidance, flag, foodNearbyIds, durationMinutes: null,
})
export const sundayStops = {
  ferry: stop('ferry-building'),
  embarcadero: stop('embarcadero'),
  cableCar: stop('cable-car', 'Boarding point, line, and queue guidance will be added before the trip.'),
  nobHill: stop('nob-hill'),
  lombard: stop('lombard-street', null, null, ['buena-vista']),
  buenaVista: stop('buena-vista'),
  ghirardelli: stop('ghirardelli-waterfront', 'Include this detour only if the group has time.', 'optional'),
  palace: stop('palace-of-fine-arts'),
  crissy: stop('crissy-field'),
  bridge: stop('golden-gate-viewpoint', 'The exact viewpoint and onward transport will be added to this guide.'),
  oracle: stop('oracle-park', 'Use the Giants guide for the group meeting point and arrival details.'),
}

/** @type {import('./schema.js').Route[]} */
export const routes = [
  {
    id: 'sunday-classic', slug: 'sunday-classic', name: 'Classic San Francisco', status: 'draft',
    shortDescription: 'The full city route, from the Ferry Building to a Golden Gate Bridge viewpoint.',
    image: null, bestFor: 'First-timers with a day for the city.',
    durationMinutes: null, durationLabel: 'Allow approximately 4–5 hours', suggestedStartTime: null,
    runningLateGuidance: 'Skip the optional waterfront detour and shorten later stops as needed. The final route timing is still being reviewed.',
    directionsUrl: null, departureTime: null, departureGuidance: null,
    arrivalTime: null, milestones: [], optionalExtensionPlaceIds: [], related: [],
    stops: [sundayStops.ferry, sundayStops.embarcadero, sundayStops.cableCar, sundayStops.nobHill,
      sundayStops.lombard, sundayStops.buenaVista, sundayStops.ghirardelli, sundayStops.palace,
      sundayStops.crissy, sundayStops.bridge],
  },
  {
    id: 'sunday-both', slug: 'sunday-both', name: 'Do Both', status: 'draft',
    shortDescription: 'A shorter city route, then Oracle Park for the Giants option.',
    image: null, bestFor: 'First-timers who also want the game.',
    durationMinutes: null, durationLabel: null, suggestedStartTime: null,
    runningLateGuidance: 'Prioritize getting to Oracle Park. Skip extra stops if the route is running late.',
    directionsUrl: null, departureTime: null,
    departureGuidance: 'The departure target and transport plan will be set once the game and arrival time are confirmed.',
    arrivalTime: null, milestones: [], optionalExtensionPlaceIds: ['crissy-field', 'golden-gate-viewpoint'],
    related: [{ kind: 'activity', id: 'sunday-giants' }],
    stops: [sundayStops.ferry, sundayStops.cableCar, sundayStops.nobHill,
      sundayStops.lombard, sundayStops.buenaVista, sundayStops.oracle],
  },
]

// Shared landing/guide summaries; Today references these records by ID.
export const homeCopy = {
  eyebrow: 'YOUR WEEK, WITH SALESFORCE',
  welcome: 'Welcome to San Francisco. Your conference plans and time in the city, together.',
  destinationsLabel: 'Where would you like to go?',
}

export const destinations = [
  {
    id: 'dreamforce', path: '/dreamforce', title: 'At Dreamforce',
    description: 'Sessions · Meetings · Conference activities',
    action: 'View Dreamforce', tone: 'conference', label: 'SEPTEMBER 15–17',
  },
  {
    id: 'sanFrancisco', path: '/sf', title: 'In San Francisco',
    description: 'Explore · Food · Local institutions · Free-time ideas',
    action: 'Explore San Francisco', tone: 'city', label: 'BEYOND THE CONFERENCE',
  },
]

export const sfCopy = {
  eyebrow: 'BEYOND THE CONFERENCE',
  title: 'In San Francisco',
  introduction: 'A little time between plans? Start here. These are the places and experiences we’re putting together for your week.',
  imageAlt: 'San Francisco waterfront and Bay Bridge at dusk',
  sundayLabel: 'SUNDAY, SEPTEMBER 13',
  sundayTitle: 'A day for the city.',
  sundayDescription: 'A classic San Francisco route, an afternoon at Oracle Park, or a little of both.',
  sundayAction: 'Explore Sunday',
  guideTitle: 'Make the most of your free time',
  freeTimeTitle: 'If you have time',
  draftLabel: 'GUIDE IN PREPARATION',
  draftDescription: 'Details are being finalized. Check back for the full guide.',
  backLabel: 'Back to San Francisco',
}

export const sfSections = [
  { status: 'draft', id: 'sunday', path: '/sf/sunday', title: 'Sunday in San Francisco', description: 'Classic SF, Giants, or both — with dinner together afterward.', group: 'featured', number: '01' },
  { status: 'draft', id: 'eatDrink', path: '/sf/eat-drink', title: 'Eat & Drink', description: 'San Francisco institutions, quick local stops, and places for a drink.', group: 'guide', number: '02' },
  { status: 'draft', id: 'onlyInSf', path: '/sf/only-in-sf', title: 'Only in San Francisco', description: 'Local shops and cultural institutions worth a detour.', group: 'guide', number: '03' },
  { status: 'draft', id: 'explore', path: '/sf/explore', title: 'Explore San Francisco', description: 'Classic routes, landmarks, and a little neighborhood context.', group: 'guide', number: '04' },
  { status: 'draft', id: 'monday', path: '/sf/monday', title: 'Monday ideas', description: 'If you have some free time before Dreamforce.', group: 'freeTime', number: '05', dateLabel: 'SEPTEMBER 14' },
  { status: 'draft', id: 'friday', path: '/sf/friday', title: 'Friday ideas', description: 'Still in town? A few ways to spend the day.', group: 'freeTime', number: '06', dateLabel: 'SEPTEMBER 18' },
  { status: 'draft', id: 'practical', path: '/sf/practical', title: 'Practical SF', description: 'Layers, getting around, airport travel, and useful local links.', group: 'practical', number: '07' },
]

export const weatherCopy = {
  location: 'SAN FRANCISCO WEATHER',
  unavailable: 'Current conditions unavailable',
  guidance: 'Keep a layer handy.',
  cached: 'Last saved',
  updated: 'Updated',
}

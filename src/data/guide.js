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
  sundayDescription: "There’s time to enjoy the city before the conference begins. Spend Sunday out exploring or at the ballpark, and join us for dinner at EPIC Steak that evening.",
  sundayAction: 'Explore Sunday',
  guideTitle: 'Make the most of your free time',
  freeTimeTitle: 'If you have time',
  draftLabel: 'GUIDE IN PREPARATION',
  draftDescription: 'Details are being finalized. Check back for the full guide.',
  backLabel: 'Back to San Francisco',
}

export const sfSections = [
  {
    "status": "ready",
    "id": "sunday",
    "path": "/sf/sunday",
    "title": "Sunday in San Francisco",
    "description": "There’s time to enjoy the city before the conference begins. Spend Sunday out exploring or at the ballpark, and join us for dinner at EPIC Steak that evening.",
    "group": "featured",
    "number": "01"
  },
  {
    "status": "ready",
    "id": "eatDrink",
    "path": "/sf/eat-drink",
    "title": "Eat & Drink",
    "description": "San Francisco takes its food seriously. From a sit-down meal to a drink at the end of the day, these are places we’d be happy to send you.",
    "group": "guide",
    "number": "02"
  },
  {
    "status": "ready",
    "id": "onlyInSf",
    "path": "/sf/only-in-sf",
    "title": "Only in San Francisco",
    "description": "Set aside some time to browse. These shops have enough character to make the visit worthwhile, with plenty of things you might be tempted to take home.",
    "group": "guide",
    "number": "03"
  },
  {
    "status": "ready",
    "id": "explore",
    "path": "/sf/explore",
    "title": "Explore San Francisco",
    "description": "San Francisco rewards a bit of wandering. Take in the views, follow a street that catches your eye, and give yourself time to enjoy the city between stops.",
    "group": "guide",
    "number": "04"
  },
  {
    "status": "ready",
    "id": "monday",
    "path": "/sf/monday",
    "title": "Monday Ideas",
    "description": "If your Monday is free, enjoy a day away from conference rooms. There’s plenty to do without filling every hour, so leave yourself time to stop and enjoy it.",
    "group": "freeTime",
    "number": "05",
    "dateLabel": "SEPTEMBER 14"
  },
  {
    "status": "ready",
    "id": "friday",
    "path": "/sf/friday",
    "title": "Friday Ideas",
    "description": "If you’re staying on Friday, there’s no need to rush into another full day of plans. Pick something you’d enjoy and make the most of a little more time in San Francisco.",
    "group": "freeTime",
    "number": "06",
    "dateLabel": "SEPTEMBER 18"
  },
  {
    "status": "ready",
    "id": "practical",
    "path": "/sf/practical",
    "title": "Practical SF",
    "description": "A warm layer and a little local knowledge go a long way in San Francisco. Here’s what’s useful to know before you head out for the day.",
    "group": "practical",
    "number": "07"
  }
];

export const weatherCopy = {
  location: 'SAN FRANCISCO WEATHER',
  unavailable: 'Current conditions unavailable',
  guidance: 'Keep a layer handy.',
  cached: 'Last saved',
  updated: 'Updated',
}

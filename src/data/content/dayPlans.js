// Trip-day composition contains references only. Editorial copy stays at its source.
/** @type {import('./schema.js').DayPlan[]} */
export const dayPlans = [
  { date: '2026-09-12', primary: [], secondary: [], evening: [], notices: [] },
  {
    date: '2026-09-13',
    primary: [{ kind: 'guide', id: 'sunday' }],
    secondary: [{ kind: 'activity', id: 'sunday-giants' }],
    evening: [{ kind: 'sharedPlan', id: 'sunday-dinner' }], notices: [],
  },
  { date: '2026-09-14', primary: [{ kind: 'guide', id: 'monday' }], secondary: [], evening: [], notices: [] },
  {
    date: '2026-09-15', primary: [], secondary: [],
    evening: [{ kind: 'sharedPlan', id: 'tuesday-evening' }], notices: [],
  },
  {
    date: '2026-09-16', primary: [], secondary: [],
    evening: [{ kind: 'sharedPlan', id: 'dreamfest' }], notices: [],
  },
  {
    date: '2026-09-17', primary: [], secondary: [],
    evening: [{ kind: 'sharedPlan', id: 'thursday-dinner' }], notices: [],
  },
  { date: '2026-09-18', primary: [{ kind: 'guide', id: 'friday' }], secondary: [], evening: [], notices: [] },
  { date: '2026-09-19', primary: [], secondary: [], evening: [], notices: [] },
]

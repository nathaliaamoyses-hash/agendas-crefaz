import { sfSections } from '../guide.js'
export { dayPlans } from './dayPlans.js'

import { places } from './places.js'
import { activities } from './activities.js'
import { routes } from './sundayRoutes.js'
import { sharedPlans } from './sharedPlans.js'
export { places, activities, routes, sharedPlans }
import { neighborhoods } from './neighborhoods.js'
import { practicalTips } from './practicalTips.js'
export { neighborhoods, practicalTips }
/** @type {import('./schema.js').Notice[]} */
export const notices = []

// Agenda events are supplied by their source, rather than copied into SF content.
export function createContentSources(agendaEvents = []) {
  return {
    agendaEvent: agendaEvents,
    guide: sfSections,
    place: places,
    activity: activities,
    route: routes,
    neighborhood: neighborhoods,
    sharedPlan: sharedPlans,
    practicalTip: practicalTips,
    notice: notices,
  }
}

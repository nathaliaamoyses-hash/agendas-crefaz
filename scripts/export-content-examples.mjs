import { writeFileSync } from 'node:fs'
import { createContentSources, dayPlans } from '../src/data/content/index.js'
import { sunday } from '../src/data/sunday.js'
import { sfSections, destinations } from '../src/data/guide.js'
import { sfGuidePages } from '../src/data/sfGuides.js'
import { events } from '../src/data/events.js'

const sources = createContentSources()
const examples = {
  _readme: 'Phase 5 examples from current sources. Drafts and legacy examples are not final or verified travel content. Keep IDs stable. See CONTENT-AUTHORING.md.',
  destinationCard: destinations[1], guideCard: sfSections.find(x => x.id === 'monday'),
  sundayChoiceCard: sunday.choices[2], placeCard: sources.place.find(x => x.id === 'buena-vista'),
  shopCard: sources.place.find(x => x.id === 'city-lights'),
  routeStopCard: sources.route[0].stops.find(x => x.placeId === 'lombard-street'),
  routeCard: sources.route[1], activityCard: sources.activity[0],
  outingCard: sources.activity.find(x => x.id === 'sausalito-ferry'),
  neighborhoodCard: sources.neighborhood.find(x => x.id === 'north-beach'),
  practicalTipCard: sources.practicalTip.find(x => x.id === 'cable-cars'),
  referenceCard: { kind: 'place', id: 'city-lights' },
  guidePage: sfGuidePages.monday,
  sharedPlanCard: sources.sharedPlan.find(x => x.id === 'sunday-dinner'),
  dayPlan: dayPlans.find(x => x.date === sunday.date), legacyAgendaCard: events[0],
}
writeFileSync(new URL('../docs/content-examples.json', import.meta.url), JSON.stringify(examples, null, 2) + '\n')

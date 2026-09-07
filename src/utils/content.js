import { sfGuidePages } from '../data/sfGuides.js'
import { sunday } from '../data/sunday.js'

/** Resolve the original record; callers decide presentation and draft visibility. */
export function resolveContent(reference, sources) {
  if (!reference || !Object.hasOwn(sources, reference.kind)) return null
  return sources[reference.kind].find((entry) => entry.id === reference.id) ?? null
}

// Content destinations are defined once so Today can link to the source experience.
export function contentPath(reference) {
  if (reference.kind === 'sharedPlan' && reference.id === sunday.dinnerId) return '/sf/sunday'
  const sundayPath = sunday.choices.find(choice => choice.content.kind === reference.kind && choice.content.id === reference.id)?.path
  if (sundayPath) return sundayPath
  const segments = { place: 'places', activity: 'activities', neighborhood: 'neighborhoods' }
  return Object.hasOwn(segments, reference.kind) ? `/sf/${segments[reference.kind]}/${encodeURIComponent(reference.id)}` : null
}

export function guidesForContent(reference) {
  return Object.entries(sfGuidePages).filter(([, page]) => page.sections.some(section =>
    section.entries.some(entry => entry.kind === reference.kind && entry.id === reference.id)
  )).map(([id]) => ({ kind: 'guide', id }))
}

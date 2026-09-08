import { sunday } from '../data/sunday.js'
import { createContentSources } from '../data/content/index.js'
import { contentPath, resolveContent } from '../utils/content.js'
import { sfSections } from '../data/guide.js'

export const primaryRoutes = [
  { id: 'home', path: '/', label: 'Home' },
  { id: 'dreamforce', path: '/dreamforce', label: 'At Dreamforce' },
  { id: 'sanFrancisco', path: '/sf', label: 'In San Francisco' },
]

export const routes = [
  ...primaryRoutes,
  ...['place', 'activity', 'neighborhood', 'roundup', 'sharedPlan'].flatMap(kind => createContentSources()[kind]
    .filter(entry => !(kind === 'sharedPlan' && entry.id === sunday.dinnerId))
    .filter(entry => !sunday.choices.some(choice => choice.content.kind === kind && choice.content.id === entry.id))
    .map(entry => ({ id: `${kind}:${entry.id}`, path: contentPath({ kind, id: entry.id }), label: entry.name, parentId: 'sanFrancisco', contentRef: { kind, id: entry.id } }))),
  ...sunday.choices.map(choice => ({ id: `sunday-${choice.id}`, path: choice.path, label: resolveContent(choice.content, createContentSources()).name, parentId: 'sanFrancisco', sundayChoiceId: choice.id })),
  ...sfSections.map(section => ({ id: section.id, path: section.path, label: section.title, parentId: 'sanFrancisco' })),
]

// Fragments keep every page on the same static/PWA entry point. No server rewrites.
export function pathFromHash(hash = '') {
  const path = hash.replace(/^#/, '') || '/'
  if (!path.startsWith('/')) return path
  return path.length > 1 ? path.replace(/\/+$/, '') : path
}

export function getRoute(path) {
  if (['/sf/places/view-bar-pick', '/sf/places/cocktail-pick', '/sf/roundups/cocktail-pick'].includes(path)) path = '/sf/roundups/view-bar-pick'
  return routes.find((route) => route.path === path) ?? null
}

export function routeHref(path) {
  return `#${path}`
}

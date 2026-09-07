import { companionCopy } from '../data/trip.js'
import { routeHref } from '../routing/routes.js'

// Fallback for unmatched hashes; Home and SF now have their own pages.
export default function FoundationPage() {
  return (
    <section className="px-4 py-8">
      <h1 className="text-2xl font-bold text-[var(--color-neutral-dark)]">{companionCopy.notFoundTitle}</h1>
      <p className="mt-4 max-w-prose text-gray-600">{companionCopy.notFoundDescription}</p>
      <a
        className="mt-6 inline-flex min-h-11 items-center font-medium underline text-[var(--color-neutral-dark)]"
        href={routeHref('/')}
      >
        {companionCopy.homeLink}
      </a>
    </section>
  )
}

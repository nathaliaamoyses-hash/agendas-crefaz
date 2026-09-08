import { conferenceCopy } from '../data/conference.js'
export default function FilterBar({ activeFilter, onFilterChange }) {
  return <nav aria-label="Dreamforce views" className="conference-views">
    {conferenceCopy.views.map(view => <button key={view.value} type="button" aria-pressed={activeFilter === view.value} onClick={() => onFilterChange(view.value)}>{view.label}</button>)}
  </nav>
}

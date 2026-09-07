import { categoryColors } from '../config.js'

const CATEGORY_LABELS = {
  suggested: null,                // no label for plain sessions
  // TODO: if "Alternative to [parent title]" is needed, EventCard would need to
  // receive the full events array and find the event sharing the same date+startTime.
  also:      'Alternative session',
  oneOnOne:  'Confirmed 1:1',
  social:    'Get together',
}

export default function EventCard({ event, isFavorited, onToggleFavorite, onSelect }) {
  const { accent, tint } = categoryColors[event.eventCategory] || categoryColors.suggested
  const label = CATEGORY_LABELS[event.eventCategory] || null

  const locationParts = []
  if (event.room) locationParts.push(event.room)
  if (event.area) locationParts.push(event.area)
  const hasLocation = locationParts.length > 0
  const hasIndicators = event.registrationRequired || event.transitionWarning
  const showRow3 = hasLocation || hasIndicators

  function handleStarClick(e) {
    e.stopPropagation()
    onToggleFavorite(event.id)
  }

  return (
    <div
      className="relative rounded-lg shadow-sm mb-2 px-4 py-3 cursor-pointer"
      style={{
        background: tint,
        borderLeft: accent ? `4px solid ${accent}` : undefined,
        // Darken slightly on hover without overriding the tint with a fixed bg class
      }}
      onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(0.97)' }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = '' }}
    >
      <button type="button" className="absolute inset-0 rounded-lg event-open" aria-label={event.title} onClick={() => onSelect(event)} />
      {/* Star — top-right, above the full-card detail button. */}
      <button
        type="button"
        onClick={handleStarClick}
        aria-label={isFavorited ? 'Remove from My Schedule' : 'Add to My Schedule'}
        aria-pressed={isFavorited}
        className="absolute z-10 top-2 right-2 flex items-center justify-center"
        style={{
          width: 44,
          height: 44,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: 22,
          lineHeight: 1,
          color: isFavorited ? '#00A1E0' : '#9CA3AF',
        }}
      >
        {isFavorited ? '★' : '☆'}
      </button>

      {/* Row 1 — time */}
      <div className="pr-10 pointer-events-none relative">
        <span className="text-sm" style={{ color: '#374151' }}>
          {event.startTime}–{event.endTime}
        </span>
      </div>

      {/* Row 2 — title */}
      <div className="pointer-events-none relative mt-1 pr-10 font-semibold" style={{ color: '#032D60' }}>
        {event.title}
        {event.url && (
          <span style={{ color: '#9CA3AF', marginLeft: 4 }}>↗</span>
        )}
      </div>

      {/* Row 2b — category label (non-suggested only) */}
      {label && (
        <div className="pointer-events-none relative text-xs mt-0.5" style={{ color: '#032D60', opacity: 0.75 }}>
          {label}
        </div>
      )}

      {/* Row 3 — location + indicators */}
      {showRow3 && (
        <div className="pointer-events-none relative mt-1 flex items-center flex-wrap gap-2 text-sm" style={{ color: '#374151' }}>
          {hasLocation && <span>{locationParts.join(' · ')}</span>}
          {event.registrationRequired && (
            // Dark amber text on light amber bg — 6.53:1, passes WCAG AA
            <span
              className="text-xs px-2 py-0.5 rounded"
              style={{ color: '#92400E', background: '#FEF3C7' }}
            >
              Reg. required
            </span>
          )}
          {/* NOTE: on oneOnOne cards the amber tint (#fff8ec) and warning icon (#D97706)
              share hue. Currently no oneOnOne event carries a transitionWarning so this
              isn't user-visible. If that changes, distinguish with a border or darker icon. */}
          {event.transitionWarning && (
            <span style={{ color: '#D97706' }} aria-label="Transition warning">⚠</span>
          )}
        </div>
      )}
    </div>
  )
}

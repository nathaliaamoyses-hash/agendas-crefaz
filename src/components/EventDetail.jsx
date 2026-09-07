import { useEffect, useRef } from 'react'
import { formatEventDate } from '../utils/date.js'
import { useOnlineStatus } from '../hooks/useOnlineStatus.js'
import { categoryColors } from '../config.js'

const CATEGORY_LABELS = {
  suggested: 'Session',
  also:      'Alternative session',
  oneOnOne:  'Confirmed 1:1',
  social:    'Get together',
}

const stripHtml = (html) => (html ? html.replace(/<[^>]*>/g, '') : '')

const calBtnBase = {
  borderColor: '#D1D5DB',
  color: '#374151',
  background: '#fff',
}

export default function EventDetail({ event, isFavorited, onToggleFavorite, onClose }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose
  useEffect(() => {
    const previous = document.activeElement
    const shell = document.getElementById('page-content')?.parentElement
    const siblings = shell ? Array.from(shell.children).filter(el => el.id !== 'page-content') : []
    const main = document.getElementById('page-content')
    // The dialog is inside main. Make its sibling agenda content inert, plus shell navigation.
    const content = main ? Array.from(main.children).filter(el => !el.contains(dialogRef.current)) : []
    const targets = [...siblings, ...content]
    const prior = targets.map(el => [el, el.inert])
    targets.forEach(el => { el.inert = true })
    dialogRef.current?.focus()
    function keydown(e) {
      if (e.key === 'Escape') { e.preventDefault(); closeRef.current(); return }
      if (e.key !== 'Tab') return
      const buttons = Array.from(dialogRef.current.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]'))
      if (!buttons.length) { e.preventDefault(); return }
      const first = buttons[0], last = buttons.at(-1)
      if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && (document.activeElement === last || document.activeElement === dialogRef.current)) { e.preventDefault(); first.focus() }
    }
    const dialog = dialogRef.current
    dialog.addEventListener('keydown', keydown)
    return () => {
      dialog.removeEventListener('keydown', keydown)
      prior.forEach(([el, inert]) => { el.inert = inert })
      if (previous?.isConnected) previous.focus({ preventScroll: true })
    }
  }, [])
  const isOnline = useOnlineStatus()
  const { accent, tint } = categoryColors[event.eventCategory] || categoryColors.suggested
  const label = CATEGORY_LABELS[event.eventCategory] || 'Session'

  const locationParts = [event.room, event.area].filter(Boolean)
  const hasLocation = locationParts.length > 0
  const location = locationParts.join(', ')

  // Event times in events.js are America/Chicago wall-clock (CDT, UTC-5) for June 2-4 2026.
  // We convert to UTC by adding 5h and emit with a 'Z' suffix so calendar apps pin the
  // correct absolute time regardless of the user's device timezone (many attendees' phones
  // are on Brasília time, UTC-3). Offset is hardcoded: no DST transition occurs in this window.
  // Do NOT use runtime-timezone-dependent conversion (e.g. Date.toISOString on a local-parsed
  // date) — that would apply the host/device offset and break this.
  function toUtcComponents(date, time) {
    const [y, mo, d]  = date.split('-').map(Number)
    const [h, mi]     = time.split(':').map(Number)
    const utcMs       = Date.UTC(y, mo - 1, d, h + 5, mi)
    const dt          = new Date(utcMs)
    const pad         = (n) => String(n).padStart(2, '0')
    return {
      compact: `${dt.getUTCFullYear()}${pad(dt.getUTCMonth() + 1)}${pad(dt.getUTCDate())}T${pad(dt.getUTCHours())}${pad(dt.getUTCMinutes())}00Z`,
      iso:     `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}T${pad(dt.getUTCHours())}:${pad(dt.getUTCMinutes())}:00Z`,
    }
  }

  const startUtc = toUtcComponents(event.date, event.startTime)
  const endUtc   = toUtcComponents(event.date, event.endTime)

  const gcalUrl =
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    '&text='     + encodeURIComponent(event.title) +
    '&dates='    + startUtc.compact + '/' + endUtc.compact +
    '&details='  + encodeURIComponent(stripHtml(event.summary)) +
    '&location=' + encodeURIComponent(location)

  const outlookUrl =
    'https://outlook.live.com/calendar/0/deeplink/compose' +
    '?subject='  + encodeURIComponent(event.title) +
    '&startdt='  + startUtc.iso +
    '&enddt='    + endUtc.iso +
    '&body='     + encodeURIComponent(stripHtml(event.summary)) +
    '&location=' + encodeURIComponent(location)

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: 'rgba(0, 0, 0, 0.4)' }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={event.title}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full rounded-t-2xl overflow-y-auto"
        style={{ maxHeight: '90dvh', maxWidth: '64rem', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="relative p-5">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-2 right-2 flex items-center justify-center"
            style={{
              width: 44,
              height: 44,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: 28,
              lineHeight: 1,
              color: '#6B7280',
            }}
          >
            ×
          </button>

          {/* Title + star */}
          <div className="flex items-start justify-between pr-10 gap-3">
            <div className="flex-1 text-xl font-bold" style={{ color: '#032D60' }}>
              {event.url ? (
                isOnline ? (
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#032D60', textDecoration: 'none' }}
                  >
                    {event.title} <span style={{ color: '#9CA3AF' }}>↗</span>
                  </a>
                ) : (
                  <span
                    title="Requires internet connection"
                    style={{ opacity: 0.6, cursor: 'not-allowed' }}
                  >
                    {event.title} <span style={{ color: '#9CA3AF' }}>↗</span>
                  </span>
                )
              ) : (
                <h2 className="text-xl font-bold m-0" style={{ color: '#032D60' }}>
                  {event.title}
                </h2>
              )}
            </div>
            <button
              type="button"
              onClick={() => onToggleFavorite(event.id)}
              aria-label={isFavorited ? 'Remove from My Schedule' : 'Add to My Schedule'}
        aria-pressed={isFavorited}
              className="flex items-center justify-center shrink-0"
              style={{
                width: 44,
                height: 44,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: 26,
                lineHeight: 1,
                color: isFavorited ? '#00A1E0' : '#9CA3AF',
              }}
            >
              {isFavorited ? '★' : '☆'}
            </button>
          </div>

          {/* Category badge — dark text on tint with accent border; avoids white-on-color contrast failure */}
          <div className="mt-2">
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                color: '#032D60',
                background: tint,
                border: accent ? `1px solid ${accent}` : '1px solid #D1D5DB',
              }}
            >
              {label}
            </span>
          </div>

          {/* Date / time / location */}
          <div className="mt-3 text-sm" style={{ color: '#374151' }}>
            <div>{formatEventDate(event.date)}</div>
            <div>{event.startTime} – {event.endTime}</div>
            {hasLocation && <div className="mt-1">{locationParts.join(' · ')}</div>}
          </div>

          {/* Registration warning */}
          {event.registrationRequired && (
            <div
              className="mt-4 px-4 py-3 rounded"
              style={{
                background: '#FEF2F2',
                borderLeft: '4px solid #F87171',
                color: '#991B1B',
              }}
            >
              Registration required
            </div>
          )}

          {/* Transition warning */}
          {event.transitionWarning && (
            <div
              className="mt-4 px-4 py-3 rounded flex items-start gap-2"
              style={{
                background: '#FFFBEB',
                borderLeft: '4px solid #FBBF24',
                color: '#92400E',
              }}
            >
              <span aria-hidden="true">⚠</span>
              <span>{event.transitionWarning}</span>
            </div>
          )}

          {/* Optional metadata */}
          <div className="mt-4 text-sm" style={{ color: '#374151' }}>
            {event.type && (
              <div className="mb-2">
                <span className="font-semibold">Format: </span>
                <span>{event.type}</span>
              </div>
            )}
            {event.topic && (
              <div className="mb-2">
                <span className="font-semibold">Topic: </span>
                <span>{event.topic}</span>
              </div>
            )}
            {event.participants && (
              <div className="mb-2">
                <span className="font-semibold">Meeting with: </span>
                <span>{event.participants}</span>
              </div>
            )}
          </div>

          {/* Summary */}
          {event.summary && (
            <div
              className="mt-3 text-sm leading-relaxed"
              style={{ color: '#374151' }}
              dangerouslySetInnerHTML={{ __html: event.summary }}
            />
          )}

          {/* Directions */}
          {event.mapsUrl && (
            <div className="mt-4">
              {isOnline ? (
                <a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#00A1E0', textDecoration: 'underline' }}
                >
                  Get directions ↗
                </a>
              ) : (
                <span
                  title="Requires internet connection"
                  style={{ color: '#00A1E0', opacity: 0.6, cursor: 'not-allowed' }}
                >
                  Get directions ↗
                </span>
              )}
            </div>
          )}

          {/* Calendar buttons */}
          <div className="mt-6 flex flex-wrap gap-2">
            {isOnline ? (
              <>
                <a
                  href={gcalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border rounded px-4 py-2 text-sm"
                  style={{ ...calBtnBase, textDecoration: 'none', display: 'inline-block' }}
                >
                  Add to Google Calendar
                </a>
                <a
                  href={outlookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border rounded px-4 py-2 text-sm"
                  style={{ ...calBtnBase, textDecoration: 'none', display: 'inline-block' }}
                >
                  Add to Outlook
                </a>
                {event.spotifyUrl && (
                  <a
                    href={event.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded px-4 py-2 text-sm"
                    style={{ background: '#1A7F43', color: '#fff', textDecoration: 'none', display: 'inline-block' }}
                  >
                    Party playlist ♪
                  </a>
                )}
              </>
            ) : (
              <>
                <button
                  type="button"
                  disabled
                  title="Requires internet connection"
                  className="border rounded px-4 py-2 text-sm"
                  style={{ ...calBtnBase, opacity: 0.5, cursor: 'not-allowed' }}
                >
                  Add to Google Calendar
                </button>
                <button
                  type="button"
                  disabled
                  title="Requires internet connection"
                  className="border rounded px-4 py-2 text-sm"
                  style={{ ...calBtnBase, opacity: 0.5, cursor: 'not-allowed' }}
                >
                  Add to Outlook
                </button>
                {event.spotifyUrl && (
                  <button
                    type="button"
                    disabled
                    title="Requires internet connection"
                    className="rounded px-4 py-2 text-sm"
                    style={{ background: '#1A7F43', color: '#fff', opacity: 0.5, cursor: 'not-allowed' }}
                  >
                    Party playlist ♪
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

import { trackAgenda } from '../data/conference.js'
import { trackCopy as copy } from '../data/tracks.js'

export default function AgendaTrackSelector({ track, onChange }) {
  if (!trackAgenda.enabled) return null
  return <fieldset className="agenda-track-selector">
    <legend>{track ? copy.selected : copy.choose}</legend>
    <p>{track ? copy.reminder : copy.introduction}</p>
    <div className="agenda-track-options">
      {trackAgenda.tracks.map(option => <button key={option.id} type="button" aria-pressed={track === option.id} onClick={() => onChange(option.id)}>{option.label}</button>)}
    </div>
  </fieldset>
}

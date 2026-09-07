import { useState } from 'react'
import { sunday, sundayCopy as copy } from '../data/sunday.js'
import { trip } from '../data/trip.js'
import { resolveContent } from '../utils/content.js'
import { readPreference, savePreference } from '../utils/preference.js'

const storageKey = `${trip.id}:sunday-preference`
const allowed = [...sunday.choices.map(choice => choice.id), 'dinner-only']
function storage() {
  try { return window.localStorage } catch { return null }
}

export default function SundayPreference({ sources }) {
  const [value, setValue] = useState(() => readPreference(storage(), storageKey, allowed))
  const [message, setMessage] = useState('')
  const options = [...sunday.choices.map(choice => ({ id: choice.id, label: resolveContent(choice.content, sources).name })), { id: 'dinner-only', label: copy.dinnerOnly }]
  function choose(next) {
    setValue(next)
    const saved = savePreference(storage(), storageKey, next)
    setMessage(saved ? next === null ? copy.preferenceCleared : copy.preferenceSaved : copy.preferenceUnavailable)
  }
  return (
    <fieldset className="sunday-preference" aria-describedby="preference-help">
      <legend>{copy.preference}</legend>
      <p id="preference-help">{copy.preferenceHelp}</p>
      <div className="preference-options">{options.map(option => <label key={option.id}><input type="radio" name="sunday-preference" value={option.id} checked={value === option.id} onChange={() => choose(option.id)} /><span>{option.label}</span></label>)}</div>
      {value && <button type="button" className="content-action" onClick={() => choose(null)}>{copy.clearPreference}</button>}
      <p className="preference-message" role="status">{message}</p>
    </fieldset>
  )
}

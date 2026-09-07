export function readPreference(storage, key, allowed) {
  try {
    const value = storage.getItem(key)
    return allowed.includes(value) ? value : null
  } catch {
    return null
  }
}

export function savePreference(storage, key, value) {
  try {
    if (value === null) storage.removeItem(key)
    else storage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

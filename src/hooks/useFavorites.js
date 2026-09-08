import { useEffect, useState } from 'react'

import { client } from '#client-config'
import { trackAgenda } from '../data/conference.js'
const STORAGE_KEY = client.favoritesKey

function readInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return new Set()
    return trackAgenda.normalizeFavorites(new Set(parsed))
  } catch {
    return new Set()
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(readInitial)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(favorites)))
    } catch {
      // ignore quota / private-mode errors
    }
  }, [favorites])

  function toggleFavorite(id) {
    setFavorites((prev) => {
      return trackAgenda.toggle(prev, id)
    })
  }

  return [favorites, toggleFavorite]
}

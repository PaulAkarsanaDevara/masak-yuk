import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { MealSummary } from '@/types'

interface FavoritesState {
  items: MealSummary[]
}

const loadFavorites = (): MealSummary[] => {
  try {
    const stored = localStorage.getItem('masak-yuk-favorites')
    return stored ? (JSON.parse(stored) as MealSummary[]) : []
  } catch {
    return []
  }
}

const saveFavorites = (items: MealSummary[]) => {
  localStorage.setItem('masak-yuk-favorites', JSON.stringify(items))
}

const initialState: FavoritesState = {
  items: loadFavorites(),
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<MealSummary>) => {
      const exists = state.items.findIndex((m) => m.idMeal === action.payload.idMeal)
      if (exists >= 0) {
        state.items.splice(exists, 1)
      } else {
        state.items.push(action.payload)
      }
      saveFavorites(state.items)
    },
  },
})

export const { toggleFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer

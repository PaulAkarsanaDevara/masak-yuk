import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { MealSummary, Meal, Category } from '@/types'
import { mealApi } from '@/utils/mealApi'

interface RecipesState {
  searchResults: MealSummary[]
  categoryResults: MealSummary[]
  ingredientResults: MealSummary[]
  currentMeal: Meal | null
  randomMeal: Meal | null
  categories: Category[]
  activeCategory: string
  searchQuery: string
  loading: {
    search: boolean
    detail: boolean
    categories: boolean
    random: boolean
    ingredient: boolean
  }
  error: string | null
}

const initialState: RecipesState = {
  searchResults: [],
  categoryResults: [],
  ingredientResults: [],
  currentMeal: null,
  randomMeal: null,
  categories: [],
  activeCategory: '',
  searchQuery: '',
  loading: {
    search: false,
    detail: false,
    categories: false,
    random: false,
    ingredient: false,
  },
  error: null,
}

export const searchMeals = createAsyncThunk('recipes/search', async (query: string) => {
  return await mealApi.search(query)
})

export const fetchMealById = createAsyncThunk('recipes/fetchById', async (id: string) => {
  return await mealApi.getById(id)
})

export const fetchCategories = createAsyncThunk('recipes/fetchCategories', async () => {
  return await mealApi.getCategories()
})

export const fetchByCategory = createAsyncThunk('recipes/fetchByCategory', async (cat: string) => {
  return await mealApi.getByCategory(cat)
})

export const fetchRandom = createAsyncThunk('recipes/fetchRandom', async () => {
  return await mealApi.getRandom()
})

export const fetchByIngredient = createAsyncThunk(
  'recipes/fetchByIngredient',
  async (ingredients: string[]) => {
    const results = await Promise.all(ingredients.map((i) => mealApi.getByIngredient(i)))
    // Intersect: meals that appear in ALL ingredient results
    if (results.length === 0) return []
    const [first, ...rest] = results
    const intersected = first.filter((meal) =>
      rest.every((r) => r.some((m) => m.idMeal === meal.idMeal))
    )
    return intersected.length > 0 ? intersected : results.flat().slice(0, 20)
  }
)

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload
    },
    clearCurrentMeal: (state) => {
      state.currentMeal = null
    },
  },
  extraReducers: (builder) => {
    builder
      // search
      .addCase(searchMeals.pending, (state) => {
        state.loading.search = true
        state.error = null
      })
      .addCase(searchMeals.fulfilled, (state, action) => {
        state.loading.search = false
        state.searchResults = action.payload
      })
      .addCase(searchMeals.rejected, (state) => {
        state.loading.search = false
        state.error = 'Gagal mencari resep'
      })
      // detail
      .addCase(fetchMealById.pending, (state) => {
        state.loading.detail = true
      })
      .addCase(fetchMealById.fulfilled, (state, action) => {
        state.loading.detail = false
        state.currentMeal = action.payload
      })
      .addCase(fetchMealById.rejected, (state) => {
        state.loading.detail = false
        state.error = 'Gagal memuat detail resep'
      })
      // categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading.categories = true
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading.categories = false
        state.categories = action.payload
      })
      // by category
      .addCase(fetchByCategory.pending, (state) => {
        state.loading.search = true
      })
      .addCase(fetchByCategory.fulfilled, (state, action) => {
        state.loading.search = false
        state.categoryResults = action.payload
      })
      // random
      .addCase(fetchRandom.pending, (state) => {
        state.loading.random = true
      })
      .addCase(fetchRandom.fulfilled, (state, action) => {
        state.loading.random = false
        state.randomMeal = action.payload
      })
      // by ingredient
      .addCase(fetchByIngredient.pending, (state) => {
        state.loading.ingredient = true
      })
      .addCase(fetchByIngredient.fulfilled, (state, action) => {
        state.loading.ingredient = false
        state.ingredientResults = action.payload
      })
      .addCase(fetchByIngredient.rejected, (state) => {
        state.loading.ingredient = false
        state.error = 'Gagal mencari berdasarkan bahan'
      })
  },
})

export const { setSearchQuery, setActiveCategory, clearCurrentMeal } = recipesSlice.actions
export default recipesSlice.reducer

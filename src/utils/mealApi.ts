import type {
  MealsResponse,
  MealDetailResponse,
  CategoriesResponse,
  MealSummary,
  Meal,
  Category,
} from '@/types'
import { LOCAL_RECIPE_MAP } from '@/data/indonesianRecipes'

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

export const mealApi = {
  search: async (query: string): Promise<MealSummary[]> => {
    const res = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`)
    const data: MealsResponse = await res.json()
    return data.meals ?? []
  },

  getById: async (id: string): Promise<Meal | null> => {
    if (id.startsWith('local-')) return LOCAL_RECIPE_MAP.get(id) ?? null
    const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`)
    const data: MealDetailResponse = await res.json()
    return data.meals?.[0] ?? null
  },

  getByCategory: async (category: string): Promise<MealSummary[]> => {
    const res = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`)
    const data: MealsResponse = await res.json()
    return data.meals ?? []
  },

  getRandom: async (): Promise<Meal | null> => {
    const res = await fetch(`${BASE_URL}/random.php`)
    const data: MealDetailResponse = await res.json()
    return data.meals?.[0] ?? null
  },

  getCategories: async (): Promise<Category[]> => {
    const res = await fetch(`${BASE_URL}/categories.php`)
    const data: CategoriesResponse = await res.json()
    return data.categories ?? []
  },

  getByIngredient: async (ingredient: string): Promise<MealSummary[]> => {
    const res = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`)
    const data: MealsResponse = await res.json()
    return data.meals ?? []
  },

  getByArea: async (area: string): Promise<MealSummary[]> => {
    const res = await fetch(`${BASE_URL}/filter.php?a=${encodeURIComponent(area)}`)
    const data: MealsResponse = await res.json()
    return data.meals ?? []
  },
}

export const extractIngredients = (meal: Meal) => {
  const ingredients: { name: string; measure: string }[] = []
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (name && name.trim()) {
      ingredients.push({ name: name.trim(), measure: measure?.trim() ?? '' })
    }
  }
  return ingredients
}

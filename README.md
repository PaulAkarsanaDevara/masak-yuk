# MasakYuk 🍳

Aplikasi resep makanan berbasis React + TypeScript + Tailwind CSS + Redux Toolkit.
Data dari [TheMealDB](https://www.themealdb.com) API (gratis, no API key).

## Fitur
- 🔍 **Cari resep** by nama (debounced search)
- 🧂 **Rekomendasi by bahan** — pilih bahan, dapat resep yang cocok
- ❤️ **Simpan favorit** — persisted ke localStorage via Redux
- 🎲 **Resep acak** di halaman beranda
- 📂 **Browse by kategori**
- 📋 **Detail resep** lengkap: bahan, langkah, link YouTube

## Stack
- React 18 + TypeScript
- Tailwind CSS 3
- Redux Toolkit + React Redux
- React Router DOM v6
- Vite

## Cara Jalankan

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build production
npm run build
```

## Struktur Folder

```
src/
├── components/
│   ├── layout/       # Navbar
│   └── ui/           # MealCard
├── hooks/            # useAppDispatch, useAppSelector
├── pages/            # HomePage, SearchPage, IngredientsPage, FavoritesPage, RecipeDetailPage
├── store/
│   └── slices/       # recipesSlice, favoritesSlice
├── types/            # TypeScript interfaces
└── utils/            # mealApi.ts (TheMealDB wrapper)
```

## API TheMealDB Endpoints yang Digunakan

| Fitur | Endpoint |
|-------|----------|
| Search by name | `/search.php?s={query}` |
| Detail resep | `/lookup.php?i={id}` |
| By kategori | `/filter.php?c={category}` |
| By bahan | `/filter.php?i={ingredient}` |
| Random | `/random.php` |
| Semua kategori | `/categories.php` |

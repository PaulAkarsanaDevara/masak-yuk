import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  fetchCategories,
  fetchByCategory,
  fetchRandom,
  setActiveCategory,
} from '@/store/slices/recipesSlice';
import MealCard from '@/components/ui/MealCard';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { categories, categoryResults, activeCategory, randomMeal, loading } =
    useAppSelector((s) => s.recipes);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchRandom());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      const first = categories[0].strCategory;
      dispatch(setActiveCategory(first));
      dispatch(fetchByCategory(first));
    }
  }, [categories, activeCategory, dispatch]);

  const handleCategoryClick = (cat: string) => {
    dispatch(setActiveCategory(cat));
    dispatch(fetchByCategory(cat));
  };

  return (
    <div className="min-h-screen bg-surface pb-24 md:pb-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="px-5 md:px-8 pt-12 md:pt-24 pb-6">
          <p className="font-body text-ink-muted text-sm mb-1 tracking-wide">
            Selamat datang 👋
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-ink leading-tight">
            Mau masak
            <br />
            <span className="text-brand-600 italic">apa hari ini?</span>
          </h1>
        </div>

        {/* Quick Actions */}
        <div className="px-5 md:px-8 mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => navigate('/search')}
            className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-gray-100 shadow-card
                       hover:border-brand-200 hover:shadow-card-hover transition-all duration-200"
          >
            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center flex-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-brand-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-body font-semibold text-ink text-sm">
                Cari Resep
              </p>
              <p className="font-body text-ink-faint text-xs">By nama</p>
            </div>
          </button>
          <button
            onClick={() => navigate('/ingredients')}
            className="flex items-center gap-3 bg-brand-600 rounded-2xl p-4 shadow-card
                       hover:bg-brand-700 hover:shadow-card-hover transition-all duration-200"
          >
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-body font-semibold text-white text-sm">
                Dari Bahan
              </p>
              <p className="font-body text-white/70 text-xs">Yang kamu punya</p>
            </div>
          </button>
          <button
            onClick={() => navigate('/favorites')}
            className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-gray-100 shadow-card
                       hover:border-rose-200 hover:shadow-card-hover transition-all duration-200"
          >
            <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center flex-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-rose-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-body font-semibold text-ink text-sm">
                Favorit
              </p>
              <p className="font-body text-ink-faint text-xs">Tersimpan</p>
            </div>
          </button>
          <button
            onClick={() => {
              dispatch(fetchRandom());
            }}
            className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-gray-100 shadow-card
                       hover:border-accent-200 hover:shadow-card-hover transition-all duration-200"
          >
            <div className="w-10 h-10 bg-accent-50 rounded-xl flex items-center justify-center flex-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-accent-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-body font-semibold text-ink text-sm">Acak</p>
              <p className="font-body text-ink-faint text-xs">Surprise me</p>
            </div>
          </button>
        </div>

        {/* Random Meal Hero */}
        {randomMeal && (
          <div className="px-5 md:px-8 mb-6">
            <p className="font-body text-xs text-ink-muted font-medium uppercase tracking-widest mb-3">
              Resep Acak
            </p>
            <div
              className="relative rounded-3xl overflow-hidden cursor-pointer group h-48 md:h-80 lg:h-96 shadow-card"
              onClick={() => navigate(`/recipe/${randomMeal.idMeal}`)}
            >
              <img
                src={randomMeal.strMealThumb}
                alt={randomMeal.strMeal}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8">
                <span className="inline-block text-[10px] font-body font-semibold bg-accent-500 text-white px-2.5 py-1 rounded-full mb-2">
                  {randomMeal.strCategory}
                </span>
                <h2 className="font-display font-bold text-white text-xl md:text-3xl leading-tight line-clamp-2">
                  {randomMeal.strMeal}
                </h2>
                <p className="font-body text-white/65 text-xs md:text-sm mt-1">
                  {randomMeal.strArea} Cuisine
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="mb-4">
          <p className="font-body text-xs text-ink-muted font-medium uppercase tracking-widest mb-3 px-5 md:px-8">
            Kategori
          </p>
          <div className="flex gap-2 overflow-x-auto px-5 md:px-8 pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.idCategory}
                onClick={() => handleCategoryClick(cat.strCategory)}
                className={`flex-none flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200
                  ${
                    activeCategory === cat.strCategory
                      ? 'bg-brand-600 text-white shadow-md scale-[1.03]'
                      : 'bg-white text-ink-muted border border-gray-100 shadow-card hover:border-brand-200 hover:shadow-card-hover'
                  }`}
              >
                <img
                  src={cat.strCategoryThumb}
                  alt=""
                  className="w-5 h-5 object-cover rounded-full"
                />
                {cat.strCategory}
              </button>
            ))}
          </div>
        </div>

        {/* Category Results */}
        <div className="px-5 md:px-8">
          {loading.search ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-card animate-pulse"
                >
                  <div className="aspect-[4/3] bg-gray-100" />
                  <div className="p-3.5">
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {categoryResults.slice(0, 12).map((meal, i) => (
                <MealCard key={meal.idMeal} meal={meal} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchMealById, clearCurrentMeal } from '@/store/slices/recipesSlice';
import { toggleFavorite } from '@/store/slices/favoritesSlice';
import { extractIngredients } from '@/utils/mealApi';

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentMeal, loading } = useAppSelector((s) => s.recipes);
  const isFav = useAppSelector((s) =>
    s.favorites.items.some((m) => m.idMeal === id),
  );

  useEffect(() => {
    if (id) dispatch(fetchMealById(id));
    return () => {
      dispatch(clearCurrentMeal());
    };
  }, [id, dispatch]);

  if (loading.detail) {
    return (
      <div className="min-h-screen bg-surface dark:bg-zinc-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg
            className="animate-spin-slow w-10 h-10 text-brand-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <p className="font-body text-ink-muted dark:text-zinc-400 text-sm">Memuat resep...</p>
        </div>
      </div>
    );
  }

  if (!currentMeal) return null;

  const ingredients = extractIngredients(currentMeal);
  const steps = currentMeal.strInstructions
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 10);

  return (
    <div className="min-h-screen bg-surface dark:bg-zinc-900 pb-10 md:pb-16">
      {/* Desktop: top bar with back + fav */}
      <div className="hidden md:flex fixed top-16 left-0 right-0 z-40
                      bg-surface/80 dark:bg-zinc-900/80 backdrop-blur-sm
                      border-b border-gray-100/60 dark:border-zinc-700/60">
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between px-8 py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-ink-muted dark:text-zinc-400 hover:text-ink dark:hover:text-zinc-100 transition-colors font-body text-sm font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Kembali
          </button>
          <button
            onClick={() =>
              dispatch(
                toggleFavorite({
                  idMeal: currentMeal.idMeal,
                  strMeal: currentMeal.strMeal,
                  strMealThumb: currentMeal.strMealThumb,
                }),
              )
            }
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-body text-sm font-medium transition-all
              ${
                isFav
                  ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 border border-rose-200 dark:border-rose-800'
                  : 'bg-white dark:bg-zinc-800 text-ink-muted dark:text-zinc-400 border border-gray-200 dark:border-zinc-600 hover:border-rose-200 dark:hover:border-rose-800 hover:text-rose-500'
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`w-4 h-4 transition-colors ${isFav ? 'fill-rose-500 stroke-rose-500' : 'fill-none stroke-current'}`}
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            {isFav ? 'Tersimpan' : 'Simpan'}
          </button>
        </div>
      </div>

      {/* Mobile: Hero Image with overlaid buttons */}
      <div className="relative h-80 md:hidden">
        <img
          src={currentMeal.strMealThumb}
          alt={currentMeal.strMeal}
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/25" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full
                     flex items-center justify-center text-white hover:bg-black/50 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </button>

        <button
          onClick={() =>
            dispatch(
              toggleFavorite({
                idMeal: currentMeal.idMeal,
                strMeal: currentMeal.strMeal,
                strMealThumb: currentMeal.strMealThumb,
              }),
            )
          }
          className="absolute top-12 right-4 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full
                     flex items-center justify-center hover:bg-black/50 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`w-5 h-5 transition-colors ${isFav ? 'fill-rose-400 stroke-rose-400' : 'fill-none stroke-white'}`}
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      </div>

      {/* Mobile: content */}
      <div className="md:hidden px-5 -mt-6 relative z-10">
        <div className="bg-white dark:bg-zinc-800 rounded-3xl shadow-card p-5 mb-4">
          <div className="flex gap-2 mb-3">
            <span className="text-xs font-body font-semibold bg-brand-50 dark:bg-brand-900/40 text-brand-700 px-3 py-1 rounded-full border border-brand-100 dark:border-brand-800">
              {currentMeal.strCategory}
            </span>
            <span className="text-xs font-body font-medium bg-gray-100 dark:bg-zinc-700 text-ink-muted dark:text-zinc-400 px-3 py-1 rounded-full">
              {currentMeal.strArea}
            </span>
          </div>
          <h1 className="font-display text-2xl font-bold text-ink dark:text-zinc-100 leading-tight mb-3">
            {currentMeal.strMeal}
          </h1>
          {currentMeal.strTags && (
            <div className="flex flex-wrap gap-1.5">
              {currentMeal.strTags.split(',').map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-body text-ink-faint dark:text-zinc-500 bg-surface-muted dark:bg-zinc-700 px-2 py-0.5 rounded-full"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-3xl shadow-card p-5 mb-4">
          <h2 className="font-display text-lg font-bold text-ink dark:text-zinc-100 mb-4">
            Bahan-bahan
            <span className="font-body font-normal text-sm text-ink-muted dark:text-zinc-400 ml-2">
              ({ingredients.length} bahan)
            </span>
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {ingredients.map((ing) => (
              <div
                key={ing.name}
                className="flex items-start gap-2.5 p-2.5 bg-surface-muted dark:bg-zinc-700 rounded-xl border-l-2 border-brand-400"
              >
                <div>
                  <p className="font-body text-sm font-semibold text-ink dark:text-zinc-100 leading-tight">
                    {ing.name}
                  </p>
                  {ing.measure && (
                    <p className="font-body text-xs text-ink-muted dark:text-zinc-400">
                      {ing.measure}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-3xl shadow-card p-5 mb-4">
          <h2 className="font-display text-lg font-bold text-ink dark:text-zinc-100 mb-4">
            Cara Membuat
          </h2>
          <div className="flex flex-col">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`flex gap-3 py-4 ${i < steps.length - 1 ? 'border-b border-gray-100 dark:border-zinc-700' : ''}`}
              >
                <div
                  className="w-8 h-8 rounded-full bg-accent-500 text-white flex items-center justify-center
                               font-body font-bold text-xs flex-none mt-0.5"
                >
                  {i + 1}
                </div>
                <p className="font-body text-sm text-ink dark:text-zinc-200 leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {currentMeal.strYoutube && (
          <a
            href={currentMeal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-red-500 text-white rounded-2xl
                       font-body font-semibold text-sm hover:bg-red-600 shadow-card hover:shadow-card-hover transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
            Tonton di YouTube
          </a>
        )}
      </div>

      {/* Desktop: 2-column layout */}
      <div className="hidden md:block pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-8">
          <div className="flex gap-8 items-start">
            {/* Left: sticky image + meta */}
            <div className="w-96 flex-none sticky top-36">
              <div className="relative rounded-3xl overflow-hidden shadow-card-hover aspect-square mb-4">
                <img
                  src={currentMeal.strMealThumb}
                  alt={currentMeal.strMeal}
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>

              <div className="bg-white dark:bg-zinc-800 rounded-3xl shadow-card p-5 mb-4">
                <div className="flex gap-2 mb-3">
                  <span className="text-xs font-body font-semibold bg-brand-50 dark:bg-brand-900/40 text-brand-700 px-3 py-1 rounded-full border border-brand-100 dark:border-brand-800">
                    {currentMeal.strCategory}
                  </span>
                  <span className="text-xs font-body font-medium bg-gray-100 dark:bg-zinc-700 text-ink-muted dark:text-zinc-400 px-3 py-1 rounded-full">
                    {currentMeal.strArea}
                  </span>
                </div>
                <h1 className="font-display text-2xl font-bold text-ink dark:text-zinc-100 leading-tight mb-3">
                  {currentMeal.strMeal}
                </h1>
                {currentMeal.strTags && (
                  <div className="flex flex-wrap gap-1.5">
                    {currentMeal.strTags.split(',').map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-body text-ink-faint dark:text-zinc-500 bg-surface-muted dark:bg-zinc-700 px-2 py-0.5 rounded-full"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {currentMeal.strYoutube && (
                <a
                  href={currentMeal.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-red-500 text-white rounded-2xl
                             font-body font-semibold text-sm hover:bg-red-600 shadow-card hover:shadow-card-hover transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                  Tonton di YouTube
                </a>
              )}
            </div>

            {/* Right: ingredients + instructions */}
            <div className="flex-1 min-w-0">
              <div className="bg-white dark:bg-zinc-800 rounded-3xl shadow-card p-6 mb-4">
                <h2 className="font-display text-xl font-bold text-ink dark:text-zinc-100 mb-4">
                  Bahan-bahan
                  <span className="font-body font-normal text-sm text-ink-muted dark:text-zinc-400 ml-2">
                    ({ingredients.length} bahan)
                  </span>
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {ingredients.map((ing) => (
                    <div
                      key={ing.name}
                      className="flex items-start gap-2.5 p-2.5 bg-surface-muted dark:bg-zinc-700 rounded-xl border-l-2 border-brand-400"
                    >
                      <div>
                        <p className="font-body text-sm font-semibold text-ink dark:text-zinc-100 leading-tight">
                          {ing.name}
                        </p>
                        {ing.measure && (
                          <p className="font-body text-xs text-ink-muted dark:text-zinc-400">
                            {ing.measure}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-800 rounded-3xl shadow-card p-6">
                <h2 className="font-display text-xl font-bold text-ink dark:text-zinc-100 mb-4">
                  Cara Membuat
                </h2>
                <div className="flex flex-col">
                  {steps.map((step, i) => (
                    <div
                      key={i}
                      className={`flex gap-4 py-4 ${i < steps.length - 1 ? 'border-b border-gray-100 dark:border-zinc-700' : ''}`}
                    >
                      <div
                        className="w-8 h-8 rounded-full bg-accent-500 text-white flex items-center justify-center
                                     font-body font-bold text-xs flex-none mt-0.5"
                      >
                        {i + 1}
                      </div>
                      <p className="font-body text-sm text-ink dark:text-zinc-200 leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

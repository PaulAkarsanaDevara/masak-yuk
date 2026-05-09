import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { searchMeals, setSearchQuery } from '@/store/slices/recipesSlice';
import MealCard from '@/components/ui/MealCard';

export default function SearchPage() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { searchResults, searchQuery, loading } = useAppSelector(
    (s) => s.recipes,
  );
  const [input, setInput] = useState(searchQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
    // Baca query dari URL (misal: /search?q=nasi)
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (q && q !== input) {
      handleChange(q);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (val: string) => {
    setInput(val);
    dispatch(setSearchQuery(val));
    if (timerRef.current) clearTimeout(timerRef.current);
    if (val.trim().length >= 2) {
      timerRef.current = setTimeout(() => {
        dispatch(searchMeals(val.trim()));
      }, 500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) dispatch(searchMeals(input.trim()));
  };

  return (
    <div className="min-h-screen bg-surface dark:bg-zinc-900 pb-24 md:pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="px-5 md:px-8 pt-12 md:pt-24 pb-4">
          <h1 className="font-display text-2xl md:text-4xl font-bold text-ink dark:text-zinc-100 mb-4">
            Cari Resep
          </h1>
          <form onSubmit={handleSubmit} className="relative max-w-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-faint dark:text-zinc-500"
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
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Cari nama resep... (min. 2 karakter)"
              className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-zinc-800
                         border border-gray-100 dark:border-zinc-700 rounded-2xl
                         font-body text-sm text-ink dark:text-zinc-100 shadow-card
                         placeholder:text-ink-faint dark:placeholder:text-zinc-500
                         focus:outline-none focus:border-brand-300 dark:focus:border-brand-600
                         focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900/50 transition-all"
            />
            {input && (
              <button
                type="button"
                onClick={() => {
                  setInput('');
                  dispatch(setSearchQuery(''));
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-faint dark:text-zinc-500 hover:text-ink-muted dark:hover:text-zinc-300 transition-colors"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </form>
        </div>

        <div className="px-5 md:px-8">
          {loading.search && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-zinc-700 shadow-card animate-pulse"
                >
                  <div className="aspect-[4/3] bg-gray-100 dark:bg-zinc-700" />
                  <div className="p-3.5">
                    <div className="h-4 bg-gray-100 dark:bg-zinc-700 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading.search && input && searchResults.length === 0 && (
            <div className="text-center py-16">
              <div className="relative w-20 h-20 mx-auto mb-5">
                <div className="absolute inset-0 bg-gray-100 dark:bg-zinc-700 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center text-4xl">
                  🍽️
                </div>
              </div>
              <p className="font-body font-semibold text-ink dark:text-zinc-100">
                Resep tidak ditemukan
              </p>
              <p className="font-body text-ink-muted dark:text-zinc-400 text-sm mt-1">
                Coba kata kunci lain
              </p>
            </div>
          )}

          {!loading.search && searchResults.length > 0 && (
            <>
              <p className="font-body text-sm text-ink-muted dark:text-zinc-400 mb-3">
                <span className="font-semibold text-ink dark:text-zinc-100">
                  {searchResults.length}
                </span>{' '}
                resep ditemukan
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {searchResults.map((meal, i) => (
                  <MealCard key={meal.idMeal} meal={meal} index={i} />
                ))}
              </div>
            </>
          )}

          {!input && (
            <div className="text-center py-16">
              <div className="relative w-24 h-24 mx-auto mb-5">
                <div className="absolute inset-0 bg-brand-50 dark:bg-brand-900/30 rounded-full" />
                <div className="absolute inset-2 bg-brand-100 dark:bg-brand-800/40 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 text-brand-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
              </div>
              <p className="font-body font-semibold text-ink dark:text-zinc-100">
                Ketik nama resep
              </p>
              <p className="font-body text-ink-muted dark:text-zinc-400 text-sm mt-1">
                Contoh: Chicken, Pasta, Sushi
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {['Chicken', 'Pasta', 'Beef', 'Sushi'].map((hint) => (
                  <button
                    key={hint}
                    onClick={() => handleChange(hint)}
                    className="px-3 py-1.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-600 rounded-full
                               text-xs font-body font-medium text-ink-muted dark:text-zinc-400 shadow-card
                               hover:border-brand-300 dark:hover:border-brand-600 hover:text-brand-700 dark:hover:text-brand-400 transition-all"
                  >
                    {hint}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

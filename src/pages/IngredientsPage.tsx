import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchByIngredient } from '@/store/slices/recipesSlice';
import MealCard from '@/components/ui/MealCard';

const POPULAR_INGREDIENTS = [
  'Chicken',
  'Beef',
  'Salmon',
  'Egg',
  'Pasta',
  'Tomato',
  'Garlic',
  'Onion',
  'Potato',
  'Rice',
  'Cheese',
  'Butter',
  'Flour',
  'Milk',
  'Lemon',
];

export default function IngredientsPage() {
  const dispatch = useAppDispatch();
  const { ingredientResults, loading } = useAppSelector((s) => s.recipes);
  const [selected, setSelected] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState('');
  const [searched, setSearched] = useState(false);

  const toggleIngredient = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name],
    );
  };

  const addCustom = () => {
    const trimmed = customInput.trim();
    if (trimmed && !selected.includes(trimmed)) {
      setSelected((prev) => [...prev, trimmed]);
    }
    setCustomInput('');
  };

  const handleSearch = () => {
    if (selected.length === 0) return;
    setSearched(true);
    dispatch(fetchByIngredient(selected));
  };

  return (
    <div className="min-h-screen bg-surface dark:bg-zinc-900 pb-24 md:pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="px-5 md:px-8 pt-12 md:pt-24 pb-6">
          <h1 className="font-display text-2xl md:text-4xl font-bold text-ink dark:text-zinc-100 mb-1">
            Dari Bahan Yang Ada
          </h1>
          <p className="font-body text-sm text-ink-muted dark:text-zinc-400">
            Pilih bahan, kami carikan resepnya
          </p>
        </div>

        {/* Desktop: side-by-side layout for selector + results */}
        <div className="md:flex md:gap-8 md:px-8 md:items-start">
          {/* Left panel: ingredient selection */}
          <div className="md:w-80 md:flex-none md:sticky md:top-24">
            {/* Custom Input */}
            <div className="px-5 md:px-0 mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addCustom()}
                  placeholder="Tambah bahan lain..."
                  className="flex-1 px-4 py-3 bg-white dark:bg-zinc-800
                             border border-gray-100 dark:border-zinc-700 rounded-2xl
                             font-body text-sm text-ink dark:text-zinc-100 shadow-card
                             placeholder:text-ink-faint dark:placeholder:text-zinc-500
                             focus:outline-none focus:border-brand-300 dark:focus:border-brand-600
                             focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900/50 transition-all"
                />
                <button
                  onClick={addCustom}
                  disabled={!customInput.trim()}
                  className="px-4 py-3 bg-brand-600 text-white rounded-2xl font-body font-semibold text-sm shadow-card
                             hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Tambah
                </button>
              </div>
            </div>

            {/* Popular Ingredients */}
            <div className="px-5 md:px-0 mb-6">
              <p className="font-body text-xs text-ink-muted dark:text-zinc-400 font-medium uppercase tracking-widest mb-3">
                Bahan Populer
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_INGREDIENTS.map((ing) => (
                  <button
                    key={ing}
                    onClick={() => toggleIngredient(ing)}
                    className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200
                      ${
                        selected.includes(ing)
                          ? 'bg-brand-600 text-white shadow-md scale-[1.03]'
                          : 'bg-white dark:bg-zinc-800 text-ink-muted dark:text-zinc-400 border border-gray-100 dark:border-zinc-700 shadow-card hover:border-brand-200 dark:hover:border-brand-700'
                      }`}
                  >
                    {ing}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected */}
            {selected.length > 0 && (
              <div className="px-5 md:px-0 mb-5">
                <p className="font-body text-xs text-ink-muted dark:text-zinc-400 font-medium uppercase tracking-widest mb-3">
                  Bahan Dipilih ({selected.length})
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selected.map((ing) => (
                    <span
                      key={ing}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 rounded-full text-sm font-body font-semibold border border-accent-200 dark:border-accent-800 shadow-sm"
                    >
                      {ing}
                      <button
                        onClick={() =>
                          setSelected((prev) => prev.filter((i) => i !== ing))
                        }
                        className="text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors ml-0.5"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
                <button
                  onClick={handleSearch}
                  disabled={loading.ingredient}
                  className="w-full py-3.5 bg-brand-600 text-white rounded-2xl font-body font-semibold text-sm shadow-card
                             hover:bg-brand-700 disabled:opacity-60 transition-all flex items-center justify-center gap-2"
                >
                  {loading.ingredient ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4"
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
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Mencari...
                    </>
                  ) : (
                    <>
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
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                      Carikan Resep
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right panel: Results */}
          <div className="flex-1 px-5 md:px-0">
            {searched &&
              !loading.ingredient &&
              ingredientResults.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">😅</div>
                  <p className="font-body font-semibold text-ink dark:text-zinc-100">
                    Tidak ada resep cocok
                  </p>
                  <p className="font-body text-ink-muted dark:text-zinc-400 text-sm mt-1">
                    Coba kurangi jumlah bahan
                  </p>
                </div>
              )}

            {!loading.ingredient && ingredientResults.length > 0 && (
              <>
                <p className="font-body text-sm text-ink-muted dark:text-zinc-400 mb-3">
                  <span className="font-semibold text-ink dark:text-zinc-100">
                    {ingredientResults.length}
                  </span>{' '}
                  resep ditemukan
                </p>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {ingredientResults.slice(0, 20).map((meal, i) => (
                    <MealCard key={meal.idMeal} meal={meal} index={i} />
                  ))}
                </div>
              </>
            )}

            {!searched && ingredientResults.length === 0 && (
              <div className="hidden md:flex flex-col items-center justify-center py-24 text-center">
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
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                      />
                    </svg>
                  </div>
                </div>
                <p className="font-body font-semibold text-ink dark:text-zinc-100">
                  Pilih bahan dulu
                </p>
                <p className="font-body text-ink-muted dark:text-zinc-400 text-sm mt-1">
                  Pilih bahan dari kiri, lalu klik Carikan Resep
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

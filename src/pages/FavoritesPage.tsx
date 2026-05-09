import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { toggleFavorite } from '@/store/slices/favoritesSlice';
import MealCard from '@/components/ui/MealCard';
import { useNavigate } from 'react-router-dom';

export default function FavoritesPage() {
  const favorites = useAppSelector((s) => s.favorites.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface dark:bg-zinc-900 pb-24 md:pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="px-5 md:px-8 pt-12 md:pt-24 pb-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl md:text-4xl font-bold text-ink dark:text-zinc-100">
              Favorit Saya
            </h1>
            <p className="font-body text-sm text-ink-muted dark:text-zinc-400 mt-0.5">
              <span className="font-semibold text-ink dark:text-zinc-100">{favorites.length}</span>{' '}
              resep tersimpan
            </p>
          </div>
          {favorites.length > 0 && (
            <button
              onClick={() => {
                if (confirm('Hapus semua favorit?')) {
                  favorites.forEach((m) => dispatch(toggleFavorite(m)));
                }
              }}
              className="text-sm font-body font-medium text-rose-500 hover:text-rose-600 transition-colors"
            >
              Hapus semua
            </button>
          )}
        </div>

        <div className="px-5 md:px-8">
          {favorites.length === 0 ? (
            <div className="text-center py-16">
              <div className="relative w-28 h-28 mx-auto mb-6">
                <div className="absolute inset-0 bg-rose-50 dark:bg-rose-900/20 rounded-full" />
                <div className="absolute inset-3 bg-rose-100 dark:bg-rose-900/30 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="w-11 h-11 text-rose-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </div>
              </div>
              <p className="font-body font-semibold text-ink dark:text-zinc-100 mb-1.5">
                Belum ada favorit
              </p>
              <p className="font-body text-ink-muted dark:text-zinc-400 text-sm mb-6">
                Tap ikon hati di resep untuk menyimpannya
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-brand-600 text-white rounded-2xl font-body font-semibold text-sm
                           hover:bg-brand-700 shadow-card hover:shadow-card-hover transition-all"
              >
                Jelajahi Resep
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {favorites.map((meal, i) => (
                <MealCard key={meal.idMeal} meal={meal} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

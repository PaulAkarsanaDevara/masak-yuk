import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { toggleFavorite } from '@/store/slices/favoritesSlice';
import type { MealSummary } from '@/types';

interface MealCardProps {
  meal: MealSummary;
  index?: number;
}

export default function MealCard({ meal, index = 0 }: MealCardProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isFav = useAppSelector((s) =>
    s.favorites.items.some((m) => m.idMeal === meal.idMeal),
  );

  const delay = `${index * 60}ms`;

  return (
    <div
      className="group relative bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden
                 border border-gray-100/80 dark:border-zinc-700/80 cursor-pointer
                 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 animate-slide-up"
      style={{ animationDelay: delay }}
      onClick={() => navigate(`/recipe/${meal.idMeal}`)}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={`${meal.strMealThumb}/preview`}
          alt={meal.strMeal}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
          width={220}
          height={165}
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
            const placeholder = target.nextElementSibling as HTMLElement | null;
            if (placeholder) placeholder.style.display = 'flex';
          }}
        />
        <div
          className="w-full h-full bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/40 dark:to-brand-800/60
                     items-center justify-center text-4xl hidden absolute inset-0"
          aria-hidden
        >
          🍽️
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleFavorite(meal));
          }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full
                     bg-white/95 dark:bg-zinc-800/95 backdrop-blur-sm
                     flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-transform"
          aria-label={isFav ? 'Hapus dari favorit' : 'Tambah ke favorit'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`w-4 h-4 transition-colors ${isFav ? 'fill-rose-500 stroke-rose-500' : 'fill-none stroke-gray-400 dark:stroke-zinc-400'}`}
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
      <div className="p-3.5">
        <h3 className="font-body font-semibold text-ink dark:text-zinc-100 text-sm leading-snug line-clamp-2">
          {meal.strMeal}
        </h3>
      </div>
    </div>
  );
}

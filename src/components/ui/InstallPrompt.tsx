import { useInstallPrompt } from '@/hooks/usePWA';

export default function InstallPrompt() {
  const { canInstall, install, dismiss } = useInstallPrompt();

  if (!canInstall) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-80 z-40
                    animate-slide-up">
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-card-hover
                      border border-gray-100 dark:border-zinc-700 p-4 flex items-center gap-3">
        {/* App icon */}
        <div className="w-12 h-12 bg-brand-600 rounded-xl flex items-center justify-center flex-none shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-white"
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

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="font-body font-semibold text-ink dark:text-zinc-100 text-sm">
            Install MasakYuk
          </p>
          <p className="font-body text-ink-faint dark:text-zinc-500 text-xs">
            Akses cepat tanpa browser
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-none">
          <button
            onClick={dismiss}
            className="p-1.5 text-ink-faint dark:text-zinc-500 hover:text-ink-muted dark:hover:text-zinc-300 transition-colors"
            aria-label="Tutup"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            onClick={install}
            className="px-3 py-1.5 bg-brand-600 text-white rounded-xl font-body font-semibold text-xs
                       hover:bg-brand-700 transition-colors shadow-sm"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
}

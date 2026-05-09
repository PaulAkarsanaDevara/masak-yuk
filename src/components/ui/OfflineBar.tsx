import { useOnlineStatus } from '@/hooks/usePWA';

export default function OfflineBar() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-amber-500 text-white
                    px-4 py-2 flex items-center justify-center gap-2 text-sm font-body font-medium
                    shadow-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 flex-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18.364 5.636a9 9 0 010 12.728M15.536 8.464a5 5 0 010 7.072M4.93 4.93a9 9 0 000 12.728M7.757 7.757a5 5 0 000 7.072M12 18.75h.008v.008H12v-.008zM12 12a.75.75 0 110-1.5.75.75 0 010 1.5z"
        />
      </svg>
      Kamu sedang offline — menampilkan data tersimpan
    </div>
  );
}

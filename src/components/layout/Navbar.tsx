import { NavLink } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux';

const navItems = [
  {
    to: '/',
    label: 'Beranda',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={1.8}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
  },
  {
    to: '/search',
    label: 'Cari',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={1.8}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    ),
  },
  {
    to: '/ingredients',
    label: 'Bahan',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={1.8}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
        />
      </svg>
    ),
  },
  {
    to: '/favorites',
    label: 'Favorit',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={1.8}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    ),
    badge: true,
  },
];

export default function Navbar() {
  const favCount = useAppSelector((s) => s.favorites.items.length);

  return (
    <>
      {/* Desktop: Top horizontal navbar */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 bg-white/96 backdrop-blur-md z-50 border-b border-gray-100/60 h-16 shadow-sm">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between px-8">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-brand-600 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-brand-700 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-white"
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
            <span className="font-display text-xl font-bold text-ink">
              Masak<span className="text-brand-600">Yuk</span>
            </span>
          </NavLink>

          {/* Nav links */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 px-4 py-2 rounded-xl font-body font-medium text-sm transition-all duration-200
                  ${
                    isActive
                      ? 'bg-brand-50 text-brand-600'
                      : 'text-ink-muted hover:text-ink hover:bg-gray-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'scale-100'}`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                    {item.badge && favCount > 0 && (
                      <span className="bg-accent-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {favCount > 9 ? '9+' : favCount}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile: Bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/96 backdrop-blur-md z-50 shadow-nav border-t border-gray-100/60">
        <div className="max-w-lg mx-auto flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center gap-1 py-3 relative transition-all duration-200
                ${isActive ? 'text-brand-600' : 'text-ink-faint hover:text-ink-muted'}`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-brand-600 rounded-full" />
                  )}
                  <span
                    className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'scale-100'}`}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={`text-[10px] font-body font-medium transition-all duration-200 ${isActive ? 'font-semibold' : ''}`}
                  >
                    {item.label}
                  </span>
                  {item.badge && favCount > 0 && (
                    <span className="absolute top-2 right-[calc(50%-14px)] bg-accent-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {favCount > 9 ? '9+' : favCount}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}

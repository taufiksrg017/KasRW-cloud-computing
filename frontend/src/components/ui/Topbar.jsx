import { Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../../contexts/AuthContext';

const Topbar = ({ title, showSearch = true }) => {
  const { admin } = useAuth();
  const inisial = admin?.nama?.split(' ').map(w => w[0]).slice(0, 2).join('') || 'AD';

  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur border-b border-gray-200 dark:border-slate-700 px-8 py-4">
      <div className="flex items-center justify-between gap-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h1>

        <div className="flex items-center gap-3">
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari transaksi..."
                className="pl-10 pr-4 py-2 w-64 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          )}

          <ThemeToggle />

          <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-slate-700">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{admin?.nama || 'Admin'}</p>
              <p className="text-xs text-gray-500 uppercase">Administrator</p>
            </div>
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {inisial}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
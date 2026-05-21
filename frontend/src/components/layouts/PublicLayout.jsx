import { Outlet, Link } from 'react-router-dom';
import { Wallet } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/laporan-publik" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg text-gray-900 dark:text-white">KasRW</span>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider -mt-1">Laporan Publik</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/login" className="btn-primary text-sm">Login Admin</Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-gray-200 dark:border-slate-700 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-xs text-gray-500">
          <span>© 2026 KasRW Digital Treasury. System Status: <span className="text-primary-600">Online</span></span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary-600">Panduan</a>
            <a href="#" className="hover:text-primary-600">Kontak</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
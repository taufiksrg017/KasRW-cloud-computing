import { Outlet } from 'react-router-dom';
import Sidebar from '../ui/Sidebar';
import Topbar from '../ui/Topbar';

const AdminLayout = ({ title, showSearch }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar title={title} showSearch={showSearch} />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
        <footer className="px-8 py-4 text-xs text-gray-500 flex justify-between border-t border-gray-200 dark:border-slate-700">
          <span>© 2026 KasRW Digital Treasury. System Status: <span className="text-primary-600">Online</span></span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary-600">Panduan</a>
            <a href="#" className="hover:text-primary-600">Kebijakan Privasi</a>
            <a href="#" className="hover:text-primary-600">Kontak</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
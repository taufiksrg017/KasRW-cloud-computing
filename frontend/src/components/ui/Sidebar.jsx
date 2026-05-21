import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Receipt, FileText, Settings, Plus, HelpCircle, LogOut, Wallet } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const menuItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transaksi', label: 'Transaksi', icon: Receipt },
  { to: '/laporan', label: 'Laporan', icon: FileText },
  { to: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Berhasil logout');
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 h-screen sticky top-0 flex flex-col">
      <div className="px-6 py-6 border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 dark:text-white">KasRW</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Kas Digital RW</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-800/20 text-primary-700 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 space-y-2 border-t border-gray-200 dark:border-slate-700">
        <button
          onClick={() => navigate('/transaksi/tambah')}
          className="btn-primary w-full"
        >
          <Plus className="w-4 h-4" />
          Tambah Transaksi
        </button>
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 w-full">
          <HelpCircle className="w-5 h-5" />
          Bantuan
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 w-full"
        >
          <LogOut className="w-5 h-5" />
          Keluar
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
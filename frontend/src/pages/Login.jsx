import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Wallet, User, Lock, Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from '../components/ui/ThemeToggle';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.username, form.password);
      toast.success('Login berhasil!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-slate-900">
      <div className="absolute top-4 left-4 z-10">
        <Link
          to="/laporan-publik"
          className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur border border-gray-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-slate-800 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Halaman Warga
        </Link>
      </div>
      <div className="absolute top-4 right-4 z-10"><ThemeToggle /></div>

      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary-500 to-primary-700 items-center justify-center p-12 text-white">
        <div className="max-w-md">
          <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-6">
            <Wallet className="w-9 h-9" />
          </div>
          <h2 className="text-4xl font-bold mb-3">KasRW Digital</h2>
          <p className="text-lg text-white/90 mb-8">Sistem Pencatatan Kas RT/RW yang transparan, akuntabel, dan mudah digunakan.</p>
          <div className="space-y-3">
            {[
              'Catat pemasukan & pengeluaran',
              'Pantau saldo real-time',
              'Transparan & akuntabel',
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-lg px-4 py-3">
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="md:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl">KasRW</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Masuk sebagai Admin</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Silakan masuk untuk mengelola kas RW</p>

          {error && (
            <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="input-field pl-10"
                  placeholder="Masukkan username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-field pl-10 pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? (<><Loader2 className="w-4 h-4 animate-spin" /> Memproses...</>) : 'Masuk'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-8">© 2026 KasRW — Tugas Cloud Computing</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
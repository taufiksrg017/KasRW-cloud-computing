import { useState } from 'react';
import { Lock, Save, Loader2, Eye, EyeOff, User, ShieldCheck } from 'lucide-react';
import { authAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Settings = () => {
  const { admin } = useAuth();
  const [form, setForm] = useState({
    passwordLama: '',
    passwordBaru: '',
    konfirmasi: '',
  });
  const [show, setShow] = useState({ lama: false, baru: false, konf: false });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.passwordBaru !== form.konfirmasi) {
      toast.error('Konfirmasi password tidak cocok');
      return;
    }
    if (form.passwordBaru.length < 6) {
      toast.error('Password baru minimal 6 karakter');
      return;
    }
    if (form.passwordLama === form.passwordBaru) {
      toast.error('Password baru tidak boleh sama dengan yang lama');
      return;
    }

    setLoading(true);
    try {
      await authAPI.changePassword({
        passwordLama: form.passwordLama,
        passwordBaru: form.passwordBaru,
      });
      toast.success('Password berhasil diubah!');
      setForm({ passwordLama: '', passwordBaru: '', konfirmasi: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal mengubah password');
    } finally {
      setLoading(false);
    }
  };

  const inisial = admin?.nama?.split(' ').map(w => w[0]).slice(0, 2).join('') || 'AD';

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Profil Card */}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-primary-600" /> Profil Admin
        </h2>
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {inisial}
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{admin?.nama}</p>
            <p className="text-sm text-gray-500">@{admin?.username}</p>
            <span className="inline-flex items-center gap-1 mt-2 badge bg-primary-100 text-primary-700">
              <ShieldCheck className="w-3 h-3" /> Bendahara RW
            </span>
          </div>
        </div>
      </div>

      {/* Ganti Password Card */}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
          <Lock className="w-5 h-5 text-primary-600" /> Ubah Password
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
          Pastikan password baru aman dan minimal 6 karakter.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { key: 'passwordLama', label: 'Password Lama', showKey: 'lama' },
            { key: 'passwordBaru', label: 'Password Baru', showKey: 'baru' },
            { key: 'konfirmasi', label: 'Konfirmasi Password Baru', showKey: 'konf' },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                {field.label}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={show[field.showKey] ? 'text' : 'password'}
                  value={form[field.key]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  className="input-field pl-10 pr-10"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShow({ ...show, [field.showKey]: !show[field.showKey] })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {show[field.showKey] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...</> : <><Save className="w-4 h-4" /> Simpan Password Baru</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, Calendar, Save, X, Loader2 } from 'lucide-react';
import { transaksiAPI } from '../../services/api';
import { formatDateInput } from '../../utils/formatter';
import toast from 'react-hot-toast';

const TransaksiForm = ({ mode = 'create', initialData = null }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    jenis: 'PEMASUKAN',
    tanggal: formatDateInput(new Date()),
    nominal: '',
    keterangan: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        jenis: initialData.jenis,
        tanggal: formatDateInput(initialData.tanggal),
        nominal: initialData.nominal.toString(),
        keterangan: initialData.keterangan,
      });
    }
  }, [initialData]);

  const handleNominalChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '');
    setForm({ ...form, nominal: raw });
  };

  const formatNominal = (val) => {
    if (!val) return '';
    return parseInt(val).toLocaleString('id-ID');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!form.nominal || parseInt(form.nominal) <= 0) {
      setErrors({ nominal: 'Nominal harus lebih dari 0' });
      return;
    }
    if (!form.keterangan || form.keterangan.length < 3) {
      setErrors({ keterangan: 'Keterangan minimal 3 karakter' });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        jenis: form.jenis,
        nominal: parseInt(form.nominal),
        keterangan: form.keterangan,
        tanggal: form.tanggal,
      };
      if (mode === 'create') {
        await transaksiAPI.create(payload);
        toast.success('Transaksi berhasil ditambahkan!');
      } else {
        await transaksiAPI.update(initialData.id, payload);
        toast.success('Transaksi berhasil diperbarui!');
      }
      navigate('/transaksi');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal menyimpan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {mode === 'create' ? 'Tambah Transaksi Baru' : 'Edit Transaksi'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Catat aliran dana kas lingkungan secara akurat.
            </p>
          </div>
          <span className="badge bg-primary-100 text-primary-700">
            {mode === 'create' ? 'Draft Otomatis' : 'Mode Edit'}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-3">
              Jenis Transaksi
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 dark:bg-slate-700 rounded-lg">
              <button
                type="button"
                onClick={() => setForm({ ...form, jenis: 'PEMASUKAN' })}
                className={`flex items-center justify-center gap-2 py-3 rounded-md font-semibold transition-all ${
                  form.jenis === 'PEMASUKAN'
                    ? 'bg-white dark:bg-slate-800 text-primary-700 shadow-sm'
                    : 'text-gray-500'
                }`}
              >
                <Plus className="w-4 h-4" /> Pemasukan
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, jenis: 'PENGELUARAN' })}
                className={`flex items-center justify-center gap-2 py-3 rounded-md font-semibold transition-all ${
                  form.jenis === 'PENGELUARAN'
                    ? 'bg-white dark:bg-slate-800 text-rose-700 shadow-sm'
                    : 'text-gray-500'
                }`}
              >
                <Minus className="w-4 h-4" /> Pengeluaran
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
                Tanggal
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="date"
                  value={form.tanggal}
                  onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
                Nominal (Rp)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">Rp</span>
                <input
                  type="text"
                  value={formatNominal(form.nominal)}
                  onChange={handleNominalChange}
                  className={`input-field pl-10 ${errors.nominal ? 'border-rose-500 focus:ring-rose-500' : ''}`}
                  placeholder="0"
                  required
                />
              </div>
              {errors.nominal && <p className="text-xs text-rose-600 mt-1">{errors.nominal}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
              Deskripsi
            </label>
            <textarea
              value={form.keterangan}
              onChange={(e) => setForm({ ...form, keterangan: e.target.value })}
              rows={3}
              className={`input-field resize-none ${errors.keterangan ? 'border-rose-500 focus:ring-rose-500' : ''}`}
              placeholder="Tuliskan keterangan detail transaksi di sini..."
              maxLength={500}
            />
            <div className="flex justify-between mt-1">
              {errors.keterangan ? (
                <p className="text-xs text-rose-600">{errors.keterangan}</p>
              ) : <span />}
              <p className="text-xs text-gray-400">{form.keterangan.length} / 500</p>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => navigate('/transaksi')}
              className="btn-secondary flex-1 flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" /> Batal
            </button>
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...</> : <><Save className="w-4 h-4" /> Simpan Transaksi</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransaksiForm;
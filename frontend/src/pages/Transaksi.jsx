import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, Pencil, Trash2, ChevronLeft, ChevronRight, TrendingUp, TrendingDown, Building2 } from 'lucide-react';
import { transaksiAPI } from '../services/api';
import { formatRupiah, formatTanggal } from '../utils/formatter';
import Badge from '../components/ui/Badge';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import toast from 'react-hot-toast';

const PER_PAGE = 5;

const Transaksi = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ saldo: {}, transaksi: [] });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ search: '', jenis: '', dari: '', sampai: '' });
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);

  const fetch = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filter.jenis) params.jenis = filter.jenis;
      if (filter.dari) params.dari = filter.dari;
      if (filter.sampai) params.sampai = filter.sampai;
      const res = await transaksiAPI.getAll(params);
      setData(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  const handleApply = () => { setPage(1); fetch(); };

  const filtered = data.transaksi.filter((t) =>
    filter.search ? t.keterangan.toLowerCase().includes(filter.search.toLowerCase()) : true
  );
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleDelete = async () => {
    try {
      await transaksiAPI.delete(deleteId);
      toast.success('Transaksi berhasil dihapus');
      setDeleteId(null);
      fetch();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal hapus');
    }
  };

  const bulan = new Date().getMonth();
  const tahun = new Date().getFullYear();
  const bulanIni = data.transaksi.filter((t) => {
    const d = new Date(t.tanggal);
    return d.getMonth() === bulan && d.getFullYear() === tahun;
  });
  const pemasukanBulan = bulanIni.filter(t => t.jenis === 'PEMASUKAN').reduce((s, t) => s + parseInt(t.nominal), 0);
  const pengeluaranBulan = bulanIni.filter(t => t.jenis === 'PENGELUARAN').reduce((s, t) => s + parseInt(t.nominal), 0);

  return (
    <div className="space-y-6">
      <div className="card p-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Pencarian</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={filter.search}
                onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                className="input-field pl-10"
                placeholder="Cari transaksi..."
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Kategori</label>
            <select value={filter.jenis} onChange={(e) => setFilter({ ...filter, jenis: e.target.value })} className="input-field">
              <option value="">Semua Kategori</option>
              <option value="PEMASUKAN">Pemasukan</option>
              <option value="PENGELUARAN">Pengeluaran</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Rentang Tanggal</label>
            <input
              type="date"
              value={filter.dari}
              onChange={(e) => setFilter({ ...filter, dari: e.target.value })}
              className="input-field"
            />
          </div>
          <button onClick={handleApply} className="btn-primary">
            <SlidersHorizontal className="w-4 h-4" /> Terapkan
          </button>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-700">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">Tanggal</th>
                <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">Deskripsi</th>
                <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">Kategori</th>
                <th className="text-right px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">Nominal</th>
                <th className="text-center px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {loading ? (
                <tr><td colSpan="5" className="text-center py-12 text-gray-500">Memuat...</td></tr>
              ) : paginated.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-12 text-gray-500">Belum ada transaksi</td></tr>
              ) : paginated.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30">
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{formatTanggal(t.tanggal)}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    <Link to={`/transaksi/${t.id}`} className="hover:text-primary-600">{t.keterangan}</Link>
                  </td>
                  <td className="px-6 py-4"><Badge jenis={t.jenis} /></td>
                  <td className={`px-6 py-4 text-sm font-bold text-right tabular-nums ${
                    t.jenis === 'PEMASUKAN' ? 'text-primary-600' : 'text-rose-600'
                  }`}>
                    {t.jenis === 'PEMASUKAN' ? '+' : '-'} {formatRupiah(t.nominal)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => navigate(`/transaksi/${t.id}/edit`)}
                        className="p-1.5 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(t.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-slate-700">
            <p className="text-sm text-gray-500">Halaman {page} dari {totalPages}</p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="p-2 rounded hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded text-sm font-semibold ${
                    page === p ? 'bg-primary-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="p-2 rounded hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-5 flex items-center gap-4 bg-primary-50 dark:bg-primary-900/10 border-primary-200 dark:border-primary-800/30">
          <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Pemasukan Bulan Ini</p>
            <p className="text-xl font-bold text-primary-700 dark:text-primary-400 tabular-nums">{formatRupiah(pemasukanBulan)}</p>
          </div>
        </div>
        <div className="card p-5 flex items-center gap-4 bg-rose-50 dark:bg-rose-900/10 border-rose-200 dark:border-rose-800/30">
          <div className="w-12 h-12 bg-rose-600 rounded-lg flex items-center justify-center">
            <TrendingDown className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Pengeluaran Bulan Ini</p>
            <p className="text-xl font-bold text-rose-700 dark:text-rose-400 tabular-nums">{formatRupiah(pengeluaranBulan)}</p>
          </div>
        </div>
        <div className="card p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-700 dark:bg-gray-600 rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Total Saldo Kas</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white tabular-nums">{formatRupiah(data.saldo?.saldo || 0)}</p>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={!!deleteId}
        title="Hapus Transaksi?"
        message="Apakah Anda yakin ingin menghapus transaksi ini? Tindakan ini tidak dapat dibatalkan dan saldo akan otomatis diperbarui."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

export default Transaksi;
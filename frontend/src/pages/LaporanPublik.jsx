import { useEffect, useState } from 'react';
import { ShieldCheck, TrendingUp, Info, ArrowDown, ArrowUp } from 'lucide-react';
import { transaksiAPI } from '../services/api';
import { formatRupiah, formatTanggal } from '../utils/formatter';
import Badge from '../components/ui/Badge';

const LaporanPublik = () => {
  const [data, setData] = useState({ saldo: {}, transaksi: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    transaksiAPI.getAll()
      .then((res) => setData(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  const bulan = new Date().getMonth();
  const tahun = new Date().getFullYear();
  const bulanIni = data.transaksi.filter((t) => {
    const d = new Date(t.tanggal);
    return d.getMonth() === bulan && d.getFullYear() === tahun;
  });
  const namaBulan = new Date().toLocaleDateString('id-ID', { month: 'long' });
  const pemasukan = bulanIni.filter(t => t.jenis === 'PEMASUKAN').reduce((s, t) => s + parseInt(t.nominal), 0);
  const pengeluaran = bulanIni.filter(t => t.jenis === 'PENGELUARAN').reduce((s, t) => s + parseInt(t.nominal), 0);

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-10 w-10 border-4 border-primary-500 border-t-transparent"></div></div>;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <h1 className="text-3xl font-bold mb-3">Laporan Transparansi Kas RW 25</h1>
        <p className="text-white/90 mb-5 max-w-xl">
          Mewujudkan lingkungan yang akuntabel dan transparan melalui digitalisasi pencatatan keuangan warga secara real-time.
        </p>
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-lg text-sm font-semibold">
          <ShieldCheck className="w-4 h-4" /> Terverifikasi Sistem Digital
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-6">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-2">Total Saldo Saat Ini</p>
          <p className="text-3xl font-bold text-primary-600 tabular-nums">{formatRupiah(data.saldo?.saldo || 0)}</p>
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Update real-time
          </p>
        </div>
        <div className="card p-6">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-2 flex items-center gap-2">
            <ArrowDown className="w-3 h-3 text-primary-600" /> Pemasukan ({namaBulan})
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white tabular-nums">{formatRupiah(pemasukan)}</p>
          <div className="mt-3 h-1 bg-primary-100 dark:bg-primary-900/30 rounded">
            <div className="h-full bg-primary-600 rounded" style={{ width: '65%' }}></div>
          </div>
        </div>
        <div className="card p-6">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-2 flex items-center gap-2">
            <ArrowUp className="w-3 h-3 text-rose-600" /> Pengeluaran ({namaBulan})
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white tabular-nums">{formatRupiah(pengeluaran)}</p>
          <div className="mt-3 h-1 bg-rose-100 dark:bg-rose-900/30 rounded">
            <div className="h-full bg-rose-600 rounded" style={{ width: '40%' }}></div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Histori Kas Terbaru</h2>
          <a href="#" className="text-sm text-primary-600 font-semibold">Lihat Semua</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 dark:border-slate-700">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-bold uppercase text-gray-500">Tanggal</th>
                <th className="text-left py-3 px-4 text-xs font-bold uppercase text-gray-500">Keterangan</th>
                <th className="text-left py-3 px-4 text-xs font-bold uppercase text-gray-500">Kategori</th>
                <th className="text-right py-3 px-4 text-xs font-bold uppercase text-gray-500">Jumlah</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {data.transaksi.slice(0, 5).map((t) => (
                <tr key={t.id}>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{formatTanggal(t.tanggal)}</td>
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{t.keterangan}</p>
                    <p className="text-xs text-gray-500">oleh {t.admin?.nama}</p>
                  </td>
                  <td className="py-3 px-4"><Badge jenis={t.jenis} /></td>
                  <td className={`py-3 px-4 text-right font-bold tabular-nums ${
                    t.jenis === 'PEMASUKAN' ? 'text-primary-600' : 'text-rose-600'
                  }`}>
                    {t.jenis === 'PEMASUKAN' ? '+' : '-'} {formatRupiah(t.nominal)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4 flex gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-900 dark:text-blue-300">
          <strong>Catatan:</strong> Laporan ini diperbarui secara otomatis setiap ada transaksi baru yang diverifikasi oleh Bendahara RW.
        </p>
      </div>
    </div>
  );
};

export default LaporanPublik;
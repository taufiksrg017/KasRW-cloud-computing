import { useEffect, useState } from 'react';
import { Calendar, Download, Wallet, Receipt, Wrench, Heart, Lightbulb } from 'lucide-react';
import { BarChart, Bar, XAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';
import { transaksiAPI } from '../services/api';
import { formatRupiah, formatTanggal } from '../utils/formatter';
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [data, setData] = useState({ saldo: {}, transaksi: [] });
  const [loading, setLoading] = useState(true);
  const handleExport = () => {
  if (!data.transaksi || data.transaksi.length === 0) {
    toast.error('Belum ada data transaksi untuk diekspor');
    return;
  }

  // Format data untuk Excel
  const rows = data.transaksi.map((t, i) => ({
    'No': i + 1,
    'Tanggal': new Date(t.tanggal).toLocaleDateString('id-ID'),
    'Jenis': t.jenis,
    'Keterangan': t.keterangan,
    'Nominal (Rp)': parseInt(t.nominal),
    'Admin': t.admin?.nama || '-',
    'Dicatat Pada': new Date(t.created_at).toLocaleString('id-ID'),
  }));

  // Row ringkasan saldo
  const summary = [
    {},
    { 'No': 'RINGKASAN' },
    { 'No': 'Total Pemasukan', 'Tanggal': '', 'Jenis': '', 'Keterangan': '', 'Nominal (Rp)': parseInt(data.saldo?.total_pemasukan || 0) },
    { 'No': 'Total Pengeluaran', 'Tanggal': '', 'Jenis': '', 'Keterangan': '', 'Nominal (Rp)': parseInt(data.saldo?.total_pengeluaran || 0) },
    { 'No': 'Saldo Akhir', 'Tanggal': '', 'Jenis': '', 'Keterangan': '', 'Nominal (Rp)': parseInt(data.saldo?.saldo || 0) },
  ];

  const ws = XLSX.utils.json_to_sheet([...rows, ...summary]);

  // Set column width
  ws['!cols'] = [
    { wch: 5 }, { wch: 12 }, { wch: 14 }, { wch: 40 },
    { wch: 16 }, { wch: 20 }, { wch: 20 },
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Transaksi Kas RW');

  const fileName = `Laporan_KasRW_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);

  toast.success(`Laporan diekspor: ${fileName}`);
};

  useEffect(() => {
    transaksiAPI.getAll()
      .then((res) => setData(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const bulanIni = new Date().getMonth();
  const tahunIni = new Date().getFullYear();
  const transaksiBulanIni = data.transaksi.filter((t) => {
    const d = new Date(t.tanggal);
    return d.getMonth() === bulanIni && d.getFullYear() === tahunIni;
  });
  const pemasukanBulanIni = transaksiBulanIni
    .filter((t) => t.jenis === 'PEMASUKAN')
    .reduce((sum, t) => sum + parseInt(t.nominal), 0);
  const pengeluaranBulanIni = transaksiBulanIni
    .filter((t) => t.jenis === 'PENGELUARAN')
    .reduce((sum, t) => sum + parseInt(t.nominal), 0);

  const chartData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - i));
    const m = date.getMonth();
    const y = date.getFullYear();
    const total = data.transaksi
      .filter((t) => {
        const d = new Date(t.tanggal);
        return d.getMonth() === m && d.getFullYear() === y && t.jenis === 'PEMASUKAN';
      })
      .reduce((sum, t) => sum + parseInt(t.nominal), 0);
    return {
      bulan: date.toLocaleDateString('id-ID', { month: 'short' }).toUpperCase(),
      total,
    };
  });

  const getIcon = (keterangan) => {
    const k = (keterangan || '').toLowerCase();
    if (k.includes('iuran') || k.includes('sampah')) return Receipt;
    if (k.includes('perbaikan') || k.includes('pipa')) return Wrench;
    if (k.includes('donasi') || k.includes('sumbangan')) return Heart;
    if (k.includes('listrik') || k.includes('lampu')) return Lightbulb;
    return Receipt;
  };

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-10 w-10 border-4 border-primary-500 border-t-transparent"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ringkasan Kas RW 25</h1>
          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
            <Calendar className="w-4 h-4" />
            {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <button onClick={handleExport} className="btn-secondary flex items-center gap-2">
          <Download className="w-4 h-4" />
          Ekspor Laporan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Total Saldo</p>
          <div className="flex justify-between items-end">
            <p className="text-3xl font-bold text-gray-900 dark:text-white tabular-nums">
              {formatRupiah(data.saldo?.saldo || 0)}
            </p>
            <Wallet className="w-8 h-8 text-gray-300" />
          </div>
        </div>
        <div className="card p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Total Pemasukan Bulan Ini</p>
          <div className="flex justify-between items-end">
            <p className="text-3xl font-bold text-primary-600 tabular-nums">{formatRupiah(pemasukanBulanIni)}</p>
            <span className="badge bg-primary-100 text-primary-700">+12%</span>
          </div>
        </div>
        <div className="card p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Total Pengeluaran Bulan Ini</p>
          <div className="flex justify-between items-end">
            <p className="text-3xl font-bold text-rose-600 tabular-nums">{formatRupiah(pengeluaranBulanIni)}</p>
            <span className="badge bg-rose-100 text-rose-700">-5%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg text-gray-900 dark:text-white">Grafik Arus Kas</h2>
            <div className="flex gap-1 bg-gray-100 dark:bg-slate-700 rounded-lg p-1 text-xs">
              <button className="px-3 py-1 bg-white dark:bg-slate-800 rounded font-medium">6 Bulan</button>
              <button className="px-3 py-1 text-gray-500">1 Tahun</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="bulan" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip formatter={(v) => formatRupiah(v)} contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }} />
              <Bar dataKey="total" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg text-gray-900 dark:text-white">Aktivitas Terbaru</h2>
            <button className="text-xs text-primary-600 font-semibold">Lihat Semua</button>
          </div>
          <div className="space-y-3">
            {data.transaksi.slice(0, 4).map((t) => {
              const Icon = getIcon(t.keterangan);
              const isPemasukan = t.jenis === 'PEMASUKAN';
              return (
                <div key={t.id} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isPemasukan ? 'bg-primary-50 text-primary-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{t.keterangan}</p>
                    <p className="text-xs text-gray-500">{formatTanggal(t.tanggal)}</p>
                  </div>
                  <span className={`text-sm font-bold ${isPemasukan ? 'text-primary-600' : 'text-rose-600'}`}>
                    {isPemasukan ? '+' : '-'}{formatRupiah(t.nominal)}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700 flex items-center gap-2 text-xs">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
            <span className="text-gray-500">STATUS SISTEM</span>
            <span className="text-primary-600 font-semibold ml-auto">Operasional Normal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Pencil, Trash2, User } from 'lucide-react';
import { transaksiAPI } from '../services/api';
import { formatRupiah, formatTanggalLengkap, formatDateTime } from '../utils/formatter';
import Badge from '../components/ui/Badge';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import toast from 'react-hot-toast';

const DetailTransaksi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    transaksiAPI.getById(id)
      .then((res) => setData(res.data.data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    try {
      await transaksiAPI.delete(id);
      toast.success('Transaksi berhasil dihapus');
      navigate('/transaksi');
    } catch (err) {
      toast.error('Gagal hapus');
    }
  };

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-10 w-10 border-4 border-primary-500 border-t-transparent"></div></div>;
  if (!data) return <p>Tidak ditemukan</p>;

  const isPemasukan = data.jenis === 'PEMASUKAN';
  const inisial = data.admin?.nama?.split(' ').map(w => w[0]).slice(0, 2).join('') || 'AD';

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <nav className="text-sm">
        <Link to="/dashboard" className="text-gray-500 hover:text-primary-600">Dashboard</Link>
        <span className="text-gray-400 mx-2">/</span>
        <Link to="/transaksi" className="text-gray-500 hover:text-primary-600">Riwayat Transaksi</Link>
        <span className="text-gray-400 mx-2">/</span>
        <span className="text-primary-600 font-semibold">Detail #{String(data.id).padStart(3, '0')}</span>
      </nav>

      <div className="flex justify-between items-center">
        <Link to="/transaksi" className="flex items-center gap-2 text-gray-600 hover:text-primary-600 font-medium">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <div className="flex gap-2">
          <Link to={`/transaksi/${id}/edit`} className="flex items-center gap-2 border border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 font-semibold px-4 py-2 rounded-lg">
            <Pencil className="w-4 h-4" /> Edit
          </Link>
          <button
            onClick={() => setShowDelete(true)}
            className="flex items-center gap-2 border border-rose-500 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 font-semibold px-4 py-2 rounded-lg"
          >
            <Trash2 className="w-4 h-4" /> Hapus
          </button>
        </div>
      </div>

      <div className="card p-8">
        <Badge jenis={data.jenis} />
        <p className={`text-5xl font-bold mt-3 tabular-nums ${isPemasukan ? 'text-primary-600' : 'text-rose-600'}`}>
          {formatRupiah(data.nominal)}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Tanggal transaksi: {formatTanggalLengkap(data.tanggal)}
        </p>

        <div className="border-t border-gray-200 dark:border-slate-700 my-6"></div>

        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {[
            ['ID Transaksi', `#${String(data.id).padStart(3, '0')}`],
            ['Jenis', <Badge jenis={data.jenis} />],
            ['Tanggal Transaksi', formatTanggalLengkap(data.tanggal)],
            ['Dicatat oleh', data.admin?.nama],
            ['Waktu Pencatatan', formatDateTime(data.created_at)],
            ['Terakhir Diperbarui', formatDateTime(data.updated_at)],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">{label}</dt>
              <dd className="text-sm font-medium text-gray-900 dark:text-white">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6">
          <dt className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-2">Keterangan</dt>
          <dd className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg">
            {data.keterangan}
          </dd>
        </div>
      </div>

      <div className="card p-5 flex items-center gap-4 bg-gray-50 dark:bg-slate-800/50">
        <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
          {inisial}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-900 dark:text-white">{data.admin?.nama}</p>
          <p className="text-sm text-gray-500">@{data.admin?.username}</p>
        </div>
        <span className="badge bg-primary-100 text-primary-700">
          <User className="w-3 h-3 mr-1" /> Bendahara RW
        </span>
      </div>

      <ConfirmDialog
        open={showDelete}
        title="Hapus Transaksi?"
        message={`Apakah Anda yakin ingin menghapus transaksi "${data.keterangan}" senilai ${formatRupiah(data.nominal)}?`}
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
      />
    </div>
  );
};

export default DetailTransaksi;
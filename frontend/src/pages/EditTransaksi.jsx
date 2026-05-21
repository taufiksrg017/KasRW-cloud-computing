import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TransaksiForm from '../components/transaksi/TransaksiForm';
import { transaksiAPI } from '../services/api';

const EditTransaksi = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    transaksiAPI.getById(id)
      .then((res) => setData(res.data.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-10 w-10 border-4 border-primary-500 border-t-transparent"></div></div>;
  }
  if (!data) return <p>Transaksi tidak ditemukan.</p>;

  return <TransaksiForm mode="edit" initialData={data} />;
};

export default EditTransaksi;
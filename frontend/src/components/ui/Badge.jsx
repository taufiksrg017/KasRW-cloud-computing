const Badge = ({ jenis }) => {
  const isPemasukan = jenis === 'PEMASUKAN';
  return (
    <span className={`badge ${
      isPemasukan
        ? 'bg-primary-100 text-primary-700 dark:bg-primary-800/30 dark:text-primary-400'
        : 'bg-rose-100 text-rose-700 dark:bg-rose-800/30 dark:text-rose-400'
    }`}>
      {isPemasukan ? 'Pemasukan' : 'Pengeluaran'}
    </span>
  );
};

export default Badge;
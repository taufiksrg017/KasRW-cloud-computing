// src/controllers/saldoController.js
const prisma = require('../config/prisma');

exports.getSaldo = async (req, res, next) => {
  try {
    const result = await prisma.transaksi.groupBy({
      by: ['jenis'],
      _sum: { nominal: true },
    });

    let pemasukan = 0n;
    let pengeluaran = 0n;
    result.forEach((r) => {
      if (r.jenis === 'PEMASUKAN') pemasukan = r._sum.nominal || 0n;
      if (r.jenis === 'PENGELUARAN') pengeluaran = r._sum.nominal || 0n;
    });

    res.json({
      success: true,
      data: {
        total_pemasukan: pemasukan.toString(),
        total_pengeluaran: pengeluaran.toString(),
        saldo: (pemasukan - pengeluaran).toString(),
      },
    });
  } catch (err) {
    next(err);
  }
};
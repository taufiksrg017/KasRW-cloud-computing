// src/controllers/transaksiController.js
const prisma = require('../config/prisma');

// Helper: hitung saldo
const hitungSaldo = async () => {
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

  return {
    total_pemasukan: pemasukan.toString(),
    total_pengeluaran: pengeluaran.toString(),
    saldo: (pemasukan - pengeluaran).toString(),
  };
};

// GET /api/transaksi
exports.getAllTransaksi = async (req, res, next) => {
  try {
    const { jenis, dari, sampai, admin_id } = req.query;
    const where = {};

    if (jenis && ['PEMASUKAN', 'PENGELUARAN'].includes(jenis.toUpperCase())) {
      where.jenis = jenis.toUpperCase();
    }
    if (dari || sampai) {
      where.tanggal = {};
      if (dari) where.tanggal.gte = new Date(dari);
      if (sampai) where.tanggal.lte = new Date(sampai);
    }
    if (admin_id) where.admin_id = parseInt(admin_id);

    const transaksi = await prisma.transaksi.findMany({
      where,
      include: { admin: { select: { id: true, nama: true, username: true } } },
      orderBy: { tanggal: 'desc' },
    });

    const saldo = await hitungSaldo();

    res.json({
      success: true,
      data: { saldo, transaksi, total: transaksi.length },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/transaksi/:id
exports.getTransaksiById = async (req, res, next) => {
  try {
    const transaksi = await prisma.transaksi.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { admin: { select: { id: true, nama: true, username: true } } },
    });

    if (!transaksi) {
      return res.status(404).json({ success: false, message: 'Transaksi tidak ditemukan.' });
    }

    res.json({ success: true, data: transaksi });
  } catch (err) {
    next(err);
  }
};

// POST /api/transaksi  (protected)
exports.createTransaksi = async (req, res, next) => {
  try {
    const { jenis, nominal, keterangan, tanggal } = req.body;

    const transaksi = await prisma.transaksi.create({
      data: {
        admin_id: req.admin.id,
        jenis,
        nominal: BigInt(nominal),
        keterangan,
        tanggal: new Date(tanggal),
      },
      include: { admin: { select: { id: true, nama: true } } },
    });

    res.status(201).json({
      success: true,
      message: 'Transaksi berhasil ditambahkan',
      data: transaksi,
    });
  } catch (err) {
    next(err);
  }
};

// PUT /api/transaksi/:id  (protected)
exports.updateTransaksi = async (req, res, next) => {
  try {
    const { jenis, nominal, keterangan, tanggal } = req.body;

    const transaksi = await prisma.transaksi.update({
      where: { id: parseInt(req.params.id) },
      data: {
        jenis,
        nominal: BigInt(nominal),
        keterangan,
        tanggal: new Date(tanggal),
      },
      include: { admin: { select: { id: true, nama: true } } },
    });

    res.json({
      success: true,
      message: 'Transaksi berhasil diperbarui',
      data: transaksi,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/transaksi/:id  (protected)
exports.deleteTransaksi = async (req, res, next) => {
  try {
    await prisma.transaksi.delete({
      where: { id: parseInt(req.params.id) },
    });

    res.json({ success: true, message: 'Transaksi berhasil dihapus' });
  } catch (err) {
    next(err);
  }
};
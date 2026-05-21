// src/middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error('[ERROR]', err);

  // Prisma known errors
  if (err.code === 'P2002') {
    return res.status(409).json({
      success: false,
      message: 'Data sudah ada (duplikat).',
      field: err.meta?.target,
    });
  }
  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: 'Data tidak ditemukan.',
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Terjadi kesalahan pada server.',
  });
};

module.exports = errorHandler;
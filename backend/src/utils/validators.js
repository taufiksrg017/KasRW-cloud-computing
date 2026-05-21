// src/utils/validators.js
const { body, param, validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validasi gagal',
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

const transaksiValidator = [
  body('jenis')
    .notEmpty().withMessage('Jenis transaksi wajib diisi')
    .isIn(['PEMASUKAN', 'PENGELUARAN']).withMessage('Jenis harus PEMASUKAN atau PENGELUARAN'),
  body('nominal')
    .notEmpty().withMessage('Nominal wajib diisi')
    .isInt({ min: 1 }).withMessage('Nominal harus angka positif'),
  body('keterangan')
    .notEmpty().withMessage('Keterangan wajib diisi')
    .isLength({ min: 3, max: 500 }).withMessage('Keterangan 3-500 karakter'),
  body('tanggal')
    .notEmpty().withMessage('Tanggal wajib diisi')
    .isISO8601().withMessage('Format tanggal tidak valid (gunakan YYYY-MM-DD)'),
];

const loginValidator = [
  body('username').notEmpty().withMessage('Username wajib diisi'),
  body('password').notEmpty().withMessage('Password wajib diisi'),
];

const idParamValidator = [
  param('id').isInt({ min: 1 }).withMessage('ID harus angka positif'),
];

module.exports = {
  handleValidation,
  transaksiValidator,
  loginValidator,
  idParamValidator,
};
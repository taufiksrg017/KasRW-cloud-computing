// src/routes/transaksiRoutes.js
const router = require('express').Router();
const ctrl = require('../controllers/transaksiController');
const authMiddleware = require('../middlewares/authMiddleware');
const { transaksiValidator, idParamValidator, handleValidation } = require('../utils/validators');

// PUBLIC
router.get('/', ctrl.getAllTransaksi);
router.get('/:id', idParamValidator, handleValidation, ctrl.getTransaksiById);

// PROTECTED
router.post('/', authMiddleware, transaksiValidator, handleValidation, ctrl.createTransaksi);
router.put('/:id', authMiddleware, idParamValidator, transaksiValidator, handleValidation, ctrl.updateTransaksi);
router.delete('/:id', authMiddleware, idParamValidator, handleValidation, ctrl.deleteTransaksi);

module.exports = router;
// src/routes/saldoRoutes.js
const router = require('express').Router();
const { getSaldo } = require('../controllers/saldoController');

router.get('/', getSaldo);

module.exports = router;
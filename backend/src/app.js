// src/app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const transaksiRoutes = require('./routes/transaksiRoutes');
const saldoRoutes = require('./routes/saldoRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware global
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || '*',
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health check
app.get('/', (req, res) => {
  res.json({
    success: true,
    service: 'KasRW API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transaksi', transaksiRoutes);
app.use('/api/saldo', saldoRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Endpoint ${req.originalUrl} tidak ditemukan` });
});

// Error handler (HARUS paling akhir)
app.use(errorHandler);

module.exports = app;
// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token tidak ditemukan. Silakan login terlebih dahulu.',
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = {
      id: decoded.id,
      username: decoded.username,
      nama: decoded.nama,
    };

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token sudah kedaluwarsa.' });
    }
    return res.status(401).json({ success: false, message: 'Token tidak valid.' });
  }
};

module.exports = authMiddleware;
// src/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Username atau password salah.' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Username atau password salah.' });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username, nama: admin.nama },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    res.json({
      success: true,
      message: 'Login berhasil',
      data: {
        token,
        admin: { id: admin.id, nama: admin.nama, username: admin.username },
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.me = async (req, res, next) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.admin.id },
      select: { id: true, nama: true, username: true, created_at: true },
    });
    res.json({ success: true, data: admin });
  } catch (err) {
    next(err);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { passwordLama, passwordBaru } = req.body;
    const bcrypt = require('bcryptjs');

    if (!passwordLama || !passwordBaru) {
      return res.status(400).json({ success: false, message: 'Password lama dan baru wajib diisi.' });
    }
    if (passwordBaru.length < 6) {
      return res.status(400).json({ success: false, message: 'Password baru minimal 6 karakter.' });
    }

    const admin = await prisma.admin.findUnique({ where: { id: req.admin.id } });
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin tidak ditemukan.' });
    }

    const isMatch = await bcrypt.compare(passwordLama, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Password lama salah.' });
    }

    const hashedNew = await bcrypt.hash(passwordBaru, 10);
    await prisma.admin.update({
      where: { id: admin.id },
      data: { password: hashedNew },
    });

    res.json({ success: true, message: 'Password berhasil diubah.' });
  } catch (err) {
    next(err);
  }
};
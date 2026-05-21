// server.js
const app = require('./src/app');
const prisma = require('./src/config/prisma');

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log('═══════════════════════════════════════════');
  console.log(`🚀 KasRW API berjalan di http://localhost:${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('═══════════════════════════════════════════');
});

// Graceful shutdown
const shutdown = async (signal) => {
  console.log(`\n${signal} diterima. Menutup server...`);
  server.close(async () => {
    await prisma.$disconnect();
    console.log('✅ Server & Prisma ditutup dengan rapi.');
    process.exit(0);
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
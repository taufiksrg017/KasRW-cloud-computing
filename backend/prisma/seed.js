// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  const nama = process.env.ADMIN_DEFAULT_NAMA || 'Bendahara RW';
  const username = process.env.ADMIN_DEFAULT_USERNAME || 'admin';
  const password = process.env.ADMIN_DEFAULT_PASSWORD || 'admin123';

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.upsert({
    where: { username },
    update: {},
    create: {
      nama,
      username,
      password: hashedPassword,
    },
  });

  console.log('✅ Admin default berhasil di-seed:');
  console.log(`   ID       : ${admin.id}`);
  console.log(`   Nama     : ${admin.nama}`);
  console.log(`   Username : ${admin.username}`);
  console.log(`   Password : ${password} (plain, untuk login)`);
}

main()
  .catch((e) => {
    console.error('❌ Seed gagal:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
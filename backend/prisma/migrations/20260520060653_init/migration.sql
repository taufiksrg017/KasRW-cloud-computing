-- CreateEnum
CREATE TYPE "JenisTransaksi" AS ENUM ('PEMASUKAN', 'PENGELUARAN');

-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaksi" (
    "id" SERIAL NOT NULL,
    "admin_id" INTEGER NOT NULL,
    "jenis" "JenisTransaksi" NOT NULL,
    "nominal" BIGINT NOT NULL,
    "keterangan" TEXT NOT NULL,
    "tanggal" TIMESTAMP(6) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaksi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_username_key" ON "admin"("username");

-- CreateIndex
CREATE INDEX "transaksi_tanggal_idx" ON "transaksi"("tanggal");

-- CreateIndex
CREATE INDEX "transaksi_jenis_idx" ON "transaksi"("jenis");

-- AddForeignKey
ALTER TABLE "transaksi" ADD CONSTRAINT "transaksi_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

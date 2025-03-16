/*
  Warnings:

  - Changed the type of `tahun_terbit` on the `buku` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `buku` DROP COLUMN `tahun_terbit`,
    ADD COLUMN `tahun_terbit` DATETIME(3) NOT NULL;

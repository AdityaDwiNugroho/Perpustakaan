/*
  Warnings:

  - Made the column `kode_buku` on table `buku` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `buku` MODIFY `kode_buku` VARCHAR(191) NOT NULL;

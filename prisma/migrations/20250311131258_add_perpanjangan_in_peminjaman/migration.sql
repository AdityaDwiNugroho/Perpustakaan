-- AlterTable
ALTER TABLE `peminjaman` ADD COLUMN `parentLoanId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Peminjaman` ADD CONSTRAINT `Peminjaman_parentLoanId_fkey` FOREIGN KEY (`parentLoanId`) REFERENCES `Peminjaman`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

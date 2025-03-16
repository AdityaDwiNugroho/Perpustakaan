-- AddForeignKey
ALTER TABLE `Peminjaman` ADD CONSTRAINT `Peminjaman_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Buku`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

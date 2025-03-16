-- CreateTable
CREATE TABLE `riwayatPinjaman` (
    `id` CHAR(36) NOT NULL,
    `nama_peminjam` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id` CHAR(36) NOT NULL,
    `fullname` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `birthdate` DATETIME(3) NOT NULL,
    `role` ENUM('ADMINISTRATOR', 'PETUGAS', 'PEMINJAM') NOT NULL,
    `photo` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `is_verify` BOOLEAN NOT NULL DEFAULT false,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Users_username_key`(`username`),
    UNIQUE INDEX `Users_email_key`(`email`),
    UNIQUE INDEX `Users_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

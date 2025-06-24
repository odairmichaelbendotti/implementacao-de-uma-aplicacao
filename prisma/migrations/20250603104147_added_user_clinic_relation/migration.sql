-- AlterTable
ALTER TABLE `user` ADD COLUMN `clinicId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_clinicId_fkey` FOREIGN KEY (`clinicId`) REFERENCES `Clinics`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

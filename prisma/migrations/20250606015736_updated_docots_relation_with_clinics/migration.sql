/*
  Warnings:

  - Added the required column `clinicId` to the `Doctors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `doctors` ADD COLUMN `clinicId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Doctors` ADD CONSTRAINT `Doctors_clinicId_fkey` FOREIGN KEY (`clinicId`) REFERENCES `Clinics`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

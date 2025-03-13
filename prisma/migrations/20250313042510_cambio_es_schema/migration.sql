/*
  Warnings:

  - You are about to alter the column `idInformeDoc` on the `documentosestudiante` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.
  - You are about to alter the column `idInformePdf` on the `documentosestudiante` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.
  - You are about to alter the column `idPresentacionPpt` on the `documentosestudiante` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.
  - You are about to alter the column `idPresentacionPdf` on the `documentosestudiante` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.
  - You are about to alter the column `ria` on the `documentosestudiante` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.
  - You are about to alter the column `idAutorizacionPdf` on the `documentosestudiante` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `documentosestudiante` MODIFY `idInformeDoc` VARCHAR(191) NULL,
    MODIFY `idInformePdf` VARCHAR(191) NULL,
    MODIFY `idPresentacionPpt` VARCHAR(191) NULL,
    MODIFY `idPresentacionPdf` VARCHAR(191) NULL,
    MODIFY `ria` VARCHAR(191) NULL,
    MODIFY `idAutorizacionPdf` VARCHAR(191) NULL;

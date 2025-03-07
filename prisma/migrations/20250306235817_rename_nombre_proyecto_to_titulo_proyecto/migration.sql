/*
  Warnings:

  - You are about to drop the column `nombreProyecto` on the `formularioproyectoestudiante` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `formularioproyectoestudiante` DROP COLUMN `nombreProyecto`,
    ADD COLUMN `tituloProyecto` VARCHAR(191) NULL;

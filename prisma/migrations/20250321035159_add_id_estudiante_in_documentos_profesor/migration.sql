/*
  Warnings:

  - A unique constraint covering the columns `[idProfesor,idEstudiante]` on the table `DocumentosProfesor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idEstudiante` to the `DocumentosProfesor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `documentosprofesor` ADD COLUMN `idEstudiante` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `DocumentosProfesor_idProfesor_idEstudiante_key` ON `DocumentosProfesor`(`idProfesor`, `idEstudiante`);

-- AddForeignKey
ALTER TABLE `DocumentosProfesor` ADD CONSTRAINT `DocumentosProfesor_idEstudiante_fkey` FOREIGN KEY (`idEstudiante`) REFERENCES `Usuario`(`rut`) ON DELETE RESTRICT ON UPDATE CASCADE;

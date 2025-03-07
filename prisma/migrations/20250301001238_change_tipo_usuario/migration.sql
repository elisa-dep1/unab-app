/*
  Warnings:

  - The primary key for the `tipousuario` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `usuario` DROP FOREIGN KEY `Usuario_tipoUsuario_fkey`;

-- DropIndex
DROP INDEX `Usuario_tipoUsuario_fkey` ON `usuario`;

-- AlterTable
ALTER TABLE `tipousuario` DROP PRIMARY KEY,
    MODIFY `tipo` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`tipo`);

-- AlterTable
ALTER TABLE `usuario` MODIFY `tipoUsuario` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_tipoUsuario_fkey` FOREIGN KEY (`tipoUsuario`) REFERENCES `TipoUsuario`(`tipo`) ON DELETE RESTRICT ON UPDATE CASCADE;

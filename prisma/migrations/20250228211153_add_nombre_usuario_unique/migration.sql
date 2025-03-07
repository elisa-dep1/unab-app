/*
  Warnings:

  - A unique constraint covering the columns `[nomUsuario]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `usuario` ALTER COLUMN `nomUsuario` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_nomUsuario_key` ON `Usuario`(`nomUsuario`);

/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `usuario` ALTER COLUMN `token` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_token_key` ON `Usuario`(`token`);

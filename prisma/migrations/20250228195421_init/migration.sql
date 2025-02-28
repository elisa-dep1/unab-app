-- CreateTable
CREATE TABLE `Usuario` (
    `rut` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `contrasena` VARCHAR(191) NOT NULL,
    `tipoUsuario` INTEGER NOT NULL,

    UNIQUE INDEX `Usuario_correo_key`(`correo`),
    PRIMARY KEY (`rut`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoUsuario` (
    `tipo` INTEGER NOT NULL,

    PRIMARY KEY (`tipo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_tipoUsuario_fkey` FOREIGN KEY (`tipoUsuario`) REFERENCES `TipoUsuario`(`tipo`) ON DELETE RESTRICT ON UPDATE CASCADE;

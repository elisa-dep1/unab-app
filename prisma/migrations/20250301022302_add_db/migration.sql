-- CreateTable
CREATE TABLE `DocumentosEstudiante` (
    `idEstudiante` VARCHAR(191) NOT NULL,
    `idInformeDoc` VARCHAR(191) NULL,
    `idInformePdf` VARCHAR(191) NULL,
    `idPresentacionPpt` VARCHAR(191) NULL,
    `idPresentacionPdf` VARCHAR(191) NULL,
    `ria` VARCHAR(191) NULL,
    `idAutorizacionPdf` VARCHAR(191) NULL,

    UNIQUE INDEX `DocumentosEstudiante_idEstudiante_key`(`idEstudiante`),
    PRIMARY KEY (`idEstudiante`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DocumentosProfesor` (
    `idProfesor` VARCHAR(191) NOT NULL,
    `idActaNotas` VARCHAR(191) NULL,
    `idActaAperturaCierre` VARCHAR(191) NULL,
    `idRubrica` VARCHAR(191) NULL,

    UNIQUE INDEX `DocumentosProfesor_idProfesor_key`(`idProfesor`),
    PRIMARY KEY (`idProfesor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EstudianteNRC` (
    `idAlumno` VARCHAR(191) NOT NULL,
    `idNRC` VARCHAR(191) NOT NULL,
    `periodo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idAlumno`, `idNRC`, `periodo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NRC` (
    `codigo` VARCHAR(191) NOT NULL,
    `periodo` VARCHAR(191) NOT NULL,
    `idProfesor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`codigo`, `periodo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Defensa` (
    `id` VARCHAR(191) NOT NULL,
    `idEstudiante` VARCHAR(191) NOT NULL,
    `codigoNRC` VARCHAR(191) NOT NULL,
    `periodo` VARCHAR(191) NOT NULL,
    `idProfesor` VARCHAR(191) NOT NULL,
    `autorizacion` BOOLEAN NULL,
    `fecha` DATETIME(3) NULL,
    `nota` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FormularioProyectoEstudiante` (
    `id` VARCHAR(191) NOT NULL,
    `idNRC` VARCHAR(191) NOT NULL,
    `periodo` VARCHAR(191) NOT NULL,
    `idProfesor` VARCHAR(191) NOT NULL,
    `idEstudiante` VARCHAR(191) NOT NULL,
    `tituloProyecto` VARCHAR(191) NOT NULL,
    `resumenEjecutivo` VARCHAR(191) NOT NULL,
    `justificacionProyecto` VARCHAR(191) NOT NULL,
    `objetivoGeneral` VARCHAR(191) NOT NULL,
    `objetivosEspecificos` VARCHAR(191) NOT NULL,
    `alcanceProyecto` VARCHAR(191) NOT NULL,
    `elementosHerramientas` VARCHAR(191) NOT NULL,
    `prodResultadosEsperados` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DocumentosEstudiante` ADD CONSTRAINT `DocumentosEstudiante_idEstudiante_fkey` FOREIGN KEY (`idEstudiante`) REFERENCES `Usuario`(`rut`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DocumentosProfesor` ADD CONSTRAINT `DocumentosProfesor_idProfesor_fkey` FOREIGN KEY (`idProfesor`) REFERENCES `Usuario`(`rut`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EstudianteNRC` ADD CONSTRAINT `EstudianteNRC_idAlumno_fkey` FOREIGN KEY (`idAlumno`) REFERENCES `Usuario`(`rut`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EstudianteNRC` ADD CONSTRAINT `EstudianteNRC_idNRC_periodo_fkey` FOREIGN KEY (`idNRC`, `periodo`) REFERENCES `NRC`(`codigo`, `periodo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NRC` ADD CONSTRAINT `NRC_idProfesor_fkey` FOREIGN KEY (`idProfesor`) REFERENCES `Usuario`(`rut`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Defensa` ADD CONSTRAINT `Defensa_idEstudiante_fkey` FOREIGN KEY (`idEstudiante`) REFERENCES `Usuario`(`rut`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Defensa` ADD CONSTRAINT `Defensa_idProfesor_fkey` FOREIGN KEY (`idProfesor`) REFERENCES `Usuario`(`rut`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Defensa` ADD CONSTRAINT `Defensa_codigoNRC_periodo_fkey` FOREIGN KEY (`codigoNRC`, `periodo`) REFERENCES `NRC`(`codigo`, `periodo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FormularioProyectoEstudiante` ADD CONSTRAINT `FormularioProyectoEstudiante_idEstudiante_fkey` FOREIGN KEY (`idEstudiante`) REFERENCES `Usuario`(`rut`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FormularioProyectoEstudiante` ADD CONSTRAINT `FormularioProyectoEstudiante_idProfesor_fkey` FOREIGN KEY (`idProfesor`) REFERENCES `Usuario`(`rut`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FormularioProyectoEstudiante` ADD CONSTRAINT `FormularioProyectoEstudiante_idNRC_periodo_fkey` FOREIGN KEY (`idNRC`, `periodo`) REFERENCES `NRC`(`codigo`, `periodo`) ON DELETE RESTRICT ON UPDATE CASCADE;

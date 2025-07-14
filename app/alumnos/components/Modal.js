"use client";
import { useEffect, useState } from "react";
import style from "../filter.module.css";
import axios from "axios";
import {
    Document,
    Packer,
    Paragraph,
    Table,
    TableRow,
    TableCell,
    TextRun,
    WidthType,
    BorderStyle,
} from "docx";
import { saveAs } from "file-saver";

export default function Modal({ data, isAddingStudent, onClose, selectedNrc, selectedPeriod }) {
    const [newStudent, setNewStudent] = useState({ name: "", rut: "", email: "" });
    const [view, setView] = useState("general");

    const createTable = (info = {}) => {
        const rows = Object.entries(info).map(([key, value]) =>
            new TableRow({
                children: [
                    new TableCell({
                        width: { size: 30, type: WidthType.PERCENTAGE },
                        margins: {
                            top: 100,
                            bottom: 100,
                            left: 100,
                            right: 100,
                        },
                        borders: getBorders(),
                        children: [
                            new Paragraph({
                                children: [new TextRun({ text: key, bold: true, size: 24 })],
                            }),
                        ],
                    }),
                    new TableCell({
                        width: { size: 70, type: WidthType.PERCENTAGE },
                        borders: getBorders(),
                        margins: {
                            top: 100,
                            bottom: 100,
                            left: 100,
                            right: 100,
                        },
                        children: [new Paragraph({ text: value })],
                    }),
                ],
            })
        );

        return new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows,
        });
    };

    const getBorders = () => ({
        top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
    });

    const handleDownloadWord = () => {
        const alumnoData = {
            Nombre: data?.name || "-",
            RUT: data?.rut || "-",
            Correo: data?.email || "-",
            NRC: data?.nrc || "-",
            Formulario: data?.formulario || "-",
            "¿Está autorizado?": data?.autorizado || "-",
            "Fecha defensa": data?.fechaDefensa || "-",
            Documentos: data?.documentos || "-",
        };

        const formularioData = {
            "Título del Proyecto": data?.tituloProyecto || "-",
            Justificación: data?.justificacion || "-",
            "Objetivo General": data?.objetivoGeneral || "-",
            "Objetivos Específicos": data?.objetivosEspecificos || "-",
            "Alcance Proyecto": data?.alcanceProyecto || "-",
            Herramientas: data?.herramientas || "-",
            "Resultados Esperados": data?.resultados || "-",
            "Palabras Clave": data?.palabrasClave || "-",
        };

        const children = [
            new Paragraph({
                spacing: { after: 300 },
                children: [new TextRun({ text: "Información del Alumno", bold: true, size: 28, color: "B70F0A" })],
            }),
            createTable(alumnoData),
        ];

        if (data?.formulario === "Completo") {
            children.push(new Paragraph(""));
            children.push(
                new Paragraph({
                    spacing: { after: 300 },
                    children: [new TextRun({ text: "Formulario del Proyecto", bold: true, size: 28, color: "B70F0A" })],
                })
            );
            children.push(createTable(formularioData));
        }

        const doc = new Document({
            styles: {
                default: {
                    document: {
                        run: {
                            font: "Arial",
                        },
                    },
                },
            },
            sections: [
                {
                    children,
                },
            ],
        });

        Packer.toBlob(doc).then((blob) => {
            saveAs(blob, `información_${data?.name || "alumno"}.docx`);
        });
    };


    const handleInputChange = (e) => {
        setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
    };

    const createUser = async () => {
        const { name, rut, email } = newStudent;
        const contrasena = rut.substring(0, 4);
        const nomUsuario = email.split("@")[0];

        const body = {
            nombre: name,
            rut,
            correo: email,
            contrasena,
            tipoUsuario: "alumno",
            nomUsuario,
            semestre: 1,
            activo: true,
            idNRC: selectedNrc.value,
            periodo: selectedPeriod.value,
        };

        try {
            await axios.post("/api/usuarios", body);
        } catch (error) {
            console.error("Error al crear usuario:", error);
            alert("No se pudo crear el usuario");
        }
    };



    const handleSaveStudent = async () => {
        const newStudent = await createUser();
        onClose();
    };

    const defaultData = {
        name: "-",
        rut: "-",
        nrc: "-",
        email: "-",
        formulario: "-",
        fechaDefensa: "-",
        documentos: "-",
    };

    const studentData = data || defaultData;

    useEffect(() => {
        console.log("🧾 LLEGA ESTO AL MODAL:", data);
    }, [data]);

    return (
        <div className={style.modal}>
            <div className={style.modalContent}>
                <button className={style.closeModal} onClick={onClose}>
                    X
                </button>

                {isAddingStudent ? (
                    <>
                        <h2 style={{ margin: "0px" }}>Agregar Nuevo Alumno</h2>
                        <input
                            className={style.addStudent}
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            value={newStudent.name}
                            onChange={handleInputChange}
                        />
                        <input
                            className={style.addStudent}
                            type="text"
                            name="rut"
                            placeholder="Rut"
                            value={newStudent.rut}
                            onChange={handleInputChange}
                        />
                        <input
                            className={style.addStudent}
                            type="email"
                            name="email"
                            placeholder="Correo"
                            value={newStudent.email}
                            onChange={handleInputChange}
                        />
                        <button className={style.addStudentButton} onClick={handleSaveStudent}>
                            Guardar
                        </button>
                    </>
                ) : view === "general" ? (
                    <>
                        <h2>Información del Alumno</h2>
                        <span>
                            <strong>Nombre:</strong> {studentData.name}
                        </span>
                        <span>
                            <strong>Rut:</strong> {studentData.rut}
                        </span>
                        <span>
                            <strong>Correo:</strong> {studentData.email}
                        </span>
                        <span>
                            <strong>NRC:</strong> {studentData.nrc}
                        </span>
                        <span>
                            <strong>Formulario:</strong> {studentData.formulario}
                            {studentData.formulario === "Completo" && (
                                <button style={{ marginLeft: "10px" }} onClick={() => setView("formulario")}>
                                    Ver
                                </button>
                            )}
                        </span>
                        <span>
                            <strong>¿Está autorizado?:</strong> {studentData.autorizado}
                        </span>
                        <span>
                            <strong>Fecha Defensa:</strong> {studentData.fechaDefensa}
                        </span>
                        <span>
                            <strong>Documentos:</strong> {studentData.documentos}
                        </span>
                        <button onClick={handleDownloadWord}>Descargar</button>
                    </>
                ) : (
                    <>
                        <button className={style.buttonBack} onClick={() => setView("general")}>
                            ←
                        </button>
                        <h2 style={{ margin: "0px" }}>Formulario del Proyecto</h2>
                        <span>
                            <strong>Título del Proyecto:</strong> {data?.tituloProyecto || "-"}
                        </span>
                        <span>
                            <strong>Justificación:</strong> {data?.justificacion || "-"}
                        </span>
                        <span>
                            <strong>Objetivo general:</strong> {data?.objetivoGeneral || "-"}
                        </span>
                        <span>
                            <strong>Objetivos específicos:</strong> {data?.objetivosEspecificos || "-"}
                        </span>
                        <span>
                            <strong>Alcance Proyecto:</strong> {data?.alcanceProyecto || "-"}
                        </span>
                        <span>
                            <strong>Herramientas utilizadas:</strong> {data?.herramientas || "-"}
                        </span>
                        <span>
                            <strong>Producto o resultados esperados:</strong> {data?.resultados || "-"}
                        </span>
                        <span>
                            <strong>Palabras Clave:</strong> {data?.palabrasClave || "-"}
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}

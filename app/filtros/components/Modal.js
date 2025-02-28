"use client";
import { useState } from "react";
import style from "../filter.module.css";
import axios from "axios";

export default function Modal({ data, isAddingStudent, onClose }) {
    const [newStudent, setNewStudent] = useState({ name: "", rut: "", email: "" });

    const handleInputChange = (e) => {
        setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
    };

    const createUser = async () => {
        await axios.post("/api/usuarios", {
            newStudent
        })
    }

    const handleSaveStudent = async () => {
        const newStudent = await createUser()
        console.log("Guardando nuevo alumno:", newStudent);
        onClose();
    };

    const defaultData = {
        name: "-",
        rut: "-",
        nrc: "-",
        email: "-",
        formulario: "-",
        fechaDefensa: "-",
        documentos: "-"
    };

    const studentData = data || defaultData;

    


    return (
        <div className={style.modal}>
            <div className={style.modalContent}>
                <button className={style.closeModal} onClick={onClose}>X</button>

                {isAddingStudent ? (
                    <>
                        <h2 style={{margin: "0px"}}>Agregar Nuevo Alumno</h2>
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
                        <button className={style.addStudentButton} onClick={handleSaveStudent}>Guardar</button>
                    </>
                ) : (
                    <>
                        <h2 style={{ margin: "0px" }}>Información del Alumno</h2>
                        <span><strong>Nombre:</strong> {studentData.name}</span>
                        <span><strong>Rut:</strong> {studentData.rut}</span>
                        <span><strong>Correo:</strong> {studentData.email}</span>
                        <span><strong>NRC:</strong> {studentData.nrc}</span>
                        <span><strong>Formulario:</strong> {studentData.formulario}</span>
                        <span><strong>Fecha Defensa:</strong> {studentData.fechaDefensa}</span>
                        <span><strong>Documentos:</strong> {studentData.documentos}</span>
                    </>
                )}
            </div>
        </div>
    );
}

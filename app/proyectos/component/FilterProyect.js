"use client";
import { useState } from "react";
import Select from "react-select";
import filtersData from "@/src/data/filters.json";
import styles from "../filProyect.module.css";

export default function FilterProyectsComponent() {
    const [selectedNrc, setSelectedNrc] = useState(null);

    const nrcOptions = filtersData.nrc
        .sort((a, b) => a.profesor.localeCompare(b.profesor)) // Ordena alfabéticamente por profesor
        .map(nrc => ({
            value: nrc.value,
            label: `Profesor: ${nrc.profesor} - NRC: ${nrc.label}`,
        }));


    const filteredStudents = filtersData.student
        .filter(student => student.nrc === selectedNrc?.value && student.formulario === true);

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            minWidth: "400px",
            backgroundColor: "#ffffff",
            borderColor: state.isFocused ? "#962330" : "#021f54",
            boxShadow: "none",
            "&:hover": {
                borderColor: "#962330",
            },
        }),
        menu: (provided) => ({
            ...provided,
            width: "100%",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? "#962330"
                : state.isFocused
                    ? "#f4d3d6"
                    : "#ffffff",
            color: state.isSelected ? "#ffffff" : "#000000",
            "&:hover": {
                backgroundColor: "#f4d3d6",
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "#962330",
            fontWeight: "bold",
        }),
    };


    return (
        <div>
            <div className={styles.containerFilterButton}>
                <Select
                    styles={customStyles}
                    options={nrcOptions}
                    onChange={setSelectedNrc}
                    placeholder="Selecciona un NRC..."
                    isClearable
                    instanceId="nrc-select"
                />
                <a download>
                    <button className={styles.download}>Descarga masiva de proyectos</button>
                </a>

            </div>


            {selectedNrc ? (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.bold}>Alumnos</th>
                            <th className={styles.bold}>Nombre Proyecto</th>
                            <th className={styles.bold}>Título Tentativo</th>
                            <th className={styles.bold}>Resumen Ejecutivo</th>
                            <th className={styles.bold}>Descargar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.length > 0 ?
                            (
                                filteredStudents.map(student => {
                                    const formData = student.formularioData?.[0];
                                    return formData ? (
                                        <tr key={student.value}>
                                            <td>{student.label}</td>
                                            <td>{formData.nombreProyecto}</td>
                                            <td>{formData.tituloTentativo}</td>
                                            <td>{formData.resumenEjecutivo}</td>
                                            <td><img width={"40px"} src="/images/descargar.png" /></td>
                                        </tr>
                                    ) : null;
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5">
                                        Ningún alumno de este NRC ha completado su formulario
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
            ) : (
                <p className={styles.message}>
                    Por favor, seleccione un NRC para ver los alumnos
                </p>
            )}
        </div>
    );

}

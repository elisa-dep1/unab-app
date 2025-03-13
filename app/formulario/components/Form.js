"use client"
import { useState } from "react";
import Input from "../components/Input";
import Section from "../components/Section";
import styles from "../form.module.css"
import axios from "axios";

export default function FormComponent({ formData, user, nrc, periodo, teacher }) {


    const formatName = (nombre) => {
        if (!nombre) return ""; 

        const parts = nombre.split(" ");

        if (parts.length > 2) {
            return `${parts.slice(2).join(" ")} ${parts[0]} ${parts[1]}`;
        }

        return parts.length === 2 ? `${parts[0]} ${parts[1]}` : nombre;
    };


    const [form, setForm] = useState(formData);

    const idStudent = user.rut;
    const idTeacher = teacher.rut;

    const createForm = async () => {
        if (!form.id) {
            await axios.post("/api/formulario", { nrc, periodo, idStudent, idTeacher, ...form })
            alert("Formulario guardado");
            return;
        }
        await axios.put("/api/formulario", { id: form.id, nrc, periodo, idStudent, idTeacher, ...form })
        alert("Formulario editado");
        return;
    }
    const handleForm = (key, value) => {

        setForm(prev => ({ ...prev, [key]: value }))
    }

    return (
        <div className={styles.containerGeneral}>

            <div className={styles.containerContent}>

                <div className={styles.containerPlantilla}>
                    <h1> Perfil de Proyecto de Título </h1>
                    <div className={styles.containerDownload}>
                        <a href="/images/Perfil de Proyecto de Título.docx" download>
                            <button className="globalButton">Descargar plantilla</button>
                        </a>
                        <div className={styles.tooltipContainer}>
                            <button className={styles.tooltip}>?</button>
                            <span className={styles.tooltipText}>
                                Te sugerimos completar toda la información en esta plantilla primero.
                            </span>
                        </div>
                    </div>
                </div>

                <div>
                    <Section label={"Nombre y rut"} value={formatName(user.nombre)} />
                    <Section label={"Profesor"} value={formatName(teacher.nombre)} />
                    <Section label={"NRC"} value={nrc} />

                    <Input label={"Título tentativo del proyecto"}
                        value={form?.tituloProyecto}
                        placeholder={"Ingresa título"}
                        onChange={(e) => handleForm("tituloProyecto", e.target.value)}
                    />
                    <Input label={"Resumen ejecutivo"}
                        value={form?.resumenEjecutivo}
                        placeholder={"Ingresa resumen ejecutivo"}
                        onChange={(e) => handleForm("resumenEjecutivo", e.target.value)}
                    />
                    <Input label={"Justificación del proyecto"}
                        value={form?.justificacionProyecto}
                        placeholder={"Ingresa justificación del proyecto"}
                        onChange={(e) => handleForm("justificacionProyecto", e.target.value)}
                    />
                    <Input label={"Objetivo general"}
                        value={form?.objetivoGeneral}
                        placeholder={"Ingresa objetivo general"}
                        onChange={(e) => handleForm("objetivoGeneral", e.target.value)}
                    />
                    <Input label={"Objetivos específicos"}
                        value={form?.objetivosEspecificos}
                        placeholder={"Ingresa objetivos específicos"}
                        onChange={(e) => handleForm("objetivosEspecificos", e.target.value)}
                    />
                    <Input label={"Alcance del proyecto"}
                        value={form?.alcanceProyecto}
                        placeholder={"Ingresa alcance del proyecto"}
                        onChange={(e) => handleForm("alcanceProyecto", e.target.value)}
                    />
                    <Input label={"Herramientas en el desarrollo del proyecto"}
                        value={form?.elementosHerramientas}
                        placeholder={"Ingresa herramientas"}
                        onChange={(e) => handleForm("elementosHerramientas", e.target.value)}
                    />
                    <Input label={"Producto(s) y resultados esperados:"}
                        value={form?.prodResultadosEsperados}
                        placeholder={"Ingresa productos y resultados"}
                        onChange={(e) => handleForm("prodResultadosEsperados", e.target.value)}
                    />
                    <Input label={"Palabras clave:"}
                        value={form?.palabrasClave}
                        placeholder={"Ingresa palabras clave de tu proyecto"}
                        onChange={(e) => handleForm("palabrasClave", e.target.value)}
                    />

                    <div className={styles.buttonSave}>
                        <button className="globalButton" onClick={createForm} >
                            Guardar
                        </button>
                    </div>

                </div>
            </div>
        </div>

    );
}

"use client";

import Input from "./components/Input";
import Section from "./components/Section";
import styles from "./form.module.css"

export default function FormPage() {

  return (
    <div className={styles.containerGeneral}>

      <div className={styles.containerContent}>

        <div className={styles.containerPlantilla}>
          <h1> Perfil de Proyecto de Título </h1>
          <div>
            <a href="/images/Perfil de Proyecto de Título.docx" download>
              <button className={styles.download}>Descargar plantilla</button>
            </a>
            <div className={styles.tooltipContainer}>
              <button className={styles.tooltip}>?</button>
              <span className={styles.tooltipText}>
                Te sugerimos completar toda la información en esta plantilla primero.
              </span>
            </div>
          </div>
        </div>
        <Section label={"Nombre y rut"} value={"Elisa Rojas"} />
        <Section label={"Profesor"} value={"Profe"} />
        <Section label={"NRC"} value={"8245"} />
        <Input label={"Título tentativo del proyecto"} value={"Ingresa título"} />
        <Input label={"Resumen ejecutivo"} value={"Ingresa resumen ejecutivo"} />
        <Input label={"Justificación del proyecto"} value={"Ingresa justificación"} />
        <Input label={"Objetivo general"} value={"Ingresa objetivo general"} />
        <Input label={"Objetivos específicos"} value={"Ingresa objetivos específicos"} />
        <Input label={"Alcance del proyecto"} value={"Ingresa el alcance del proyecto"} />
        <Input label={"Elementos, herramientas y tópicos de la carrera a utilizar en el desarrollo del proyecto"} value={"Ingresa elementos"} />
        <Input label={"Producto(s) y resultados esperados:"} value={"Ingresa producto y resultados esperados"} />
        <div className={styles.buttonSave}>
          <button >Guardar</button>
        </div>

      </div>

    </div>

  );
}

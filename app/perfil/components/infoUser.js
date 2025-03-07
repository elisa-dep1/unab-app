"use client"
import { useState } from "react";
import styles from "../perfil.module.css"
import BasicInfo from "../components/BasicInfo";
import Security from "../components/Security";




export default function InfoUser({ user }) {

  const [section, setSection] = useState("basic");

  return (
    <div className={styles.containerGeneralPerfil}>

      <div className={styles.menu}>
        <div
          onClick={() => setSection("basic")}
          className={section === "basic" ? styles.active : ""}
        >
          Datos personales
        </div>
        <div
          onClick={() => setSection("security")}
          className={section === "security" ? styles.active : ""}
        >
          Seguridad
        </div>

      </div>

      <div className={styles.content}>
        {section === "basic" && <BasicInfo nombre={user.nombre} correo={user.correo} usuario={user.nomUsuario} />}
        {section === "security" && <Security user={user.rut} />}
      </div>
    </div>
  );
}

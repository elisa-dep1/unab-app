"use client"
import { useState } from "react";
import styles from "./perfil.module.css"
import BasicInfo from "./components/BasicInfo";
import ExtraInfo from "./components/ExtraInfo";
import Security from "./components/Security";



export default function InfoUserPage() {

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
        <div 
          onClick={() => setSection("extra")} 
          className={section === "extra" ? styles.active : ""}
        >
          Documentos y extras
        </div>
      </div>

      <div className={styles.content}>
        {section === "basic" && <BasicInfo />}
        {section === "security" && <Security />}
        {section === "extra" && <ExtraInfo />}
      </div>
    </div>
  );
}

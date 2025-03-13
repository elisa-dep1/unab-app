import axios from "axios";
import styles from "../perfil.module.css"
import { useState } from "react";

export default function Security({ user }) {

    const [password, setPassword] = useState({});

    const updatePassword = async () => {
        try {
            await axios.put("/api/password", { user, ...password })
            alert("Clave cambiada");
            return;
        }
        catch{
            alert("No se pudo cambiar la contraseña")
        }
        

    }
    const handleForm = (key, value) => {
        setPassword(prev => ({ ...prev, [key]: value }))
    }

    return (
        <div className={styles.containerContent}>
            <h2 style={{ marginTop: "0px" }}> Cambiar contraseña </h2>
            <div className={styles.contentPassword}>
                <input type="password" placeholder="Contraseña actual" onChange={(e) => handleForm("contrasenaActual", e.target.value)} />
                <input type="password" placeholder="Contraseña nueva" onChange={(e) => handleForm("contrasenaNueva", e.target.value)} />
                <input type="password" placeholder="Repetir contraseña" onChange={(e) => handleForm("repetirContrasena", e.target.value)} />
            </div>
            <button className="globalButton" onClick={updatePassword}> Guardar </button>
        </div>
    )
}
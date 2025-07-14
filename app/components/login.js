"use client"
import { useState } from "react";
import Form from 'next/form'
import styles from "../page.module.css";
import axios from "axios";
import { setCookie } from 'cookies-next'

export default function Login() {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();


  const handleUser = async () => {
  try {
    const response = await axios.post("/api/login", {
      nomUsuario: username,
      contrasena: password,
    });
    setCookie("token", response.data.token);
    window.location.href = "/inicio";
  } catch (error) {
    alert("Usuario no existe");
  }
};


  return (
    <form onSubmit={(e) => e.preventDefault()} className={styles.formInit}>
      <div className={styles.inputGroup}>
        <input onChange={(e) => setUsername(e.target.value)} className={styles.inputUser} type="text" required />
        <label className={styles.user}>Usuario</label>
      </div>
      <div className={styles.inputGroup}>
        <input onChange={(e) => setPassword(e.target.value)} className={styles.inputPassword} type="password" required />
        <label className={styles.password}>Contraseña</label>
      </div>
      <button onClick={handleUser} className="globalButton" type="submit">Ingresar</button>
    </form>

  );
}

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
      const response = await axios.post("api/usuarios",
        { nomUsuario: username, contrasena: password },)
      setCookie("token", response.data.token);
      window.location.href = "/inicio"

    } catch (error) {
      alert("Usuario no existe");
    }
  }

  return (
    <Form onSubmit={(e) => e.preventDefault()} className={styles.formInit}>
      <input onChange={(e) => setUsername(e.target.value)} className={styles.inputUser} type="text" required />
      <label className={styles.user}>Usuario</label>
      <input onChange={(e) => setPassword(e.target.value)} className={styles.inputPassword} type="password" required />
      <label className={styles.password}>Contraseña</label>
      <button onClick={handleUser} className="globalButton" type="submit">Ingresar</button>
    </Form>

  );
}

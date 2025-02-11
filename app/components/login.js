"use client"
import { useState } from "react";
import Form from 'next/form'
import styles from "../page.module.css";

export default function Login() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    // Tarea 2
    const login = (username, password) => {
      // Consumir backend con axios o fetch

      // TODO: remover mocks
      if (username === "elisa" && password === "1234"){
        return "token"
      }

      return undefined;
    }

    const handleUserForm = (e) =>{
        const token = login(username, password)
        if(!token){
          alert("Usuario no existe")
          return;
        }

        // poner token en cookie

    }

    return (
      <Form className={styles.formInit}>
          <input onChange={(e) => setUsername(e.target.value)} className={styles.inputUser} type="text" required />
          <label className={styles.user}>Usuario</label>  
          <input onChange={(e) => setPassword(e.target.value)} className={styles.inputPassword} type="password" required />
          <label className={styles.password}>Contraseña</label>  
          <button onClick={handleUserForm} className={styles.button} type="submit">Ingresar</button>
      </Form>
  
    );
  }
  
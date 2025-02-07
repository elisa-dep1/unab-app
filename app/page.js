
import styles from "./page.module.css";

export default function LoginPage() {
  return (
    <>
        <input className={styles.inputUser} type="text" required />
        <label className={styles.user}>Usuario</label>  
        <input className={styles.inputPassword} type="password" required />
        <label className={styles.password}>Contraseña</label>  
        <button className={styles.button} type="submit">Ingresar</button>
    </>

  );
}

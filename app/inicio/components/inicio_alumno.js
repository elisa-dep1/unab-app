import styles from "../inicio.module.css";

export default function StudentMainComponent() {

  const saludo = "Elisa";

  return (
    <div className={styles}>
      <span>Hola {saludo}</span>
      <div className={styles.containerGeneral}>
        <div>
          hola
        </div>
        <div>
          ña
        </div>
      </div>
    </div>

  );
}
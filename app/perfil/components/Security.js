import styles from "../perfil.module.css"

export default function Security() {

    return (
        <div className={styles.containerContent}>
            <h2 style={{ marginTop: "0px" }}> Cambiar contraseña </h2>
            <div className={styles.contentPassword}>
                <input placeholder="Contraseña actual" />
                <input placeholder="Contraseña nueva" />
                <input placeholder="Repetir contraseña" />
            </div>
            <button> Guardar </button>
        </div>
    )
}
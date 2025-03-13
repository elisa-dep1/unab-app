
import styles from "../perfil.module.css"


export default function BasicInfo({ nombre, correo, usuario }) {
    
    const formatName = (nombre) => {
        if (!nombre) return ""; 

        const parts = nombre.split(" ");

        if (parts.length > 2) {
            return `${parts.slice(2).join(" ")} ${parts[0]} ${parts[1]}`;
        }

        return parts.length === 2 ? `${parts[0]} ${parts[1]}` : nombre;
    };



    return (
        <>
            <div className={styles.containerContent}>
                <h2 style={{ marginTop: "0px" }}> Datos personales </h2>
                <div className={styles.containerDiv}>
                    <div className={styles.contentProfile}>
                        <span className={styles.titleProfile}> Nombre </span>
                        <span className={styles.dataProfile}> {formatName(nombre)} </span>
                    </div>
                    <div className={styles.contentProfile} style={{ borderTop: "1px solid #c1c2c4", borderBottom: "1px solid #c1c2c4" }}>
                        <span className={styles.titleProfile}> Correo </span>
                        <span className={styles.dataProfile}> {correo} </span>
                    </div>

                    <div className={styles.contentProfile}>
                        <span className={styles.titleProfile}> Usuario </span>
                        <span className={styles.dataProfile}> {usuario} </span>
                    </div>
                </div>

            </div>

        </>
    )
}
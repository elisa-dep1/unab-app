import styles from "../perfil.module.css"


export default function BasicInfo() {

    const name = "Elisa Rojas Reyes";
    const mail = "e.rojasreyes@uandresbello.edu"
    const user = "e.rojasreyes";
    return (

        <>
            <div className={styles.containerContent}>
                <h2 style={{ marginTop: "0px" }}> Datos personales </h2>
                <div className={styles.containerDiv}>
                    <div className={styles.contentProfile}>
                        <span className={styles.titleProfile}> Nombre </span>
                        <span className={styles.dataProfile}> {name} </span>
                    </div>
                    <div className={styles.contentProfile} style={{borderTop: "1px solid #c1c2c4", borderBottom: "1px solid #c1c2c4"}}>
                        <span className={styles.titleProfile}> Correo </span>
                        <span className={styles.dataProfile}> {mail} </span>
                    </div>

                    <div className={styles.contentProfile}>
                        <span className={styles.titleProfile}> Usuario </span>
                        <span className={styles.dataProfile}> {user} </span>
                    </div>
                </div>

            </div>

        </>
    )
}
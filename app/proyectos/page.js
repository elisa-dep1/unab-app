import FilterProyectsComponent from "./component/FilterProyect";
import styles from "./filProyect.module.css"

export default async function ProyectPage() {
    return (
        <div>
            <div className={styles.containerGeneral}>
                <p className={styles.title}>Proyectos de alumnos</p>
                <div>
                    <FilterProyectsComponent />
                </div>
            </div>
        </div>
    );
}

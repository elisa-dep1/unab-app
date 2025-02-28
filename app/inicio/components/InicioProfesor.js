
import styles from "../inicio.module.css";
import Card from "./Card";



export default function TeacherMainComponent() {

  return (
    <>
      <div className={styles.containerGeneral}>
        
        <Card title={"Cursos y alumnos"} description={"Revisa los NRC y sus participantes"} text={"Ingresar a filtros"} image={"/images/5.svg"} url={"/filtros"} />
        <Card title={"Fecha presentación"} description={"Asigna y edita la fecha de presentación a tus alumnos"} text={"Ingresar a presentación"} image={"/images/4.svg"} url={"/fecha-presentacion"} />
        <Card title={"Documentos"} description={"Documentos requeridos en este ramo"} text={"Ingresar a documentos"} image={"/images/3.svg"} url={"/documentos/profesores"} />

      </div>

    </>


  );
}
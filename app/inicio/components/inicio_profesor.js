
import styles from "../inicio.module.css";
import Card from "./card";



export default function TeacherMainComponent() {

  return (
    <>
      <span>Vista profesor</span>
      <div className={styles.containerGeneral}>
        <Card title={"Perfil"} description={"Revisa tu información personal"} text={"Ingresar a perfil"} image={"/images/1.svg"} />
        <Card title={"Cursos y alumnos"} description={"Revisa los NRC y sus participantes"} text={"Ingresar a filtros"} image={"/images/5.svg"} url={"/filtros"} />
        <Card title={"Fecha presentación"} description={"Asigna y edita la fecha de presentación a tus alumnos"} text={"Ingresar a presentación"} image={"/images/4.svg"} />
        <Card title={"Documentos"} description={"Documentos requeridos en este ramo"} text={"Ingresar a documentos"} image={"/images/3.svg"}/> 
        
      </div>

    </>


  );
}
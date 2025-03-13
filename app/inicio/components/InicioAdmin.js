
import styles from "../inicio.module.css";
import Card from "./Card";


export default function AdminMainComponent() {

  return (
    <>
      <div className={styles.containerGeneral}>
      
        <Card title={"Cursos y alumnos"} description={"Revisa los NRC y sus participantes"} text={"Ingresar a formulario"} image={"/images/5.svg"} url={"/alumnos"}/>
        <Card title={"Nuevo NRC"} description={"Carga un nuevo NRC con planilla Excel"} text={"Ingresar a documentos"} image={"/images/4.svg"} url={"/nuevo-nrc"}/>
        <Card title={"Fecha presentación"} description={"Asigna y edita la fecha de presentación a los alumnos"} text={"Ingresar a presentación"} image={"/images/2.svg"} url={"/fecha-presentacion"} />
        <Card title={"Proyectos alumnos"} description={"Revisa todos los proyectos propuestos por los alumnos"} text={"Ingresar a proyectos"} image={"/images/proyecto.svg"} url={"/proyectos"}/>
        
      </div>

    </>
  );
}
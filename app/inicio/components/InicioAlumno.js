
import Card from "./Card";
import styles from "../inicio.module.css";

export default function StudentMainComponent() {

  return (
    <div className={styles.containerGeneral}>
    
      <Card title={"Formulario"} description={"Añade detalles sobre tu proyecto"} text={"Ingresar a formulario"} image={"/images/2.svg"} url={"/formulario"}/> 
      <Card title={"Documentos"} description={"Documentos requeridos en este ramo"} text={"Ingresar a documentos"} image={"/images/3.svg"} url={"/documentos/alumnos"}/> 
      
    </div>

  );
}
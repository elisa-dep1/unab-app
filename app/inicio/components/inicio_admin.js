import Filters from "../../filtros/page";
import styles from "../inicio.module.css";
import Card from "./card";


export default function AdminMainComponent() {

  return (
    <>
      <div className={styles.containerGeneral}>
        <Card title={"Perfil"} description={"Revisa tu información personal"} text={"Ingresar a perfil"} image={"/images/1.svg"} />
        <Card title={"Cursos y alumnos"} description={"Revisa los NRC y sus participantes"} text={"Ingresar a formulario"} image={"/images/5.svg"} />
        <Card title={"Nuevo NRC"} description={"Carga un nuevo NRC con planilla Excel"} text={"Ingresar a documentos"} image={"/images/4.svg"} />
      </div>

    </>
  );
}
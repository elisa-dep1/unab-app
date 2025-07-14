
import { getUserName } from "../utils/getUser";
import DocumentTeacher from "./components/TeacherDocument";
import DocumentStudent from "./components/StudentDocument";


export default async function Document() {
    const user = await getUserName();
    return (
        <>
            {
                user.tipoUsuario === "profesor" ? (
                    <DocumentTeacher />
                ) : user.tipoUsuario === "alumno" && user.semestre === 1 ? (
                    <DocumentStudent />
                ) : user.tipoUsuario === "alumno" && user.semestre === 2 ? (
                    <div> ño </div>
                ) : null
            }


        </>

    );
}

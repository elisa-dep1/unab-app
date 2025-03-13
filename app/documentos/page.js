
import { getUserName } from "../utils/getUser";
import DocumentTeacher from "./components/TeacherDocument";
import DocumentStudent from "./components/StudentDocument";


export default async function Document() {
    const user = await getUserName();
    return (
        <>
            {
                user.tipoUsuario === "profesor" ?
                    (

                        <DocumentTeacher />
                    )
                    :
                    (
                        <DocumentStudent />
                    )
            }


        </>

    );
}

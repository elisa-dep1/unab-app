import AdminMainComponent from "./components/inicio_admin";
import StudentMainComponent from "./components/inicio_alumno";
import TeacherMainComponent from "./components/inicio_profesor";

export default function MainPage() {
    // sacar token de las cookies
    // revisar la base de datos el usuario con el token válido
    // si no existe, enviar a login
    // si existe, sacar data del usuario

    const user = {
        id: 1,
        role: "student"
    }
    return (
        <>
            {user.role === "admin" && <AdminMainComponent/>}
            {user.role === "teacher" && <TeacherMainComponent/>}
            {user.role === "student" && <StudentMainComponent/>}
        </>

    );
}
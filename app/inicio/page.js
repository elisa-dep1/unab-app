import AdminMainComponent from "./components/InicioAdmin";
import StudentMainComponent from "./components/InicioAlumno";
import TeacherMainComponent from "./components/InicioProfesor";

export const metadata = {
    title: "UNAB | Home ",
    description: "App de Universidad Andrés Bello",
  };
  
export default function MainPage() {
    // sacar token de las cookies
    // revisar la base de datos el usuario con el token válido
    // si no existe, enviar a login
    // si existe, sacar data del usuario

    const user = {
        id: 1,
        role: "teacher"
    }
    return (
        <>
            {user.role === "admin" && <AdminMainComponent/>}
            {user.role === "teacher" && <TeacherMainComponent/>}
            {user.role === "student" && <StudentMainComponent/>}
        </>

    );
}
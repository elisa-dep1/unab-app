import { PrismaClient } from "@prisma/client";
import AdminMainComponent from "./components/InicioAdmin";
import StudentMainComponent from "./components/InicioAlumno";
import TeacherMainComponent from "./components/InicioProfesor";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
    title: "UNAB | Home ",
    description: "App de Universidad Andrés Bello",
};

export default async function MainPage() {

    const prisma = new PrismaClient();
    const token = (await cookies()).get("token")
    const user = await prisma.usuario.findUnique({
        where: {
            token: token?.value || ""
        },
    })
    if (!user) {
        redirect(path)
    }

    return (
        <>
            {user.tipoUsuario === "admin" && <AdminMainComponent />}
            {user.tipoUsuario === "profesor" && <TeacherMainComponent />}
            {user.tipoUsuario === "alumno" && <StudentMainComponent />}
        </>

    );
}
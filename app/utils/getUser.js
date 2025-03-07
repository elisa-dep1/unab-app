import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "server-only"

export const preload = async (path) => {
    return await getUser(path);
}

export const getUser = async (path) => {

    //instancia prisma
    const prisma = new PrismaClient();

    // obteniendo el token desde las cookies del usuario
    const token = (await cookies()).get("token")

    // busca que un usuario exista con ese token
    const user = await prisma.usuario.findUnique({
        where: {
            token: token?.value || ""
        },
        select: {
            nombre: true,
            rut: true,
            correo: true,
            nomUsuario: true,
        }
    })
    // si no existe el user, redirecciona al login
    if (!user) {
        redirect(path)
    }

    return user;
}
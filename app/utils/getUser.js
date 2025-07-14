
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "server-only"

import prisma from '../lib/prisma';

export const preload = async (path) => {
    return await getUser(path);
}
export const getUser = async (path) => {

 
    const token = (await cookies()).get("token")

    const user = await prisma.usuario.findUnique({
        where: {
            token: token?.value || ""
        },
        select: {
            nombre: true,
            rut: true,
            correo: true,
            nomUsuario: true,
            estudianteNRC: true,
        },

    })
  
    if (!user) {
        redirect(path)
    }

    return user || null;
}

export const getUserName = async () => {
    const token = (await cookies()).get("token")
    const user = await prisma.usuario.findUnique({
        where: {
            token: token?.value || ""
        },
        select: {
            nombre: true,
            estudianteNRC: true,
            tipoUsuario: true,
            semestre: true
        },

    })
    return user

}

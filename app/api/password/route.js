import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import prisma from '../../lib/prisma';

export async function PUT(request) {
    const { user, contrasenaActual, contrasenaNueva } = await request.json();

    const token = (await cookies()).get("token");

    const userData = await prisma.usuario.findUnique({
        where: {
            token: token?.value
        },
        select: {
            rut: true,
            contrasena: true
        }
    })
    if (userData.rut !== user) {
        return Response.json({ error: "Credenciales inválidas" }, { status: 401 })
    }

    if (userData.contrasena !== contrasenaActual) {
        return Response.json({ error: "Contraseña inválida" }, { status: 400 })
    }
    
    const passwordUser = await prisma.usuario.update({
        where: {
            rut: user
        },
        data: {
            contrasena: contrasenaNueva
        }
    })
    return Response.json({});
}
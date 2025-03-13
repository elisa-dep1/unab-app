import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from '@/app/lib/prisma';

export async function GET() {

    try {
        const token = cookies().get("token");

        if (!token || !token.value) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const user = await prisma.usuario.findUnique({
            where: { token: token.value },
            select: {
                nombre: true,
                nomUsuario: true,
                correo: true,
                estudianteNRC: true,
            }
        });

        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Error en la API de usuarios:", error);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}




export async function POST(request) {
    const { nomUsuario, contrasena } = await request.json();

    const usuario = await prisma.usuario.findUnique({
        where: {
            nomUsuario: nomUsuario,
            contrasena: contrasena
        }
    });

    if (!usuario || usuario.contrasena !== contrasena) {
        return Response.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    return Response.json({ token: usuario.token });
}


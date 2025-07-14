import { NextResponse } from "next/server";
import prisma from '@/app/lib/prisma';
import { Prisma } from "@prisma/client";
import { authApi } from "../../utils/authApi";

export async function POST(request) {
    const user = await authApi();
    if (!user) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const data = await request.json();
    console.log("📩 Datos recibidos en API /api/usuarios:", data); 

    const {
        nombre,
        rut,
        correo,
        contrasena,
        tipoUsuario,
        nomUsuario,
        semestre,
        activo,
        idNRC,
        periodo
    } = data;

    try {
        const nuevoUsuario = await prisma.usuario.create({
            data: {
                nombre,
                rut,
                correo,
                contrasena,
                tipoUsuario,
                nomUsuario,
                semestre,
                activo,
                token: String(Math.floor(Math.random() * 1000000))
            },
        });


        await prisma.estudianteNRC.create({
            data: {
              idAlumno: nuevoUsuario.rut,
              idNRC,
              periodo,
            }
          });
          
          
          

        return NextResponse.json(nuevoUsuario);
    } catch (error) {
        console.error("❌ Error al crear usuario:", error);
        return NextResponse.json({ error: "No se pudo crear el usuario" }, { status: 500 });
    }
}

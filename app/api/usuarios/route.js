import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function GET() {
    const usuarios = await prisma.usuario.findMany({
        select: {
            nombre: true,
            nomUsuario: true,
            correo: true
        }
    });
    return Response.json(usuarios);
}

export async function POST(request) {
    const { nomUsuario, contrasena } = await request.json();
 
    const usuario = await prisma.usuario.findUnique({
        where: { 
            nomUsuario: nomUsuario, 
            contrasena: contrasena }
    });

    if (!usuario || usuario.contrasena !== contrasena) {
        return Response.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    return Response.json({ token: usuario.token });
}


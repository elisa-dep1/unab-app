import { NextResponse } from "next/server";
import prisma from '@/app/lib/prisma';

export async function POST(request) {
  const { nomUsuario, contrasena } = await request.json();

  const user = await prisma.usuario.findFirst({
    where: {
      nomUsuario,
      contrasena,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Usuario no existe" }, { status: 404 });
  }

  return NextResponse.json({ token: user.token, tipoUsuario: user.tipoUsuario });
}

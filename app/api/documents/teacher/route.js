import prisma from "@/app/lib/prisma";
import { authApi } from "@/app/utils/authApi";



export async function GET(request) {
  const user = await authApi();

  if (!user) {
    return Response.json({ error: "Credenciales inválidas" }, { status: 401 })
  }
  const files = await prisma.DocumentosEstudiante.findMany({
    where: {
      
    },
  });
  return Response.json({ files });
}


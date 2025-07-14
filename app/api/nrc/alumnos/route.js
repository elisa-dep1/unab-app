import prisma from "@/app/lib/prisma";

export async function GET(request) {
    
    const { searchParams } = new URL(request.url);
    const nrc = searchParams.get("nrc");
  
    const users = await prisma.usuario.findMany({
      where: {
        estudianteNRC: {
          some: {
            idNRC: nrc
          }
        }
      },
      select: {
        nombre: true,
        rut: true,
        correo: true,
        formulariosComoEstudiante: true,
        documentosEstudiante: true,
        defensasComoEstudiante: true
      }
    });
    
    const nrcData = await prisma.nRC.findFirst({
      where: {
        codigo: nrc
      },
      select: {
        profesor: {
          select: {
            nombre: true
          }
        }
      }
    });
  
    return Response.json({
      estudiantes: users || [],
      profesor: nrcData?.profesor?.nombre || null
    });
  }
  
import prisma from "@/app/lib/prisma";
import { cookies } from "next/headers";


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
            nombre:true, 
            rut: true,
            correo: true,
        }
    })
    return Response.json( users || []);
}


import { cookies } from "next/headers";
import prisma from "../../lib/prisma"
import { PrismaClient } from "@prisma/client";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const periodo = searchParams.get("periodo");

        const prisma = new PrismaClient()

        const token = (await cookies()).get("token");
        const user = await prisma.usuario.findUnique({
            where: {
                token: token?.value,
            },
            include: {
                nrcs: {
                    where: {
                        periodo: periodo
                    }
                }
            }
        })
        if(user.tipoUsuario === "profesor"){
            return Response.json(user?.nrcs || []);
        }

        if(user.tipoUsuario === "admin"){
            const nrcs = await prisma.nRC.findMany({
                where: {
                    periodo: periodo
                }
            })
            return  Response.json(nrcs || []);
        }

        return Response.json()

        
    } catch (err) {
        return Response.json()
    }
}
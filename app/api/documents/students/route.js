import prisma from "@/app/lib/prisma";
import { cookies } from "next/headers";

export async function POST(request) {
    const { idInformeDoc, idInformePdf, idPresentacionPpt, idPresentacionPdf, ria, idAutorizacionPdf }
        = await request.json();

    const token = (await cookies()).get("token");

    const user = await prisma.usuario.findUnique({
        where: {
            token: token?.value
        },
        select: {
            rut: true
        }
    })
    if (user === null) {
        return Response.json({ error: "Credenciales inválidas" }, { status: 401 })
    }

    const doc = await prisma.documentosEstudiante.create({
        data: {
            idEstudiante: user.rut,
            idInformeDoc: idInformeDoc,
            idInformePdf: idInformePdf,
            idPresentacionPpt: idPresentacionPpt,
            idPresentacionPdf: idPresentacionPdf,
            ria: ria,
            idAutorizacionPdf: idAutorizacionPdf,
        }

    })
    return Response.json({});

}
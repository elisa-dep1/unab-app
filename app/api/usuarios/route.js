import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const usuarios = await prisma.usuario.findMany({
        include: { tipo: true }
    });
    return Response.json(usuarios);
}























export async function POST(request) {
    const body = await request.json()
    console.log(body.name)
    // await db.create(body)
    return Response.json({
        body
    })
}

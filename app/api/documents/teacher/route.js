import prisma from "@/app/lib/prisma";
import { cookies } from "next/headers";



export async function POST(request) {
    const {  } = await request.json();

    const token = (await cookies()).get("token");

    const user = await prisma.usuario.findUnique({
        where: {
            token: token?.value
        }
    })

    return Response.json({user});
}
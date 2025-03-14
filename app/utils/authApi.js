
import { cookies } from "next/headers";
import prisma from '../lib/prisma';

export const authApi = async () => {

    const token = (await cookies()).get("token")

    const user = await prisma.usuario.findUnique({
        where: {
            token: token?.value || ""
        },
        select: {
            rut: true,
           
        },

    })
    return user || null;
}

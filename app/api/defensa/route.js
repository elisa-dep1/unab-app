import prisma from "@/app/lib/prisma";
import { authApi } from "@/app/utils/authApi";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const periodo = searchParams.get("periodo");
        const codigoNRC = searchParams.get("codigoNRC");

        if (!periodo || !codigoNRC) {
            return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400 });
        }

        const defensas = await prisma.defensa.findMany({
            where: {
                periodo,
                codigoNRC,
            },
            include: {
                estudiante: true,
            },
        });

        return new Response(JSON.stringify(defensas), { status: 200 });
    } catch (error) {
        console.error("Error al obtener defensas:", error);
        return new Response(JSON.stringify({ error: "Error en el servidor" }), { status: 500 });
    }
}

export async function POST(req) {
    try {
        const user = await authApi();

        if (!user) {
            return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401 });
        }

        const body = await req.json();
        const { idEstudiante, codigoNRC, periodo } = body;

        if (!idEstudiante || !codigoNRC || !periodo) {
            return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400 });
        }

        const existe = await prisma.defensa.findFirst({
            where: {
                idEstudiante,
                codigoNRC,
                periodo,
            },
        });

        if (!existe) {
            await prisma.defensa.create({
                data: {
                    idEstudiante,
                    idProfesor: user.rut,
                    codigoNRC,
                    periodo,
                    autorizacion: true,
                    fecha: null,
                    sala: null,
                },
            });
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error("Error al guardar defensa:", error);
        return new Response(JSON.stringify({ error: "Error en el servidor" }), { status: 500 });
    }
}


export async function PUT(req) {
    try {
        const body = await req.json();
        const { id, fecha, sala } = body;

        if (!id || (fecha === undefined && sala === undefined)) {
            return new Response(JSON.stringify({ error: "Datos incompletos" }), { status: 400 });
        }

        const data = {};
        if (fecha !== undefined) data.fecha = new Date(fecha);
        if (sala !== undefined) data.sala = sala;

        await prisma.defensa.update({
            where: { id },
            data,
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error("Error al actualizar defensa:", error);
        return new Response(JSON.stringify({ error: "Error en el servidor" }), { status: 500 });
    }
}




export async function DELETE(req) {
    try {
        const { idEstudiante, codigoNRC, periodo } = await req.json();

        if (!idEstudiante || !codigoNRC || !periodo) {
            return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400 });
        }

        await prisma.defensa.deleteMany({
            where: {
                idEstudiante,
                codigoNRC,
                periodo,
            },
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error("Error al eliminar defensa:", error);
        return new Response(JSON.stringify({ error: "Error en el servidor" }), { status: 500 });
    }
}

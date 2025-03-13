import { cookies } from "next/headers";
import prisma from '../../lib/prisma';

export async function POST(request) {
    // para validar que el usuario que está editando sea el correcto, uso el token que está en sus cookies
    // 1. sacar token de las cookies y buscar al usuario 
    // 2. saco el rutStudent del request y lo comparo con el user que saco del token
    // 3. saco la data a alterar del request.json(), y creo el registro en la base de datos usando prisma.create
    // 4. retorno todo el objeto que me devuelva la respuesta para recargar la vista con la data (importa el id, por si quiere editar)

    const { nrc, periodo, idStudent, idTeacher, tituloProyecto, resumenEjecutivo, justificacionProyecto, objetivoGeneral, objetivosEspecificos, alcanceProyecto, elementosHerramientas, prodResultadosEsperados, palabrasClave }
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
    if (user.rut !== idStudent) {
        return Response.json({ error: "Credenciales inválidas" }, { status: 401 })
    }

    const form = await prisma.formularioProyectoEstudiante.create({
        data: {
            idNRC: nrc,
            periodo: periodo,
            idProfesor: idTeacher,
            idEstudiante: idStudent,
            tituloProyecto: tituloProyecto,
            resumenEjecutivo: resumenEjecutivo,
            justificacionProyecto: justificacionProyecto,
            objetivoGeneral: objetivoGeneral,
            objetivosEspecificos: objetivosEspecificos,
            alcanceProyecto: alcanceProyecto,
            elementosHerramientas: elementosHerramientas,
            prodResultadosEsperados: prodResultadosEsperados,
            palabrasClave: palabrasClave
        }
    })



    return Response.json({ id: form.id });
}

export async function PUT(request) {
    const { id, nrc, periodo, idStudent, idTeacher, tituloProyecto, resumenEjecutivo, justificacionProyecto, objetivoGeneral, objetivosEspecificos, alcanceProyecto, elementosHerramientas, prodResultadosEsperados, palabrasClave }
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
    const createdForm = await prisma.formularioProyectoEstudiante.findFirst({
        where: {
            id: id
        },
        select: {
            idEstudiante: true
        }
    })
    if (user.rut !== createdForm.idEstudiante) {
        return Response.json({ error: "Credenciales inválidas" }, { status: 401 })
    }


    const form = await prisma.formularioProyectoEstudiante.update({
        where: {
            id: id
        },
        data: {
            idNRC: nrc,
            periodo: periodo,
            idProfesor: idTeacher,
            idEstudiante: idStudent,
            tituloProyecto: tituloProyecto,
            resumenEjecutivo: resumenEjecutivo,
            justificacionProyecto: justificacionProyecto,
            objetivoGeneral: objetivoGeneral,
            objetivosEspecificos: objetivosEspecificos,
            alcanceProyecto: alcanceProyecto,
            elementosHerramientas: elementosHerramientas,
            prodResultadosEsperados: prodResultadosEsperados,
            palabrasClave: palabrasClave
        }
    })

    return Response.json({});
}


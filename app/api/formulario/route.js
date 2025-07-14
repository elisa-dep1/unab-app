import { cookies } from "next/headers";
import prisma from '../../lib/prisma';
import { authApi } from "@/app/utils/authApi";


export async function POST(request) {
  
    const { nrc, periodo, idStudent, idTeacher, tituloProyecto, resumenEjecutivo, justificacionProyecto, objetivoGeneral, objetivosEspecificos, alcanceProyecto, elementosHerramientas, prodResultadosEsperados, palabrasClave }
        = await request.json();

    const user =  await authApi();

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

    const user = await authApi();

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




import prisma from "@/app/lib/prisma";
import { authApi } from "@/app/utils/authApi";

import fs from "fs/promises";
import path from "path";


export async function GET(request) {
  const user = await authApi();

  if (!user) {
    return Response.json({ error: "Credenciales inválidas" }, { status: 401 })
  }
  const files = await prisma.DocumentosEstudiante.findMany({
    where: {
      idEstudiante: user.rut
    },
  });
  return Response.json({ files });
}
export async function POST(request) {
  try {
    const { idInformeDoc, idInformePdf, idPresentacionPpt, idPresentacionPdf, ria, idAutorizacionPdf } = await request.json();
   
    const user = await authApi();
    if (!user) {
      console.error("Error: Usuario no autenticado");
      return Response.json({ error: "Credenciales inválidas" }, { status: 401 });
    }



    const existingDoc = await prisma.documentosEstudiante.findUnique({
      where: { idEstudiante: user.rut },
    });

    if (existingDoc) {
    
      const updatedDoc = await prisma.documentosEstudiante.update({
        where: { idEstudiante: user.rut },
        data: {
          idInformeDoc: existingDoc.idInformeDoc ?? idInformeDoc,
          idInformePdf: existingDoc.idInformePdf ?? idInformePdf,
          idPresentacionPpt: existingDoc.idPresentacionPpt ?? idPresentacionPpt,
          idPresentacionPdf: existingDoc.idPresentacionPdf ?? idPresentacionPdf,
          ria: existingDoc.ria ?? ria,
          idAutorizacionPdf: existingDoc.idAutorizacionPdf ?? idAutorizacionPdf,
        },
      });

     
      return Response.json({ message: "Documentos actualizados correctamente", updatedDoc });
    }

   
    const doc = await prisma.documentosEstudiante.create({
      data: {
        idEstudiante: user.rut,
        idInformeDoc,
        idInformePdf,
        idPresentacionPpt,
        idPresentacionPdf,
        ria,
        idAutorizacionPdf,
      },
    });

 
    return Response.json({ message: "Documentos guardados correctamente", doc });

  } catch (error) {
    console.error("Error en POST /documents/students:", error);
    return Response.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}



const uploadBaseDir = "C:\\Users\\elisa\\Escritorio\\storage-documents\\document-student";

export async function DELETE(request) {

  const user = await authApi();

  if (!user) {
    return Response.json({ error: "Credenciales inválidas" }, { status: 401 })
  }

  const { fileField } = await request.json();

  if (!fileField) {
    return new Response(JSON.stringify({ error: "Tipo de archivo no especificado" }), { status: 400 });
  }

  try {

    const userFiles = await prisma.documentosEstudiante.findUnique({
      where: { idEstudiante: user.rut },
      select: { [fileField]: true },
    });

    const filePath = userFiles?.[fileField];

    if (!filePath) {
      return new Response(JSON.stringify({ error: "Archivo no encontrado en la base de datos" }), { status: 404 });
    }


    const fullFilePath = path.join(uploadBaseDir, user.rut, path.basename(filePath));


    try {
      await fs.unlink(fullFilePath);
    } catch (error) {
      console.error("Error al eliminar archivo del sistema:", error);
    }


    await prisma.documentosEstudiante.update({
      where: { idEstudiante: user.rut },
      data: { [fileField]: null },
    });


    const userFolderPath = path.join(uploadBaseDir, user.rut);


    const remainingFiles = await prisma.documentosEstudiante.findUnique({
      where: { idEstudiante: user.rut },
      select: {
        idInformeDoc: true,
        idInformePdf: true,
        idPresentacionPpt: true,
        idPresentacionPdf: true,
        ria: true,
        idAutorizacionPdf: true
      },
    });

    if (Object.values(remainingFiles).every(value => value === null)) {
      await prisma.documentosEstudiante.delete({
        where: { idEstudiante: user.rut },
      });
      
    }

    try {
      const files = await fs.readdir(userFolderPath);
      if (files.length === 0) {
        await fs.rmdir(userFolderPath);

      }
    } catch (error) {
      console.error("Error verificando o eliminando la carpeta:", error);
    }
    return new Response(JSON.stringify({ message: "Archivo eliminado correctamente" }), { status: 200 });
  } catch (error) {
    console.error("Error al eliminar archivo:", error);
    return new Response(JSON.stringify({ error: "No se pudo eliminar el archivo" }), { status: 500 });
  }
}

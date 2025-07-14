import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { cookies } from 'next/headers';
import prisma from '@/app/lib/prisma';

//Hola! Esta es la ruta que se indica en el README.
const uploadBaseDir = 'C:\\Users\\elisa\\Escritorio\\storage-documents\\document-student';

async function ensureDir(directory) {
  try {
    await fs.access(directory);
  } catch {
    await fs.mkdir(directory, { recursive: true });
  }
}

export async function POST(request) {
  const token = (await cookies()).get("token");
  const user = await prisma.usuario.findUnique({
    where: {
      token: token?.value
    },
    select: {
      rut: true
    }
  });

  if (!user || !user.rut) {
    return NextResponse.json({ error: 'Usuario no encontrado o sin RUT válido' }, { status: 400 });
  }

  const userDir = path.join(uploadBaseDir, user.rut);

  await ensureDir(userDir);

  const formData = await request.formData();
  const archivosEsperados = ['idInformeDoc', 'idInformePdf', 'idPresentacionPpt', 'idPresentacionPdf', 'ria', 'idAutorizacionPdf'];
  const paths = {};

  try {
    for (const nombreCampo of archivosEsperados) {
      const archivo = formData.get(nombreCampo);
      if (archivo && typeof archivo === 'object') {
        const buffer = Buffer.from(await archivo.arrayBuffer());
        let fileName = archivo.name;
        let fileExtension = path.extname(fileName);
        let baseName = path.basename(fileName, fileExtension);
        let counter = 1;
        let filePath = path.join(userDir, fileName);

       
        while (await fs.access(filePath).then(() => true).catch(() => false)) {
          fileName = `${baseName} (${counter})${fileExtension}`;
          filePath = path.join(userDir, fileName);
          counter++;
        }

        await fs.writeFile(filePath, buffer);
        paths[nombreCampo] = filePath;

      } else {
        paths[nombreCampo] = null;
      }
    }


    return NextResponse.json({ message: 'Archivos subidos correctamente', paths });
  } catch (error) {
    return NextResponse.json({ error: 'Error al guardar archivos' }, { status: 500 });
  }
}



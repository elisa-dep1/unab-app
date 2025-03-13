import { NextResponse } from 'next/server'; 
import path from 'path';
import { promises as fs } from 'fs';
import { cookies } from 'next/headers';
import prisma from '@/app/lib/prisma';

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

      if (archivo) {
        const buffer = Buffer.from(await archivo.arrayBuffer());
        const filePath = path.join(userDir, archivo.name);
        await fs.writeFile(filePath, buffer);
        paths[nombreCampo] = filePath;
      } else {
        paths[nombreCampo] = null;
      }
    }

    return NextResponse.json({ message: 'Archivos subidos correctamente', paths });
  } catch (error) {
    console.error('Error al guardar archivos:', error);
    return NextResponse.json({ error: 'Error al guardar archivos' }, { status: 500 });
  }
}

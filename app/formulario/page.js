import { PrismaClient } from "@prisma/client";
import FormComponent from "./components/Form";
import { preload } from "../utils/getUser";


export default async function FormPage() {

  const prisma = new PrismaClient();

  const user = await preload("/");


  const formData = await prisma.formularioProyectoEstudiante.findFirst({
    where: {
      idEstudiante: user?.rut || ""
    }
  })

  const nrc = await prisma.estudianteNRC.findFirst({
    where: {
      idAlumno: user?.rut || ""
    },
    include:{
      nrc: {
        include:{
          profesor: true
        }
      }
    
    }
  })


  return (
    <FormComponent formData={formData} user={user} nrc={nrc.idNRC} periodo={nrc.periodo} teacher={nrc.nrc.profesor} />

  );
}

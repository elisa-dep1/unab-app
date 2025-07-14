
import prisma from "../lib/prisma";
import { cookies } from "next/headers";
import Filters from "./components/StudentsPage";


export default async function PageFilters() {

  const token = (await cookies()).get("token")
  const user = await prisma.usuario.findUnique({
    where: {
      token: token?.value || ""
    },
  })
  if (!user) {
    redirect(path)
  }

  return (
    <>
      <Filters userType={user.tipoUsuario}/>
    </>
  );
}

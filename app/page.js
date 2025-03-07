
import { PrismaClient } from '@prisma/client';
import Login from './components/Login';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function LoginPage() {

  const prisma = new PrismaClient();
  const token = (await cookies()).get("token")
  const user = await prisma.usuario.findUnique({
    where: {
      token: token?.value || ""
    }

  })
  if (user) {
    redirect('/inicio')
  }
  
  return (
    <>
      <Login />
    </>

  );
}

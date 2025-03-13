
import Login from './components/Login';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from './lib/prisma';


export default async function LoginPage() {

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

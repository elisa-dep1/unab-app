
import { preload } from "../utils/getUser";
import InfoUser from "./components/infoUser";




export default async function InfoUserPage() {

  const user = await preload("/");

  return (
    <InfoUser user={user} />
  )
}

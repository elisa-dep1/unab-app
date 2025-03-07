import { preload } from "../utils/getUser";
import NuevoNrc from "./NuevoNrc";


export default async function NuevoNrcPage() {

  await preload("/");

  return (
    <NuevoNrc />

  );
}

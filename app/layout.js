import Nav from "./components/Nav";
import "./globals.css";
import { getUserName } from "./utils/getUser";

export const metadata = {
  title: "UNAB",
  description: "App de Universidad Andrés Bello",
};


export default async function RootLayout({ children }) {

  const user = await getUserName();
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/icono.png" />
      </head>
      <body>
        <Nav name={user?.nombre} periodo={user?.estudianteNRC[0]?.periodo} tipoUsuario={user?.tipoUsuario}/>
        <div className="sectionContainer">
          {children}
        </div>
        <footer>
          © 2025 Universidad Andrés Bello. Todos los derechos reservados.
        </footer>
      </body>
    </html>
  );
}

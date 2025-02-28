
import Nav from "./components/Nav";
import "./globals.css";

export const metadata = {
  title: "UNAB",
  description: "App de Universidad Andrés Bello",
};

export default function RootLayout({ children }) {

 

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/icono.png" />
      </head>
      <body>
        <Nav />
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

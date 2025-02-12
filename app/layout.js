
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
        <nav>
          <img src="/images/logo-unab.png" alt="Logo" width="15%" />
          <span> Proyecto de título </span>
        </nav>

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

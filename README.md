## Datos del proyecto
1. Para correr el proyecto, recomiendo clonar el proyecto desde Github, luego abrir el proyecto en **VSCODE**, abrir la terminal y ejecutar los comandos:
```bash
npm i
```
```bash
npm run dev
```
**Debes tener Node instalado en tu computador** 


2. **Este proyecto está creado en Next + React**, para la base de datos se utilizó **MYSQL** como gestor y la conexión a la BD desde la aplicación se realizó con **Prisma**.
Con la librería prisma se crea el `'prisma/schema.prisma'` donde ahí se definen las tablas de la base de datos y luego se hace la migración.
Para hacer la conexión debes irte a `example.env`, cambiar el **nombre del archivo** por **.env** y luego cambiar el URL que hace la conexión, ahí añades nombre de usuario, contraseña y nombre de la BD.
Además se utilizó la librería **Axios** para acceder a las API desde la vista de cliente, recomiendo seguir utilizándolo.

3. En esta aplicación se utiliza el método **App Router** para las rutas, donde cada carpeta que tenga un `page.js` es una ruta. Ejemplo: `'alumnos/page.js'` es una ruta, y se ve así: `'http://localhost:3000/alumnos'`.
Las rutas que existen en esta aplicación son: `'/'`,  `'/alumnos'`, `'/documentos'`, `'/fecha-presentacion'`, `'/formulario'`, `'/inicio'`, `'/nuevo-nrc'`, `'/perfil'`, `'/proyectos'`.
Dentro de la carpeta `app` también existe un archivo `page.js` que es la ruta inicial `'/'`, y hay un archivo `'/layout'` para poder añadir el nav y el footer en toda la aplicación.

4. Cada ruta tiene su propio **CSS**, pero también se definieron los `globals.css` para código global de la app.

5. Dentro de la carpeta `src\data` hay un **JSON** que tiene las opciones de algunos filtros que se usan dentro de la app, se hizo así por practicidad.

6. El archivo `'lib/prisma.js'` permite instanciar **prisma** desde cualquier parte de la aplicación y ahorrarse parte del código.

7. Tenemos dos archivos de apis que no están dentro de la carpeta `api`, están en `/utils`.
Explicación:
- **AuthApi** valida si el token almacenado en las cookies corresponde a un usuario registrado en la base de datos.
- **GetUser** valida el token del usuario desde las cookies y, si no existe un usuario asociado, redirige a la ruta especificada; en caso contrario, retorna los datos del usuario.
- **GetUserName** obtiene información básica del usuario autenticado, como su nombre, tipo de usuario y semestre, sin redirigir si el token no es válido.
- **Preload** ejecuta `getUser` de forma anticipada para precargar los datos del usuario antes del renderizado del componente.
8. Por último, algo importante que se debe cambiar en el proyecto son las rutas que aparecen en `/documents/students`, ya que aquí se define donde se almacenan los documentos subidos por los alumnos. Quedaron comentadas ambas líneas que se deben cambiar. 

# Registro de Cambios del Agente (AGENT-CHANGES.md)

Este archivo mantiene un registro histórico de todas las tareas y cambios realizados por los agentes en el proyecto.

## [2026-06-30] Sub-etapa 1.1: Inicialización de Estructuras y Scripts
- **Backend**: Inicialización de `package.json` con `"type": "module"`, instalación de Express, Sequelize, SQLite3, Jest, Supertest, bcryptjs, jsonwebtoken, y cors.
- **Frontend**: Inicialización de `package.json` con Vite 8, React 19, Tailwind CSS v4, y Vitest.
- **Base de Datos**: Creación de `database.js` para inicializar SQLite (en memoria para tests y en disco para dev).
- **Servidores**: Creación de `app.js` y `server.js` con configuración de puerto 5000 y exportaciones ESM (`import`/`export`).
- **Scripts**: Creación del script bash `run.sh` unificado para instalar dependencias e iniciar los servidores concurrentemente en un solo comando. Se corrigió el problema de formato CRLF/BOM en Windows.
- **Testing**: Creación de tests unitarios básicos (Sanity Checks) para backend (`app.test.js`) y frontend (`App.test.jsx`).

## [2026-06-30] Sub-etapa 1.2: Autenticación (Paso 4 - Backend)
- **Modelos**: Implementación del modelo `User.js` en Sequelize con username único y contraseñas. Uso del hook `beforeCreate` y `bcryptjs` para hashear las claves antes de guardar.
- **Middlewares**: Implementación de `authMiddleware.js` que extrae, desencripta y valida el JWT Bearer Token, inyectando el usuario a las peticiones (protección de rutas).
- **Rutas**: Implementación de `authRoutes.js` con los endpoints `POST /api/auth/register` (crea usuario y devuelve token) y `POST /api/auth/login` (valida usuario/clave y devuelve token).
- **Testing**: Creación de `auth.test.js` testeando exhaustivamente el ciclo de registro (exitoso y fallo por duplicado) y login (exitoso y fallo por mala contraseña). Todos superados con código 200/201/400/401.
## [2026-06-30] Sub-etapa 1.2: Autenticación (Paso 5 - Frontend)
- **Contexto (Estado Global)**: Creación de `AuthContext.jsx` para proveer el usuario activo y las funciones asincrónicas de login/registro a toda la app mediante el contexto de React (y persistiendo con `localStorage`).
- **Componentes Visuales**: 
  - `LoginForm.jsx`: Formulario con estilo premium (glassmorphism) y captura de errores desde la API.
  - `RegisterForm.jsx`: Incluye validación local de igualdad de contraseñas.
  - `AuthPage.jsx`: Contenedor principal que maneja fondos dinámicos y alterna entre los formularios de login y registro.
- **Enrutamiento Principal**: Modificación de `App.jsx` para mostrar la pantalla de autenticación si no hay un usuario activo, o un borrador del *Dashboard* protegido en caso contrario.
- **Testing**: Se reparó un test existente en `App.test.jsx` (agregando el wrapper de contexto) y se escribió `Auth.test.jsx` para simular con `React Testing Library` el renderizado y el cambio entre ventanas sin requerir red (mockeando `fetch`). Todos los tests pasaron exitosamente.

## [2026-06-30] Sub-etapa 1.3: Modelo de Notas y Dashboard (Backend y Frontend)
- **Backend (Modelos)**: Creación del modelo `Note.js` con `title`, `content` y `archived`. Se definió la relación `User.hasMany(Note)` y `Note.belongsTo(User)` en `models/index.js` para ligar notas a su creador.
- **Backend (Controlador y Rutas)**: Implementación de `noteController.js` para gestionar el CRUD de notas limitadas al usuario autenticado (`req.user.id`). Se agregaron las rutas en `noteRoutes.js`.
- **Backend (Testing)**: Desarrollo de `note.test.js` que simula creación, edición, borrado y listado con JWT validando la robustez de la API.
- **Frontend (Servicios)**: Implementación de `noteService.js` con la API nativa `fetch` inyectando el Authorization header automáticamente.
- **Frontend (Estado)**: Desarrollo del Custom Hook `useNotes.js` que maneja la sincronización, loading state, errores y operaciones de las notas.
- **Frontend (Componentes Visuales)**:
  - `NoteCard.jsx`: Diseño de tarjeta *Google Keep* con glassmorphism, iconos en hover y truncado inteligente de texto.
  - `NoteForm.jsx`: Componente genérico tipo modal para crear y editar.
- **Frontend (Dashboard)**: Refactorización de `Dashboard.jsx` para integrar el listado de notas en cuadrícula (CSS Grid) y pestañas nativas para filtrar locales entre activas y archivadas.

## [2026-06-30] Refactorización: Arquitectura Basada en Features
- **Backend (Estructura)**: Migración masiva de la arquitectura plana (`models/`, `controllers/`, `routes/`) hacia una arquitectura orientada a dominios (`features/auth/` y `features/notes/`).
- **Backend (Relaciones)**: Creación de `src/config/associations.js` para extraer la lógica relacional de Sequelize (`User.hasMany`, `Note.belongsTo`) y mantener los modelos 100% aislados.
- **Backend (Auth Controller)**: Extracción de la lógica de negocio de `authRoutes.js` hacia su propio `authController.js`, limpiando completamente el archivo de rutas.
- **Frontend (UI Shared)**: Refactorización del componente genérico `Button.jsx` añadiendo soporte para variantes `icon` y modificadores de tamaño (`size="md" | "icon"`).
- **Frontend (NoteCard y NoteForm)**: Limpieza visual. `NoteCard.jsx` ahora utiliza nuestro componente compartido `Button` para las acciones. `NoteForm.jsx` fue subdividido, moviendo toda la lógica y UI estática del modal hacia un nuevo componente reutilizable `shared/ui/Modal.jsx`.

## Modificaciones Estructurales / Arquitectónicas
- Actualización de `.gitignore` global y de backend. Se excluyeron dependencias, `.sqlite`, y a pedido del usuario, las carpetas de `__tests__/`.
- Inclusión de regla ASI en `MEMORY.md` para evitar el uso de puntos y comas (`;`) en JavaScript.
- Inclusión de regla en `AGENT.md` y `workers/*_SOUL.md` para obligar a los agentes a explicar los cambios de cada archivo de forma detallada al terminar cada plan.

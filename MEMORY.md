# MEMORIA SEMÁNTICA Y APRENDIZAJES DEL PROYECTO

Este archivo contiene el contexto a largo plazo, decisiones de arquitectura y aprendizajes acumulados del proyecto. Debe ser leído por todos los agentes al inicio de cualquier tarea para entender el estado del desarrollo y evitar repetir errores pasados.

## HECHOS VALIDADOS (FACTS)
*Definición: Datos inmutables, estables y confirmados acerca del entorno y stack del proyecto.*
- **Stack**: React 19, JavaScript / TypeScript, Vite 8, Tailwind CSS v4, shadcn/ui. Backend implementado con Node.js y Express. El proyecto permite e incentiva el uso de archivos `.js`/`.jsx` para mayor simplicidad.
- **Preferencia del Usuario**: Respuestas concisas, desarrollo incremental paso a paso, y código modular auto-documentado sin comentarios redundantes.
- **Estructura de Componentes**: Respetar estrictamente la estructura orientada a features en `workspace/src/`.

## DECISIONES ARQUITECTÓNICAS
*Definición: Decisiones técnicas y de diseño tomadas de mutuo acuerdo para estructurar el código y resolver problemas de forma consistente.*
- **[2026-06-23 18:00] Organización Modular**: Evitar archivos monolíticos. Separar componentes específicos dentro de `features/` y genéricos bajo `shared/ui/`.
- **[2026-06-23 18:00] Simplificación y Limpieza**: Priorizar la simplicidad y mantenibilidad sobre la velocidad. No usar comentarios que expliquen *qué* hace el código, el código debe ser auto-explicativo.
- **[2026-06-30 17:10] Control de Versiones**: En cualquier inicialización de proyectos o subcarpetas, es obligatorio revisar, configurar y documentar explícitamente los archivos `.gitignore` (global y por entorno) para evitar subir dependencias y archivos sensibles.
- **[2026-06-30 17:33] Estilo de Código (JS/TS)**: No utilizar puntos y comas (`;`) al final de las sentencias, aprovechando la inserción automática de punto y coma (ASI) de JavaScript para mantener el código más limpio.
- **[2026-06-30 17:36] Comunicación y Reporte**: Al finalizar cualquier plan o sub-etapa, los agentes deben proporcionar un desglose y explicación breve pero clara de lo que se hizo en cada archivo modificado para que el usuario pueda comprender la lógica y auditar el código.
- **[2026-06-30 19:40] Componentes Atómicos (UI)**: El frontend debe mantener sus componentes genéricos de presentación (ej. `VStack`, `HStack`, `Input`, `Button`) dentro de `shared/ui/` para que los componentes lógicos principales sean concisos y atómicos.
- **[2026-06-30 19:40] Estilo de Exportación (React)**: Los componentes funcionales deben declararse preferentemente usando la sintaxis `export default function ComponentName() {}` en lugar de funciones flecha asignadas a constantes (`const Component = () => {}`). Esto facilita la depuración en React DevTools y simplifica la posible envoltura con Higher-Order Components (HOCs) en el futuro.
- **[2026-06-30 21:23] Controladores Atómicos (Backend)**: Los controladores del backend se estructuran de forma totalmente atómica. En lugar de un archivo centralizado `noteController.js`, se deben utilizar archivos separados (`getNotes.js`, `createNote.js`) que exportan directamente la lógica con `export default function` para facilitar su lectura y testeo.
## APRENDIZAJES Y ERRORES EVITADOS
*Definición: Lecciones técnicas específicas de problemas de programación o configuración superados.*
- **[2026-06-23 19:35] [Dependencias / Testing]**: Evitar usar versiones antiguas de `lucide-react` (como `^1.21.0`) que carecen de iconos modernos como `Instagram` y provocan componentes `undefined` en tiempo de ejecución. Además, se prefiere utilizar rutas de importación relativas en subcomponentes internos para garantizar la compatibilidad con el entorno de pruebas de Vitest sin depender exclusivamente de alias de ruta globales.
- **[2026-06-30 19:55] [Frontend / Tailwind v4]**: Durante la inicialización del frontend con Vite, es obligatorio asegurar la correcta instalación y configuración de Tailwind CSS v4. Se debe instalar `tailwindcss` y `@tailwindcss/vite`, añadir el plugin a `vite.config.js` y reemplazar el contenido de `index.css` con `@import "tailwindcss";`. Nunca asumir que otra herramienta lo hizo automáticamente.

## GUÍA DE ACTUALIZACIÓN (Para Agentes)
Cuando un agente termine una tarea compleja, descubra una solución no obvia, o resuelva un error recurrente:
1. Añadir una nueva entrada en la sección de **APRENDIZAJES Y ERRORES EVITADOS** o **DECISIONES ARQUITECTÓNICAS** con la fecha y hora de la anotación en el formato: `- **[YYYY-MM-DD HH:MM] [Componente/Tecnología]**: Descripción clara del problema y la solución adoptada.`
2. Mantener este archivo conciso y ordenado de forma cronológica dentro de cada sección.



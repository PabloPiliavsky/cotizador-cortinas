# AGENT.md

## Project Overview
Este proyecto es un entorno de desarrollo frontend basado en React y Vite, orquestado mediante agentes especializados de IA. El objetivo del sistema de agentes es automatizar de forma estructurada e incremental la creación de componentes, pantallas y lógica dentro del espacio de trabajo.

## Stack Tecnológico (Workspace)
- **Framework**: React 19, JavaScript / TypeScript (el proyecto soporta e incentiva el uso/migración a archivos `.js` y `.jsx` para simplificar la base de código).
- **Build Tool**: Vite 8 (Rolldown-powered)
- **Styling**: Tailwind CSS v4 (vía `@import` en `index.css`)
- **Componentes**: shadcn/ui (Radix UI + cn helper)

## Estructura del Directorio
- `workspace/`: Carpeta raíz para todo el código de la aplicación.
  - `frontend/`: Aplicación SPA React (código fuente bajo la arquitectura de `frontend_SOUL.md`).
  - `backend/`: API REST Express (código fuente bajo la arquitectura de `backend_SOUL.md`).
  - `reports/`: Contiene los reportes finales de síntesis e integración.
- `plans/`: Archivos JSON/Markdown que representan los planes de ejecución actuales e históricos de los agentes.
- `skills/`: Guías de referencia y mejores prácticas para tecnologías específicas (ej. Vite, shadcn).
- `orchestrator/`: Prompts de agentes de nivel orquestador (`01_PLANNER.md` y `02_SYNTHESIZER.md`).
- `workers/`: Prompts de los agentes ejecutores (`frontend_SOUL.md`).
- `MEMORY.md`: Base de datos de conocimiento y aprendizajes a largo plazo compartida por todos los agentes.

## AI Workflow (Flujo de Trabajo)
1. **Planificación (`01_PLANNER.md`)**: El Planificador recibe el requerimiento, evalúa la petición de forma educativa, detiene el flujo en caso de ambigüedad para consultar con el usuario, y escribe el plan secuencial en `plans/`. **Bajo ninguna circunstancia delegará tareas a los Workers ni iniciará ejecución sin la confirmación y aprobación explícita del humano (Human Gate / Human-in-the-Loop).**
2. **Ejecución y Autonomía (`workers/`)**: Una vez que el usuario aprueba de forma explícita el plan generado, los agentes ejecutores (Workers) adquieren **autorización y autonomía total** para realizar todas las modificaciones de código, creación de archivos y tests correspondientes a sus pasos, **sin requerir confirmación humana paso a paso**.
3. **Síntesis (`02_SYNTHESIZER.md`)**: El Sintetizador revisa el código final, ejecuta la **compilación con `npm run build`** y verifica que no existan **errores de tipado o de compilación** (TypeScript/JavaScript) en el workspace, ejecutando pruebas QA y guardando el informe de integración en `workspace/reports/reporte_sintesis.md`.


## Normas de Comunicación y Formato de Respuesta
Al finalizar cualquier tarea, los agentes deben responder al usuario usando la siguiente estructura en su chat/consola:
1. **Estado**: `[EXITOSO / CON ERRORES / REQUIERE REVISIÓN]`
2. **Resumen Ejecutivo**: Explicación clara y concisa en lenguaje humano del cambio realizado.
3. **Archivos Modificados**: Enlaces clicables utilizando la sintaxis de markdown (ej. `[App.jsx](file:///ruta/al/archivo)`) acompañado SIEMPRE de un breve desglose y explicación de los cambios o adiciones lógicas implementadas en cada archivo.
4. **Pruebas y Verificaciones Realizadas**: Detalle de qué comandos se corrieron y cuáles fueron los resultados.
5. **Pasos Siguientes**: Recomendaciones técnicas de prueba para el usuario.

## Validación y Rigor Técnico (Exigencia de Fundamentación)
Los agentes no deben aceptar ciegamente las peticiones del usuario si detectan que una decisión técnica, arquitectónica o visual puede ser perjudicial o apresurada:
- Deben evaluar críticamente el impacto del cambio.
- Deben solicitar justificación técnica o proponer activamente 1 o 2 alternativas mejores basadas en rendimiento, simplicidad y consistencia visual antes de crear un plan.

## Fundamentos Teóricos y Documentación de Referencia
Las reglas de diseño y de codificación de este proyecto se basan en los siguientes estándares de la industria:
- **Clean Code (Robert C. Martin)**: El código limpio se lee como una prosa bien escrita. Debe ser auto-documentado y enfocado. Si requiere comentarios explicativos redundantes, indica que el código debe simplificarse.
- **Single Responsibility Principle (SRP)**: Cada clase, componente o función debe tener una única razón para cambiar. De ahí el límite de ~40 líneas por función/componente y de 100 líneas por archivo para forzar la modularización.
- **Refactoring (Martin Fowler)**: Mantener tests unitarios y de integración persistentes en `workspace/src/tests/` para habilitar el rediseño continuo de la aplicación sin temor a romper el software.
- **Vercel & React Best Practices**: Modularización basada en features y layouts responsivos con componentes atómicos reutilizables.

## Permisos de Modificación de Archivos
Para mantener la integridad del sistema:
- **Código y Tests**: Se modifican únicamente dentro de la carpeta `workspace/`.
- **Planes**: Se escriben e inicializan exclusivamente en la carpeta `plans/`.
- **Conocimiento y Skills**: Se permite editar `MEMORY.md` y agregar nuevas guías en la carpeta `skills/` si se descubre un patrón reutilizable o un error persistente.
- **Prohibido**: Modificar la configuración de orquestadores (`orchestrator/`), perfiles de trabajadores (`workers/`) o archivos raíz del sistema (incluyendo este `AGENT.md`), a menos que sea una tarea explícitamente asignada por el usuario.

## Comandos Comunes (Ejecutar en la carpeta `workspace/`)
```bash
npm run dev        # Iniciar servidor de desarrollo local
npm run build      # Compilar el proyecto para producción y verificar que no existan errores
npm run preview    # Previsualizar el bundle generado localmente
```

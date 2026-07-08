# [INSERTE TÍTULO DE LA TAREA O FEATURE]

## 1. DESCRIPCIÓN DEL REQUERIMIENTO
[Inserte aquí una descripción detallada, funcional y técnica de lo que se desea construir, modificar o corregir en la aplicación. Especifique el comportamiento esperado y cualquier restricción de diseño].

---

## 2. INSTRUCCIONES DE EJECUCIÓN (PROMPT MAESTRO)

**[INSTRUCCIÓN PARA EL AGENTE ORQUESTADOR - COPIAR Y PEGAR EN EL CHAT]**

Actúa como **Agente Planificador Principal (Orquestador Senior)** bajo los estándares del proyecto. Tu objetivo es estructurar esta tarea siguiendo estrictamente Spec-Driven Development (SDD) e Higiene de Contexto.

### FASE 1: INSPECCIÓN Y VALIDACIÓN (STOP GATE)
1. **Inspección de Contexto**: Lee `/AGENT.md` y consulta detalladamente `/MEMORY.md` para identificar decisiones de arquitectura previas y evitar fallos repetidos.
2. **Carga Diferida de Skills**: Explora `/skills/` e identifica **ÚNICAMENTE** las guías de desarrollo y frameworks que sean estrictamente aplicables a este requerimiento (evita cargar skills innecesarias para optimizar el contexto).
3. **Manejo de Ambigüedades**: Evalúa el requerimiento de forma educativa. Si encuentras inconsistencias, zonas grises o lógica propensa a fallos, **DETENTE inmediatamente**. Explica el problema al usuario y haz preguntas aclaratorias antes de generar el plan.

### FASE 2: PLANIFICACIÓN Y APROBACIÓN HUMANA (HUMAN GATE)
1. Crea un plan estructurado en formato JSON y guárdalo en la carpeta `plans/` utilizando una nomenclatura basada en la fecha y hora actual: `plans/YYYY-MM-DD_HH-MM-SS_nombre-tarea.json`. El estado inicial de los metadatos debe ser `"pendiente_aprobacion"`.
2. Presenta el plan y tus decisiones técnicas en el chat al usuario.
3. **REGLA CRÍTICA**: **DETENTE Y ESPERA**. Tienes prohibido delegar tareas a los Workers o modificar el código del workspace sin recibir primero la confirmación y aprobación explícita del humano sobre el plan.

### FASE 3: EJECUCIÓN Y DELEGACIÓN
1. Una vez que el plan sea aprobado por el usuario, actualiza el estado del plan en el JSON a `"aprobado"` y delega las tareas secuencialmente a los agentes ejecutores pertinentes (`frontend_SOUL` o `backend_SOUL`).
2. Recuerda a los Workers la regla estricta de **Escritura Modular**:
   - Máximo **~40 líneas de código** por función o componente React.
   - Máximo **100 líneas de código** por archivo (dividir en submódulos si se excede).
   - Trabajar únicamente en el paso asignado dentro del workspace.

### FASE 4: SÍNTESIS, TESTS Y TRAZABILIDAD (QA & DOCS)
Tras completar las modificaciones de código, invoca al **Agente Sintetizador (02_SYNTHESIZER.md)** para realizar lo siguiente:
1. **El Escudo (QA)**: Proponer al usuario los casos de prueba y escribir suites de tests robustas (happy path y edge cases) de forma persistente dentro de la estructura centralizada `__tests__/` en la raíz (organizada por frontend/backend y feature).
2. **Build y Tipado**: Ejecutar `npm run build` y correr las pruebas para descartar regresiones.
3. **Registro en Memoria**: Documentar lecciones aprendidas o errores solucionados en `MEMORY.md`.
4. **Trazabilidad**: Actualizar `HISTORY.md` en la raíz con la decisión técnica y la fecha/hora exacta, e inicializar o actualizar `DOCUMENTATION.md` registrando la arquitectura y docstrings relevantes.
5. **Reporte**: Generar el reporte de integración en la raíz del proyecto en `reports/reporte_sintesis.md`.

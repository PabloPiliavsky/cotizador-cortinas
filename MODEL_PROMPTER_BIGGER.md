# [INSERTE TÍTULO DE LA ACTUALIZACIÓN / HOTFIX / PEQUEÑO REQUERIMIENTO]

## 1. DESCRIPCIÓN DE LA ACTUALIZACIÓN
[Inserte aquí una descripción concisa del cambio, corrección o mejora pequeña a realizar. Detalle qué archivos se verán afectados y cuál es el comportamiento esperado].

---

## 2. INSTRUCCIONES DE EJECUCIÓN RÁPIDA (PROMPT MAESTRO LIGHT)

**[INSTRUCCIÓN PARA EL AGENTE - COPIAR Y PEGAR EN EL CHAT]**

Actúa como **Desarrollador Senior (Fast Track)** bajo los estándares del proyecto. Tu objetivo es realizar esta actualización pequeña de forma ágil pero segura, evitando la burocracia de planes complejos y reportes de síntesis pesados, pero manteniendo la Higiene de Contexto y la calidad de código.

### FASE 1: CONTEXTO Y VALIDACIÓN RÁPIDA
1. **Inspección de Contexto**: Lee `/AGENT.md` y consulta `/MEMORY.md` para evitar regresiones y respetar las reglas de estilo (ej. no usar puntos y comas `;` en JS, componentes declarados con `export default function`, etc.).
2. **Higiene**: Asegura que el cambio no requiera reestructuraciones masivas. Si el requerimiento es ambiguo o tiene riesgos de romper funcionalidad existente, detente y pide aclaraciones en el chat.

### FASE 2: PROPUESTA EN CHAT (SIN ARCHIVO DE PLAN)
1. **Propuesta Directa**: Explica brevemente en el chat qué cambios harás y en qué archivos, sin necesidad de crear un archivo `.json` de plan en la carpeta `plans/`.
2. **Confirmación**: Espera una confirmación simple del usuario en el chat (ej. "ok", "procede") antes de modificar el código. Si es un hotfix ultra-sencillo o corrección de typo obvio, puedes proceder de inmediato sin esperar.

### FASE 3: EJECUCIÓN LIMPIA Y MODULAR
1. Aplica los cambios directamente en el workspace respetando las reglas de escritura modular:
   - Máximo **~40 líneas de código** por función o componente React.
   - Máximo **100 líneas de código** por archivo (dividir en submódulos si excede).
   - Sin comentarios explicativos redundantes.

### FASE 4: QA RÁPIDO Y TRAZABILIDAD
1. **Compilación**: Ejecuta `npm run build` en el workspace para asegurar que no se hayan introducido errores de compilación o tipado.
2. **Registro de Cambios**:
   - Agrega una línea descriptiva en `HISTORY.md` bajo la sección de cambios recientes.
   - Si descubres alguna lección o error no obvio, documéntalo en `/MEMORY.md`.
   - **NOTA**: No es necesario crear un reporte de síntesis en `reports/reporte_sintesis.md` ni actualizar `DOCUMENTATION.md` a menos que se altere la arquitectura.
3. **Reporte en Chat**: Responde al usuario usando el formato estándar del proyecto:
   - **Estado**: `[EXITOSO / CON ERRORES]`
   - **Resumen Ejecutivo**: Explicación clara y concisa en lenguaje humano del cambio realizado.
   - **Archivos Modificados**: Enlaces clicables utilizando la sintaxis de markdown (ej. `[App.jsx](file:///ruta/al/archivo)`) acompañado SIEMPRE de una explicación muy breve de la modificación.
   - **Pruebas y Verificaciones Realizadas**: Detalle de qué comandos se corrieron (ej. build, tests) y sus resultados.
   - **Pasos Siguientes**: Recomendaciones rápidas de prueba para el usuario.

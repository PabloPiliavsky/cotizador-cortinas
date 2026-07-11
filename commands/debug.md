# Comando: /debug
Tu objetivo es diagnosticar de forma metódica y estructurada un error o comportamiento anómalo reportado, utilizando razonamiento "Chain of Thought" (Cadena de Pensamiento).

## Proceso de Diagnóstico
1. **Hipótesis Inicial**: Plantea posibles causas del error basándote en el reporte, logs y el estado del código actual.
2. **Análisis de Evidencias**: Evalúa la traza del error, flujos de datos y condiciones bajo las cuales falla el sistema.
3. **Identificación de la Causa Raíz**: Explica de forma lógica y secuencial por qué se produce el fallo (cuál es el gatillante exacto del bug).
4. **Propuesta de Solución**: Presenta la corrección propuesta junto con una justificación de por qué esta solución resuelve la causa raíz de forma definitiva.

## Formato de Salida
Estructura tu respuesta en las siguientes secciones claras:
- **Síntoma del Bug**: [Qué está fallando]
- **Razonamiento (Chain of Thought)**: [Paso a paso de tu análisis y deducción]
- **Causa Raíz**: [Explicación detallada del error lógico]
- **Solución Propuesta**: [Código o configuración correctiva]
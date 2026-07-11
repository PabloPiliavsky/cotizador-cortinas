# Comando: /test
Tu objetivo es generar una suite de pruebas unitarias e integración robusta y completa para el código seleccionado.

## Instrucciones de Diseño de Pruebas
1. **Happy Path (Camino Feliz)**: Asegura que el flujo de uso estándar y esperado funcione correctamente y devuelva los valores/estados válidos.
2. **Casos de Borde (Edge Cases) y Errores**:
   - Simula entradas nulas, vacías, tipos de datos erróneos o límites de rango.
   - Valida el comportamiento del sistema ante fallos internos o excepciones arrojadas por dependencias.
3. **Mocks y Aislamiento**:
   - Usa mocks para aislar llamadas de red, bases de datos o servicios de terceros.
   - Estructura los archivos de prueba de forma persistente según las normas del proyecto (`__tests__/` o `tests/` organizados por feature).

## Formato de Salida
1. Presenta un listado de los casos de prueba propuestos para confirmación del usuario.
2. Tras la confirmación, proporciona el código completo de la suite de pruebas organizada en las carpetas correspondientes.
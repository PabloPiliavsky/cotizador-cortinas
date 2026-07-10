# HISTORIAL DE CAMBIOS Y DECISIONES TÉCNICAS (HISTORY.md)

## [2026-07-10 10:30] Creación e Integración de Cotizador de Persianas Premium

### Decisiones de Arquitectura
- **React 19 + Vite 8 + Tailwind CSS v4 + shadcn/ui**: Se inicializó una SPA frontend limpia y optimizada.
- **Importación de Datos Maestros desde Catálogo Real**: Se procesó el archivo de precios reales de Metalconf (`Precios COR Metalconf 19.04.2024.pdf`), implementando códigos (`COR050`, `COR030`, `COR026`, etc.) y precios en USD de fábrica.
- **Modelado de Guías y Vuelos Dinámicos**: Los modelos de guías y cajones de persiana (vuelo) se parametrizaron dentro del CRUD con sus propios anchos de perfil e incrementos de altura para permitir que las fórmulas de cotización sean completamente configurables y adaptables.
- **Desglose de Costos e Impresión en PDF**: Se implementó la generación de PDFs mediante `jsPDF` con un diseño corporativo limpio de color pizarra para el envío formal de cotizaciones a clientes.
- **Visualizador SVG Interactivo**: Creación de un sistema de previsualización 2D que renderiza dinámicamente el cajón, guías y persiana con control deslizante de porcentaje de apertura (0-100%).
- **Persistencia en LocalStorage**: Toda la base de datos maestra (CRUD) y el historial de cotizaciones se guardan de forma persistente en el navegador del usuario.

# Presentación Comercial: Cotizador de Cortinas y Persianas

Esta aplicación interactiva está diseñada para simplificar y transparentar el proceso de cotización y simulación de cortinas y persianas enrollables de seguridad y estándar.

## Funcionalidades Clave

1. **Cotizador en Tiempo Real**:
   - Ingresas el tamaño de tu ventana (Ancho y Alto iniciales) y seleccionas el modelo de persiana deseada.
   - El sistema calcula instantáneamente el material y costo del presupuesto.

2. **Simulador Visual 2D**:
   - Una ventana interactiva te muestra cómo quedará la persiana instalada en base a las opciones que elijas (cajón compacto, guías, tipo de eje).
   - Puedes arrastrar un control para ver cómo se enrolla, abre y cierra la persiana en vivo.

3. **Compatibilidad Inteligente**:
   - Según el motor que elijas (manual, eléctrico Somfy o inteligente), el sistema te sugerirá únicamente los accesorios compatibles (mandos a distancia, sensores, cojinetes, etc.).

4. **Exportar Presupuesto a PDF**:
   - Permite guardar y descargar una cotización formal y desglosada en PDF que incluye un plano o esquema de la persiana configurada lista para enviar al cliente.

---

## ¿Cómo se Calculan las Medidas y Costos? (Explicación Sencilla)

El cotizador adapta las dimensiones de tu ventana para calcular el tamaño real de fabricación del producto:

* **Ancho de Fabricación**:
  - Si tu persiana lleva **Guías Laterales** (los carriles por donde baja la cortina), sumamos el ancho de estas guías al ancho de tu ventana. 
  - *Fórmula*: `Ancho Final = Ancho Ventana + Ancho de Guía Izquierda + Ancho de Guía Derecha`.

* **Alto de Fabricación**:
  - Si tu persiana lleva **Vuelo (Cajón Compacto)** (la caja superior donde se guarda enrollada la persiana), sumamos el alto de esta caja a la altura de tu ventana.
  - *Fórmula*: `Alto Final = Alto Ventana + Altura del Cajón`.

* **Cantidad de Tablillas (Lamas)**:
  - Dividimos la altura de fabricación por la altura útil que tiene cada tablilla del modelo seleccionado.
  - *Fórmula*: `Cantidad de Lamas = Alto Final / Altura de una Lama`.

* **Desglose de Costo Final**:
  El precio que ves es la suma detallada de:
  - El costo de las lamas necesarias (multiplicado por el ancho final).
  - El costo de las guías laterales (multiplicado por la altura).
  - El precio fijo del eje/tubo seleccionado.
  - El precio fijo del motor seleccionado (manual, eléctrico o Somfy).
  - El costo individual de cada cojinete, pasacadena o control remoto que decidas agregar.

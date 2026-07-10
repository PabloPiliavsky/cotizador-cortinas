# DOCUMENTACIÓN TÉCNICA (DOCUMENTATION.md)

Este documento detalla la arquitectura de software, fórmulas matemáticas y la estructura de componentes de la aplicación de Cotización de Ventanas y Persianas.

## Fórmulas de Cálculo en Tiempo Real

Las dimensiones finales y costos de los componentes se determinan según las siguientes ecuaciones:

1. **Ancho Final (\(W_f\))**:
   \[W_f = W_i + (W_g \cdot 2)\]
   *Donde \(W_i\) es el ancho inicial introducido y \(W_g\) es el ancho de perfil de la guía seleccionada (por ejemplo, 0.05m).*

2. **Alto Final (\(H_f\))**:
   \[H_f = H_i + H_c\]
   *Donde \(H_i\) es el alto inicial y \(H_c\) es la altura del cajón superior o vuelo seleccionado.*

3. **Cantidad de Lamas (\(N_l\))**:
   \[N_l = \lceil \frac{H_f}{H_u} \rceil\]
   *Donde \(H_u\) es la altura útil de la lama/tablilla seleccionada.*

4. **Largo de Guías (\(L_g\))**:
   \[L_g = H_f \cdot 2\]

5. **Costo de Lamas (\(C_l\))**:
   \[C_l = N_l \cdot W_f \cdot P_l\]
   *Donde \(P_l\) es el precio de la lama por metro lineal.*

6. **Costo de Guías (\(C_g\))**:
   \[C_g = L_g \cdot P_g\]
   *Donde \(P_g\) es el precio de la guía por metro lineal.*

7. **Costo Total (\(T\))**:
   \[T = C_l + C_g + P_e + P_m + \sum P_a\]
   *Donde \(P_e\) es el precio base del eje, \(P_m\) el del motor y \(\sum P_a\) la suma de los precios de los accesorios seleccionados.*

## Estructura de Componentes

La aplicación sigue una arquitectura modular en React 19:

- `src/shared/providers/BudgetContext.jsx`: Administra el estado global de datos maestros (Lamas, Guías, Ejes, Cajones, Motores, Accesorios) y el historial de presupuestos con sincronización a `localStorage`.
- `src/features/estimator/hooks/useShutterCalculations.js`: Hook personalizado que encapsula todas las fórmulas de dimensiones y desglose de costos.
- `src/features/estimator/components/ShutterVisualizer.jsx`: Renderizador dinámico SVG 2D de la persiana con barra interactiva de control de apertura. Reordena las capas (lamas al fondo, eje al frente) y redibuja detalles como cojinetes, cadenas de control y accesorios dinámicamente.
- `src/features/estimator/components/EstimatorInputs.jsx`: Administra dimensiones básicas, selección de lama, selección de eje y el checkbox de guías reubicado.
- `src/features/estimator/components/EstimatorOptions.jsx`: Opciones de vuelos, motores y accesorios filtrados y deshabilitados condicionalmente.
- `src/shared/utils/pdfGenerator.js`: Utilidad que genera PDF del presupuesto y dibuja vectorialmente la persiana elegida con las lamas bajas (cerrada) a escala.
- `src/features/admin/components/`: Sub-componentes CRUD atómicos para la gestión individual de catálogos.

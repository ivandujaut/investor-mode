# Scope · Modo Inversor

> Qué entra en v1, qué es v2 y qué es futuro. Plan de 4 fases / 8 semanas.
> Última actualización: 2026-06-24.

## El proyecto en una línea

Extensión conceptual de [Roomix](https://roomix.ai/): un módulo que evalúa una propiedad como **inversión** (cap rate, ROI proyectado en 3 escenarios, comparación con el barrio). Pieza de portfolio; el alcance es **diseño + motor de cálculo**, no un producto en producción.

## Plan · 4 fases / 8 semanas


| Fase                      | Semanas | Foco        | Entregables                                                                                                 |
| ------------------------- | ------- | ----------- | ----------------------------------------------------------------------------------------------------------- |
| **1 · Fundamentos**       | 1-2     | Research    | Auditoría de Roomix · dominio financiero (sección 1-3 + contrato sección 3.3) · validación con corredor · dataset semilla |
| **2 · Diseño**            | 3-4     | Experiencia | Design system · reestructura de IA del análisis · prototipo interactivo en Figma · sistema de copy          |
| **3 · Motor**             | 5-6     | Código      | Motor de cálculo TS/TDD (contrato sección 3.3) · golden tests del dominio                                          |
| **4 · Producto y cierre** | 7-8     | Integración | Case study · polish visual · (UI + v2 → futuro)                                                             |


## Estado actual (2026-06-24)

- **Fase 1 · Fundamentos** ✅: auditoría + dominio (sección 1-3, contrato sección 3.3) completos. *Pendiente:* validación con corredor (refuerzo, no bloqueante).
- **Fase 2 · Diseño** ✅: design system, IA del análisis, prototipo interactivo y copy completos.
- **Fase 3 · Motor** ✅: motor v1 completo (`src/engine/`), 20 tests verdes, typecheck limpio.

## Qué ENTRA en v1 (el alcance de esta pieza)

- **Diseño:** reencuadre de "calculadora" a "herramienta de decisión", scorecard + disclosure progresivo, sistema de copy (conclusión-líder + orientar la decisión), segmentación de inversor (renta vs. apreciación · contado vs. apalancado), lenguaje de gráficas restringido.
- **Motor (año 1):** cap rate bruto/neto (hoy y proyectado), NOI, proyección del alquiler en USD (ICL vs. devaluación), 3 escenarios macro (defaults sección 2.5), cuota francesa, ROI contado y apalancado, leverage ratio, comparación con la mediana del barrio.
- **Case study:** la documentación del trayecto (decisiones, criterio, qué funciona/qué no).

## Qué NO entra en v1 → v2

- **Proyección a 10 años** (equity en el tiempo / fan chart de valor): hoy el motor es a 1 año.
- **TIR y VAN**: requieren flujo período-a-período; no tienen fórmula cerrada (×2-3 la complejidad).
- **UVA denominado en UVAs**: v1 lo simplifica a USD @ 8% TNA fija; v2 separa inflación de devaluación.
- **Distribución del barrio / percentil**: v1 recibe solo la mediana como input.
- **Mobile**: el prototipo es desktop-first.
- **Multi-propiedad**: comparar y guardar; hoy el journey muere en una propiedad.
- **Accesibilidad AA completa**: pendiente el contraste del CTA "Contactar".

## Futuro / producto (fuera del scope de portfolio)

- **UI en Next.js** conectada al motor (`analyzeProperty` alimentando scorecard / escenarios / financiación).
- **Dataset semilla en Supabase**: comparables reales del barrio que alimenten la distribución/percentil.

## Validación pendiente (refuerzo, no bloqueante)

- **Conversación con corredor matriculado** (`domain.md sección 4`): pressure-test del modelo con un experto del dominio. Sube la credibilidad; hoy los supuestos macro son triangulados de fuentes públicas, no medición directa. No gatea el "done" de la pieza.


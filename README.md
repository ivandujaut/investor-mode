# Investor Mode

Propuesta de extensión para [Roomix](https://roomix.ai/): módulo de 
evaluación de propiedades como inversión inmobiliaria. Cap rate, ROI 
proyectado en escenarios Conservador / Moderado / Agresivo, comparación 
con la mediana del barrio.

Caso de estudio personal · proyecto en desarrollo

---

## ¿Por qué este proyecto?

Roomix hoy responde "¿se puede vivir acá?" pero no "¿conviene comprar 
acá?".

Este proyecto construye una propuesta funcional del módulo, end-to-end, 
con motor de cálculo financiero defendible y vistas para los dos lados 
del marketplace (buscador + corredor).

## Estado actual

Plan completo en [`docs/scope.md`](docs/scope.md). Resumen:

- **Fase 1 · Fundamentos** ✅: auditoría + dominio financiero (sección 1-3, contrato del motor sección 3.3). _Pendiente:_ validación con corredor (refuerzo, no bloqueante).
- **Fase 2 · Diseño** ✅: design system, reestructura de IA del análisis, prototipo interactivo en Figma, sistema de copy.
- **Fase 3 · Motor** ✅: motor de cálculo en `src/engine/` (TypeScript estricto + Vitest, TDD). 20 tests verdes, typecheck limpio.

_UI en Next.js y dataset en Supabase quedan como futuro/producto, fuera del scope de esta pieza._

## Documentación

- [`docs/scope.md`](docs/scope.md): qué entra y qué no en v1, plan de 4 fases / 8 semanas
- [`docs/domain.md`](docs/domain.md): finanzas inmobiliarias aplicadas al mercado argentino + contrato del motor (sección 3.3)
- [`docs/design.md`](docs/design.md): decisiones de diseño, sistema de copy, benchmark competitivo
- [`docs/case-study.md`](docs/case-study.md): el caso de estudio (Cap. 1 diseño · Cap. 2 motor)

## Stack

- Frontend: Next.js 15 (App Router) · TypeScript estricto · Tailwind
- Backend: Server Components + Server Actions · Supabase (Postgres + Auth)
- Testing: Vitest (TDD en el motor de cálculo)
- Hosting: Vercel
- Diseño: Figma con design system mínimo derivado de la identidad visual de Roomix

## Cómo correr

El motor de cálculo ya es ejecutable:

```bash
npm install
npm test          # 20 tests (Vitest)
npm run typecheck # TypeScript estricto
```

La UI todavía no existe (futuro/producto).

---

## Sobre el autor

Iván Dujaut · Product Engineer · [LinkedIn](https://www.linkedin.com/in/ivan-dujaut/) · dujautivan@gmail.com

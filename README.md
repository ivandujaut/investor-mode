# Investor Mode

Propuesta de extensión para [Roomix](https://roomix.ai/): módulo de 
evaluación de propiedades como inversión inmobiliaria. Cap rate, ROI 
proyectado en escenarios Conservador / Moderado / Agresivo, comparación 
con la mediana del barrio.

Caso de estudio personal · proyecto en desarrollo · no afiliado a 
Roomix S.A.

---

## ¿Por qué este proyecto?

Roomix hoy responde "¿se puede vivir acá?" pero no "¿conviene comprar 
acá?". Tres de 26 encuestados de la propia investigación de mercado de 
Roomix pidieron explícitamente herramientas para inversores. El "Modo 
Inversor" figura en su roadmap interno (matriz Q2, GP-03) y en su OKR 
de mercado para 2026, pero no está priorizado en los próximos sprints.

Este proyecto construye una propuesta funcional del módulo, end-to-end, 
con motor de cálculo financiero defendible y vistas para los dos lados 
del marketplace (buscador + corredor).

## Estado actual

**Fase 1 / 4** — Fundamentos (semanas 1-2)
- [x] Auditoría de Roomix (H1, H5)
- [x] Dominio financiero · sección 1 (conceptos básicos)
- [x] Dominio financiero · sección 2 (contexto argentino)  
- [ ] Dominio financiero · sección 3 (escenarios formalizados)
- [ ] Validación con corredor matriculado
- [ ] Dataset semilla en Supabase
- [ ] Mockup en Figma

## Documentación

- [`docs/scope.md`](docs/scope.md) — qué entra y qué no en v1, plan de 8 semanas
- [`docs/domain.md`](docs/domain.md) — finanzas inmobiliarias aplicadas al mercado argentino
- [`docs/audit-roomix.md`](docs/audit-roomix.md) — auditoría heurística del producto actual

## Stack

- Frontend: Next.js 15 (App Router) · TypeScript estricto · Tailwind
- Backend: Server Components + Server Actions · Supabase (Postgres + Auth)
- Testing: Mocha + Chai (TDD en el motor de cálculo)
- Hosting: Vercel
- Diseño: Figma con design system mínimo derivado de la identidad visual de Roomix

## Cómo correr

Sin código ejecutable todavía. Instrucciones a publicar al cierre de Fase 2 (semana 4).

---

## Sobre el autor

Iván Dujaut · Product Engineer · [LinkedIn](https://www.linkedin.com/in/ivan-dujaut/) · dujautivan@gmail.com

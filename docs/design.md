# Diseño · Roomix (Página de propiedad + Modo Inversor)

> Spec de diseño del módulo Investor Mode y del **design system** que lo sostiene.
> Modo principal: **dark**, con light funcionando vía tokens.
> Actualizado tras construir el sistema completo en Figma (jun 2026).

## Fuente de verdad

- **Archivo Figma principal:** *"Roomix · Página de
  propiedad + Modo Inversor"*. Contiene el producto **y** el design
  system completo (pages 🎨 Foundations + 🧩 Components).
- **Mockup original (histórico):** primera exploración del
  panel inversor (estados OFF/ON), superada por el layout actual.
- **Datos:** Casos A/D/E de [`domain.md`](domain.md): Depto Belgrano, USD 180.000.
- **Modo:** dark principal; el toggle **Dark↔Light funciona en toda la pantalla**
  (todo bindeado a tokens del Theme).

---

## Producto: la página de propiedad

El Modo Inversor dejó de ser una pantalla aparte: vive como un **bloque dentro de la
página de propiedad**, estilo Airbnb (2 columnas).

- **Columna izquierda:** galería (1+4), precio, características, descripción, comodidades.
- **Rail derecho (sticky):** *Hub card* con **Contactar** (CTA primario), el **Bloque
  Modo Inversor**, y la fila de inmobiliaria.

### Reencuadre de UX del Modo Inversor (decisión central)

El flujo original (estado ON con 3 escenarios en paralelo, 9 números, "decidí vos") se
sentía mal. Diagnóstico raíz: **construía una calculadora para un usuario que vino a
tomar una decisión y no sabe interpretar los números.**

Reencuadre aplicado:

- **Liderar con UNA respuesta interpretada:** el cap rate neto (2,98%) + qué significa
  en castellano: *"para Belgrano es bajo: zona de apreciación, no de renta"*.
- **Capas avanzadas opt-in:** los 3 escenarios y el crédito son colapsables, no el default.
- **Comparación neutra, no alarma:** "vs mediana del barrio" es **contexto**, no un
  alerta. → *El token warning/amber que se había propuesto quedó descartado:* la
  comparación no es un error a señalar.
- **Cerrar en acción:** "Ver análisis completo" → flujo profundo.
- **Interpretar ≠ recomendar:** explicar qué significa el número no es decir "comprá".

Esto está codificado en los **do's & don'ts del Bloque Modo Inversor** dentro del design
system, así que el *por qué* del diseño queda documentado junto al *qué*.

### Sistema de copy: conclusión-líder + orientación de la decisión

> Evolución del principio tras testear el flujo: *"datos, no recomendaciones"* llevado al
> extremo produce **parálisis**: un muro de números deja al usuario sin saber si invertir.
> El usuario no-analista necesita dirección, no solo datos.

Tres reglas de copy aplicadas a todo el deck del análisis:

1. **Lidera la conclusión, no el dato.** Cada bloque abre con *qué significa para tu
   decisión*; el número pasa a ser la evidencia debajo. Ej.: el subtítulo de Escenarios dejó
   de ser "mismo inmueble, distintos supuestos macro" y pasó a *"aun en el mejor escenario
   rinde por debajo del barrio: es apreciación, no flujo"*.
2. **Orientá la decisión sin dictarla.** En vez de "comprá/no compres", se nombra *para quién
   tiene sentido*: el usuario se auto-selecciona. Esto evoluciona "interpretar ≠ recomendar":
   sigue sin decir "comprá", pero ya no abandona al usuario en un mar de cifras.
3. **Un número por idea.** Si un bloque tira 5 cifras, el mensaje se diluye.

**Cierre del deck: bloque "En resumen · para tu decisión"** (card final antes de la acción):
una conclusión de una línea (*"Belgrano se compra por apreciación, no por renta"*) + dos
señales que orientan sin alarmar: ✓ verde *"te conviene si…"* / ✕ gris neutro *"no te
conviene si…"*. El ✕ es **gris, no rojo**: orienta, no condena. La acción "Ver propiedades
que rinden más" responde directo al "no te conviene si querés flujo mensual".

**Voz:** cercano + profesional, trato "vos", sin jerga (donde aparece cap rate / apalancamiento,
una bajada corta al lado). Audiencia: sabe lo básico; se interpreta lo clave inline, sin glosario.

---

## Benchmark competitivo

> Análisis de diseño/posicionamiento del Modo Inversor vs. productos del rubro (jun 2026).
> Basado en conocimiento de mercado, no en navegación directa; validar datos puntuales con corredor (sección 4).

### El mapa: con quién se compara

| Categoría | Productos | Qué son |
|---|---|---|
| **Analytics de inversión** | Mashvisor, Roofstock, Stessa | Dashboards con cap rate, cash flow, ROI, datos de barrio. El más cercano en *funcionalidad*. |
| **Calculadoras de inversor** | DealCheck, BiggerPockets calc | Forms densos: 20 inputs → reporte. Power-user. |
| **Portales consumer** | Zillow/Redfin (US), Zonaprop/Properati (local) | Listings + features livianas (Rent Zestimate, calc hipoteca, índice de rentabilidad). |
| **Fintech / robo-advisors** | Cocos, Ualá, Betterment | No son inmobiliarios, pero son la referencia de UX para sliders + interpretación + escenarios. |

### Head-to-head de diseño

| Dimensión | Mashvisor / DealCheck | Zillow / Zonaprop | **Modo Inversor** |
|---|---|---|---|
| **Lidera con…** | Grilla de números / form | Listing + calc básica | **Una respuesta interpretada** |
| **Profundidad** | Todo de una (overwhelming) | Superficial | **Opt-in colapsado** |
| **Inputs** | Muchos, sin validación | Pre-llenados, fijos | Editables **+ aviso de desvío vs mediana** |
| **Incertidumbre** | Un número / proyección lineal | Un número | **3 escenarios** (rango honesto) |
| **Apalancamiento** | Sí, como upside | No | Sí, **framing de riesgo bidireccional** |
| **Contexto local (UVA, bimonetarismo)** | No | Índice agregado, no por propiedad | **Modelado** (ICL, deval, cuota UVA) |
| **Dónde vive** | App/sitio aparte | Embebido pero shallow | **Embebido en la ficha**, como capa |
| **Postura** | Calculadora | Portal | **"Datos, no veredictos"** |

### Diferenciadores (el foso)

1. **El aviso de desvío del input es genuinamente raro.** Mashvisor/DealCheck dejan meter un
   alquiler fantasioso y calculan un ROI hermoso sin chistar. Validar el supuesto contra la
   mediana de la zona *antes* de aceptarlo (el ámbar "+21% optimista") casi nadie lo hace. Lo
   más cercano es el *Rent Zestimate* de Zillow, pero es un pre-llenado, no un "tu estimación
   está X% por encima, ojo". **Es lo más fuerte del producto.**
2. **Interpretación sobre datos crudos.** El rubro está partido entre "calculadora para expertos"
   y "portal para nadie en particular". El Modo Inversor ocupa el medio vacío: interpreta para un
   inversor que no es analista. Postura más de robo-advisor que de proptech, deliberada.
3. **Contexto argentino modelado por propiedad.** Ningún internacional toca UVA/bimonetarismo;
   los locales lo tienen agregado, no interactivo por ficha. Hueco real de mercado.
4. **Honestidad del apalancamiento.** Casi todos venden el crédito como puro multiplicador.
   Mostrar los dos lados es una postura de confianza diferenciadora.

### Dónde todavía pierde

1. **Profundidad de datos.** Competidores corren sobre datasets reales (comparables, históricos,
   **distribución del barrio**). Acá la mediana es un número; `domain.md` ya marca que v2 necesita
   el percentil ("rendís menos que 7 de cada 10"). La brecha más grande.
2. **Amplitud de métricas.** Sin TIR/VAN (diferidas), sin multi-año, sin impuestos.
3. **Sin comparar/guardar propiedades.** El journey muere en una ficha; el inversor real compara 5.
4. **Mobile sin construir**: los competidores son mobile-first.

### Lectura estratégica

No compite por *cantidad de datos* (ahí pierde); compite por **interpretación, honestidad y fit
local**. Su posición de diseño correcta es *"el primer análisis que entendés"*, no *"el más
completo"*. Eso lo separa de Mashvisor (potente pero abrumador) y de Zonaprop (local pero tonto).

- **Proteger y profundizar:** el aviso de desvío → llevarlo a percentil/distribución (v2 dominio);
  y la interpretación (moat de UX, nadie lo hace bien).
- **Cerrar para no quedar atrás:** comparar propiedades (sacar el journey del callejón de una sola
  ficha) y mobile.

---

## Design system

### Tokens (Figma Variables)

Ya **no están hardcodeados**: son 2 colecciones de variables.

**`Roomix · Core`** (un valor): paleta `color/roomix/50–600` + `pink`,
`color/semantic/success(+hover)` · `danger-dark/light`, `overlay/scrim·fg`, `space/*`
(base 4: 2·4·6·8·12·16·20·24·32·40·48·64·80·128), `radius/*` (micro 4 · card 10 · cta 14
· header 24 · pill 9999), `font/size·weight·line-height`, `gradient/*` (como STRING;
Figma no bindea gradientes), `font/family/ui` (Inter) + `font/family/logo` (Geist).

**`Roomix · Theme`** (modos **Dark / Light**): `background`, `surface`,
`surface-muted/subtle`, `border`, `text-primary/secondary/tertiary/heading/label`,
`nav-link`, `primary`, `primary-fg`, `chip-bg`, `primary-tint-5/16/18`, `primary-hover`,
`danger-hover`.

| | Dark (principal) | Light (alt) |
|---|---|---|
| bg / surface | `#060606` / `#0f0f0f` | `#ffffff` / `#ffffff` |
| surface-muted / border | `#1b1923` / `#2e2c37` | `#f5f5f5` / `#e5e5e5` |
| text / text2 | `#f8f8f8` / `#9e9e9e` | `#0a0a0a` / `#737373` |
| primary / nav-link | `#9e62ff` / `#f8f8f8` | `#5a189a` / `#10002b` |
| success / danger | `#00c950` / `#d40924` | (igual) |

**Tipografía:** Inter (UI). Display 60/700 · H1 30/700 · H2 24/600 · H3 18/600 · Body
16/400 · Label 14/500 · Caption 12/500. Logo "roomix" en **Geist Bold**.
**Gradiente CTA "Amoblar"** (con moderación): `linear-gradient(to right, #ad46ff, #9810fa)`.

El frame `75:2036` está **100% bindeado** (337 conexiones: fills, strokes, radios,
spacing, font-size + familia/peso/line-height). Cambiar el modo del Theme flipea toda la
pantalla.

#### Gotchas de tokenización (aprendidos)

- Un fill/stroke con el **color** bindeado **ignora la opacidad del paint** (toma el
  alpha de la variable). Para los tints (primary @ 5/16/18%) se crearon variables COLOR
  con el alpha incluido (RGBA) y se bindea a esas.
- Todo texto/icono sobre una superficie que flipea con el modo **debe** estar bindeado a
  una variable de texto del Theme, nunca a un literal claro (si no, en light queda
  invisible). Excepción: overlays sobre fotos (scrim oscuro fijo en ambos modos).

### Arquitectura atómica

Dos pages documentan el sistema, ambas como un único frame auto-layout, token-driven,
estilo Untitled UI:

- **🎨 Foundations**: tokens visualizados: Colors (Theme con swatches Dark|Light + paleta
  Core), Typography (escala en vivo + pesos + familias), Spacing, Radii, Gradients.
- **🧩 Components**: la librería, por tiers.

```
Template      →  Property page
Organisms     →  Navbar · Gallery 1+4 · Hub card · Bloque Modo Inversor
Molecules     →  Stat item · Segmented control · Key-Value row
Atoms         →  Button · Chip · Icon Button · Avatar · Nav item · Breadcrumb item · Icon·Lucide
Tokens        →  Core + Theme (Dark/Light)
```

El frame de producto se compone **enteramente de instancias** de estos componentes: un
cambio en un token o en un átomo **propaga hasta la pantalla real y el template**.

### Componentes (modelos)

| Componente | Modelo |
|---|---|
| **Button** | 96 variantes: Size (sm/md/lg) × Hierarchy (Primary/Secondary/Tertiary/**Success**/**Gradient**) × Destructive × State (Default/Hover/Focused/Disabled). Props: `Icon left`/`Icon right` (posición, booleans), `Icon name` (instance-swap), `Label`. Matriz ordenada Untitled-UI: bandas por jerarquía (no-destructive primero, destructive después), estados apilados, sizes en columnas. |
| **Avatar** | Size xs–xl × State Default/Focused. Contenido en cascada de fallback: `Image` (foto) → `Text` (iniciales) → `Placeholder` (icono) + `Status icon` (badge online con ring). |
| **Chip / Pill** | neutral/tint/outline/solid + `Icon` (bool) + `Icon name` (swap) + `Label`. |
| **Icon Button** | outline/solid/ghost · anida Icon·Lucide (swap). |
| **Icon · Lucide** | 24 iconos line (incl. el logo de WhatsApp brand, blanco). prop `name` (swap). |
| **Nav item** | `Label` · `Caret` (dropdown) · `Icon name`. |
| **Breadcrumb item** | variante `Current` False/True (el último = activo, sin separador). |
| **Stat item** | icono + Label + Value: las características del depto. |
| **Segmented control** | selected 1/2/3: los escenarios (Conserv./Moderado/Agresivo). |
| **Key-Value row** | intent neutral/success/danger: ROI y comparación (color del valor). |
| **Bloque Modo Inversor** | **Organismo estrella:** Chip + cap rate + interpretación + Segmented + KV rows + CTA. Compone instancias de todos los anteriores. |
| **Navbar / Gallery 1+4 / Hub card** | Organismos de página (el Hub card anida al Bloque Modo Inversor). |
| **Property page** | Template instanciable (1440×1520) que compone todos los organismos. |

### Documentación por componente

Los 4 clave (**Button, Chip, Avatar, Bloque Modo Inversor**) llevan en la page de
Components:

- **Anatomía:** instancia anotada con badges numerados sobre cada parte + legend.
- **Do's & Don'ts:** cards ✓ verde / ✗ rojo con ejemplos reales. El del Bloque codifica
  el reencuadre de UX (liderar con una respuesta interpretada, no volcar 9 números; capas
  avanzadas opt-in; cerrar en acción).

---

## Arquitectura de información

Jerarquía de lo que ve el usuario en el Bloque Modo Inversor (1°, 2°, 3°):

1. **Chip "Modo Inversor"**: tag de contexto + "solo en venta".
2. **Cap rate neto**: métrica héroe (2,98%, 26px bold). Si solo se pudiera mostrar un
   número, es este.
3. **Interpretación**: qué significa en castellano (la diferencia con una calculadora).
4. **Segmented**: escenario activo (Conservador/Moderado/Agresivo), opt-in.
5. **Key-Value rows**: ROI 1 año + comparación con el barrio (contexto neutro).
6. **CTA**: "Ver análisis completo" (cierra en acción).

A nivel página, la jerarquía es: precio+identidad → galería → características → el rail
con Contactar y el bloque inversor.

## Estados de interacción (a implementar)

| Feature | Loading | Empty | Error | Parcial |
|---|---|---|---|---|
| Cap rate / ROI | skeleton de la card | sin alquiler de mercado: prompt "ingresá un alquiler estimado" | "no pudimos calcular: reintentá" | marcar estimado vs. ingresado con un punto/ícono |
| Comparación barrio | skeleton de barra | **mediana no disponible (< N en venta): ocultar la barra, "sin comparables suficientes en Belgrano", NO inventar mediana** | ocultar sección | "basado en 4 deptos" + chip de baja confianza |
| Escenarios (Segmented) | skeleton al recalcular | defaults del modelo, marcados "estimado" | - | mezcla estimado/ingresado visible |

**Regla:** el empty de la comparación es el más importante. Una mediana falsa erosiona la
confianza más que admitir que no hay dato.

## User journey

| Paso | Hace | Siente | Soporte de diseño |
|---|---|---|---|
| 1 | Llega desde el listado | "¿conviene este?" | badge "cap 2,9%" que ancla la expectativa |
| 2 | Lee el cap rate + la interpretación | orientación, no carga cognitiva | una respuesta interpretada en <5s, no 9 números |
| 3 | Cambia de escenario (opt-in) | "¿y si soy más conservador?" | los números animan con transición corta + highlight de lo que cambió |
| 4 | Ve la comparación | "¿es buen precio para la zona?" | contexto neutro + procedencia de la mediana |
| 5 | Decide próximo paso | "quiero el análisis real" | CTA "Ver análisis completo" / Contactar |

Horizontes (Norman): 5s visceral (cap rate + interpretación responde) · 5min comportamental
(juega escenarios y crédito si los abre) · 5años reflexivo (comparar varias → "guardar/
comparar" en v2).

## Responsive

- **Mobile (375, base):** una columna; el rail (Hub card) baja debajo del contenido o a
  un sticky bottom-bar (Contactar full-width); el bloque inversor full-width; los 3
  escenarios en Segmented full-width.
- **Tablet (768):** 2 columnas donde entre; Segmented en fila se mantiene.
- **Desktop (1440):** layout actual (2 columnas con rail sticky). El **lado corredor**
  (denso, tabla de portfolio) es otra vista, no el stack de cards.
- No es "stacked on mobile": cada viewport tiene intención propia.

## Accesibilidad

- **No depender solo del color.** ROI lleva signo `+/−` además del verde/rojo; la
  comparación lleva chip de texto además del color. Aplica a daltónicos.
- **Contraste:** text2 sobre surface ≈ 7:1 (AA). Resuelto vía tokens: todo lo que flipea
  Dark/Light está bindeado a variables de texto del Theme.
- **Touch targets:** mínimo 44px. El ⓘ (visual ~16px) y los chips necesitan hit area
  ≥44px en el build (padding transparente).
- **Tipografía:** body mínimo 16px; caption 11–12px solo para labels/metadata.
- **⚠️ Tradeoff abierto · Contactar:** se estilizó como el CTA real de Roomix (verde
  `#00c950` + texto/icono **blancos** + logo WhatsApp), fiel a la marca. Pero blanco
  sobre ese verde **no pasa AA** (~1,9:1). Decisión pendiente: oscurecer el verde, o
  aceptar el tradeoff de marca (como hace WhatsApp). Es el único punto de contraste sin
  cerrar.
- **Keyboard / ARIA:** chip = `button` con `aria-expanded`; ⓘ = `button` con `aria-label`;
  popover = `role=dialog`, foco atrapado, Esc cierra.

## Clasificación de variables (según domain sección 3.2 y sección 3.3.1)

La UI separa tres familias. Criterio: si cambiar el valor cambia *qué propiedad se
evalúa*, es dato del inmueble; si es una apuesta sobre el futuro, es supuesto de escenario.

- **Datos de la propiedad** (del listing, fijos entre escenarios): precio, alquiler
  mensual inicial, expensas, ABL, m². Editables pero NO cambian con el escenario.
- **Supuestos del escenario** (macro, cambian con el toggle, defaults sección 2.5): vacancia,
  inflación, devaluación, ajuste alquiler (ICL), apreciación barrio.
- **Inputs de financiación** (decisión del inversor, opcional, activan ROI apalancado):
  capital propio, plazo, TNA.
- **Dato de mercado** (del dataset): mediana cap rate del barrio.

Implicancia aplicada: la **vacancia** va con los supuestos del escenario, no con los datos
de la propiedad.

## Decisiones resueltas

**Producto / UX**
- Cap rate neto = métrica héroe; liderar con una respuesta interpretada (no la planilla).
- Comparación con el barrio = contexto neutro (se descartó el callout/token ámbar).
- Modo Inversor integrado a la página de propiedad (Hub card), no pantalla aparte.
- Escenarios y crédito = capas opt-in colapsables.

**Design system**
- Tokens migrados a **Figma Variables** (Core + Theme), con **modo Light** funcionando.
- Librería completa átomos→moléculas→organismos→template; el frame real conectado 100%
  por instancias.
- Button al modelo completo (96 variantes) con matriz ordenada estilo Untitled UI.
- Avatar con cascada de contenido (foto → iniciales → placeholder) + status.
- 4 componentes clave documentados (anatomía + do's/don'ts).
- Foundations consolidada como única page de tokens (se eliminó una page duplicada).

## Variantes de escenario (datos del motor)

Números **proyectados por el motor** (sección 2.1.1, sección 2.6, defaults sección 2.5), horizonte 1 año. La
propiedad es idéntica; solo cambian los supuestos macro.

| Métrica | Conservador | Moderado | Agresivo |
|---|---|---|---|
| Cap rate neto (héroe) | 2,63% | **2,98%** | 3,16% |
| Cap rate bruto | 4,03% | 4,05% | 4,07% |
| NOI anual | USD 4.726 | USD 5.359 | USD 5.695 |
| ROI 1 año (contado) | +0,63% | +5,18% | +8,16% |
| vs mediana barrio (3,40%) | −0,77 pts | −0,42 pts | −0,24 pts |

Insight que valida el enfoque: el **cap rate bruto casi no se mueve** (ignora vacancia),
mientras el **neto y el ROI son muy sensibles** al escenario. Eso es lo que una
calculadora simple no muestra y el Modo Inversor sí.

## Estado "Ver análisis completo / financiación" (Caso E)

Estado profundo al que lleva el CTA, anclado al escenario Moderado. Muestra el ROI
apalancado y por qué el crédito cambia todo.

| Bloque | Contenido |
|---|---|
| Tu financiación | Entrega 30% (USD 54.000) · Crédito 70% (USD 126.000) · Plazo 20 años · TNA 8% · Cuota USD 1.054/mes |
| ROI del inversor | **−6,16%** (rojo, framing de riesgo) + chip `apalancamiento 3,33×` |
| Flujo de caja | Ingresos +6.679 − Gastos 1.320 − Cuota 12.647 = **−7.288** · + Apreciación 3.960 = **−3.328** |
| Contado vs. crédito | apreciación 2,2%: +5,18% / −6,16% · apreciación 5,0%: +7,98% / +3,17% |
| Callout riesgo | "Con apreciación baja el crédito destruye valor; con apreciación alta lo multiplica" (sección 2.7) |

- ROI negativo en rojo, pero con framing de **riesgo/tradeoff** (chip leverage + tabla),
  no de veredicto; *no* se front-loadea sin que lo pidan.
- El flujo de caja como waterfall hace visible el insight: la cuota supera al alquiler;
  el inversor apalancado pone plata cada mes apostando a la apreciación.

## Reestructura de IA del análisis (pasada UX/UI exhaustiva)

> Disparador: el análisis funcionaba pero *"la info no se mostraba como productos
> similares"* (Mashvisor, DealCheck, Zillow). Diagnóstico, leyes de UX mediante: era un
> **informe lineal de ~2.930px para leer**, no un **tablero escaneable**.

**Fallas diagnosticadas (ley → problema):**
- *Jakob + Von Restorff + anclaje:* sin scorecard "above the fold"; abría con un subtítulo,
  sin resumen de 5 segundos.
- *Hick + Miller + Tesler:* scroll infinito, todo visible siempre, sin disclosure progresivo.
- *Ley de Similitud:* el mismo dato (cap rate) en 3 formatos visuales distintos.
- *Von Restorff en contra del mensaje:* la card roja −6,16% era lo más pesado y ocupaba ~40%
  del scroll: front-loadeaba un negativo que el copy dice "no es un veredicto".
- *Tufte / data-ink:* datos de tendencia y distribución mostrados como números estáticos.

**Decisión (validada con el usuario): scorecard + colapsables** (no rompe el prototipo de
variables). Intervenciones:

1. **Componente `Stat`**: KPI tile reutilizable (label + valor + delta), codificación
   consistente. Mata la Ley-de-Similitud rota.
2. **Scorecard band** (4 KPIs: Cap rate · ROI 1 año · vs barrio · Apreciación) arriba de
   todo, **reactivo al slider de alquiler** (set con variante `alquiler`, bindeado a
   `alquilerSel`). El resumen de 5 segundos; el delta de "vs barrio" cambia de
   "debajo→en línea→por encima" al cruzar la mediana.
3. **Re-secuencia:** header → scorecard → tu alquiler → escenarios → barrio → crédito →
   resumen → acción. La comparación con el barrio ahora va *antes* que el crédito.
4. **Financiación colapsada en acordeón** (Colapsado/Abierto, CHANGE_TO + DISSOLVE). Saca el
   −6,16% del centro de gravedad; abre a demanda con la simulación completa viva adentro
   (hereda los bindings de variables). La pantalla pasó de **2.930px → ~1.560px**.
5. **Comparación = distribución/percentil** (P1): histograma de cap rates del barrio +
   marcador "Esta propiedad" + mediana + **percentil como insight-líder** ("Percentil 28 ·
   7 de cada 10 rinden más"). Reactivo al alquiler. Es el insight que `domain.md` pide para
   v2 y lo que distingue un producto de inversión de un portal.
6. **Gráfico de sensibilidad** (P1): contado vs crédito según apreciación, como 2 líneas en
   vez de tabla. Muestra que el crédito es más **volátil** (pendiente más empinada) y recién
   "deja de perder" a ~4% de apreciación, honesto: el crédito *no* supera al contado en
   0-6% porque la cuota supera al cap rate. Ilustrativo (entrega 30%/Referencia).

**Límite conocido:** el **header de contexto sticky** (P1.1) no es factible vía el plugin API
(`scrollBehavior` no expuesto); es un toggle manual en el panel Prototype de Figma
("Fixed position when scrolling"). No se agregó una barra no-sticky por ser redundante con
el scorecard.

**Resultado:** dejó de ser *un informe que se lee* y pasó a ser *un tablero que se escanea y
se profundiza a demanda*, con codificación consistente, lo de tendencia/distribución
graficado, y el peso visual alineado a la narrativa.

## Diferido (no en v1)

- Conectar el CTA "Ver análisis completo" al estado profundo de financiación (pendiente).
- Estado interactivo del slider de entrega (recalcular cuota y ROI al moverlo).
- Pantalla del lado corredor (desktop denso).
- Nivelar Icon Button y Chip con estados hover/focus/disabled como Button/Avatar.
- Construir mobile (375) y tablet del producto.
- Resolver el tradeoff de contraste de Contactar (verde + blanco vs AA).

## Review de diseño · 2026-06-09 (plan-design-review)

7 dimensiones sobre el deck (OFF / ON / ⓘ + prototipo). **Score 7/10.**
IA 8 · Estados 3 · Journey 8 · AI slop 8 · Design system 7 · Responsive/a11y 4.

> Nota: post-review, el diseño evolucionó del flujo OFF/ON al layout de página de propiedad
> con Hub card, y el design system pasó de hardcodeado a tokens/variables + librería
> completa. Varios gaps de la review (design system, estados, contraste) se cerraron con eso.

### GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
|--------|---------|-----|------|--------|----------|
| CEO Review | `/plan-ceo-review` | Scope & strategy | 0 | - | - |
| Codex Review | `/codex review` | Independent 2nd opinion | 0 | - | - |
| Eng Review | `/plan-eng-review` | Architecture & tests | 0 | - | - |
| Design Review | `/plan-design-review` | UI/UX gaps | 3 | issues_open | run 3: zona inversor a dark-mode (coherente con la página real); score 6,5 → 8 |
| DX Review | `/plan-devex-review` | Developer experience gaps | 0 | - | - |

**VERDICT:** Design Review corrida 3 veces (6→8→7→8). El diseño no bloquea ship; el
sistema de componentes ya está construido y conectado.

**UNRESOLVED DECISIONS:**
- Conectar el CTA "Ver análisis completo" a su destino.
- Contraste de Contactar (marca vs AA) sin cerrar.
- En el deep-dive: formato del ⓘ (tooltip / popover / inline).
- Mobile (375) y tablet del producto sin construir.
- Nivelar Icon Button / Chip con estados.

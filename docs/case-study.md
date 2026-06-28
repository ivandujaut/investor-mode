# Modo Inversor · Roomix
### Cómo reencuadré una calculadora inmobiliaria en una herramienta de decisión que computa de verdad

**Rol:** Product Engineer: **idea, research y diseño** (el código es el próximo capítulo)
**Contexto:** Roomix.ai es el buscador inmobiliario con IA más grande de Argentina. El "Modo Inversor" es una **capa adicional que ideé yo** y diseñé de punta a punta.
**Entregable:** prototipo funcional en Figma, sobre una especificación de dominio que **investigué y destilé** (`domain.md`).
**Estado:** Concepto / prototipo (diseño v1 terminado, código pendiente).

*Proyecto conceptual independiente. No fue encargado por Roomix ni está afiliado a la empresa; el nombre y el contexto se usan como base real para un ejercicio de diseño de producto.*

> **TL;DR:** Roomix es el mayor buscador inmobiliario con IA de Argentina (500.000+ publicaciones). Investigándolo vi una oportunidad: el que busca para *invertir* necesita otra cosa. Ideé el **Modo Inversor** (una capa adicional), **aprendí el dominio financiero de cero** (cap rate, UVA, apalancamiento) y lo diseñé. Mi primera versión era una calculadora que tiraba 9 números y decía "decidí vos"; la **reencuadré** en una herramienta que interpreta, orienta la decisión sin dictarla, y **computa en vivo**. El diferencial: *product thinking + research + interactividad real + honestidad.*

---

## El contexto y la oportunidad

Roomix es **el buscador inmobiliario con IA más grande de Argentina**: analiza más de 500.000 publicaciones (departamentos, casas, terrenos, locales) en venta y alquiler, de inmobiliarias y de dueños directos. Su sello es la **búsqueda en lenguaje natural** ("escribí lo que buscás con tus palabras: *2 ambientes en Palermo con balcón*"), más colecciones de favoritos y alertas por WhatsApp. Es gratis, AI-first, y cubre todo el país.

Además ya tiene una **capa de herramientas**: simulador de créditos hipotecarios, calculadoras de ajuste de alquiler (IPC/ICL), tasador online, detector de estafas, mudanza virtual con IA. O sea: un producto que abraza la idea de "herramientas que te ayudan a decidir".

Y justo ahí vi el hueco. Con todo eso, **ninguna herramienta responde la pregunta del que compra para invertir:** *"¿esta propiedad es un buen negocio?"*. El tasador te dice cuánto vale; el simulador hipotecario, cuánto pagás de cuota. Pero nadie conecta alquiler + precio + apreciación + financiación en una sola respuesta. Ese usuario termina, igual que antes, en una planilla de Excel.

De ahí salió la idea (**propia**) del **Modo Inversor**: una capa sobre cualquier ficha de propiedad que responde *"¿esto es una buena inversión, y para qué tipo de inversor?"*. Encaja con el ADN de Roomix (AI-first, orientado a herramientas) y llena un vacío real. No me lo pidió un brief; lo identifiqué yo como oportunidad de producto y lo diseñé de punta a punta.

## El research: aprender un dominio de cero

Para diseñar esto en serio no me alcanzaba con entender a Roomix. **Tuve que aprender el dominio financiero-inmobiliario desde cero:** cap rate neto, NOI, ROI contado vs. apalancado, el efecto real del crédito sobre el retorno, y todo el contexto argentino: UVA, bimonetarismo, ajuste por inflación, el riesgo de que la cuota real en dólares se dispare.

Destilé esa investigación en una **especificación de dominio (`domain.md`)**: las fórmulas, los inputs del usuario, los defaults macro y los escenarios. Esa spec se volvió la **fuente de verdad del motor**: todo lo que el prototipo calcula sale de ahí. No inventé números para que la demo se viera linda: los derivé del dominio que investigué.

> Diseñar sobre un dominio que no dominás arranca con humildad: primero entenderlo bien, recién después decidir cómo presentarlo. La mitad del trabajo fue research; la otra mitad, traducir ese rigor en una experiencia que un no-analista entienda sin sentirse tonto. Y no salió a la primera; **iteramos mucho**, y cada decisión de abajo es una de esas iteraciones.

---

## El problema: mi primera versión era una calculadora para alguien que vino a decidir

Con el dominio entendido, diseñé una primera versión. Mostraba los 3 escenarios en paralelo, ~9 números, una comparación contra el barrio, y cerraba con un implícito *"decidí vos"*. Tenía todo el rigor del motor, y por eso mismo no servía.

La probé y se sentía mal. El diagnóstico de raíz:

> **Construía una calculadora para un usuario que vino a tomar una decisión y no sabe interpretar los números.** "Mostramos datos, no recomendaciones" se estaba usando como excusa para no interpretar.

El usuario de Roomix no es analista financiero. Tirarle cap rate neto + ROI contado/apalancado × 3 escenarios + "decidí vos" le descarga toda la carga cognitiva encima. Lo paraliza: ve números, no sabe si invertir o no.

**La decisión central del proyecto:** pasar de *planilla* a *respuesta interpretada*. La UI lidera con UNA respuesta en castellano ("2,98% cap rate neto; para Belgrano es bajo: zona de apreciación, no de renta"), las capas avanzadas son opt-in, y todo cierra en una acción.

Esto NO es "agregar una recomendación". Es la distinción más fina del proyecto, y la desarrollo abajo.

---

## El criterio (la lente con la que tomé cada decisión)

Antes de las pantallas, los principios. Cada decisión pasó por estos filtros:

1. **Interpretar ≠ recomendar, pero orientar sí.** Explicar qué significa un número no es decir "comprá". Pero dejar al usuario solo frente a un muro de cifras tampoco ayuda: lo paraliza. La salida: **decir *para quién* tiene sentido** ("te conviene si X, no si Y"). El usuario se auto-selecciona; respeta "no recomendar" pero no lo abandona.

2. **Lidera la conclusión, no el dato.** Cada bloque abre con qué significa para la decisión; el número es la evidencia debajo.

3. **Honestidad sobre persuasión.** En un producto de plata, la confianza se gana siendo honesto sobre el riesgo, no escondiéndolo. "Ponés plata de tu bolsillo cada mes", "esto es una apuesta a la apreciación", "no es un veredicto".

4. **Matchear el modelo mental del usuario (Ley de Jakob).** El usuario llega con expectativas de Mashvisor, DealCheck, Zillow, robo-advisors. Esos productos lideran con un *scorecard* escaneable y profundizan a demanda. Me alineé con ese lenguaje.

5. **Una gráfica se gana su lugar solo si muestra algo que un número no puede.** Si solo decora un número, es peor que el número.

6. **Restricción > muestrario.** Un lenguaje visual coherente parece producto; muchos tipos de gráfica distintos parecen demo.

---

## Cada decisión de diseño es una hipótesis de negocio

Antes del detalle de cada pantalla, la lente con la que pienso todo esto. No diseño pantallas lindas: muevo una palanca de negocio. Roomix monetiza generando **leads calificados** para inmobiliarias. El Modo Inversor existe porque hay un **segmento de alto valor** (el que compra para invertir) que hoy el producto deja escapar a una planilla de Excel. Cada decisión de producto la pienso como una apuesta sobre ese funnel: captar a ese usuario, que confíe, y que llegue al CTA que genera el lead.

*(Nota honesta: esto es un proyecto conceptual sin tráfico real, así que los impactos de abajo son hipótesis razonadas, no métricas medidas. Distingo una cosa de la otra a propósito.)*

**Simplificar la pantalla = bajar el abandono antes del CTA.** Una pantalla que abruma no es un problema estético, es un usuario que rebota antes de contactar. Liderar con la respuesta (de 2.495px a 917px) acelera el "ajá": el que entiende rápido es el que aprieta "Contactar". Y al dejar la profundidad a un click, atiendo a dos públicos con una sola pantalla, sin sacrificar al usuario sofisticado que quiere auditar el número.

**Hacer dinámica la tarjeta de conversión = sostener la credibilidad del lead.** La tarjeta sticky es el "carrito" del flujo: mantiene el CTA a la vista mientras el usuario explora. La conecté al selector de escenario para que el retorno se actualice en vivo. Una tarjeta de conversión que no responde es una promesa rota: el usuario juega con los supuestos, los números no se mueven, y deja de creer en el cálculo justo en el elemento que tiene que cerrarlo. La reactividad acá no es un lujo: es lo que mantiene viva la confianza que precede al clic.

**La honestidad como estrategia de conversión, no en contra.** El producto dice cosas incómodas: "con crédito ponés plata de tu bolsillo cada mes", "esto es una apuesta a la apreciación", y muestra el ROI en negativo cuando lo es. Un portal que infla números genera un lead que se quema en la primera reunión con el corredor. Un producto honesto genera un lead **calificado y bien expectado**: el que contacta ya sabe en qué se mete. Eso vale más para el corredor (mejor cierre) y construye marca para Roomix (el lugar que no te miente). La honestidad no es lo opuesto a convertir, es lo que hace que la conversión valga.

**El pulido comunica "producto serio".** Un ícono del sistema en vez de un carácter suelto, una tipografía consistente. En un producto financiero, un detalle descuidado le susurra al usuario "esto es una maqueta, no le creas el número". La prolijidad sostiene la credibilidad que el resto necesita para convertir. No es vanidad: es reducir la fricción de confianza.

### Cómo trabajo

- **Parto de un hueco de negocio, no de una pantalla.** La feature existe por un segmento de alto valor que se escapa, no porque quería diseñar algo.
- **Escucho al usuario y ataco la causa raíz.** "No sé qué leer" lo traduje a "está abandonando antes del CTA" y toqué la jerarquía, no los colores.
- **Itero sobre mi propio trabajo sin ego.** Colapsé lo que yo mismo había construido cuando entendí que recommití el problema que salí a matar.
- **Verifico, no asumo.** Probé la interactividad en el entorno real antes de darla por buena.
- **Uso las herramientas para un fin.** Manejo Figma a fondo (variables, lógica condicional, componentes de librería), pero como medio para que el producto convierta mejor, no como vitrina técnica.

---

## Decisiones clave

### 1 · Cómo se muestra la información: de informe lineal a tablero escaneable

El deep-dive era un **informe lineal de ~2.900px** para leer de arriba a abajo. Diagnóstico con leyes de UX:

- *Jakob + Von Restorff:* sin scorecard "above the fold": no había resumen de 5 segundos.
- *Hick + Miller + Tesler:* scroll infinito, todo visible siempre, sin disclosure progresivo.
- *Ley de Similitud (Gestalt):* el mismo dato (cap rate) aparecía en 3 formatos visuales distintos.
- *Von Restorff en contra del mensaje:* la card roja del ROI negativo era lo más pesado de la pantalla: front-loadeaba un número asustador que el copy decía que "no es un veredicto".

**Qué hice:**
- **Scorecard de KPIs** arriba (Cap rate · ROI · vs barrio · Apreciación), reactivo, como el resumen de 5 segundos que tiene todo producto del rubro.
- **Componente `Stat` único** → codificación consistente (mata la Ley-de-Similitud rota).
- **Re-secuencia:** resumen → tu input → escenarios → barrio → crédito → veredicto → acción.
- **Financiación colapsada en acordeón:** saca el negativo del centro de gravedad; abre a demanda. La pantalla pasó de 2.900px a ~1.560px.

**Por qué funciona:** convirtió un *informe que se lee* en un *tablero que se escanea y se profundiza a demanda*. La complejidad inherente del dominio (Tesler: alguien la tiene que cargar) se repartió en lugar de volcarse toda de una.

### 2 · El copy: conclusión-líder + orientación de la decisión

Antes: subtítulos descriptivos ("mismo inmueble, distintos supuestos macro"). Después: conclusiones que orientan.

- *Escenarios:* "Aun en el mejor escenario rinde por debajo del barrio. Es apreciación, no flujo mensual."
- *Financiación:* "Con crédito ponés plata de tu bolsillo cada mes. Solo cierra si esperás que se valorice fuerte."
- *Cierre · bloque "En resumen · para tu decisión":* una línea ("Belgrano se compra por apreciación, no por renta") + ✓ "te conviene si…" / ✕ "no te conviene si…". El ✕ es **gris, no rojo**: orienta, no condena.

**Por qué funciona:** mata la parálisis. El usuario testeó el original y dijo literalmente *"veo solo números, estoy colapsado, no sé si invertir o no"*. La conclusión-líder + el "para quién" le da una salida sin decirle qué hacer.

**De-jerga, además:** "neto de vacancia" → "descontando meses vacíos"; "NOI" → "resultado neto"; "(no-cash)" → "(no es plata en mano)". Maté la jerga que excluye al no-analista, respetando los términos que vienen con su explicación al lado (cap rate, apalancamiento: cada uno con su popover ⓘ).

### 3 · La comparación contra el barrio: de 2 barras a distribución con percentil

La comparación era "esta propiedad vs mediana": dos barras. La convertí en un **histograma de la distribución de cap rates del barrio**, con tu propiedad marcada y el **percentil como insight-líder** ("Percentil 28: 7 de cada 10 deptos rinden más que este").

**Por qué funciona:** es la diferencia entre un portal y un producto de inversión. "Dos barras" te dice un dato; "dónde caés en la distribución" te da el contexto que define la decisión. Es justo lo que el propio dominio marcaba para v2.

### 4 · Honestidad sobre la incertidumbre (la decisión que más me importó)

Tres movimientos de honestidad, todos disparados por preguntas reales del usuario:

- **"Ponés USD X/mes de tu bolsillo".** Cuando el ROI total daba apenas positivo (+0,1%), el número en verde se leía como "ganancia". Pero ese +0,1% es un empate **en papel** (lo paga la apreciación), mientras en **efectivo** ponés ~USD 326/mes porque el alquiler no cubre la cuota. Agregué, en ámbar, debajo del ROI, "Ponés USD X/mes de tu bolsillo". El verde ya no se lee como ganancia.

- **Caja vs papel, explícito.** El "Resultado total del año" es flujo de caja (real) + apreciación (papel, "no es plata en mano"). Separarlos en el waterfall evita que el usuario confunda un empate-en-papel con plata en mano.

- **El apalancamiento no "multiplica", es más volátil.** El gráfico de sensibilidad mostraba contado vs crédito según la apreciación. Al construirlo, revisé los números: el crédito NO supera al contado en el rango realista (la cuota supera al cap rate). Corregí el copy: la línea del crédito es más *empinada* (más volátil), no "mejor". Un dato que el modelo no respalda no va, aunque suene más vendedor.

**Por qué funciona:** en un producto de plata, esto ES el diferenciador. Decir la verdad incómoda ("estás apostando, no ganando") construye más confianza que cualquier número en verde.

### 5 · El motor que computa de verdad (no es un mockup)

El deck no es estático. **Computa.** Mover el supuesto de alquiler propaga el recálculo por cap rate, escenarios, distribución y financiación. Y construí un bloque "Motor en vivo" que corre las fórmulas del dominio usando **expresiones y condicionales nativos de Figma** (suma/resta/mult/división + if/else), con la barra y el mensaje recalculando en tiempo real.

**El criterio acá fue honestidad técnica.** Descubrí los límites reales de la "programación" de Figma y diseñé alrededor de ellos:
- `characters` solo acepta STRING (no FLOAT), y las expresiones no formatean ni concatenan → los gráficos van por width (continuo, computado), los números/mensajes por strings y umbrales.
- Las condicionales son máximo 2 bloques (if + else) y no se anidan → el mensaje de 3 estados se resuelve con "default + 2 overrides".

**Por qué importa:** demuestra que entiendo el motor, no solo la UI. Es raro en un portfolio de diseño ver un prototipo que *calcula* en lugar de simular estados pre-horneados.

### 6 · El escenario como modelo (yield vs retorno)

Cuando hice reactivo el selector Conservador/Moderado/Agresivo, apareció una pregunta de modelo: ¿el escenario cambia el *rendimiento de alquiler* (cap rate) o solo la *apreciación*?

Decisión: **el escenario es una apuesta sobre la apreciación, no sobre el yield de hoy.** Por eso:
- **Cambian con el escenario:** ROI, apreciación, resultado de la financiación, proyección de patrimonio.
- **NO cambian (correcto):** cap rate, vs barrio, percentil, flujo de caja: son *yield*, lo que rinde HOY, independiente de tu pronóstico.

**Por qué funciona:** es conceptualmente correcto y mantiene la coherencia en todo el deck. El cap rate es tu realidad del año 1; el escenario es tu bet sobre el futuro. Separar yield de retorno evita que el usuario crea que "ser optimista" mejora lo que la propiedad rinde hoy.

### 7 · Gráficas como lenguaje de producto financiero (y la disciplina de descartar)

Exploré 4 gráficas tipo Recharts/Chart.js: fan chart (proyección de valor a 10 años con banda de incertidumbre), área apilada (equity en el tiempo), donut (composición del cap rate) y gauges radiales (KPIs).

**Apliqué el criterio "una gráfica se gana su lugar solo si muestra lo que un número no puede", y descarté dos:**
- **Fan chart → integrado.** Muestra trayectoria + incertidumbre: cuánto valdría tu propiedad en 10 años según el escenario, con la banda abriéndose. Eso ningún número lo cuenta.
- **Equity area → integrado.** Tu parte (equity = valor − deuda) creciendo de la entrega a un patrimonio mayor, por apreciación Y amortización. El relato de la inversión apalancada hecho imagen.
- **Gauges → descartado.** Un gauge sirve para "qué tan lleno está respecto a un máximo". El cap rate no tiene máximo de 100% → inventás una escala falsa, y obligás a decodificar un arco para leer un número que ya estaba limpio.
- **Donut → descartado.** Lindo, pero sumaba un tercer tipo de gráfica. Dos area charts que riman + el histograma + el waterfall ya son un lenguaje coherente; donut + gauges lo convertían en un "zoológico de gráficas".

**Por qué funciona:** la restricción. Un lenguaje visual restringido parece producto; un muestrario parece demo. Descartar bien es diseñar.

### 8 · Para qué tipo de inversor: la segmentación

La pregunta que el producto responde tiene dos partes: *"¿esto es buena inversión, **y para qué tipo de inversor**?"*. La segunda es la más interesante en términos de producto, y la resolví sobre **dos ejes**, no con un selector de personas.

**Eje 1 · el objetivo: renta vs. revalorización** *(el principal)*
- **Inversor de renta (yield):** quiere flujo mensual. Le importan el cap rate, el percentil del barrio, "cuánto me deja por mes".
- **Inversor de apreciación (revalorización):** apuesta a que el inmueble suba de valor. Le importan el ROI total, la proyección a 10 años, el equity en el tiempo.

Toda la tesis se apoya acá. El ejemplo de Belgrano *es* esto: "se compra por apreciación, no por renta". El trabajo del producto es decirte **a qué juego es buena la propiedad**, para que veas si coincide con TU juego: de ahí el bloque "te conviene si… / no te conviene si…".

**Eje 2 · el financiamiento: contado vs. apalancado** *(cruza al primero)*
El crédito UVA convierte una renta floja en una apuesta a apreciación ("ponés plata de tu bolsillo cada mes"). En Argentina el apalancamiento **redefine el perfil de riesgo**, no es un detalle de financiación: por eso es un eje, no una casilla.

**Cómo definí los ejes (del research, no de la intuición):** renta-vs-apreciación es la distinción financiera de fondo (yield vs. return). La elegí porque es el eje que *cambia la decisión* en zonas premium como Belgrano, donde confundir los dos juegos es el error #1 del inversor amateur. Contado-vs-apalancado lo sumé porque el crédito UVA transforma el riesgo, no solo el financiamiento.

**Lo que NO segmenté, a propósito:** alquiler tradicional vs. **temporario/Airbnb**: la segmentación que más falta. La dejé afuera porque depende de ocupación, estacionalidad y tarifa por noche (datos que no tengo y que el dominio no modela), y porque meterla a medias habría sido peor que no meterla. Es el **candidato #1 a v2**: en CABA, un monoambiente en Palermo puede rendir 2-3× en temporario. Tampoco modelé flip ni compra en pozo.

**Una aclaración que evita un error conceptual:** Conservador / Moderado / Agresivo **no son tipos de inversor**: son apuestas de apreciación macro (un pronóstico), no estrategias. El perfil de inversor es un eje aparte; de hecho el dominio lo marca como eje independiente para v2.

**Honestidad sobre el estado:** hoy la segmentación vive más en el **copy y la estructura** (el "te conviene si…", el énfasis renta-vs-apreciación) que en un sistema explícito de perfiles. Es defendible para una v1: orientar sin sobre-ingeniería. Y ahora tiene **respaldo doble**: el diseño la orienta, y el motor la computa (el cap rate queda fijo entre escenarios; el ROI se mueve con la apreciación). La tesis está hecha código.

**Por qué funciona:** es la diferencia entre "te tiro números" y "te ubico en tu juego". Decir *para quién* sirve respeta el "no recomendar" sin abandonar al usuario.

---

## Iteración: la pantalla seguía siendo "una banda"

Acá viene la parte honesta. Apliqué el reencuadre (scorecard arriba, financiación colapsada) y se sentía bien. Pero le mostré la pantalla de análisis a un usuario y me dijo, textual: *"hay demasiada info, no sé qué leer."* Tenía razón, y dolía: el proyecto **nació** para matar exactamente eso (la planilla que te paraliza), y la pantalla **se había vuelto a llenar**.

**El diagnóstico:** había hecho disclosure progresivo **a medias**. Puse un scorecard arriba, pero dejé *todo el informe* debajo (motor, distribución, proyección a 10 años, financiación), apilado con el mismo peso visual. El veredicto y el "te conviene" quedaban al **fondo**, después de scrollear un muro. Era *"respuesta + planilla"*, no *"respuesta"*.

**El fix:** invertir la lógica. Por defecto, la pantalla muestra **solo la respuesta**:
1. el veredicto en una línea,
2. el scorecard (4 KPIs),
3. el "te conviene si… / no si…",
4. la acción (+ "Descargar informe").

Y **todo el resto** (incluido el selector de escenario) colapsa detrás de un *"Ver el análisis detallado"*, interactivo, opt-in. La profundidad sigue ahí, a un click, pero no te la tira en la cara.

**El resultado:** la pantalla por defecto pasó de **2.495px a 917px** (entra sin scroll). De informe a respuesta, esta vez de verdad.

**Lo que me llevo:** disclosure progresivo hecho a medias **sigue siendo overload**. Y el mejor feedback es el que te marca que recommitiste el pecado que saliste a matar. Lo importante fue escucharlo y **matar densidad sin ego** (colapsar lo que yo mismo había construido).

---

## Qué funciona y por qué

- **El reencuadre.** Hay una tesis de producto, no solo pantallas: de "planilla que descarga números" a "herramienta que interpreta y orienta". Eso es lo que separa diseño de *product thinking*.
- **La interactividad real.** El deck computa (alquiler → cap rate → escenarios → financiación → equity), con expresiones de Figma. No es un mockup de estados.
- **La honestidad.** Caja vs papel, "ponés X/mes", "es una apuesta", el aviso de desvío del alquiler. El producto respeta al usuario.
- **La coherencia.** Design system con tokens (dark/light), un componente `Stat` consistente, y un lenguaje de gráficas restringido.

## Qué no funciona (todavía) y por qué

Ser honesto sobre los huecos es parte del trabajo. Para una v1 está bien; para producción, no:

- **Mobile no existe.** El real estate es mobilísimo. Es el hueco #1 de la v2. Lo prioricé después porque la tesis (reencuadre + honestidad + interactividad) se prueba mejor en desktop primero.
- **Datos reales.** La mediana, el percentil y los comparables son supuestos del motor, no data. El `domain.md` ya marca el percentil/distribución como v2. Sin data real, la confianza tiene techo.
- **El journey muere en una propiedad.** No hay comparar ni guardar; el inversor real evalúa 5 propiedades. "Ver propiedades que rinden más" es, por ahora, un callejón.
- **Accesibilidad.** Quedó pendiente el contraste AA del botón "Contactar" (verde sobre verde). Un pase de a11y completo es deuda.
- **Fragilidad de prototipo.** Algunas interacciones se resolvieron con overlays absolutos (los tabs) y bindings de variables que se rompen si editás el texto directo, realidades de prototipar en Figma que en código se resuelven distinto. (Justamente, la capa de código es el próximo capítulo de este caso.)

---

## Lo que me llevo

- **"No recomendamos" puede ser una excusa para no pensar.** La salida no es recomendar: es interpretar y orientar *para quién* sirve.
- **La honestidad escala mejor que la persuasión** en productos de plata. El número en verde que esconde el flujo negativo erosiona la confianza.
- **Descartar es diseñar.** Las dos gráficas que NO puse dicen tanto de mi criterio como las dos que sí.
- **Recorrer el prototipo de corrido caza lo que el diseño estático esconde.** Tres bugs (dos de alineación de tabs, uno de un binding que se había cortado al editar texto) solo aparecieron interactuando. La QA en vivo no es opcional.

---

# Capítulo 2 · El motor en código

El prototipo de Figma *simulaba* el cálculo (variables + expresiones). Este capítulo es lo que pasa cuando el prototipo deja de simular y **empieza a calcular de verdad**: un motor en TypeScript que toma una propiedad y devuelve sus métricas de inversión. Lógica pura, sin UI: hoy es solo el motor y sus tests.

## El enfoque: TDD con el research como oráculo

El motor es **TypeScript estricto, sin dependencias de runtime, framework-agnostic** (después lo importa la UI; hoy no hay UI). Lo construí con **TDD** (red → green → refactor), y el detalle que lo vuelve demostrable en vez de "confiá en mí":

> **Los casos resueltos del `domain.md` son los golden tests.** El cap rate 2,93 %, la cuota ≈ USD 1.054, el ROI apalancado −6,16 %, el leverage 3,33×: no los inventé para que la demo cierre: salieron del research, y cada uno es un test que **falla si el motor se desvía**.

El research no fue solo para el diseño. Fue el oráculo del motor.

## Decisiones clave (en código)

### 1 · La spec de dominio ES el contrato
`domain.md sección 3.3` define los inputs y outputs; el motor los implementa tal cual (`EngineInput` → `EngineOutput` con los 3 escenarios en paralelo). Cada constante lleva su `@see domain.md sección X`: no hay números mágicos, hay trazabilidad al research.

### 2 · "Hoy" vs "proyectado", garantizado por el tipo
`calcNetCapRate` (alquiler de hoy) y `calcProjectedNetCapRate` (proyectado bajo macro) son **dos funciones distintas**. La tesis yield-vs-retorno del diseño ahora la enforzan los tipos y los tests, no un comentario. El ROI usa el cap rate *proyectado* porque es un retorno del año; mezclar "yield de hoy" con "apreciación del año" sería usar dos relojes, y un test lo cazó cuando me equivoqué.

### 3 · Una sola fuente de verdad por fórmula
`projectRent`, `calcOperatingBreakdown`, `computeFinancing`: cada cuenta vive **una sola vez**. El cap rate, el NOI y el ROI **componen** esas primitivas en lugar de repetirlas. Lo aprendí refactorizando: mi primera versión "des-dividía" el cap rate para recuperar el NOI; lo di vuelta para que **el NOI sea el ladrillo y el cap rate derive de él**, no al revés.

### 4 · El escenario es una apuesta de apreciación, y el código lo dice
`DEFAULT_SCENARIOS` codifica la tabla sección 2.5: lo que cambia entre Conservador/Moderado/Agresivo es vacancia + ajuste + devaluación + apreciación. El cap rate del activo no "mejora" por ser optimista. Y la **vacancia vive en el escenario, no en la propiedad** (es un supuesto macro, no un atributo del activo), un test que corría los 3 escenarios con vacancias distintas me forzó a moverla ahí. El test maneja el diseño.

### 5 · Convenciones que protegen
Conceptos financieros universales en inglés (`purchasePriceUSD`, `capRateNet`); términos argentinos sin traducir (`expensasMonthlyUSD`, `ablQuarterlyUSD`, ICL, UVA). Cap rate como **ratio decimal** (`0.0293`): el ×100 vive en la UI, el motor no sabe de formato. La frontera de unidades es explícita.

### 6 · Honestidad, también en el motor
El ROI apalancado puede dar **negativo** (−6,16 % en el Caso E) y el motor lo devuelve tal cual: el flujo de caja negativo es real ("ponés plata de tu bolsillo cada mes"). El motor no maquilla, y no dicta: devuelve **datos estructurados por escenario, no un veredicto**, la misma postura que el diseño.

## Qué funciona y por qué

- **Es demostrable.** 20 tests, typecheck estricto, cada métrica anclada a un caso resuelto del dominio. La corrección no es una opinión, es una suite que corre.
- **Es componible.** Fuentes únicas de verdad + wrappers que las componen. Cambiar la fórmula de la cuota se toca en un solo lugar.
- **Separa motor de presentación.** Ratio decimal, sin formato, sin UI: listo para que lo consuma React, un endpoint o un test. `analyzeProperty(input)` es la única puerta de entrada.

## Qué no funciona (todavía) y por qué

- **v1 es a 1 año.** La proyección a 10 años (el equity/fan chart del prototipo) es el segundo módulo, todavía sin construir.
- **UVA simplificado.** Modelé el crédito como USD a 8 % TNA fija; el UVA real se denomina en UVAs (ajusta por inflación vía CER). En atraso cambiario, eso subestima la cuota real. Está documentado como deuda de v2 en el propio dominio: preferí una simplificación honesta y declarada antes que una falsa precisión.
- **TIR y VAN afuera.** Las métricas que pesan el valor del dinero en el tiempo quedaron para v2: requieren modelar el flujo período-a-período y no tienen fórmula cerrada (multiplican la complejidad por 2-3×).
- **Sin datos reales.** La mediana del barrio entra como input; el percentil/distribución es v2. Los defaults macro son defendibles para CABA mayo 2026, pero son supuestos triangulados, no medición.

## Lo que me llevo

- **Los golden tests del research son el puente entre diseño y código.** Tener los casos resueltos del dominio convirtió "implementar finanzas" en "hacer pasar números que ya validé".
- **TDD encontró mis bugs conceptuales, no solo los typos.** El test del ROI cazó que usaba el cap rate de hoy en vez del proyectado: un error de *modelo*, no de sintaxis. Sin el test, pasaba inadvertido.
- **Refactorizar bajo verde da libertad.** Invertir la jerarquía NOI↔cap rate, mover la vacancia al escenario, extraer primitivas: todo con la red de los tests, sin miedo a romper algo en silencio.

---

*Próximo capítulo: conectar el motor a la interfaz: que `analyzeProperty` alimente el scorecard, los escenarios y la financiación reales, y cerrar el v2 (proyección a 10 años, distribución del barrio, UVA denominado en UVAs).*

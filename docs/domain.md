# Dominio · Finanzas inmobiliarias para Modo Inversor

> Documento vivo. Construido a lo largo de Fase 1 del proyecto.
> Validado con: [nombre del corredor, fecha] (pendiente Día 4)

## 1. Conceptos básicos

### 1.1 Cap rate bruto y neto 

Es el porcentaje que te dice cuanto produce una propiedad por año en relación con su precio de compra,
asumiendo que la pagás toda en efectivo. La diferencia entre bruto y neto es si tenemos en cuenta o no
los gastos operativos (el realista)

**Fórmula cap rate bruto:**
Cap Rate bruto = ingreso anual por alquiler/precio de compra.

**Fórmula cap rate neto:**
Cap Rate neto = (ingreso anual por alquiler - gastos operativos)/precio de compra.

**Cuándo usar cada uno:**
Usuaría el bruto como un primer filtro rápido cuando estoy buscando propiedades y tengo que revisar muchas propiedades,
si ya el cap rate bruto no me convence entonces ya no pierdo tiempo buscando más información

Usaría el neto como el análisis en detalle cuando ya tengo en vista 2/3 propiedades y estoy analizando seriamente en la
inversión

### 1.2 NOI (Net Operating Income)

Es el dinero real y limpio que le queda a la propiedad en un año, justo despues de cobrar alquileres y pagar todos
sus gastos operativos, pero antes de pagar la hipoteca o impuestos personales.
NOI = ingreso anual por alquiler - gastos operativos

### 1.3 ROI a N años

Es un indicador financiero que te dice cuanto dinero ganas por cada peso o dolar que pusiste de tu propio bolsillo
ROI = Ganancia neta / Inversión Total

La ganancia neta tiene en cuenta gastos de mantenimiento, impuestos, etc y tambien las deudas, hipotecas o prestamo.
La diferencia es que el cap rate evalua el activo sin importar como se paga y el ROI evalua al inversor, donde si importa
como se paga (deuda, hipoteca, etc)


### 1.4 Casos resueltos

Convenciones de modelado para los casos:

- Los ingresos por alquiler se ajustan por vacancia (se cobran solo los meses ocupados)
- Los gastos operativos NO se ajustan por vacancia (los paga el propietario todo el año, esté ocupada o no)
- Convención conservadora estándar; si el contrato traslada expensas al inquilino, se ajustaría

#### Caso A · Departamento en Belgrano

**Datos:**
- Precio: USD 180.000
- Alquiler mensual: USD 600
- Expensas: USD 80/mes
- ABL: USD 90/trimestre
- Vacancia: 1 mes/año

**Cálculo paso a paso:**

Ingresos anuales (descontando vacancia): 600 × 11 = 6.600

Expensas anuales (se pagan los 12 meses, vacancia incluida): 80 × 12 = 960

ABL anual: 90 × 4 = 360

NOI = 6.600 - 960 - 360 = 5.280

Cap rate neto = 5.280 / 180.000 = 2,93%

#### Caso B · PH en Almagro
**Datos:**
- Precio: USD 130.000
- Alquiler mensual: USD 480
- Expensas: USD 0 (es PH)
- ABL: USD 60/trimestre
- Vacancia: 0.5 meses por año

**Cálculo paso a paso:**

Ingresos anuales (descontando vacancia): 480 × 12 - 480 × 0,5 = 5.520

Expensas anuales (se pagan los 12 meses, vacancia incluida) = 0

ABL anual: 60 × 4 = 240

NOI = 5.520 - 0 - 240 = 5.280

Cap rate neto = 5.280 / 130.000 = 4,06%

#### Caso C · Comparación Belgrano vs Almagro+PF

Si miramos solo renta anual del primer año, Almagro + plazo fijo rinde más (USD 7.280) que Belgrano solo (USD 5.280). Diferencia: USD 2.000.
Si incorporamos apreciación del activo (Belgrano ~3% anual, Almagro ~1% anual), Belgrano rinde más en ganancia total (USD 10.680 vs USD 8.580). Diferencia: USD 2.100 a favor de Belgrano.
Pero la comparación no termina ahí. Hay tres factores cualitativos que cap rate no captura:

- Liquidez: USD 50.000 en plazo fijo se retiran en 30 días; vender Belgrano lleva meses
- Riesgo: vacancia, morosidad, regulaciones cambiantes no aparecen en el cap rate
- Calidad del flujo: la rotación de inquilinos varía por barrio

Decisión para el motor: el Modo Inversor mostrará datos, no recomendaciones. No le diremos al usuario "comprá esto" sino "estos son los números, esta es la sensibilidad a supuestos, decidí vos".

### 1.5 Reflexión: cuándo usar cap rate vs ROI vs otra métrica

Cap Rate se utiliza cuando queremos comparar propiedades de forma rapida, saber si el precio de venta es justo, analizar el activo puro
ROI se utiliza si queremos ver la realidad de tu billetera, evaluar tu estrategia de financiamiento, comparar con otros negocios

### 1.6 Métricas consideradas para v2

Durante el estudio del dominio identifiqué dos métricas adicionales que 
son estándar en evaluación de inversiones inmobiliarias profesionales 
pero que decidí excluir de v1 por costo de implementación.

**TIR (Tasa Interna de Retorno)**

Es la rentabilidad promedio anual que genera el dinero que realmente permanece invertido en un proyecto, 
tomando en cuenta cuándo se cobra y cuándo se paga cada peso

Sirve para evaluar proyectos, te dice si una inversión es rentable 
(si su porcentaje supera lo que te cuesta pedir un préstamo o lo que ganarías en un banco).
También sirve para comparar alternativas, permite enfrentar proyectos totalmente distintos 
(por ejemplo, comprar un departamento versus comprar un bono) y saber cuál te dará más ganancias reales.

La TIR soluciona los problemas y limitaciones matemáticas que tienen el Cap rate y el ROI. 
Un inversor experimentado la prefiere por tres razones principales:
- Considera el factor tiempo (El dinero vale distinto): El ROI y el Cap rate tratan a todos los pesos por igual, 
sin importar cuándo ingresan. La TIR entiende que un peso ganado hoy vale más que un peso ganado dentro de 5 años.
- Considera todos los momentos de la inversión: El ROI te da una foto de la ganancia total, pero no te dice 
cuándo recuperaste tu capital inicial. La TIR calcula la rentabilidad teniendo en cuenta toda la "película": 
cuándo pusiste el dinero, cuánto recibes cada año y qué pasa al vender el activo (incluyendo la plusvalía).
- Mide el ciclo completo y permite comparar escenarios dispares: El Cap rate es un cálculo estático que solo mira 
el ingreso de un año asumiendo que se compró en efectivo, ignorando el paso de los años, las reformas o la venta final. 
La TIR mide todo el ciclo de vida de la inversión.

Por qué no entra en v1: requiere modelar flujo de caja período por 
período durante el horizonte completo de la inversión, y resolverse 
iterativamente (no tiene fórmula cerrada). Multiplica la complejidad 
del motor por 2-3×.

**VAN (Valor Actual Neto)**

Es un indicador que calcula cuánto dinero "de hoy" ganarás o perderás al realizar una inversión. 

Sirve para evaluar si un proyecto es viable y crea riqueza real (VAN positivo). 
Trae al presente todos los flujos de dinero futuros descontando el efecto del tiempo y el costo de oportunidad.

El Cap Rate mide la rentabilidad anual de una propiedad operando al contado. Sin embargo, el inversor usa el VAN 
para tener una visión estratégica más profunda:
- Valor del dinero en el tiempo: El Cap Rate trata a todos los flujos iguales, mientras que el VAN 
reconoce que $1.000 generados hoy valen más que $1.000 generados dentro de 10 años.
- Costo de endeudamiento: El VAN permite incorporar el costo de pedir dinero prestado y los impuestos, 
dando una cifra monetaria exacta de ganancia por encima de tus expectativas mínimas.
- Plazos largos: El Cap Rate es una "fotografía" estática a un año. El VAN es una "película" que considera 
toda la vida útil de la inversión, incluyendo costos de renovación futuros y el valor de venta final del activo.

Mientras el Cap Rate ayuda a comparar rápidamente el rendimiento operativo de propiedades en el mercado, 
el VAN determina en números exactos si toda la operación incrementará tu patrimonio.

Por qué no entra en v1: requiere proyectar flujos completos y elegir 
una tasa de descuento defendible (decisión no trivial en contexto 
argentino con tasas reales volátiles).

**Decisión:** ambas métricas quedan registradas en `scope.md` sección 
"v2 candidates" para evaluación al cierre del v1.


## 2. Contexto argentino

### 2.1 Bimonetarismo · precio USD, alquiler ARS

La propiedad se publica en USD pero el alquiler se paga en ARS debido al fenómeno del
Bimonetarismo. Esta disociación obliga a realizar dos supuestos financieros que no existen
en economías estables como Madrid o Miami: la elección del tipo de cambio para convertir el ingreso a USD, 
y la proyección de esa conversión durante la tenencia. Por lo tanto, el Cap Rate en USD no solo depende del 
ingreso neto sino también de si la devaluación del peso es mayor o menor que el aumento del alquiler.


#### 2.1.1 Fórmula central · cambio del alquiler en USD

Cuando el alquiler en pesos se ajusta a tasa i (típicamente ICL) y el peso 
se devalúa contra el USD a tasa d, el alquiler en USD se mueve según:

    U₁ / U₀ = (1 + i) / (1 + d)

Donde:
- U₀: alquiler en USD al inicio del período
- U₁: alquiler en USD al final del período  
- i: tasa de ajuste del alquiler (ej. ICL anual)
- d: tasa de devaluación nominal del peso vs USD

Esta fórmula deriva de la definición misma del tipo de cambio: 
alquiler_USD = alquiler_ARS / tipo_de_cambio. Si ambos términos se 
ajustan proporcionalmente, el cociente final es la división de los 
factores de ajuste.

Validación intuitiva:
- Si i > d, el alquiler en USD crece
- Si i < d, el alquiler en USD decrece  
- Si i = d, se mantiene

Esta fórmula es la piedra angular del motor para proyectar cap rate y ROI 
en USD bajo distintos escenarios macro. Se conecta con el concepto formal 
de paridad de poder adquisitivo (PPP) aplicado a un activo único.

### 2.2 ICL e IPC · los dos índices oficiales

Son índices utilizados en Argentina para el ajuste de contratos, y se diferencian en su composición:
- IPC (Índice de Precios al Consumidor): Mide la variación de precios de una canasta representativa de consumo, 
reflejando la pérdida de poder adquisitivo del dinero.
- ICL (Índice de Contratos de Locación): Es un índice publicado diariamente por el BCRA. 
Su fórmula combina el 50% de la variación del IPC y el 50% del RIPTE (Remuneración Imponible Promedio de los Trabajadores Estables), 
buscando reflejar la evolución de los precios junto con la de los salarios formales.

Diferencia clave: El IPC solo mide precios, mientras que el ICL combina precios (IPC) con salarios (RIPTE). 
Esto significa que, si la inflación supera a los salarios, el ICL queda por debajo del IPC, y el propietario pierde poder adquisitivo real.

Impacto del DNU 70/2023: Con la entrada en vigencia del DNU 70/2023, el uso del ICL dejó de ser obligatorio para los contratos de alquiler, permitiendo a las partes pactar libremente cualquier índice (o moneda) de ajuste.

Para el motor v1, utilicé ICL como proxy del ajuste real del alquiler porque es el dato público con mayor cobertura histórica.

### 2.3 Vacancia típica en CABA

Históricamente, la vacancia (el tiempo que una propiedad permanece desocupada entre contratos) 
promedia 1 a 2 meses entre contratos de 2-3 años. Esto se traduce en un rango de vacancia anual de aproximadamente 3% a 8%.

Este dato de vacancia se utiliza para calcular el ingreso real de una inversión, y proviene de la investigación de mercado que cruza datos de Zonaprop, La Nación y Reporte Inmobiliario.

### 2.4 Crédito UVA · cómo funciona

Explicación breve: UVA = Unidad de Valor Adquisitivo, se ajusta diariamente
con el IPC vía CER. Un crédito UVA presta una cantidad fija de UVAs; la 
cuota y el capital adeudado se mueven con el índice. Riesgo específico 
argentino: si la inflación supera al ajuste de salarios, la cuota sube 
más rápido que el ingreso del tomador.

#### 2.4.1 Decisión de modelado · UVA simplificado en v1

El crédito UVA real se denomina en UVAs, que se ajustan por CER (inflación 
en pesos). Para v1, lo modelamos como un crédito en USD a tasa fija (8% TNA), 
lo cual asume implícitamente que la UVA se mueve a la par del dólar 
(inflación = devaluación).

Esta simplificación tiene un error conocido: en períodos de atraso 
cambiario (inflación > devaluación), la cuota real en USD sube y encarece 
el crédito respecto a este modelo. En períodos de overshooting (devaluación > inflación), la cuota real en USD baja.

v2 modelaría la cuota en UVAs con proyección separada de inflación y 
devaluación. Ver scope.md sección "v2 candidates".

#### 2.4.2 Fórmula de cuota constante (sistema francés)

La cuota de un crédito de capital P, a tasa r por período, durante n períodos:

    C = P × [ r × (1+r)^n ] / [ (1+r)^n - 1 ]

Esta ecuación surge de igualar el capital prestado (\(P\)) con el valor presente de todas las cuotas futuras descontadas a la tasa de interés (\(r\)). Al agrupar estos pagos, se forma una serie geométrica finita cuya sumatoria resulta en la fórmula mencionada. Es el estándar en hipotecas, incluidos los créditos UVA.

Convención de tasa: el sistema financiero argentino publica TNA ). Para convertir a tasa mensual usamos división simple:
    r_mensual = TNA / 12

Casos de borde para testing:
- r = 0  →  C = P / n  (sin interés, cuotas iguales)
- n = 1  →  C = P × (1+r)  (pago único)

### 2.5 Supuestos default del motor v1

La siguiente tabla agrupa los supuestos default que usará el motor v1 para cada escenario:

| Variable                  | Conservador | Moderado | Agresivo  | Fuente                                        |
|---------------------------|-------------|----------|-----------|-----------------------------------------------|
| Vacancia anual            | 2 meses     | 1 mes    | 0,5 meses | Zonaprop abril 2026 (1-2 meses promedio CABA) |
| Inflación ARS esperada    | 35%         | 30%      | 25%       | INDEC IPC interanual + proyecciones REM 2026  |
| Devaluación esperada      | 30%         | 25%      | 20%       | BCRA + análisis de mercado                    |
| Apreciación barrio en USD | -2%         | +2,2%    | +5%       | Zonaprop CABA abril 2026 (+2,2% interanual)   |
| Tasa crédito UVA (TNA)    | 8%          | 8%       | 8%        | Bancos públicos mayo 2026                     |

Estos valores son defendibles para CABA en mayo 2026. 
Se ajustan en función de validación con corredor matriculado (sección 
4 del documento) y se exponen como configurables en futuras versiones del 
motor (v2).

### 2.6 Convención de modelado · ajustes a término medio

Cuando un valor (alquiler, costos) se ajusta a lo largo del año, modelamos 
su valor "promedio del año" como el punto medio entre el valor inicial y 
el final:

    valor_promedio = (valor_inicial + valor_final) / 2

Es la convención estándar usada por asesores financieros para comparaciones 
anuales. Alternativas evaluadas:
- Ajuste al inicio del año: sobrestima el ingreso (asume el valor final desde el día 1)
- Ajuste al final del año: subestima el ingreso (asume el valor inicial todo el año)

La convención de término medio balancea ambos extremos.

### 2.7 Casos resueltos · D y E

#### Caso D · Belgrano del Caso A con contexto argentino

**Datos:**
- Precio: USD 180.000 (no cambia entre A y D)
- Alquiler inicial: USD 600/mes (valor año 0)
- Expensas: USD 80/mes
- ABL: USD 90/trimestre
- Vacancia: 1 mes
- Inflación ARS: 30% anual
- Devaluación peso vs USD: 25% anual
- Ajuste alquiler (ICL proxy): 28% anual

**Paso 1. Alquiler en USD al final del año 1:**
    600 × (1+0,28) / (1+0,25) = 614,4 USD

**Paso 2. Alquiler promedio del año (término medio):**
    (600 + 614,4) / 2 = 607,2 USD/mes

**Paso 3. Ingresos anuales (descontando 1 mes de vacancia):**
    607,2 × 11 = 6.679,2 USD

**Paso 4. Gastos operativos anuales:**
    Expensas: 80 × 12 = 960
    ABL: 90 × 4 = 360
    Total: 1.320 USD

**Paso 5. NOI:**
    NOI = 6.679,2 - 1.320 = 5.359,2 USD

**Paso 6. Cap rate neto:**
    5.359,2 / 180.000 = 2,98%

**Reflexión:**
El cap rate subió ~0,05 puntos en un año, porque el ajuste de alquiler (28%) superó a la devaluación (25%). 
Si el escenario fuera distinto (por ejemplo, devaluación 35% e inflación 30%), el cap rate en USD habría caído, aunque el alquiler haya "subido" en pesos.
Esto es exactamente el insight que el motor tiene que comunicar al usuario. 
Y es lo que diferencia al Modo Inversor de cualquier calculadora simple: no calcula cap rate hoy, calcula cap rate proyectado en distintos contextos macro.

#### Caso E · Belgrano con crédito UVA

**Datos del crédito:**
- Entrega: 30% al contado = 54.000 USD
- Crédito: 70% = 126.000 USD
- Plazo: 20 años (240 meses)
- TNA: 8%

**Paso 1. Cuota del crédito:**

    r_mensual = 0,08 / 12 = 0,006667
    n = 240 meses
    
    Cuota mensual = 126.000 × 0,006667 × (1,006667)^240 / ((1,006667)^240 - 1)
                  ≈ 1.054 USD/mes
    
    Cuota anual = 1.054 × 12 ≈ 12.647 USD/año

**Paso 2. Flujo de caja operativo del año:**

    Ingresos (del Caso D): 6.679,2
    Gastos operativos: -1.320
    Cuota anual del crédito: -12.647
    Flujo de caja neto: -7.288 USD

El flujo de caja operativo te da negativo. O sea, lo que cobrás de alquiler no alcanza para cubrir gastos + cuota del crédito.
Eso no es un error de cálculo. Es la realidad de comprar con crédito en Argentina: el alquiler rara vez cubre la cuota hipotecaria. 
El inversor apalancado pone plata de su bolsillo cada mes apostando a que la apreciación del activo compense.

**Paso 3. Apreciación del activo:**

    180.000 × 2,2% = 3.960 USD

Importante: la apreciación es sobre el activo completo (180.000), no sobre 
el aporte del inversor (54.000). El inversor controla todo el activo 
aunque solo puso una parte. Eso es el efecto del apalancamiento.

**Paso 4. Ganancia total del año:**

    -7.288 + 3.960 = -3.328 USD

**Paso 5. ROI del inversor:**

    -3.328 / 54.000 = -6,16%

#### Comparación contado vs crédito

| Escenario apreciación | Contado (180k invertido) | Crédito (54k invertido) |
|-----------------------|--------------------------|-------------------------|
| 2,2% (moderado)       | +5,18%                   | -6,16%                  |
| 5% (agresivo)         | +7,98%                   | +3,17%                  |
| Cambio en ROI         | +2,8 puntos              | +9,33 puntos            |

**Reflexión final · concepto de leverage ratio**

El apalancamiento amplifica la sensibilidad del ROI a cambios en la 
apreciación del activo, en un factor exactamente igual al leverage ratio.
El ROI del inversor apalancado es ~3,33 veces más sensible a cambios en 
la apreciación que el ROI del inversor al contado

Leverage ratio = Valor del activo / Capital propio = 180.000 / 54.000 = 3,33×

Eso explica matemáticamente la tabla: el cambio del ROI con crédito es 
3,33× el cambio del ROI al contado (9,33 / 2,8 ≈ 3,33).

**Implicancias para el motor:**

- El cap rate del activo es el mismo en ambos casos (2,98%), porque mide 
  el rendimiento del activo, no del inversor
- El ROI cambia drásticamente con apalancamiento, porque mide el 
  rendimiento del aporte propio
- El motor debe mostrar ambas métricas separadas, no fundidas, para que 
  el usuario entienda qué está midiendo cada una
- En escenarios con crédito, el motor debe enfatizar la mayor sensibilidad 
  como señal de mayor riesgo, no solo de mayor ganancia potencial
- La decisión de apalancarse depende crucialmente de la apreciación 
  esperada: con apreciación baja, el crédito destruye valor; con 
  apreciación alta, lo multiplica


## 3. Escenarios del motor

[Sección a completar durante Día 3 del curriculum de Fase 1.]

### 3.1 Por qué tres escenarios y no un único número

Elegi 3 escenarios porque calcular cap rate con un solo numero da una falsa sensacion de precisión que el contexto
argentino (con volatilidad macro alta) no soporta. Mostrar un rango comunica honestamente la incertidumbre del modelo.

Ahora bien, elegí 3 en lugar de más porque 3 son los puntos mínimos para definir un rango con un centro 
(peor caso, caso base, mejor caso). Aumentar a 5 o 7 agrega mas detalle pero introduce categorías intermedias difíciles de comunicar, 
me obliga a definir, por ejemplo, "moderadamente conservador" y "moderadamente agresivo", que son categorías difíciles de 
describir con palabras claras y de comunicar a un usuario. Entonces con 3 no tengo redundancia en la clasificación.

Estos 3 escenarios me refiero a que los mismos clasifican supuestos macros sobre el futuro, no
son atributos del activo ni perfiles de inversión, este último lo podríamos a agregar a una V2 pero como un eje independiente


### 3.2 Variables que varían entre escenarios

Las variables que se mueven entre escenario son:
- Vacancia
- Inflación
- Devaluación
- Apreciación del barrio

Si bien tanto las que varían como las que no dependen de la macro, la diferencia es que las que varían 
entre escenarios son proyecciones sobre el futuro, mientras que las que no varían son los inputs del análisis: 
qué se está evaluando. El precio de la propiedad, por ejemplo, también es sensible a la macro, pero cambiarlo 
entre escenarios cambiaría la pregunta del análisis: ya no estaríamos evaluando esta propiedad a este precio, 
estaríamos evaluando una propiedad distinta. Lo mismo aplica a expensas, m² y alquiler inicial: son datos 
del activo en el momento de evaluación. Los escenarios proyectan el futuro a partir de esos inputs fijos.

Estas variables no son independientes: cuando el peso se devalúa, los costos de construcción y el valor 
de las propiedades varían, lo que empuja hacia arriba la inflación general y altera la vacancia ya que 
menos personas pueden acceder a la compra, volcándose al mercado de alquileres.

Ahora vamos a justificar variable por variable los valores de la tabla 2.5, empezando por Vacancia. Actualmente no existe estadistica publica sobre este dato 
en CABA. Ninguna de las fuentes publica el tiempo promedio entre que se deshabita un inmueble hasta que se vuelva a habitar. De hecho, Zonaprop asume 0% de vacancia. 
El rango de "1-2 meses" que circula entre brokers es mas convención de mercado que dato medido.

Por lo tanto, ante la ausencia de un dato confiable, construí el rango de vacancia del motor por triangulación a partir de datos de ofertas que sí existen:

- Conservador (2 meses): es el peor caso real donde las expectativas del inversor no se cumplen, es un escenario prudente. Para este escenario, 
el motor se configura con 2 meses como techo viniendo del rango que manejan los brokers (1-2) y porque un 16.6% de pérdida es malo pero realista. Al mismo 
se llega cuando hay un desacople entre alquileres e ingreso y las personas no pueden alquilar en determinados lugares.
- Moderado (1 mes): para este escenario, el motor se configura con 1 mes bajo la información que manejan los brokers ademas porque un 8.33% de pérdida lo califico como una pérdida moderada. Si bien la oferta de alquileres triplicó el piso desde 2023, la demanda sigue solida, por lo que la diferencia entre alquileres e ingresos no es critica y el mercado se sigue absorbiendo con dicha demanda. 
Cuando el inversor recien entra se muestra con el valor 1 porque es el valor por default, el valor base, de hecho es lo que usualmente busca primero: lo mas probable
- Agresivo (0.5 meses): es el mejor caso real. En este caso tenemos una pérdida del 4.16% donde el motor se configura con 0.5 meses basado en la información de piso de oferta de 2023 y porque suponer un 0 supone un 0% de pérdida que es un caso ideal y nosotros buscamos acercarnos a la realidad. Siempre hay una fricción mínima aunque nos encontremos en el mejor mercado posible y se da simplemente por los tiempos burocráticos de cualquier mudanza. Por otro lado, este escenario ocurre cuando hay una demanda superior a la oferta posiblemente vinculado a que las propiedades se colocan rapido porque hay muchos buscadores comparados con lo que se ofrece

Limitación: estos valores son supuestos del modelo basados en triangulación, no en medición directa. Es por eso que la validación con corredor matriculado (sección 4) será especialmente importante para ajustar este rango si los datos cualitativos del campo lo sugieren.

Nota sobre los límites del modelo: la vacancia podría escalar más allá de 2 meses en escenarios de crisis sistémica: una devaluación abrupta del peso, por ejemplo, generaría una inflación descontrolada y aumentaría la oferta de inmuebles sin alquilar al mercado. Estos casos quedan fuera del scope porque

### 3.3 Estructura del motor de cálculo

El motor recibe los datos de una propiedad y supuestos macro, y devuelve métricas financieras calculadas en paralelo para los tres escenarios (Conservador, Moderado, Agresivo). El cap rate es siempre del activo (igual en los tres escenarios si los inputs operativos no cambian); el ROI varía según escenario porque depende de los supuestos macro y del apalancamiento.

#### 3.3.1 Inputs del caller

> **Convención de nombres del contrato.** Los nombres de campo siguen la convención del
> código (`src/engine/types.ts`): conceptos financieros universales en inglés
> (`purchasePriceUSD`, `monthlyRentUSD`), términos propios de Argentina sin traducir
> (`expensasMonthlyUSD`, `ablQuarterlyUSD`). Las tasas anuales usan el sufijo `Annual`.
> Todos los cap rates son **ratios decimales** (0.048 = 4,8 %); el ×100 para mostrar se hace en la UI.

El motor tiene un único punto de entrada, `analyzeProperty(input: EngineInput)`, que agrupa los
inputs en cuatro bloques (no son campos planos):

```ts
analyzeProperty({
  property,      // PropertyInput     - datos del activo (siempre)
  neighborhood,  // NeighborhoodInput - datos del barrio (siempre)
  funding,       // FundingDetails    - crédito + aporte propio (opcional)
  scenarios,     // ScenarioInputs    - supuestos macro (opcional; defaults sección 2.5)
})
```

**Datos del activo · `property` (siempre requerido)**

| Campo                | Tipo   | Descripción                                        | Ejemplo |
|----------------------|--------|----------------------------------------------------|---------|
| `purchasePriceUSD`   | number | Precio de venta de la propiedad                    | 180000  |
| `monthlyRentUSD`     | number | Alquiler mensual estimado al momento de evaluación | 600     |
| `expensasMonthlyUSD` | number | Expensas mensuales del consorcio (término AR)      | 80      |
| `ablQuarterlyUSD`    | number | ABL trimestral (término AR)                        | 90      |

La vacancia NO vive acá: es una proyección sobre el futuro que varía entre escenarios (sección 3.2),
así que se pasa dentro de cada `scenarios.*` (ver abajo).

**Datos del barrio · `neighborhood` (siempre requerido)**

| Campo           | Tipo   | Descripción                                 | Ejemplo |
|-----------------|--------|---------------------------------------------|---------|
| `medianCapRate` | number | Cap rate mediano del barrio (ratio decimal) | 0.048   |

**Datos del crédito · `funding` (opcional, solo con apalancamiento)**

El crédito se anida en `funding.loan`; el aporte propio cuelga directo de `funding`:

| Campo                            | Tipo   | Descripción                                   | Ejemplo |
|----------------------------------|--------|-----------------------------------------------|---------|
| `funding.loan.principalUSD`      | number | Capital prestado (P en la fórmula, sec. 2.4.2)| 126000  |
| `funding.loan.nominalRateAnnual` | number | Tasa Nominal Anual del crédito (TNA), decimal | 0.08    |
| `funding.loan.termMonths`        | number | Plazo del crédito en meses                    | 240     |
| `funding.downPaymentUSD`         | number | Capital propio que pone el inversor (entrega) | 54000   |

**Supuestos macro por escenario · `scenarios` (opcional, usa defaults de sección 2.5 si se omite)**

`scenarios` es un objeto con tres claves (`conservative`, `moderate`, `aggressive`); cada una es
un `MacroAssumptions` con estos campos:

| Campo                            | Tipo   | Conservador | Moderado | Agresivo |
|----------------------------------|--------|-------------|----------|----------|
| `vacancyMonths`                  | number | 2           | 1        | 0.5      |
| `rentAdjustmentAnnual`           | number | 0.32        | 0.28     | 0.24     |
| `devaluationAnnual`              | number | 0.30        | 0.25     | 0.20     |
| `neighborhoodAppreciationAnnual` | number | -0.02       | 0.022    | 0.05     |

> **`inflationAnnual` no es input del motor v1.** La tabla de sección 2.5 la lista, pero ningún
> cálculo de v1 la consume: el ajuste del alquiler usa `rentAdjustmentAnnual` (proxy ICL)
> directamente. Por eso `MacroAssumptions` no la incluye. Entraría en v2 si se modela la cuota UVA
> en pesos (sección 2.4.1).

**Meta**

> **`horizonYears` no es input del motor v1.** El horizonte está fijo en 1 año (toda la proyección
> es anual), así que `EngineInput` no expone el campo todavía. Se agregará cuando v2 soporte
> horizontes multi-año (requisito de TIR/VAN, sección 1.6).

#### 3.3.2 Outputs del motor

El motor devuelve un objeto con tres escenarios en paralelo. Cada escenario contiene las mismas métricas, calculadas con sus propios supuestos macro.

**Por cada escenario (Conservador / Moderado / Agresivo)**

| Campo                        | Tipo   | Descripción                                                  | Cálculo / Referencia                       |
|------------------------------|--------|--------------------------------------------------------------|--------------------------------------------|
| `rentUSDEndOfYear1`          | number | Alquiler proyectado al cierre del año 1                      | U₀ × (1+i)/(1+d) (sección 2.1.1)                  |
| `averageMonthlyRentUSD`      | number | Alquiler promedio del año (término medio)                    | (U₀ + U₁) / 2 (sección 2.6)                       |
| `grossAnnualIncomeUSD`       | number | Ingreso anual sin descuento de vacancia                      | promedio × 12                              |
| `effectiveAnnualIncomeUSD`   | number | Ingreso anual descontando vacancia                           | promedio × (12 − vacancia)                 |
| `expensasAnnualUSD`          | number | Expensas anualizadas (término AR)                            | expensas × 12                              |
| `ablAnnualUSD`               | number | ABL anualizado (término AR)                                  | abl × 4                                    |
| `totalOperatingExpensesUSD`  | number | Suma de expensas y ABL anuales                               | expensas anuales + ABL anual               |
| `noiUSD`                     | number | Net Operating Income                                         | ingresos netos − gastos operativos         |
| `grossCapRate`               | number | Cap rate sobre ingreso bruto (ratio decimal)                 | bruto / precio (sección 1.1)                      |
| `netCapRate`                 | number | Cap rate sobre NOI (ratio decimal)                           | NOI / precio (sección 1.1)                        |
| `assetAppreciationUSD`       | number | Ganancia por apreciación del activo                          | precio × tasaApreciacion (sección 2.7)            |
| `spreadVsNeighborhoodMedian` | number | Diferencia entre `netCapRate` y mediana (ratio; ×100 = pts %)| netCapRate − neighborhoodMedianCapRate     |
| `positionVsMedian`           | enum   | Posición vs mediana del barrio                               | `ABOVE`, `AT`, `BELOW`                     |

**Outputs adicionales cuando hay crédito (anidados dentro de cada escenario)**

| Campo                   | Tipo   | Descripción                           | Cálculo / Referencia       |
|-------------------------|--------|---------------------------------------|----------------------------|
| `monthlyLoanPaymentUSD` | number | Cuota mensual del crédito             | Fórmula francés (sección 2.4.2)   |
| `annualDebtServiceUSD`  | number | Cuota anualizada                      | mensual × 12               |
| `netAnnualCashFlowUSD`  | number | Flujo de caja después de cuota        | NOI − cuota anual          |
| `totalAnnualGainUSD`    | number | Ganancia total del año                | flujo + apreciación        |
| `investorRoiAnnual`     | number | ROI del inversor sobre capital propio | ganancia / downPayment     |
| `leverageRatio`         | number | Ratio de apalancamiento               | precio / downPayment (sección 2.7)|

#### 3.3.3 Decisiones de contrato

- **Expensas y ABL como inputs separados**: el motor los anualiza con reglas distintas (expensas × 12 porque son mensuales, ABL × 4 porque es trimestral) y los suma internamente. No se reciben pre-sumados para mantener la trazabilidad del cálculo.
- **Supuestos macro opcionales con defaults**: si el caller no pasa los supuestos, el motor usa los defaults de la tabla sección 2.5. Si se pasan, el caller debe enviar el set completo de las cinco variables por escenario.
- **Crédito opcional**: si el caller no pasa los datos del crédito (`downPaymentUSD`, `termMonths`, `nominalRateAnnual`), los campos relacionados (cuota, flujo, ROI, leverage) no se incluyen en el output. El `netCapRate` no cambia con o sin crédito porque mide el rendimiento del activo, no del inversor.
- **Output estructurado por escenario**: el motor no devuelve un único número, devuelve las métricas calculadas para los tres escenarios en paralelo (ver sección 3.1). El cliente decide cuál mostrar primero (por default el Moderado, ver sección 3.2 Vacancia).
- **Cap rate del barrio como input**: en v1, el cap rate mediano del barrio se pasa como input al motor. En v2, el motor podría calcularlo internamente consultando una tabla de comparables del barrio.
  - **Requerimiento de dato para la UI (v2)**: la comparación con el barrio en el Modo Inversor pasó de "dos barras desde cero" a una **línea de posición + percentil** ("rendís menos que ~7 de cada 10 del barrio"). Eso necesita que el motor exponga la **distribución del barrio**, no solo la mediana: mínimo, máximo (o rango intercuartil) y el **percentil** de esta propiedad dentro de los comparables en venta. Con solo la mediana, la UI se limita a una vista de divergencia (gap vs. mediana). Ver `docs/design.md` → capa "Comparar con el barrio".

### 3.4 Test de auto-validación del dominio

[Por completar al cierre de Día 4: tres explicaciones a alguien sin 
background financiero (cap rate, escenarios, por qué el crédito 
amplifica). Si pasa el test, dominio listo para Fase 2.]

## 4. Validación externa

### 4.1 Conversación con corredor matriculado

**Estado:** Pendiente. Llamada agendada para [fecha cuando la consigas], 
previo al cierre de Día 4 del curriculum de Fase 1.

**Objetivos de la validación:**

- Confirmar fórmula de cap rate neto usada en el mercado real argentino
- Validar qué gastos se descuentan típicamente del NOI (más allá de 
  expensas y ABL)
- Confirmar rango de vacancia esperada por barrio (foco en los 8 barrios 
  del dataset semilla)
- Validar tasa de apreciación esperada en USD para Belgrano y barrios 
  premium vs barrios de mayor rentabilidad
- Validar la simplificación del UVA descrita en 2.4.1 (modelarlo como 
  crédito en USD a 8% TNA)
- Identificar métricas o ajustes de modelado que el motor v1 no contempla 
  y debería contemplar

### 4.2 Cambios aplicados post-validación

[Sección a completar después de la llamada. Cada cambio en supuestos 
default, fórmulas, o convenciones debe registrarse aquí con: qué se 
modificó, por qué, y referencia a la conversación.]

### 4.3 Disclaimers sugeridos para el producto final

[Sección a completar después de la llamada. Cualquier advertencia que 
el corredor sugiera incluir en la UI del Modo Inversor para usuarios 
finales, típicamente del estilo "estimaciones basadas en datos públicos, 
no constituyen asesoramiento financiero".]


## 5. Referencias

### Fuentes de datos cuantitativos

- **INDEC · Índice de Precios al Consumidor (IPC)**: serie histórica utilizada para proyecciones de inflación.
  - [Portal del INDEC](https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31)
  - [Serie histórica en Excel](https://www.indec.gob.ar/ftp/cuadros/economia/sh_ipc_05_26.xls)
  - [Serie histórica en CSV](https://www.indec.gob.ar/ftp/cuadros/economia/serie_ipc_divisiones.csv)

- **BCRA · Índice de Contratos de Locación (ICL)**: serie diaria utilizada como proxy de ajuste real de alquileres.
  - [Serie del ICL](https://www.bcra.gob.ar/principales-variables-datos/?serie=7988)
  - [Portal de estadísticas e indicadores del BCRA](https://www.bcra.gob.ar/estadisticas-indicadores/)

- **Zonaprop · Reporte de mercado CABA abril 2026**: fuente de cap rate por barrio, vacancia promedio y apreciación interanual del USD/m².
  - [Rentabilidad CABA](https://www.zonaprop.com.ar/blog/zpindex/caba-rentabilidad/)
  - [Índice general · venta, alquiler y rentabilidad por región](https://www.zonaprop.com.ar/blog/zpindex/)
  - [Índice de alquiler CABA](https://www.zonaprop.com.ar/blog/zpindex/caba-alquiler/)

- **Reporte Inmobiliario · informes trimestrales 2025-2026**: fuente de USD/m² histórico por barrio.
  - [Portal de Reporte Inmobiliario](https://www.reporteinmobiliario.com)

- **La Nación · cobertura de mercado inmobiliario 2026**: validación cruzada de cap rates por barrio.
  - [Rentabilidad de alquileres en CABA · 24/05/2026](https://www.lanacion.com.ar/propiedades/inversiones/rentabilidad-de-alquileres-en-caba-cuales-son-los-barrios-que-mas-pagan-nid24052026/)
  - [Claves para entender al nuevo mercado inmobiliario · 12/05/2026](https://www.lanacion.com.ar/propiedades/casas-y-departamentos/claves-para-entender-al-nuevo-mercado-inmobiliario-los-precios-no-despegan-y-comprar-para-alquilar-nid05052026/)
  - [Qué tipo de departamento conviene comprar para alquilar · 25/05/2026](https://www.lanacion.com.ar/propiedades/casas-y-departamentos/que-tipo-de-departamento-conviene-comprar-para-alquilar-en-mayo-2026-nid25052026/)

### Fuentes conceptuales

- **Investopedia · Capitalization Rate (Cap Rate)**: definición canónica internacional, base para la adaptación al contexto argentino.
  - [Cap Rate · Investopedia](https://www.investopedia.com/terms/c/capitalizationrate.asp)

- **Paridad de Poder Adquisitivo (PPP)**: concepto formal subyacente a la fórmula 2.1.1.
  - [Purchasing Power Parity · Investopedia](https://www.investopedia.com/terms/p/purchasingpowerparity.asp)

### Marco regulatorio

- **DNU 70/2023**: modifica la Ley de Alquileres 27.551, libera la elección de índices y moneda.
  - [Texto del DNU · Boletín Oficial](https://www.boletinoficial.gob.ar/detalleAviso/primera/300484/20231220)
  - [Texto del DNU · InfoLeg](https://www.infoleg.gob.ar/infolegInternet/anexos/390000-394999/392360/norma.htm)

- **Ley 27.551** (derogada parcialmente por el DNU 70/2023): marco previo.
  - [Texto de la Ley · InfoLeg](https://www.infoleg.gob.ar/infolegInternet/anexos/335000-339999/338741/norma.htm)
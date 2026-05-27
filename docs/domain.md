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

Liquidez: USD 50.000 en plazo fijo se retiran en 30 días; vender Belgrano lleva meses
Riesgo: vacancia, morosidad, regulaciones cambiantes no aparecen en el cap rate
Calidad del flujo: la rotación de inquilinos varía por barrio

Decisión para el motor: el Modo Inversor mostrará datos, no recomendaciones. No le diremos al usuario "comprá esto" sino "estos son los números, esta es la sensibilidad a supuestos, decidí vos".

### 1.5 Reflexión: cuándo usar cap rate vs ROI vs otra métrica

Cap Rate se utiliza cuando queremos comparar propiedades de forma rapida, saber si el precio de venta es justo, analizar el activo puro
ROI se utiliza si queremos ver la realidad de tu billetera, evaluar tu estrategia de financiamiento, comparar con otros negocios

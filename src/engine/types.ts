/**
 * Tipos del motor de Modo Inversor.
 *
 * Convención de nombres:
 * - Conceptos financieros universales → inglés (purchasePriceUSD, monthlyRentUSD, capRateNet, noi).
 * - Términos propios de Argentina → se mantienen en su nombre real, sin traducir
 *   (expensasMonthlyUSD, ablQuarterlyUSD; más adelante icl, uva).
 * - Las tasas anuales usan el sufijo `Annual`. Los cap rates son ratios decimales (0.048 = 4,8 %).
 *
 * @see domain.md sección 3.3 (contrato del motor).
 */

/**
 * Datos del activo (intrínsecos, independientes del escenario).
 *
 * La vacancia NO vive acá: es una proyección sobre el futuro que varía entre escenarios
 * (ver MacroAssumptions y domain.md sección 3.2).
 */
export type PropertyInput = {
  /** Precio de compra de la propiedad, en USD. */
  purchasePriceUSD: number;
  /** Alquiler mensual estimado al momento de evaluación, en USD. */
  monthlyRentUSD: number;
  /** Expensas mensuales del consorcio, en USD (término argentino, sin traducir). */
  expensasMonthlyUSD: number;
  /** ABL trimestral, en USD (término argentino, sin traducir). */
  ablQuarterlyUSD: number;
};

/** Datos del barrio para comparar el rendimiento del activo. */
export type NeighborhoodInput = {
  /** Cap rate mediano del barrio (ratio decimal, ej. 0.048 = 4,8 %). @see domain.md sección 3.3.1 */
  medianCapRate: number;
};

/**
 * Supuestos macroeconómicos que proyectan los inputs hacia el futuro (un escenario).
 *
 * @see domain.md sección 2.5 (defaults por escenario) y sección 3.2 (variables que varían entre escenarios).
 */
export type MacroAssumptions = {
  /** Meses de vacancia esperados en el año (ej. 1 = un mes sin alquilar). @see domain.md sección 3.2 */
  vacancyMonths: number;
  /** Tasa de ajuste anual del alquiler, proxy ICL. Ej. 0.28 = 28 %. @see domain.md sección 2.1.1 */
  rentAdjustmentAnnual: number;
  /** Tasa de devaluación anual del peso vs USD. Ej. 0.25 = 25 %. @see domain.md sección 2.1.1 */
  devaluationAnnual: number;
  /** Tasa de apreciación anual del barrio en USD. Ej. 0.022 = 2,2 %. @see domain.md sección 2.5 y sección 2.7 Caso E */
  neighborhoodAppreciationAnnual: number;
};

/** Términos de un crédito hipotecario (sistema francés). @see domain.md sección 2.4.2 */
export type LoanInput = {
  /** Capital prestado (P en la fórmula), en USD. */
  principalUSD: number;
  /** Tasa nominal anual del crédito (TNA), como decimal. Ej. 0.08 = 8 %. */
  nominalRateAnnual: number;
  /** Plazo del crédito en meses (n). Ej. 240 = 20 años. */
  termMonths: number;
};

/** Estructura de financiación del inversor (crédito + aporte propio). */
export type FundingDetails = {
  /** Crédito hipotecario. */
  loan: LoanInput;
  /** Capital propio que el inversor pone de su bolsillo (entrega), en USD. @see domain.md sección 3.3.1 */
  downPaymentUSD: number;
};

/** Los tres escenarios macro que el motor calcula en paralelo. @see domain.md sección 3.1 */
export type ScenarioInputs = {
  conservative: MacroAssumptions;
  moderate: MacroAssumptions;
  aggressive: MacroAssumptions;
};

/** Input completo del motor. Los supuestos macro son opcionales (usa defaults de sección 2.5 si se omiten). */
export type EngineInput = {
  property: PropertyInput;
  neighborhood: NeighborhoodInput;
  /** Financiación opcional. Si se omite, el output no incluye las métricas de crédito. */
  funding?: FundingDetails;
  /** Supuestos macro por escenario. Si se omiten, el motor usa los defaults de domain.md sección 2.5. */
  scenarios?: ScenarioInputs;
};

/**
 * Desglose operativo anual de un escenario: ingresos, gastos y NOI.
 * Campos intermedios expuestos para mantener la trazabilidad del cálculo (domain.md sección 3.3.3).
 */
export type OperatingBreakdown = {
  /** Ingreso anual sin descuento de vacancia (promedio × 12). */
  grossAnnualIncomeUSD: number;
  /** Ingreso anual descontando vacancia (promedio × (12 − vacancia)). */
  effectiveAnnualIncomeUSD: number;
  /** Expensas anualizadas (mensuales × 12). */
  expensasAnnualUSD: number;
  /** ABL anualizado (trimestral × 4). */
  ablAnnualUSD: number;
  /** Suma de expensas y ABL anuales. */
  totalOperatingExpensesUSD: number;
  /** Net Operating Income (ingreso efectivo − gastos operativos). */
  noiUSD: number;
};

/** Posición del cap rate del activo respecto de la mediana del barrio. @see domain.md sección 3.3.2 */
export type MedianPosition = "ABOVE" | "AT" | "BELOW";

/** Métricas adicionales cuando hay crédito (anidadas dentro de cada escenario). @see domain.md sección 3.3.2 */
export type FinancingMetrics = {
  /** Cuota mensual del crédito (sistema francés). */
  monthlyLoanPaymentUSD: number;
  /** Cuota anualizada (mensual × 12). */
  annualDebtServiceUSD: number;
  /** Flujo de caja después de la cuota (NOI − cuota anual). */
  netAnnualCashFlowUSD: number;
  /** Ganancia total del año (flujo de caja + apreciación). */
  totalAnnualGainUSD: number;
  /** ROI del inversor sobre el capital propio (ganancia / downPayment). */
  investorRoiAnnual: number;
  /** Ratio de apalancamiento (precio / downPayment). @see domain.md sección 2.7 */
  leverageRatio: number;
};

/** Métricas calculadas para un escenario. @see domain.md sección 3.3.2 */
export type ScenarioMetrics = OperatingBreakdown & {
  /** Alquiler en USD proyectado al cierre del año 1. @see domain.md sección 2.1.1 */
  rentUSDEndOfYear1: number;
  /** Alquiler promedio mensual del año (término medio). @see domain.md sección 2.6 */
  averageMonthlyRentUSD: number;
  /** Cap rate sobre ingreso bruto (ratio decimal). */
  grossCapRate: number;
  /** Cap rate sobre NOI (ratio decimal). */
  netCapRate: number;
  /** Ganancia por apreciación del activo (precio × tasa de apreciación). */
  assetAppreciationUSD: number;
  /** Diferencia entre netCapRate y la mediana del barrio (ratio; ×100 = puntos %). */
  spreadVsNeighborhoodMedian: number;
  /** Posición del activo respecto de la mediana del barrio. */
  positionVsMedian: MedianPosition;
  /** Métricas de crédito. Presente solo si el caller pasó `funding`. */
  financing?: FinancingMetrics;
};

/** Output del motor: los tres escenarios calculados en paralelo. @see domain.md sección 3.3.2 */
export type EngineOutput = {
  conservative: ScenarioMetrics;
  moderate: ScenarioMetrics;
  aggressive: ScenarioMetrics;
};

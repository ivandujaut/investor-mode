/**
 * Motor de cálculo del Modo Inversor: API pública.
 *
 * Punto de entrada principal: `analyzeProperty(input)` → métricas de los 3 escenarios
 * (Conservador / Moderado / Agresivo) en paralelo. Lógica pura, sin UI.
 *
 * @see docs/domain.md sección 3.3 (contrato del motor).
 */

// Entrada principal
export { analyzeProperty, DEFAULT_SCENARIOS } from "./engine";

// Helpers "à la carte" (una métrica sola, sin correr los 3 escenarios)
export { calcNetCapRate, calcProjectedNetCapRate, calcProjectedNOI } from "./capRate";
export { calcMonthlyPayment } from "./finance";
export { calcCashROI, calcLeveragedROI } from "./roi";

// Contrato de tipos
export type {
  EngineInput,
  EngineOutput,
  ScenarioInputs,
  ScenarioMetrics,
  PropertyInput,
  NeighborhoodInput,
  MacroAssumptions,
  LoanInput,
  FundingDetails,
  OperatingBreakdown,
  FinancingMetrics,
  MedianPosition,
} from "./types";

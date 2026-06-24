import { calcOperatingBreakdown, projectRent } from "./capRate";
import { computeFinancing } from "./finance";
import type {
  EngineInput,
  EngineOutput,
  FundingDetails,
  MacroAssumptions,
  MedianPosition,
  NeighborhoodInput,
  PropertyInput,
  ScenarioInputs,
  ScenarioMetrics,
} from "./types";

/**
 * Supuestos macro default por escenario.
 * Inflación se omite a propósito: ningún cálculo de v1 la consume (el ajuste del alquiler
 * usa rentAdjustmentAnnual como proxy ICL).
 *
 * @see domain.md sección 2.5 (tabla de supuestos default).
 */
export const DEFAULT_SCENARIOS: ScenarioInputs = {
  conservative: {
    vacancyMonths: 2,
    rentAdjustmentAnnual: 0.32,
    devaluationAnnual: 0.3,
    neighborhoodAppreciationAnnual: -0.02,
  },
  moderate: {
    vacancyMonths: 1,
    rentAdjustmentAnnual: 0.28,
    devaluationAnnual: 0.25,
    neighborhoodAppreciationAnnual: 0.022,
  },
  aggressive: {
    vacancyMonths: 0.5,
    rentAdjustmentAnnual: 0.24,
    devaluationAnnual: 0.2,
    neighborhoodAppreciationAnnual: 0.05,
  },
};

/** Tolerancia para clasificar "AT": ±0,05 puntos porcentuales (0.0005 en ratio). */
const MEDIAN_TOLERANCE = 0.0005;

function classifyPosition(spread: number): MedianPosition {
  if (spread > MEDIAN_TOLERANCE) return "ABOVE";
  if (spread < -MEDIAN_TOLERANCE) return "BELOW";
  return "AT";
}

/**
 * Motor de cálculo del Modo Inversor.
 *
 * Recibe los datos de una propiedad + barrio (y opcionalmente la financiación) y devuelve
 * las métricas financieras calculadas en paralelo para los tres escenarios macro
 * (Conservador, Moderado, Agresivo). Si no se pasan supuestos macro, usa los defaults de sección 2.5.
 *
 * El cap rate es del activo; el ROI varía por escenario porque depende de los supuestos macro
 * y del apalancamiento.
 *
 * @see domain.md sección 3.3 (estructura y contrato del motor).
 */
export function analyzeProperty(input: EngineInput): EngineOutput {
  const scenarios = input.scenarios ?? DEFAULT_SCENARIOS;
  const compute = (macro: MacroAssumptions) =>
    computeScenario(input.property, input.neighborhood, macro, input.funding);

  return {
    conservative: compute(scenarios.conservative),
    moderate: compute(scenarios.moderate),
    aggressive: compute(scenarios.aggressive),
  };
}

function computeScenario(
  property: PropertyInput,
  neighborhood: NeighborhoodInput,
  macro: MacroAssumptions,
  funding?: FundingDetails,
): ScenarioMetrics {
  const { rentUSDEndOfYear1, averageMonthlyRentUSD } = projectRent(property, macro);
  const breakdown = calcOperatingBreakdown(averageMonthlyRentUSD, property, macro.vacancyMonths);

  const grossCapRate = breakdown.grossAnnualIncomeUSD / property.purchasePriceUSD;
  const netCapRate = breakdown.noiUSD / property.purchasePriceUSD;
  const assetAppreciationUSD = property.purchasePriceUSD * macro.neighborhoodAppreciationAnnual;
  const spreadVsNeighborhoodMedian = netCapRate - neighborhood.medianCapRate;

  const financing = funding
    ? computeFinancing({
        noiUSD: breakdown.noiUSD,
        assetAppreciationUSD,
        purchasePriceUSD: property.purchasePriceUSD,
        funding,
      })
    : undefined;

  return {
    rentUSDEndOfYear1,
    averageMonthlyRentUSD,
    ...breakdown,
    grossCapRate,
    netCapRate,
    assetAppreciationUSD,
    spreadVsNeighborhoodMedian,
    positionVsMedian: classifyPosition(spreadVsNeighborhoodMedian),
    financing,
  };
}

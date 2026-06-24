import { calcProjectedNetCapRate, calcProjectedNOI } from "./capRate";
import { computeFinancing } from "./finance";
import type { FundingDetails, MacroAssumptions, PropertyInput } from "./types";

/**
 * ROI del inversor al contado (sin crédito): cap rate proyectado + apreciación del activo.
 * Equivale a ganancia total / precio, porque al contado la inversión es el precio completo.
 *
 * @see domain.md sección 2.7 Caso E (comparación contado vs crédito).
 */
export function calcCashROI(input: PropertyInput, macro: MacroAssumptions): number {
  return calcProjectedNetCapRate(input, macro) + macro.neighborhoodAppreciationAnnual;
}

/**
 * ROI del inversor apalancado (con crédito) sobre su capital propio.
 *
 * @see domain.md sección 2.7 Caso E.
 */
export function calcLeveragedROI(
  property: PropertyInput,
  funding: FundingDetails,
  macro: MacroAssumptions,
): number {
  const noiUSD = calcProjectedNOI(property, macro);
  const assetAppreciationUSD = property.purchasePriceUSD * macro.neighborhoodAppreciationAnnual;

  return computeFinancing({
    noiUSD,
    assetAppreciationUSD,
    purchasePriceUSD: property.purchasePriceUSD,
    funding,
  }).investorRoiAnnual;
}

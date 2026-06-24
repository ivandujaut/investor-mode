import type { MacroAssumptions, OperatingBreakdown, PropertyInput } from "./types";

/**
 * Cap rate neto = NOI anual / precio de compra.
 *
 * Versión "de hoy" (Caso A/B): usa el alquiler actual sin proyectar. La vacancia se pasa
 * explícita porque es un supuesto, no un atributo del activo.
 *
 * Convención de unidad: devuelve un RATIO decimal (ej. 0.0293), NO un porcentaje.
 * El ×100 para mostrar "2,93 %" se hace en la UI, nunca en el motor.
 *
 * @see domain.md sección 1.1 (cap rate neto) y sección 1.4 Caso A.
 */
export function calcNetCapRate(input: PropertyInput, vacancyMonths: number): number {
  return calcOperatingBreakdown(input.monthlyRentUSD, input, vacancyMonths).noiUSD / input.purchasePriceUSD;
}

/**
 * Cap rate neto PROYECTADO bajo un escenario macro.
 *
 * A diferencia de calcNetCapRate (que mide el rendimiento de HOY con el alquiler actual),
 * esta función proyecta el alquiler en USD un año hacia adelante según los supuestos macro
 * y recién ahí calcula el cap rate. Es el "cap rate proyectado" que distingue al Modo
 * Inversor de una calculadora simple.
 *
 * Devuelve un RATIO decimal, igual que calcNetCapRate.
 *
 * @see domain.md sección 2.1.1 (proyección del alquiler en USD), sección 2.6 (término medio) y sección 2.7 Caso D.
 */
export function calcProjectedNetCapRate(input: PropertyInput, macro: MacroAssumptions): number {
  return calcProjectedNOI(input, macro) / input.purchasePriceUSD;
}

/** NOI proyectado bajo un escenario macro. @see domain.md sección 2.7 Caso D. */
export function calcProjectedNOI(input: PropertyInput, macro: MacroAssumptions): number {
  const { averageMonthlyRentUSD } = projectRent(input, macro);
  return calcOperatingBreakdown(averageMonthlyRentUSD, input, macro.vacancyMonths).noiUSD;
}

/**
 * Proyecta el alquiler en USD del año: el valor al cierre del año 1 y el promedio (término medio).
 * Única fuente de verdad de la fórmula de sección 2.1.1 + sección 2.6.
 *
 * @see domain.md sección 2.1.1 (U₁/U₀ = (1+i)/(1+d)) y sección 2.6 (promedio = (inicial + final) / 2).
 */
export function projectRent(
  input: Pick<PropertyInput, "monthlyRentUSD">,
  macro: Pick<MacroAssumptions, "rentAdjustmentAnnual" | "devaluationAnnual">,
): { rentUSDEndOfYear1: number; averageMonthlyRentUSD: number } {
  const rentUSDEndOfYear1 =
    input.monthlyRentUSD * ((1 + macro.rentAdjustmentAnnual) / (1 + macro.devaluationAnnual));
  const averageMonthlyRentUSD = (input.monthlyRentUSD + rentUSDEndOfYear1) / 2;
  return { rentUSDEndOfYear1, averageMonthlyRentUSD };
}

/**
 * Desglose operativo anual a partir de un alquiler mensual efectivo: ingresos, gastos y NOI.
 * Única fuente de verdad de la anualización (expensas × 12, ABL × 4) y del NOI.
 *
 * @see domain.md sección 1.4 (convenciones) y sección 3.3.2 (campos de output).
 */
export function calcOperatingBreakdown(
  monthlyRentUSD: number,
  costs: Pick<PropertyInput, "expensasMonthlyUSD" | "ablQuarterlyUSD">,
  vacancyMonths: number,
): OperatingBreakdown {
  const grossAnnualIncomeUSD = monthlyRentUSD * 12;
  const effectiveAnnualIncomeUSD = monthlyRentUSD * (12 - vacancyMonths);
  const expensasAnnualUSD = costs.expensasMonthlyUSD * 12;
  const ablAnnualUSD = costs.ablQuarterlyUSD * 4;
  const totalOperatingExpensesUSD = expensasAnnualUSD + ablAnnualUSD;
  const noiUSD = effectiveAnnualIncomeUSD - totalOperatingExpensesUSD;

  return {
    grossAnnualIncomeUSD,
    effectiveAnnualIncomeUSD,
    expensasAnnualUSD,
    ablAnnualUSD,
    totalOperatingExpensesUSD,
    noiUSD,
  };
}

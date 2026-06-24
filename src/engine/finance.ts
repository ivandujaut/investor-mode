import type { FinancingMetrics, FundingDetails, LoanInput } from "./types";

/**
 * Cuota mensual de un crédito de capital P, a tasa r por período, durante n períodos
 * (sistema francés). Casos de borde: r = 0 → P/n; n = 1 lo resuelve la fórmula.
 *
 * @see domain.md sección 2.4.2 (fórmula de cuota constante).
 */
export function calcMonthlyPayment(loan: LoanInput): number {
  if (loan.nominalRateAnnual === 0) return loan.principalUSD / loan.termMonths;

  const nominalRateMonthly = loan.nominalRateAnnual / 12;

  const monthlyLoanPaymentUSD =
    (loan.principalUSD * nominalRateMonthly * (1 + nominalRateMonthly) ** loan.termMonths) /
    ((1 + nominalRateMonthly) ** loan.termMonths - 1);
  return monthlyLoanPaymentUSD;
}

/**
 * Métricas del inversor apalancado: cuota, flujo de caja, ganancia total, ROI y leverage ratio.
 * Única fuente de verdad de sección 2.7 Caso E.
 *
 * @see domain.md sección 2.7 Caso E (flujo de caja, ROI del inversor, leverage ratio).
 */
export function computeFinancing(params: {
  noiUSD: number;
  assetAppreciationUSD: number;
  purchasePriceUSD: number;
  funding: FundingDetails;
}): FinancingMetrics {
  const { noiUSD, assetAppreciationUSD, purchasePriceUSD, funding } = params;

  const monthlyLoanPaymentUSD = calcMonthlyPayment(funding.loan);
  const annualDebtServiceUSD = monthlyLoanPaymentUSD * 12;
  const netAnnualCashFlowUSD = noiUSD - annualDebtServiceUSD;
  const totalAnnualGainUSD = netAnnualCashFlowUSD + assetAppreciationUSD;
  const investorRoiAnnual = totalAnnualGainUSD / funding.downPaymentUSD;
  const leverageRatio = purchasePriceUSD / funding.downPaymentUSD;

  return {
    monthlyLoanPaymentUSD,
    annualDebtServiceUSD,
    netAnnualCashFlowUSD,
    totalAnnualGainUSD,
    investorRoiAnnual,
    leverageRatio,
  };
}

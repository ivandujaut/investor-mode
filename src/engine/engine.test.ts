import { describe, it, expect } from "vitest";
import { analyzeProperty } from "./engine";
import type { EngineInput } from "./types";

/**
 * Belgrano (Caso A/D/E del dominio) corrido por el motor completo con los defaults de sección 2.5.
 * El escenario Moderado reproduce exactamente los Casos D y E.
 */
const belgrano: EngineInput["property"] = {
  purchasePriceUSD: 180000,
  monthlyRentUSD: 600,
  expensasMonthlyUSD: 80,
  ablQuarterlyUSD: 90,
};

const neighborhood: EngineInput["neighborhood"] = { medianCapRate: 0.048 };

const fundingBelgrano: EngineInput["funding"] = {
  loan: { principalUSD: 126000, nominalRateAnnual: 0.08, termMonths: 240 },
  downPaymentUSD: 54000,
};

describe("analyzeProperty · escenario Moderado (= Caso D/E)", () => {
  it("reproduce el desglose del Caso D", () => {
    const { moderate } = analyzeProperty({ property: belgrano, neighborhood });

    expect(moderate.rentUSDEndOfYear1).toBeCloseTo(614.4, 1);
    expect(moderate.averageMonthlyRentUSD).toBeCloseTo(607.2, 1);
    expect(moderate.grossAnnualIncomeUSD).toBeCloseTo(7286.4, 1);
    expect(moderate.effectiveAnnualIncomeUSD).toBeCloseTo(6679.2, 1);
    expect(moderate.expensasAnnualUSD).toBe(960);
    expect(moderate.ablAnnualUSD).toBe(360);
    expect(moderate.totalOperatingExpensesUSD).toBe(1320);
    expect(moderate.noiUSD).toBeCloseTo(5359.2, 1);
    expect(moderate.grossCapRate).toBeCloseTo(0.0405, 4);
    expect(moderate.netCapRate).toBeCloseTo(0.0298, 4);
    expect(moderate.assetAppreciationUSD).toBeCloseTo(3960, 0);
  });

  it("compara con la mediana del barrio: 0.0298 < 0.048 -> BELOW", () => {
    const { moderate } = analyzeProperty({ property: belgrano, neighborhood });

    expect(moderate.spreadVsNeighborhoodMedian).toBeCloseTo(0.0298 - 0.048, 4);
    expect(moderate.positionVsMedian).toBe("BELOW");
  });

  it("reproduce las métricas de crédito del Caso E (ROI ≈ -6,16 %, leverage 3,33×)", () => {
    const { moderate } = analyzeProperty({
      property: belgrano,
      neighborhood,
      funding: fundingBelgrano,
    });

    expect(moderate.financing).toBeDefined();
    expect(moderate.financing!.monthlyLoanPaymentUSD).toBeCloseTo(1054, 0);
    expect(moderate.financing!.annualDebtServiceUSD).toBeCloseTo(12647, 0);
    expect(moderate.financing!.netAnnualCashFlowUSD).toBeCloseTo(-7288, 0);
    expect(moderate.financing!.totalAnnualGainUSD).toBeCloseTo(-3328, 0);
    expect(moderate.financing!.investorRoiAnnual).toBeCloseTo(-0.0616, 4);
    expect(moderate.financing!.leverageRatio).toBeCloseTo(3.333, 3);
  });
});

describe("analyzeProperty · contrato del motor", () => {
  it("sin funding, no incluye métricas de crédito en ningún escenario", () => {
    const result = analyzeProperty({ property: belgrano, neighborhood });

    expect(result.conservative.financing).toBeUndefined();
    expect(result.moderate.financing).toBeUndefined();
    expect(result.aggressive.financing).toBeUndefined();
  });

  it("calcula los tres escenarios; el cap rate empeora del agresivo al conservador", () => {
    const result = analyzeProperty({ property: belgrano, neighborhood });

    // El cap rate del activo sube cuando mejoran los supuestos (menos vacancia, mejor proyección).
    expect(result.aggressive.netCapRate).toBeGreaterThan(result.moderate.netCapRate);
    expect(result.moderate.netCapRate).toBeGreaterThan(result.conservative.netCapRate);
  });

  it("escenario Agresivo con defaults (vac 0,5 · ajuste 0,24 · deval 0,20 · apr 0,05)", () => {
    const { aggressive } = analyzeProperty({
      property: belgrano,
      neighborhood,
      funding: fundingBelgrano,
    });

    // rentEnd = 600 × 1,24/1,20 = 620 ; avg = 610 ; NOI = 610×11,5 − 1320 = 5695
    expect(aggressive.noiUSD).toBeCloseTo(5695, 0);
    expect(aggressive.netCapRate).toBeCloseTo(0.0316, 4);
    // gain = (5695 − 12647) + 9000 = 2048 ; ROI = 2048 / 54000 ≈ 0,0379
    expect(aggressive.financing!.investorRoiAnnual).toBeCloseTo(0.0379, 4);
  });
});

describe("analyzeProperty · posición vs mediana", () => {
  it("ABOVE cuando la mediana del barrio es baja", () => {
    const { moderate } = analyzeProperty({
      property: belgrano,
      neighborhood: { medianCapRate: 0.02 },
    });
    expect(moderate.positionVsMedian).toBe("ABOVE");
  });

  it("AT cuando la mediana cae dentro de la tolerancia", () => {
    const { moderate } = analyzeProperty({
      property: belgrano,
      neighborhood: { medianCapRate: 0.0298 },
    });
    expect(moderate.positionVsMedian).toBe("AT");
  });
});

describe("analyzeProperty · supuestos custom", () => {
  it("usa los escenarios pasados por el caller en lugar de los defaults", () => {
    const flat = {
      vacancyMonths: 0,
      rentAdjustmentAnnual: 0,
      devaluationAnnual: 0,
      neighborhoodAppreciationAnnual: 0,
    };
    const result = analyzeProperty({
      property: belgrano,
      neighborhood,
      scenarios: { conservative: flat, moderate: flat, aggressive: flat },
    });

    // Sin proyección ni vacancia: alquiler estable y cap rate = Caso A "de hoy" (≈ 0,0307).
    expect(result.moderate.rentUSDEndOfYear1).toBe(600);
    expect(result.moderate.effectiveAnnualIncomeUSD).toBe(7200);
    expect(result.moderate.netCapRate).toBeCloseTo((7200 - 1320) / 180000, 6);
  });
});

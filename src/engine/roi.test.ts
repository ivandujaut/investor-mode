import { describe, it, expect } from "vitest";
import type { FundingDetails, MacroAssumptions, PropertyInput } from "./types";
import { calcCashROI, calcLeveragedROI } from "./roi";
import { calcProjectedNOI } from "./capRate";

describe("calcCashROI", () => {
  it("Caso E contado, Moderado -> ROI ≈ 0.0518", () => {
    const belgrano: PropertyInput = {
      purchasePriceUSD: 180000,
      monthlyRentUSD: 600,
      expensasMonthlyUSD: 80,
      ablQuarterlyUSD: 90,
    };

    const moderado: MacroAssumptions = {
      vacancyMonths: 1,
      rentAdjustmentAnnual: 0.28,
      devaluationAnnual: 0.25,
      neighborhoodAppreciationAnnual: 0.022,
    };

    expect(calcCashROI(belgrano, moderado)).toBeCloseTo(0.0518, 4);
  });
  it("Caso E contado, solo apreciación -> 0.0798", () => {
    const belgrano: PropertyInput = {
      purchasePriceUSD: 180000,
      monthlyRentUSD: 600,
      expensasMonthlyUSD: 80,
      ablQuarterlyUSD: 90,
    };

    const aggressive: MacroAssumptions = {
      vacancyMonths: 1,
      rentAdjustmentAnnual: 0.28,
      devaluationAnnual: 0.25,
      neighborhoodAppreciationAnnual: 0.05,
    };

    expect(calcCashROI(belgrano, aggressive)).toBeCloseTo(0.0798, 4);
  });
});

describe("calcProjectedNOI", () => {
  it("Caso D · NOI proyectado -> ≈ 5359.2", () => {
    const belgrano: PropertyInput = {
      purchasePriceUSD: 180000,
      monthlyRentUSD: 600,
      expensasMonthlyUSD: 80,
      ablQuarterlyUSD: 90,
    };
    const moderado: MacroAssumptions = {
      vacancyMonths: 1,
      rentAdjustmentAnnual: 0.28,
      devaluationAnnual: 0.25,
      neighborhoodAppreciationAnnual: 0,
    };

    expect(calcProjectedNOI(belgrano, moderado)).toBeCloseTo(5359.2, 1);
  });
});

describe("calcLeveragedROI", () => {
  it("ROI apalancado (Caso E con crédito) con apreciacion moderada", () => {
    /**
     * Datos de la propiedad
     */
    const propertyDetails: PropertyInput = {
      purchasePriceUSD: 180000,
      monthlyRentUSD: 600,
      expensasMonthlyUSD: 80,
      ablQuarterlyUSD: 90,
    };
    /**
     * Datos de financiacion
     */
    const fundingDetails: FundingDetails = {
      loan: {
        principalUSD: 0.7 * propertyDetails.purchasePriceUSD,
        nominalRateAnnual: 0.08,
        termMonths: 240,
      },
      downPaymentUSD: 0.3 * propertyDetails.purchasePriceUSD,
    };

    /**
     * Datos Macro
     */
    const moderado: MacroAssumptions = {
      vacancyMonths: 1,
      rentAdjustmentAnnual: 0.28,
      devaluationAnnual: 0.25,
      neighborhoodAppreciationAnnual: 0.022,
    };
    expect(calcLeveragedROI(propertyDetails, fundingDetails, moderado)).toBeCloseTo(-0.0616, 4);
  });
  it("ROI apalancado (Caso E con crédito) con apreciacion agresiva", () => {
    /**
     * Datos de la propiedad
     */
    const propertyDetails: PropertyInput = {
      purchasePriceUSD: 180000,
      monthlyRentUSD: 600,
      expensasMonthlyUSD: 80,
      ablQuarterlyUSD: 90,
    };
    /**
     * Datos de financiacion
     */
    const fundingDetails: FundingDetails = {
      loan: {
        principalUSD: 0.7 * propertyDetails.purchasePriceUSD,
        nominalRateAnnual: 0.08,
        termMonths: 240,
      },
      downPaymentUSD: 0.3 * propertyDetails.purchasePriceUSD,
    };

    /**
     * Datos Macro
     */
    const moderado: MacroAssumptions = {
      vacancyMonths: 1,
      rentAdjustmentAnnual: 0.28,
      devaluationAnnual: 0.25,
      neighborhoodAppreciationAnnual: 0.05,
    };
    expect(calcLeveragedROI(propertyDetails, fundingDetails, moderado)).toBeCloseTo(0.0317, 4);
  })
});

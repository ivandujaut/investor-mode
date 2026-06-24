import { describe, it, expect } from "vitest";
import { calcMonthlyPayment } from "./finance";
import type { LoanInput } from "./types";

describe("calcMonthlyPayment", () => {
  it("Cuota del credito (sisterma frances)", () => {
    const loanPayment: LoanInput = {
      principalUSD: 126000,
      nominalRateAnnual: 0.08,
      termMonths: 240,
    };

    expect(calcMonthlyPayment(loanPayment)).toBeCloseTo(1054, 0);
  });
  it("Cuota del credito sin interes", () => {
    const loanPayment: LoanInput = {
      principalUSD: 1200,
      nominalRateAnnual: 0,
      termMonths: 12,
    };

    expect(calcMonthlyPayment(loanPayment)).toBe(100);
  });
  it("Cuota con interes y pago unico", () => {
    const loanPayment: LoanInput = {
      principalUSD: 1000,
      nominalRateAnnual: 0.12,
      termMonths: 1,
    };

    expect(calcMonthlyPayment(loanPayment)).toBeCloseTo(1010, 2);
  });
});

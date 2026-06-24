import { describe, it, expect } from 'vitest'
import { calcNetCapRate, calcProjectedNetCapRate } from './capRate'
import type { PropertyInput, MacroAssumptions } from './types'

/**
 * Caso A · domain.md sección 1.4: Departamento en Belgrano.
 *
 * Ingresos anuales (descontando 1 mes de vacancia): 600 × 11  = 6.600
 * Expensas anuales: 80 × 12                                   =   960
 * ABL anual: 90 × 4                                           =   360
 * NOI = 6.600 − 960 − 360                                     = 5.280
 * Cap rate neto = 5.280 / 180.000                             ≈ 0,0293
 */
describe('calcNetCapRate', () => {
  it('Caso A: Belgrano -> cap rate neto ≈ 0.0293', () => {
    const belgrano: PropertyInput = {
      purchasePriceUSD: 180000,
      monthlyRentUSD: 600,
      expensasMonthlyUSD: 80,
      ablQuarterlyUSD: 90,
    }

    expect(calcNetCapRate(belgrano, 1)).toBeCloseTo(0.0293, 4)
  })
  it('Caso B: PH en Almagro -> cap rate neto ≈ 0.0406', () => {
    const phAlmagro: PropertyInput = {
      purchasePriceUSD: 130000,
      monthlyRentUSD: 480,
      expensasMonthlyUSD: 0,
      ablQuarterlyUSD: 60,
    }

    expect(calcNetCapRate(phAlmagro, 0.5)).toBeCloseTo(0.0406, 4)
  })
})

/**
 * Caso D · domain.md sección 2.7: Belgrano del Caso A, ahora proyectado con contexto macro (Moderado).
 *
 * Paso 1. Alquiler USD al cierre del año 1: 600 × (1+0,28)/(1+0,25) = 614,4
 * Paso 2. Alquiler promedio del año (término medio): (600 + 614,4) / 2 = 607,2
 * Paso 3. Ingresos anuales (descontando 1 mes de vacancia): 607,2 × 11 = 6.679,2
 * Paso 4. Gastos operativos: 80 × 12 + 90 × 4                          = 1.320
 * Paso 5. NOI = 6.679,2 − 1.320                                        = 5.359,2
 * Paso 6. Cap rate neto = 5.359,2 / 180.000                            ≈ 0,0298
 */
describe('calcProjectedNetCapRate', () => {
  it('Caso D: Belgrano proyectado (Moderado) -> cap rate neto ≈ 0.0298', () => {
    const belgrano: PropertyInput = {
      purchasePriceUSD: 180000,
      monthlyRentUSD: 600,
      expensasMonthlyUSD: 80,
      ablQuarterlyUSD: 90,
    }
    const moderado: MacroAssumptions = {
      vacancyMonths: 1,
      rentAdjustmentAnnual: 0.28,
      devaluationAnnual: 0.25,
      neighborhoodAppreciationAnnual: 0
    }

    // Valor esperado tomado de domain.md sección 2.7 Caso D (2,98 %).
    expect(calcProjectedNetCapRate(belgrano, moderado)).toBeCloseTo(0.0298, 4)
  })
})

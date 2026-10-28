/**
 * Bangladesh individual income tax estimator — rule tables.
 *
 * SOURCES (checked October 2026):
 *  - Finance Ordinance 2025 (Bangladesh), as summarised by KPMG Bangladesh
 *    "Salient features of Finance Ordinance June 2025" and PwC Bangladesh
 *    "Key budget amendments 2025"; The Daily Ittefaq / The Financial Express
 *    budget reports (2 June 2025).
 *  - Income Tax Act 2023 (Sixth Schedule Part 3 — investment rebate).
 *
 * Only two assessment years are configured, because only these could be
 * verified from at least two independent sources:
 *   AY 2025-26  (income year 1 July 2024 – 30 June 2025)
 *   AY 2026-27  (income year 1 July 2025 – 30 June 2026)
 *
 * AY 2027-28 is deliberately NOT configured: the Finance Act 2026 revised the
 * general tax-free threshold (reported as Tk 4,00,000) but the full gazetted
 * schedule (all categories, rebate, minimum tax) should be checked against the
 * official text before it is added. To add a year, copy one block below.
 *
 * Every number lives in this file so it can be reviewed and updated in one place.
 */

export const ASSESSMENT_YEARS = {
  '2026-27': {
    label: '2026-27',
    incomeYear: '2025-26',
    incomeYearRange: { en: '1 July 2025 – 30 June 2026', bn: '১ জুলাই ২০২৫ – ৩০ জুন ২০২৬' },
    thresholds: {
      general: 375000,
      women_senior: 425000,
      disabled: 500000,
      third_gender: 500000,
      freedom_fighter: 525000,
    },
    // [band width, rate]. Infinity = balance.
    slabs: [
      [300000, 0.10],
      [400000, 0.15],
      [500000, 0.20],
      [2000000, 0.25],
      [Infinity, 0.30],
    ],
    // Flat minimum tax regardless of location from AY 2026-27
    minimumTax: { dhaka_ctg: 5000, other_city: 5000, other_area: 5000 },
    newTaxpayerMinimum: 1000,
    salaryDeductionCap: 500000,
    parentOfDisabledExtra: 50000,
    // From AY 2026-27 minimum tax is excluded from the surcharge base
    surchargeOnMinimumTax: false,
  },
  '2025-26': {
    label: '2025-26',
    incomeYear: '2024-25',
    incomeYearRange: { en: '1 July 2024 – 30 June 2025', bn: '১ জুলাই ২০২৪ – ৩০ জুন ২০২৫' },
    thresholds: {
      general: 350000,
      women_senior: 400000,
      disabled: 475000,
      third_gender: 475000,
      freedom_fighter: 500000,
    },
    slabs: [
      [100000, 0.05],
      [400000, 0.10],
      [500000, 0.15],
      [500000, 0.20],
      [2000000, 0.25],
      [Infinity, 0.30],
    ],
    minimumTax: { dhaka_ctg: 5000, other_city: 4000, other_area: 3000 },
    newTaxpayerMinimum: null, // no separate new-taxpayer rate for this year
    salaryDeductionCap: 450000,
    parentOfDisabledExtra: 50000,
    surchargeOnMinimumTax: true,
  },
};

export const DEFAULT_AY = '2026-27';

/** Investment rebate: lowest of 3% of taxable income, 15% of eligible investment, Tk 10,00,000 */
export const REBATE = { incomeRate: 0.03, investmentRate: 0.15, cap: 1000000 };

/** Net-wealth surcharge on tax payable (individuals). Same table for both configured years. */
export const SURCHARGE_BANDS = [
  // [net wealth above, up to, rate]
  [40000000, 100000000, 0.10],
  [100000000, 200000000, 0.20],
  [200000000, 500000000, 0.30],
  [500000000, Infinity, 0.35],
];
export const SURCHARGE_LUXURY_RATE = 0.10; // >1 car or house > 8,000 sq ft, even if wealth ≤ Tk 4 crore

const n = (v) => {
  const x = Number(v);
  return Number.isFinite(x) && x > 0 ? x : 0;
};

export function surchargeRate(netWealth, ownsLuxury) {
  const w = n(netWealth);
  let rate = 0;
  for (const [lo, hi, r] of SURCHARGE_BANDS) if (w > lo && w <= hi) rate = r;
  if (ownsLuxury && rate < SURCHARGE_LUXURY_RATE) rate = SURCHARGE_LUXURY_RATE;
  return rate;
}

/**
 * @param {object} input
 *  ay, category, location, salary, otherIncome, investment, netWealth,
 *  ownsLuxury (bool), newTaxpayer (bool), parentOfDisabled (bool)
 */
export function calculateTax(input) {
  const rules = ASSESSMENT_YEARS[input.ay] || ASSESSMENT_YEARS[DEFAULT_AY];
  const salary = n(input.salary);
  const other = n(input.otherIncome);
  const totalIncome = salary + other;

  // Employment income standard deduction: lower of 1/3 of salary or cap
  const salaryDeduction = Math.round(Math.min(salary / 3, rules.salaryDeductionCap));
  const taxableIncome = Math.max(0, totalIncome - salaryDeduction);

  const threshold =
    (rules.thresholds[input.category] ?? rules.thresholds.general) +
    (input.parentOfDisabled ? rules.parentOfDisabledExtra : 0);

  // Slab computation
  const breakdown = [
    { from: 0, to: Math.min(threshold, taxableIncome), width: threshold, rate: 0, amount: Math.min(threshold, taxableIncome), tax: 0 },
  ];
  let remaining = Math.max(0, taxableIncome - threshold);
  let cursor = threshold;
  let grossTax = 0;
  for (const [width, rate] of rules.slabs) {
    const amount = Math.min(remaining, width);
    const tax = amount * rate;
    breakdown.push({ from: cursor, to: width === Infinity ? null : cursor + width, width, rate, amount, tax });
    grossTax += tax;
    remaining -= amount;
    cursor += width;
  }
  grossTax = Math.round(grossTax);

  // Investment rebate
  const investment = n(input.investment);
  const rebateLimits = {
    byIncome: Math.round(taxableIncome * REBATE.incomeRate),
    byInvestment: Math.round(investment * REBATE.investmentRate),
    cap: REBATE.cap,
  };
  const rebate = investment > 0 ? Math.min(grossTax, rebateLimits.byIncome, rebateLimits.byInvestment, rebateLimits.cap) : 0;
  const taxAfterRebate = Math.max(0, grossTax - rebate);

  // Minimum tax (applies only when income exceeds the tax-free threshold)
  const exceeds = taxableIncome > threshold;
  let minimumTax = 0;
  if (exceeds) {
    minimumTax =
      input.newTaxpayer && rules.newTaxpayerMinimum != null
        ? rules.newTaxpayerMinimum
        : rules.minimumTax[input.location] ?? rules.minimumTax.dhaka_ctg;
  }
  const minimumApplied = exceeds && taxAfterRebate < minimumTax;
  const taxPayable = exceeds ? Math.max(taxAfterRebate, minimumTax) : 0;

  // Surcharge
  const sRate = surchargeRate(input.netWealth, input.ownsLuxury);
  const surchargeBase = rules.surchargeOnMinimumTax ? taxPayable : taxAfterRebate;
  const surcharge = Math.round(surchargeBase * sRate);

  return {
    rules,
    totalIncome,
    salaryDeduction,
    taxableIncome,
    threshold,
    breakdown,
    grossTax,
    rebate,
    rebateLimits,
    taxAfterRebate,
    minimumTax,
    minimumApplied,
    taxPayable,
    surchargeRate: sRate,
    surcharge,
    totalLiability: taxPayable + surcharge,
    effectiveRate: totalIncome > 0 ? (taxPayable + surcharge) / totalIncome : 0,
  };
}

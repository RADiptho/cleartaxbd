import { useMemo, useState } from 'react';
import { Calculator, ChevronDown, Info, RotateCcw, TriangleAlert } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext.jsx';
import { ASSESSMENT_YEARS, DEFAULT_AY, calculateTax } from '../lib/tax.js';
import { waLink } from '../config.js';
import { Reveal, SectionHeader, WhatsAppIcon } from './ui.jsx';

const INITIAL = {
  ay: DEFAULT_AY, category: 'general', location: 'dhaka_ctg',
  salary: '', otherIncome: '', investment: '', netWealth: '',
  ownsLuxury: false, newTaxpayer: false, parentOfDisabled: false,
};

function MoneyInput({ id, label, hint, value, onChange }) {
  const { tk } = useLang();
  const n = Number(value);
  return (
    <div>
      <label htmlFor={id} className="field-label">{label}</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">৳</span>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min="0"
          step="1"
          placeholder="0"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, '').slice(0, 12))}
          className="field !pl-8"
          aria-describedby={`${id}-hint`}
        />
      </div>
      <p id={`${id}-hint`} className="hint">
        {n > 0 && <span className="mr-1 font-semibold text-navy-700">= {tk(n)}.</span>}
        {hint}
      </p>
    </div>
  );
}

function Check({ id, checked, onChange, children }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-3 text-sm text-slate-700 transition hover:border-navy-300">
      <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-navy-700" />
      <span>{children}</span>
    </label>
  );
}

function Row({ label, value, strong, muted, accent }) {
  return (
    <div className={`flex items-baseline justify-between gap-4 py-2 ${strong ? 'font-semibold text-navy-950' : muted ? 'text-slate-500' : 'text-slate-700'}`}>
      <dt className="text-sm">{label}</dt>
      <dd className={`tabular-nums text-sm ${accent ? 'text-emerald-700' : ''}`}>{value}</dd>
    </div>
  );
}

export default function TaxCalculator() {
  const { t, lang, tk, pct } = useLang();
  const c = t.calc;
  const [f, setF] = useState(INITIAL);
  const [adv, setAdv] = useState(false);
  const set = (k) => (v) => setF((p) => ({ ...p, [k]: v }));

  const r = useMemo(() => calculateTax(f), [f]);
  const rules = ASSESSMENT_YEARS[f.ay];
  const hasIncome = r.totalIncome > 0;

  const waSummary =
    lang === 'bn'
      ? `করবর্ষ ${f.ay}-এর জন্য আমার আনুমানিক করদায় দেখাচ্ছে ${tk(r.totalLiability)}।`
      : `It estimated my tax for assessment year ${f.ay} at ${tk(r.totalLiability)}.`;

  const slabLabel = (b, i) => {
    if (i === 0) return `${c.slabFirst} ${tk(b.width)}`;
    if (b.width === Infinity) return c.slabRest;
    return `${c.slabNext} ${tk(b.width)}`;
  };

  return (
    <section id="calculator" className="section bg-paper" aria-labelledby="calc-title">
      <div className="container-site">
        <SectionHeader id="calc-title" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          {/* Inputs */}
          <Reveal className="card p-5 sm:p-7">
            <form onSubmit={(e) => e.preventDefault()} noValidate className="space-y-5" aria-label={c.title}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="ay" className="field-label">{c.ay}</label>
                  <select id="ay" className="field" value={f.ay} onChange={(e) => set('ay')(e.target.value)}>
                    {Object.keys(ASSESSMENT_YEARS).map((k) => (
                      <option key={k} value={k}>{lang === 'bn' ? `করবর্ষ ${k}` : `AY ${k}`}</option>
                    ))}
                  </select>
                  <p className="hint">{c.incomeYear}: {rules.incomeYearRange[lang]}</p>
                </div>
                <div>
                  <label htmlFor="cat" className="field-label">{c.category}</label>
                  <select id="cat" className="field" value={f.category} onChange={(e) => set('category')(e.target.value)}>
                    {Object.entries(c.categories).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </select>
                  <p className="hint">{c.threshold}: {tk(rules.thresholds[f.category])}</p>
                </div>
              </div>

              <MoneyInput id="salary" label={c.salary} hint={c.salaryHint} value={f.salary} onChange={set('salary')} />
              <MoneyInput id="other" label={c.other} hint={c.otherHint} value={f.otherIncome} onChange={set('otherIncome')} />

              <div>
                <label htmlFor="loc" className="field-label">{c.location}</label>
                <select id="loc" className="field" value={f.location} onChange={(e) => set('location')(e.target.value)}>
                  {Object.entries(c.locations).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>

              <div className="rounded-2xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setAdv((a) => !a)}
                  aria-expanded={adv}
                  aria-controls="calc-adv"
                  className="flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-semibold text-navy-800 hover:bg-slate-50"
                >
                  {c.advanced}
                  <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${adv ? 'rotate-180' : ''}`} />
                </button>
                <div id="calc-adv" className={`acc-panel ${adv ? 'open' : ''}`}>
                  <div>
                    <div className="space-y-4 px-4 pb-4 pt-1">
                      <MoneyInput id="invest" label={c.investment} hint={c.investmentHint} value={f.investment} onChange={set('investment')} />
                      <MoneyInput id="wealth" label={c.wealth} hint={c.wealthHint} value={f.netWealth} onChange={set('netWealth')} />
                      <Check id="lux" checked={f.ownsLuxury} onChange={set('ownsLuxury')}>{c.luxury}</Check>
                      {rules.newTaxpayerMinimum != null && (
                        <Check id="newtp" checked={f.newTaxpayer} onChange={set('newTaxpayer')}>{c.newTaxpayer}</Check>
                      )}
                      <Check id="parent" checked={f.parentOfDisabled} onChange={set('parentOfDisabled')}>{c.parent}</Check>
                    </div>
                  </div>
                </div>
              </div>

              <button type="button" onClick={() => setF(INITIAL)} className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-navy-800">
                <RotateCcw className="h-4 w-4" /> {c.reset}
              </button>
            </form>
          </Reveal>

          {/* Results */}
          <Reveal delay={100} className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl bg-navy-900 text-white shadow-lift" aria-live="polite">
              <div className="relative p-6 sm:p-7">
                <div className="bg-grid-light absolute inset-0" aria-hidden="true" />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-navy-200">{c.resultTitle} · {lang === 'bn' ? `করবর্ষ ${f.ay}` : `AY ${f.ay}`}</p>
                    <p className="mt-2 font-display text-4xl font-semibold tabular-nums sm:text-[2.6rem]" data-testid="calc-total">{tk(r.totalLiability)}</p>
                    {hasIncome && (
                      <p className="mt-1 text-sm text-navy-200">{c.effective}: {new Intl.NumberFormat(lang === 'bn' ? 'bn-BD' : 'en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(r.effectiveRate * 100)}%</p>
                    )}
                  </div>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-gold-300"><Calculator className="h-6 w-6" /></span>
                </div>
              </div>

              <div className="bg-white p-6 text-ink sm:p-7">
                {!hasIncome ? (
                  <p className="flex items-start gap-2 text-sm text-slate-600"><Info className="mt-0.5 h-4 w-4 shrink-0 text-navy-500" /> {c.enterIncome}</p>
                ) : (
                  <>
                    <dl className="divide-y divide-slate-100">
                      <Row label={c.totalIncome} value={tk(r.totalIncome)} />
                      {r.salaryDeduction > 0 && <Row label={c.salaryDeduction} value={`− ${tk(r.salaryDeduction)}`} muted />}
                      <Row label={c.taxableIncome} value={tk(r.taxableIncome)} strong />
                      <Row label={c.threshold} value={tk(r.threshold)} muted />
                      <Row label={c.slabTax} value={tk(r.grossTax)} />
                      {r.rebate > 0 && <Row label={c.rebate} value={`− ${tk(r.rebate)}`} accent />}
                      {r.rebate > 0 && <Row label={c.afterRebate} value={tk(r.taxAfterRebate)} />}
                      {r.minimumTax > 0 && (
                        <Row label={`${c.minTax}${r.minimumApplied ? ` — ${c.minApplied}` : ''}`} value={tk(r.minimumTax)} muted={!r.minimumApplied} strong={r.minimumApplied} />
                      )}
                      <Row label={c.payable} value={tk(r.taxPayable)} strong />
                      {r.surcharge > 0 && <Row label={`${c.surcharge} (${pct(r.surchargeRate)})`} value={`+ ${tk(r.surcharge)}`} />}
                      <Row label={c.total} value={tk(r.totalLiability)} strong />
                    </dl>
                    {r.rebate > 0 && (
                      <p className="mt-2 text-xs text-slate-500">{c.rebateDetail(tk(r.rebateLimits.byIncome), tk(r.rebateLimits.byInvestment), tk(r.rebateLimits.cap))}</p>
                    )}
                    {r.taxableIncome <= r.threshold && (
                      <p className="mt-3 rounded-xl bg-navy-50 p-3 text-sm text-navy-800">{c.belowThreshold}</p>
                    )}

                    {r.taxableIncome > r.threshold && (
                      <details className="group mt-4 rounded-xl border border-slate-200">
                        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-navy-800">
                          {c.slabsTitle}
                          <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="overflow-x-auto px-4 pb-3">
                          <table className="w-full min-w-[300px] text-left text-xs">
                            <thead className="text-slate-500">
                              <tr><th className="py-1.5 font-medium" scope="col">{lang === 'bn' ? 'স্ল্যাব' : 'Slab'}</th><th className="py-1.5 font-medium" scope="col">{c.rate}</th><th className="py-1.5 text-right font-medium" scope="col">{c.amount}</th><th className="py-1.5 text-right font-medium" scope="col">{c.tax}</th></tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 tabular-nums text-slate-700">
                              {r.breakdown.map((b, i) => (
                                <tr key={i} className={b.amount > 0 ? '' : 'text-slate-400'}>
                                  <td className="py-1.5 pr-2">{slabLabel(b, i)}</td>
                                  <td className="py-1.5">{pct(b.rate)}</td>
                                  <td className="py-1.5 text-right">{tk(b.amount)}</td>
                                  <td className="py-1.5 text-right">{tk(b.tax)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </details>
                    )}

                    <a href={waLink(c.waMsg(waSummary))} target="_blank" rel="noopener noreferrer" className="btn-wa mt-5 w-full">
                      <WhatsAppIcon /> {c.discuss}
                    </a>
                  </>
                )}
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-gold-300 bg-[#fdf8ee] p-4 sm:p-5" role="note">
              <p className="flex items-center gap-2 text-sm font-semibold text-navy-900"><TriangleAlert className="h-4 w-4 text-gold-600" /> {c.disclaimerTitle}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-700">{c.disclaimer}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
